import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Theme from '../../../theme';

const CodeInput = ({ country, phone, onChange, text }) => {
    const [state, setState] = React.useState({
        code: '',
    });

    React.useEffect(() => {
        if (state.code.length >= 4) {
            onChange(state.code);
        }
    }, [state.code]);

    const onChangeText = code => {
        setState({ ...state, code });
    };

    const bottom = [];
    for (let index = 0; index < state.code.length; index++) {
        bottom.push(<View key={state.code[index]} style={{ height: 2, width: 30, marginRight: 10, backgroundColor: '#e2eaec' }} />);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{text.verify_phone} {`${country.dial_code}${phone}`}</Text>
            <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                onChangeText={onChangeText}
                keyboardType="phone-pad"
                placeholder="000000"
                value={state.code}
                autoFocus
            />
            <View style={{ flexDirection: 'row' }}>
                {bottom}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#F9FBFF',
        // borderBottomWidth: 2,
        // borderColor: '#e2eaec',
    },
    title: {
        ...Theme.body,
        marginVertical: 16,
    },
    textInput: {
        ...Theme.title,
        fontSize: 24,
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 0,
        height: 44,
        letterSpacing: 24,

    },

});

export default React.memo(CodeInput);
