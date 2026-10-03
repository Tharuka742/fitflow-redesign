import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

// Selectable chips. Single select by default, multi select when multi={true}.
export default function OptionGroup({ label, options, selected, onSelect, multi = false }) {
  const isSelected = (o) => (multi ? selected.includes(o) : selected === o);
  return (
    <View style={styles.group}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.wrap}>
        {options.map((o) => (
          <Pressable
            key={o}
            onPress={() => onSelect(o)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected(o) }}
            style={({ pressed }) => [styles.chip, isSelected(o) && styles.chipOn, pressed && { opacity: 0.7 }]}
          >
            <Text style={[styles.chipText, isSelected(o) && styles.chipTextOn]}>{o}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: spacing.md },
  label: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  wrap: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 40,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    justifyContent: 'center',
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.body, color: colors.text, fontWeight: '600' },
  chipTextOn: { color: colors.white },
});
