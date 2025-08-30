import { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GlobalStyles from "../../styles";
import { Button } from "../../components/button";
import { Card } from "../../model/card";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { Store } from "../../model/store";
import { CardsService } from "../../service/cards.service";

type Props = StaticScreenProps<{
    store: Store;
}>;
export const AddCard = ({ route }: Props) => {

    const { store } = route.params;
    const [cardNumber, setCardNumber] = useState('');
    const navigation = useNavigation();
    const onSaveCard = useCallback(async () => {
        // Logic to save the card number
        console.log('Card Number Saved:', cardNumber);
        const card: Card = {
            cardNumber: cardNumber,
            color: store.backgroundColor,
            title: store.name,
            id: Math.random().toString(36).substring(2, 15), // Generate a random ID
            image: store.logoUrl, // Placeholder for image URL
        };
        await CardsService.addCard(card);
        navigation.navigate('HomeTabs', { screen: 'Home', pop:true });
    }, [cardNumber]);

    return (
        <View style={GlobalStyles.container

        }>
            <View style={{ margin: 32, backgroundColor: store.backgroundColor, padding: 16, minHeight: 160, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: store.textColor, textAlign: 'center' }}>{store.name}</Text>
            </View>

            <TextInput style={[GlobalStyles.input, styles.input]} onChangeText={text => setCardNumber(text)} />
            <Button
                title="Add Card"
                onPress={onSaveCard}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});