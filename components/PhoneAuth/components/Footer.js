import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Theme from '../../../theme';

const Footer = ({ onSend, onVerify, onReset, phone, loading, verifying }) => {
    if (verifying) {
        return (
            <View style={styles.footer}>
                <Text style={styles.footerText} onPress={onReset}>I didn't receive acode.</Text>
                <TouchableOpacity onPress={onVerify} style={[styles.btn, { backgroundColor: phone.length < 10 ? '#BBC0C4' : '#222' }]}>
                    {loading ? <ActivityIndicator color="#fff" size="small" /> : <Image source={require('../assets/ic_arrow_right.png')} style={{ width: 30, height: 30, tintColor: '#fff' }} />}
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>By continuing you may receive an SMS for verification. Message and data rates may apply.</Text>
            <TouchableOpacity onPress={onSend} style={[styles.btn, { backgroundColor: phone.length < 10 ? '#BBC0C4' : '#222' }]}>
                {loading ? <ActivityIndicator color="#fff" size="small" /> : <Image source={require('../assets/ic_arrow_right.png')} style={{ width: 30, height: 30, tintColor: '#fff' }} />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    footerText: { ...Theme.text, flex: 1, marginRight: 30, color: '#4067B3' },
    btn: {
        backgroundColor: '#222',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default React.memo(Footer);
