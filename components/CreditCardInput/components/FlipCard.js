import React from 'react';
import { View, Text, ImageBackground, Animated, StyleSheet } from 'react-native';

class FlipCard extends React.PureComponent {
    state = {
        layout: null,
        anim: new Animated.Value(0),
    }

    onFlip = face => {
        setTimeout(() => this.BackCard.setNativeProps({ style: { zIndex: face === 'front' ? 0 : 1 } }), 500);
        Animated.timing(this.state.anim, {
            toValue: face === 'front' ? 0 : 1, duration: 1000, useNativeDriver: true
        }).start();
    }

    render() {
        const { layout } = this.state;
        const { value, textStyle } = this.props;
        const frontRotateY = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });
        const backRotateY = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '360deg'],
        });

        return (
            <View onLayout={e => !layout && this.setState({ layout: e.nativeEvent.layout })}>

                {layout && (
                    <Animated.View ref={c => this.BackCard = c} style={{ transform: [{ rotateY: backRotateY }], backfaceVisibility: 'hidden' }}>
                        <BackCard value={value} width={layout.width} height={layout.width * 0.6} textStyle={textStyle} />
                    </Animated.View>
                )}

                {layout && (
                    <Animated.View style={{ transform: [{ rotateY: frontRotateY }], backfaceVisibility: 'hidden', position: 'absolute', top: 0, left: 0 }}>
                        <FrontCard value={value} width={layout.width} height={layout.width * 0.6} textStyle={textStyle} />
                    </Animated.View>
                )}

            </View>
        );
    }
}

const FrontCard = ({ width, height, value, textStyle }) => (
    <ImageBackground
        source={require('../images/card-front.png')}
        style={{ width, height }}
        resizeMode={'stretch'}
    >
        <Text style={[styles.number, { fontSize: 26, left: width * 0.08, top: height * 0.08 }, textStyle]}>{value.type.toUpperCase()}</Text>
        <Text style={[styles.number, { top: height * 0.4 }, textStyle]}>{cc_format(value.number)}</Text>
        <View style={{ flexDirection: 'row', position: 'absolute', top: height * 0.8, right: width * 0.1, alignItems: 'center' }}>
            <Text style={[{ fontSize: 8, color: '#fff', marginRight: 5, marginTop: 2 }, textStyle]}>{'VALID\nTHRU'}</Text>
            <Text style={[styles.exp, textStyle]}>{`${`${value.exp_month}••`.slice(0, 2)}/${`${value.exp_year}••`.slice(0, 2)}`}</Text>
        </View>
    </ImageBackground>
)

const BackCard = ({ width, height, value, textStyle }) => (
    <ImageBackground
        source={require('../images/card-back.png')}
        style={{ width, height }}
        resizeMode={'stretch'}
    >
        <Text style={[styles.cvc, { top: height * 0.43, right: width * 0.08 }, textStyle]}>{`${value.cvc}•••`.slice(0, 3)}</Text>
    </ImageBackground>
)

function cc_format(num) {
    const number = `${num}••••••••••••••••`.replace(/(.{4})/g, '$1  ').trim();
    return number.slice(0, 22);
    // var v = number.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
}

const styles = StyleSheet.create({
    number: {
        position: 'absolute',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 2,
        backgroundColor: 'transparent',
        alignSelf: 'center',
    },
    exp: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 2,
    },
    cvc: {
        position: 'absolute',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 2,
    },
});

export default FlipCard;
