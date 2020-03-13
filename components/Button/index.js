import React from 'react'
import { ActivityIndicator, Text, Platform, ViewPropTypes, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../../theme'
import iconTypes from '../Icon/iconTypes'
import TouchableView from '../Touchable'

type Props = {
    /**
     * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
     * - `text` - flat button without background or outline (low emphasis)
     * - `outline` - button with an outline (medium emphasis)
     * - `contain` - button with a background color and elevation shadow (high emphasis)
     */
    type?: 'text' | 'outline' | 'contain';
    /**
     * Whether to show a loading indicator.
     */
    loading?: boolean;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
}

const Button = (props: Props) => {
    const { title, titleStyle, icon, style, disabled, onPress, type, loading, raised, round, color, disabledStyle, disabledTitleStyle } = props
    let iconComponent
    if (typeof icon === 'object') {
        const Icon = iconTypes(icon.type)
        iconComponent = <Icon type={icon.type} name={icon.name} size={icon.size} color={icon.color || color} style={StyleSheet.flatten([{ marginRight: 12 }, icon.style])} />
    } else {
        iconComponent = icon
    }

    return (
        <TouchableView
            onPress={onPress}
            disabled={loading || disabled}

        >
            <View style={StyleSheet.flatten([
                styles.button(type, Theme),
                raised && styles.raised(type),
                round && styles.round,
                { justifyContent: iconComponent ? 'flex-start' : 'center' },
                { backgroundColor: type === 'contain' ? color : 'transparent' },
                style,
                disabled ? disabledStyle : null,
            ])}>
                {loading && <ActivityIndicator size='small' color={type === 'contain' ? 'white' : '#666'} style={{ marginRight: 8 }} />}
                {!loading && iconComponent}
                <Text style={StyleSheet.flatten([styles.title(type, Theme), titleStyle, disabled ? disabledTitleStyle : null])}>{title}</Text>
            </View>
        </TouchableView>
    )
}

const styles = {
    button: (type, theme) => ({
        minHeight: 40,
        paddingHorizontal: 16,
        paddingVertical: 10,
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
        fontSize: 16,
        color: type === 'contain' ? 'white' : theme.colors.primary,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: -0.078
    }),
    icon: (type, theme) => ({
        backgroundColor: 'transparent',
        fontFamily: Platform.select({ ios: 'Verdana', android: 'System' }),
        fontSize: 14,
        color: type === 'contain' ? 'white' : theme.colors.primary,
        fontWeight: '400',
        lineHeight: 14,
        letterSpacing: -0.078
    }),
    raised: type => type !== 'text' && {
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
        borderRadius: 20
    },
    disabled: {
        // grey from designmodo.github.io/Flat-UI/
        backgroundColor: '#D1D5D8',
    },
    disabledTitleStyle: '#666'
}

Button.propTypes = {
    style: ViewPropTypes.style,
    type: PropTypes.oneOf(['contain', 'outline', 'clear']),
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object]),
    loading: PropTypes.bool,
    raised: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledStyle: ViewPropTypes.style,
    disabledTitleStyle: Text.propTypes.style,
    round: PropTypes.bool,
    color: PropTypes.string
}

Button.defaultProps = {
    type: 'contain',
    loading: false,
    raised: false,
    disabled: false,
    round: false,
    color: Theme.colors.primary,
    disabledStyle: styles.disabled,
    disabledTitleStyle: styles.disabledTitleStyle
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.type === nextProps.type && prevProps.title === nextProps.title && prevProps.loading === nextProps.loading && prevProps.color === nextProps.color && prevProps.disabled === nextProps.disabled && prevProps.round === nextProps.round && prevProps.style === nextProps.style && prevProps.disabledStyle === nextProps.disabledStyle && prevProps.disabledTitleStyle === nextProps.disabledTitleStyle
}

export default React.memo(Button, areEqual)
