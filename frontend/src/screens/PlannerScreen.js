import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import OptionGroup from '../components/OptionGroup';
import ExerciseCard from '../components/ExerciseCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import InfoModal from '../components/InfoModal';
import { useApp } from '../state/AppContext';
import {
  GOALS, LEVELS, EQUIPMENT, TIMES, DAYS, ENERGY,
  defaultPlannerOptions, generatePlan,
} from '../data/mockWorkouts';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function PlannerScreen({ navigation }) {
  const { setCurrentWorkout, setRecStatus } = useApp();
  const [options, setOptions] = useState(defaultPlannerOptions);
  const [plan, setPlan] = useState(() => generatePlan(defaultPlannerOptions));
  const [loading, setLoading] = useState(false);
  const [whyVisible, setWhyVisible] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const setOption = (key, value) => setOptions((o) => ({ ...o, [key]: value }));

  function toggleDay(day) {
    setOptions((o) => {
      const has = o.days.includes(day);
      if (has && o.days.length === 1) return o; // keep at least one day
      return { ...o, days: has ? o.days.filter((d) => d !== day) : [...o.days, day] };
    });
  }

  function generate() {
    setLoading(true);
    clearTimeout(timer.current);
    // Short delay to feel like an AI is "thinking" (no real AI service).
    timer.current = setTimeout(() => {
      setPlan(generatePlan(options));
      setLoading(false);
    }, 900);
  }

  function usePlan() {
    setCurrentWorkout(plan);
    setRecStatus('accepted');
    navigation.navigate('WorkoutDetails', { workout: plan });
  }

  return (
    <Screen>
      <SectionHeader large title="AI Workout Planner" />
      <Text style={styles.sub}>Tell FitFlow about today. You stay in control of every choice.</Text>

      <Card>
        <OptionGroup label="Fitness goal" options={GOALS} selected={options.goal} onSelect={(v) => setOption('goal', v)} />
        <OptionGroup label="Experience level" options={LEVELS} selected={options.level} onSelect={(v) => setOption('level', v)} />
        <OptionGroup label="Available time" options={TIMES} selected={`${options.time} min`} onSelect={(v) => setOption('time', parseInt(v, 10))} />
        <OptionGroup label="Equipment" options={EQUIPMENT} selected={options.equipment} onSelect={(v) => setOption('equipment', v)} />
        <OptionGroup label="Preferred workout days" options={DAYS} selected={options.days} onSelect={toggleDay} multi />
        <OptionGroup label="Current energy level" options={ENERGY} selected={options.energy} onSelect={(v) => setOption('energy', v)} />
        <PrimaryButton title={loading ? 'Generating...' : '✨ Generate My Plan'} onPress={generate} disabled={loading} />
      </Card>

      <SectionHeader title="Your Personalized Plan" />
      <Card>
        <Text style={styles.planTitle}>{plan.title}</Text>
        <Text style={styles.planMeta}>
          ⏱ {plan.duration} min · 📶 {plan.difficulty} · 🔥 ~{plan.calories} kcal
        </Text>
        <Text style={styles.planMuscles}>Muscle groups: {plan.muscles.join(' · ')}</Text>
      </Card>

      {plan.exercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} />
      ))}

      <View style={styles.buttons}>
        <SecondaryButton title="Why this plan?" onPress={() => setWhyVisible(true)} style={styles.flex} />
        <PrimaryButton title="Use This Plan" onPress={usePlan} style={[styles.flex, styles.gap]} />
      </View>

      <InfoModal
        visible={whyVisible}
        title="Why this plan?"
        body={plan.reason}
        onClose={() => setWhyVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sub: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md },
  planTitle: { ...typography.h2, color: colors.text },
  planMeta: { ...typography.body, color: colors.primary, fontWeight: '700', marginTop: 4 },
  planMuscles: { ...typography.body, color: colors.textMuted, marginTop: 4 },
  buttons: { flexDirection: 'row', marginTop: spacing.sm },
  flex: { flex: 1 },
  gap: { marginLeft: spacing.sm },
});
