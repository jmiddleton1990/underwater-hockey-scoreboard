const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTagkwva78c81RiOqezfmbosZMW8SJ2mP3rK63KVxlinyVIcF6L8N0sWsLBGA0WMdYVjWU8mk-uWiuY/pub?gid=2001550285&single=true&output=csv";

async function fetchData() {
  try {
    const response = await fetch(CSV_URL + "&rand=" + Math.random());
    const text = await response.text();
    const rows = text.trim().split("\n").map(r => r.split(","));

    const matchTitle = rows[0][1]; // B2
    const team1      = rows[1][1]; // B3
    const score1     = rows[2][1]; // B4
    const team2      = rows[3][1]; // B5
    const score2     = rows[4][1]; // B6
    const timer      = rows[5] ? rows[5][1] : "";

    document.getElementById("match").textContent = matchTitle;
    document.getElementById("score").textContent = `${team1} ${score1} – ${score2} ${team2}`;
    document.getElementById("timer").textContent = timer;

  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

setInterval(fetchData, 1000);
fetchData();
