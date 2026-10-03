import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const features = [
  'AI-inspired personalized workout plans',
  'Social community feed',
  'Nutrition tracking',
  'Progress dashboard',
  'Achievement and motivation features',
  'Improved navigation and user experience',
];

export default function ReleaseNotesScreen() {
  return (
    <Screen edges={['bottom']}>
      <Text style={styles.title}>FitFlow Redesign – Version 1.0.0</Text>
      <Text style={styles.sub}>Android versionName 1.0.0 · versionCode 1</Text>
      <Card>
        <Text style={styles.heading}>New features</Text>
        {features.map((f) => (
          <Text key={f} style={styles.item}>
            ✅ {f}
          </Text>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text },
  sub: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md },
  heading: { ...typography.h3, color: colors.primaryDark, marginBottom: spacing.sm },
  item: { ...typography.body, color: colors.text, marginBottom: spacing.sm },
});
