import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ onDismiss }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onDismiss}>
                <Image source={require('../assets/ic_arrow_left.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 16,
    },
    icon: { width: 30, height: 30 },
});

export default React.memo(Header);
