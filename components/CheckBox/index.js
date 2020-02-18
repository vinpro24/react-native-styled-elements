import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import iconTypes from '../Icon/iconTypes'
import theme from '../../theme'

const CheckBox = props => {
    const {
        Component,
        iconType,
        size,
        checked,
        checkedColor,
        uncheckedColor,
        checkedIcon,
        uncheckedIcon,
        iconRight,
        title,
        center,
        right,
        containerStyle,
        textStyle,
        onPress,
        onLongPress
    } = props
    const Icon = iconTypes(iconType)

    return (
        <Component
            style={StyleSheet.flatten([
                styles.container,
                right && { justifyContent: 'flex-end' },
                center && { justifyContent: 'center' },
                containerStyle && containerStyle,
            ])}
            onLongPress={onLongPress}
            onPress={onPress}
        >
            {!iconRight && <Icon type={iconType} name={checked ? checkedIcon : uncheckedIcon} size={size} color={checked ? checkedColor : uncheckedColor} style={{ minWidth: size }} />}
            {
                React.isValidElement(title) ? title : <Text style={StyleSheet.flatten([styles.textStyle, textStyle && textStyle])}>{title}</Text>
            }
            {iconRight && <Icon type={iconType} name={checked ? checkedIcon : uncheckedIcon} size={size} color={checked ? checkedColor : uncheckedColor} style={{ minWidth: size }} />}
        </Component>
    )
}

CheckBox.propTypes = {
    iconType: PropTypes.string,
    size: PropTypes.number,
    checked: PropTypes.bool,
    checkedColor: PropTypes.string,
    uncheckedColor: PropTypes.string,
    iconRight: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    center: PropTypes.bool,
    right: PropTypes.bool,
    containerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    Component: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

CheckBox.defaultProps = {
    checked: false,
    iconRight: false,
    right: false,
    center: false,
    iconType: 'MaterialIcons',
    checkedColor: theme.colors.primary,
    uncheckedColor: '#bfbfbf',
    checkedIcon: 'radio-button-checked',
    uncheckedIcon: 'radio-button-unchecked',
    size: 18,
    Component: TouchableOpacity,
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        ...theme.text,
        marginLeft: 8,
        marginRight: 8,
        color: '#484848',
    }
})

export default React.memo(CheckBox)
