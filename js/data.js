/* ============================================================
   FORGE — personalized training plan
   Profile: 75 kg · ~165 cm · Intermediate · 6 days/week
   Equipment: dumbbells + bodyweight · No injuries
   Goals: fat loss · lean physique · MMA conditioning ·
          strength · yoga · pranayama
   Blends dumbbell hypertrophy, MMA, kalaripayattu, yoga,
   pranayama and Ayurvedic dinacharya.

   Step model:
     { name, target, cue, duration?, sets?, rest? }
       duration : seconds for a timed hold/round  -> enables countdown
       sets     : repeat count                    -> set tracker + rest
       rest     : seconds rest between sets/steps  -> rest countdown
   ============================================================ */
window.DATA = (() => {

  const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const WEEK_ORDER = [1,2,3,4,5,6,0]; // Mon → Sun

  const WEEK = {
    /* ---------------- MONDAY ---------------- */
    1: {
      name: 'Upper Body — Push & Pull',
      focus: 'Strength · Hypertrophy',
      type: 'strength',
      note: 'Progressive overload: add a rep each week, then add weight. Keep 1–2 reps in the tank.',
      phases: [
        { title: 'Warmup', steps: [
          { name: 'Arm circles', target: '30 sec each way', duration: 30, sets: 2, rest: 0, cue: 'Loosen the shoulder joint, small to big circles.' },
          { name: 'Scapular wall slides', target: '15 reps', cue: 'Pin shoulder blades down and back.' },
          { name: 'Push-up to down-dog', target: '8 reps', cue: 'Open the chest and lengthen the spine.' }
        ]},
        { title: 'Workout', steps: [
          { name: 'DB Floor / Bench Press', target: '4 × 10–12', sets: 4, rest: 75, cue: 'Elbows ~45°, control the lowering for 2 sec.' },
          { name: 'DB Bent-over Row', target: '4 × 10–12', sets: 4, rest: 75, cue: 'Hinge at the hips, drive elbows to the hip, squeeze the back.' },
          { name: 'DB Shoulder Press', target: '3 × 10', sets: 3, rest: 60, cue: 'Ribs down, no lower-back arch, full lockout.' },
          { name: 'Renegade Row', target: '3 × 8 / side', sets: 3, rest: 60, cue: 'Wide feet, fight the rotation, hips square.' },
          { name: 'Push-ups (burnout)', target: '2 × max', sets: 2, rest: 60, cue: 'Stop 1 rep short of failure, body in a straight line.' }
        ]},
        { title: 'Core', steps: [
          { name: 'Plank', target: '3 × 45 sec', duration: 45, sets: 3, rest: 30, cue: 'Squeeze glutes and abs, neutral neck — do not let hips sag.' },
          { name: 'Hollow body hold', target: '3 × 30 sec', duration: 30, sets: 3, rest: 30, cue: 'Lower back pressed into the floor.' }
        ]},
        { title: 'Cooldown', steps: [
          { name: 'Chest / doorway stretch', target: '40 sec', duration: 40, cue: 'Breathe slowly, relax the shoulders.' },
          { name: 'Lat & shoulder stretch', target: '40 sec', duration: 40, cue: 'Side body lengthening.' }
        ]}
      ]
    },

    /* ---------------- TUESDAY ---------------- */
    2: {
      name: 'Lower Body — Strength & Power',
      focus: 'Strength · Explosive',
      type: 'strength',
      note: 'Hinge work (RDL) added to balance the squat pattern and protect the lower back.',
      phases: [
        { title: 'Warmup', steps: [
          { name: 'Leg swings', target: '12 / leg each way', cue: 'Front-back then side-side, controlled.' },
          { name: 'Bodyweight squats', target: '15 reps', cue: 'Sit between the hips, heels down.' },
          { name: 'Kalari low lunge (Ashwa hold)', target: '30 sec / side', duration: 30, sets: 2, rest: 0, cue: 'Deep horse-rider stance — opens hips, builds isometric strength.' }
        ]},
        { title: 'Workout', steps: [
          { name: 'DB Goblet Squat', target: '4 × 12', sets: 4, rest: 75, cue: 'Chest tall, knees track over toes, full depth.' },
          { name: 'DB Romanian Deadlift', target: '4 × 10', sets: 4, rest: 75, cue: 'Push hips back, soft knees, feel the hamstrings stretch.' },
          { name: 'DB Walking Lunge', target: '3 × 12 / leg', sets: 3, rest: 60, cue: 'Long stride, back knee toward the floor.' },
          { name: 'Bulgarian Split Squat', target: '3 × 10 / leg', sets: 3, rest: 60, cue: 'Rear foot elevated, weight through the front heel.' },
          { name: 'Jump Squat (power)', target: '3 × 8', sets: 3, rest: 60, cue: 'Explode up, land soft and quiet.' }
        ]},
        { title: 'Core', steps: [
          { name: 'Lying Leg Raise', target: '3 × 12', sets: 3, rest: 30, cue: 'Lower slowly, do not let the back arch.' },
          { name: 'Russian Twist', target: '3 × 20', sets: 3, rest: 30, cue: 'Rotate from the ribcage, not just the arms.' },
          { name: 'Calf Raise', target: '3 × 20', sets: 3, rest: 30, cue: 'Full range, pause at the top.' }
        ]},
        { title: 'Cooldown', steps: [
          { name: 'Hip-flexor stretch', target: '40 sec / side', duration: 40, sets: 2, rest: 0, cue: 'Tuck the tailbone, breathe.' },
          { name: 'Hamstring stretch', target: '40 sec', duration: 40, cue: 'Hinge from the hips with a flat back.' }
        ]}
      ]
    },

    /* ---------------- WEDNESDAY ---------------- */
    3: {
      name: 'Mobility — Yoga & Kalaripayattu',
      focus: 'Recovery · Mobility',
      type: 'recovery',
      note: 'Active recovery. Keep effort low-moderate — this restores the joints and the nervous system.',
      phases: [
        { title: 'Open', steps: [
          { name: 'Joint rotations', target: '2 min', duration: 120, cue: 'Neck, shoulders, wrists, hips, ankles — slow circles.' },
          { name: 'Surya Namaskar', target: '5 rounds', cue: 'Link each movement to one breath. Smooth, not rushed.' }
        ]},
        { title: 'Kalari Vadivu holds', steps: [
          { name: 'Gajavadivu (Elephant)', target: '45 sec', duration: 45, sets: 2, rest: 15, cue: 'Wide grounded stance, steady gaze — builds rooting and breath control.' },
          { name: 'Ashwavadivu (Horse)', target: '45 sec', duration: 45, sets: 2, rest: 15, cue: 'Deep lunge stance, hips open, spine tall.' },
          { name: 'Simhavadivu (Lion)', target: '45 sec', duration: 45, sets: 2, rest: 15, cue: 'Low coiled stance, alert and balanced.' }
        ]},
        { title: 'Asanas', steps: [
          { name: 'Bhujangasana (Cobra)', target: '3 × 30 sec', duration: 30, sets: 3, rest: 15, cue: 'Lift from the chest, hips grounded, shoulders away from ears.' },
          { name: 'Cat–Cow flow', target: '10 slow cycles', cue: 'Move the whole spine with the breath.' },
          { name: 'Trikonasana (Triangle)', target: '30 sec / side', duration: 30, sets: 2, rest: 0, cue: 'Long side body, open the chest to the ceiling.' },
          { name: 'Pawanmuktasana', target: '40 sec', duration: 40, cue: 'Knees to chest, release the lower back.' }
        ]},
        { title: 'Pranayama (calming)', steps: [
          { name: 'Nadi Shodhana', target: '5 min', duration: 300, cue: 'Alternate-nostril breathing — equal slow inhale/exhale. Calms the nervous system.' },
          { name: 'Bhramari', target: '9 rounds', cue: 'Humming-bee exhale, soft and long. Settles the mind.' }
        ]}
      ]
    },

    /* ---------------- THURSDAY ---------------- */
    4: {
      name: 'MMA Skills & Footwork',
      focus: 'Skill · Conditioning',
      type: 'mma',
      note: 'Quality over speed early; sharpen technique, then push the conditioning finisher.',
      phases: [
        { title: 'Warmup', steps: [
          { name: 'Jump rope', target: '5 min', duration: 300, cue: 'Light on the balls of the feet, relaxed shoulders.' },
          { name: 'Kalari Chuvadu footwork', target: '5 min', duration: 300, cue: 'Forward / back / lateral / angular steps — keep a low base, never cross the feet.' }
        ]},
        { title: 'Shadowboxing', steps: [
          { name: 'Round 1–2 — fundamentals', target: '2 × 3 min', duration: 180, sets: 2, rest: 60, cue: 'Jab, cross, hook. Hands up, chin down, return to guard.' },
          { name: 'Round 3–4 — movement', target: '2 × 3 min', duration: 180, sets: 2, rest: 60, cue: 'Add head movement and angles via chuvadu stepping.' },
          { name: 'Round 5 — freestyle', target: '1 × 3 min', duration: 180, cue: 'Flow combinations with footwork — stay loose and breathe.' }
        ]},
        { title: 'Conditioning finisher', steps: [
          { name: 'Burpees', target: '40 sec on / 20 off', duration: 40, sets: 3, rest: 20, cue: 'Full extension at the top, controlled chest-to-floor.' },
          { name: 'Mountain Climbers', target: '40 sec on / 20 off', duration: 40, sets: 3, rest: 20, cue: 'Hips low, fast knees, shoulders stacked.' },
          { name: 'Jump Rope sprint', target: '40 sec on / 20 off', duration: 40, sets: 3, rest: 20, cue: 'High cadence — empty the tank.' }
        ]},
        { title: 'Core', steps: [
          { name: 'Plank', target: '3 × 45 sec', duration: 45, sets: 3, rest: 30, cue: 'Brace as if about to take a body shot.' },
          { name: 'Side Plank', target: '3 × 30 sec / side', duration: 30, sets: 3, rest: 20, cue: 'Stack the hips, lift tall.' },
          { name: 'Bicycle Crunch', target: '3 × 20', sets: 3, rest: 30, cue: 'Slow rotation, opposite elbow to knee.' }
        ]},
        { title: 'Cooldown', steps: [
          { name: 'Neck & shoulder release', target: '60 sec', duration: 60, cue: 'Gentle — strikers carry tension here.' }
        ]}
      ]
    },

    /* ---------------- FRIDAY ---------------- */
    5: {
      name: 'Fat-Loss Conditioning Circuit',
      focus: 'Conditioning · Fat loss',
      type: 'conditioning',
      note: '45 sec work / 15 sec rest. 5 rounds, 60–90 sec rest between rounds. Big EPOC burn.',
      phases: [
        { title: 'Warmup', steps: [
          { name: 'Dynamic full-body', target: '3 min', duration: 180, cue: 'Jacks, arm swings, hip openers, a few easy squats.' }
        ]},
        { title: 'Circuit — 5 rounds', steps: [
          { name: 'DB Thruster (squat-to-press)', target: '45 sec', duration: 45, sets: 5, rest: 15, cue: 'One fluid drive from squat to overhead.' },
          { name: 'Push-ups', target: '45 sec', duration: 45, sets: 5, rest: 15, cue: 'Steady pace, full range.' },
          { name: 'DB Renegade Row', target: '45 sec', duration: 45, sets: 5, rest: 15, cue: 'Wide base, minimal hip rotation.' },
          { name: 'Jump Squat', target: '45 sec', duration: 45, sets: 5, rest: 15, cue: 'Soft landings, keep the chest up.' },
          { name: 'Mountain Climbers', target: '45 sec', duration: 45, sets: 5, rest: 90, cue: 'Last station — then rest 60–90 sec and repeat.' }
        ]},
        { title: 'Finisher', steps: [
          { name: 'Zone-2 walk / easy jog', target: '10 min', duration: 600, cue: 'Conversational pace — taps into fat as fuel.' }
        ]}
      ]
    },

    /* ---------------- SATURDAY ---------------- */
    6: {
      name: 'Full-Body Functional Strength',
      focus: 'Strength · Carryover',
      type: 'strength',
      note: 'Athletic, full-body patterns. Move well under load — this is your real-world strength day.',
      phases: [
        { title: 'Warmup', steps: [
          { name: 'Dynamic mobility', target: '3 min', duration: 180, cue: 'Hips, t-spine, shoulders.' },
          { name: 'Kalari Vadivu flow', target: '2 rounds', cue: 'Cycle the animal stances to prime the legs and hips.' }
        ]},
        { title: 'Workout', steps: [
          { name: 'DB Goblet Squat', target: '3 × 12', sets: 3, rest: 75, cue: 'Controlled, full depth.' },
          { name: 'Feet-elevated Push-ups', target: '3 × 12', sets: 3, rest: 60, cue: 'Greater chest load — keep the body rigid.' },
          { name: 'DB Single-arm Row', target: '3 × 12 / side', sets: 3, rest: 60, cue: 'Brace on a bench, full stretch and squeeze.' },
          { name: 'DB Farmer Carry', target: '3 × 40 m', sets: 3, rest: 75, cue: 'Tall posture, ribs down, grip hard.' },
          { name: 'DB Push Press', target: '3 × 10', sets: 3, rest: 60, cue: 'Small dip-drive from the legs into the press.' }
        ]},
        { title: 'Core', steps: [
          { name: 'Leg Raise', target: '3 × 12', sets: 3, rest: 30, cue: 'Slow eccentric.' },
          { name: 'Plank Shoulder Taps', target: '3 × 30 sec', duration: 30, sets: 3, rest: 30, cue: 'Minimise hip sway — anti-rotation.' }
        ]},
        { title: 'Cooldown', steps: [
          { name: 'Full-body stretch', target: '3 min', duration: 180, cue: 'Hit the muscles you trained today.' }
        ]}
      ]
    },

    /* ---------------- SUNDAY ---------------- */
    0: {
      name: 'Active Recovery & Restoration',
      focus: 'Rest · Restore',
      type: 'recovery',
      note: 'The day the body actually adapts. Move gently, eat well, sleep deeply.',
      phases: [
        { title: 'Move', steps: [
          { name: 'Brisk walk (Zone 2)', target: '30–45 min · ~8000 steps', duration: 1800, cue: 'Outdoors if you can. Easy conversational pace.' },
          { name: 'Gentle full-body yoga', target: '15 min', duration: 900, cue: 'Long, slow holds — wherever the body feels tight.' }
        ]},
        { title: 'Restore', steps: [
          { name: 'Abhyanga (warm-oil self-massage)', target: '10 min', duration: 600, cue: 'Warm sesame/coconut oil. Long strokes on limbs, circles on joints. Then a warm shower.' }
        ]},
        { title: 'Pranayama (calming)', steps: [
          { name: 'Anulom Vilom', target: '5 min', duration: 300, cue: 'Slow alternate-nostril breathing.' },
          { name: 'Bhramari', target: '9 rounds', cue: 'Humming exhale — primes deep sleep.' }
        ]}
      ]
    }
  };

  /* ---------------- Approach / philosophy content ---------------- */
  const APPROACH = {
    profile: 'Intermediate · 75 kg · ~165 cm · 6 training days + 1 active-recovery day · dumbbells + bodyweight.',
    pillars: [
      { title:'Fat loss', body:'A mild calorie deficit (~300–500 kcal/day) plus strength + HIIT to burn fat while protecting muscle. Avoid crash diets — they cost you lean mass and MMA performance.' },
      { title:'Lean physique', body:'Dumbbell hypertrophy work, each major muscle trained ~2× per week with progressive overload (add reps, then weight).' },
      { title:'MMA conditioning', body:'A dedicated skills day plus circuits build the gas tank, footwork and striking sharpness. Kalaripayattu chuvadu feeds directly into MMA footwork.' },
      { title:'Recovery & breath', body:'Yoga, kalari mobility and pranayama keep the joints healthy and balance the nervous system so you can train hard 6 days a week.' }
    ],
    pranayama: [
      { when:'Morning (empty stomach, energizing)', list:'Kapalabhati 3 × 30 breaths · Bhastrika 2–3 rounds. Increases alveolar ventilation and primes you to train.' },
      { when:'Evening / recovery (calming)', list:'Nadi Shodhana 5–10 min · Bhramari 9 rounds. Activates the parasympathetic system, lowers heart rate and improves sleep.' }
    ],
    dinacharya: [
      'Wake early; drink warm water to spark digestion (agni).',
      'Train in the Kapha window (~6–10 am) when possible — best for fat loss.',
      'Eat to two-thirds full; favour spicy, bitter and astringent foods to reduce Kapha.',
      'Keep dinner lighter and earlier.',
      'Abhyanga (warm-oil self-massage) on recovery days.',
      'Protect 7–8 hours of sleep — recovery is where the physique is built.'
    ],
    nutrition: [
      { label:'Protein', value:'~130–150 g/day (1.7–2.0 g per kg) to preserve muscle in a deficit' },
      { label:'Water', value:'3–4 litres per day' },
      { label:'Sleep', value:'7–8 hours per night' },
      { label:'Sources', value:'Eggs, chicken, fish, paneer, curd, milk, dal, sprouts, soy' }
    ],
    caution: 'General guidance, not medical advice. Kapalabhati and Bhastrika briefly raise heart rate and blood pressure — practise on an empty stomach, stop if dizzy, and check with a doctor first if you have high blood pressure, heart or respiratory conditions.'
  };

  return { DAY_NAMES, WEEK_ORDER, WEEK, APPROACH };
})();
