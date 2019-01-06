import React from 'react'
import { View, Keyboard, Platform } from 'react-native'

export default class KeyboardSpaceView extends React.PureComponent {
    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.onKeyboardShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardShowListener)
            this.onKeyboardHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardHideListener)
        } else {
            this.onKeyboardShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardShowListener)
            this.onKeyboardHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardHideListener)
        }
    }

    componentWillUnmount() {
        this.onKeyboardShowListener.remove()
        this.onKeyboardHideListener.remove()
    }

    keyboardShowListener = (event) => {
        this.containerView.setNativeProps({ style: { height: event.endCoordinates.height } })
    }

    keyboardHideListener = () => {
        this.containerView.setNativeProps({ style: { height: 0 } })
    }

    render() {
        return (
            <View ref={c => (this.containerView = c)} style={{ height: 0 }} />
        )
    }
}