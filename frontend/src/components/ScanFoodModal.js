import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import OptionGroup from './OptionGroup';
import { MEAL_TYPES, mockScanResult } from '../data/mockNutrition';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

// Simulated scanner: shows a fake viewfinder, then a sample result. No camera / AI is used.
export default function ScanFoodModal({ visible, onClose, onAdd, onEdit }) {
  const [phase, setPhase] = useState('scanning');
  const [type, setType] = useState('Lunch');

  useEffect(() => {
    if (!visible) return undefined;
    setPhase('scanning');
    const timer = setTimeout(() => setPhase('result'), 1800);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>📷 Scan Food</Text>

          <View style={styles.viewfinder}>
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />
            <Text style={styles.plate}>🍛</Text>
            <Text style={styles.viewText}>{phase === 'scanning' ? 'Scanning...' : 'Scan complete'}</Text>
          </View>

          {phase === 'result' ? (
            <View>
              <Text style={styles.recognized}>Food recognized: {mockScanResult.name}</Text>
              <Text style={styles.kcal}>Estimated calories: {mockScanResult.calories} kcal</Text>
              <Text style={styles.macros}>
                Protein {mockScanResult.protein}g · Carbs {mockScanResult.carbs}g · Fat {mockScanResult.fat}g
              </Text>
              <OptionGroup options={MEAL_TYPES} selected={type} onSelect={setType} />
              <View style={styles.row}>
                <PrimaryButton
                  title="Add to Diary"
                  onPress={() => onAdd({ ...mockScanResult, type })}
                  style={styles.flex}
                />
                <SecondaryButton
                  title="Edit"
                  onPress={() => onEdit({ ...mockScanResult, type })}
                  style={[styles.flex, { marginLeft: spacing.sm }]}
                />
              </View>
            </View>
          ) : null}

          <Text style={styles.disclaimer}>
            Simulated result for the prototype. Nutrition estimates are for general tracking only and are not medical advice.
          </Text>
          <SecondaryButton title="Close" onPress={onClose} style={{ marginTop: spacing.sm }} />
        </View>
      </View>
    </Modal>
  );
}

const CORNER = 26;
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
  },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.md },
  viewfinder: {
    height: 150,
    borderRadius: radius.md,
    backgroundColor: '#1E2B27',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  plate: { fontSize: 48 },
  viewText: { ...typography.body, color: colors.white, marginTop: 4 },
  corner: { position: 'absolute', width: CORNER, height: CORNER, borderColor: colors.accent },
  tl: { top: 12, left: 12, borderTopWidth: 4, borderLeftWidth: 4 },
  tr: { top: 12, right: 12, borderTopWidth: 4, borderRightWidth: 4 },
  bl: { bottom: 12, left: 12, borderBottomWidth: 4, borderLeftWidth: 4 },
  br: { bottom: 12, right: 12, borderBottomWidth: 4, borderRightWidth: 4 },
  recognized: { ...typography.h3, color: colors.text },
  kcal: { ...typography.h3, color: colors.primary, marginTop: 2 },
  macros: { ...typography.small, color: colors.textMuted, marginVertical: spacing.sm },
  row: { flexDirection: 'row' },
  flex: { flex: 1 },
  disclaimer: { ...typography.small, color: colors.textMuted, marginTop: spacing.md },
});
