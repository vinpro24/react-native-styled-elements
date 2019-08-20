import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import SearchModal from './components/SearchModal'

const PlaceCompleted = props => {
    const [state, setState] = React.useState({ visible: props.visible })

    const onToggle = () => {
        setState({ visible: !state.visible })
    }

    const onSelected = (item) => {
        setState({ visible: false })
        props.onSelected(item)
    }

    return (
        <View>
            <TouchableOpacity onPress={onToggle}>
                {props.children}
            </TouchableOpacity>
            <SearchModal
                googleKey={props.googleKey}
                visible={state.visible}
                onSelected={onSelected}
                onClose={onToggle}
                onError={props.onError}
            />
        </View>
    )
}

PlaceCompleted.propTypes = {
    onSelected: PropTypes.func,
    onError: PropTypes.func,
    visible: PropTypes.bool,
    googleKey: PropTypes.string,
}

PlaceCompleted.defaultProps = {
    onSelected: () => { },
    onError: () => { },
    visible: false
}

export default PlaceCompleted
