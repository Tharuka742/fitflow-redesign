import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import ProgressBar from '../components/ProgressBar';
import StatCard from '../components/StatCard';
import WorkoutCard from '../components/WorkoutCard';
import WeeklyBars from '../components/WeeklyBars';
import InfoModal from '../components/InfoModal';
import { useApp } from '../state/AppContext';
import { sumMeals, nutritionGoals } from '../data/mockNutrition';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({ navigation }) {
  const {
    user, currentWorkout, recStatus, setRecStatus, personalized,
    todayMinutes, weekly, todayIndex, weeklyWorkouts, weeklyMinutes,
    streak, meals, achievements,
  } = useApp();
  const [whyVisible, setWhyVisible] = useState(false);

  const eaten = sumMeals(meals).calories;
  const dailyProgress = todayMinutes / user.dailyMinutesGoal;
  const latest = achievements[0];

  function startWorkout() {
    setRecStatus('accepted');
    navigation.navigate('WorkoutDetails', { workout: currentWorkout, autoStart: true });
  }

  return (
    <Screen
      header={
        <AppHeader
          onNotificationPress={() =>
            Alert.alert('Notifications', 'Reminder: your 20 min Daily Flow is ready. (Mock notification)')
          }
          onProfilePress={() => navigation.navigate('Profile')}
        />
      }
    >
      <Text style={styles.greeting}>{getGreeting()}, {user.name}! 👋</Text>
      <Text style={styles.subGreeting}>Let's keep your streak going.</Text>

      <Card>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Today's Progress</Text>
          <Text style={styles.cardValue}>{todayMinutes} / {user.dailyMinutesGoal} min</Text>
        </View>
        <ProgressBar progress={dailyProgress} height={12} />
        <Text style={styles.hint}>
          {dailyProgress >= 1 ? '🎉 Daily goal reached!' : 'Finish your Daily Flow to reach your goal.'}
        </Text>
      </Card>

      <WorkoutCard
        workout={currentWorkout}
        status={recStatus}
        personalized={personalized}
        onWhy={() => setWhyVisible(true)}
        onStart={startWorkout}
        onAccept={() => setRecStatus('accepted')}
        onCustomize={() => navigation.navigate('Planner')}
        onSkip={() => setRecStatus('skipped')}
        onUndo={() => setRecStatus('pending')}
      />

      <SectionHeader title="Workout Summary" actionLabel="Details" onAction={() => navigation.navigate('WorkoutDetails', { workout: currentWorkout })} />
      <View style={styles.statRow}>
        <StatCard icon="🏋️" value={`${weeklyWorkouts}`} label="Workouts this week" style={styles.statLeft} />
        <StatCard icon="🔥" value={`${streak} days`} label="Current streak" tint={colors.accentSoft} />
      </View>

      <Card>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>🥗 Calories</Text>
          <Text style={styles.cardValue}>{eaten} / {nutritionGoals.calories} kcal</Text>
        </View>
        <ProgressBar progress={eaten / nutritionGoals.calories} color={colors.accent} height={12} />
        <Text style={styles.hint}>{Math.max(0, nutritionGoals.calories - eaten)} kcal remaining today</Text>
      </Card>

      <SectionHeader title="Weekly Activity" actionLabel="See all" onAction={() => navigation.navigate('Progress')} />
      <Card>
        <WeeklyBars data={weekly} todayIndex={todayIndex} />
        <Text style={styles.hint}>{weeklyMinutes} active minutes this week</Text>
      </Card>

      <Card style={styles.achievement}>
        <Text style={styles.achievementIcon}>{latest.icon}</Text>
        <View style={styles.flex}>
          <Text style={styles.achievementTitle}>{latest.title}</Text>
          <Text style={styles.achievementText}>{latest.detail}</Text>
        </View>
      </Card>

      <InfoModal
        visible={whyVisible}
        title="Why this plan?"
        body={currentWorkout.reason}
        onClose={() => setWhyVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  greeting: { ...typography.title, color: colors.text },
  subGreeting: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  cardTitle: { ...typography.h3, color: colors.text },
  cardValue: { ...typography.body, color: colors.primary, fontWeight: '700' },
  hint: { ...typography.small, color: colors.textMuted, marginTop: spacing.sm },
  statRow: { flexDirection: 'row', marginBottom: spacing.md },
  statLeft: { marginRight: spacing.sm + 4 },
  achievement: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.accentSoft, borderColor: '#FFD2BD' },
  achievementIcon: { fontSize: 34, marginRight: spacing.md },
  achievementTitle: { ...typography.h3, color: colors.text },
  achievementText: { ...typography.body, color: colors.textMuted },
  flex: { flex: 1 },
});
