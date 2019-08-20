import React from 'react'
import { Modal, View, Text, Animated, Dimensions, Easing } from 'react-native'

const { height } = Dimensions.get('window')

export default class ActionSheetWithCustomView extends React.Component {
    constructor(props) {
        super(props)
        this.translateY = new Animated.Value(-height)
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
            toValue: 0, duration: 500
        }).start()
    }

    hideSheet = () => {
        Animated.timing(this.translateY, {
            toValue: -height, duration: 500, easing: Easing.linear
        }).start(() => {
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
                useNativeDriver
            >
                <View style={styles.overlay}>
                    <Text style={{ flex: 1 }} onPress={this.close} />
                    <Animated.View style={[styles.container, { bottom: this.translateY }]}>
                        {contentView}
                    </Animated.View>
                </View>
            </Modal >
        )
    }
}

const styles = {
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    container: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
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
