import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, Dimensions, FlatList, Animated, LayoutAnimation, Easing } from 'react-native'
import PropTypes from 'prop-types'

const { width, height } = Dimensions.get('window')

export default class DropDownModal extends Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onSelected: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
        this.containerView = new Animated.Value(1.5)
    }

    componentWillMount() {
        this.zoomAnimated = Animated.timing(this.containerView, { toValue: 1, duration: 200, useNativeDriver: true, easing: Easing.ease })
    }

    componentWillReceiveProps(nextProps) {
        const { visible: wasVisible } = this.props
        const { visible: isVisible } = nextProps
        if (!wasVisible && isVisible) {
            this.zoomAnimated.start(() => {
                LayoutAnimation.easeInEaseOut()
            })
        }
    }

    onSelectOption = (item) => () => {
        if (this.props.onSelected) {
            this.props.onSelected(item)
        }
        this.close()
    }

    calculateListViewHeight(options) {
        const optionsHeight = options.length * 50
        const maxHeight = height * 0.5
        return optionsHeight < maxHeight ? optionsHeight : maxHeight
    }

    close = () => {
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity onPress={this.onSelectOption(item)} style={{ width, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.itemTextStyle}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { visible, options } = this.props
        return (
            <Modal
                animationType="fade"
                visible={visible}
                onRequestClose={this.close}
                transparent
            >
                <Animated.View style={[styles.container, { transform: [{ scale: this.containerView }] }]}>
                    <View style={{ height: this.calculateListViewHeight(options) }}>
                        <FlatList
                            data={options}
                            keyExtractor={i => i.title}
                            renderItem={this.renderItem}
                        />
                    </View>
                    <TouchableOpacity onPress={this.close}>
                        <Text style={{ fontSize: 20, padding: 20 }}>{'×'}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Modal>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(242, 242, 242, 0.97)'
    },
    itemTextStyle: {
        fontFamily: 'Verdana',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: '#222222',
        fontSize: 15,
        textAlign: 'center'
        // alignSelf: 'stretch',
        // paddingHorizontal: 20,
        // paddingVertical: 23,
        // alignSelf: 'stretch'
    }
}
