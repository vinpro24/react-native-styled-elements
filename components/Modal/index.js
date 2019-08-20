import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import PropTypes from 'prop-types'
import theme from '../../theme'

const ModalView = React.forwardRef((props, ref) => {
    const [state, setState] = React.useState({ visible: false })

    const show = () => {
        setState({ ...state, visible: true })
    }

    const dissmis = () => {
        setState({ ...state, visible: false })
        props.onClose && props.onClose()
    }

    React.useImperativeHandle(ref, () => ({
        dismiss() {
            setState({ ...state, visible: false })
            props.onClose && props.onClose()
        }
    }));

    return (
        <View>
            <TouchableOpacity onPress={show}>
                {props.button}
            </TouchableOpacity>
            <Modal
                animationType={props.animationType}
                visible={state.visible}
                onRequestClose={dissmis}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FBFF' }}>
                    <View style={styles.header}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {props.headerLeft ? props.headerLeft : (
                                <TouchableOpacity onPress={dissmis}>
                                    <Text style={{ fontSize: 30, fontWeight: '300' }}>{'×'}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {props.headerTitle ? props.headerTitle : (
                                <Text style={theme.title}>{props.title}</Text>
                            )}
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {props.headerRight}
                        </View>
                    </View>

                    <View style={styles.container}>
                        {props.children}
                    </View>

                </SafeAreaView>
            </Modal>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        minHeight: 50,
    }
})

Modal.propTypes = {
    button: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
    onClose: PropTypes.func,
    title: PropTypes.string,
    headerTitle: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
    headerLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
    headerRight: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
    animationType: PropTypes.oneOf(['slide', 'fade', 'none'])
}
Modal.defaultProps = {
    animationType: 'slide'
}

export default ModalView
