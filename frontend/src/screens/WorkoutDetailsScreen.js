import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import ProgressBar from '../components/ProgressBar';
import ExerciseCard from '../components/ExerciseCard';
import StatCard from '../components/StatCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useApp } from '../state/AppContext';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function WorkoutDetailsScreen({ route, navigation }) {
  const { currentWorkout, completeWorkout } = useApp();
  const workout = (route.params && route.params.workout) || currentWorkout;
  const autoStart = !!(route.params && route.params.autoStart);

  const [status, setStatus] = useState(autoStart ? 'running' : 'idle'); // idle | running | paused | complete
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState([]);
  const [summary, setSummary] = useState(null);

  // Timer: counts seconds while running
  useEffect(() => {
    if (status !== 'running') return undefined;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  // Mock progress: every 6 seconds the next exercise is ticked automatically
  useEffect(() => {
    if (status === 'running' && elapsed > 0 && elapsed % 6 === 0) {
      setDone((prev) => {
        const next = workout.exercises.find((e) => !prev.includes(e.id));
        return next ? [...prev, next.id] : prev;
      });
    }
  }, [elapsed, status, workout]);

  const progress = done.length / workout.exercises.length;

  function toggleExercise(id) {
    if (status === 'complete') return;
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function finish() {
    const entry = completeWorkout(workout, done.length);
    setSummary({ calories: entry.calories, minutes: entry.minutes, exercises: done.length });
    setStatus('complete');
  }

  const footer =
    status === 'complete' ? null : (
      <View style={styles.footer}>
        {status === 'idle' ? (
          <PrimaryButton title="▶ Start Workout" onPress={() => setStatus('running')} style={styles.footerMain} />
        ) : (
          <SecondaryButton
            title={status === 'running' ? '⏸ Pause' : '▶ Resume'}
            onPress={() => setStatus(status === 'running' ? 'paused' : 'running')}
            style={styles.footerMain}
          />
        )}
        <PrimaryButton
          title="✔ Complete"
          onPress={finish}
          disabled={done.length === 0}
          style={styles.footerMain}
          color={colors.accent}
        />
      </View>
    );

  if (status === 'complete' && summary) {
    return (
      <Screen edges={['bottom']}>
        <Card style={styles.completeCard}>
          <Text style={styles.trophy}>🏆</Text>
          <Text style={styles.completeTitle}>Workout Complete!</Text>
          <Text style={styles.completeText}>{workout.title}</Text>
        </Card>

        <View style={styles.statRow}>
          <StatCard icon="🔥" value={`${summary.calories}`} label="Calories burned" tint={colors.accentSoft} style={styles.gap} />
          <StatCard icon="⏱" value={`${summary.minutes} min`} label="Workout duration" style={styles.gap} />
          <StatCard icon="✅" value={`${summary.exercises}/${workout.exercises.length}`} label="Exercises" />
        </View>

        <Card style={styles.achievement}>
          <Text style={styles.achievementText}>🔥 Great job! You completed today's workout.</Text>
          <Text style={styles.motivation}>
            Every session counts. Your streak and weekly progress have been updated.
          </Text>
        </Card>

        <PrimaryButton title="Back to Home" onPress={() => navigation.navigate('Tabs', { screen: 'Home' })} />
        <SecondaryButton
          title="View My Progress"
          onPress={() => navigation.navigate('Tabs', { screen: 'Progress' })}
          style={{ marginTop: spacing.sm }}
        />
      </Screen>
    );
  }

  return (
    <Screen edges={['bottom']} footer={footer}>
      <Card>
        <Text style={styles.title}>{workout.title}</Text>
        <View style={styles.chipRow}>
          <Text style={styles.chip}>⏱ {workout.duration} min</Text>
          <Text style={styles.chip}>📶 {workout.difficulty}</Text>
          <Text style={styles.chip}>🔥 ~{workout.calories} kcal</Text>
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            Progress: {done.length}/{workout.exercises.length} exercises
          </Text>
          <Text style={styles.timer}>{formatTime(elapsed)}</Text>
        </View>
        <ProgressBar progress={progress} height={12} />
        <Text style={styles.status}>
          {status === 'idle' && 'Press Start Workout when you are ready.'}
          {status === 'running' && 'Workout in progress. Tap an exercise to tick it off.'}
          {status === 'paused' && 'Workout paused.'}
        </Text>
      </Card>

      <SectionHeader title="Exercises" />
      {workout.exercises.map((ex) => (
        <ExerciseCard
          key={ex.id}
          exercise={ex}
          done={done.includes(ex.id)}
          onPress={() => toggleExercise(ex.id)}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.h2, color: colors.text },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: spacing.sm },
  chip: {
    ...typography.small,
    color: colors.primaryDark,
    fontWeight: '700',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
    overflow: 'hidden',
  },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  progressLabel: { ...typography.body, color: colors.text, fontWeight: '600' },
  timer: { ...typography.h3, color: colors.primary },
  status: { ...typography.small, color: colors.textMuted, marginTop: spacing.sm },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerMain: { flex: 1, marginHorizontal: spacing.xs },
  completeCard: { alignItems: 'center', backgroundColor: colors.primary, borderColor: colors.primary },
  trophy: { fontSize: 56 },
  completeTitle: { fontSize: 28, fontWeight: '800', color: colors.white, marginTop: spacing.sm },
  completeText: { ...typography.body, color: '#CFF3E8', marginTop: 4 },
  statRow: { flexDirection: 'row', marginBottom: spacing.md },
  gap: { marginRight: spacing.sm },
  achievement: { backgroundColor: colors.accentSoft, borderColor: '#FFD2BD' },
  achievementText: { ...typography.h3, color: colors.text },
  motivation: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs },
});
