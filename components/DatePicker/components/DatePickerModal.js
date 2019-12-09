import React from 'react'
import { Text, View, Modal, TouchableOpacity, DatePickerIOS, StyleSheet } from 'react-native'

export default class DatePickerModal extends React.PureComponent {
    state = {
        date: this.props.value
    }
    onDateChange = date => {
        this.setState({ date })
    }

    confirm = () => {
        if (this.props.onDateChange) {
            this.props.onDateChange(this.state.date)
        }
        this.dismiss()
    }

    dismiss = () => {
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    render() {
        const { visible, mode } = this.props
        const { date } = this.state
        if (!visible) return null
        return (
            <Modal
                animationType={'slide'}
                transparent
                visible={true}
                useNativeDriver
                onRequestClose={this.dismiss}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }} onPress={this.dismiss}>
                    <TouchableOpacity style={{ flex: 1 }} />
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
                            <TouchableOpacity onPress={this.dismiss}>
                                <Text style={styles.cancelBtn}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.confirm}>
                                <Text style={styles.confirmBtn}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        <DatePickerIOS
                            mode={mode}
                            date={date}
                            onDateChange={this.onDateChange}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        margin: 0,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#d9d9d9'
    },
    cancelBtn: {
        fontSize: 14,
        color: 'grey',
        fontWeight: 'bold'
    },
    confirmBtn: {
        fontSize: 14,
        color: '#009688',
        fontWeight: 'bold'
    }
})
