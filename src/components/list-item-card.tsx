import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, View } from 'react-native';
import { Card } from '../model/card';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from '../constants';

interface ListItemCardProps {
  card: Card;
  isLastOddItem?: boolean;
}

export const ListItemCard: React.FC<ListItemCardProps> = ({ card, isLastOddItem }) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('CardDetails', { card });
  }, [navigation, card.id]);

  const cardStyle = useMemo((): ViewStyle => ({
    flex: 1,
    backgroundColor: card.color,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    paddingVertical: SPACING.xl,
    margin: SPACING.sm,
    ...SHADOWS.md,
  }), [card.color]);

  return (<>
    <TouchableOpacity onPress={onPress} style={cardStyle}>
      <Text style={styles.cardTitle}>{card.title}</Text>
    </TouchableOpacity>
    {isLastOddItem ? <View style={styles.placeHolder} /> : null}
  </>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    textAlign: 'center',
  },
  placeHolder:{ flex: 1, padding: SPACING.md,
    paddingVertical: SPACING.xl,
    margin: SPACING.sm, }
});