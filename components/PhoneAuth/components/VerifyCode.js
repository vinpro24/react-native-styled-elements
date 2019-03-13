import React from 'react'
import { Text, ImageBackground, View, Animated, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')
const phoneImageHeight = height * 0.2

export default class VerifyCode extends React.PureComponent {
    constructor() {
        super()
        this.unmouted = false
        this.animSearchIcon = new Animated.ValueXY({ x: 28, y: 28 })
    }

    componentDidMount() {
        this.anim()
    }

    componentWillUnmount() {
        this.unmouted = true
    }

    anim = () => {
        Animated.sequence([
            Animated.spring(this.animSearchIcon, { toValue: { x: -(phoneImageHeight * 0.08), y: -(phoneImageHeight * 0.08) } }),
            Animated.spring(this.animSearchIcon, { toValue: { x: (phoneImageHeight * 0.08), y: -(phoneImageHeight * 0.08) } }),
            Animated.spring(this.animSearchIcon, { toValue: { x: 0, y: (phoneImageHeight * 0.08) } })
        ]).start(() => {
            setTimeout(() => {
                if (!this.unmouted && this.props.status === 'verifycode') {
                    this.anim()
                }
            }, 500)
        })
    }

    render() {
        const { status } = this.props
        return (
            <ImageBackground source={require('../assets/bg-verify.png')} style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <ImageBackground source={require('../assets/phone.png')} style={{ width: phoneImageHeight, height: phoneImageHeight, justifyContent: 'center', alignItems: 'center' }}>
                        <Animated.Image
                            source={require('../assets/ic-search.png')}
                            style={[{ width: phoneImageHeight * 0.3, height: phoneImageHeight * 0.3, tintColor: '#fff' }, this.animSearchIcon.getLayout()]}
                        />
                    </ImageBackground>
                </View>
                {
                    status === 'verified' ? (
                        <View style={{ width: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#FB524A', marginVertical: 16 }}>Awesome!</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#616567', textAlign: 'center' }}>Your phone number has been verified successfully.</Text>
                        </View>
                    ) : null
                }

                {
                    status === 'verify-failed' ? (
                        <View style={{ width: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#484848', marginVertical: 16 }}>Oops!</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#616567', textAlign: 'center' }}>Your phone number wasn't verified.</Text>
                        </View>
                    ) : null
                }
            </ImageBackground>
        )
    }
}
