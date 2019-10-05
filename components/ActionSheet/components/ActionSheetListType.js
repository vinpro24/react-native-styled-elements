import React from 'react'
import { Text, StyleSheet, Modal, Animated, TouchableHighlight, TouchableOpacity, FlatList, Easing } from 'react-native'

import theme from '../../../theme'

const ActionSheetListType = props => {
    const height = props.options.length * 100
    const translateY = React.useRef(new Animated.Value(height)).current

    React.useLayoutEffect(() => {
        if (props.visible) {
            Animated.timing(translateY, {
                toValue: 0, duration: 250, easing: Easing.linear
            }).start()
        }
    }, [props.visible])

    const renderItem = ({ item, index }) => {
        if (props.renderItem) {
            return (
                <TouchableOpacity onPress={onSelected({ item, index })}>
                    {props.renderItem({ item, index })}
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity onPress={onSelected({ item, index })} style={styles.listItem}>
                <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    const onClose = () => {
        Animated.timing(translateY, {
            toValue: height, duration: 100, easing: Easing.linear
        }).start(r => {
            if (r.finished) props.onClose()
        })
    }

    const onSelected = ({ item, index }) => () => {
        Animated.timing(translateY, {
            toValue: height, duration: 100, easing: Easing.linear
        }).start(r => {
            if (r.finished) props.onSelected(item.value, index)
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
                <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
                    {props.title ? <Text style={styles.title}>{props.title}</Text> : null}
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={{ paddingBottom: 30 }}
                        data={props.options}
                        renderItem={renderItem}
                        keyExtractor={i => i.value}
                        keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='always'
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </Animated.View>
            </TouchableHighlight>

        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    container: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        position: 'absolute', bottom: 0, left: 0, right: 0
    },
    title: {
        ...theme.title,
        marginVertical: 4,
        color: '#222',
        fontWeight: '400',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    label: {
        ...theme.text,
        color: '#666',
        fontWeight: '400',
    },
    list: {
        minHeight: 200,
        maxHeight: 500
    },
    listItem: { paddingHorizontal: 16, paddingVertical: 8, justifyContent: 'center', borderBottomWidth: 0.33, borderColor: '#666' }
})

export default ActionSheetListType
