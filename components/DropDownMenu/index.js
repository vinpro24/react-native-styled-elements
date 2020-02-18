import React from 'react'
import { View, Text, TouchableOpacity, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import DropDownModal from './components/DropDownModal'

const DropDownMenu = (props) => {
    const { style, options, onSelected, children, renderItem, labelStyle } = props
    const [state, setState] = React.useState({ visible: false })

    const open = () => setState({ ...state, visible: true })
    const close = () => setState({ ...state, visible: false })

    const _onSelected = (value, index) => () => {
        close()
        onSelected && onSelected(value, index)
    }

    return (
        <View style={style}>
            <TouchableOpacity onPress={open}>
                {children}
            </TouchableOpacity>
            <DropDownModal
                options={options}
                visible={state.visible}
                onClose={close}
                renderItem={renderItem}
                onSelected={_onSelected}
                labelStyle={labelStyle}
            />
        </View>
    )
}

DropDownMenu.propTypes = {
    options: PropTypes.array,
    onSelected: PropTypes.func,
    style: ViewPropTypes.style,
    onClose: PropTypes.func,
    renderItem: PropTypes.func,
    labelStyle: Text.propTypes.style,
}
export default React.memo(DropDownMenu, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options)
})
