import React, { useState } from 'react';
import { View, Text, Switch, Pressable, Alert, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { useApp } from '../state/AppContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const LANGUAGES = ['English', 'සිංහල', 'தமிழ்'];

function Row({ label, value, onPress, right, last }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [styles.row, !last && styles.divider, pressed && { opacity: 0.6 }]}
    >
      <Text style={styles.rowLabel}>{label}</Text>
      {right || (
        <Text style={styles.rowValue}>
          {value ? `${value}  ` : ''}
          {onPress ? '›' : ''}
        </Text>
      )}
    </Pressable>
  );
}

export default function ProfileScreen({ navigation }) {
  const { user, streak, totalWorkouts, personalized, setPersonalized } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState(LANGUAGES[0]);

  function nextLanguage() {
    setLanguage(LANGUAGES[(LANGUAGES.indexOf(language) + 1) % LANGUAGES.length]);
  }

  return (
    <Screen edges={['bottom']}>
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.goal}>🎯 {user.goal}</Text>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>🔥 {streak}</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>🏋️ {totalWorkouts}</Text>
            <Text style={styles.statLabel}>Total workouts</Text>
          </View>
        </View>
      </Card>

      <SectionHeader title="AI Preferences" />
      <Card>
        <View style={styles.switchRow}>
          <View style={styles.flex}>
            <Text style={styles.rowLabel}>Allow personalized recommendations</Text>
            <Text style={styles.hint}>Turn off to see a general routine on the Home screen. You are in control.</Text>
          </View>
          <Switch
            value={personalized}
            onValueChange={setPersonalized}
            trackColor={{ false: '#C5D0CC', true: colors.primary }}
            thumbColor={colors.white}
            accessibilityLabel="Allow personalized recommendations"
          />
        </View>
      </Card>

      <SectionHeader title="Settings" />
      <Card>
        <Row
          label="Notification preferences"
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#C5D0CC', true: colors.primary }}
              thumbColor={colors.white}
              accessibilityLabel="Notification preferences"
            />
          }
        />
        <Row
          label="Workout preferences"
          onPress={() => Alert.alert('Workout preferences', 'Change your goal, level and equipment in the Planner tab.')}
        />
        <Row label="Privacy" onPress={() => navigation.navigate('PrivacyPolicy')} />
        <Row label="Language" value={language} onPress={nextLanguage} />
        <Row
          label="Help & Support"
          last
          onPress={() => Alert.alert('Help & Support', 'This is a course prototype. No real support service is connected.')}
        />
      </Card>

      <SectionHeader title="About this prototype" />
      <Card>
        <Row label="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
        <Row label="Release Notes" onPress={() => navigation.navigate('ReleaseNotes')} />
        <Row label="Testing checklist" last onPress={() => navigation.navigate('Testing')} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: { alignItems: 'center' },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { color: colors.white, fontSize: 36, fontWeight: '800' },
  name: { ...typography.title, color: colors.text },
  goal: { ...typography.body, color: colors.textMuted, marginTop: 2 },
  statRow: { flexDirection: 'row', marginTop: spacing.md, width: '100%' },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { ...typography.h2, color: colors.text },
  statLabel: { ...typography.small, color: colors.textMuted },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 52 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { ...typography.body, color: colors.text, fontWeight: '600', flexShrink: 1 },
  rowValue: { ...typography.body, color: colors.textMuted },
  switchRow: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1, paddingRight: spacing.sm },
  hint: { ...typography.small, color: colors.textMuted, marginTop: 2 },
});
