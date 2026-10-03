import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

function Chip({ text }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{text}</Text>
    </View>
  );
}

// The big "Today's AI Workout" card on the Home screen.
export default function WorkoutCard({
  workout,
  status,
  personalized,
  onWhy,
  onStart,
  onAccept,
  onCustomize,
  onSkip,
  onUndo,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.badge}>✨ Daily Flow · AI recommendation</Text>
      <Text style={styles.label}>Today's AI Workout</Text>
      <Text style={styles.title}>{workout.title}</Text>

      {!personalized ? (
        <Text style={styles.note}>
          Personalized recommendations are off (Profile → Settings). Showing a general routine.
        </Text>
      ) : null}

      <View style={styles.chipRow}>
        <Chip text={`⏱ ${workout.duration} min`} />
        <Chip text={`📶 ${workout.difficulty}`} />
        <Chip text={`🔥 ~${workout.calories} kcal`} />
      </View>
      <Text style={styles.muscles}>Muscle groups: {workout.muscles.join(' · ')}</Text>

      {status === 'skipped' ? (
        <View>
          <Text style={styles.skipped}>You skipped today's recommendation. That's okay, you are in control.</Text>
          <SecondaryButton light title="Undo skip" onPress={onUndo} />
        </View>
      ) : (
        <View>
          <View style={styles.buttonRow}>
            <SecondaryButton light title="Why this plan?" onPress={onWhy} style={styles.half} />
            <PrimaryButton
              title="Start Workout"
              onPress={onStart}
              color={colors.accent}
              style={styles.half}
            />
          </View>

          {status === 'accepted' ? (
            <Text style={styles.accepted}>✅ Recommendation accepted</Text>
          ) : (
            <View style={styles.linkRow}>
              <Text style={styles.link} onPress={onAccept} accessibilityRole="button">
                ✔ Accept
              </Text>
              <Text style={styles.link} onPress={onCustomize} accessibilityRole="button">
                ✎ Customize
              </Text>
              <Text style={styles.link} onPress={onSkip} accessibilityRole="button">
                ⏭ Skip
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.md + 4,
    marginBottom: spacing.md,
  },
  badge: { ...typography.small, color: '#CFF3E8', fontWeight: '700', marginBottom: spacing.sm },
  label: { ...typography.body, color: '#CFF3E8' },
  title: { fontSize: 26, fontWeight: '800', color: colors.white, marginBottom: spacing.sm },
  note: { ...typography.small, color: '#FFE3D6', marginBottom: spacing.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.sm },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  chipText: { ...typography.small, color: colors.white, fontWeight: '700' },
  muscles: { ...typography.body, color: colors.white, marginBottom: spacing.md },
  buttonRow: { flexDirection: 'row' },
  half: { flex: 1, marginRight: spacing.sm },
  linkRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.md },
  link: { ...typography.body, color: colors.white, fontWeight: '700', padding: spacing.xs },
  accepted: { ...typography.body, color: colors.white, fontWeight: '700', textAlign: 'center', marginTop: spacing.md },
  skipped: { ...typography.body, color: colors.white, marginBottom: spacing.md },
});
