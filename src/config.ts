interface Config {
  [key: string]: string;
}

const firebase: Config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
};

const maps: Config = {
  apiKey: process.env.VUE_APP_MAPS_API_KEY,
};

export const config = {
  firebase,
  maps,
};
