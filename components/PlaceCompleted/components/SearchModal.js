import React from 'react'
import { Text, View, Modal, TouchableOpacity, SafeAreaView, Image, FlatList, Platform, PermissionsAndroid } from 'react-native'

import * as locationAPI from '../apis/location.js'
import images from '../assets/images'
import theme from '../../../theme'
import Input from '../../Input'
import { debounce } from '../../../utils'

const SearchModal = props => {
    const [state, setState] = React.useState({ text: '', loading: false, places: [] })

    const onSearch = (_state) => {
        setState({ ..._state, loading: true })
        locationAPI.autoComplete(_state.text, props.googleKey).then(res => {
            setState({ ..._state, places: res.predictions, loading: false })
        }).catch((e) => {
            setState({ ..._state, loading: false })
        })
    }

    const handleChange = React.useRef(debounce(onSearch, 2000)).current

    const onChangeText = (text) => {
        setState({ ...state, text })
    }

    React.useEffect(() => handleChange(state), [state.text])

    onSelected = (item) => () => {
        locationAPI.getPlaceDetail(item.place_id, props.googleKey).then(placeDetail => {
            const place = {
                address: placeDetail.result.formatted_address,
                address_components: placeDetail.result.address_components,
                geolocation: [placeDetail.result.geometry.location.lng, placeDetail.result.geometry.location.lat]
            }
            if (props.onSelected) props.onSelected(place)
        })
    }

    const getCurrentPosition = () => {
        if (!navigator.geolocation) {
            props.onError({ PERMISSION_DENIED: 1 })
            return
        }
        setState({ ...state, loading: true })
        navigator.geolocation.getCurrentPosition(
            (position) => {
                locationAPI.geocodeByLatLong(position.coords.latitude, position.coords.longitude, props.googleKey).then(res => {
                    setState({ ...state, loading: false })
                    if (res.status === 'OK') {
                        const place = {
                            address: res.results[0].formatted_address,
                            address_components: locationAPI.getAddressParts(res.results[0]),
                            geolocation: [res.results[0].geometry.location.lng, res.results[0].geometry.location.lat]
                        }
                        props.onSelected(place)
                    }
                }).catch(() => {
                    setState({ ...state, loading: false })
                    props.onError({ message: 'Unable to get current location' })
                })
            },
            (e) => {
                setState({ ...state, loading: false })
                props.onError(e)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }

    const nearBy = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(granted => {
                if (granted) getCurrentPosition()
            }).catch(() => props.onError({ PERMISSION_DENIED: 1 }))
        } else {
            getCurrentPosition()
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={onSelected(item)} style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8 }}>
            <Image source={images.marker} style={{ width: 20, height: 20, marginRight: 8, tintColor: 'rgb(72, 72, 72)' }} />
            <View style={{ flex: 1 }}>
                <Text style={theme.text} numberOfLines={1}>
                    {item.structured_formatting.main_text}
                </Text>
                <Text style={theme.caption1} numberOfLines={1}>
                    {item.structured_formatting.secondary_text}
                </Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <Modal animationType="slide" visible={props.visible} onRequestClose={props.onClose} transparent>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
                    <TouchableOpacity onPress={props.onClose}>
                        <Text style={{ fontSize: 30, fontWeight: '300' }}>{'×'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nearBy}>
                        <Text style={theme.callout}>Nearby</Text>
                    </TouchableOpacity>
                </View>

                <Input
                    containerStyle={{ margin: 16 }}
                    label="Address"
                    placeholder="Enter an address"
                    onChangeText={onChangeText}
                    value={state.text}
                    autoFocus
                />

                <FlatList
                    data={state.places}
                    keyExtractor={i => i.id}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="always"
                    removeClippedSubviews={true}
                    refreshing={state.loading}
                    onRefresh={() => onSearch(state.text)}
                />

            </SafeAreaView>
        </Modal>
    )
}

export default SearchModal
