import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvf7rZzqY38wtelwQzBkJwAMcqd0cf3SM",
  authDomain: "ss-rc-56539.firebaseapp.com",
  projectId: "ss-rc-56539",
  storageBucket: "ss-rc-56539.firebasestorage.app",
  messagingSenderId: "1078170890448",
  appId: "1:1078170890448:web:00a2609863f5004c8a2ed5",
  measurementId: "G-RBF1S5P2DX"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey: "YOUR_PUBLIC_VAPID_KEY_HERE"
      }).then((currentToken) => {
        if (currentToken) {
          console.log("FCM Token:", currentToken);
        }
      }).catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
    });
}

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  if (Notification.permission === 'granted') {
    new Notification(notificationTitle, notificationOptions);
  }
});
