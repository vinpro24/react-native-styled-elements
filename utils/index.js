import React from 'react'
import { Text, TextInput } from 'react-native'
import i18nLib from './i18n'

export const i18n = i18nLib

export const setDefaultTextStyle = (style) => {
    const oldRender = Text.render
    Text.render = function (...args) {
        const origin = oldRender.call(this, ...args)
        return React.cloneElement(origin, {
            style: [style, origin.props.style]
        })
    }
    TextInput.render = function (...args) {
        const origin = oldRender.call(this, ...args)
        return React.cloneElement(origin, {
            style: [style, origin.props.style]
        })
    }
}

export const setDefaultTextProps = (props) => {
    if (Text.defaultProps === null || Text.defaultProps === undefined) Text.defaultProps = {}
    Text.defaultProps = { ...TextInput.defaultProps, ...props }
    if (TextInput.defaultProps === null || TextInput.defaultProps === undefined) TextInput.defaultProps = {}
    TextInput.defaultProps = { ...TextInput.defaultProps, ...props }
}
