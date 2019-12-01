// tslint:disable: no-implicit-dependencies

// Sinon is a library used for mocking or verifying function calls in JavaScript.
import * as sinon from 'sinon';

// Require firebase-admin so we can stub out some of its methods.
import * as admin from 'firebase-admin';

export const adminInitStub = sinon.stub(admin, 'initializeApp');
