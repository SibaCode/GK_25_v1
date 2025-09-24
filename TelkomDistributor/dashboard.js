import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import Chart from "https://cdn.jsdelivr.net/npm/chart.js";

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

const tableBody = document.querySelector("#distributorTable tbody");
const avgGrowthEl = document.getElementById("avgGrowth");
const avgSustainabilityEl = document.getElementById("avgSustainability");
const totalEWasteEl = document.getElementById("totalEWaste");

const salesData = [];
const predictedSalesData = [];
const labels = [];

onValue(ref(db, "distributors"), (snapshot) => {
  tableBody.innerHTML = "";
  salesData.length = 0;
  predictedSalesData.length = 0;
  labels.length = 0;

  let totalGrowth = 0;
  let totalSustainability = 0;
  let totalEWaste = 0;
  let count = 0;

  snapshot.forEach((child) => {
    const data = child.val();
    count++;

    const growthPercentage = ((data.monthlySales / data.expectedSales) * 100).toFixed(2);
    const sustainabilityScore = data.ecoPractice === "Yes" ? 8 : 5;
    const ewaste = data.ewaste || 0;

    totalGrowth += parseFloat(growthPercentage);
    totalSustainability += sustainabilityScore;
    totalEWaste += ewaste;

    // Table row
    tableBody.innerHTML += `<tr>
      <td>${data.name}</td>
      <td>${data.region}</td>
      <td>${data.monthlySales}</td>
      <td>${data.customersServed}</td>
      <td>${data.expectedSales}</td>
      <td>${data.ecoPractice}</td>
      <td>${ewaste}</td>
      <td>${data.feedback}</td>
    </tr>`;

    // Predicted sales
    const predictedSales = data.monthlySales * 1.05; // +5% growth assumption
    labels.push(data.name);
    salesData.push(data.monthlySales);
    predictedSalesData.push(predictedSales);
  });

  // KPIs
  avgGrowthEl.innerText = (totalGrowth / count).toFixed(2) + "%";
  avgSustainabilityEl.innerText = (totalSustainability / count).toFixed(2);
  totalEWasteEl.innerText = totalEWaste + " kg";

  // Render chart
  const ctx = document.getElementById("salesChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        { label: "Monthly Sales", data: salesData, backgroundColor: "orange" },
        { label: "Predicted Sales", data: predictedSalesData, backgroundColor: "lightblue" }
      ]
    },
    options: { responsive: true }
  });
});
