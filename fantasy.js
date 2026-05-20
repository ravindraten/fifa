/* ===== FIFA 2026 FANTASY GAME — Supabase Backend ===== */

// ─── CONFIGURATION ───────────────────────────────────────────────
// Replace these with your Supabase project credentials
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

let supabase = null;
let currentUser = null;
let mySquad = []; // [{player_name, team, position, price}]

// ─── PLAYER DATABASE WITH PRICES ────────────────────────────────
// Positions & prices for all 48×26 = 1248 players
const playerPositions = {};
const playerPrices = {};

// Position assignment logic based on squad order (from teamPlayers in script.js)
// Typical 26-man squad: GK(1-3), DEF(4-10), MID(11-18), FWD(19-26)
function assignPositionsAndPrices() {
  const starPlayers = {
    "Lionel Messi": 12.5, "Kylian Mbappe": 12.0, "Erling Haaland": 11.5,
    "Vinicius Junior": 11.0, "Mohamed Salah": 10.5, "Kevin De Bruyne": 10.5,
    "Rodri": 10.0, "Jude Bellingham": 10.0, "Son Heung-min": 10.0,
    "Lamine Yamal": 9.5, "Florian Wirtz": 9.5, "Martin Odegaard": 9.5,
    "Pedri": 9.0, "Jamal Musiala": 9.5, "Christian Pulisic": 8.5,
    "Darwin Nunez": 9.0, "Virgil van Dijk": 9.0, "Marquinhos": 8.5,
    "Alisson": 8.0, "Marc-Andre ter Stegen": 8.0, "Thibaut Courtois": 8.0,
    "Achraf Hakimi": 8.5, "Alphonso Davies": 8.5, "Ronald Araujo": 8.5,
    "William Saliba": 9.0, "Cody Gakpo": 8.5, "Romelu Lukaku": 8.0,
    "Antoine Griezmann": 9.0, "Ousmane Dembele": 8.5, "Nico Williams": 8.5,
    "Federico Valverde": 9.0, "Bruno Guimaraes": 8.0, "Granit Xhaka": 7.5,
    "Hakan Calhanoglu": 8.0, "Arda Guler": 8.0, "Endrick": 8.0,
    "Alexander Isak": 9.5, "Viktor Gyokeres": 9.0, "Jonathan David": 8.5,
    "Xavi Simons": 8.5, "Takefusa Kubo": 7.5, "Kaoru Mitoma": 7.5,
    "Moises Caicedo": 8.0, "Enzo Fernandez": 8.5, "Alexis Mac Allister": 8.5,
    "Julian Alvarez": 9.5, "Lautaro Martinez": 9.5, "Paulo Dybala": 8.0,
    "Raphinha": 8.5, "Savinho": 7.5, "Hakim Ziyech": 7.0,
    "Youssef En-Nesyri": 7.5, "Sadio Mane": 8.0, "Nicolas Jackson": 8.0,
    "Dejan Kulusevski": 8.0, "Chris Wood": 6.5, "Enner Valencia": 7.0
  };

  const tierPrices = {
    GK: [5.5, 5.0, 4.5],
    DEF: [6.5, 6.0, 5.5, 5.5, 5.0, 5.0, 4.5],
    MID: [7.0, 6.5, 6.5, 6.0, 6.0, 5.5, 5.5, 5.0],
    FWD: [7.5, 7.0, 6.5, 6.0, 5.5, 5.5, 5.0, 5.0]
  };

  Object.entries(teamPlayers).forEach(([team, players]) => {
    players.forEach((player, idx) => {
      let pos;
      if (idx < 3) pos = "GK";
      else if (idx < 10) pos = "DEF";
      else if (idx < 18) pos = "MID";
      else pos = "FWD";

      playerPositions[player + "|" + team] = pos;

      if (starPlayers[player]) {
        playerPrices[player + "|" + team] = starPlayers[player];
      } else {
        const posIdx = idx < 3 ? idx : idx < 10 ? idx - 3 : idx < 18 ? idx - 10 : idx - 18;
        const prices = tierPrices[pos];
        playerPrices[player + "|" + team] = prices[Math.min(posIdx, prices.length - 1)];
      }
    });
  });
}

// ─── SUPABASE INIT ──────────────────────────────────────────────
function initSupabase() {
  if (SUPABASE_URL.includes("YOUR_PROJECT_ID")) {
    console.warn("Fantasy: Configure SUPABASE_URL and SUPABASE_ANON_KEY in fantasy.js");
    return false;
  }
  if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
    console.warn("Fantasy: Supabase SDK not loaded yet, falling back to offline mode");
    return false;
  }
  try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return true;
  } catch (e) {
    console.error("Supabase init failed:", e);
    return false;
  }
}

