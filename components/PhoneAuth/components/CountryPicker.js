import React, { PureComponent } from 'react'
import { Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'

export default class CountryPicker extends PureComponent {
    state = {
        countries: require('../assets/countries.json')
    }
    onPress = (item) => () => {
        this.props.onSelected(item)
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={this.onPress(item)} style={{ flexDirection: 'row', paddingVertical: 10, paddingRight: 10, borderBottomWidth: 0.33, marginLeft: 16, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#484848' }}>{item.flag} {item.name}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#484848' }}>{item.dial_code}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text onPress={this.props.onClose} style={{ fontSize: 15, fontWeight: '500', color: '#484848', padding: 16 }}>BACK</Text>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.countries}
                    renderItem={this.renderItem}
                    keyExtractor={i => i.code}
                    keyboardShouldPersistTaps='always'
                />
            </SafeAreaView>

        )
    }
}
