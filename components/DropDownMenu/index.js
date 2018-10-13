import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import DropDownModal from './components/DropDownModal'

export default class DropDownMenu extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        style: ViewPropTypes.style,
        buttonTextStyle: PropTypes.object,
        renderButton: PropTypes.func,
        selectedValue: PropTypes.object,
        onOptionSelected: PropTypes.func,
    }
    static defaultProps = {

    };

    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
        this.collapse = this.collapse.bind(this)
        this.close = this.close.bind(this)
    }

    collapse() {
        this.setState({ collapsed: true })
    }

    close() {
        this.setState({ collapsed: false })
    }

    renderSelectedOption() {
        const { renderButton, selectedValue, options, buttonTextStyle } = this.props
        let value = selectedValue
        if (!value) {
            value = options[0]
        }

        if (renderButton) {
            return (
                <TouchableOpacity onPress={this.collapse}>
                    {renderButton(value)}
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity onPress={this.collapse} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[{ fontSize: 16, fontWeight: '400' }, buttonTextStyle]}>{value.title}</Text>
                <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>▼</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { collapsed } = this.state
        const { options, onOptionSelected, containerStyle } = this.props
        const button = this.renderSelectedOption()

        return (
            <View style={containerStyle}>
                {button}
                <DropDownModal
                    options={options}
                    visible={collapsed}
                    onClose={this.close}
                    onOptionSelected={onOptionSelected}
                />
            </View>
        )
    }
}