// ─── AUTH ────────────────────────────────────────────────────────
let isSignUpMode = false;

function setupAuth() {
  const form = document.getElementById("authForm");
  const toggle = document.getElementById("authToggleLink");
  const title = document.getElementById("authTitle");
  const nameInput = document.getElementById("authDisplayName");
  const submitBtn = document.getElementById("authSubmitBtn");

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    isSignUpMode = !isSignUpMode;
    title.textContent = isSignUpMode ? "Create Account" : "Sign In to Play";
    submitBtn.textContent = isSignUpMode ? "Sign Up" : "Sign In";
    nameInput.style.display = isSignUpMode ? "block" : "none";
    toggle.textContent = isSignUpMode ? "Sign In" : "Sign Up";
    document.getElementById("authError").textContent = "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("authEmail").value.trim();
    const password = document.getElementById("authPassword").value;
    const displayName = document.getElementById("authDisplayName").value.trim();
    const errEl = document.getElementById("authError");
    errEl.textContent = "";
    submitBtn.disabled = true;

    try {
      if (isSignUpMode) {
        if (!displayName) { errEl.textContent = "Display name required"; submitBtn.disabled = false; return; }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName } }
        });
        if (error) throw error;
        if (data.user && !data.session) {
          errEl.textContent = "Check your email to confirm your account.";
          errEl.style.color = "var(--neon)";
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      errEl.textContent = err.message || "Authentication failed";
      errEl.style.color = "#d93025";
    }
    submitBtn.disabled = false;
  });

  // Listen for auth state changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      currentUser = session.user;
      await onLogin();
    } else {
      currentUser = null;
      onLogout();
    }
  });

  // Check existing session
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      currentUser = session.user;
      onLogin();
    }
  });

  // Logout
  document.getElementById("fantasyLogout").addEventListener("click", async () => {
    await supabase.auth.signOut();
  });
}

async function onLogin() {
  document.getElementById("fantasyAuth").style.display = "none";
  document.getElementById("fantasyGame").style.display = "block";
  const name = currentUser.user_metadata?.display_name || currentUser.email.split("@")[0];
  document.getElementById("fantasyUserName").textContent = `👤 ${name}`;

  // Ensure profile exists
  await supabase.from("profiles").upsert({
    id: currentUser.id,
    email: currentUser.email,
    display_name: name
  }, { onConflict: "id" });

  await loadMySquad();
  renderMyTeam();
  renderPickPlayers();
  loadLeaderboard();
}

function onLogout() {
  document.getElementById("fantasyAuth").style.display = "flex";
  document.getElementById("fantasyGame").style.display = "none";
  mySquad = [];
}

// ─── SQUAD MANAGEMENT ───────────────────────────────────────────
async function loadMySquad() {
  const { data, error } = await supabase
    .from("fantasy_squads")
    .select("*")
    .eq("user_id", currentUser.id);

  if (!error && data) {
    mySquad = data.map((r) => ({
      player_name: r.player_name,
      team: r.team,
      position: r.position,
      price: r.price
    }));
  }
  updateBudgetDisplay();
}

function updateBudgetDisplay() {
  const spent = mySquad.reduce((sum, p) => sum + p.price, 0);
  const remaining = (100 - spent).toFixed(1);
  document.getElementById("fantasyBudgetLeft").textContent = `$${remaining}M`;
  document.getElementById("fantasyPlayerCount").textContent = `${mySquad.length}/15`;
}

function getPositionCounts() {
  const counts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
  mySquad.forEach((p) => counts[p.position]++);
  return counts;
}

function getCountryCounts() {
  const counts = {};
  mySquad.forEach((p) => {
    counts[p.team] = (counts[p.team] || 0) + 1;
  });
  return counts;
}

function canAddPlayer(player_name, team, position, price) {
  if (mySquad.length >= 15) return { ok: false, reason: "Squad full (15/15)" };
  if (mySquad.some((p) => p.player_name === player_name && p.team === team)) return { ok: false, reason: "Already in squad" };

  const spent = mySquad.reduce((sum, p) => sum + p.price, 0);
  if (spent + price > 100) return { ok: false, reason: "Over budget" };

  const posCounts = getPositionCounts();
  const posLimits = { GK: 2, DEF: 5, MID: 5, FWD: 3 };
  if (posCounts[position] >= posLimits[position]) return { ok: false, reason: `Max ${posLimits[position]} ${position}` };

  const countryCounts = getCountryCounts();
  if ((countryCounts[team] || 0) >= 3) return { ok: false, reason: "Max 3 per country" };

  return { ok: true };
}

