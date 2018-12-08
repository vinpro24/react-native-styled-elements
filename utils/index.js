import { Text, TextInput } from 'react-native'

export const setDefaultTextStyle = (style) => {
    const oldRender = Text.render
    Text.render = function (...args) {
        const origin = oldRender.call(this, ...args)
        return React.cloneElement(origin, {
            style: [origin.props.style, style]
        })
    }
    TextInput.render = function (...args) {
        const origin = oldRender.call(this, ...args)
        return React.cloneElement(origin, {
            style: [origin.props.style, style]
        })
    }
}

export const setDefaultTextProps = (props) => {
    if (Text.defaultProps === null || Text.defaultProps === undefined) Text.defaultProps = {}
    Text.defaultProps = { ...TextInput.defaultProps, ...props }
    if (TextInput.defaultProps === null || TextInput.defaultProps === undefined) TextInput.defaultProps = {}
    TextInput.defaultProps = { ...TextInput.defaultProps, ...props }
}
