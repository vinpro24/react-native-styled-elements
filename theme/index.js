import React from 'react'
import { Platform, Text, TextInput } from 'react-native'

const config = {
    fontFamily: Platform.select({ ios: 'Verdana', android: 'Roboto' }),
    colors: {
        primary: '#6200ee',
        secondary: '#03dac5',
        accent: '#03dac4',
        background: '#f6f6f6',
        surface: '#ffffff',
        error: '#B00020',
        text: '#000000',
        onBackground: '#000000',
        onSurface: '#000000',
        disabled: 'rgba(0,0,0,0.26)',
        disabledBackgroundColor: '#D1D5D8',
        placeholder: 'rgba(0,0,0,0.54)',
        backdrop: 'rgba(0,0,0,0.5)',
        notification: '#F50057',
        divider: '#ddd'
    },
}

const Theme = {
    heading: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        // fontFamily: config.fontFamily,
        letterSpacing: 0.361328,
        lineHeight: 30,
    },
    title: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18,
        // fontFamily: config.fontFamily,
        letterSpacing: 0.361328,
        lineHeight: 26,
    },
    subtitle: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        // fontFamily: config.fontFamily,
        letterSpacing: 0.361328,
        lineHeight: 22,
    },
    text: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        // fontFamily: config.fontFamily,
        letterSpacing: 0.361328,
        lineHeight: 19,
    },
    footnote: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 13,
        // fontFamily: config.fontFamily,
        letterSpacing: 0.361328,
        lineHeight: 18,
    },
    caption: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 11,
        // fontFamily: config.fontFamily,
        letterSpacing: 0,
        lineHeight: 15,
    },
    shadow: {
        backgroundColor: '#fff',
        borderColor: '#F0F0F0',
        shadowColor: '#DEE4F1',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 3,
    },
    fontWeight: {
        Thin: '100',
        UltraLight: '200',
        Light: '300',
        Regular: '400',
        Medium: '500',
        Semibold: '600',
        Bold: '700',
        Heavy: '800',
        Black: '900',
    },
    ...config,
    spacing: function (scale = 1) {
        return scale * 8
    },
    setFontFamily: function (fontName) {
        Object.keys(this).forEach(key => {
            if (this[key].fontFamily) {
                this[key].fontFamily = fontName
            }
        })
    },
    set: function (params) {
        Object.keys(this).forEach(key => {
            if (params[key]) {
                this[key] = { ...this[key], ...params[key] }
            }
        })
    },
    setDefaultTextStyle: function (style) {
        const oldTextRender = Text.render
        Text.render = function (...args) {
            const origin = oldTextRender.call(this, ...args)
            return React.cloneElement(origin, {
                style: [style, origin.props.style]
            })
        }
        const oldTextInputRender = TextInput.render
        TextInput.render = function (...args) {
            const origin = oldTextInputRender.call(this, ...args)
            return React.cloneElement(origin, {
                style: [style, origin.props.style]
            })
        }
        if (style && style.fontFamily) {
            Object.keys(this).forEach(key => {
                if (this[key].fontFamily) {
                    this[key].fontFamily = style.fontFamily
                }
            })
        }
    },
}

export default Theme
