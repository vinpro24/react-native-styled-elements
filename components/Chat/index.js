import React from 'react'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'

import * as helpers from './helpers'
import Message from './components/Message'
import InputToolbar from './components/InputToolbar'
import KeyboardSpacer from '../KeyboardSpacer'

function Chat(props) {
    const { messages, keyExtractor, action, disable } = props

    const renderItem = ({ item, index }) => {
        const { user, messages, renderImage, onLongPress } = props
        const position = item.user._id === user._id ? 'right' : 'left'
        const previousMessage = messages[index + 1] || {};
        const nextMessage = messages[index - 1] || {};
        return (
            <Message
                message={item}
                previousMessage={previousMessage}
                nextMessage={nextMessage}
                position={position}
                renderImage={renderImage}
                onLongPress={() => onLongPress(item)}
            />
        )
    }

    const onPressSend = ({ text }) => {
        const message = {
            _id: helpers.ObjectID(),
            user: props.user,
            text,
            createdAt: new Date().toISOString()
        }
        props.onSend(message)
    }

    return (
        <View style={{ flex: 1 }}>

            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode='on-drag'
                inverted
            />
            {
                !disable ? (
                    <InputToolbar
                        onPressSend={onPressSend}
                        action={action}
                    />
                ) : null
            }

            <KeyboardSpacer />
        </View>
    )
}

Chat.defaultProps = {
    messages: [],
    keyExtractor: (item) => `${item._id}`,
    onSend: () => { },
    onLongPress: () => { },
    disable: false
}

Chat.propTypes = {
    keyExtractor: PropTypes.func,
    data: PropTypes.array,
    disable: PropTypes.bool,
    action: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
    user: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
    }),
    onLongPress: PropTypes.func,
    renderImage: PropTypes.func,
}

export default React.memo(Chat)
