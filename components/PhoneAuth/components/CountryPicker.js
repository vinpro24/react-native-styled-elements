import React from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, Modal, TouchableOpacity, FlatList } from 'react-native';

const CountryPicker = props => {
    const countries = require('../assets/countries.json')
    const [state, setState] = React.useState({
        visible: false,
        text: '',
    })

    const show = () => {
        setState(prevState => ({ ...prevState, visible: true }))
    }
    const dismiss = () => {
        setState(prevState => ({ ...prevState, visible: false }))
    }
    const onChangeText = (text) => {
        setState(prevState => ({ ...prevState, text }))
    }

    const onSelected = (item) => () => {
        dismiss()
        props.onSelected(item)
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={onSelected(item)} style={{ flexDirection: 'row', paddingVertical: 10, paddingRight: 10, borderBottomWidth: 0.33, borderColor: '#666', marginLeft: 16, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#484848' }}>{`${item.flag} ${item.name}`}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#484848' }}>{item.dial_code}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <TouchableOpacity onPress={show}>
                {props.children}
            </TouchableOpacity>
            <Modal
                visible={state.visible}
                onRequestClose={dismiss}
            >
                <SafeAreaView style={styles.container}>
                    <Text onPress={dismiss} style={{ fontSize: 30, fontWeight: '300', paddingLeft: 16, paddingTop: 10 }}>{'×'}</Text>
                    <TextInput
                        style={{ margin: 8, padding: 8, fontSize: 16, borderBottomWidth: 2, borderColor: '#00695C' }}
                        underlineColorAndroid='transparent'
                        placeholder='Input country name'
                        onChangeText={onChangeText}
                        autoFocus
                    />
                    <FlatList
                        style={{ flex: 1 }}
                        data={state.text.length ? countries.filter(i => i.name.indexOf(state.text) !== -1) : countries}
                        renderItem={renderItem}
                        keyExtractor={i => i.code}
                        keyboardShouldPersistTaps='always'
                        keyboardDismissMode='on-drag'
                    />
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFF',
    },
});

export default CountryPicker;
