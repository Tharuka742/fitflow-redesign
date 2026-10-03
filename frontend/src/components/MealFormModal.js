import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import OptionGroup from './OptionGroup';
import { MEAL_TYPES } from '../data/mockNutrition';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

const emptyForm = { type: 'Breakfast', name: '', calories: '', protein: '', carbs: '', fat: '' };

function Field({ label, value, onChangeText, numeric, style }) {
  return (
    <View style={[styles.field, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={numeric ? 'numeric' : 'default'}
        placeholder={numeric ? '0' : ''}
        placeholderTextColor="#9AA9A4"
        accessibilityLabel={label}
      />
    </View>
  );
}

// Used for "+ Log Meal" and for "Edit" after a food scan.
export default function MealFormModal({ visible, initial, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setError('');
      setForm(
        initial
          ? {
              type: initial.type || 'Lunch',
              name: initial.name,
              calories: String(initial.calories),
              protein: String(initial.protein),
              carbs: String(initial.carbs),
              fat: String(initial.fat),
            }
          : emptyForm
      );
    }
  }, [visible, initial]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function save() {
    const calories = parseInt(form.calories, 10);
    if (!form.name.trim()) {
      setError('Please enter a meal name.');
      return;
    }
    if (isNaN(calories) || calories <= 0) {
      setError('Please enter calories as a number greater than 0.');
      return;
    }
    onSave({
      type: form.type,
      name: form.name.trim(),
      calories,
      protein: parseInt(form.protein, 10) || 0,
      carbs: parseInt(form.carbs, 10) || 0,
      fat: parseInt(form.fat, 10) || 0,
    });
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Log Meal</Text>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <OptionGroup label="Meal type" options={MEAL_TYPES} selected={form.type} onSelect={(v) => update('type', v)} />
            <Field label="Meal name" value={form.name} onChangeText={(v) => update('name', v)} />
            <View style={styles.row}>
              <Field label="Calories (kcal)" numeric value={form.calories} onChangeText={(v) => update('calories', v)} style={styles.half} />
              <Field label="Protein (g)" numeric value={form.protein} onChangeText={(v) => update('protein', v)} style={styles.half} />
            </View>
            <View style={styles.row}>
              <Field label="Carbs (g)" numeric value={form.carbs} onChangeText={(v) => update('carbs', v)} style={styles.half} />
              <Field label="Fat (g)" numeric value={form.fat} onChangeText={(v) => update('fat', v)} style={styles.half} />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton title="Save to Diary" onPress={save} style={{ marginTop: spacing.sm }} />
            <SecondaryButton title="Cancel" onPress={onClose} style={{ marginTop: spacing.sm }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    maxHeight: '90%',
  },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.md },
  row: { flexDirection: 'row' },
  half: { flex: 1, marginRight: spacing.sm },
  field: { marginBottom: spacing.sm + 4 },
  fieldLabel: { ...typography.small, color: colors.textMuted, marginBottom: 4, fontWeight: '700' },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    minHeight: 46,
    color: colors.text,
    backgroundColor: colors.background,
  },
  error: { ...typography.body, color: colors.danger, marginBottom: spacing.sm },
});
