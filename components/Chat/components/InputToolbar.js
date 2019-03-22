import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

import ToggleButton from './ToggleButton'
import ActionSheet from './ActionSheet'
import SendButton from './SendButton'

export default class InputToolbar extends React.PureComponent {
    state = {
        text: ''
    }

    onTogglePress = (isOpen) => {
        if (isOpen) {
            this.refActionSheet.show()
            this.refTextInput.blur()
        } else {
            this.refActionSheet.dismiss()
        }
    }

    onChangeText = (text) => {
        this.state.text = text
        this.refSendButton.setStatus(text.length === 0)
    }

    onPressSend = () => {
        this.props.onPressSend({ text: this.state.text })
        this.state.text = ''
        this.refTextInput.setNativeProps({ text: '' })
    }

    hideMenu = () => {
        this.refActionSheet.dismiss()
        this.refToggleButton.reset()
    }

    render() {
        const { actionSheetComponent } = this.props
        return (
            <View>
                <View style={styles.container}>
                    <ToggleButton
                        ref={c => { this.refToggleButton = c }}
                        onPress={this.onTogglePress}
                    />
                    <TextInput
                        ref={c => { this.refTextInput = c }}
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        placeholder="Type a message..."
                        onChangeText={this.onChangeText}
                        onFocus={this.hideMenu}
                    />
                    <SendButton
                        ref={c => { this.refSendButton = c }}
                        onPressSend={this.onPressSend}
                    />
                </View>
                <ActionSheet ref={c => { this.refActionSheet = c }}>
                    {actionSheetComponent}
                </ActionSheet>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#fff'
        // shadowColor: '#eee',
        // shadowOffset: { width: 0, height: -3 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2.5,
        // elevation: 3
    },
    textInput: {
        flex: 1,
        height: 36,
        padding: 0,
        paddingHorizontal: 18,
        backgroundColor: '#F0F1F5',
        borderRadius: 18
    }
})

