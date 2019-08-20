import React from 'react';
import { View, Text, Modal, PanResponder, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types'

function getDistance(touches) {
    const touch1 = touches[0]
    const touch2 = touches[1]
    const a = touch1.pageX - touch2.pageX
    const b = touch1.pageY - touch2.pageY
    return Math.sqrt(a * a + b * b)
}

let first = 0
const DRAG_DISMISS_THRESHOLD = 150

const LightBox = props => {
    const [state, setState] = React.useState({
        show: false,
        width: 0,
        originWidth: 1
    })
    const zoom = React.useRef(new Animated.Value(1)).current

    const onShow = () => {
        setState({ ...state, show: true })
    }
    const onDissmis = () => {
        setState({ ...state, show: false })
    }
    const panResponder = React.useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderStart: (evt) => {
            const touches = evt.nativeEvent.changedTouches
            if (touches.length == 2) {
                first = getDistance(touches)
            }
        },
        onPanResponderMove: (evt, gestureState) => {
            const touches = evt.nativeEvent.touches;
            if (touches.length == 2) {
                const touch1 = touches[0]
                const touch2 = touches[1]
                const a = touch1.pageX - touch2.pageX
                const b = touch1.pageY - touch2.pageY
                const distance = Math.sqrt(a * a + b * b)
                if (first > distance) {
                    const w = state.width - Math.abs(first - distance)
                    zoom.setValue(w / state.originWidth)
                } else {
                    const w = state.width + Math.abs(first - distance)
                    zoom.setValue(w / state.originWidth)
                }
            }
        },
        onPanResponderEnd: (evt) => {
            const touches = evt.nativeEvent.changedTouches
            if (touches.length == 2) {
                const distance = getDistance(touches)
                if (first > distance) {
                    setState(preState => ({ ...preState, width: preState.width - Math.abs(first - distance) }))
                } else {
                    setState(preState => ({ ...preState, width: preState.width + Math.abs(first - distance) }))
                }
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (props.swipeToDismiss) {
                if (Math.abs(gestureState.dy) > DRAG_DISMISS_THRESHOLD) {
                    onDissmis()
                }
            }
        },
    }), [state])

    const onLayout = (event) => {
        let layout = event.nativeEvent.layout
        setState(preState => ({ ...preState, width: layout.width, originWidth: layout.width }))
    }

    if (!state.show) {
        return (
            <TouchableOpacity onPress={onShow}>
                {props.children}
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            transparent={true}
            visible={true}
            onRequestClose={onDissmis}
        >
            <View
                {...panResponder.panHandlers}
                style={[styles.container, { backgroundColor: props.backgroundColor }]}
                onLayout={onLayout}
            >

                <Animated.View style={{ flex: 1, transform: [{ scale: zoom }] }}>
                    {props.renderContent()}
                </Animated.View>


                <View style={styles.header}>
                    {props.renderHeader ? props.renderHeader(onDissmis) : (
                        <TouchableOpacity style={styles.closeBtnWrapper} onPress={onDissmis}>
                            <Text style={styles.closeBtn}>{'×'}</Text>
                        </TouchableOpacity>
                    )}
                </View>


            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: { position: 'absolute', top: 20, left: 0, right: 0 },
    closeBtnWrapper: { padding: 16 },
    closeBtn: { fontSize: 35, fontWeight: '300', color: '#fff' },
})


LightBox.propTypes = {
    renderContent: PropTypes.func,
    renderHeader: PropTypes.func,
    backgroundColor: PropTypes.string,
    swipeToDismiss: PropTypes.bool,
}

LightBox.defaultProps = {
    backgroundColor: '#000',
    renderContent: () => null,
    swipeToDismiss: true,
}

export default LightBox
