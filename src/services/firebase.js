import firebase from 'firebase/app';
import 'firebase/firestore';

import { config } from '../config';

const firebaseApp = firebase.initializeApp(config.firebase);

export const database = firebaseApp.firestore();

database.settings({
    timestampsInSnapshots: true
});