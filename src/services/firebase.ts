import firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseFirestore } from '@firebase/firestore-types';

import { config } from '../config';

const firebaseApp = firebase.initializeApp(config.firebase);

export const database: FirebaseFirestore = firebaseApp.firestore();

database.settings({
  timestampsInSnapshots: true,
});
