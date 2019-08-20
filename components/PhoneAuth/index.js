import React from 'react'
import { TouchableOpacity, Text, Image, View, Modal, SafeAreaView } from 'react-native'

import InputPhone from './components/InputPhone'
import Verify from './components/Verify'

export default class PhoneAuth extends React.PureComponent {
    state = {
        visible: false,
        verifying: false,
        phone: ''
    }

    sendSuccess = () => {
        this.refInputPhone.onSendSuccess()
    }

    sendFailed = () => {
        this.refInputPhone.onSendFailed()
    }

    verifySuccess = (cb) => {
        this.refVerify.onSuccess(() => {
            if (cb) cb()
            if (this.props.onSuccess) {
                this.props.onSuccess(this.state.phone)
            }
        })

    }

    verifyFailed = () => {
        this.refVerify.onFailed(() => {
            this.setState({
                verifying: false
            })
        })
    }

    onPress = () => {
        this.setState(state => ({ visible: !state.visible }))
    }

    onSend = phone => {
        this.state.phone = phone
        if (this.props.onSend) this.props.onSend(phone)
    }

    onVerify = code => {
        if (this.props.onVerify) this.props.onVerify(code)
        this.setState({ verifying: true })
    }

    render() {
        const { visible, verifying } = this.state

        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    {this.props.children}
                </TouchableOpacity>
                <Modal visible={visible} onRequestClose={this.onPress}>
                    <Image source={require('./assets/bg-input.png')} style={{ width: null, height: null, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, resizeMode: 'stretch' }} />

                    <SafeAreaView style={{ flex: 1 }}>
                        <Text style={{ marginVertical: 8, marginRight: 16, height: 34, fontSize: 34, color: '#484848', alignSelf: 'flex-end' }} onPress={this.onPress}>×</Text>
                        <InputPhone
                            ref={c => { this.refInputPhone = c }}
                            onSend={this.onSend}
                            onVerify={this.onVerify}
                        />
                    </SafeAreaView>

                    <View
                        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                        pointerEvents="none"
                    >
                        {verifying ? <Verify ref={c => { this.refVerify = c }} /> : null}
                    </View>

                </Modal>
                {/* <PhoneAuthModal
                    ref={c => { this.phoneAuthModal = c }}
                    visible={visible}
                    onClose={this.onClose}
                    onSendPhone={this.props.onSendPhone}
                    onSendCode={this.props.onSendCode}
                /> */}
            </View>
        )
    }
}
