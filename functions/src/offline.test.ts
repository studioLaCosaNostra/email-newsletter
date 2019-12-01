import * as admin from 'firebase-admin';
import * as functions from './index';
// Require and initialize firebase-functions-test. Since we are not passing in any parameters, it will
// be initialized in an "offline mode", which means we have to stub out all the methods that interact
// with Firebase services.
import * as functionsTest from 'firebase-functions-test';
// Sinon is a library used for mocking or verifying function calls in JavaScript.
import * as sinon from 'sinon';

import { after, before, describe, it } from 'mocha'

import { DELIVERY } from './constants';
import { assert } from 'chai';
import { updateSubscribersDeliveryStatus } from './update-subbscribers-delivery-status';

const test = functionsTest();

describe('Cloud Functions', () => {
  let functionsStub: typeof functions;
  let adminInitStub: sinon.SinonStub;

  before(async () => {
    // [START stubAdminInit]
    // If index.js calls admin.initializeApp at the top of the file,
    // we need to stub it out before requiring index.js. This is because the
    // functions will be executed as a part of the require process.
    // Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
    adminInitStub = sinon.stub(admin, 'initializeApp');
    // Now we can require index.js and save the exports inside a namespace called myFunctions.
    functionsStub = await import('./index');
    // [END stubAdminInit]
  });

  after(() => {
    // Restore admin.initializeApp() to its original method.
    adminInitStub.restore();
    // Do other cleanup tasks.
    test.cleanup();
  });


  describe('newsletterSettingsChange', () => {
    it('should after create update fields usedDailyLimit, remainingDailyLimit', () => {
      const updateStub = sinon.stub();
      
      const snap = {
        // GIVEN
        before: {
          exists: false
        },
        // WHEN
        after: {
          exists: true,
          data: () => ({
            dailyLimit: 100
          }),
          ref: {
            update: updateStub
          }
        }
      };
      
      updateStub.callsFake(obj => obj);
      
      const wrapped = test.wrap(functionsStub.newsletterSettingsOnWrite);

      // THEN
      assert.deepEqual(wrapped(snap), { 
        usedDailyLimit: 0,
        remainingDailyLimit: 100 
      });
    })

    it('should after update correct fields usedDailyLimit, remainingDailyLimit', () => {
      const updateStub = sinon.stub();
      
      const snap = {
        // GIVEN
        before: {
          exists: true,
          data: () => ({
            dailyLimit: 100,
            remainingDailyLimit: 50,
            usedDailyLimit: 50
          })
        },
        // WHEN
        after: { 
          exists: true,
          data: () => ({
            dailyLimit: 40
          }),
          ref: {
            update: updateStub
          }
        }
      };
      
      updateStub.callsFake(obj => obj);
      
      const wrapped = test.wrap(functionsStub.newsletterSettingsOnWrite);

      // THEN
      assert.deepEqual(wrapped(snap), {
        usedDailyLimit: 50,
        remainingDailyLimit: 0
      });
    })

    it('should after update correct fields usedDailyLimit, remainingDailyLimit', () => {
      const updateStub = sinon.stub();
      
      const snap = {
        // GIVEN
        before: {
          exists: true,
          data: () => ({
            dailyLimit: 100,
            remainingDailyLimit: 50,
            usedDailyLimit: 50
          })
        },
        // WHEN
        after: {
          exists: true,
          data: () => ({
            dailyLimit: 51
          }),
          ref: {
            update: updateStub
          }
        }
      };
      
      updateStub.callsFake(obj => obj);
      
      const wrapped = test.wrap(functionsStub.newsletterSettingsOnWrite);
      
      // THEN
      assert.deepEqual(wrapped(snap), { 
        usedDailyLimit: 50,
        remainingDailyLimit: 1
      });
    })

    it('should after update correct fields usedDailyLimit, remainingDailyLimit', () => {
      const updateStub = sinon.stub();
      
      const snap = {
        // GIVEN
        before: {
          exists: true,
          data: () => ({
            dailyLimit: 100,
            remainingDailyLimit: 50,
            usedDailyLimit: 50
          })
        },
        // WHEN
        after: {
          exists: true,
          data: () => ({
            dailyLimit: 101
          }),
          ref: {
            update: updateStub
          }
        }
      };
      
      updateStub.callsFake(obj => obj);
      
      const wrapped = test.wrap(functionsStub.newsletterSettingsOnWrite);
      
      // THEN
      assert.deepEqual(wrapped(snap), { 
        usedDailyLimit: 50,
        remainingDailyLimit: 51
      });
    })

    it('should after update when dailyLimit is equal then do nothing', () => {
      const snap = {
        // GIVEN
        before: {
          exists: true,
          data: () => ({
            dailyLimit: 100,
            remainingDailyLimit: 50,
            usedDailyLimit: 50
          })
        },
        // WHEN
        after: {
          exists: true,
          data: () => ({
            dailyLimit: 100
          })
        }
      };
      
      const wrapped = test.wrap(functionsStub.newsletterSettingsOnWrite);
      
      // THEN
      assert.equal(wrapped(snap), null);
    })

    it('should after delete do nothing', () => {
      const snap = {
        // GIVEN
        before: {
          exists: true,
          data: () => ({
            dailyLimit: 100,
            remainingDailyLimit: 50,
            usedDailyLimit: 50
          })
        },
        // WHEN
        after: {
          exists: false
        }
      };

      const wrapped = test.wrap(functionsStub.newsletterSettingsOnWrite);
      
      // THEN
      assert.equal(wrapped(snap), null);
    });
  });

  describe('updateSubscribersDeliveryStatus', () => {
    it('should update all subscribers', async () => {
      const subscribers = sinon.stub();
      const updateStub = sinon.stub();
      const docs = [
        {
          ref: {
            update: updateStub
          }
        },
        {
          ref: {
            update: updateStub
          }
        }
      ];
      subscribers.returns({
        docs,
        size: docs.length
      })
      const deliveryId = 'test123';
      updateStub.callsFake(() => {
        return Promise.resolve();
      })
      await updateSubscribersDeliveryStatus(subscribers(), deliveryId, false);
      assert.equal(updateStub.getCalls().length, 2);
      assert.deepEqual(updateStub.getCalls().map(call => call.args[0]), [
        { [`${DELIVERY}.${deliveryId}`]: false },
        { [`${DELIVERY}.${deliveryId}`]: false }
      ]);
    })
  }) 

  // describe('newsletterDeliveryCreate', () => {
  //   it('should update all emails', () => {
  //     const updateStub = sinon.stub();
  //     firestoreStub = sinon.stub(admin, 'firestore');
  //     const snap = {
  //       // GIVEN
  //       ref: {
  //         update: updateStub
  //       }
  //     };
  //     const collectionStub = sinon.stub();
  //     const firestoreReturn: any = {
  //       collection: collectionStub
  //     }
  //     firestoreStub.get(() => (() => firestoreReturn))
  //     const docStub = sinon.stub();
  //     const whereStub = sinon.stub();
  //     collectionStub.returns({
  //       doc: docStub,
  //       where: whereStub
  //     })
  //     docStub.returns({
  //       collection: collectionStub
  //     })
  //     const subscriberDocumentSnapshot = sinon.stub();
  //     const subscriberUpdateStub = sinon.stub();
  //     subscriberDocumentSnapshot.returns({
  //       ref: {
  //         update: subscriberUpdateStub
  //       }
  //     });
  //     whereStub.withArgs('confirmed', '==', true).returns({
  //       get: () => {
  //         return {
  //           docs: [
  //             subscriberDocumentSnapshot
  //           ]
  //         }
  //       }
  //     })
  //     const wrapped = test.wrap(functionsStub.newsletterDeliveryCreate);

  //     // THEN
  //     assert.deepEqual(wrapped(snap), { 
  //       usedDailyLimit: 0,
  //       remainingDailyLimit: 100 
  //     });

  //     firestoreStub.restore();
  //   })
  // })
})