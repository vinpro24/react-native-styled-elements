import React from 'react'
import { View, TouchableHighlight } from 'react-native'
import iconTypes from './iconTypes'

const Icon = props => {
    const { type, name, size, color, onPress, containerStyle } = props

    const WrapperView = onPress ? TouchableHighlight : View
    const Icon = iconTypes(type)

    return (
        <WrapperView onPress={onPress} style={[styles.containerStyle, containerStyle]} underlayColor='transparent'>
            <Icon
                name={name}
                size={size}
                color={color}
            />
        </WrapperView>
    )
}

const styles = {
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Icon
