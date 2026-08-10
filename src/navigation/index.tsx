import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  Home,
  Profile,
  Settings,
  Updates,
  NotFound,
  Login,
  CardDetail,
  AddCard,
  StoreLookupList
} from './screens';
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeHeaderButton = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[headerStyles.wrapper, { paddingTop: insets.top }]}>
      <TouchableOpacity
        style={headerStyles.button}
        onPress={() => navigation.navigate('StoreLookup')}
        activeOpacity={0.7}
      >
        <AntDesignIcon name="pluscircle" size={28} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.background,
  },
  button: {
    padding: 16,
    paddingTop: 0,
    alignItems: 'flex-end',
  },
});

const tabBarOptions = {
  tabBarActiveTintColor: COLORS.primary,
  tabBarInactiveTintColor: COLORS.textMuted,
  tabBarStyle: {
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 6,
    height: 56,
  },
  tabBarLabelStyle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  headerStyle: {
    backgroundColor: COLORS.background,
  },
  headerTitleStyle: {
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
  },
  headerShadowVisible: false,
};

const HomeTabs = createBottomTabNavigator({
  screenOptions: tabBarOptions,
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Cards',
        header: () => <HomeHeaderButton />,
        tabBarIcon: ({ color, size }) => (
          <AntDesignIcon name="creditcard" color={color} size={size} />
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        title: 'Updates',
        tabBarIcon: ({ color, size }) => (
          <AntDesignIcon name="bell" color={color} size={size} />
        ),
      },
    },
    Settings: {
      screen: Settings,
      options: {
        title: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <AntDesignIcon name="setting" color={color} size={size} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    ...tabBarOptions,
    contentStyle: { backgroundColor: COLORS.background },
  },
  screens: {
    Login: {
      screen: Login,
      options: {
        title: 'Login',
        headerShown: false,
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    CardDetails: {
      screen: CardDetail,
      options: {
        title: 'Card',
      },
    },
    StoreLookup: {
      screen: StoreLookupList,
      options: {
        title: 'Add Card',
      },
    },
    AddCard: {
      screen: AddCard,
      options: ({ navigation }) => ({
        title: 'Add Card',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text style={{ color: COLORS.primary, fontWeight: FONT_WEIGHT.medium }}>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
