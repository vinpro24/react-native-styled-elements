import React from 'react'
import { View, FlatList } from 'react-native'

import * as helpers from './helpers'
import Message from './components/Message'
import InputToolbar from './components/InputToolbar'
import KeyboardSpacer from './components/KeyboardSpacer'

export default class Conversation extends React.PureComponent {
    renderItem = ({ item, index }) => {
        const { user, messages } = this.props
        const position = item.user._id === user._id ? 'right' : 'left'
        const previousMessage = messages[index + 1] || {};
        const nextMessage = messages[index - 1] || {};

        return (
            <Message
                message={item}
                previousMessage={previousMessage}
                nextMessage={nextMessage}
                position={position}
            />
        )
    }

    onPressSend = ({ text }) => {
        const message = {
            _id: helpers.ObjectID(),
            user: this.props.user,
            text,
            createdAt: new Date().toISOString()
        }
        this.props.onSend(message)
    }

    render() {
        const { messages, keyExtractor, actionSheet, disable } = this.props
        console.log('disable', disable)
        return (
            <View style={{ flex: 1 }}>

                <FlatList
                    data={messages}
                    renderItem={this.renderItem}
                    keyExtractor={keyExtractor}
                    keyboardShouldPersistTaps='always'
                    keyboardDismissMode='on-drag'
                    inverted
                />
                {
                    !disable ? (
                        <InputToolbar
                            onPressSend={this.onPressSend}
                            actionSheetComponent={actionSheet}
                        />
                    ) : null
                }

                <KeyboardSpacer />
            </View>
        )
    }
}

Conversation.defaultProps = {
    data: [],
    keyExtractor: (item) => `${item._id}`,
    disable: false
}

