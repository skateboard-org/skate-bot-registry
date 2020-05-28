const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

if (process.env.NODE_ENV === 'production') {
  module.exports = firebaseConfig;
} else {
  module.exports = firebaseConfig;
}
