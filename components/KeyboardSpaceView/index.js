import React from 'react'
import { View, Keyboard } from 'react-native'

export default class KeyboardSpaceView extends React.PureComponent {
    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }

    keyboardWillShow = (event) => {
        this.containerView.setNativeProps({ style: { height: event.endCoordinates.height } })
    }

    keyboardWillHide = () => {
        this.containerView.setNativeProps({ style: { height: 0 } })
    }

    render() {
        return (
            <View ref={c => (this.containerView = c)} style={{ height: 0 }} />
        )
    }
}