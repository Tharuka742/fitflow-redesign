import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function NutritionCard({ meal }) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.kcal}>{meal.calories} kcal</Text>
      </View>
      <Text style={styles.macros}>
        Protein {meal.protein}g · Carbs {meal.carbs}g · Fat {meal.fat}g
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { ...typography.h3, color: colors.text, flex: 1, marginRight: spacing.sm },
  kcal: { ...typography.h3, color: colors.primary },
  macros: { ...typography.small, color: colors.textMuted, marginTop: 4 },
});
