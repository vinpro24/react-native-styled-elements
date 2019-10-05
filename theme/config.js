import { Platform } from 'react-native';

const config = {
    fontFamily: Platform.select({ ios: 'Verdana', android: 'Roboto' }),
    fontWeight: {
        Thin: "100",
        UltraLight: "200",
        Light: "300",
        Regular: "400",
        Medium: "500",
        Semibold: "600",
        Bold: "700",
        Heavy: "800",
        Black: "900"
    },
    spacing: 8,
    shadow: {
        backgroundColor: '#fff',
        borderColor: '#F0F0F0',
        shadowColor: '#DEE4F1',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 3,
    }
}

export default config;
