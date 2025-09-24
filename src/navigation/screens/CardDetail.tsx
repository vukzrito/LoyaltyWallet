import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import { Barcode } from '../../components/barcode';
import { Card } from '../../model/card';
import { IconButton } from '../../components/icon-button';
import { CardsService } from '../../service/cards.service';
import { COLORS } from '../../constants';

export type CardDetailProps = StaticScreenProps<{
    card: Card
}>;

export const CardDetail = ({ route }: CardDetailProps) => {
    const { card } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        console.log("Card details:", card);
        navigation.setOptions({
            title: card.title,
            headerRight: () => (
                <IconButton onPress={handleDelete}>
                    <AntDesignIcon
                        name="delete"
                        size={24}
                        color={COLORS.primary}
                    />
                </IconButton>
            ),
        });
    }, [card]);
    const handleDelete = async () => {
        await CardsService.deleteCard(card.id);
        navigation.goBack();
    }
    const getBarcodeFormat = (cardNumber: string) => {
        // Simple heuristic to determine barcode format based on card number length
        const length = cardNumber.replace(/\s/g, '').length; // Remove spaces for accurate length
        return length % 2 === 0 ? 'CODE128C' : 'CODE128B'; // Default format
    }
    return (
        <View style={{ backgroundColor: card.color, padding: 16, margin: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>{card.title}</Text>
            {!!card.image && <Image source={{ uri: card.image }} style={{ width: '100%', height: 50, resizeMode: 'contain' }} />}
            <Barcode
                value={card.cardNumber.replace(/\s/g, '')} // Remove spaces for barcode
                options={{ format: getBarcodeFormat(card.cardNumber), background: 'white' }}

            />
        </View>
    );
}