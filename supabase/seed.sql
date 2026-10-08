-- PushNPull starter content: beginner exercises and three routines.
-- Run after migrations/20261007000000_initial_schema.sql.
-- Safe to re-run: it updates existing rows instead of duplicating them.
--
-- TODO (team): check these against the equipment actually at ARC Express
-- and swap anything that isn't there.

insert into public.exercises
  (id, name, muscle_group, equipment, is_compound, sets, reps, rest_seconds, form_cue)
values
  -- Chest
  ('machine_chest_press', 'Machine chest press', 'chest', 'machines', true, 3, '8-12', 90,
   'Set the seat so the handles line up with the middle of your chest. Press out without locking your elbows, then come back slowly.'),
  ('db_bench_press', 'Dumbbell bench press', 'chest', 'dumbbells', true, 3, '8-12', 90,
   'Feet flat, shoulder blades pinched back. Lower the dumbbells to chest level with your elbows about 45 degrees from your body.'),
  ('incline_db_press', 'Incline dumbbell press', 'chest', 'dumbbells', true, 3, '8-12', 90,
   'Set the bench to a low incline (about 30 degrees). Press up and slightly in, without banging the dumbbells together.'),
  ('push_up', 'Push-up', 'chest', 'bodyweight', true, 3, '8-12', 60,
   'Hands just wider than your shoulders, body in one straight line. Too hard? Put your hands on a bench.'),

  -- Back
  ('lat_pulldown', 'Lat pulldown', 'back', 'cables', true, 3, '8-12', 90,
   'Grip just wider than your shoulders. Pull the bar to your upper chest by driving your elbows down. Don''t lean far back.'),
  ('seated_cable_row', 'Seated cable row', 'back', 'cables', true, 3, '8-12', 90,
   'Sit tall with a slight bend in your knees. Pull the handle to your stomach and squeeze your shoulder blades together.'),
  ('one_arm_db_row', 'One-arm dumbbell row', 'back', 'dumbbells', true, 3, '8-12', 60,
   'One hand and knee on a bench, back flat. Pull the dumbbell toward your hip, not your shoulder.'),
  ('machine_row', 'Chest-supported machine row', 'back', 'machines', true, 3, '8-12', 90,
   'Keep your chest on the pad the whole time. Pull with your elbows and pause for a second at the back.'),

  -- Legs
  ('goblet_squat', 'Goblet squat', 'legs', 'dumbbells', true, 3, '8-12', 90,
   'Hold one dumbbell at your chest. Sit down between your heels, chest up, knees moving in line with your toes.'),
  ('leg_press', 'Leg press', 'legs', 'machines', true, 3, '10-12', 90,
   'Feet shoulder-width on the platform. Lower until your knees are near 90 degrees. Never lock your knees at the top.'),
  ('leg_extension', 'Leg extension', 'legs', 'machines', false, 3, '10-15', 60,
   'Line your knee up with the machine''s pivot point. Straighten your legs, squeeze for a second, lower slowly.'),
  ('seated_leg_curl', 'Seated leg curl', 'legs', 'machines', false, 3, '10-15', 60,
   'Pad just above your heels. Curl down and back, then let it rise under control.'),
  ('bodyweight_squat', 'Bodyweight squat', 'legs', 'bodyweight', true, 3, '12-15', 60,
   'Feet shoulder-width, arms forward for balance. Sit back as if there''s a chair behind you.'),

  -- Glutes
  ('db_rdl', 'Dumbbell Romanian deadlift', 'glutes', 'dumbbells', true, 3, '8-12', 90,
   'Soft knees. Push your hips back and slide the dumbbells down your thighs until you feel a stretch in your hamstrings. Keep your back flat.'),
  ('glute_bridge', 'Glute bridge', 'glutes', 'bodyweight', false, 3, '12-15', 60,
   'Lie on your back, feet flat. Drive through your heels to lift your hips and squeeze at the top. Rest a dumbbell on your hips when it gets easy.'),
  ('reverse_lunge', 'Dumbbell reverse lunge', 'glutes', 'dumbbells', true, 3, '8 each leg', 90,
   'Step back and lower until both knees are near 90 degrees. Push through your front heel to stand back up.'),
  ('hip_abduction', 'Hip abduction machine', 'glutes', 'machines', false, 3, '12-15', 60,
   'Sit tall against the pad. Push your knees out, pause, and come back slowly.'),

  -- Shoulders
  ('seated_db_press', 'Seated dumbbell shoulder press', 'shoulders', 'dumbbells', true, 3, '8-12', 90,
   'Back flat against an upright bench. Press the dumbbells overhead without arching your lower back.'),
  ('machine_shoulder_press', 'Machine shoulder press', 'shoulders', 'machines', true, 3, '8-12', 90,
   'Handles start at shoulder height. Press up without slamming into lockout, then lower with control.'),
  ('lateral_raise', 'Dumbbell lateral raise', 'shoulders', 'dumbbells', false, 3, '12-15', 60,
   'Use a light weight. Raise your arms out to the sides up to shoulder height with a slight bend in your elbows. No swinging.'),
  ('face_pull', 'Cable face pull', 'shoulders', 'cables', false, 3, '12-15', 60,
   'Rope at upper-chest height. Pull toward your face with your elbows high and pull the rope apart at the end.'),
  ('pike_push_up', 'Pike push-up', 'shoulders', 'bodyweight', true, 3, '6-10', 60,
   'Hips high so your body makes an upside-down V. Bend your elbows to bring your head toward the floor, then press back up.'),

  -- Arms
  ('db_curl', 'Dumbbell biceps curl', 'arms', 'dumbbells', false, 3, '10-12', 60,
   'Elbows pinned at your sides. Curl up, then take a full two seconds to lower.'),
  ('hammer_curl', 'Hammer curl', 'arms', 'dumbbells', false, 3, '10-12', 60,
   'Palms face each other the whole time. Keep your shoulders still.'),
  ('triceps_pushdown', 'Cable triceps pushdown', 'arms', 'cables', false, 3, '10-12', 60,
   'Elbows tucked at your sides. Push down until your arms are straight. Only your forearms should move.'),
  ('overhead_triceps_ext', 'Overhead dumbbell triceps extension', 'arms', 'dumbbells', false, 3, '10-12', 60,
   'Hold one dumbbell overhead with both hands. Lower it behind your head while your elbows keep pointing forward.'),
  ('bench_dip', 'Bench dip', 'arms', 'bodyweight', false, 3, '8-12', 60,
   'Hands on a bench behind you, legs out in front. Lower until your elbows are near 90 degrees, then press up.'),

  -- Core
  ('plank', 'Plank', 'core', 'bodyweight', false, 3, '20-40 sec', 45,
   'Forearms under your shoulders, body straight from head to heels. Squeeze your glutes so your hips don''t sag.'),
  ('dead_bug', 'Dead bug', 'core', 'bodyweight', false, 3, '8 each side', 45,
   'Lie on your back, arms up, knees bent at 90 degrees. Slowly lower the opposite arm and leg while your lower back stays pressed to the floor.'),
  ('bird_dog', 'Bird dog', 'core', 'bodyweight', false, 3, '8 each side', 45,
   'On hands and knees, reach one arm forward and the opposite leg back. Hold for a second without letting your hips tilt.'),
  ('pallof_press', 'Pallof press', 'core', 'cables', false, 3, '10 each side', 45,
   'Stand sideways to the cable with the handle at your chest. Press it straight out and don''t let it pull you into a twist.')
