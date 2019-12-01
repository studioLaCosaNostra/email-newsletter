import * as firebaseTools from 'firebase-tools';
import * as functions from 'firebase-functions';

export function deleteRecursive(path: string) {
  return firebaseTools.firestore
    .delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token
    });
}
