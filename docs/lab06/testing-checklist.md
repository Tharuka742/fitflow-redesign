# Frontend Testing Checklist

Tick each item only after you have tested it yourself. The same checklist is inside the app (Profile → Testing checklist).

## Navigation
- [ ] All 5 bottom tabs open (Home, Planner, Progress, Community, Nutrition)
- [ ] Profile opens from the Home header
- [ ] Home → Workout Details works
- [ ] Back button returns correctly
- [ ] Privacy Policy, Release Notes and Testing screens open from Profile

## Workout generation
- [ ] Planner options can be selected (goal, level, time, equipment, days, energy)
- [ ] Generate My Plan updates the plan
- [ ] "Why this plan?" modal opens on Home and Planner
- [ ] Use This Plan opens Workout Details

## Workout completion
- [ ] Start / Pause / Resume / Complete work
- [ ] Exercises can be ticked
- [ ] "Workout Complete!" screen shows calories, duration, exercises, message
- [ ] Home and Progress numbers update after completion

## Social interactions
- [ ] Like and unlike a post
- [ ] Comments open; "Send a cheer" adds a comment
- [ ] Join Challenge works and member count increases

## Nutrition logging
- [ ] + Log Meal saves a meal (and shows validation errors for empty name/calories)
- [ ] Scan Food shows a result; Add to Diary works; Edit opens the form
- [ ] Totals update on Nutrition and Home

## Profile settings
- [ ] Allow personalized recommendations switch works (Home card note changes)
- [ ] Notification switch works
- [ ] Language row changes value

## Screen responsiveness
- [ ] No text overflow on a small phone (e.g. 360 x 640)
- [ ] No text overflow on a large phone
- [ ] Keyboard does not hide fields in the meal form

## Android emulator compatibility
- [ ] App starts with `npx expo start` → `a`
- [ ] No red error screens
- [ ] Hardware back button works
