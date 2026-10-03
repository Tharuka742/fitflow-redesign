export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export const nutritionGoals = { calories: 2000, protein: 120, carbs: 220, fat: 65 };

export const initialMeals = [
  { id: 'm1', type: 'Breakfast', name: 'Oats with banana', calories: 320, protein: 12, carbs: 58, fat: 6 },
  { id: 'm2', type: 'Lunch', name: 'Grilled chicken salad', calories: 410, protein: 38, carbs: 20, fat: 16 },
  { id: 'm3', type: 'Snack', name: 'Greek yogurt', calories: 120, protein: 12, carbs: 8, fat: 3 },
];

// Result of the simulated food scanner (no real computer vision).
export const mockScanResult = {
  name: 'Chicken Rice Bowl',
  calories: 520,
  protein: 32,
  carbs: 62,
  fat: 14,
};

export function sumMeals(meals) {
  return meals.reduce(
    (t, m) => ({
      calories: t.calories + m.calories,
      protein: t.protein + m.protein,
      carbs: t.carbs + m.carbs,
      fat: t.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}
