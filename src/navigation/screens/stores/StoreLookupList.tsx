import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Store } from "../../../model/store";
import { useNavigation } from "@react-navigation/native";
import { ListItemCard } from "../../../components/list-item-card";
import { useCallback } from "react";
import { stores } from "../../../constants/stores";


export const StoreLookupList = () => {
   
    const navigation = useNavigation();


    return (
        <FlatList data={stores} numColumns={2} keyExtractor={(item) => item.id}
            ListHeaderComponent={() => <View>
                <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>
                    Select Retailer
                </Text>

            </View>}
            renderItem={({ item, index }) =>
                <ListItemCard style={styles.listItem} imageStyle={styles.cardImage}
                    isLastOddItem={index === stores.length - 1 && stores.length % 2 == 1}
                    onPress={() => navigation.navigate('AddCard', { store: item })}
                    card={{ image: item.logoUrl, color: item.backgroundColor, title: item.name, id: item.id, cardNumber: '' }} />
            } />

    );
}

const styles = StyleSheet.create({
    listItem: { minHeight: 110, borderRadius: 10, marginVertical: 8, alignItems: 'center', justifyContent: 'center' },
    cardImage: { width: 100, height: 40, resizeMode: 'contain' }
})