// Simple shared state (React Context). Screens read/update this instead of a backend.
import React, { createContext, useContext, useState } from 'react';
import { dailyWorkout } from '../data/mockWorkouts';
import {
  mockUser,
  baseWeekly,
  baseWeeklyWorkouts,
  baseWeeklyCalories,
  baseHistory,
  baseAchievements,
} from '../data/mockProgress';
import { initialMeals } from '../data/mockNutrition';

const AppContext = createContext(null);

// Monday = 0 ... Sunday = 6
const todayIndex = (new Date().getDay() + 6) % 7;

export function AppProvider({ children }) {
  const [currentWorkout, setCurrentWorkout] = useState(dailyWorkout);
  const [recStatus, setRecStatus] = useState('pending'); // pending | accepted | skipped
  const [personalized, setPersonalized] = useState(true);
  const [sessionLog, setSessionLog] = useState([]); // workouts completed in this session
  const [streak, setStreak] = useState(mockUser.streak);
  const [meals, setMeals] = useState(initialMeals);

  const todayMinutes = sessionLog.reduce((sum, w) => sum + w.minutes, 0);
  const sessionCalories = sessionLog.reduce((sum, w) => sum + w.calories, 0);

  const weekly = baseWeekly.map((d, i) =>
    i === todayIndex ? { ...d, minutes: d.minutes + todayMinutes } : d
  );
  const weeklyMinutes = weekly.reduce((sum, d) => sum + d.minutes, 0);

  const history = [
    ...sessionLog.map((w) => ({ ...w })).reverse(),
    ...baseHistory,
  ];

  const achievements =
    sessionLog.length > 0
      ? [
          { id: 'new', icon: '🔥', title: 'Great job!', detail: "You completed today's workout." },
          ...baseAchievements,
        ]
      : baseAchievements;

  function completeWorkout(workout, doneCount) {
    const calories = Math.round((workout.calories * doneCount) / workout.exercises.length);
    const entry = {
      id: `s${Date.now()}`,
      title: workout.title,
      date: 'Today',
      minutes: workout.duration,
      calories,
    };
    if (sessionLog.length === 0) setStreak((s) => s + 1);
    setSessionLog((log) => [...log, entry]);
    return entry;
  }

  function addMeal(meal) {
    setMeals((list) => [...list, { ...meal, id: `m${Date.now()}${Math.floor(Math.random() * 1000)}` }]);
  }

  const value = {
    user: mockUser,
    currentWorkout,
    setCurrentWorkout,
    recStatus,
    setRecStatus,
    personalized,
    setPersonalized,
    streak,
    totalWorkouts: mockUser.totalWorkouts + sessionLog.length,
    weekly,
    todayIndex,
    todayMinutes,
    weeklyMinutes,
    weeklyWorkouts: baseWeeklyWorkouts + sessionLog.length,
    weeklyCalories: baseWeeklyCalories + sessionCalories,
    history,
    achievements,
    completeWorkout,
    meals,
    addMeal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
