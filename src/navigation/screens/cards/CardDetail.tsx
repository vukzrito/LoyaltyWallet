import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import { Barcode } from '../../../components/barcode';
import { Card } from '../../../model/card';
import { IconButton } from '../../../components/icon-button';
import { CardsService } from '../../../service/cards.service';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from '../../../constants';

export type CardDetailProps = StaticScreenProps<{
    card: Card
}>;

export const CardDetail = ({ route }: CardDetailProps) => {
    const { card } = route.params;
    const navigation = useNavigation();

    const handleDelete = async () => {
        await CardsService.deleteCard(card.id);
        navigation.goBack();
    };

    useEffect(() => {
        navigation.setOptions({
            title: card.title,
            headerRight: () => (
                <IconButton onPress={handleDelete}>
                    <AntDesignIcon
                        name="delete"
                        size={22}
                        color={COLORS.danger}
                    />
                </IconButton>
            ),
        });
    }, [card, navigation]);

    const getBarcodeFormat = (cardNumber: string) => {
        const length = cardNumber.replace(/\s/g, '').length;
        return length % 2 === 0 ? 'CODE128C' : 'CODE128B';
    };

    return (
        <View style={styles.screen}>
            <View style={[styles.card, { backgroundColor: card.color }]}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                {!!card.image && (
                    <Image
                        source={{ uri: card.image }}
                        style={styles.cardImage}
                    />
                )}
            </View>

            <View style={styles.barcodeSection}>
                <Text style={styles.barcodeLabel}>Scan at checkout</Text>
                <View style={styles.barcodeContainer}>
                    <Barcode
                        value={card.cardNumber.replace(/\s/g, '')}
                        options={{ format: getBarcodeFormat(card.cardNumber), background: 'white' }}
                    />
                </View>
                <Text style={styles.cardNumber}>{card.cardNumber}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.lg,
    },
    card: {
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 160,
        ...SHADOWS.md,
    },
    cardTitle: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.white,
        textAlign: 'center',
    },
    cardImage: {
        width: '100%',
        height: 50,
        resizeMode: 'contain',
        marginTop: SPACING.md,
    },
    barcodeSection: {
        marginTop: SPACING.lg,
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.lg,
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    barcodeLabel: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.textSecondary,
        marginBottom: SPACING.md,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    barcodeContainer: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        width: '100%',
        alignItems: 'center',
    },
    cardNumber: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textMuted,
        marginTop: SPACING.md,
        letterSpacing: 1,
    },
});
