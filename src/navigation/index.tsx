import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import { Login } from './screens/Login';
import { CardDetail } from './screens/CardDetail';
import { AddCard } from './screens/AddCard';
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import { StoreLookupList } from './screens/StoreLookupList';
import { COLORS } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const HomeHeaderButton = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, backgroundColor: COLORS.white }}>
      <TouchableOpacity
        style={{ padding: 16, paddingTop: 0, alignItems: 'flex-end' }}
        onPress={() => navigation.navigate('StoreLookup',)}>
        <AntDesignIcon
          name="pluscircle"
          size={32}
          color={COLORS.primary}
        />
      </TouchableOpacity></View>
  )
}
const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        header: () => {
          const navigation = useNavigation();
          return (<HomeHeaderButton />)
        }, // Hide the header for the Home tab
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
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
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    CardDetails: {
      screen: CardDetail, options: ({ route }) => ({
        title: "Card",
      })

    },
    StoreLookup: {
      screen: StoreLookupList,
      options: ({ navigation }) => ({
        title: 'Stores',
      
      }),
    },
    AddCard: {
      screen: AddCard,
      options: ({ navigation }) => ({
        title: 'Add Card', headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        )
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
