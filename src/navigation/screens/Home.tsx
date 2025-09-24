import { Text } from '@react-navigation/elements';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { } from 'react-native-gesture-handler';
import { Card } from '../../model/card';
import { ListItemCard } from '../../components/list-item-card';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CardsService } from '../../service/cards.service';
import { AuthService } from '../../service/auth.service';
import { COLORS } from '../../constants';
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from 'react-native-safe-area-context';

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
      CardsService.getCards().then(c => setCards(c))
    }, [navigation])
  )
  return (
    <View style={styles.container}>

      <FlatList style={{ flex: 1 }} numColumns={2} data={cards}
        renderItem={({ item, index }) => <ListItemCard card={item}
          onPress={() => navigation.navigate('CardDetails', { card: item })}
          isLastOddItem={index === cards.length - 1 && cards.length % 2 == 1} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {}
});
