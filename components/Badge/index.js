import React from 'react'
import { Text, View, ViewPropTypes, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';

const Badge = props => {
    const { containerStyle, textStyle, size, value, hidden, onPress } = props

    if (hidden) return null

    return (
        <TouchableOpacity onPress={onPress} disabled={!onPress} style={[styles.containerStyle, containerStyle, { minWidth: size, height: size, borderRadius: size / 2 }]}>
            <Text style={[styles.textStyle, textStyle, { fontSize: size * 0.6 }]}>{value}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    containerStyle: {
        backgroundColor: '#FF7588',
        borderRadius: 10,
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
        paddingTop: 2,
        backgroundColor: 'transparent'
    }
}

Badge.propTypes = {
    containerStyle: ViewPropTypes || View.propTypes,
    wrapperStyle: ViewPropTypes || View.propTypes,
    textStyle: ViewPropTypes || View.propTypes,
    onPress: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
    size: PropTypes.number,
    hidden: PropTypes.bool
}
Badge.defaultProps = {
    size: 20,
    value: 0,
    hidden: false
}

export default Badge
