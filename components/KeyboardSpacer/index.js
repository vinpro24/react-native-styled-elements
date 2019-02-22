import React from 'react'
import { Keyboard, Platform, Dimensions, Animated } from 'react-native'
import PropTypes from 'prop-types'

export default class KeyboardSpacer extends React.PureComponent {
    constructor() {
        super()
        this.screenHeight = Dimensions.get('window').height;
        this.animHeight = new Animated.Value(0)
    }
    componentWillMount() {
        if (!this.props.enabled) return
        const keyboardShowListener = Platform.select({ ios: 'keyboardWillShow', android: 'keyboardDidShow' })
        const keyboardHideListener = Platform.select({ ios: 'keyboardWillHide', android: 'keyboardDidHide' })

        this.onKeyboardShowListener = Keyboard.addListener(keyboardShowListener, this.keyboardShowListener)
        this.onKeyboardHideListener = Keyboard.addListener(keyboardHideListener, this.keyboardHideListener)
    }

    componentWillUnmount() {
        this.onKeyboardShowListener.remove()
        this.onKeyboardHideListener.remove()
    }

    keyboardShowListener = (event) => {
        const height = event.endCoordinates.height - (this.screenHeight - this.containerLayoutY)
        Animated.timing(this.animHeight, { toValue: height, duration: event.duration || 250 }).start()
        // this.containerView.setNativeProps({ style: { height: event.endCoordinates.height - (this.screenHeight - this.containerLayoutY) } })
    }

    keyboardHideListener = (event) => {
        Animated.timing(this.animHeight, { toValue: 0, duration: event.duration || 250 }).start()
        // this.containerView.setNativeProps({ style: { height: 0 } })
    }

    onContainerLayout = ev => {
        this.containerLayoutY = ev.nativeEvent.layout.y
        if (this.container) {
            this.container._component.measureInWindow((x, y, width, height) => {
                this.containerLayoutY = y
            })
        }

    }

    render() {
        if (!this.props.enabled) return null
        return (
            <Animated.View ref={c => { this.container = c }} style={{ height: this.animHeight }} onLayout={this.onContainerLayout} />
        )
    }
}

KeyboardSpacer.propsTypes = {
    spaceMargin: PropTypes.number,
    enabled: PropTypes.bool
}

KeyboardSpacer.defaultProps = {
    spaceMargin: 0,
    enabled: true,
}