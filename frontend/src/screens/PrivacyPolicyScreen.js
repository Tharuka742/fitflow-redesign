import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const points = [
  ['Mock / local data', 'This prototype uses mock data stored only inside the app on your device.'],
  ['No backend', 'It does not send any personal information to a real backend or server.'],
  ['Simulated AI', 'AI workout recommendations are simulated by simple local rules.'],
  ['Simulated nutrition recognition', 'Food scanning is simulated. No camera image is analysed and no real model is used.'],
  ['Local social feed', 'The community feed, likes, comments and challenges are local mock data, not real users.'],
  ['Academic use', 'This prototype was created for academic coursework (IT3060 – Human Computer Interaction, Lab Exercise 06).'],
];

export default function PrivacyPolicyScreen() {
  return (
    <Screen edges={['bottom']}>
      <Text style={styles.title}>FitFlow Privacy Policy</Text>
      <Text style={styles.sub}>Prototype version 1.0.0</Text>
      <Card>
        {points.map(([heading, text]) => (
          <Text key={heading} style={styles.item}>
            <Text style={styles.heading}>{heading}: </Text>
            {text}
          </Text>
        ))}
      </Card>
      <Text style={styles.note}>
        Nutrition estimates are for general tracking only and are not medical advice. If this app is ever released
        publicly, this policy must be replaced with a full, legally reviewed privacy policy.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text },
  sub: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md },
  item: { ...typography.body, color: colors.text, marginBottom: spacing.md },
  heading: { fontWeight: '800', color: colors.primaryDark },
  note: { ...typography.small, color: colors.textMuted },
});
