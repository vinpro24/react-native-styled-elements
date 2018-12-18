import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import ActionSheetModal from './components/ActionSheetModal'

export default class ActionSheet extends React.PureComponent {
    state = {
        visible: false
    }

    show = () => this.setState({ visible: true })
    dismiss = () => this.setState({ visible: false })

    render() {
        const { visible } = this.state
        return (
            <View>
                <TouchableOpacity onPress={this.show}>
                    {this.props.buttonComponent}
                </TouchableOpacity>
                <ActionSheetModal visible={visible} onClose={this.dismiss} contentView={this.props.children} />
            </View>
        )
    }
}
