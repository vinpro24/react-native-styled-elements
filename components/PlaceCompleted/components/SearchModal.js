import React, { Component } from 'react'
import { Text, View, Modal, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, Image, FlatList, Platform, PermissionsAndroid } from 'react-native'

import * as locationAPI from '../apis/location.js'
import images from '../assets/images'

export default class SearchModal extends Component {
    state = {
        isLoading: false,
        text: '',
        places: []
    }

    close = () => {
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    onChangeText = text => {
        this.setState({ text }, () => {
            if (this.typingTimer) {
                clearTimeout(this.typingTimer)
                this.typingTimer = null
            }
            this.typingTimer = setTimeout(() => {
                clearTimeout(this.typingTimer)
                this.typingTimer = null
                this.search()
            }, 700)
        })
    }

    search() {
        this.setState({ isLoading: true })
        locationAPI.autoComplete(this.state.text, this.props.googleKey).then(res => {
            this.setState({ places: res.predictions, isLoading: false })
        }).catch(() => this.setState({ isLoading: false }))
    }

    onSelected = (item) => () => {
        if (this.props.onSelected) {
            locationAPI.getPlaceDetail(item.place_id, this.props.googleKey).then(placeDetail => {
                const place = {
                    address: placeDetail.result.formatted_address,
                    address_components: placeDetail.result.address_components,
                    geolocation: [placeDetail.result.geometry.location.lng, placeDetail.result.geometry.location.lat]
                }
                if (this.props.onSelected) this.props.onSelected(place)
                this.close()
            })
        }
    }

    nearBy = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(granted => {
                if (granted) this.getCurrentPosition()
            })
        } else {
            this.getCurrentPosition()
        }
    }

    getCurrentPosition = () => {
        this.setState({ isLoading: true })
        navigator.geolocation.getCurrentPosition(
            (position) => {
                locationAPI.geocodeByLatLong(position.coords.latitude, position.coords.longitude, this.props.googleKey).then(res => {
                    this.setState({ isLoading: false })
                    if (res.status === 'OK') {
                        const place = {
                            address: res.results[0].formatted_address,
                            address_components: locationAPI.getAddressParts(res.results[0]),
                            geolocation: [res.results[0].geometry.location.lng, res.results[0].geometry.location.lat]
                        }
                        if (this.props.onSelected) this.props.onSelected(place)
                        this.close()
                    }
                })
            },
            () => this.setState({ isLoading: false }, () => alert('Failed to get current position.')),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={this.onSelected(item)} style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8 }}>
            <Image source={images.marker} style={{ width: 20, height: 20, marginRight: 8, tintColor: 'rgb(72, 72, 72)' }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13 }} numberOfLines={1}>
                    {item.structured_formatting.main_text}
                </Text>
                <Text style={{ fontSize: 12 }} numberOfLines={1}>
                    {item.structured_formatting.secondary_text}
                </Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        const { isLoading, places, text } = this.state
        const { visible } = this.props
        return (
            <Modal animationType="slide" visible={visible} onRequestClose={this.close} transparent>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={this.close}>
                            <Text style={{ fontSize: 30, fontWeight: '300' }}>{'×'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.nearBy}>
                            <Text style={{ fontSize: 15, padding: 0 }}>Nearby</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={{ padding: 16, borderBottomWidth: 1, borderColor: '#bdbdbd' }}
                        underlineColorAndroid="transparent"
                        onChangeText={this.onChangeText}
                        placeholder="Enter an address"
                        value={text}
                        autoFocus
                    />

                    {isLoading && <ActivityIndicator size="large" style={{ margin: 20, alignSelf: 'center' }} />}

                    <FlatList
                        data={places}
                        keyExtractor={i => i.id}
                        renderItem={this.renderItem}
                        keyboardShouldPersistTaps="always"
                    />

                </SafeAreaView>
            </Modal>
        )
    }
}