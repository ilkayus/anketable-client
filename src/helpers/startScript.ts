/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyC-9AQNxInNCpWz1QjN_hTnF1T5t4didLQ',
  authDomain: 'pollable-ba363.firebaseapp.com',
  projectId: 'pollable-ba363',
  storageBucket: 'pollable-ba363.appspot.com',
  messagingSenderId: '5852171988',
  appId: '1:5852171988:web:5e674628156ec1880c3541',
  measurementId: 'G-605QGPST8E',
};

const startScript = () => {
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
  if (localStorage.theme === undefined) {
    localStorage.theme = 'light';
  }
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export default startScript;
