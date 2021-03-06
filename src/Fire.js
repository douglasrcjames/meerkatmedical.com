import firebase from 'firebase/app';
import 'firebase/firestore';   // for cloud firestore
import 'firebase/functions';   // for cloud functions

const liveConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_LIVE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_LIVE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_LIVE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_LIVE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_LIVE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_LIVE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_LIVE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_LIVE_MEASUREMENT_ID
};

// TODO: update me if you are using a test server
// const testConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_TEST_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_TEST_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_TEST_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_TEST_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_TEST_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_TEST_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_TEST_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_TEST_MEASUREMENT_ID
// };

// const config = (process.env.NODE_ENV === 'production' ? liveConfig : testConfig); 

const config = (liveConfig);

const fire = firebase.initializeApp(config);
const firestore = firebase.firestore();
const functions = firebase.functions();


export { 
  firebase, 
  fire, 
  firestore,
  functions
};
