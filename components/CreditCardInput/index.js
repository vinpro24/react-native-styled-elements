import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'

import FlipCard from './components/FlipCard'
import Form from './components/Form'
import validator from './validation'

const initState = {
    value: {
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        type: ''
    },
    status: {
        number: 'incomplete',
        exp_month: 'incomplete',
        exp_year: 'incomplete',
        cvc: 'incomplete'
    }
}

class CreditCardInput extends React.PureComponent {
    state = initState

    onFormInput = (value) => {
        const valid = validator({ ...this.state.value, ...value })
        this.setState({ value: valid.value, status: valid.status })
    }
    onFocus = (inputName) => {
        if (inputName === 'cvc') {
            this.flipCard.onFlip('back')
        } else {
            this.flipCard.onFlip('front')
        }
    }

    onAddCard = () => {
        const { value, status } = this.state
        if (status.number === 'incomplete' || status.exp_month === 'incomplete' || status.exp_year === 'incomplete' || status.cvc === 'incomplete') {
            alert('Please enter a valid credit card.')
            return
        }
        if (this.props.onAddCard) this.props.onAddCard(value)
    }

    onCancel = () => {
        this.setState({ ...initState })
    }

    render() {
        const { value, status } = this.state
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <FlipCard
                        ref={c => (this.flipCard = c)}
                        value={value}
                        textStyle={this.props.textStyle}
                    />
                    <Form
                        value={value}
                        status={status}
                        onFormInput={this.onFormInput}
                        onFocus={this.onFocus}
                        onAddCard={this.onAddCard}
                        onCancel={this.onCancel}
                        textStyle={this.props.textStyle}
                    />
                </View>

            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})

export default CreditCardInput
