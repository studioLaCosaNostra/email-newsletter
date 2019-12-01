const firebase = require("@firebase/testing");
const fs = require("fs");

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "firestore-emulator-example";
const firebasePort = require("../firebase.json").emulators.firestore.port;
const port = firebasePort /** Exists? */ ? firebasePort : 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const rules = fs.readFileSync("firestore.rules", "utf8");

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

/*
 * ============
 *  Test Cases
 * ============
 */
beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

before(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

const aleksUID = 'aleks';
const bobUID = 'bob'
const exampleNewsletter = 'my-first-newsletter';

describe("My app", () => {
  it("require users to log in before creating a newsletter", async () => {
    const db = authedApp(null);
    const newsletterSettings = db.collection("newsletters-settings").doc(exampleNewsletter);
    const newsletter = db.collection("newsletters").doc(exampleNewsletter);
    await firebase.assertFails(newsletterSettings.set({ 
      owner: aleksUID
    }));
    await firebase.assertFails(newsletter.set({ 
      domain: 'example.com'
    }));
  });


  it("should allow to create new newsletter", async () => {
    const db = authedApp({ uid: aleksUID });
    const newsletterRole = db.collection(`newsletter-roles`)
      .doc(exampleNewsletter)
      .collection('user-role')
      .doc(aleksUID);
    const newsletterSettings = db.collection("newsletter-settings").doc(exampleNewsletter)
    const newsletter = db.collection("newsletters").doc(exampleNewsletter)
    await firebase.assertSucceeds(newsletterRole.set({
      uid: aleksUID,
      newsletter: exampleNewsletter,
      role: 'owner'
    }))
    // console.log((await newsletterRole.get()).data())
    await firebase.assertSucceeds(newsletterSettings.set({ 
      smtp: 'test'
    }));
    // console.log((await newsletterSettings.get()).data())
    await firebase.assertSucceeds(newsletter.set({ 
      domain: 'example.com'
    }));
  });

  describe('newsletter-roles', () => {

    it('should not let to overwrite owner by another user', async () => {
      const db = authedApp({ uid: aleksUID });
      const newsletterRole = db.collection(`newsletter-roles`)
        .doc(exampleNewsletter)
        .collection('user-role')
        .doc(aleksUID);
      await firebase.assertSucceeds(newsletterRole.set({
        uid: aleksUID,
        newsletter: exampleNewsletter,
        role: 'owner'
      }));
      const db2 = authedApp({ uid: bobUID });
      const newsletterRole2 = db2.collection(`newsletter-roles`)
        .doc(exampleNewsletter)
        .collection('user-role')
        .doc(aleksUID);
      await firebase.assertFails(newsletterRole2.update({ 
        role: 'member'
      }));
    });
  
  
    it('should allow owner user to change owner', async () => {
      const db = authedApp({ uid: aleksUID });
      const newsletterAleksRole = db.collection(`newsletter-roles`)
        .doc(exampleNewsletter)
        .collection('user-role')
        .doc(aleksUID);
      const newsletterBobRole = db.collection(`newsletter-roles`)
        .doc(exampleNewsletter)
        .collection('user-role')
        .doc(bobUID);
      await firebase.assertSucceeds(newsletterAleksRole.set({
        uid: aleksUID,
        newsletter: exampleNewsletter,
        role: 'owner'
      }));
      await firebase.assertSucceeds(newsletterBobRole.set({ 
        uid: bobUID,
        newsletter: exampleNewsletter,
        role: 'owner'
      }));
      await firebase.assertSucceeds(newsletterAleksRole.update({ 
        role: 'member'
      }));
      await firebase.assertFails(newsletterAleksRole.update({ 
        role: 'owner'
      }));
      await firebase.assertFails(newsletterBobRole.update({ 
        role: 'member'
      }));
    });
  })

  describe('subscribers', () => {

    it('should allow owner and admin delete email', async () => {
      const email = 'test@email.com';
      const db = authedApp({ uid: aleksUID });
      const newsletterRoles = db.collection(`newsletter-roles`)
        .doc(exampleNewsletter)
        .collection('user-role')
      const newsletterAleksRole = newsletterRoles.doc(aleksUID);
      const newsletterBobRole = newsletterRoles.doc(bobUID);
      await firebase.assertSucceeds(newsletterAleksRole.set({
        uid: aleksUID,
        newsletter: exampleNewsletter,
        role: 'owner'
      }));
      await firebase.assertSucceeds(newsletterBobRole.set({
        uid: bobUID,
        newsletter: exampleNewsletter,
        role: 'admin'
      }));
      const newsletter = db.collection("newsletters").doc(exampleNewsletter);
      await firebase.assertSucceeds(newsletter.set({ 
        domain: 'example.com'
      }));
      const emailDoc = newsletter.collection('subscribers').doc(email);
      await firebase.assertSucceeds(emailDoc.set({
        email
      }));
      const db2 = authedApp({ uid: bobUID });
      const emailDoc2 = db2
        .collection("newsletters")
        .doc(exampleNewsletter)
        .collection('subscribers')
        .doc(email);
      await firebase.assertSucceeds(emailDoc2.delete());
    });

    it('should disallow member to see subscribers', async () => {
      const email = 'test@email.com';
      const db = authedApp({ uid: aleksUID });
      const newsletterRoles = db.collection(`newsletter-roles`)
        .doc(exampleNewsletter)
        .collection('user-role');
      const newsletterAleksRole = newsletterRoles.doc(aleksUID);
      const newsletterBobRole = newsletterRoles.doc(bobUID);
      await firebase.assertSucceeds(newsletterAleksRole.set({
        uid: aleksUID,
        newsletter: exampleNewsletter,
        role: 'owner'
      }));
      await firebase.assertSucceeds(newsletterBobRole.set({ 
        uid: bobUID,
        newsletter: exampleNewsletter,
        role: 'member'
      }));
      const newsletter = db.collection("newsletters").doc(exampleNewsletter)
      await firebase.assertSucceeds(newsletter.set({ 
        domain: 'example.com'
      }));
      const subscriberDoc = newsletter.collection('subscribers').doc(email);
      await firebase.assertSucceeds(subscriberDoc.set({
        email
      }));
      const db2 = authedApp({ uid: bobUID });
      const emailDoc2 = db2
        .collection("newsletters")
        .doc(exampleNewsletter)
        .collection('subscribers')
        .doc(email);
      await firebase.assertFails(emailDoc2.set({
        edited: true
      }));
      await firebase.assertFails(emailDoc2.get());
    })

  })

  describe('messages', () => {
    
  });

});
