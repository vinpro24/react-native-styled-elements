import React from 'react'
import { Text, View, Animated, Easing } from 'react-native'

export default class EnterCode extends React.PureComponent {
    constructor() {
        super()
        this.animWrapper = new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(this.animWrapper, { toValue: 1, duration: 300, easing: Easing.linear }).start()
    }

    render() {
        const { numberOfCode = 6, code = '' } = this.props
        return (
            <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: this.animWrapper, transform: [{ translateY: this.animWrapper.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }}>
                <Text style={{ marginVertical: 16, fontSize: 14, fontWeight: '400', color: '#484848' }}>Enter the code that was sent</Text>
                <View style={{ flexDirection: 'row' }}>
                    {Array.from({ length: numberOfCode }, (x, i) => {
                        return (
                            <View key={`${i}`} style={{ width: 40, height: 40, marginHorizontal: 3, borderWidth: 0.33, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '500', color: '#000' }}>{code[i] || ''}</Text>
                            </View>
                        )
                    })}
                </View>
            </Animated.View>
        )
    }
}
