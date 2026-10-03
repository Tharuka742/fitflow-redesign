import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Card from './Card';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function SocialPost({ post, onLike, onCheer }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: post.color }]}>
          <Text style={styles.avatarText}>{post.user.charAt(0)}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.user}>{post.user}</Text>
          <Text style={styles.meta}>
            {post.activity} · {post.time}
          </Text>
        </View>
      </View>

      <Text style={styles.text}>{post.text}</Text>

      <View style={styles.actions}>
        <Pressable
          onPress={onLike}
          accessibilityRole="button"
          accessibilityLabel={post.liked ? 'Unlike post' : 'Like post'}
          style={({ pressed }) => [styles.action, pressed && { opacity: 0.6 }]}
        >
          <Text style={[styles.actionText, post.liked && styles.liked]}>
            {post.liked ? '❤️' : '🤍'} {post.likes}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setShowComments(!showComments)}
          accessibilityRole="button"
          accessibilityLabel="Show comments"
          style={({ pressed }) => [styles.action, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.actionText}>💬 {post.comments.length}</Text>
        </Pressable>
      </View>

      {showComments ? (
        <View style={styles.comments}>
          {post.comments.length === 0 ? <Text style={styles.comment}>No comments yet. Be the first!</Text> : null}
          {post.comments.map((c, i) => (
            <Text key={`${post.id}-c${i}`} style={styles.comment}>
              • {c}
            </Text>
          ))}
          <Text style={styles.cheer} onPress={onCheer} accessibilityRole="button">
            👏 Send a cheer
          </Text>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 18, fontWeight: '800' },
  headerText: { marginLeft: spacing.sm + 4, flex: 1 },
  user: { ...typography.h3, color: colors.text },
  meta: { ...typography.small, color: colors.textMuted },
  text: { ...typography.body, color: colors.text, marginBottom: spacing.sm + 4 },
  actions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm },
  action: { paddingVertical: spacing.xs, paddingRight: spacing.lg, minHeight: 36, justifyContent: 'center' },
  actionText: { ...typography.body, color: colors.textMuted, fontWeight: '700' },
  liked: { color: colors.danger },
  comments: { backgroundColor: colors.background, borderRadius: 10, padding: spacing.sm + 4, marginTop: spacing.sm },
  comment: { ...typography.body, color: colors.text, marginBottom: spacing.xs },
  cheer: { ...typography.body, color: colors.primary, fontWeight: '700', marginTop: spacing.xs },
});
