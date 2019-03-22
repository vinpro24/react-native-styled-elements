import React from 'react'
import { Image } from 'react-native'

const Avatar = props => {
    return (
        <Image source={{ uri: props.avatar }} style={props.style} />
    )
}

export default Avatar
