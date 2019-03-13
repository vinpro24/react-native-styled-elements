import React from 'react'
import { Text, Image, View, Modal, SafeAreaView, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import Keyboard from './Keyboard'
import PhoneAnimated from './PhoneAnimated'
import EnterCode from './EnterCode'
import VerifyCode from './VerifyCode'
import CountryPicker from './CountryPicker'

export default class PhoneAuthModal extends React.PureComponent {
    state = {
        country: { name: 'American Samoa', dial_code: '+1684', code: 'AS', flag: '🇺🇸' },
        phone: '',
        status: 'inputphone',
        code: '',
        showCountryPicker: false,
        error: false
    }
    static getDerivedStateFromProps(nextProps) {
        if (!nextProps.visible) {
            return {
                phone: '',
                status: 'inputphone',
                code: '',
                isSending: false,
                error: false
            }
        }
        return null
    }

    onKeyboard = text => {
        if (this.state.status === 'inputphone') {
            this.setState({ phone: `${this.state.phone}${text}` })
        } else if (this.state.status === 'inputcode') {
            this.setState({ code: `${this.state.code}${text}` }, () => {
                if (this.state.code.length >= 6) {
                    setTimeout(() => this.setState({ status: 'verifycode' }, () => this.props.onSendCode(this.state.code)), 300)
                }
            })
        }
    }

    onKeyboardDelete = () => {
        if (this.state.status === 'inputphone') {
            if (!this.state.phone.length) return
            this.setState({ phone: this.state.phone.slice(0, -1) })
        } else if (this.state.status === 'inputcode') {
            if (!this.state.code.length) return
            this.setState({ code: this.state.code.slice(0, -1) })
        }
    }

    onSendBtnPress = () => {
        this.setState({ status: 'sending', error: false }, this.phoneAnimated.onSend)
        // this.phoneAnimated.onSend()
    }

    onVerifyCode = () => {
        this.setState({ status: 'inputcode', error: false }, () => this.props.onSendPhone(`${this.state.country.dial_code}${this.state.phone}`))
    }

    onSendPhoneFailed = () => {
        this.setState({ status: 'inputphone', error: true }, () => {
            this.phoneAnimated.onReset()
        })
    }

    onVerifySuccess = () => {
        this.setState({ status: 'verified' }, () => {
            setTimeout(this.props.onClose, 2000)
        })
    }

    onVerifyFailed = () => {
        this.setState({ status: 'verify-failed' }, () => {
            setTimeout(() => this.setState({ status: 'inputcode' }), 3000)
        })
    }

    render() {
        const { visible, onClose } = this.props
        const { country, phone, status, code, error, showCountryPicker } = this.state

        return (
            <Modal
                visible={visible}
                onRequestClose={() => { }}
            >
                <View style={{ flex: 1, paddingVertical: 20 }}>
                    <Image source={require('../assets/bg-input.png')} style={{ width: null, height: null, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, resizeMode: 'stretch' }} />

                    <Text style={{ marginTop: 16, marginRight: 16, height: 34, fontSize: 34, color: '#484848', alignSelf: 'flex-end' }} onPress={onClose}>×</Text>
                    <View style={{ flex: 1, alignItems: 'center' }}>

                        <PhoneAnimated
                            ref={c => { this.phoneAnimated = c }}
                            onVerifyCode={this.onVerifyCode}
                        />

                        <View style={{ flex: 1, paddingVertical: 16 }}>
                            <View style={{ width: 300, height: 40, flexDirection: 'row', backgroundColor: '#fff', borderWidth: 0.33, borderColor: '#666', paddingVertical: 8, alignItems: 'center' }}>
                                <View style={{ paddingHorizontal: 8, borderRightWidth: 0.33, borderColor: '#666', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#484848' }} onPress={() => this.setState({ showCountryPicker: true })}>{country.flag} {country.dial_code}</Text>
                                </View>
                                <Text style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 0, fontSize: 15, fontWeight: '500', letterSpacing: 3, color: '#000' }}>{phone}</Text>

                                {validatePhoneNumber(`${country.dial_code}${phone}`) && status !== 'inputcode' && !error && status !== 'sending' ? <TouchableOpacity onPress={this.onSendBtnPress} style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#FB524A' }}>Send</Text>
                                </TouchableOpacity> : null}

                                {status === 'sending' ? <ActivityIndicator size='small' style={{ marginHorizontal: 16 }} /> : null}

                                {status === 'inputcode' || error ? <TouchableOpacity onPress={this.onVerifyCode} style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#FB524A' }}>Resend</Text>
                                </TouchableOpacity> : null}

                            </View>
                            {error ? <Text style={{ fontSize: 13, fontWeight: '400', color: 'red', marginVertical: 16 }}>Your phone wasn't sent. Please try again.</Text> : null}
                            {status === 'inputcode' ? <EnterCode code={code} /> : null}
                        </View>

                    </View>

                    <Keyboard onChangeText={this.onKeyboard} onDelete={this.onKeyboardDelete} />

                    <View
                        style={StyleSheet.absoluteFill}
                        pointerEvents={status === 'verifycode' || status === 'verified' || status === 'verify-failed' ? 'auto' : 'none'}
                    >
                        {status === 'verifycode' || status === 'verified' || status === 'verify-failed' ? <VerifyCode status={status} /> : null}
                    </View>

                    <View
                        style={StyleSheet.absoluteFill}
                        pointerEvents={showCountryPicker ? 'auto' : 'none'}
                    >
                        {showCountryPicker ? <CountryPicker
                            onSelected={item => this.setState({ country: item, showCountryPicker: false })}
                            onClose={() => this.setState({ showCountryPicker: false })}
                        /> : null}
                    </View>
                </View>

            </Modal>
        )
    }
}

function validatePhoneNumber(phone) {
    // return (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/).test(phone)
    return (/^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/).test(phone)
}
