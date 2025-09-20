import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";

export namespace AuthService {
  const CREDENTIAL_KEY = "credential";
  export async function signUp(email: string, password: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  export async function getCredential(): Promise<UserCredential|null> {
    const credential = await AsyncStorage.getItem(CREDENTIAL_KEY);
    if (!credential) {
      return null;
    }
    return JSON.parse(credential) as UserCredential;
  }

  export async function saveCredential(credential: UserCredential): Promise<void> {
   
    await AsyncStorage.setItem(CREDENTIAL_KEY, JSON.stringify(credential));
  }

  export async function signIn(email: string, password: string): Promise<User> {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await saveCredential(cred);
    return cred.user;
  }

  export async function signOut(): Promise<void> {
    await firebaseSignOut(auth);
  }

  export function onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return firebaseOnAuthStateChanged(auth, callback);
  }

  export async function getCurrentUser(): Promise<User | null> {
    const credential = await getCredential();
    return credential?.user ?? null;
  }
} 