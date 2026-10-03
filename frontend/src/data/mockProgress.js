export const mockUser = {
  name: 'Alex',
  goal: 'Weight management',
  streak: 5,
  totalWorkouts: 24,
  weeklyGoal: 5,
  dailyMinutesGoal: 30,
};

// Monday -> Sunday (minutes of exercise)
export const baseWeekly = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 0 },
  { day: 'Thu', minutes: 20 },
  { day: 'Fri', minutes: 35 },
  { day: 'Sat', minutes: 0 },
  { day: 'Sun', minutes: 0 },
];
export const baseWeeklyWorkouts = 4;
export const baseWeeklyCalories = 820;

export const baseHistory = [
  { id: 'h1', title: '35 min Strength Builder', date: 'Friday', minutes: 35, calories: 240 },
  { id: 'h2', title: '20 min Full Body Flow', date: 'Thursday', minutes: 20, calories: 150 },
  { id: 'h3', title: '30 min Fat Burn Circuit', date: 'Tuesday', minutes: 30, calories: 260 },
  { id: 'h4', title: '25 min Mobility Flow', date: 'Monday', minutes: 25, calories: 170 },
];

export const baseAchievements = [
  { id: 'a1', icon: '🔥', title: '5-Day Streak', detail: 'You trained 5 days in a row' },
  { id: 'a2', icon: '🏅', title: '20 Workouts', detail: 'You passed 20 total workouts' },
  { id: 'a3', icon: '🌅', title: 'Early Bird', detail: 'Completed 3 morning workouts' },
];
