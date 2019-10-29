import React from 'react';
import { Text, StyleSheet, Modal, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Theme from '../../theme';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Footer from './components/Footer';
import PhoneInput from './components/PhoneInput';
import CodeInput from './components/CodeInput';

const PhoneAuth = props => {
    const [state, setState] = React.useState({
        visible: false,
        country: {},
        phone: '',
        code: '',
        error: null,
        loading: false,
        verifying: false,
    });
    const text = {
        ...defaultText,
        ...props.text,
    }

    const handleChange = name => value => {
        setState(prevState => ({ ...prevState, [name]: value, error: null }));
    };

    const show = () => {
        setState(prevState => ({ ...prevState, visible: true }));
    };
    const dismiss = () => {
        setState(prevState => ({ ...prevState, visible: false }));
    };

    const send = () => {
        setState(prevState => ({ ...prevState, loading: true }));
        props.onSend(`${state.country.dial_code}${state.phone}`).then(res => {
            setState(prevState => ({ ...prevState, loading: false, verifying: true }));
        }).catch(e => {
            setState(prevState => ({ ...prevState, loading: false, error: text[e] || text.error }));
        });
    };

    const onVerify = () => {
        setState(prevState => ({ ...prevState, loading: true }));
        props.onVerify(state.code).then(res => {
            setState(prevState => ({ ...prevState, visible: false, loading: false, verifying: true, error: '' }));
        }).catch(e => {
            setState(prevState => ({ ...prevState, loading: false, error: text.code_incorrect }));
        });
    };

    const onPhoneInput = ({ country, phone }) => {
        setState(prevState => ({ ...prevState, country, phone }));
    }

    const reset = () => {
        setState(prevState => ({ ...prevState, loading: false, verifying: false, error: '' }));
    };


    return (
        <>
            <TouchableOpacity style={props.style} onPress={show}>
                {props.children}
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={state.visible}
                onRequestClose={dismiss}
            >
                <SafeAreaView style={styles.container}>
                    <Header onDismiss={dismiss} />
                    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: null })} style={styles.container}>
                        <ScrollView style={styles.body}>
                            {state.verifying ?
                                <CodeInput text={text} phone={state.phone} country={state.country} verifying={state.verifying} onChange={handleChange('code')} />
                                :
                                <PhoneInput text={text} phone={state.phone} country_code={props.country_code} onPhoneInput={onPhoneInput} />
                            }
                            {state.error ? <Text style={styles.error}>{state.error}</Text> : null}
                        </ScrollView>
                        <Footer
                            onSend={send}
                            onVerify={onVerify}
                            onReset={reset}
                            phone={state.phone}
                            code={state.code}
                            loading={state.loading}
                            verifying={state.verifying}
                            text={text}
                        />
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFF',
    },
    body: {
        flex: 1,
        paddingHorizontal: 16,
    },

    error: {
        ...Theme.footnote,
        color: 'red',
        marginVertical: 8,
    },
});

const defaultText = {
    input_phone: 'Enter your phone number',
    input_phone_desc: 'By continuing you may receive an SMS for verification. Message and data rates may apply.',
    verify_phone: 'Enter the 6-digit code sent to you at',
    verify_phone_desc: 'I didn\'t receive acode.',
    error: 'We were unable to complete your request. Please try again.',
    timeout: 'Verification timeout!',
    code_incorrect: 'The SMS passcode you\'ve entered is incorrect.'
}

PhoneAuth.propTypes = {
    country_code: PropTypes.string,
    button: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
    onSend: PropTypes.func,
    onVerify: PropTypes.func,
};
PhoneAuth.defaultProps = {
    country_code: 'VN',
    onSend: () => new Promise((resolve, reject) => reject()),
    onVerify: () => new Promise((resolve, reject) => resolve()),
    text: {}
};

export default React.memo(PhoneAuth);
