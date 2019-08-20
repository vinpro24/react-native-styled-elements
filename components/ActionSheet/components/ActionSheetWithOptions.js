import React from 'react'
import { View, Text, StyleSheet, Modal, Animated, TouchableHighlight, Dimensions, TouchableOpacity, Easing } from 'react-native'

import theme from '../../../theme'
// const { height } = Dimensions.get('window')

const ActionSheetModal = props => {
    const height = props.options.length * 100
    const translateY = React.useRef(new Animated.Value(height)).current

    React.useLayoutEffect(() => {
        if (props.visible) {
            Animated.timing(translateY, {
                toValue: 0, duration: 250, easing: Easing.linear
            }).start()
        }
    }, [props.visible])

    const renderItem = ({ item }) => {
        return (
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={styles.text}>{item.label}</Text>
            </View>
        )
    }

    const onClose = () => {
        Animated.timing(translateY, {
            toValue: height, duration: 100, easing: Easing.linear
        }).start(r => {
            if (r.finished) props.onClose()
        })
    }

    const onSelected = (value, index) => () => {
        Animated.timing(translateY, {
            toValue: height, duration: 100, easing: Easing.linear
        }).start(r => {
            if (r.finished) props.onSelected(value, index)
        })
    }

    return (
        <Modal
            animationType="fade"
            visible={props.visible}
            onRequestClose={props.onClose}
            transparent
            useNativeDriver
        >
            <TouchableHighlight onPress={onClose} style={styles.overlay} underlayColor="transparent">
                <Animated.View style={{ margin: 16, position: 'absolute', left: 0, right: 0, bottom: 0, transform: [{ translateY }] }}>
                    <View style={{ borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.95)', overflow: 'hidden' }}>
                        {props.title && (
                            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.divider }}>
                                <Text style={styles.title}>{props.title}</Text>
                            </View>
                        )}

                        {
                            props.options.map((item, index) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.9} key={`${index}`} onPress={onSelected(item.value, index)} style={{ borderBottomWidth: index < props.options.length - 1 ? StyleSheet.hairlineWidth : 0, borderBottomColor: theme.colors.divider }}>
                                        {renderItem({ item, index })}
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                    <TouchableOpacity activeOpacity={0.9} onPress={onClose} style={styles.cancelContainer}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableHighlight>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFF',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    title: {
        ...theme.footnote,
        color: '#666',
        fontWeight: '400',
    },
    text: {
        ...theme.callout,
        color: 'rgba(0, 122, 255, 0.95)'
    },
    cancelContainer: {
        height: 50,
        marginVertical: 8,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
    },
    cancelText: {
        ...theme.callout,
        fontWeight: 'bold',
        color: '#007AFF'
    }
})

export default ActionSheetModal
