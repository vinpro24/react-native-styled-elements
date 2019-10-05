import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, Platform, ViewPropTypes, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import theme from '../../theme'
import iconTypes from '../Icon/iconTypes'

const Button = props => {
    const { title, titleStyle, icon, style, disabled, onPress, type, loading, raised, round, color } = props
    let iconComponent
    if (typeof icon === 'object') {
        const Icon = iconTypes(icon.type)
        iconComponent = <Icon type={icon.type} name={icon.name} size={icon.size} color={icon.color} style={StyleSheet.flatten([{ marginRight: 16 }, icon.style])} />
    } else {
        iconComponent = icon
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading || disabled}
            style={StyleSheet.flatten([
                styles.button(type, theme),
                raised && styles.raised(type),
                round && styles.round,
                { justifyContent: iconComponent ? 'flex-start' : 'center' },
                { backgroundColor: type === 'solid' ? color : 'transparent' },
                style,
                disabled && styles.disabled,
            ])}
        >
            {loading && <ActivityIndicator size='small' color={type === 'solid' ? 'white' : '#666'} />}
            {!loading && iconComponent}
            {!loading && <Text style={StyleSheet.flatten([styles.title(type, theme), titleStyle])}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = {
    button: (type, theme) => ({
        height: 36,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
        borderColor: theme.colors.primary,
        ...Platform.select({
            android: {
                borderRadius: 2,
            },
        }),
    }),
    title: (type, theme) => ({
        backgroundColor: 'transparent',
        fontFamily: Platform.select({ ios: 'Verdana', android: 'System' }),
        fontSize: 14,
        color: type === 'solid' ? 'white' : theme.colors.primary,
        fontWeight: '400',
        lineHeight: 14,
        letterSpacing: -0.078
    }),
    icon: (type, theme) => ({
        backgroundColor: 'transparent',
        fontFamily: Platform.select({ ios: 'Verdana', android: 'System' }),
        fontSize: 14,
        color: type === 'solid' ? 'white' : theme.colors.primary,
        fontWeight: '400',
        lineHeight: 14,
        letterSpacing: -0.078
    }),
    raised: type => type !== 'clear' && {
        backgroundColor: '#fff',
        ...Platform.select({
            android: {
                elevation: 4,
            },
            default: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
        }),
    },
    round: {
        borderRadius: 18
    },
    disabled: {
        // grey from designmodo.github.io/Flat-UI/
        backgroundColor: '#D1D5D8',
    },
}

Button.propTypes = {
    style: ViewPropTypes.style,
    type: PropTypes.oneOf(['solid', 'outline', 'clear']),
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]),
    loading: PropTypes.bool,
    raised: PropTypes.bool,
    disabled: PropTypes.bool,
    round: PropTypes.bool,
    color: PropTypes.string
}

Button.defaultProps = {
    type: 'solid',
    loading: false,
    raised: false,
    disabled: false,
    round: false,
    color: theme.colors.primary
}

export default React.memo(Button)
