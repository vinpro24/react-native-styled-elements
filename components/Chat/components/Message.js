import React from 'react'
import { View } from 'react-native'

import Avatar from './Avatar'
import Bubble from './Bubble'
import Status from './Status'
import { Theme } from '../helpers'

function Message(props) {
    const { message, nextMessage, position, renderImage, onLongPress } = props

    if (position === 'right') {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Bubble
                        style={Theme.bubbleRightStyle}
                        textStyle={Theme.bubbleRightTextStyle}
                        message={message}
                        position={position}
                        renderImage={renderImage}
                        onLongPress={onLongPress}
                    />
                </View>
                <Status message={message} nextMessage={nextMessage} />
            </View>
        )
    }
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Avatar
                avatar={message.user.avatar}
            // hidden={nextMessage.user && nextMessage.user._id === message.user._id}
            />
            <View style={{ flex: 1 }}>
                <Bubble
                    style={Theme.bubbleLeftStyle}
                    textStyle={Theme.bubbleLeftTextStyle}
                    message={message}
                    position={position}
                    renderImage={renderImage}
                    onLongPress={onLongPress}
                />
            </View>
        </View>
    )
}

export default Message
