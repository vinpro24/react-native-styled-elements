import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight, TouchableOpacity } from 'react-native'

import theme from '../../../theme'

const ActionSheetModal = props => {

    const renderItem = ({ item }) => {
        return (
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={styles.text}>{item.label}</Text>
            </View>
        )
    }

    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            onRequestClose={props.onClose}
            transparent
            useNativeDriver
        >
            <TouchableHighlight onPress={props.onClose} style={styles.overlay} underlayColor="transparent">
                <View style={{ margin: 16 }}>
                    <View style={{ borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.95)', overflow: 'hidden' }}>
                        {props.title && (
                            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.divider }}>
                                <Text style={styles.title}>{props.title}</Text>
                            </View>
                        )}

                        {
                            props.options.map((item, index) => {
                                return (
                                    <TouchableOpacity key={`${index}`} onPress={props.onSelected(item.value, index)} style={{ borderBottomWidth: index < props.options.length - 1 ? StyleSheet.hairlineWidth : 0, borderBottomColor: theme.colors.divider }}>
                                        {renderItem({ item, index })}
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <TouchableOpacity onPress={props.onClose} style={styles.cancelContainer}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
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
