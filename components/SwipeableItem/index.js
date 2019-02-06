import React from 'react'
import { View, Animated, PanResponder, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

export default class SwipeableItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.leftHiddenItemWidth = 0
        this.rightHiddenItemWidth = 0

        this.position = new Animated.ValueXY()
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: 0 })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 0) {
                    if (gestureState.dx < this.leftHiddenItemWidth * 0.5) {
                        Animated.timing(this.position, { toValue: { x: 0, y: 0 }, duration: 300 }).start()
                    } else {
                        Animated.timing(this.position, { toValue: { x: this.leftHiddenItemWidth, y: 0 }, duration: 300 }).start()
                    }
                } else if (gestureState.dx < 0) {
                    if (gestureState.dx > -this.rightHiddenItemWidth * 0.5) {
                        Animated.timing(this.position, { toValue: { x: 0, y: 0 }, duration: 300 }).start()
                    } else {
                        Animated.timing(this.position, { toValue: { x: -this.rightHiddenItemWidth, y: 0 }, duration: 300 }).start()
                    }
                }
            }
        })
    }

    render() {
        return (
            <View style={this.props.style}>
                <View
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0 }}
                    onLayout={(e) => (this.leftHiddenItemWidth = e.nativeEvent.layout.width)}
                >
                    {this.props.renderLeft}
                </View>
                <View
                    style={{ position: 'absolute', top: 0, bottom: 0, right: 0 }}
                    onLayout={(e) => (this.rightHiddenItemWidth = e.nativeEvent.layout.width)}
                >
                    {this.props.renderRight}
                </View>

                <Animated.View
                    style={[this.props.contentContainerStyle, this.position.getLayout()]}
                    {...this.panResponder.panHandlers}
                >
                    {this.props.children}
                </Animated.View>
            </View>

        )
    }
}

SwipeableItem.propTypes = {
    renderLeft: PropTypes.element,
    renderRight: PropTypes.element,
    style: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style
}
