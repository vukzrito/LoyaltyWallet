import React, { useState } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Text, 
  Image,
  Switch,
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SPACING, COLORS, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../../../constants';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>
        {children}
      </View>
    </View>
  );
};

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
}

const SettingItem = ({ icon, title, subtitle, onPress, rightElement, showArrow = true }: SettingItemProps) => {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightElement}
        {showArrow && onPress && (
          <AntDesign name="right" size={16} color={COLORS.gray[400]} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
      thumbColor={value ? COLORS.white : COLORS.gray[100]}
    />
  );
};

export function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <Section title="Account">
          <SettingItem
            icon={
              <Image 
                source={{ 
                  uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' 
                }} 
                style={styles.profileImage}
              />
            }
            title="Jennifer Miller"
            subtitle="jennifer.miller@email.com"
            showArrow={false}
          />
          <View style={styles.divider} />
          <SettingItem
            icon={<AntDesign name="user" size={20} color={COLORS.gray[600]} />}
            title="Manage Account"
            onPress={() => console.log('Manage Account pressed')}
          />
        </Section>

        {/* Preferences Section */}
        <Section title="Preferences">
          <SettingItem
            icon={<AntDesign name="notification" size={20} color={COLORS.gray[600]} />}
            title="Notifications"
            rightElement={
              <ToggleSwitch 
                value={notificationsEnabled} 
                onValueChange={setNotificationsEnabled} 
              />
            }
            showArrow={false}
          />
          <View style={styles.divider} />
          <SettingItem
            icon={<AntDesign name="swap" size={20} color={COLORS.gray[600]} />}
            title="Dark Mode"
            rightElement={
              <ToggleSwitch 
                value={darkModeEnabled} 
                onValueChange={setDarkModeEnabled} 
              />
            }
            showArrow={false}
          />
          <View style={styles.divider} />
          <SettingItem
            icon={<AntDesign name="Safety" size={20} color={COLORS.gray[600]} />}
            title="Privacy Settings"
            onPress={() => console.log('Privacy Settings pressed')}
          />
        </Section>

        {/* Support Section */}
        <Section title="Support">
          <SettingItem
            icon={<FontAwesome name="question-circle" size={20} color={COLORS.gray[600]} />}
            title="Help & Support"
            onPress={() => console.log('Help & Support pressed')}
          />
          <View style={styles.divider} />
          <SettingItem
            icon={<AntDesign name="infocirlce" size={20} color={COLORS.gray[600]} />}
            title="About"
            onPress={() => console.log('About pressed')}
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[100],
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.gray[600],
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    minHeight: 60,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
  },
  settingSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
    marginLeft: 48, // Align with text content
  },
});
