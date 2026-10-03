import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import ProgressBar from '../components/ProgressBar';
import NutritionCard from '../components/NutritionCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import MealFormModal from '../components/MealFormModal';
import ScanFoodModal from '../components/ScanFoodModal';
import { useApp } from '../state/AppContext';
import { MEAL_TYPES, nutritionGoals, sumMeals } from '../data/mockNutrition';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

function MacroRow({ label, value, goal, color }) {
  return (
    <View style={styles.macro}>
      <View style={styles.between}>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={styles.macroValue}>{value} / {goal} g</Text>
      </View>
      <ProgressBar progress={value / goal} color={color} height={8} />
    </View>
  );
}

export default function NutritionScreen() {
  const { meals, addMeal } = useApp();
  const [formVisible, setFormVisible] = useState(false);
  const [formInitial, setFormInitial] = useState(null);
  const [scanVisible, setScanVisible] = useState(false);

  const totals = sumMeals(meals);

  function openLogMeal() {
    setFormInitial(null);
    setFormVisible(true);
  }

  function saveMeal(meal) {
    addMeal(meal);
    setFormVisible(false);
  }

  function addScanned(meal) {
    addMeal(meal);
    setScanVisible(false);
  }

  function editScanned(meal) {
    setScanVisible(false);
    setFormInitial(meal);
    setFormVisible(true);
  }

  return (
    <Screen>
      <SectionHeader large title="Nutrition" />

      <Card>
        <View style={styles.between}>
          <Text style={styles.cardTitle}>Today's Calories</Text>
          <Text style={styles.big}>{totals.calories}</Text>
        </View>
        <ProgressBar progress={totals.calories / nutritionGoals.calories} color={colors.accent} height={14} />
        <Text style={styles.hint}>
          of {nutritionGoals.calories} kcal goal · {Math.max(0, nutritionGoals.calories - totals.calories)} kcal left
        </Text>
        <View style={styles.macros}>
          <MacroRow label="Protein" value={totals.protein} goal={nutritionGoals.protein} color={colors.primary} />
          <MacroRow label="Carbohydrates" value={totals.carbs} goal={nutritionGoals.carbs} color="#2980B9" />
          <MacroRow label="Fat" value={totals.fat} goal={nutritionGoals.fat} color="#E0A100" />
        </View>
      </Card>

      <PrimaryButton title="+ Log Meal" onPress={openLogMeal} style={styles.logButton} />
      <SecondaryButton title="📷 Scan Food" onPress={() => setScanVisible(true)} style={styles.scanButton} />

      <SectionHeader title="Meal Diary" />
      {MEAL_TYPES.map((type) => {
        const list = meals.filter((m) => m.type === type);
        return (
          <View key={type} style={styles.group}>
            <Text style={styles.groupTitle}>{type}</Text>
            {list.length === 0 ? (
              <Text style={styles.empty}>Nothing logged yet</Text>
            ) : (
              list.map((m) => <NutritionCard key={m.id} meal={m} />)
            )}
          </View>
        );
      })}

      <Text style={styles.disclaimer}>
        Nutrition estimates are for general tracking only and are not medical advice.
      </Text>

      <MealFormModal
        visible={formVisible}
        initial={formInitial}
        onClose={() => setFormVisible(false)}
        onSave={saveMeal}
      />
      <ScanFoodModal
        visible={scanVisible}
        onClose={() => setScanVisible(false)}
        onAdd={addScanned}
        onEdit={editScanned}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  cardTitle: { ...typography.h3, color: colors.text },
  big: { fontSize: 30, fontWeight: '800', color: colors.primary },
  hint: { ...typography.small, color: colors.textMuted, marginTop: spacing.sm },
  macros: { marginTop: spacing.md },
  macro: { marginBottom: spacing.sm + 2 },
  macroLabel: { ...typography.body, color: colors.text, fontWeight: '600' },
  macroValue: { ...typography.small, color: colors.textMuted },
  logButton: { minHeight: 58, marginBottom: spacing.sm },
  scanButton: { minHeight: 52, marginBottom: spacing.sm },
  group: { marginBottom: spacing.sm },
  groupTitle: { ...typography.h3, color: colors.primaryDark, marginBottom: spacing.xs + 2 },
  empty: { ...typography.body, color: colors.textMuted, marginBottom: spacing.sm },
  disclaimer: { ...typography.small, color: colors.textMuted, textAlign: 'center', marginTop: spacing.md },
});
