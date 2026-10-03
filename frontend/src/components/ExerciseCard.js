import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

// onPress and done are optional (used on the Workout Details screen to tick exercises).
export default function ExerciseCard({ exercise, done, onPress }) {
  const content = (
    <View style={[styles.card, done && styles.cardDone]}>
      <View style={styles.imageBox}>
        <Text style={styles.emoji}>{exercise.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.detail}>
          {exercise.detail} · {exercise.difficulty}
        </Text>
        <Text style={styles.muscles}>Targets: {exercise.muscles.join(', ')}</Text>
      </View>
      {onPress ? (
        <View style={[styles.check, done && styles.checkOn]}>
          <Text style={styles.checkText}>{done ? '✓' : ''}</Text>
        </View>
      ) : null}
    </View>
  );

  if (!onPress) return content;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!done }}
      accessibilityLabel={exercise.name}
      style={({ pressed }) => pressed && { opacity: 0.75 }}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    marginBottom: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardDone: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  imageBox: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 4,
  },
  emoji: { fontSize: 26 },
  info: { flex: 1 },
  name: { ...typography.h3, color: colors.text },
  detail: { ...typography.body, color: colors.primary, fontWeight: '600' },
  muscles: { ...typography.small, color: colors.textMuted, marginTop: 2 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  checkOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkText: { color: colors.white, fontWeight: '800' },
});
