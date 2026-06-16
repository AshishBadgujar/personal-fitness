/* ============================================================
   FORGE — persistence (localStorage). Survives PWA install.
   Tracks completed days + today's session progress, and derives
   streaks and reward tiers.
   ============================================================ */
window.Store = (() => {
  const KEY = 'forge.v1';
  const DAY = 86400000;

  // Shadow Fight 2 boss ladder (ascending difficulty = higher rank)
  const TIERS = [
    { key: 'shadow',  name: 'Shadow',  min: 0,   color: '#5aa9a0' },
    { key: 'lynx',    name: 'Lynx',    min: 3,   color: '#7a6cff' },
    { key: 'hermit',  name: 'Hermit',  min: 7,   color: '#2bb673' },
    { key: 'butcher', name: 'Butcher', min: 14,  color: '#e0552b' },
    { key: 'wasp',    name: 'Wasp',    min: 21,  color: '#f5b301' },
    { key: 'widow',   name: 'Widow',   min: 30,  color: '#e23a86' },
    { key: 'shogun',  name: 'Shogun',  min: 60,  color: '#3f8cff' },
    { key: 'titan',   name: 'Titan',   min: 100, color: '#16e0c8' }
  ];

  let s;
  try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { s = {}; }
  if (!s.completed) s.completed = {};   // workout: { 'YYYY-MM-DD': true }
  if (!s.progress)  s.progress = null;  // today's session: { date, idx, keys: [] }
  if (!s.habits)    s.habits = [];      // [{ id, name, icon, completed: {date:true} }]

  function save(){ try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  function todayKey(d = new Date()){
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  /* ---------- completion ---------- */
  function isCompleted(key){ return !!s.completed[key]; }

  // mark TODAY only — driven by finishing today's session
  function setTodayComplete(done){
    const k = todayKey();
    if (done) s.completed[k] = true; else delete s.completed[k];
    save();
  }

  /* ---------- in-progress session checklist (per day, per session) ---------- */
  function saveProgress(idx, keys){
    if (!s.progress || s.progress.date !== todayKey()) s.progress = { date: todayKey(), byIdx: {} };
    s.progress.byIdx[idx] = keys;
    save();
  }
  function loadProgress(idx){
    if (s.progress && s.progress.date === todayKey() && s.progress.byIdx)
      return s.progress.byIdx[idx] || [];
    return [];
  }

  /* ---------- streaks (generic over a {date:true} map) ---------- */
  function streakOf(map){
    let n = 0;
    const d = new Date();
    if (!map[todayKey(d)]) d.setDate(d.getDate() - 1); // today optional
    while (map[todayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function longestOf(map){
    const keys = Object.keys(map).filter(k => map[k]).sort();
    let max = 0, run = 0, prev = null;
    for (const k of keys){
      if (prev){ const diff = Math.round((new Date(k) - new Date(prev)) / DAY); run = diff === 1 ? run + 1 : 1; }
      else run = 1;
      if (run > max) max = run;
      prev = k;
    }
    return max;
  }
  const currentStreak = () => streakOf(s.completed);

  /* ---------- custom habits ---------- */
  function habits(){ return s.habits; }
  function addHabit(name){
    const id = 'h' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    s.habits.push({ id, name: name.trim().slice(0, 40), completed: {} });
    save();
    return id;
  }
  function removeHabit(id){ s.habits = s.habits.filter(h => h.id !== id); save(); }
  function _habit(id){ return s.habits.find(h => h.id === id); }
  function toggleHabitToday(id){
    const h = _habit(id); if (!h) return;
    const k = todayKey();
    if (h.completed[k]) delete h.completed[k]; else h.completed[k] = true;
    save();
  }
  function habitDoneToday(id){ const h = _habit(id); return h ? !!h.completed[todayKey()] : false; }
  function habitStreak(id){ const h = _habit(id); return h ? streakOf(h.completed) : 0; }

  /* ---------- aggregate daily progress across all habits (workout + custom) ---------- */
  function allMaps(){ return [s.completed, ...s.habits.map(h => h.completed)]; }
  function dayProgress(key){
    const maps = allMaps();
    let done = 0;
    maps.forEach(m => { if (m[key]) done++; });
    return { done, total: maps.length };
  }
  function bestLongest(){
    let best = longestOf(s.completed);
    s.habits.forEach(h => { best = Math.max(best, longestOf(h.completed)); });
    return best;
  }

  /* ---------- reward tiers ---------- */
  function tierFor(streak){ let t = null; for (const x of TIERS) if (streak >= x.min) t = x; return t; }
  function tiers(){ return TIERS; }


  return {
    todayKey, isCompleted, setTodayComplete,
    saveProgress, loadProgress,
    currentStreak,
    habits, addHabit, removeHabit, toggleHabitToday, habitDoneToday,
    habitStreak,
    dayProgress, bestLongest,
    tierFor, tiers
  };
})();
