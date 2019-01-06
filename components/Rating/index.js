import React from 'react'
import { View, Image, Text, TouchableOpacity, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types';

class Rating extends React.PureComponent {
    state = {
        starBold: require('./images/ic_star_filled.png'),
        starHalf: require('./images/ic_star_half.png'),
        starTrans: require('./images/ic_star.png'),
        value: this.props.value
    }

    set(value) {
        this.setState({ value })
    }

    onSelect(value) {
        if (this.props.onRating) this.props.onRating(value)
        this.setState({ value })
    }

    render() {
        const { value } = this.state
        const { size, color, max, disabled, total } = this.props
        const starView = []
        for (let i = 1; i <= max; i++) {
            let source = null
            if (i <= value) source = this.state.starBold
            else if (i - value < 1) source = this.state.starHalf
            else if (i - value >= 1) source = this.state.starTrans
            starView.push(
                <Star
                    key={i}
                    disabled={!this.props.onPress || disabled}
                    source={source}
                    color={color}
                    size={size}
                    onPress={() => this.onSelect(i)}
                />
            )
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {starView}
                {total ? <Text style={{ fontSize: size, marginLeft: 5 }}>{`(${total})`}</Text> : null}
            </View>
        )
    }
}

const Star = (props) => (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <Image source={props.source} style={{ width: props.size, height: props.size, tintColor: props.color }} />
    </TouchableOpacity>
)

Rating.propTypes = {
    containerStyle: ViewPropTypes || View.propTypes,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.number,
    total: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    onRating: PropTypes.func
}
Rating.defaultProps = {
    max: 5,
    size: 16,
    value: 0,
    color: '#FFAB40'
}

export default Rating