on conflict (id) do update set
  name = excluded.name,
  muscle_group = excluded.muscle_group,
  equipment = excluded.equipment,
  is_compound = excluded.is_compound,
  sets = excluded.sets,
  reps = excluded.reps,
  rest_seconds = excluded.rest_seconds,
  form_cue = excluded.form_cue;

insert into public.routines (id, name, description, days_per_week)
values
  ('full_body_3', 'Full Body, 3 days a week',
   'Two full-body workouts you alternate: A, B, A one week, then B, A, B the next. A great place to start.', 3),
  ('upper_lower_4', 'Upper / Lower, 4 days a week',
   'Upper body and lower body on separate days, each twice a week (for example Mon, Tue, Thu, Fri).', 4),
  ('push_pull_legs', 'Push / Pull / Legs, 5-6 days a week',
   'Pushing muscles, pulling muscles and legs each get their own day. Go through the three days once or twice a week.', 6)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  days_per_week = excluded.days_per_week;

-- Rebuild the routine layout from scratch so edits here always win.
delete from public.routine_days where routine_id in ('full_body_3', 'upper_lower_4', 'push_pull_legs');

insert into public.routine_days (routine_id, day_number, label)
values
  ('full_body_3', 1, 'Workout A'),
  ('full_body_3', 2, 'Workout B'),
  ('upper_lower_4', 1, 'Upper'),
  ('upper_lower_4', 2, 'Lower'),
  ('push_pull_legs', 1, 'Push'),
  ('push_pull_legs', 2, 'Pull'),
  ('push_pull_legs', 3, 'Legs');

