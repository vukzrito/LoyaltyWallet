import { StaticScreenProps } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Barcode } from '../../components/barcode';
import { Card } from '../../model/card';

type Props = StaticScreenProps<{
    card: Card
}>;

export const CardDetail = ({ route }: Props) => {
    const { card } = route.params;
    // Here you would typically fetch the card details using the cardId
    // For demonstration, we'll use a static object

    return (
        <View style={{ backgroundColor: card.color, padding: 16, margin: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>{card.title}</Text>
            <Text style={{ fontSize: 18, color: '#fff' }}>{card.cardNumber}</Text>
            {/* <Image source={{ uri: card.image }} style={{ width: '100%', height: 200 }} /> */}
            <Barcode
                value={card.cardNumber.replace(/\s/g, '')} // Remove spaces for barcode
                options={{ format: 'CODE128C', background: 'white' }}

            />
        </View>
    );
}