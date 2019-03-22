import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import moment from 'moment'

import Avatar from './Avatar'

export default class Message extends React.Component {
    state = {
        showDetail: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.nextMessage.user) {
            if (nextProps.nextMessage.user._id === nextProps.message.user._id) {
                return true
            }
        }
        return nextProps.message !== this.props.message || nextState.showDetail !== this.state.showDetail
    }

    onPress = () => {
        this.setState({ showDetail: !this.state.showDetail })
    }

    render() {
        const { message, nextMessage, position } = this.props
        const { showDetail } = this.state
        // console.log('dasd', message._id)
        if (position === 'right') {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Bubble
                        style={styles.bubbleRightStyle}
                        textStyle={styles.bubbleRightTextStyle}
                        message={message}
                        onPress={this.onPress}
                        timeStyle={showDetail ? styles.datetimeRightStyle : null}
                    />
                </View>
            )
        }
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                {!nextMessage.user || nextMessage.user._id !== message.user._id ? (
                    <Avatar
                        avatar={message.user.avatar}
                        style={styles.avatar}
                    />
                ) : <View style={styles.avatar} />}
                <Bubble
                    style={styles.bubbleLeftStyle}
                    textStyle={styles.bubbleLeftTextStyle}
                    message={message}
                    onPress={this.onPress}
                    timeStyle={showDetail ? styles.datetimeLeftStyle : null}
                />
            </View>
        )
    }
}

const Bubble = ({ message, style, textStyle, onPress, timeStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            {message.text && message.text.length ? <Text style={textStyle}>{message.text}</Text> : null}
            {message.image && message.image.length ? <Image source={{ uri: message.image }} style={styles.image} /> : null}
            {timeStyle ? <Text style={timeStyle}>{moment(message.createdAt).format('LT')}</Text> : null}

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bubbleLeftStyle: {
        margin: 8,
        padding: 16,
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        backgroundColor: '#F3F4F6'
    },
    bubbleRightStyle: {
        margin: 8,
        padding: 16,
        borderRadius: 16,
        borderBottomRightRadius: 0,
        backgroundColor: '#5280FA'
    },
    bubbleLeftTextStyle: {
        color: '#484848',
        fontSize: 13,
        fontWeight: '400',
        backgroundColor: 'transparent'
    },
    bubbleRightTextStyle: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '400',
        backgroundColor: 'transparent'
    },
    avatar: {
        margin: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignSelf: 'flex-end'
    },
    datetimeLeftStyle: {
        color: '#484848',
        fontSize: 11,
        fontWeight: '400',
        backgroundColor: 'transparent',
        marginTop: 8,
        textAlign: 'left'
    },
    datetimeRightStyle: {
        color: '#eee',
        fontSize: 11,
        fontWeight: '400',
        backgroundColor: 'transparent',
        marginTop: 8,
        textAlign: 'right'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    }
})