insert into public.routine_exercises (routine_id, day_number, position, exercise_id)
values
  -- Full body A
  ('full_body_3', 1, 1, 'goblet_squat'),
  ('full_body_3', 1, 2, 'machine_chest_press'),
  ('full_body_3', 1, 3, 'lat_pulldown'),
  ('full_body_3', 1, 4, 'seated_db_press'),
  ('full_body_3', 1, 5, 'plank'),
  -- Full body B
  ('full_body_3', 2, 1, 'db_rdl'),
  ('full_body_3', 2, 2, 'db_bench_press'),
  ('full_body_3', 2, 3, 'seated_cable_row'),
  ('full_body_3', 2, 4, 'lateral_raise'),
  ('full_body_3', 2, 5, 'dead_bug'),
  -- Upper
  ('upper_lower_4', 1, 1, 'db_bench_press'),
  ('upper_lower_4', 1, 2, 'seated_cable_row'),
  ('upper_lower_4', 1, 3, 'machine_shoulder_press'),
  ('upper_lower_4', 1, 4, 'lat_pulldown'),
  ('upper_lower_4', 1, 5, 'db_curl'),
  ('upper_lower_4', 1, 6, 'triceps_pushdown'),
  -- Lower
  ('upper_lower_4', 2, 1, 'leg_press'),
  ('upper_lower_4', 2, 2, 'db_rdl'),
  ('upper_lower_4', 2, 3, 'seated_leg_curl'),
  ('upper_lower_4', 2, 4, 'leg_extension'),
  ('upper_lower_4', 2, 5, 'glute_bridge'),
  ('upper_lower_4', 2, 6, 'plank'),
  -- Push
  ('push_pull_legs', 1, 1, 'machine_chest_press'),
  ('push_pull_legs', 1, 2, 'incline_db_press'),
  ('push_pull_legs', 1, 3, 'seated_db_press'),
  ('push_pull_legs', 1, 4, 'lateral_raise'),
  ('push_pull_legs', 1, 5, 'triceps_pushdown'),
  -- Pull
  ('push_pull_legs', 2, 1, 'lat_pulldown'),
  ('push_pull_legs', 2, 2, 'one_arm_db_row'),
  ('push_pull_legs', 2, 3, 'face_pull'),
  ('push_pull_legs', 2, 4, 'db_curl'),
  ('push_pull_legs', 2, 5, 'hammer_curl'),
  -- Legs
  ('push_pull_legs', 3, 1, 'goblet_squat'),
  ('push_pull_legs', 3, 2, 'db_rdl'),
  ('push_pull_legs', 3, 3, 'leg_extension'),
  ('push_pull_legs', 3, 4, 'seated_leg_curl'),
  ('push_pull_legs', 3, 5, 'hip_abduction'),
  ('push_pull_legs', 3, 6, 'dead_bug');
