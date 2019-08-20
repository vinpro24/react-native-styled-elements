import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ActionButton from './ActionButton';

class Form extends React.PureComponent {

    handleInput = (value) => {
        if (value.number) {
            this.props.onFormInput({ number: value.number });
            if (value.number.length >= 16) {
                this.expMonthInput.focus();
            }
        }
        if (value.exp_month) {
            this.props.onFormInput({ exp_month: value.exp_month });
            if (value.exp_month.length >= 2) {
                this.expYearInput.focus();
            }
        }
        if (value.exp_year) {
            this.props.onFormInput({ exp_year: value.exp_year });
            if (value.exp_year.length >= 2) {
                this.cvcInput.focus();
            }
        }
        if (value.cvc) {
            this.props.onFormInput({ cvc: value.cvc });
        }
    }

    render() {
        return (
            <View style={[styles.container, styles.shadow]}>
                <Text style={[styles.title, this.props.textStyle]}>Card number <Warning isWarning={this.props.status.number === 'incomplete'} /></Text>
                <TextInput
                    ref={c => this.numberInput = c}
                    style={[styles.textInput, this.props.textStyle]}
                    placeholderTextColor="#eee"
                    placeholder="0000 0000 0000 0000"
                    maxLength={16}
                    keyboardType={'numeric'}
                    autoCapitalise={'words'}
                    autoCorrect={false}
                    onChangeText={text => this.handleInput({ number: text.trim() })}
                    defaultValue={this.props.value.number}
                    onFocus={() => this.props.onFocus('number')}
                />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 0.3 }}>
                        <Text style={[styles.title, this.props.textStyle]}>MM <Warning isWarning={this.props.status.exp_month === 'incomplete'} /></Text>
                        <TextInput
                            ref={c => this.expMonthInput = c}
                            style={[styles.textInput, this.props.textStyle]}
                            placeholderTextColor="#eee"
                            placeholder="00"
                            maxLength={2}
                            keyboardType={'numeric'}
                            autoCapitalise={'words'}
                            autoCorrect={false}
                            onChangeText={text => this.handleInput({ exp_month: text.trim() })}
                            defaultValue={this.props.value.exp_month}
                            onFocus={() => this.props.onFocus('exp_month')}
                        />
                    </View>
                    <View style={{ flex: 0.3, marginHorizontal: 10 }}>
                        <Text style={[styles.title, this.props.textStyle]}>YY <Warning isWarning={this.props.status.exp_year === 'incomplete'} /></Text>
                        <TextInput
                            ref={c => this.expYearInput = c}
                            style={[styles.textInput, this.props.textStyle]}
                            placeholderTextColor="#eee"
                            placeholder="00"
                            maxLength={2}
                            keyboardType={'numeric'}
                            autoCapitalise={'words'}
                            autoCorrect={false}
                            onChangeText={text => this.handleInput({ exp_year: text.trim() })}
                            defaultValue={this.props.value.exp_year}
                            onFocus={() => this.props.onFocus('exp_year')}
                        />
                    </View>
                    <View style={{ flex: 0.4 }}>
                        <Text style={[styles.title, this.props.textStyle]}>CVC <Warning isWarning={this.props.status.cvc === 'incomplete'} /></Text>
                        <TextInput
                            ref={c => this.cvcInput = c}
                            style={[styles.textInput, this.props.textStyle]}
                            placeholderTextColor="#eee"
                            placeholder="000"
                            maxLength={3}
                            keyboardType={'numeric'}
                            autoCapitalise={'words'}
                            autoCorrect={false}
                            onChangeText={text => this.handleInput({ cvc: text.trim() })}
                            defaultValue={this.props.value.cvc}
                            onFocus={() => this.props.onFocus('cvc')}
                        />
                    </View>
                </View>
                <ActionButton
                    onAddCard={this.props.onAddCard}
                    onCancel={this.props.onCancel}
                    textStyle={this.props.textStyle}
                />
            </View>
        );
    }
}

const Warning = props => props.isWarning && <Text style={{ color: 'red' }}>*</Text>

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#DBE9FA',
        borderRadius: 2,
        marginTop: 15,
        marginHorizontal: 4,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 15,
        color: '#A2C5F1',
        fontWeight: 'bold',
    },
    textInput: {
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#DBE9FA',
        color: '#484848',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Form;