async function addPlayer(player_name, team, position, price) {
  const check = canAddPlayer(player_name, team, position, price);
  if (!check.ok) { alert(check.reason); return; }

  const { error } = await supabase.from("fantasy_squads").insert({
    user_id: currentUser.id,
    player_name,
    team,
    position,
    price
  });

  if (error) { alert("Failed to add player: " + error.message); return; }

  mySquad.push({ player_name, team, position, price });
  updateBudgetDisplay();
  renderMyTeam();
  renderPickPlayers();
  await updateLeaderboardEntry();
}

async function removePlayer(player_name, team) {
  const { error } = await supabase
    .from("fantasy_squads")
    .delete()
    .eq("user_id", currentUser.id)
    .eq("player_name", player_name)
    .eq("team", team);

  if (error) { alert("Failed to remove: " + error.message); return; }

  mySquad = mySquad.filter((p) => !(p.player_name === player_name && p.team === team));
  updateBudgetDisplay();
  renderMyTeam();
  renderPickPlayers();
  await updateLeaderboardEntry();
}

async function updateLeaderboardEntry() {
  // Recalculate total points for this user
  const { data } = await supabase
    .from("player_points")
    .select("player_name, team, total_points");

  let totalPts = 0;
  if (data) {
    mySquad.forEach((sp) => {
      const match = data.find((d) => d.player_name === sp.player_name && d.team === sp.team);
      if (match) totalPts += match.total_points;
    });
  }

  const name = currentUser.user_metadata?.display_name || currentUser.email.split("@")[0];
  await supabase.from("leaderboard").upsert({
    user_id: currentUser.id,
    display_name: name,
    total_points: totalPts,
    squad_count: mySquad.length
  }, { onConflict: "user_id" });
}

