import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function SectionHeader({ title, actionLabel, onAction, large }) {
  return (
    <View style={styles.row}>
      <Text accessibilityRole="header" style={[large ? styles.large : styles.title]}>
        {title}
      </Text>
      {actionLabel ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  title: { ...typography.h3, color: colors.text },
  large: { ...typography.title, color: colors.text },
  action: { ...typography.body, color: colors.primary, fontWeight: '700' },
});
