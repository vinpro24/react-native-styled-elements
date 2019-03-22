import React from 'react'
import { Animated } from 'react-native'

export default class ActionSheet extends React.PureComponent {
    constructor() {
        super()
        this.isShow = false
        this.animHeight = new Animated.Value(0)
    }

    show = () => {
        if (this.isShow) return
        this.isShow = true
        Animated.timing(this.animHeight, { toValue: 200, duration: 250 }).start()
    }

    dismiss = () => {
        if (!this.isShow) return
        this.isShow = false
        Animated.timing(this.animHeight, { toValue: 0, duration: 250 }).start()
    }

    render() {
        return (
            <Animated.View style={{ opacity: this.animHeight, height: this.animHeight }}>
                {this.props.children}
            </Animated.View>
        )
    }
}