// ─── RENDER: MY TEAM ────────────────────────────────────────────
function renderMyTeam() {
  const container = document.getElementById("myTeamDisplay");
  if (mySquad.length === 0) {
    container.innerHTML = `<div class="myTeamEmpty">
      <p>Your squad is empty.</p>
      <p>Go to <strong>Pick Players</strong> to build your dream team!</p>
    </div>`;
    return;
  }

  const byPos = { GK: [], DEF: [], MID: [], FWD: [] };
  mySquad.forEach((p) => byPos[p.position].push(p));

  let html = "";
  ["GK", "DEF", "MID", "FWD"].forEach((pos) => {
    if (byPos[pos].length === 0) return;
    html += `<div class="myTeamSection"><h4>${pos} (${byPos[pos].length})</h4>`;
    byPos[pos].forEach((p) => {
      html += `<div class="myTeamRow">
        <div class="playerInfo">
          <span class="playerPos">${p.position}</span>
          ${flag(p.team)}
          <span>${p.player_name}</span>
          <span style="color:var(--muted);font-size:0.8rem;">${p.team}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <span style="font-size:0.85rem;color:var(--muted);">$${p.price}M</span>
          <button class="removeBtn" onclick="removePlayer('${p.player_name.replace(/'/g, "\\'")}','${p.team.replace(/'/g, "\\'")}')">✕</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  });

  const spent = mySquad.reduce((sum, p) => sum + p.price, 0);
  html += `<div style="text-align:center;margin-top:1rem;color:var(--muted);font-size:0.88rem;">
    Total spent: <strong>$${spent.toFixed(1)}M</strong> | Remaining: <strong>$${(100 - spent).toFixed(1)}M</strong>
  </div>`;
  container.innerHTML = html;
}

// ─── RENDER: PICK PLAYERS ───────────────────────────────────────
function renderPickPlayers() {
  const posFilter = document.getElementById("pickPosFilter").value;
  const countryFilter = document.getElementById("pickCountryFilter").value;
  const search = document.getElementById("pickSearch").value.toLowerCase();

  const container = document.getElementById("pickPlayerList");
  let html = "";
  let count = 0;

  Object.entries(teamPlayers).forEach(([team, players]) => {
    if (countryFilter !== "all" && team !== countryFilter) return;

    players.forEach((player) => {
      const key = player + "|" + team;
      const pos = playerPositions[key] || "MID";
      const price = playerPrices[key] || 5.0;

      if (posFilter !== "all" && pos !== posFilter) return;
      if (search && !player.toLowerCase().includes(search) && !team.toLowerCase().includes(search)) return;

      const inSquad = mySquad.some((p) => p.player_name === player && p.team === team);
      const check = canAddPlayer(player, team, pos, price);
      const disabled = inSquad || !check.ok;

      html += `<div class="pickRow${inSquad ? " inSquad" : ""}">
        <div class="pickLeft">
          <span class="pickPos">${pos}</span>
          ${flag(team)}
          <span>${player}</span>
          <span style="color:var(--muted);font-size:0.8rem;margin-left:0.3rem;">${team}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.4rem;">
          <span class="pickPrice">$${price}M</span>
          <button class="addBtn" ${disabled ? "disabled" : ""} onclick="addPlayer('${player.replace(/'/g, "\\'")}','${team.replace(/'/g, "\\'")}','${pos}',${price})">
            ${inSquad ? "✓" : "+"}
          </button>
        </div>
      </div>`;
      count++;
      if (count >= 100) return;
    });
  });

  if (!html) html = `<p style="text-align:center;color:var(--muted);">No players found.</p>`;
  container.innerHTML = html;
}

// ─── RENDER: LEADERBOARD ────────────────────────────────────────
async function loadLeaderboard() {
  const container = document.getElementById("leaderboardDisplay");
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("total_points", { ascending: false })
    .limit(50);

  if (error || !data || data.length === 0) {
    container.innerHTML = `<p style="text-align:center;padding:1.5rem;color:var(--muted);">No players on the leaderboard yet. Build your squad to get started!</p>`;
    return;
  }

  let html = `<table><thead><tr><th>#</th><th>Manager</th><th>Squad</th><th>Points</th></tr></thead><tbody>`;
  data.forEach((row, i) => {
    const isMe = row.user_id === currentUser.id;
    html += `<tr class="${isMe ? "lbMe" : ""}">
      <td class="lbRank">${i + 1}</td>
      <td>${row.display_name}${isMe ? " (You)" : ""}</td>
      <td>${row.squad_count}/15</td>
      <td><strong>${row.total_points}</strong></td>
    </tr>`;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

// ─── FANTASY SUB-TABS ───────────────────────────────────────────
function initFantasyTabs() {
  document.querySelectorAll(".fTab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".fTab").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".fPanel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("ftab-" + btn.dataset.ftab).classList.add("active");

      // Refresh data when switching
      if (btn.dataset.ftab === "leaderboard") loadLeaderboard();
      if (btn.dataset.ftab === "pickplayers") renderPickPlayers();
    });
  });
}

// ─── PICK FILTERS ───────────────────────────────────────────────
function initPickFilters() {
  const countrySelect = document.getElementById("pickCountryFilter");
  Object.keys(teamPlayers).sort().forEach((team) => {
    const opt = document.createElement("option");
    opt.value = team;
    opt.textContent = team;
    countrySelect.appendChild(opt);
  });

  document.getElementById("pickPosFilter").addEventListener("change", renderPickPlayers);
  document.getElementById("pickCountryFilter").addEventListener("change", renderPickPlayers);
  document.getElementById("pickSearch").addEventListener("input", renderPickPlayers);
}

// ─── OFFLINE MODE (no Supabase configured) ──────────────────────
function initOfflineFantasy() {
  // Auto-login as test user so the fantasy page is visible by default
  const savedName = localStorage.getItem("fantasyName") || "TestManager";
  localStorage.setItem("fantasyName", savedName);
  currentUser = { id: "local", email: "local", user_metadata: { display_name: savedName } };
  onLoginOffline(savedName);
}

function onLoginOffline(name) {
  document.getElementById("fantasyAuth").style.display = "none";
  document.getElementById("fantasyGame").style.display = "block";
  document.getElementById("fantasyUserName").textContent = `👤 ${name}`;

  // Load squad from localStorage, or seed with a default test squad
  const saved = localStorage.getItem("fantasySquad");
  if (saved) {
    mySquad = JSON.parse(saved);
  } else {
    mySquad = getDefaultTestSquad();
    localStorage.setItem("fantasySquad", JSON.stringify(mySquad));
  }
  updateBudgetDisplay();
  renderMyTeam();
  renderPickPlayers();
  renderOfflineLeaderboard();

  // Override logout for offline mode
  document.getElementById("fantasyLogout").onclick = () => {
    localStorage.removeItem("fantasyName");
    currentUser = null;
    document.getElementById("fantasyAuth").style.display = "flex";
    document.getElementById("fantasyGame").style.display = "none";
    mySquad = [];
  };
}

// Default 15-player squad for the test user
function getDefaultTestSquad() {
  return [
    { player_name: "Alisson", team: "Brazil", position: "GK", price: 8.0 },
    { player_name: "Yann Sommer", team: "Switzerland", position: "GK", price: 5.5 },
    { player_name: "Virgil van Dijk", team: "Netherlands", position: "DEF", price: 9.0 },
    { player_name: "William Saliba", team: "France", position: "DEF", price: 9.0 },
    { player_name: "Achraf Hakimi", team: "Morocco", position: "DEF", price: 8.5 },
    { player_name: "Alphonso Davies", team: "Canada", position: "DEF", price: 8.5 },
    { player_name: "Ronald Araujo", team: "Uruguay", position: "DEF", price: 8.5 },
    { player_name: "Kevin De Bruyne", team: "Belgium", position: "MID", price: 10.5 },
    { player_name: "Rodri", team: "Spain", position: "MID", price: 10.0 },
    { player_name: "Martin Odegaard", team: "Norway", position: "MID", price: 9.5 },
    { player_name: "Federico Valverde", team: "Uruguay", position: "MID", price: 9.0 },
    { player_name: "Enzo Fernandez", team: "Argentina", position: "MID", price: 8.5 },
    { player_name: "Kylian Mbappe", team: "France", position: "FWD", price: 12.0 },
    { player_name: "Erling Haaland", team: "Norway", position: "FWD", price: 11.5 },
    { player_name: "Lautaro Martinez", team: "Argentina", position: "FWD", price: 9.5 }
  ];
}

function renderOfflineLeaderboard() {
  const container = document.getElementById("leaderboardDisplay");
  const name = currentUser.user_metadata.display_name;
  // Simulated leaderboard with test competitors
  const fakeLeaderboard = [
    { name: name + " (You)", squad: mySquad.length, pts: 87, me: true },
    { name: "FutbolKing99", squad: 15, pts: 82, me: false },
    { name: "GoalMachine_22", squad: 15, pts: 76, me: false },
    { name: "TikiTakaFC", squad: 14, pts: 71, me: false },
    { name: "WorldCupDreamer", squad: 15, pts: 68, me: false },
    { name: "MessiFanatic", squad: 15, pts: 64, me: false },
    { name: "DefensiveWall", squad: 13, pts: 59, me: false },
    { name: "HattrickHero", squad: 15, pts: 55, me: false },
    { name: "FantasyBoss_26", squad: 15, pts: 51, me: false },
    { name: "GoldenBoot", squad: 12, pts: 44, me: false }
  ];
  // Sort by points
  fakeLeaderboard.sort((a, b) => b.pts - a.pts);

  let html = `<table><thead><tr><th>#</th><th>Manager</th><th>Squad</th><th>Points</th></tr></thead><tbody>`;
  fakeLeaderboard.forEach((row, i) => {
    html += `<tr class="${row.me ? "lbMe" : ""}">
      <td class="lbRank">${i + 1}</td>
      <td>${row.name}</td>
      <td>${row.squad}/15</td>
      <td><strong>${row.pts}</strong></td>
    </tr>`;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

// Override addPlayer/removePlayer for offline mode
const _addPlayerOnline = addPlayer;
const _removePlayerOnline = removePlayer;

async function addPlayerOffline(player_name, team, position, price) {
  const check = canAddPlayer(player_name, team, position, price);
  if (!check.ok) { alert(check.reason); return; }
  mySquad.push({ player_name, team, position, price });
  localStorage.setItem("fantasySquad", JSON.stringify(mySquad));
  updateBudgetDisplay();
  renderMyTeam();
  renderPickPlayers();
}

async function removePlayerOffline(player_name, team) {
  mySquad = mySquad.filter((p) => !(p.player_name === player_name && p.team === team));
  localStorage.setItem("fantasySquad", JSON.stringify(mySquad));
  updateBudgetDisplay();
  renderMyTeam();
  renderPickPlayers();
}

// ─── INIT ───────────────────────────────────────────────────────
function initFantasy() {
  if (typeof teamPlayers === "undefined") {
    // script.js hasn't loaded yet, retry shortly
    setTimeout(initFantasy, 100);
    return;
  }
  assignPositionsAndPrices();
  initFantasyTabs();
  initPickFilters();

  const supabaseReady = initSupabase();

  if (supabaseReady) {
    setupAuth();
  } else {
    // Offline/localStorage mode
    initOfflineFantasy();
    // Replace global functions with offline versions
    window.addPlayer = addPlayerOffline;
    window.removePlayer = removePlayerOffline;
  }
}

// Make functions available globally for onclick handlers
window.addPlayer = addPlayer;
window.removePlayer = removePlayer;

// Wait for DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFantasy);
} else {
  initFantasy();
}
