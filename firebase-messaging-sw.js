importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAao5miwVRh1hiagyFGBEJ2HJaakflCydw",
  authDomain: "agenda-natureza-709ba.firebaseapp.com",
  projectId: "agenda-natureza-709ba",
  storageBucket: "agenda-natureza-709ba.firebasestorage.app",
  messagingSenderId: "506300515452",
  appId: "1:506300515452:web:8a3dbcfa32a2d98828f5f9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon-192.png'
  });
});