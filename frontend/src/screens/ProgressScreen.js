import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import WeeklyBars from '../components/WeeklyBars';
import { useApp } from '../state/AppContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function ProgressScreen() {
  const {
    user, weekly, todayIndex, weeklyWorkouts, weeklyMinutes,
    weeklyCalories, streak, history, achievements,
  } = useApp();

  const goalProgress = weeklyWorkouts / user.weeklyGoal;

  return (
    <Screen>
      <SectionHeader large title="Your Progress" />

      <View style={styles.row}>
        <StatCard icon="🏋️" value={`${weeklyWorkouts}`} label="Weekly workouts" style={styles.left} />
        <StatCard icon="⏱" value={`${weeklyMinutes}`} label="Total minutes" />
      </View>
      <View style={styles.row}>
        <StatCard icon="🔥" value={`${weeklyCalories}`} label="Calories burned" tint={colors.accentSoft} style={styles.left} />
        <StatCard icon="⚡" value={`${streak} days`} label="Current streak" tint={colors.accentSoft} />
      </View>

      <Card>
        <View style={styles.between}>
          <Text style={styles.cardTitle}>Weekly Goal</Text>
          <Text style={styles.value}>{Math.min(weeklyWorkouts, user.weeklyGoal)} / {user.weeklyGoal} workouts</Text>
        </View>
        <ProgressBar progress={goalProgress} height={14} color={colors.accent} />
        <Text style={styles.hint}>
          {goalProgress >= 1 ? '🎉 Weekly goal reached. Amazing!' : `${user.weeklyGoal - weeklyWorkouts} more workout(s) to reach your goal`}
        </Text>
      </Card>

      <SectionHeader title="Weekly Activity (minutes)" />
      <Card>
        <WeeklyBars data={weekly} todayIndex={todayIndex} />
      </Card>

      <SectionHeader title="Recent Achievements" />
      {achievements.map((a) => (
        <Card key={a.id} style={styles.achievement}>
          <Text style={styles.icon}>{a.icon}</Text>
          <View style={styles.flex}>
            <Text style={styles.cardTitle}>{a.title}</Text>
            <Text style={styles.hint}>{a.detail}</Text>
          </View>
        </Card>
      ))}

      <SectionHeader title="Workout History" />
      <Card>
        {history.map((h, i) => (
          <View key={h.id} style={[styles.historyRow, i < history.length - 1 && styles.divider]}>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{h.title}</Text>
              <Text style={styles.hint}>{h.date}</Text>
            </View>
            <Text style={styles.value}>{h.minutes} min · {h.calories} kcal</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: spacing.sm + 4 },
  left: { marginRight: spacing.sm + 4 },
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  cardTitle: { ...typography.h3, color: colors.text },
  value: { ...typography.body, color: colors.primary, fontWeight: '700' },
  hint: { ...typography.small, color: colors.textMuted, marginTop: 4 },
  achievement: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  icon: { fontSize: 30, marginRight: spacing.md },
  flex: { flex: 1 },
  historyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm + 2 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
});
