import React, { useMemo } from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, View, Image, ImageStyle } from 'react-native';
import { Card } from '../model/card';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from '../constants';

interface ListItemCardProps {
  card: Card;
  isLastOddItem?: boolean;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  onPress?: () => void;
}

export const ListItemCard: React.FC<ListItemCardProps> = ({ card, isLastOddItem, style, imageStyle, onPress }) => {
  const onCardPress = () => {
    if (onPress){
      onPress();
    }else{
      console.warn("No onPress handler provided for ListItemCard");
    }
  }

  const cardStyle = useMemo((): ViewStyle => (StyleSheet.flatten([{
    flex: 1,
    backgroundColor: card.color,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    paddingVertical: SPACING.xl,
    margin: SPACING.sm,
    ...SHADOWS.md,
  }, style])
  ), [card.color]);
  const imageStyles = useMemo((): ImageStyle => (StyleSheet.flatten([{
    width: '100%', height: 50, resizeMode: 'contain'
  }, imageStyle])
  ), [imageStyle]);
  return (<>
    <TouchableOpacity onPress={onCardPress} style={cardStyle}>


      {card.image ? <Image source={{ uri: card.image }} style={imageStyles} /> :
        <Text style={styles.cardTitle}>{card.title}</Text>}

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
    paddingVertical: SPACING.md,
  },
  placeHolder: {
    flex: 1, padding: SPACING.md,
    paddingVertical: SPACING.xl,
    margin: SPACING.sm,
  }
});