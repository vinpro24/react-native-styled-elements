import React from 'react'
import { View, Image, Text, TouchableOpacity, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

const starBold = require('./images/ic_star_filled.png')
const starHalf = require('./images/ic_star_half.png')
const starTrans = require('./images/ic_star.png')

const Rating = props => {
    const [state, setState] = React.useState({
        value: props.value
    })

    const onSelect = (value) => () => {
        props.onRating(value)
        setState({ value })
    }

    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center' }, props.style]}>
            {[...new Array(props.max)].map((i, index) => {
                let source = null
                if (state.value - index >= 1) {
                    if (props.renderActive) {
                        const Component = props.renderActive
                        return (
                            <TouchableOpacity onPress={props.onPress} style={{ marginRight: props.spacing }}>
                                {Component}
                            </TouchableOpacity>
                        )
                    } else {
                        source = starBold
                    }
                } else if (state.value - index < 1 && state.value - index > 0) {
                    if (props.renderHalf) {
                        const Component = props.renderHalf
                        return (
                            <TouchableOpacity onPress={props.onPress} style={{ marginRight: props.spacing }}>
                                {Component}
                            </TouchableOpacity>
                        )
                    } else {
                        source = starHalf
                    }
                } else {
                    if (props.renderInactive) {
                        const Component = props.renderInactive
                        return (
                            <TouchableOpacity onPress={props.onPress} style={{ marginRight: props.spacing }}>
                                {Component}
                            </TouchableOpacity>
                        )
                    } else {
                        source = starTrans
                    }
                }
                return (
                    <Star
                        key={`${index}`}
                        disabled={!props.onRating || props.disabled}
                        source={source}
                        color={props.color}
                        size={props.size}
                        onPress={onSelect(index + 1)}
                    />
                )
            })}

            {props.total ? <Text style={{ fontSize: props.size, marginLeft: 5 }}>{`(${props.total})`}</Text> : null}
        </View>
    )
}

const Star = (props) => (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <Image source={props.source} style={{ width: props.size, height: props.size, tintColor: props.color }} />
    </TouchableOpacity>
)

Rating.propTypes = {
    style: ViewPropTypes.style,
    value: PropTypes.number,
    max: PropTypes.number,
    total: PropTypes.number,
    spacing: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    onRating: PropTypes.func,
    renderActive: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    renderInactive: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    renderHalf: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
}

Rating.defaultProps = {
    max: 5,
    size: 16,
    value: 0,
    color: '#FFAB40',
    spacing: 4,
    renderActive: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    renderInactive: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    renderHalf: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
}

export default React.memo(Rating, (prevProps, nextProps) => {
    return prevProps.max === nextProps.max || prevProps.value === nextProps.value || prevProps.size === nextProps.size || prevProps.color === nextProps.color
})
