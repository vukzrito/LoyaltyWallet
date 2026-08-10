import { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Card } from '../../../model/card';
import { ListItemCard } from '../../../components/list-item-card';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CardsService } from '../../../service/cards.service';
import { AuthService } from '../../../service/auth.service';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '../../../constants';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from '../../../components/button';

function EmptyState({ onAddCard }: { onAddCard: () => void }) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <AntDesign name="creditcard" size={40} color={COLORS.primary} />
      </View>
      <Text style={styles.emptyTitle}>No cards yet</Text>
      <Text style={styles.emptySubtitle}>
        Add your first loyalty card to get started
      </Text>
      <Button title="Add a card" onPress={onAddCard} style={styles.emptyButton} />
    </View>
  );
}

export function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const user = AuthService.getCurrentUser();
      if (!user) {
        navigation.navigate('Login' as never);
        return;
      }
      CardsService.getCards().then(c => setCards(c));
    }, [navigation])
  );

  const goToAddCard = () => navigation.navigate('StoreLookup' as never);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>My Cards</Text>
          <Text style={styles.cardCount}>
            {cards.length === 0
              ? 'Start building your wallet'
              : `${cards.length} card${cards.length === 1 ? '' : 's'}`}
          </Text>
        </View>
      </View>

      {cards.length === 0 ? (
        <EmptyState onAddCard={goToAddCard} />
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          numColumns={2}
          data={cards}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ListItemCard
              card={item}
              onPress={() => navigation.navigate('CardDetails', { card: item })}
              isLastOddItem={index === cards.length - 1 && cards.length % 2 === 1}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  greeting: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  cardCount: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  emptyButton: {
    paddingHorizontal: SPACING.xl,
  },
});
