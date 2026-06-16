/* ============================================================
   FORGE — app shell: hash router, Today, Session checklist,
   Week, Approach. Single dark theme. No persistence.
   ============================================================ */
(() => {
  const view = document.getElementById('view');
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const RANK_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>`;
  const RANK_LOCK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;

  /* ============================================================ ROUTER */
  function parseHash(){ return (location.hash || '#/').slice(1).split('/').filter(Boolean); }
  function render(){
    const parts = parseHash();
    if (parts[0] === 'session') sessionView(parts[1]);
    else if (parts[0] === 'week') week();
    else if (parts[0] === 'calendar') calendar();
    else if (parts[0] === 'habits') habitsPage();
    else if (parts[0] === 'approach') approach();
    else dashboard();
    const sec = view.querySelector('section');
    if (sec) sec.classList.add('view-anim');
    const top = '/' + (parts[0] || '');
    document.querySelectorAll('.navitem').forEach(a =>
      a.classList.toggle('active', a.dataset.route === top ||
        (parts[0] === 'session' && a.dataset.route === '/')));
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange', render);

  /* ============================================================ TODAY */
  function dashboard(){
    const idx = new Date().getDay();
    const d = DATA.WEEK[idx];
    const totalSteps = d.phases.reduce((n,p)=>n+p.steps.length, 0);
    const now = new Date();

    const streak = Store.currentStreak();
    const tier = Store.tierFor(streak);

    view.innerHTML = `
      <section class="stack">
        <div class="hero-greeting">
          <p class="eyebrow">${DATA.DAY_NAMES[idx]} · ${now.toLocaleDateString(undefined,{month:'short',day:'numeric'})}</p>
          <h1>${greeting()}</h1>
        </div>

        ${streak > 0 ? `<a class="streak-chip" href="#/calendar">
          <span class="chip-num">${streak}</span><span class="chip-txt">day streak</span>
          ${tier ? `<span class="chip-tier">${tier.name}</span>` : ''}
          <span class="chip-arrow">›</span>
        </a>` : ''}

        <div class="card session-hero">
          <p class="hero-focus">${esc(d.focus)}</p>
          <h2 class="hero-name">${esc(d.name)}</h2>
          <div class="hero-stats">
            <span>~${estimateMinutes(d)} min</span>
            <span>${d.phases.length} blocks</span>
            <span>${totalSteps} moves</span>
          </div>
          ${d.note ? `<p class="hero-note">${esc(d.note)}</p>` : ''}
          <a class="start-btn" href="#/session/${idx}">Start Session</a>
        </div>

        ${habitChecklist()}
      </section>`;

    wireHabits(dashboard);
  }

  /* ============================================================ ADD / MANAGE HABITS */
  function habitsPage(){
    view.innerHTML = `
      <section class="stack">
        <div class="page-head"><h1>Habits</h1><p class="muted">Add or remove what you track</p></div>
        ${habitManager()}
      </section>`;
    wireHabits(habitsPage);
  }

  function greeting(){
    const h = new Date().getHours();
    if (h < 5) return 'Late session';
    if (h < 11) return 'Morning — prime time';
    if (h < 17) return 'Good afternoon';
    return 'Evening grind';
  }

  // rough session-length estimate from the plan's timings
  function estimateMinutes(d){
    let sec = 0;
    d.phases.forEach(p => p.steps.forEach(s => {
      const sets = s.sets || 1;
      const work = s.duration ? s.duration * sets : sets * 40;
      const rest = (s.rest || (sets > 1 ? 25 : 0)) * Math.max(0, sets - 1);
      sec += work + rest + 15;
    }));
    return Math.max(5, Math.round(sec / 60 / 5) * 5);
  }

  /* ============================================================ SESSION (simple checklist) */
  let SESS = null;
  function sessionView(dayParam){
    const idx = dayParam !== undefined ? parseInt(dayParam,10) : new Date().getDay();
    const day = DATA.WEEK[idx];
    if (!day){ location.hash = '#/'; return; }
    if (!SESS || SESS.idx !== idx) {
      SESS = { idx, day, done: new Set(Store.loadProgress(idx)) };
    }
    renderSession();
  }

  // persist this session's checklist only — marking the day is manual
  function persistSession(){
    Store.saveProgress(SESS.idx, [...SESS.done]);
  }

  function renderSession(){
    const day = SESS.day;
    let total = 0; day.phases.forEach(p => total += p.steps.length);
    const done = SESS.done.size;
    const pct = total ? Math.round(done/total*100) : 0;
    const allDone = done === total && total > 0;

    const phases = day.phases.map((p, pi) => {
      const rows = p.steps.map((st, si) => {
        const key = pi + '-' + si;
        const isDone = SESS.done.has(key);
        return `
          <button class="sess-row ${isDone?'done':''}" data-key="${key}">
            <span class="sess-ill">${SVGIcons.get(st.name)}</span>
            <span class="sess-main">
              <span class="sess-name">${esc(st.name)}</span>
              ${st.target?`<span class="sess-target">${esc(st.target)}</span>`:''}
              ${st.cue?`<span class="sess-cue">${esc(st.cue)}</span>`:''}
            </span>
            <span class="sess-check">${isDone?'✓':''}</span>
          </button>`;
      }).join('');
      return `<div class="sess-phase"><p class="block-title">${esc(p.title)}</p><div class="card sess-list">${rows}</div></div>`;
    }).join('');

    view.innerHTML = `
      <section class="stack session">
        <div class="session-top">
          <span class="step-count num" id="sessCount">${done} / ${total}</span>
        </div>
        <div class="sess-head">
          <p class="hero-focus">${esc(day.focus)}</p>
          <h1>${esc(day.name)}</h1>
          <p class="sess-sub">~${estimateMinutes(day)} min · ${total} moves</p>
        </div>
        <div class="prog"><span id="progFill" style="width:${pct}%"></span></div>
        ${allDone ? doneCard() : ''}
        ${phases}
      </section>`;

    SESS.wasComplete = allDone;
    view.querySelectorAll('[data-key]').forEach(b => b.addEventListener('click', () => toggleRow(b)));
    const rb = document.getElementById('resetBtn');
    if (rb) rb.addEventListener('click', () => { SESS.done.clear(); persistSession(); renderSession(); });
  }

  function doneCard(){
    const isToday = SESS.idx === new Date().getDay();
    if (!isToday)
      return `<div class="card center done-card"><div class="done-emoji">✓</div><h2>Session complete</h2><p class="muted">Nicely done.</p></div>`;
    const streak = Store.currentStreak();
    const tier = Store.tierFor(streak);
    return `<div class="card center done-card">
        <div class="done-emoji">✓</div>
        <h2>Session complete</h2>
        <p class="muted">Today is locked in.</p>
        <div class="done-streak"><span class="streak-num">${streak}</span><span class="streak-sub">day streak</span></div>
        ${tier ? `<span class="tier-badge" style="--m:${tier.color}">${tier.name}</span>` : ''}
        <a class="btn small" href="#/calendar">View streak & rewards</a>
        <button class="btn ghost small" id="resetBtn">Reset</button>
      </div>`;
  }

  // tap a row: update only that row + progress; re-render only when crossing complete
  function toggleRow(b){
    const k = b.dataset.key;
    const nowDone = !SESS.done.has(k);
    if (nowDone) SESS.done.add(k); else SESS.done.delete(k);
    b.classList.toggle('done', nowDone);
    const chk = b.querySelector('.sess-check');
    if (chk) chk.textContent = nowDone ? '✓' : '';

    let total = 0; SESS.day.phases.forEach(p => total += p.steps.length);
    const done = SESS.done.size;
    const fill = document.getElementById('progFill');
    if (fill) fill.style.width = (total ? Math.round(done/total*100) : 0) + '%';
    const count = document.getElementById('sessCount');
    if (count) count.textContent = done + ' / ' + total;

    persistSession();
    const allDone = done === total && total > 0;
    if (allDone !== SESS.wasComplete) renderSession();
  }

  /* ============================================================ WEEK */
  function week(){
    const todayIdx = new Date().getDay();
    const cards = DATA.WEEK_ORDER.map(i => {
      const d = DATA.WEEK[i];
      const isToday = i === todayIdx;
      const blocks = d.phases.map(p => `
        <div class="block">
          <p class="block-title">${esc(p.title)}</p>
          <ul>${p.steps.map(s=>`<li><span>${esc(s.name)}</span>${s.target?`<em>${esc(s.target)}</em>`:''}</li>`).join('')}</ul>
        </div>`).join('');
      return `
        <details class="card plan-day ${isToday?'today':''}" ${isToday?'open':''}>
          <summary>
            <div>
              <p class="day-name">${DATA.DAY_NAMES[i]}${isToday?' <span class="pill tiny">Today</span>':''}</p>
              <p class="day-sub">${esc(d.name)}</p>
            </div>
            <span class="pill ghost">${esc(d.focus)}</span>
          </summary>
          ${d.note?`<p class="muted small note">${esc(d.note)}</p>`:''}
          <div class="blocks">${blocks}</div>
          <a class="btn block" href="#/session/${i}">Start this session</a>
        </details>`;
    }).join('');
    view.innerHTML = `
      <section class="stack">
        <div class="page-head"><h1>Weekly Plan</h1><p class="muted">6 training days + 1 active recovery</p></div>
        ${cards}
      </section>`;
  }

  /* ============================================================ CALENDAR + REWARDS */
  // Rank badge: image from img/ranks/<key>.(webp|png|jpg|jpeg),
  // falling back to the built-in SVG emblem if no file is present.
  function rankBadge(t){
    return `<img class="rank-img" data-key="${t.key}" data-color="${t.color}" data-ext="0" src="img/ranks/${t.key}.webp" alt="${esc(t.name)}">`;
  }
  function wireRankImages(){
    const exts = ['webp','png','jpg','jpeg'];
    view.querySelectorAll('.rank-img[data-key]').forEach(img => {
      img.addEventListener('error', () => {
        let i = parseInt(img.dataset.ext, 10) + 1;
        if (i < exts.length){ img.dataset.ext = i; img.src = 'img/ranks/' + img.dataset.key + '.' + exts[i]; }
        else { img.outerHTML = SVGIcons.rank(img.dataset.key, img.dataset.color); }
      });
    });
  }

  let calOffset = 0;
  function calendar(){
    const now = new Date();
    const vm = new Date(now.getFullYear(), now.getMonth() + calOffset, 1);
    const y = vm.getFullYear(), m = vm.getMonth();
    const first = vm.getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const todayK = Store.todayKey();
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const best = Store.bestLongest();

    let cells = '';
    for (let i = 0; i < first; i++) cells += `<span class="cal-cell empty"></span>`;
    for (let dn = 1; dn <= days; dn++){
      const dt = new Date(y, m, dn);
      const k = Store.todayKey(dt);
      const isToday = k === todayK;
      const future = dt > todayMid;
      const pr = Store.dayProgress(k);
      let cls = 'cal-cell', style = '', label = dn;
      if (future) cls += ' future';
      else if (pr.done > 0){
        const r = pr.done / pr.total;
        if (r >= 1){ cls += ' done'; label = '✓'; }
        else { cls += ' part'; style = `background:color-mix(in srgb, var(--accent) ${Math.round(r*100)}%, var(--surface-2))`; }
      }
      if (isToday) cls += ' today';
      cells += `<span class="${cls}" style="${style}" title="${pr.done}/${pr.total} habits done">${label}</span>`;
    }
    const wd = ['S','M','T','W','T','F','S'].map(d => `<span class="cal-wd">${d}</span>`).join('');
    const cur = Store.tierFor(best);
    const next = Store.tiers().find(t => t.min > best);
    const nextTxt = next ? `${next.min - best} day${(next.min - best) === 1 ? '' : 's'} to ${esc(next.name)}` : 'Top rank';
    const streak = Store.currentStreak();
    const ladder = Store.tiers().map(t => {
      const on = best >= t.min;
      const isCur = t.key === cur.key;
      return `<div class="rank-row ${on?'on':''} ${isCur?'current':''}">
        <span class="rank-row-badge">${rankBadge(t)}</span>
        <div class="rank-row-info">
          <span class="rank-row-name">${esc(t.name)}${isCur?' <span class="pill tiny">You</span>':''}</span>
          <span class="rank-row-min">${t.min === 0 ? 'Starter rank' : t.min + '-day streak'}</span>
        </div>
        <span class="rank-row-status">${on?RANK_CHECK:RANK_LOCK}</span>
      </div>`;
    }).join('');

    view.innerHTML = `
      <section class="stack">
        <div class="card rank-card">
          <span class="rank-card-badge">${rankBadge(cur)}</span>
          <p class="rank-card-name">${esc(cur.name)}</p>
          <p class="rank-card-sub">${streak} day${streak===1?'':'s'} · ${nextTxt}</p>
        </div>

        <div class="card">
          <div class="cal-head">
            <button class="cal-nav" data-cal="-1" aria-label="Previous month">‹</button>
            <span class="cal-title">${vm.toLocaleString(undefined,{month:'long',year:'numeric'})}</span>
            <button class="cal-nav" data-cal="1" aria-label="Next month" ${calOffset>=0?'disabled':''}>›</button>
          </div>
          <div class="cal-grid cal-wds">${wd}</div>
          <div class="cal-grid">${cells}</div>
          <p class="muted small cal-note">Shading shows how many of your habits you completed each day.</p>
        </div>

        <div class="card">
          <div class="card-head"><h2>Ranks</h2></div>
          <div class="rank-list">${ladder}</div>
        </div>
      </section>`;

    view.querySelectorAll('[data-cal]').forEach(b => b.addEventListener('click', () => {
      calOffset += parseInt(b.dataset.cal, 10);
      if (calOffset > 0) calOffset = 0;
      calendar();
    }));

    wireRankImages();
  }

  // wire the habit checklist + add field; rerender() refreshes the host page
  function wireHabits(rerender){
    view.querySelectorAll('[data-wtoggle]').forEach(b => b.addEventListener('click', () => {
      Store.setTodayComplete(!Store.isCompleted(Store.todayKey())); rerender();
    }));
    view.querySelectorAll('[data-htoggle]').forEach(b => b.addEventListener('click', () => {
      Store.toggleHabitToday(b.dataset.htoggle); rerender();
    }));
    view.querySelectorAll('[data-hdel]').forEach(b => b.addEventListener('click', () => {
      if (window.confirm && !window.confirm('Delete this habit and its streak?')) return;
      Store.removeHabit(b.dataset.hdel); rerender();
    }));
    const inp = document.getElementById('habitInput');
    const addBtn = document.getElementById('habitAdd');
    const doAdd = () => { const v = (inp && inp.value || '').trim(); if (!v) return; Store.addHabit(v); rerender(); };
    if (addBtn) addBtn.addEventListener('click', doAdd);
    if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
  }

  function habitRow(check, name, streak, tier){
    return `<div class="habit-row">
        ${check}
        <div class="habit-info">
          <span class="habit-name">${esc(name)}</span>
          <span class="habit-meta">${streak} day${streak===1?'':'s'}${tier?` · ${esc(tier.name)}`:''}</span>
        </div>
      </div>`;
  }

  // Today: tap-to-complete checklist (toggles only)
  function habitChecklist(){
    const woDone = Store.isCompleted(Store.todayKey());
    const woStreak = Store.currentStreak();
    const workout = habitRow(
      `<button class="habit-check ${woDone?'done':''}" data-wtoggle aria-label="Mark workout done today">${woDone?'✓':''}</button>`,
      'Workout', woStreak, Store.tierFor(woStreak));
    const custom = Store.habits().map(h => {
      const done = Store.habitDoneToday(h.id);
      const streak = Store.habitStreak(h.id);
      return habitRow(
        `<button class="habit-check ${done?'done':''}" data-htoggle="${h.id}" aria-label="Mark done today">${done?'✓':''}</button>`,
        h.name, streak, Store.tierFor(streak));
    }).join('');
    return `<div class="card">
        <div class="card-head"><h2>Today</h2></div>
        <div class="habit-list">${workout}${custom}</div>
      </div>`;
  }

  // Manage page: add + list (Workout is pre-added & permanent) with delete
  function habitManager(){
    const woStreak = Store.currentStreak();
    const woTier = Store.tierFor(woStreak);
    const workoutRow = `<div class="manage-row">
        <div class="habit-info">
          <span class="habit-name">Workout</span>
          <span class="habit-meta">${woStreak} day${woStreak===1?'':'s'}${woTier?` · ${esc(woTier.name)}`:''}</span>
        </div>
        <span class="manage-tag">Default</span>
      </div>`;
    const list = Store.habits().map(h => {
      const streak = Store.habitStreak(h.id);
      const tier = Store.tierFor(streak);
      return `<div class="manage-row">
        <div class="habit-info">
          <span class="habit-name">${esc(h.name)}</span>
          <span class="habit-meta">${streak} day${streak===1?'':'s'}${tier?` · ${esc(tier.name)}`:''}</span>
        </div>
        <button class="habit-del" data-hdel="${h.id}" aria-label="Delete habit">✕</button>
      </div>`;
    }).join('');
    return `<div class="card">
        <div class="card-head"><h2>Add a habit</h2></div>
        <div class="add-habit">
          <input type="text" id="habitInput" placeholder="e.g. Book reading, Meditate" maxlength="40" />
          <button class="btn icon-plus" id="habitAdd" aria-label="Add habit">+</button>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h2>Your habits</h2></div>
        <div class="manage-list">${workoutRow}${list}</div>
      </div>`;
  }

  /* ============================================================ APPROACH */
  function approach(){
    const a = DATA.APPROACH;
    view.innerHTML = `
      <section class="stack">
        <div class="page-head"><h1>The Approach</h1><p class="muted">${esc(a.profile)}</p></div>

        <div class="card">
          <h2>What this plan builds</h2>
          <div class="pillars">
            ${a.pillars.map(p=>`
              <div class="pillar">
                <div><p class="pillar-title">${esc(p.title)}</p><p class="muted small">${esc(p.body)}</p></div>
              </div>`).join('')}
          </div>
        </div>

        <div class="card">
          <h2>Pranayama protocol</h2>
          ${a.pranayama.map(p=>`<div class="kv"><p class="kv-k">${esc(p.when)}</p><p class="muted small">${esc(p.list)}</p></div>`).join('')}
        </div>

        <div class="card">
          <h2>Ayurvedic daily rhythm</h2>
          <ul class="tick">${a.dinacharya.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
        </div>

        <div class="card">
          <h2>Daily targets</h2>
          <div class="targets">${a.nutrition.map(t=>`<div class="target-row"><span class="t-label">${esc(t.label)}</span><span class="t-val">${esc(t.value)}</span></div>`).join('')}</div>
        </div>

        <div class="card warn">
          <h2>Note</h2>
          <p>${esc(a.caution)}</p>
        </div>
      </section>`;
  }

  /* ---------------- install (PWA) ---------------- */
  let deferredPrompt = null;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.hidden = false;
  });
  if (installBtn) installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });
  window.addEventListener('appinstalled', () => { if (installBtn) installBtn.hidden = true; });

  /* ---------------- boot ---------------- */
  function boot(){ if (!location.hash) location.hash = '#/'; render(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
