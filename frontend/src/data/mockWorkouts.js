// Local mock "AI" - no backend. generatePlan() builds a realistic plan from the user's choices.

export const GOALS = ['Weight management', 'Strength', 'Flexibility', 'General fitness'];
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const EQUIPMENT = ['No equipment', 'Dumbbells', 'Resistance bands'];
export const TIMES = ['10 min', '20 min', '30 min', '45 min'];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const ENERGY = ['Low', 'Medium', 'High'];

// type: 'reps' or 'time'. base = reps or seconds.
const library = [
  { id: 'e1', name: 'Bodyweight Squats', emoji: '🦵', type: 'reps', base: 12, muscles: ['Legs', 'Glutes'], equipment: 'No equipment', goals: ['Weight management', 'Strength', 'General fitness'] },
  { id: 'e2', name: 'Push Ups', emoji: '💪', type: 'reps', base: 10, muscles: ['Chest', 'Arms', 'Core'], equipment: 'No equipment', goals: ['Strength', 'Weight management', 'General fitness'] },
  { id: 'e3', name: 'Glute Bridge', emoji: '🍑', type: 'reps', base: 12, muscles: ['Glutes', 'Hamstrings'], equipment: 'No equipment', goals: ['Strength', 'Flexibility', 'General fitness'] },
  { id: 'e4', name: 'Plank', emoji: '🧱', type: 'time', base: 30, muscles: ['Core', 'Shoulders'], equipment: 'No equipment', goals: ['Strength', 'Weight management', 'General fitness'] },
  { id: 'e5', name: 'Mountain Climbers', emoji: '🏃', type: 'time', base: 30, muscles: ['Core', 'Cardio'], equipment: 'No equipment', goals: ['Weight management', 'General fitness'] },
  { id: 'e6', name: 'Jumping Jacks', emoji: '⭐', type: 'time', base: 40, muscles: ['Full body', 'Cardio'], equipment: 'No equipment', goals: ['Weight management', 'General fitness'] },
  { id: 'e7', name: 'Reverse Lunges', emoji: '🚶', type: 'reps', base: 10, muscles: ['Legs', 'Glutes'], equipment: 'No equipment', goals: ['Strength', 'Weight management', 'General fitness'] },
  { id: 'e8', name: 'Cat-Cow Stretch', emoji: '🐈', type: 'time', base: 40, muscles: ['Spine', 'Core'], equipment: 'No equipment', goals: ['Flexibility', 'General fitness'] },
  { id: 'e9', name: 'Hamstring Stretch', emoji: '🤸', type: 'time', base: 30, muscles: ['Hamstrings', 'Back'], equipment: 'No equipment', goals: ['Flexibility'] },
  { id: 'e10', name: "Child's Pose", emoji: '🧘', type: 'time', base: 40, muscles: ['Back', 'Hips'], equipment: 'No equipment', goals: ['Flexibility'] },
  { id: 'e11', name: 'Dumbbell Goblet Squat', emoji: '🏋️', type: 'reps', base: 10, muscles: ['Legs', 'Glutes'], equipment: 'Dumbbells', goals: ['Strength', 'Weight management', 'General fitness'] },
  { id: 'e12', name: 'Dumbbell Row', emoji: '🏋️', type: 'reps', base: 10, muscles: ['Back', 'Arms'], equipment: 'Dumbbells', goals: ['Strength', 'General fitness'] },
  { id: 'e13', name: 'Dumbbell Shoulder Press', emoji: '🏋️', type: 'reps', base: 10, muscles: ['Shoulders', 'Arms'], equipment: 'Dumbbells', goals: ['Strength', 'General fitness'] },
  { id: 'e14', name: 'Banded Pull-Apart', emoji: '🎗️', type: 'reps', base: 15, muscles: ['Upper back', 'Shoulders'], equipment: 'Resistance bands', goals: ['Strength', 'Flexibility', 'General fitness'] },
  { id: 'e15', name: 'Banded Squat', emoji: '🎗️', type: 'reps', base: 12, muscles: ['Legs', 'Glutes'], equipment: 'Resistance bands', goals: ['Strength', 'Weight management', 'General fitness'] },
  { id: 'e16', name: 'Banded Glute Kickback', emoji: '🎗️', type: 'reps', base: 12, muscles: ['Glutes'], equipment: 'Resistance bands', goals: ['Strength', 'Weight management', 'General fitness'] },
];

