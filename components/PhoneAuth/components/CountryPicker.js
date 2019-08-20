import React, { PureComponent } from 'react'
import { Text, View, Modal, TouchableOpacity, FlatList, SafeAreaView, TextInput } from 'react-native'

export default class CountryPicker extends PureComponent {
    constructor() {
        super()
        this.countries = require('../assets/countries.json')
        this.state = {
            visible: false,
            countryName: ''
        }
    }

    onPress = () => {
        this.setState(state => ({ visible: !state.visible }))
    }

    onSelected = (item) => () => {
        this.props.onSelected(item)
        this.setState({ visible: false })
    }

    onChangeText = countryName => {
        this.setState({ countryName })
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={this.onSelected(item)} style={{ flexDirection: 'row', paddingVertical: 10, paddingRight: 10, borderBottomWidth: 0.33, borderColor: '#666', marginLeft: 16, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#484848' }}>{`${item.flag} ${item.name}`}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#484848' }}>{item.dial_code}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { visible, countryName } = this.state
        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    {this.props.children}
                </TouchableOpacity>
                <Modal
                    visible={visible}
                    onRequestClose={this.onPress}
                >
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <Text onPress={this.onPress} style={{ fontSize: 15, fontWeight: '500', color: '#484848', paddingLeft: 16, paddingTop: 16 }}>BACK</Text>
                        <TextInput
                            style={{ margin: 8, padding: 8, fontSize: 16 }}
                            underlineColorAndroid='transparent'
                            placeholder='Input country name'
                            onChangeText={this.onChangeText}
                            autoFocus
                        />
                        <FlatList
                            style={{ flex: 1 }}
                            data={countryName.length ? this.countries.filter(i => i.name.indexOf(countryName) !== -1) : this.countries}
                            renderItem={this.renderItem}
                            keyExtractor={i => i.code}
                            keyboardShouldPersistTaps='always'
                            keyboardDismissMode='on-drag'
                        />
                    </SafeAreaView>
                </Modal>
            </View>
        )
    }
}
