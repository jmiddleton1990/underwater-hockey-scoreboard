const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTagkwva78c81RiOqezfmbosZMW8SJ2mP3rK63KVxlinyVIcF6L8N0sWsLBGA0WMdYVjWU8mk-uWiuY/pub?gid=2001550285&single=true&output=csv";

async function fetchData() {
  try {
    const response = await fetch(CSV_URL + '&_=' + Date.now());
    const text = await response.text();

    const lines = text.trim().split("\n").map(row => row.split(",").map(cell => cell.replace(/^"|"$/g, "")));

    const matchLength = lines[0][1]; // B1
    const team1       = lines[2][1]; // B3
    const score1      = lines[3][1]; // B4
    const team2       = lines[4][1]; // B5
    const score2      = lines[5][1]; // B6
    const timer       = lines[6]?.[1] || ""; // B7

    document.getElementById("matchLength").textContent = matchLength;
    document.getElementById("score").textContent = `${team1} ${score1} – ${score2} ${team2}`;
    document.getElementById("timer").textContent = timer;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

setInterval(fetchData, 1000);
fetchData();
