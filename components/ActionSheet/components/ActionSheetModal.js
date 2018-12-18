import React from 'react'
import { Modal, View, TouchableWithoutFeedback, Animated, Dimensions, Easing } from 'react-native'

const { height } = Dimensions.get('window')

export default class ActionSheetModal extends React.Component {
    constructor(props) {
        super(props)
        this.translateY = new Animated.Value(height)
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.visible) {
            this.showSheet()
        } else {

        }
        return nextProps.visible !== this.props.visible
    }

    close = () => {
        this.hideSheet()
    }

    showSheet = () => {
        Animated.timing(this.translateY, {
            toValue: 0, duration: 500, easing: Easing.linear, useNativeDriver: true
        }).start()
    }

    hideSheet = () => {
        Animated.timing(this.translateY, {
            toValue: height, duration: 500, easing: Easing.linear, useNativeDriver: true
        }).start(() => {
            this.contentView.setNativeProps({ display: 'none' })
            this.props.onClose()
        })
    }

    render() {
        const { visible, contentView } = this.props
        return (
            <Modal
                animationType="fade"
                visible={visible}
                onRequestClose={this.close}
                transparent
            >
                <TouchableWithoutFeedback onPressOut={this.close}>
                    <View style={styles.overlay}>
                        <Animated.View ref={c => this.contentView = c} style={[styles.container, { flex: 1, transform: [{ translateY: this.translateY }] }]}>
                            {contentView}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

const styles = {
    overlay: {
        flex: 1,
        // justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
        position: 'absolute', bottom: 0, left: 0, right: 0
    },
    itemTextStyle: {
        fontFamily: 'Verdana',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: '#222222',
        fontSize: 15,
        textAlign: 'center'
    }
}
