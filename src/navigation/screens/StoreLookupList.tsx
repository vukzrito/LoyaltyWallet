import { FlatList, View, Text, TouchableOpacity } from "react-native"
import { Store } from "../../model/store";
import { useNavigation } from "@react-navigation/native";


export const StoreLookupList = () => {
    const stores: Store[] = [
        { id: '1', name: 'SASOL', backgroundColor: '#123a5f', textColor: '#ffffff' },
        { id: '2', name: 'Checkers', backgroundColor: '#38a8ae', textColor: '#ffffff' },
        { id: '3', name: 'Woolworths', backgroundColor: '#000', textColor: '#ffffff' },
        { id: '4', name: 'Pick n Pay', backgroundColor: '#003359', textColor: '#ffffff' },
        { id: '5', name: 'Clicks', backgroundColor: '#003268', textColor: '#ffffff' },
        { id: '6', name: 'Dischem', backgroundColor: '#00a049', textColor: '#ffffff' },
        { id: '7', name: 'Game', backgroundColor: '#cf008d', textColor: '#ffffff' },
        { id: '8', name: 'Makro', backgroundColor: '#fff', textColor: '#000' },
        { id: '9', name: 'Builders Warehouse', backgroundColor: '#FFCC00', textColor: '#ffffff' },
        { id: '10', name: 'Mr Price', backgroundColor: 'red', textColor: '#ffffff' },
    ];
    const navigation = useNavigation();
    return (
        <FlatList data={stores} numColumns={2} keyExtractor={(item) => item.id}
            ListHeaderComponent={() => <View>
                <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>
                    Cards Lookup List Screen
                </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 10 }}>
                    This is where you can look up cards.
                </Text>
            </View>}
            renderItem={({ item }) => <TouchableOpacity style={{ flex: 1, margin: 8, }} onPress={() => navigation.navigate('AddCard', { store: item })}>
                <View style={{ minHeight: 110, padding: 16, paddingVertical: 32, borderRadius: 10, backgroundColor: item.backgroundColor, marginVertical: 8, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: item.textColor }}>{item.name}</Text>
                </View>
            </TouchableOpacity>} />

    );
}