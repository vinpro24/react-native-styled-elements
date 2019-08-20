import React from 'react'
import { Platform, View, TouchableOpacity, TimePickerAndroid, DatePickerAndroid, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import DatePickerModal from './components/DatePickerModal'

const DatePicker = props => {
    const [state, setState] = React.useState({
        visible: false,
    })

    const onClose = () => {
        setState({ ...state, visible: false })
    }

    const onShow = () => {
        if (Platform.OS === 'ios') {
            setState({ ...state, visible: true })
        } else {
            androidDatePicker()
        }
    }

    const androidDatePicker = async () => {
        try {
            if (props.mode === 'time') {
                const { action, hour, minute } = await TimePickerAndroid.open({
                    hour: props.date.getHours(), minute: 0, is24Hour: true
                })
                if (action !== TimePickerAndroid.dismissedAction) {
                    const date = new Date()
                    date.setHours(hour, minute)
                    props.onChange(date)
                }
            } else {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    date: props.value
                })
                if (action !== DatePickerAndroid.dismissedAction) {
                    const date = new Date(year, month, day)
                    props.onChange(date)
                }
            }
        } catch ({ code, message }) {
            console.log('Cannot open date picker', message)
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={onShow} style={props.style}>
                {props.children}
            </TouchableOpacity>
            {
                Platform.OS === 'ios' ? (
                    <DatePickerModal
                        visible={state.visible}
                        mode={props.mode}
                        onClose={onClose}
                        onDateChange={props.onChange}
                        value={props.value}
                    />
                ) : null
            }

        </View>
    )
}

DatePicker.propTypes = {
    style: ViewPropTypes.style,
    onChange: PropTypes.func,
    mode: PropTypes.oneOf(['date', 'datetime', 'time']),
    value: PropTypes.object,
}

DatePicker.defaultProps = {
    mode: 'datetime',
    value: new Date()
}

export default DatePicker
