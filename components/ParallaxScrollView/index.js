import React from 'react'
import { View, ViewPropTypes, Animated, Dimensions, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import theme from '../../theme'

const { height: screenHeight } = Dimensions.get('window')

const ParallaxScrollView = props => {
    const { parallaxHeaderHeight, style } = props
    const scroll = React.useRef(new Animated.Value(0)).current
    const scale = scroll.interpolate({
        inputRange: [0, screenHeight / 4, screenHeight / 2],
        outputRange: [1.2, 1.1, 1],
        extrapolate: 'clamp',
    })

    return (
        <Animated.ScrollView
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            style={[{ flex: 1, zIndex: 0 }, style]}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], { useNativeDriver: true })}
        >
            <Animated.View style={{
                height: screenHeight - parallaxHeaderHeight,
                width: '100%',
                transform: [{ scale }, { translateY: Animated.multiply(scroll, 0.5) }],
            }}>
                {props.renderForeground}
            </Animated.View>

            <View style={styles.body} >
                {props.children}
            </View>
        </Animated.ScrollView>
    )
}

ParallaxScrollView.propTypes = {
    style: ViewPropTypes.style,
    renderForeground: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    parallaxHeaderHeight: PropTypes.number,
}

ParallaxScrollView.defaultProps = {
    parallaxHeaderHeight: 150,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFF',
    },
    body: {
        ...theme.shadow,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
})

function areEqual(prevProps, nextProps) {
    return prevProps.parallaxHeaderHeight === nextProps.parallaxHeaderHeight
}

export default React.memo(ParallaxScrollView, areEqual)
