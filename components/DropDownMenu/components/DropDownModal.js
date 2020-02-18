import React from 'react'
import { Text, View, Modal, TouchableOpacity, Dimensions, FlatList, Animated, LayoutAnimation, Easing, Image } from 'react-native'

const { width, height } = Dimensions.get('window')
import theme from '../../../theme'

const DropDownModal = props => {
    const { options, onClose, visible, renderItem, onSelected, labelStyle } = props
    const scale = React.useRef(new Animated.Value(1.5)).current

    React.useLayoutEffect(() => {
        scale.setValue(1.5)
        Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true, easing: Easing.ease }).start()
    }, [visible]);

    const _renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={onSelected(item.value, index)} style={{ width, height: 50, justifyContent: 'center', alignItems: 'center' }}>
            {renderItem ? renderItem : <Text style={[theme.body, { textAlign: 'center' }, labelStyle]}>{item.label}</Text>}
        </TouchableOpacity>
    )

    return (
        <Modal
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
            transparent
        >
            <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
                <View style={{ height: Math.min(options.length * 50 + 150, height * 0.7) }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={options}
                        keyExtractor={(i, idx) => `${i.title}-${idx}`}
                        renderItem={_renderItem}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={true}
                        contentContainerStyle={{ paddingVertical: 100 }}
                    />
                    <Image source={require('./top_gradient.png')} style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 50, width, resizeMode: 'stretch', tintColor: 'rgba(242, 242, 242, 0.97)' }} />
                    <Image source={require('./bottom_gradient.png')} style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 50, width, resizeMode: 'stretch', tintColor: 'rgba(242, 242, 242, 0.97)' }} />
                </View>
                <TouchableOpacity onPress={onClose}>
                    <Text style={{ fontSize: 30, padding: 25 }}>{'×'}</Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(242, 242, 242, 0.97)'
    }
}

export default React.memo(DropDownModal)
