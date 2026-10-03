import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

function IconButton({ icon, label, onPress, dot }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.6 }]}
    >
      <Text style={styles.icon}>{icon}</Text>
      {dot ? <View style={styles.dot} /> : null}
    </Pressable>
  );
}

export default function AppHeader({ onNotificationPress, onProfilePress }) {
  return (
    <View style={styles.row}>
      <View style={styles.logoRow}>
        <View style={styles.logoBox}>
          <Text style={styles.logoLetter}>F</Text>
        </View>
        <Text style={styles.logoText}>FitFlow</Text>
      </View>
      <View style={styles.actions}>
        <IconButton icon="🔔" label="Notifications" onPress={onNotificationPress} dot />
        <IconButton icon="👤" label="Open profile" onPress={onProfilePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  logoLetter: { color: colors.white, fontSize: 20, fontWeight: '900' },
  logoText: { ...typography.h2, color: colors.primaryDark },
  actions: { flexDirection: 'row' },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  icon: { fontSize: 20 },
  dot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
});
