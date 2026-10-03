import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import SocialPost from '../components/SocialPost';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import { mockPosts, mockChallenges } from '../data/mockCommunity';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function CommunityScreen() {
  const [posts, setPosts] = useState(mockPosts);
  const [challenges, setChallenges] = useState(mockChallenges);

  function toggleLike(id) {
    setPosts((list) =>
      list.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }

  function addCheer(id) {
    setPosts((list) =>
      list.map((p) => (p.id === id ? { ...p, comments: [...p.comments, 'Alex: 👏 Great effort!'] } : p))
    );
  }

  function joinChallenge(id) {
    setChallenges((list) =>
      list.map((c) => (c.id === id && !c.joined ? { ...c, joined: true, members: c.members + 1 } : c))
    );
  }

  return (
    <Screen>
      <SectionHeader large title="Community" />
      <Text style={styles.sub}>Your private FitFlow circle. Stay motivated together.</Text>

      <SectionHeader title="Community Challenge" />
      {challenges.map((c) => (
        <Card key={c.id} style={styles.challenge}>
          <Text style={styles.challengeBadge}>🏆 Challenge</Text>
          <Text style={styles.challengeTitle}>{c.title}</Text>
          <Text style={styles.challengeText}>{c.description}</Text>
          <Text style={styles.members}>👥 {c.members} members joined</Text>
          {c.joined ? (
            <View>
              <Text style={styles.joined}>✅ You joined · Day 1 of 7</Text>
              <ProgressBar progress={1 / 7} color={colors.accent} />
            </View>
          ) : (
            <PrimaryButton title="Join Challenge" onPress={() => joinChallenge(c.id)} />
          )}
        </Card>
      ))}

      <SectionHeader title="Activity Feed" />
      {posts.map((p) => (
        <SocialPost key={p.id} post={p} onLike={() => toggleLike(p.id)} onCheer={() => addCheer(p.id)} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  sub: { ...typography.body, color: colors.textMuted, marginBottom: spacing.sm },
  challenge: { backgroundColor: colors.primarySoft, borderColor: '#B9E3D7' },
  challengeBadge: { ...typography.small, color: colors.primaryDark, fontWeight: '800' },
  challengeTitle: { ...typography.h2, color: colors.text, marginTop: 2 },
  challengeText: { ...typography.body, color: colors.textMuted, marginTop: 2 },
  members: { ...typography.body, color: colors.text, fontWeight: '700', marginVertical: spacing.sm + 2 },
  joined: { ...typography.body, color: colors.primaryDark, fontWeight: '700', marginBottom: spacing.sm },
});
