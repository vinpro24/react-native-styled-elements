import React from 'react'
import { View, ViewPropTypes, StyleSheet, PanResponder, LayoutAnimation } from 'react-native'
import PropTypes from 'prop-types'

class PullUp extends React.PureComponent {
    constructor(props) {
        super(props)
        this.currHeight = props.miniHeight
        this.prevHeight = this.currHeight
        this.isMini = true
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this.checkPanResponder.bind(this),
            onPanResponderGrant: this._onPanResponderStart.bind(this),
            onPanResponderMove: this._onPanResponderMove.bind(this),
            onPanResponderRelease: this._onPanResponderRelease.bind(this)
        })
    }

    checkPanResponder(_, { dx, dy }) {
        const isPulling = (dy > 20 || dy < -20 || dx > 20 || dx < -20)
        // if (!isPulling) {
        //     if (this.isMini) {
        //         this.showFull()
        //     } else {
        //         this.showMini()
        //     }
        // }
        return isPulling
    }

    _onPanResponderStart() {
        this.prevHeight = this.currHeight
    }
    _onPanResponderMove(_, gestureState) {
        console.log('_onPanResponderMove')
        if (gestureState.dy > 0) {
            // SWIPE DOWN
            const height = this.prevHeight - Math.abs(gestureState.dy)
            this.updateNativeProps({ style: { top: null, height } })
            this.props.onPullDown()
        } else if (gestureState.dy < 0) {
            // SWIPE UP
            const height = this.prevHeight + Math.abs(gestureState.dy)
            this.updateNativeProps({ style: { top: null, height } })
            this.props.onPullUp()
        }
    }

    _onPanResponderRelease(_, gestureState) {
        if (gestureState.dy > 20) {
            // SWIPE DOWN
            this.showMini()
        } else if (gestureState.dy < -20) {
            // SWIPE UP
            this.showFull()
        }
        this.prevHeight = this.currHeight
    }

    showMini() {
        this.updateNativeProps({ style: { top: null, height: this.props.miniHeight } })
        this.props.onPullDown()
        this.isMini = true
    }
    showFull() {
        this.updateNativeProps({ style: { top: this.props.top, height: null } })
        this.props.onPullUp()
        this.isMini = false
    }

    updateNativeProps(props) {
        LayoutAnimation.spring()
        this.containerView.setNativeProps(props)
    }

    render() {
        return (
            <View
                ref={c => (this.containerView = c)}
                {...this._panResponder.panHandlers} 
                style={[styles.container, { height: this.props.miniHeight }]}
                onLayout={e => {
                    this.currHeight = e.nativeEvent.layout.height
                }}
            >
                <View style={{ padding: 8 }}>
                    <View style={styles.arrow} />
                </View>

                <View style={{ flex: 1 }}>
                    {this.props.children}
                </View>

            </View>
        )
    }
}

PullUp.propTypes = {
    miniHeight: PropTypes.number,
    top: PropTypes.number,
    containerStyle: ViewPropTypes.style,
    onPullDown: PropTypes.func,
    onPullUp: PropTypes.func
}

PullUp.defaultProps = {
    miniHeight: 200,
    top: 60,
    containerStyle: {},
    onPullDown: () => { },
    onPullUp: () => { }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 8,
        backgroundColor: '#fff',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee',
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 2
    },
    arrow: {
        width: 30,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#eee',
        alignSelf: 'center'
    }
})

export default PullUp
