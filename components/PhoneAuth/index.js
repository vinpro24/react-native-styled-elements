import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import PhoneAuthModal from './components/PhoneAuthModal'

export default class PhoneAuth extends React.PureComponent {
    state = {
        visible: false
    }

    onPress = () => {
        this.setState({ visible: true })
    }

    onClose = () => {
        this.setState({ visible: false })
    }

    onSendPhoneFailed = () => {
        this.phoneAuthModal.onSendPhoneFailed()
    }

    onVerifyFailed = () => {
        this.phoneAuthModal.onVerifyFailed()
    }

    onVerifySuccess = () => {
        this.phoneAuthModal.onVerifySuccess()
    }

    render() {
        const { visible } = this.state
        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    {this.props.children}
                </TouchableOpacity>
                <PhoneAuthModal
                    ref={c => { this.phoneAuthModal = c }}
                    visible={visible}
                    onClose={this.onClose}
                    onSendPhone={this.props.onSendPhone}
                    onSendCode={this.props.onSendCode}
                />
            </View>
        )
    }
}

