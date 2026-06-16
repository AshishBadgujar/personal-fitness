/* ============================================================
   FORGE — line-art exercise illustrations.
   SVGIcons.get(name) matches the exercise name by keyword and
   returns an SVG string. Colors inherit via currentColor.
   ============================================================ */
window.SVGIcons = (() => {
  const F = (inner, ground = true) =>
    `<svg viewBox="0 0 100 100" class="ill" xmlns="http://www.w3.org/2000/svg"
      fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      ${ground ? '<line x1="8" y1="90" x2="92" y2="90" class="ill-ground"/>' : ''}${inner}</svg>`;
  const h = (x, y, r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`;

  const L = {
    pushup: F(`${h(24,62)}<path d="M30 64 L66 74 L88 80"/><path d="M40 67 L40 84 M56 71 L56 86"/>`),
    squat: F(`${h(50,30)}<path d="M50 36 L50 58"/><path d="M50 42 L36 50 M50 42 L64 50"/><path d="M50 58 L38 66 L42 86 M50 58 L62 66 L58 86"/>`),
    lunge: F(`${h(44,28)}<path d="M44 34 L44 56"/><path d="M44 40 L34 50 M44 40 L54 50"/><path d="M44 56 L34 72 L34 86 M44 56 L62 70 L74 86"/>`),
    stepup: F(`<rect x="62" y="64" width="30" height="22" rx="2" class="ill-accent"/>${h(36,28)}<path d="M36 34 L36 58"/><path d="M36 40 L26 50 M36 40 L48 50"/><path d="M36 58 L62 64 M36 58 L32 74 L32 86"/>`),
    press: F(`${h(50,32)}<path d="M50 38 L50 70"/><path d="M50 42 L38 26 M50 42 L62 26"/><line x1="32" y1="22" x2="44" y2="22" class="ill-accent"/><line x1="56" y1="22" x2="68" y2="22" class="ill-accent"/><path d="M50 70 L40 86 M50 70 L60 86"/>`),
    hinge: F(`${h(34,40)}<path d="M40 44 L70 62"/><path d="M70 62 L70 86"/><path d="M52 53 L52 80" class="ill-accent"/><path d="M44 49 L44 68"/><line x1="46" y1="76" x2="58" y2="76" class="ill-accent"/>`),
    row: F(`${h(40,38)}<path d="M44 42 L68 64"/><path d="M68 64 L68 86"/><path d="M54 53 L56 78"/><line x1="44" y1="70" x2="58" y2="70" class="ill-accent"/>`),
    plank: F(`${h(22,66)}<path d="M28 68 L82 80"/><path d="M40 70 L36 86 M82 80 L86 86"/>`),
    sideplank: F(`${h(24,74)}<path d="M30 76 L84 56"/><path d="M40 73 L38 88"/><path d="M58 65 L58 40" class="ill-accent"/>`),
    legraise: F(`${h(22,78)}<path d="M28 78 L58 78"/><path d="M58 78 L62 46 M58 78 L70 48" class="ill-accent"/>`),
    russian: F(`${h(48,46)}<path d="M48 50 L40 70"/><path d="M40 70 L62 64 M40 70 L60 80" class="ill-accent"/><path d="M44 56 L30 52"/>`),
    bicycle: F(`${h(36,52)}<path d="M42 56 L66 62"/><path d="M66 62 L84 54"/><path d="M66 62 L78 78 M66 62 L52 78" class="ill-accent"/>`),
    burpee: F(`${h(28,54)}<path d="M34 56 L72 68 L90 78"/><path d="M48 60 L44 84 M64 64 L60 88"/><path d="M38 40 L46 28 M72 44 L64 28" class="ill-accent"/>`),
    climber: F(`${h(22,60)}<path d="M28 62 L84 78"/><path d="M40 64 L36 86"/><path d="M64 72 L52 84 M64 72 L80 84" class="ill-accent"/>`),
    jack: F(`${h(50,26)}<path d="M50 32 L50 64"/><path d="M50 38 L34 24 M50 38 L66 24" class="ill-accent"/><path d="M50 64 L36 86 M50 64 L64 86" class="ill-accent"/>`, false),
    jumprope: F(`${h(50,30)}<path d="M50 36 L50 64"/><path d="M50 42 L40 52 M50 42 L60 52"/><path d="M50 64 L42 84 M50 64 L58 84"/><path d="M40 52 Q14 64 40 84 M60 52 Q86 64 60 84" class="ill-accent"/>`),
    calf: F(`${h(50,30)}<path d="M50 36 L50 66"/><path d="M50 42 L40 54 M50 42 L60 54"/><path d="M50 66 L44 84 M50 66 L56 84"/><path d="M40 86 L60 86" class="ill-accent"/>`),
    boxing: F(`${h(44,30)}<path d="M44 36 L44 62"/><path d="M44 42 L66 38 L62 28"/><path d="M44 44 L32 40" class="ill-accent"/><path d="M44 62 L34 84 M44 62 L56 84"/>`),
    footwork: F(`${h(50,32)}<path d="M50 38 L50 62"/><path d="M50 44 L40 50 M50 44 L60 50"/><path d="M50 62 L36 82 L30 86 M50 62 L64 80 L72 86"/><path d="M24 88 L40 88 M62 88 L78 88" class="ill-accent"/>`),
    stance: F(`${h(50,28)}<path d="M50 34 L50 56"/><path d="M50 40 L62 46 M50 40 L38 46"/><path d="M50 56 L30 78 L30 86 M50 56 L70 78 L70 86"/>`),
    sun: F(`${h(50,24)}<path d="M50 30 L50 60"/><path d="M50 34 L40 20 M50 34 L60 20" class="ill-accent"/><path d="M44 16 L48 16 M52 16 L56 16" class="ill-accent"/><path d="M50 60 L42 86 M50 60 L58 86"/>`),
    cobra: F(`${h(80,50)}<path d="M76 54 C60 62 36 76 18 84"/><path d="M70 58 L70 84 M58 64 L58 84" class="ill-accent"/>`),
    catcow: F(`${h(26,54)}<path d="M32 56 C46 42 64 42 84 56" class="ill-accent"/><path d="M40 52 L40 84 M78 52 L78 84"/>`),
    triangle: F(`${h(40,26)}<path d="M40 32 L56 60"/><path d="M40 36 L26 18 M40 36 L40 60" class="ill-accent"/><path d="M56 60 L42 86 M56 60 L74 86"/>`),
    knees: F(`${h(22,72)}<path d="M28 72 L52 72"/><path d="M52 72 L48 52 M52 72 L66 56" class="ill-accent"/><path d="M30 72 L26 84"/>`),
    breath: F(`${h(50,34)}<path d="M50 40 L50 70"/><path d="M50 46 L36 56 M50 46 L64 56"/><path d="M50 70 L36 76 L36 86 M50 70 L64 76 L64 86"/><path d="M72 30 q8 7 0 14 M80 26 q12 11 0 22" class="ill-accent"/>`, false),
    stretch: F(`${h(46,26)}<path d="M46 32 L46 58"/><path d="M46 38 L66 24" class="ill-accent"/><path d="M46 38 L34 50"/><path d="M46 58 L36 84 M46 58 L60 80 L60 86"/>`),
    walk: F(`${h(48,26)}<path d="M48 32 L48 58"/><path d="M48 38 L60 48 M48 38 L36 46"/><path d="M48 58 L36 78 L34 86 M48 58 L62 76 L70 86"/>`),
    farmer: F(`${h(50,28)}<path d="M50 34 L50 64"/><path d="M50 38 L36 40 M50 38 L64 40"/><line x1="30" y1="46" x2="42" y2="46" class="ill-accent"/><line x1="58" y1="46" x2="70" y2="46" class="ill-accent"/><path d="M50 64 L42 86 M50 64 L58 86"/>`),
    mobility: F(`${h(50,30)}<path d="M50 36 L50 64"/><path d="M50 42 L34 38 M50 42 L66 38"/><path d="M28 32 q6 -8 12 0 M60 32 q6 -8 12 0" class="ill-accent"/><path d="M50 64 L40 86 M50 64 L60 86"/>`),
    fallback: F(`${h(50,30)}<path d="M50 36 L50 64"/><path d="M50 42 L36 52 M50 42 L64 52"/><path d="M50 64 L40 86 M50 64 L60 86"/>`)
  };

  // ordered keyword → figure (specific patterns first)
  const M = [
    [/side\s*plank/, 'sideplank'],
    [/plank\s*shoulder|shoulder\s*tap/, 'plank'],
    [/plank/, 'plank'],
    [/hollow/, 'legraise'],
    [/leg\s*raise/, 'legraise'],
    [/russian/, 'russian'],
    [/bicycle/, 'bicycle'],
    [/jumping\s*jack/, 'jack'],
    [/jump\s*rope|skip/, 'jumprope'],
    [/jump\s*squat/, 'squat'],
    [/burpee/, 'burpee'],
    [/mountain\s*climber/, 'climber'],
    [/calf/, 'calf'],
    [/thruster|push\s*press|shoulder\s*press|bench|floor\s*press|press/, 'press'],
    [/romanian|deadlift|rdl|hinge/, 'hinge'],
    [/renegade|row/, 'row'],
    [/push[\s-]*up|push up/, 'pushup'],
    [/step\s*up/, 'stepup'],
    [/bulgarian|split\s*squat|lunge/, 'lunge'],
    [/goblet|squat/, 'squat'],
    [/farmer|carry/, 'farmer'],
    [/shadow|jab|cross|hook|box|round/, 'boxing'],
    [/chuvadu|footwork/, 'footwork'],
    [/vadivu|gaja|ashwa|simha|horse|elephant|lion|stance/, 'stance'],
    [/surya|namaskar|sun salutation/, 'sun'],
    [/bhujang|cobra/, 'cobra'],
    [/cat.?cow|cat-cow/, 'catcow'],
    [/trikon|triangle/, 'triangle'],
    [/pawan|knees? to chest/, 'knees'],
    [/nadi|anulom|bhramari|kapalabhati|bhastrika|pranayama|breath/, 'breath'],
    [/walk|jog|zone.?2|run/, 'walk'],
    [/yoga|asana|stretch|cooldown|chest|lat|hamstring|hip.?flexor|release|cobra/, 'stretch'],
    [/abhyanga|massage|restore/, 'mobility'],
    [/rotation|mobility|swing|circle|dynamic|warmup|wall slide|down-dog|knee/, 'mobility']
  ];

  function get(name){
    const n = (name || '').toLowerCase();
    for (const [re, key] of M) if (re.test(n)) return L[key];
    return L.fallback;
  }

  /* ---------------- rank emblems (rewards) ---------------- */
  const badge = (color, inner) =>
    `<svg viewBox="0 0 64 64" class="rank-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="29" fill="${color}"/>
      <circle cx="32" cy="32" r="29" fill="none" stroke="#fff" stroke-opacity=".30" stroke-width="3"/>
      ${inner}</svg>`;

  // Original boss-avatar emblems (dark silhouette + glowing eyes on the rank color)
  const D = '#161019';        // shadow silhouette
  const E = '#fff7e6';        // eye glow
  const G = {
    // Shadow — the starter fighter silhouette
    shadow: () => `<circle cx="32" cy="20" r="7.5" fill="${D}"/><path d="M18 53 C18 38 24 30 32 30 C40 30 46 38 46 53 Z" fill="${D}"/>`,
    // Lynx — masked ninja, fierce angled eyes
    lynx: () => `<path d="M32 12 C19 12 15 26 17 40 C19 50 26 55 32 55 C38 55 45 50 47 40 C49 26 45 12 32 12 Z" fill="${D}"/><path d="M21 33 L30 30 L30 35 Z" fill="${E}"/><path d="M43 33 L34 30 L34 35 Z" fill="${E}"/>`,
    // Hermit — straw-hat old master with beard
    hermit: () => `<path d="M12 31 L32 9 L52 31 Z" fill="${D}"/><path d="M23 31 h18 v6 c0 9 -18 9 -18 0 Z" fill="${D}"/><path d="M26 38 c0 11 12 11 12 0 Z" fill="${D}"/><circle cx="28" cy="35" r="1.7" fill="${E}"/><circle cx="36" cy="35" r="1.7" fill="${E}"/>`,
    // Butcher — masked brute with cleaver
    butcher: () => `<rect x="19" y="19" width="26" height="26" rx="8" fill="${D}"/><path d="M22 28 L30 31 M42 28 L34 31" stroke="${E}" stroke-width="2" stroke-linecap="round"/><circle cx="27" cy="33" r="1.7" fill="${E}"/><circle cx="37" cy="33" r="1.7" fill="${E}"/><rect x="25" y="39" width="14" height="3.5" rx="1" fill="${E}" opacity=".85"/><rect x="41" y="11" width="11" height="8" rx="1.5" fill="${D}"/><rect x="46" y="19" width="3" height="9" fill="${D}"/>`,
    // Wasp — winged warrior helm with visor
    wasp: () => `<path d="M15 25 Q24 13 31 23 M49 25 Q40 13 33 23" fill="none" stroke="${D}" stroke-width="4.5" stroke-linecap="round"/><path d="M22 25 C22 18 42 18 42 25 L42 39 C42 47 22 47 22 39 Z" fill="${D}"/><rect x="25" y="31" width="14" height="3.6" rx="1.8" fill="${E}"/>`,
    // Widow — black widow spider with red hourglass
    widow: () => `<circle cx="32" cy="35" r="9" fill="${D}"/><circle cx="32" cy="23" r="4.6" fill="${D}"/><path d="M23 30 L12 24 M23 35 L11 35 M23 40 L13 47 M41 30 L52 24 M41 35 L53 35 M41 40 L51 47" fill="none" stroke="${D}" stroke-width="2.7" stroke-linecap="round"/><path d="M29 31 L35 31 L31 35 L35 39 L29 39 L33 35 Z" fill="#ff3b2f"/>`,
    // Shogun — horned kabuto helmet with menpo mask
    shogun: () => `<path d="M17 25 Q32 7 47 25" fill="none" stroke="${D}" stroke-width="5" stroke-linecap="round"/><path d="M20 31 a12 12 0 0 1 24 0 Z" fill="${D}"/><path d="M24 35 L40 35 L37 47 L27 47 Z" fill="${D}"/><circle cx="28" cy="33" r="1.6" fill="${E}"/><circle cx="36" cy="33" r="1.6" fill="${E}"/>`,
    // Titan — horned demon with glowing eyes
    titan: () => `<path d="M19 27 C13 15 17 13 25 20 Z" fill="${D}"/><path d="M45 27 C51 15 47 13 39 20 Z" fill="${D}"/><path d="M22 25 C22 18 42 18 42 25 L40 43 C38 51 26 51 24 43 Z" fill="${D}"/><path d="M25 33 l6 2.5 -6 2.5 Z" fill="#ffce3a"/><path d="M39 33 l-6 2.5 6 2.5 Z" fill="#ffce3a"/>`
  };

  function rank(key, color){ const c = color || '#7a6cff'; return badge(c, (G[key] || G.lynx)(c)); }

  return { get, rank };
})();
