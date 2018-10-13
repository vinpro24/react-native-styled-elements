import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import SearchModal from './components/SearchModal';

export default class PlaceCompleted extends Component {

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

    render() {
        const { collapsed } = this.state
        const { googleKey, onSelected } = this.props
        return (
            <View>
                <TouchableOpacity onPress={this.collapse}>
                    {this.props.children}
                </TouchableOpacity>
                <SearchModal
                    googleKey={googleKey}
                    visible={collapsed}
                    onSelected={onSelected}
                    onClose={this.close}
                />
            </View>
        )
    }
}