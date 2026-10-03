import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function SecondaryButton({ title, onPress, style, light }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        light && styles.buttonLight,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, light && styles.textLight]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  buttonLight: { backgroundColor: 'transparent', borderColor: colors.white },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  text: { ...typography.button, color: colors.primary },
  textLight: { color: colors.white },
});
