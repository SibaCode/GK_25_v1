// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDWuSfwxarSx0k2tpIFCFQ2gNsr-_aop7Y",
  authDomain: "hackathonmvpv2.firebaseapp.com",
  databaseURL: "https://hackathonmvpv2-default-rtdb.firebaseio.com",
  projectId: "hackathonmvpv2",
  storageBucket: "hackathonmvpv2.firebasestorage.app",
  messagingSenderId: "577408051450",
  appId: "1:577408051450:web:c4f45c1334da0473294143",
  measurementId: "G-0C94FRQ323"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("distributorForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    region: document.getElementById("region").value,
    monthlySales: parseFloat(document.getElementById("monthlySales").value),
    customersServed: parseInt(document.getElementById("customersServed").value),
    expectedSales: parseFloat(document.getElementById("expectedSales").value),
    ecoPractice: document.getElementById("ecoPractice").value,
    ewaste: parseFloat(document.getElementById("ewaste").value),
    feedback: document.getElementById("feedback").value
  };

  push(ref(db, "distributors"), data)
    .then(() => alert("Data submitted successfully!"))
    .catch((err) => alert("Error: " + err));
});
