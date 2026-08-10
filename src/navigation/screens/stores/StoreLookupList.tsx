import { FlatList, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListItemCard } from "../../../components/list-item-card";
import { stores } from "../../../constants/stores";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from "../../../constants";

export const StoreLookupList = () => {
    const navigation = useNavigation();

    return (
        <FlatList
            data={stores}
            numColumns={2}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <View style={styles.header}>
                    <Text style={styles.title}>Select Retailer</Text>
                    <Text style={styles.subtitle}>
                        Choose a store to add your loyalty card
                    </Text>
                </View>
            )}
            renderItem={({ item, index }) => (
                <ListItemCard
                    style={styles.listItem}
                    imageStyle={styles.cardImage}
                    isLastOddItem={index === stores.length - 1 && stores.length % 2 === 1}
                    onPress={() => navigation.navigate('AddCard', { store: item })}
                    card={{
                        image: item.logoUrl,
                        color: item.backgroundColor,
                        title: item.name,
                        id: item.id,
                        cardNumber: '',
                    }}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        paddingHorizontal: SPACING.sm,
        paddingBottom: SPACING.lg,
    },
    header: {
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.lg,
        alignItems: 'center',
    },
    title: {
        fontSize: FONT_SIZE.xxl,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
        textAlign: 'center',
    },
    listItem: {
        minHeight: 110,
        borderRadius: BORDER_RADIUS.lg,
        marginVertical: SPACING.sm,
    },
    cardImage: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
    },
});
