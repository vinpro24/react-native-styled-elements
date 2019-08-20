import React from 'react'
import { Image, View } from 'react-native'

function Avatar(props) {
    if (props.hidden) {
        return <View style={[styles.avatar, props.style]} />
    }
    return <Image source={{ uri: props.avatar }} style={[styles.avatar, props.style]} />
}

const styles = {
    avatar: {
        margin: 10,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignSelf: 'flex-end'
    }
}

export default React.memo(Avatar)
