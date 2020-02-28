import React from 'react'
import { ViewPropTypes, Text, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

import iconTypes from './iconTypes'

export type IconPropsTypes = {
    type?: 'AntDesign' | 'Zocial' | 'OcticIcons' | 'MaterialIcons' | 'MaterialCommunityIcons' | 'Ionicons' | 'Fontisto' | 'FoundationIcons' | 'EvilIcons' | 'Entypo' | 'FAIcons' | 'SimpleLineIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'FontAwesome5Pro';
    name?: string;
    size?: number,
    color?: string;
}

const Icon = props => {
    const { style, type, name, size, color, onPress, onLongPress, containerStyle } = props

    const Icon = iconTypes(type)

    if (!Icon) return (
        <Text style={[style, { color, fontSize: size }]} pointerEvents="none">□</Text>
    )

    if (onPress) {
        return (
            <TouchableHighlight onPress={onPress} onLongPress={onLongPress} style={[styles.containerStyle, style, containerStyle]} underlayColor='transparent'>
                <Icon name={name} size={size} color={color} />
            </TouchableHighlight>
        )
    }
    return (
        <Icon name={name} size={size} color={color} style={style} />
    )
}

const styles = {
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}

Icon.propTypes = {
    style: ViewPropTypes.style,
    type: PropTypes.oneOf(['AntDesign', 'Zocial', 'OcticIcons', 'MaterialIcons', 'MaterialCommunityIcons', 'Ionicons', 'Fontisto', 'FoundationIcons', 'EvilIcons', 'Entypo', 'FAIcons', 'SimpleLineIcons', 'Feather', 'FontAwesome', 'FontAwesome5', 'FontAwesome5Pro', 'ant-design', 'zocial', 'octicon', 'font-awesome', 'material', 'material-community', 'ionicon', 'foundation', 'simple-line-icon', 'feather', 'entypo']),
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
}

Icon.defaultProps = {
    size: 16,
    color: 'black',
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.type === nextProps.type && prevProps.name === nextProps.name && prevProps.size === nextProps.size && prevProps.color === nextProps.color
}

export default React.memo(Icon, areEqual)
