import React from 'react'
import { Image, View, Animated, Easing, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const phoneImageHeight = height * 0.17

export default class PhoneAnimated extends React.PureComponent {
    constructor() {
        super()
        this.animWrapper = new Animated.Value(1)
        this.animSearchIcon = new Animated.Value(1)
        this.animSMSIcon = new Animated.Value(0)
        this.animMessageIcon = new Animated.Value(0)
        this.animPhoneWrapper = new Animated.ValueXY({ x: -width / 2, y: 0 })
        this.animPhoneShake = new Animated.Value(0)
    }

    componentDidMount() {
        Animated.sequence([
            Animated.spring(this.animPhoneWrapper, { toValue: { x: 0, y: 0 }, easing: Easing.inOut(Easing.ease) }),
            Animated.timing(this.animPhoneShake, { toValue: 1.0, duration: 150, easing: Easing.linear }),
            Animated.timing(this.animPhoneShake, { toValue: -1.0, duration: 300, easing: Easing.linear }),
            Animated.timing(this.animPhoneShake, { toValue: 0.0, duration: 150, easing: Easing.linear })
        ]).start()
    }

    onReset = () => {
        Animated.spring(this.animWrapper, { toValue: 1, easing: Easing.inOut(Easing.ease) }).start()
        this.animSearchIcon.setValue(1)
        this.animSMSIcon.setValue(0)
        this.animMessageIcon.setValue(0)
        Animated.sequence([
            Animated.timing(this.animPhoneShake, { toValue: 1.0, duration: 150, easing: Easing.linear }),
            Animated.timing(this.animPhoneShake, { toValue: -1.0, duration: 300, easing: Easing.linear }),
            Animated.timing(this.animPhoneShake, { toValue: 0.0, duration: 150, easing: Easing.linear })
        ]).start()
    }

    onSend = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(this.animSearchIcon, { toValue: 0, easing: Easing.inOut(Easing.ease) }),
                Animated.spring(this.animSMSIcon, { toValue: 1, easing: Easing.inOut(Easing.ease) })
            ]),
            Animated.timing(this.animPhoneShake, { toValue: 1.0, duration: 150, easing: Easing.linear }),
            Animated.timing(this.animPhoneShake, { toValue: -1.0, duration: 300, easing: Easing.linear }),
            Animated.timing(this.animPhoneShake, { toValue: 0.0, duration: 150, easing: Easing.linear }),
            Animated.timing(this.animMessageIcon, { toValue: 1, duration: 400, delay: 500 })
        ]).start(this.onHide)
    }

    onSending = () => {
        Animated.sequence([
            Animated.timing(this.animPhoneShake, { toValue: 1.0, duration: 150, easing: Easing.linear }),
            Animated.timing(this.animPhoneShake, { toValue: -1.0, duration: 300, easing: Easing.linear }),
            Animated.timing(this.animPhoneShake, { toValue: 0.0, duration: 150, easing: Easing.linear })
        ]).start()
    }

    onHide = () => {
        Animated.spring(this.animWrapper, { toValue: 0, easing: Easing.inOut(Easing.ease) }).start(() => {
            this.props.onVerifyCode()
        })
    }

    render() {
        return (
            <Animated.View style={{ flex: this.animWrapper.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), transform: [{ scale: this.animWrapper }], justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ position: 'absolute' }}>
                    <Animated.View
                        style={[
                            {
                                justifyContent: 'center',
                                alignItems: 'center',
                                transform: [
                                    {
                                        rotate: this.animPhoneShake.interpolate({
                                            inputRange: [-1, 1],
                                            outputRange: ['-0.1rad', '0.1rad']
                                        })
                                    }
                                ]
                            },
                            this.animPhoneWrapper.getLayout()
                        ]}
                    >

                        <Image source={require('../assets/phone.png')} style={{ width: phoneImageHeight, height: phoneImageHeight }} />
                        <Animated.Image
                            source={require('../assets/ic-search.png')}
                            style={{
                                width: phoneImageHeight * 0.3,
                                height: phoneImageHeight * 0.3,
                                tintColor: '#fff',
                                position: 'absolute',
                                transform: [
                                    { translateX: this.animSearchIcon.interpolate({ inputRange: [0, 1], outputRange: [-(phoneImageHeight / 4), 0] }) },
                                    { scale: this.animSearchIcon }
                                ]
                            }}
                        />
                        <Animated.Image
                            source={require('../assets/ic-sms.png')}
                            style={{
                                width: phoneImageHeight * 0.3,
                                height: phoneImageHeight * 0.3,
                                tintColor: '#fff',
                                position: 'absolute',
                                transform: [
                                    { translateX: this.animSMSIcon.interpolate({ inputRange: [0, 1], outputRange: [phoneImageHeight / 4, 0] }) },
                                    { translateY: this.animSMSIcon.interpolate({ inputRange: [0, 1], outputRange: [-(phoneImageHeight / 4), 0] }) },
                                    { scale: this.animSMSIcon }
                                ]
                            }}
                        />
                        <Animated.Image
                            source={require('../assets/ic-message.png')}
                            style={{
                                width: phoneImageHeight * 0.35,
                                height: phoneImageHeight * 0.35,
                                tintColor: 'green',
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                opacity: this.animMessageIcon
                            }}
                        />
                    </Animated.View>
                </View>
            </Animated.View>
        )
    }
}
