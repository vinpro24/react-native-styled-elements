import React from 'react'
import { Platform, View, TouchableOpacity, TimePickerAndroid, DatePickerAndroid } from 'react-native'
import DatePickerModal from './components/DatePickerModal'

export default class DatePicker extends React.PureComponent {
    state = {
        visible: false
    }

    onPress = () => {
        if (Platform.OS === 'ios') {
            this.setState({ visible: true })
        } else {
            this.androidDatePicker()
        }
    }

    onClose = () => {
        this.setState({ visible: false })
    }

    onDateChange = (date) => {
        if (this.props.onDateChange) {
            this.props.onDateChange(date)
        }
    }

    async androidDatePicker() {
        try {
            if (this.props.mode === 'time') {
                const { action, hour, minute } = await TimePickerAndroid.open({
                    hour: 14,
                    minute: 0,
                    is24Hour: true // Will display '2 PM'
                })
                if (action !== TimePickerAndroid.dismissedAction) {
                    const date = new Date()
                    date.setHours(hour, minute)
                    this.onDateChange(date)
                }
            } else {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    date: new Date()
                })
                if (action !== DatePickerAndroid.dismissedAction) {
                    const date = new Date(year, month, day)
                    this.onDateChange(date)
                }
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message)
        }
    }

    render() {
        const { visible } = this.state
        const { mode } = this.props
        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    {this.props.children}
                </TouchableOpacity>
                {
                    Platform.OS === 'ios' ? (
                        <DatePickerModal
                            visible={visible}
                            mode={mode}
                            onClose={this.onClose}
                            onDateChange={this.onDateChange}
                        />
                    ) : null
                }

            </View>
        )
    }
}
