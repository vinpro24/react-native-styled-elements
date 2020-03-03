import React from 'react'
import { View, Text, TextInput, ViewPropTypes, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import theme from '../../theme'
import Icon from '../Icon'
import { useDebounce } from '../../utils'

const Input = props => {
    const { value, debounce, containerStyle, label, labelStyle, inputStyle, inputContainerStyle, InputComponent, leftIcon, rightIcon, iconContainerStyle, leftIconContainerStyle, errorProps, errorMessage, errorStyle, bottomDivider } = props
    const [text, setText] = React.useState(value);
    const textChanged = useDebounce(text, debounce);

    React.useEffect(() => {
        setText(props.value)
    }, [props.value])

    React.useEffect(() => {
        if (props.onChangeText) {
            props.onChangeText(textChanged)
        }
    }, [textChanged])

    const onChangeText = text => {
        setText(text)
    }

    return (
        <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            {label && <Text style={StyleSheet.flatten([styles.label, labelStyle])}>{label}</Text>}

            <View
                style={StyleSheet.flatten([styles.inputContainer, inputContainerStyle])}>
                {
                    leftIcon && (
                        <View style={StyleSheet.flatten([styles.iconContainer, iconContainerStyle, leftIconContainerStyle])}>
                            {typeof leftIcon === 'function' ? <leftIcon /> : <Icon name={leftIcon.name} size={leftIcon.size} color={leftIcon.color} />}
                        </View>
                    )
                }

                <InputComponent
                    underlineColorAndroid="transparent"
                    {...props}
                    value={text}
                    onChangeText={onChangeText}
                    style={StyleSheet.flatten([styles.input, inputStyle, { borderBottomWidth: bottomDivider ? StyleSheet.hairlineWidth : 0 }])}
                />

                {
                    rightIcon && (
                        <View style={StyleSheet.flatten([styles.iconContainer, iconContainerStyle, rightIconContainerStyle])}>
                            {typeof rightIcon === 'function' ? <leftIcon /> : <Icon name={rightIcon.name} size={rightIcon.size} color={rightIcon.color} />}
                        </View>
                    )
                }
            </View>

            {errorMessage && <Text
                {...errorProps}
                style={StyleSheet.flatten([styles.error, errorStyle])}
            >
                {errorMessage}
            </Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    label: {
        ...theme.footnote,
        color: theme.colors.grey3
    },
    input: {
        ...theme.body,
        flex: 1,
        minHeight: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: theme.colors.grey3,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        margin: 5,
        fontSize: 11,
        color: theme.colors.error,
    },
})

Input.propTypes = {
    containerStyle: ViewPropTypes.style,
    iconContainerStyle: ViewPropTypes.style,
    leftIconContainerStyle: ViewPropTypes.style,
    rightIconContainerStyle: ViewPropTypes.style,
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    labelStyle: Text.propTypes.style,
    inputStyle: TextInput.propTypes.style,
    keyboardType: PropTypes.string,
    inputContainerStyle: ViewPropTypes.style,
    InputComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    leftIcon: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
        PropTypes.element,
        PropTypes.shape({ type: PropTypes.string, name: PropTypes.string, size: PropTypes.number, color: PropTypes.string })
    ]),
    rightIcon: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
        PropTypes.element,
        PropTypes.shape({ type: PropTypes.string, name: PropTypes.string, size: PropTypes.number, color: PropTypes.string })
    ]),
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    multiline: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    bottomDivider: PropTypes.bool,
    debounce: PropTypes.number
}

Input.defaultProps = {
    InputComponent: TextInput,
    debounce: 300
}

function areEqual(prevProps, nextProps) {
    return prevProps.value === nextProps.value && prevProps.label === nextProps.label && prevProps.debounce === nextProps.debounce
}

export default React.memo(Input, areEqual)
