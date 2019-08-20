import React from 'react'
import { View, TextInput } from 'react-native'

import ToggleButton from './ToggleButton'
import ActionSheet from './ActionSheet'
import SendButton from './SendButton'
import { Theme } from '../helpers'

function InputToolbar(props) {
    const [text, setText] = React.useState('')
    const refSendBtn = React.useRef()
    const refToggleBtn = React.useRef()
    const refActionSheet = React.useRef()
    const refTextInput = React.useRef()

    const onTogglePress = (isCollapsed) => {
        if (isCollapsed) {
            refActionSheet.current.show()
            refTextInput.current.blur()
        } else {
            refActionSheet.current.dismiss()
        }
    }

    const hideMenu = () => {
        refActionSheet.current.dismiss()
        refToggleBtn.current.reset()
    }

    const onChangeText = (text) => {
        setText(text)
        refSendBtn.current.setStatus(text.length === 0)
    }

    const onPressSend = () => {
        props.onPressSend({ text })
        setText('')
        refTextInput.current.setNativeProps({ text: '' })
    }

    const onActionPress = () => {
        refToggleBtn.current.reset()
    }

    return (
        <View style={{ overflow: 'hidden' }}>
            <View style={Theme.inputContainer}>
                <ToggleButton ref={refToggleBtn} onPress={onTogglePress} />
                <TextInput
                    ref={refTextInput}
                    style={Theme.textInput}
                    underlineColorAndroid="transparent"
                    placeholder="Type a message..."
                    onChangeText={onChangeText}
                    onFocus={hideMenu}
                />
                <SendButton
                    ref={refSendBtn}
                    onPressSend={onPressSend}
                />
            </View>
            <ActionSheet ref={refActionSheet} onPress={onActionPress}>
                {props.action}
            </ActionSheet>
        </View>
    )
}

export default InputToolbar
