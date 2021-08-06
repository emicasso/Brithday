import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAcqtNYlNTE1RmDK06McvTRLbeuz2b5RHo',
  authDomain: 'birthday-52253.firebaseapp.com',
  projectId: 'birthday-52253',
  storageBucket: 'birthday-52253.appspot.com',
  messagingSenderId: '470080342679',
  appId: '1:470080342679:web:23b0a1767ede9bcccd37d2',
};

export default firebase.initializeApp(firebaseConfig);

/* configuracion para iniciar firebase tanto ios como android */
