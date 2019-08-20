import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'

import { Theme } from '../helpers'
import LightBox from '../../LightBox';

function Bubble(props) {
    const { message, style, textStyle, renderImage, position, onLongPress } = props
    const [state, setState] = React.useState({ colapsed: false })

    const onPress = () => setState({ ...state, colapsed: !state.colapsed })

    const _renderImage = () => {
        if (message.image && message.image.length) {
            if (renderImage) {
                return renderImage(message, Theme.image)
            }
            return (
                <LightBox renderContent={() => <Image source={{ uri: message.image }} style={{ flex: 1, resizeMode: 'contain' }} resizeMethod="resize" />}>
                    <Image source={{ uri: message.image }} style={Theme.image} resizeMethod="resize" />
                </LightBox>
            )
        }
        return null
    }

    const _renderText = () => {
        if (!message.text || !message.text.length) return null
        return <Text style={textStyle}>{message.text}</Text>
    }

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={style}>
            {_renderImage()}
            {_renderText()}
            {state.colapsed ? <Text style={position === 'right' ? Theme.datetimeRightStyle : Theme.datetimeLeftStyle}>{moment(message.createdAt).format('LT')}</Text> : null}
        </TouchableOpacity>
    )
}

export default React.memo(Bubble)
