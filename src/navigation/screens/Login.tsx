import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/button';
import GlobalStyles from '../../styles';
import { AuthService } from '../../service/auth.service';
import { COLORS } from '../../constants';

export function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AuthService.getCurrentUser().then(user => {
      if (user) {
        navigation.navigate('HomeTabs' as never);
      }
    });

  }, [navigation]);

  async function handleSignIn() {
    try {
      setLoading(true);
      await AuthService.signIn(email.trim(), password);
      navigation.navigate('HomeTabs' as never);
    } catch (e: any) {
      Alert.alert('Sign in failed', e?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp() {
    try {
      setLoading(true);
      await AuthService.signUp(email.trim(), password);
      navigation.navigate('HomeTabs' as never);
    } catch (e: any) {
      Alert.alert('Sign up failed', e?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome to LoyaltyWallet</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={[GlobalStyles.input, styles.input]}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={[GlobalStyles.input, styles.input]}
          value={password}
          onChangeText={setPassword}
        />
        <Button title={loading ? 'Please wait…' : 'Sign In'}
          onPress={handleSignIn} disabled={loading} />
        <View style={{ height: 18 }} />
        <Text style={styles.signUpText}>Don't have an account? <Text style={{ color: COLORS.primary }} disabled={loading} onPress={handleSignUp}>Sign up</Text></Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: COLORS.primary },
  inner: { padding: 16, backgroundColor: COLORS.white, paddingVertical: 48, borderRadius: 16, marginHorizontal: 8 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  input: { marginBottom: 12, backgroundColor: COLORS.border },
  signUpText: { fontSize: 16, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
}); 