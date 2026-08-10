import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import GlobalStyles from "../../../styles";
import { Button } from "../../../components/button";
import { Card } from "../../../model/card";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { Store } from "../../../model/store";
import { CardsService } from "../../../service/cards.service";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from "../../../constants";

type Props = StaticScreenProps<{
    store: Store;
}>;

export const AddCard = ({ route }: Props) => {
    const { store } = route.params;
    const [cardNumber, setCardNumber] = useState('');
    const [saving, setSaving] = useState(false);
    const navigation = useNavigation();

    const onSaveCard = useCallback(async () => {
        setSaving(true);
        try {
            const uniqueId = new Date().getTime().toString(36).substring(2, 15);
            const card: Card = {
                cardNumber: cardNumber,
                color: store.backgroundColor,
                title: store.name,
                id: uniqueId,
                image: store.logoUrl,
            };
            await CardsService.addCard(card);
            navigation.navigate('HomeTabs', { screen: 'Home', pop: true });
        } finally {
            setSaving(false);
        }
    }, [cardNumber, store, navigation]);

    useEffect(() => {
        navigation.setOptions({ title: store.name });
    }, [navigation, store.name]);

    return (
        <View style={styles.container}>
            <View style={[styles.preview, { backgroundColor: store.backgroundColor }]}>
                <Text style={[styles.previewTitle, { color: store.textColor }]}>
                    {store.name}
                </Text>
            </View>

            <Text style={styles.label}>Card number</Text>
            <TextInput
                style={GlobalStyles.inputFilled}
                placeholder="Enter your loyalty card number"
                placeholderTextColor={COLORS.textMuted}
                onChangeText={setCardNumber}
                value={cardNumber}
                keyboardType="number-pad"
            />

            <Button
                title="Add Card"
                onPress={onSaveCard}
                loading={saving}
                disabled={!cardNumber.trim() || saving}
                size="large"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
    },
    preview: {
        padding: SPACING.xl,
        minHeight: 160,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
        ...SHADOWS.md,
    },
    previewTitle: {
        fontSize: FONT_SIZE.xl,
        fontWeight: FONT_WEIGHT.bold,
        textAlign: 'center',
    },
    label: {
        fontSize: FONT_SIZE.sm,
        fontWeight: FONT_WEIGHT.medium,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
});
