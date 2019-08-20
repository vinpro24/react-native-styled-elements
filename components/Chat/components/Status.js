import React from 'react'
import { View, Text } from 'react-native'

import { Theme } from '../helpers'

const Status = props => {
    const { message, nextMessage } = props

    if (!message.sent) {
        return <View style={Theme.statusSending} />
    }

    if (!nextMessage.user) {
        if (message.received) {
            return (
                <View style={Theme.statusReceived}>
                    <Text style={{ color: '#fff', fontSize: 8 }}>✓</Text>
                </View>
            )
        }
        if (message.sent) {
            return (
                <View style={Theme.statusSent}>
                    <Text style={{ color: '#666', fontSize: 8 }}>✓</Text>
                </View>
            )
        }
    }

    return <View style={[Theme.statusSending, { opacity: 0 }]} />
}

export default React.memo(Status)