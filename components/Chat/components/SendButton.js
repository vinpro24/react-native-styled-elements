import React from 'react'
import { TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native'

import icons from '../assets/icons'

class SendButton extends React.PureComponent {
    constructor(props) {
        super(props)
        this.spinValue = new Animated.Value(0)
        this.disabled = true
    }

    onPress = () => {
        if (this.disabled) return
        this.setStatus(true)
        if (this.props.onPressSend) this.props.onPressSend()
    }

    setStatus = (disabled) => {
        if (this.disabled === disabled) return
        this.disabled = disabled
        if (disabled) {
            Animated.timing(this.spinValue, { toValue: 0, duration: 200, easing: Easing.linear, useNativeDriver: true }).start(() => {
                this.refContainer.setNativeProps({ style: { opacity: 0.5 } })
            })
        } else {
            Animated.timing(this.spinValue, { toValue: 1, duration: 200, easing: Easing.linear, useNativeDriver: true }).start(() => {
                this.refContainer.setNativeProps({ style: { opacity: 1 } })
            })
        }
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['45deg', '0deg']
        })
        return (
            <TouchableOpacity
                ref={c => { this.refContainer = c }}
                onPress={this.onPress}
                // disabled={this.disabled}
                style={[styles.container, { opacity: this.disabled ? 0.5 : 1 }]}
            >
                <Animated.Image source={icons.send} style={{ width: 20, height: 20, tintColor: '#1C6AFC', transform: [{ rotate: spin }] }} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SendButton
