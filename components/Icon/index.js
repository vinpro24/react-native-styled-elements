import React from 'react'
import { ViewPropTypes, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

import iconTypes from './iconTypes'

const Icon = props => {
    const { style, type, name, size, color, onPress, onLongPress, containerStyle } = props

    const Icon = iconTypes(type)

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
    type: PropTypes.oneOf(['AntDesign', 'ZocialIcons', 'OcticIcons', 'MaterialIcons', 'Fontisto', 'EvilIcons', 'MaterialCommunityIcons', 'Ionicons', 'FoundationIcons', 'EvilIcon', 'Entypo', 'FAIcons', 'SimpleLineIcons', 'FeatherIcons', 'FontAwesome', 'FontAwesome5', 'FontAwesome5Pro', 'ant-design', 'zocial', 'octicon', 'font-awesome', 'material', 'material-community', 'ionicon', 'foundation', 'simple-line-icon', 'feather', 'entypo']),
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

export default Icon
