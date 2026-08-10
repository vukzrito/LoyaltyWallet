import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from '../../../components/button';
import GlobalStyles from '../../../styles';
import { AuthService } from '../../../service/auth.service';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from '../../../constants';

export function Login() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
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
      navigation.navigate('HomeTabs');
    } catch (e: any) {
      Alert.alert('Sign up failed', e?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <AntDesign name="creditcard" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.brand}>LoyaltyWallet</Text>
        <Text style={styles.tagline}>Your loyalty cards, all in one place</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to access your cards</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="you@example.com"
          placeholderTextColor={COLORS.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          style={GlobalStyles.inputFilled}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
          autoComplete="password"
          style={GlobalStyles.inputFilled}
          value={password}
          onChangeText={setPassword}
        />

        <Button
          title="Sign In"
          onPress={handleSignIn}
          loading={loading}
          disabled={loading}
          size="large"
          style={styles.signInButton}
        />

        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text style={styles.signUpLink} onPress={handleSignUp}>
            Sign up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  brand: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  signInButton: {
    marginTop: SPACING.sm,
  },
  signUpText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  signUpLink: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
