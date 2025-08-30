import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "../model/card";
const CARDS_KEY = "cards";

export namespace CardsService {
  export async function getCards(): Promise<Card[]> {
    const cards = await AsyncStorage.getItem(CARDS_KEY);
    console.log("Retrieved cards:", cards);
    if (!cards) {
        console.log("Retrieved [] cards:");
      return [];
    }
    return JSON.parse(cards) as Card[];
  }

  export async function addCard(card: Card): Promise<void> {
    const cards = await getCards();
    cards.push(card);
    await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(cards));
  }
  export async function updateCard(card: Card): Promise<void> {
    const cards = await getCards();
    const index = cards.findIndex((c) => c.id === card.id);
    if (index !== -1) {
      cards[index] = card;
      await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(cards));
    }
  }
  export async function deleteCard(cardId: string): Promise<void> {
    const cards = await getCards();
    const updatedCards = cards.filter((c) => c.id !== cardId);
    await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(updatedCards));
  }
  export async function getCardById(cardId: string): Promise<Card | null> {
    const cards = await getCards();
    const card = cards.find((c) => c.id === cardId);
    return card || null;
  }
}
