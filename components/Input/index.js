import React from 'react'
import { TextInput, Text, TouchableOpacity, View, StyleSheet } from 'react-native'

export default class Input extends React.Component {
    static propTypes = {
        onChangeText: PropTypes.func,
        title: PropTypes.string
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.value !== this.props.value) {
            return true
        }
        return false
    }

    onChangeText = (text) => {
        if (this.typingTimer) {
            clearTimeout(this.typingTimer)
            this.typingTimer = null
        }
        this.typingTimer = setTimeout(() => {
            clearTimeout(this.typingTimer)
            this.typingTimer = null
            this.props.onChangeText && this.props.onChangeText(text)
        }, 700)
    }

    renderTitle = () => {
        const { titleStyle, title } = this.props
        if (!title) null
        return (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        )
    }

    renderWarning = () => {
        if (this.props.valid && !this.props.valid.test(`${this.props.value}`.toLowerCase())) {
            return (
                <Text style={{ color: 'red', fontSize: 13, height: 10, marginHorizontal: 5 }}>*</Text>
            )
        }
        return null
    }

    clear = () => {
        this.textInput.clear()
        this.textInput.setNativeProps({ text: '' })
        this.props.onChangeText && this.props.onChangeText('')
    }

    render() {
        const { value, textInputStyle, containerStyle, multiline, placeholder } = this.props
        return (
            <View style={[styles.container, containerStyle]}>

                {this.renderTitle()}

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                    <TextInput
                        ref={c => (this.textInput = c)}
                        style={[styles.textInput, textInputStyle]}
                        underlineColorAndroid={'transparent'}
                        onChangeText={this.onChangeText}
                        defaultValue={`${value}`}
                        multiline={multiline || false}
                        placeholder={placeholder || ''}
                    />

                    {this.renderWarning()}

                    <TouchableOpacity
                        onPress={this.clear}
                        style={[styles.clearButton, { display: value && value.length ? 'flex' : 'none' }]}
                    >
                        <Text style={{ fontSize: 14, lineHeight: 14, color: '#fff' }}>×</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = {
    container: {
        paddingVertical: 7,
        marginVertical: 10,
        borderColor: '#8E8E93',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    title: {
        backgroundColor: 'transparent',
        fontFamily: 'System',
        fontSize: 13,
        color: '#000000',
        fontWeight: '400',
        lineHeight: 13,
        letterSpacing: -0.078
    },
    textInput: {
        flex: 1,
        paddingVertical: 0,
        color: '#484848',
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Verdana',
        textAlignVertical: 'top'
    },
    clearButton: {
        display: 'none',
        width: 14,
        height: 14,
        borderRadius: 14,
        backgroundColor: 'grey',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 5
    }
}