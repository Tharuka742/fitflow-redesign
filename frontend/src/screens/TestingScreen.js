import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// Internal frontend testing checklist. Tick items yourself after you have tested them.
const sections = [
  { title: 'Navigation', items: ['All 5 bottom tabs open', 'Profile opens from the Home header', 'Home → Workout Details works', 'Back button returns correctly'] },
  { title: 'Workout generation', items: ['Planner options can be selected', 'Generate My Plan updates the plan', 'Why this plan? modal opens'] },
  { title: 'Workout completion', items: ['Start / Pause / Complete work', 'Workout Complete! screen appears', 'Home and Progress numbers update'] },
  { title: 'Social interactions', items: ['Like and unlike a post', 'Comments open and Send a cheer works', 'Join Challenge works'] },
  { title: 'Nutrition logging', items: ['+ Log Meal saves a meal', 'Scan Food → Add to Diary works', 'Totals update on Home and Nutrition'] },
  { title: 'Profile settings', items: ['Personalized recommendations switch works', 'Notification switch works', 'Language row changes value'] },
  { title: 'Screen responsiveness', items: ['No text overflow on a small phone', 'No text overflow on a large phone', 'Keyboard does not hide meal form fields'] },
  { title: 'Android emulator compatibility', items: ['App starts in an Android emulator', 'No red error screens', 'Back button behaviour is correct'] },
];

export default function TestingScreen() {
  const [checked, setChecked] = useState({});
  const toggle = (key) => setChecked((c) => ({ ...c, [key]: !c[key] }));

  return (
    <Screen edges={['bottom']}>
      <Text style={styles.title}>Internal Testing</Text>
      <Text style={styles.sub}>
        Manual frontend checklist. Real Firebase crash analytics or Play Console testing have NOT been done in this
        prototype.
      </Text>
      {sections.map((s) => (
        <Card key={s.title}>
          <Text style={styles.heading}>{s.title}</Text>
          {s.items.map((item) => {
            const key = `${s.title}-${item}`;
            return (
              <Pressable
                key={key}
                onPress={() => toggle(key)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: !!checked[key] }}
                style={styles.item}
              >
                <View style={[styles.box, checked[key] && styles.boxOn]}>
                  <Text style={styles.tick}>{checked[key] ? '✓' : ''}</Text>
                </View>
                <Text style={styles.itemText}>{item}</Text>
              </Pressable>
            );
          })}
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text },
  sub: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md },
  heading: { ...typography.h3, color: colors.primaryDark, marginBottom: spacing.sm },
  item: { flexDirection: 'row', alignItems: 'center', minHeight: 40 },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 4,
  },
  boxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  tick: { color: colors.white, fontWeight: '800' },
  itemText: { ...typography.body, color: colors.text, flex: 1 },
});
