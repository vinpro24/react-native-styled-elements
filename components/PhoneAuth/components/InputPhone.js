import React from 'react'
import { Text, View, TextInput, Image, KeyboardAvoidingView, Dimensions, Animated, Easing, TouchableOpacity } from 'react-native'
import CountryPicker from './CountryPicker'

const { width, height } = Dimensions.get('window')
const itemSize = height * 0.5

export default class InputPhone extends React.PureComponent {
    constructor() {
        super()
        this.animPhone = new Animated.Value(0)
        this.animPhoneShake = new Animated.Value(0)
        this.animSend = new Animated.Value(0)
        this.animValid = new Animated.Value(0)
        this.state = {
            isLoading: false,
            phone: '',
            country: { name: 'American Samoa', dial_code: '+1684', code: 'AS', flag: '🇺🇸' },
        }
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.animPhone, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease) }),
            Animated.timing(this.animPhoneShake, { toValue: 1, duration: 500, easing: Easing.linear }),
        ]).start((e) => {
            if (e.finished) {
                this.refInputWrapper.setNativeProps({ style: { display: 'flex' } })
                this.refInput.focus()
            }
        })
    }

    onSendSuccess = () => {
        this.refPhoneWrapper.setNativeProps({ style: { display: 'none' } })
        this.refEnterCode.setNativeProps({ style: { display: 'flex' } })
        this.refSendBtn.setNativeProps({ style: { display: 'none' } })
        this.refReSendBtn.setNativeProps({ style: { display: 'flex' } })
        this.refInputCode.focus()
    }

    onSendFailed = () => {
        this.refPhoneWrapper.setNativeProps({ style: { display: 'flex' } })
        this.refEnterCode.setNativeProps({ style: { display: 'none' } })
        this.refSendBtn.setNativeProps({ style: { display: 'flex' } })
        this.refReSendBtn.setNativeProps({ style: { display: 'none' } })
        this.animPhoneShake.setValue(0)
        this.animSend.setValue(0)
    }

    onChangeText = text => {
        this.state.phone = text
        if (validatePhone(this.state.phone)) {
            this.refSendBtn.setNativeProps({ style: { display: 'flex' } })
        } else {
            this.refSendBtn.setNativeProps({ style: { display: 'none' } })
        }
    }

    onEnterCode = (code) => {
        if (code.length === 6) {
            this.refInputCode.blur()
            this.props.onVerify(code)
        }
    }

    onSend = () => {
        if (this.state.isLoading) return
        this.state.isLoading = true
        Animated.sequence([
            Animated.timing(this.animSend, { toValue: 1, duration: 500, easing: Easing.linear }),
        ]).start((e) => {
            if (e.finished) {
                this.state.isLoading = false
                this.refInput.blur()
                this.props.onSend(`${this.state.country.dial_code}${this.state.phone}`)
            }
        })
    }

    onResend = () => {
        this.refPhoneWrapper.setNativeProps({ style: { display: 'flex' } })
        this.refEnterCode.setNativeProps({ style: { display: 'none' } })
        this.refSendBtn.setNativeProps({ style: { display: 'flex' } })
        this.refReSendBtn.setNativeProps({ style: { display: 'none' } })
        this.animPhoneShake.setValue(0)
        this.animSend.setValue(0)
    }

    onSelectCountry = (country) => this.setState({ country })

    render() {
        const { country } = this.state
        const phonePosition = this.animPhone.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [-width, 0, 0]
        })
        const phoneShake = this.animPhoneShake.interpolate({
            inputRange: [0, 0.1, 0.6, 1],
            outputRange: ['0rad', '-0.2rad', '0.2rad', '0rad']
        })

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                <View style={{ height: itemSize, alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.View
                        ref={c => { this.refPhoneWrapper = c }}
                        style={{
                            width: itemSize * 0.3,
                            height: itemSize * 0.3,
                            margin: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: [{ translateX: phonePosition }, { rotate: phoneShake }]
                        }}
                    >
                        <Image source={require('../assets/phone.png')} style={{ width: itemSize * 0.3, height: itemSize * 0.3 }} />
                        <Animated.Image
                            source={require('../assets/ic-search.png')}
                            style={{
                                width: itemSize * 0.1, height: itemSize * 0.1, tintColor: '#fff', position: 'absolute',
                                opacity: this.animSend.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0]
                                }),
                                transform: [
                                    {
                                        translateX: this.animSend.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, -(itemSize * 0.06)]
                                        })
                                    },
                                    {
                                        scale: this.animSend.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0]
                                        })
                                    }]
                            }}
                        />
                        <Animated.Image
                            source={require('../assets/ic-sms.png')}
                            style={{
                                width: itemSize * 0.1, height: itemSize * 0.1, tintColor: '#fff', position: 'absolute',
                                opacity: this.animSend.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                }),
                                transform: [
                                    {
                                        translateX: this.animSend.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [(itemSize * 0.06), 0]
                                        })
                                    },
                                    {
                                        scale: this.animSend.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 1]
                                        })
                                    }]
                            }}
                        />
                        <Animated.Image
                            source={require('../assets/ic-message.png')}
                            style={{
                                width: itemSize * 0.1,
                                height: itemSize * 0.1,
                                tintColor: 'green',
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                opacity: this.animSend.interpolate({
                                    inputRange: [0, 0.7, 1],
                                    outputRange: [0, 0, 1]
                                }),
                            }}
                        />
                    </Animated.View>
                    <View ref={c => { this.refInputWrapper = c }} style={{ display: 'none', width: 300, flexDirection: 'row', padding: 8, alignItems: 'center', backgroundColor: '#fff', marginVertical: 16, borderWidth: 0.33 }}>
                        <CountryPicker onSelected={this.onSelectCountry}>
                            <Text style={{ color: '#666', marginRight: 8 }}>{`${country.flag} ${country.dial_code}`}</Text>
                        </CountryPicker>
                        <TextInput
                            ref={c => { this.refInput = c }}
                            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 8, fontSize: 18, letterSpacing: 2, borderLeftWidth: 0.33 }}
                            underlineColorAndroid='transparent'
                            placeholder='12345678'
                            onChangeText={this.onChangeText}
                            keyboardType='phone-pad'
                        />
                        <TouchableOpacity ref={c => { this.refSendBtn = c }} onPress={this.onSend} style={{ display: 'none' }}>
                            <Text style={{ color: 'red', marginRight: 8 }}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity ref={c => { this.refReSendBtn = c }} onPress={this.onResend} style={{ display: 'none' }}>
                            <Text style={{ color: 'red', marginRight: 8 }}>Resend</Text>
                        </TouchableOpacity>
                    </View>

                    <View ref={c => { this.refEnterCode = c }} style={{ flex: 1, alignItems: 'center', display: 'none' }}>
                        <Text style={{ marginVertical: 16, fontSize: 14, fontWeight: '400', color: '#484848' }}>Enter the code that was sent</Text>
                        <TextInput
                            ref={c => { this.refInputCode = c }}
                            style={{ width: 150, padding: 8, fontSize: 30, letterSpacing: 2, borderWidth: 1, borderColor: '#666', backgroundColor: '#fff', borderRadius: 2, textAlign: 'center' }}
                            underlineColorAndroid='transparent'
                            placeholder='000000'
                            onChangeText={this.onEnterCode}
                            keyboardType='phone-pad'
                            maxLength={6}
                        />
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }
}

function validatePhone(phone) {
    // return (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/).test(phone)
    return (/^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/).test(phone)
}
