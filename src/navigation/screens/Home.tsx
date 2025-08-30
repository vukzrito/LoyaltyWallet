import { Text } from '@react-navigation/elements';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { } from 'react-native-gesture-handler';
import { Card } from '../../model/card';
import { ListItemCard } from '../../components/list-item-card';
import { useNavigation } from '@react-navigation/native';
import { CardsService } from '../../service/cards.service';

export function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    CardsService.getCards().then(c => setCards(c))
  }, [])
  return (
    <View style={styles.container}>

      <FlatList numColumns={2} data={cards} renderItem={({ item }) => <ListItemCard card={item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  list: {}
});
