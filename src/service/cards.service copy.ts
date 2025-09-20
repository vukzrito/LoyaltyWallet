import { Card } from "../model/card";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { AuthService } from "./auth.service";

function getUserCardsCollectionPath(userId: string): string {
  return `users/${userId}/cards`;
}

export namespace CardsService {
  export async function getCards(): Promise<Card[]> {
    const user = await AuthService.getCurrentUser();
    if (!user) return [];
    const colRef = collection(db, getUserCardsCollectionPath(user.uid));
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Card, "id">),
    }));
  }

  export async function addCard(card: Card): Promise<void> {
    const user = await AuthService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const docRef = doc(
      collection(db, getUserCardsCollectionPath(user.uid)),
      card.id
    );
    await setDoc(docRef, {
      title: card.title,
      image: card.image,
      cardNumber: card.cardNumber,
      color: card.color,
    });
  }

  export async function updateCard(card: Card): Promise<void> {
    const user = await AuthService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const docRef = doc(db, getUserCardsCollectionPath(user.uid), card.id);
    await updateDoc(docRef, {
      title: card.title,
      image: card.image,
      cardNumber: card.cardNumber,
      color: card.color,
    });
  }

  export async function deleteCard(cardId: string): Promise<void> {
    const user = await AuthService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    const docRef = doc(db, getUserCardsCollectionPath(user.uid), cardId);
    await deleteDoc(docRef);
  }

  export async function getCardById(cardId: string): Promise<Card | null> {
    const user = await AuthService.getCurrentUser();
    if (!user) return null;
    const docRef = doc(db, getUserCardsCollectionPath(user.uid), cardId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const data = snap.data() as Omit<Card, "id">;
    return { id: snap.id, ...data };
  }
}
