import React from 'react'
import { TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native'

import icons from '../assets/icons'

class ToggleButton extends React.PureComponent {
    constructor(props) {
        super(props)
        this.spinValue = new Animated.Value(0)
        this.state = {
            isRotated: false
        }
    }

    onPress = () => {
        if (this.state.isRotated) {
            this.state.isRotated = false
            Animated.timing(this.spinValue, { toValue: 0, duration: 300, easing: Easing.linear, useNativeDriver: true }).start(() => {
                if (this.props.onPress) this.props.onPress(false)
            })
        } else {
            this.state.isRotated = true
            Animated.timing(this.spinValue, { toValue: 1, duration: 300, easing: Easing.linear, useNativeDriver: true }).start(() => {
                if (this.props.onPress) this.props.onPress(true)
            })
        }
    }

    reset = () => {
        if (this.state.isRotated) {
            this.state.isRotated = false
            Animated.timing(this.spinValue, { toValue: 0, duration: 300, easing: Easing.linear, useNativeDriver: true }).start(() => {
                if (this.props.onPress) this.props.onPress(false)
            })
        }
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-45deg']
        })
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.container}>
                <Animated.Image source={icons.plus} style={{ width: 20, height: 20, tintColor: '#1C6AFC', transform: [{ rotate: spin }] }} />
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

export default ToggleButton
