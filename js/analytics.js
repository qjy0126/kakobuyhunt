/* Firebase web app: kakobuywebsite — Analytics via GA4 measurementId */
(function () {
  var MEASUREMENT_ID = "G-WLHKQTYR6W";
  window.KF_FIREBASE = {
    apiKey: "AIzaSyCjVTTHt-nDqR3bPYLQKV45F41tVpTOxBk",
    authDomain: "kakobuywebsite.firebaseapp.com",
    projectId: "kakobuywebsite",
    storageBucket: "kakobuywebsite.firebasestorage.app",
    messagingSenderId: "588401556889",
    appId: "1:588401556889:web:c2c00f81c13be52161a708",
    measurementId: MEASUREMENT_ID,
  };

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID);

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
  document.head.appendChild(s);
})();
