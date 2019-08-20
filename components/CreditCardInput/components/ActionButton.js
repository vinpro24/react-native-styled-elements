import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ActionButton = props => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity onPress={props.onCancel} style={styles.btnWrapper}>
                <Text style={[styles.btnTitle, props.textStyle, { color: '#C5C6C6' }]}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onAddCard} style={[styles.btnWrapper, styles.shadow, { backgroundColor: '#3592FC', shadowColor: '#3592FC' }]}>
                <Text style={[styles.btnTitle, props.textStyle]}>ADD CARD</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#A2C5F1',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    btnWrapper: {
        flex: 1,
        borderRadius: 2,
        padding: 10,
        alignItems: 'center',
    },
    btnTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
    }
});

export default ActionButton;
