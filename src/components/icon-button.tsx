import { TouchableOpacity, StyleSheet } from "react-native";
import type { ReactNode } from "react";

interface IconButtonProps {
    children: ReactNode;
    onPress?: () => void;
}

export const IconButton = ({ children, onPress }: IconButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