const titleByGoal = {
  'Weight management': 'Fat Burn Circuit',
  Strength: 'Strength Builder',
  Flexibility: 'Mobility Flow',
  'General fitness': 'Full Body Flow',
};
const caloriesPerMinute = { 'Weight management': 8, Strength: 6, Flexibility: 3.5, 'General fitness': 6.5 };
const exerciseCount = { 10: 3, 20: 5, 30: 6, 45: 8 };
const levelFactor = { Beginner: 0.8, Intermediate: 1, Advanced: 1.2 };
const levelSets = { Beginner: 2, Intermediate: 3, Advanced: 3 };
const energyFactor = { Low: 0.8, Medium: 1, High: 1.1 };

function describeExercise(ex, level, energy) {
  const sets = levelSets[level];
  const factor = levelFactor[level] * energyFactor[energy];
  if (ex.type === 'reps') {
    return `${sets} x ${Math.round(ex.base * factor)} reps`;
  }
  const seconds = Math.round((ex.base * factor) / 5) * 5;
  return `${sets} x ${seconds} sec`;
}

export function generatePlan(options) {
  const { goal, level, time, equipment, energy, days } = options;
  const wantedEquipment = equipment === 'No equipment' ? null : equipment;

  // Score: equipment match first, then goal match, then original order.
  const scored = library
    .filter((ex) => ex.equipment === 'No equipment' || ex.equipment === wantedEquipment)
    .map((ex, index) => ({
      ex,
      index,
      score: (ex.equipment === wantedEquipment ? 2 : 0) + (ex.goals.includes(goal) ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const chosen = scored.slice(0, exerciseCount[time]).map((s) => s.ex);

  const exercises = chosen.map((ex) => ({
    id: ex.id,
    name: ex.name,
    emoji: ex.emoji,
    detail: describeExercise(ex, level, energy),
    difficulty: level,
    muscles: ex.muscles,
  }));

  const muscles = [];
  chosen.forEach((ex) =>
    ex.muscles.forEach((m) => {
      if (!muscles.includes(m)) muscles.push(m);
    })
  );
  const mainMuscles = muscles.slice(0, 4);

  const calories = Math.round(
    time * caloriesPerMinute[goal] * (0.9 + levelFactor[level] * 0.1 + (energyFactor[energy] - 1))
  );

  const reason =
    `Based on your goal (${goal}), ${level.toLowerCase()} experience, ${time} minutes available, ` +
    `${equipment.toLowerCase()} and ${energy.toLowerCase()} energy today, FitFlow selected ` +
    `${exercises.length} exercises that target ${mainMuscles.join(', ').toLowerCase()}. ` +
    `Volume is adjusted for your level and energy` +
    (days && days.length ? `, and fits your ${days.length} preferred workout days per week.` : '.') +
    ' (This is a simulated recommendation for the prototype.)';

  return {
    id: `plan-${goal}-${level}-${time}-${equipment}-${energy}`,
    title: `${time} min ${titleByGoal[goal]}`,
    duration: time,
    difficulty: level,
    calories,
    muscles: mainMuscles,
    exercises,
    reason,
  };
}

export const defaultPlannerOptions = {
  goal: 'General fitness',
  level: 'Beginner',
  time: 20,
  equipment: 'No equipment',
  energy: 'Medium',
  days: ['Mon', 'Wed', 'Fri'],
};

export const dailyWorkout = {
  ...generatePlan(defaultPlannerOptions),
  reason:
    'Based on your recent activity, available time and selected fitness goal, FitFlow recommends a short full-body session today. ' +
    'You trained 4 times this week, so a lighter 20 minute session keeps your streak going without overloading your body.',
};
