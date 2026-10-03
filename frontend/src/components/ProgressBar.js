import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

// progress is a number from 0 to 1
export default function ProgressBar({ progress, color = colors.primary, height = 10, trackColor = colors.border }) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
      style={[styles.track, { height, backgroundColor: trackColor, borderRadius: height / 2 }]}
    >
      <View style={{ width: `${pct}%`, height, backgroundColor: color, borderRadius: height / 2 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
});
