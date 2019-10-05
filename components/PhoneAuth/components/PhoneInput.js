import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Theme from '../../../theme';
import CountryPicker from './CountryPicker';

const PhoneInput = ({ country_code, onChange }) => {
    const countries = require('../assets/countries.json');
    const [state, setState] = React.useState({
        country: countries.find(i => i.code === country_code),
        phone: '',
    });
    const textInputRef = React.useRef()

    React.useEffect(() => {
        if (state.phone.length > 8 || state.phone.length === 6) {
            onChange(`${state.country.dial_code}${state.phone}`);
        }
        setTimeout(() => textInputRef.current.focus(), 150)
    }, [, state.phone]);

    const onChangeText = phone => {
        setState({ ...state, phone });
    };

    const onChangeCountry = country => {
        setState({ ...state, country });
    }

    return (
        <>
            <Text style={styles.title}>Enter your phone number</Text>

            <View style={styles.container}>
                <CountryPicker onSelected={onChangeCountry}>
                    <View style={styles.left}>
                        <Text style={styles.country}>{state.country.flag}</Text>
                        <Text style={styles.arrow}>▼</Text>
                        <Text style={styles.country}>{state.country.dial_code}</Text>
                    </View>
                </CountryPicker>

                <TextInput
                    ref={textInputRef}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    onChangeText={onChangeText}
                    keyboardType="phone-pad"
                    placeholder="0123456789"
                    value={state.phone}
                    autoFocus
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        backgroundColor: '#F9FBFF',
        borderBottomWidth: 2,
        borderColor: '#e2eaec',
    },
    title: {
        ...Theme.body,
        marginVertical: 16,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrow: {
        fontSize: 13,
        color: '#ccc',
        marginHorizontal: 4,
        marginTop: 5,
    },
    country: {
        ...Theme.title,
        paddingTop: 0,
    },
    textInput: {
        ...Theme.title,
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 0,
    },

});

export default PhoneInput;
