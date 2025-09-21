import { TouchableOpacity } from "react-native";
import type { ReactNode } from "react";

interface IconButtonProps {
    children: ReactNode;
    onPress?: () => void;
}

export const IconButton = ({ children , onPress}: IconButtonProps) => {
    return <TouchableOpacity style={{
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }} onPress={onPress}>
        {children}
    </TouchableOpacity>;
}