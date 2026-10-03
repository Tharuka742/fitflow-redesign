import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const MAX_HEIGHT = 90;

// Simple bar chart built from Views. data = [{ day, minutes }]
export default function WeeklyBars({ data, todayIndex }) {
  const maxMinutes = Math.max(30, ...data.map((d) => d.minutes));
  return (
    <View style={styles.row} accessibilityLabel="Weekly activity chart">
      {data.map((d, i) => {
        const height = Math.max(4, (d.minutes / maxMinutes) * MAX_HEIGHT);
        const isToday = i === todayIndex;
        return (
          <View key={d.day} style={styles.col}>
            <Text style={styles.minutes}>{d.minutes > 0 ? d.minutes : ''}</Text>
            <View style={styles.barArea}>
              <View
                style={[
                  styles.bar,
                  { height },
                  d.minutes === 0 && styles.barEmpty,
                  isToday && d.minutes > 0 && styles.barToday,
                ]}
              />
            </View>
            <Text style={[styles.day, isToday && styles.dayToday]}>{d.day}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  col: { flex: 1, alignItems: 'center' },
  minutes: { ...typography.small, color: colors.textMuted, height: 16 },
  barArea: { height: MAX_HEIGHT, justifyContent: 'flex-end' },
  bar: { width: 22, borderRadius: 8, backgroundColor: colors.primary },
  barEmpty: { backgroundColor: colors.border },
  barToday: { backgroundColor: colors.accent },
  day: { ...typography.small, color: colors.textMuted, marginTop: spacing.xs },
  dayToday: { color: colors.accent, fontWeight: '800' },
});
