import React from 'react'
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, ViewPropTypes, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const ButtonGroup = props => {
    const { buttons = [],
        containerStyle,
        buttonStyle,
        selectedButtonStyle,
        selectedTextStyle,
        textStyle,
        selectedIndex,
        onPress,
        Component,
    } = props

    const _onPress = (index) => () => {
        onPress(index)
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {buttons.map((button, index) => (
                <Component key={`${index}`} onPress={_onPress(index)} style={[styles.button, buttonStyle, selectedIndex === index ? selectedButtonStyle : {}]}>
                    <Text style={[styles.buttonText, selectedIndex === index ? selectedTextStyle : textStyle]}>{button}</Text>
                </Component>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#fff',
        height: 40,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButtonStyle: {
        backgroundColor: '#1790FF'
    },
    selectedTextStyle: {
        color: '#fff'
    },
    buttonText: {
        fontSize: 13,
        color: '#43484d',
        ...Platform.select({
            android: {},
            default: {
                fontWeight: '500',
            },
        }),
    },
})

ButtonGroup.propTypes = {
    button: PropTypes.object,
    Component: PropTypes.elementType,
    onPress: PropTypes.func,
    buttons: PropTypes.array,
    containerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    selectedTextStyle: Text.propTypes.style,
    selectedButtonStyle: ViewPropTypes.style,
    underlayColor: PropTypes.string,
    selectedIndex: PropTypes.number,
    selectedIndexes: PropTypes.arrayOf(PropTypes.number),
    activeOpacity: PropTypes.number,
    onHideUnderlay: PropTypes.func,
    onShowUnderlay: PropTypes.func,
    setOpacityTo: PropTypes.func,
    innerBorderStyle: PropTypes.shape({
        color: PropTypes.string,
        width: PropTypes.number,
    }),
    lastBorderStyle: PropTypes.oneOfType([
        ViewPropTypes.style,
        Text.propTypes.style,
    ]),
    buttonStyle: ViewPropTypes.style,
    selectMultiple: PropTypes.bool,
    theme: PropTypes.object,
    disabled: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.number),
    ]),
    disabledStyle: ViewPropTypes.style,
    disabledTextStyle: Text.propTypes.style,
    disabledSelectedStyle: ViewPropTypes.style,
    disabledSelectedTextStyle: Text.propTypes.style,
}

ButtonGroup.defaultProps = {
    selectedIndex: null,
    selectedIndexes: [],
    selectMultiple: false,
    disabled: false,
    buttonStyle: styles.buttonStyle,
    selectedButtonStyle: styles.selectedButtonStyle,
    selectedTextStyle: styles.selectedTextStyle,
    Component: Platform.select({
        android: TouchableNativeFeedback,
        default: TouchableOpacity,
    }),
    onPress: () => null,
}

export default React.memo(ButtonGroup)
