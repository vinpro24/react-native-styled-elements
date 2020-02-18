import React from 'react'
import { View, Text, StyleSheet, ViewPropTypes, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native'
import PropTypes from 'prop-types'
import theme from '../../theme'

const ButtonGroup = props => {
    const { containerStyle, buttons, selectMultiple, innerBorderStyle, Component, textStyle, onPress, selectedIndex, selectedIndexes, selectedTextStyle, disabled } = props

    const handleSelected = (i) => () => {
        if (selectMultiple) {
            if (selectedIndexes.includes(i)) {
                onPress(selectedIndexes.filter(index => index !== i))
            } else {
                onPress([...selectedIndexes, i])
            }
        } else {
            onPress(i)
        }
    }

    return (
        <View
            style={StyleSheet.flatten([styles.container, containerStyle && containerStyle])}
        >
            {
                buttons.map((button, index) => {
                    const innerStyle = index === buttons.length - 1 ? null : [innerBorderStyle, styles.innerBorderStyle]
                    const isSelected = selectedIndex === index || selectedIndexes.includes(index)
                    const isDisabled = disabled === true || (Array.isArray(disabled) && disabled.includes(index));

                    return (
                        <View key={index} style={StyleSheet.flatten([styles.button, innerStyle])}>
                            <Component
                                style={StyleSheet.flatten([
                                    styles.textContainer,
                                    isDisabled && styles.disabled,
                                    isSelected && { backgroundColor: theme.colors.primary }
                                ])}
                                onPress={handleSelected(index)}
                            >
                                {typeof button === 'object' ? <button /> : (
                                    <Text
                                        testID="buttonGroupItemText"
                                        style={StyleSheet.flatten([
                                            styles.buttonText,
                                            textStyle && textStyle,
                                            isSelected && { color: '#fff' },
                                            isSelected && selectedTextStyle,
                                            isDisabled && styles.disabledText,
                                            isDisabled && disabledTextStyle,
                                            isDisabled && isSelected && disabledSelectedTextStyle,
                                        ])}
                                    >
                                        {button}
                                    </Text>
                                )}
                            </Component>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 5,
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
    },
    buttonText: {
        fontSize: 13,
        color: theme.colors.grey2,
        ...Platform.select({
            android: {},
            default: {
                fontWeight: '500',
            },
        }),
    },
    innerBorderStyle: {
        borderRightWidth: 1,
        borderRightColor: theme.colors.grey4
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        backgroundColor: 'transparent',
    },
    disabledText: {
        color: theme.colors.grey4
    },
})


ButtonGroup.propTypes = {
    button: PropTypes.object,
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    containerStyle: ViewPropTypes.style,
    innerBorderStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    selectedTextStyle: Text.propTypes.style,
    onPress: PropTypes.func,
    buttons: PropTypes.array,
    selectedIndex: PropTypes.number,
    selectedIndexes: PropTypes.array,
    color: PropTypes.string,
    selectMultiple: PropTypes.bool,
    disabled: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.number),
    ]),
    disabledTextStyle: Text.propTypes.style,
    buttonStyle: ViewPropTypes.style,
    containerBorderRadius: PropTypes.number,
}

ButtonGroup.defaultProps = {
    selectedIndexes: [],
    selectMultiple: false,
    containerBorderRadius: 3,
    disabled: false,
    Component: Platform.select({
        android: TouchableNativeFeedback,
        default: TouchableOpacity,
    }),
    onPress: () => null,
}


export default ButtonGroup
