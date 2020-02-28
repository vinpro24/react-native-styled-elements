import React from 'react'
import { Text } from 'react-native'

export const IconTypes = ['AntDesign', 'Zocial', 'OcticIcons', 'MaterialIcons', 'MaterialCommunityIcons', 'Ionicons', 'Fontisto', 'FoundationIcons', 'EvilIcons', 'Entypo', 'SimpleLineIcons', 'Feather', 'FontAwesome', 'FontAwesome5', 'FontAwesome5Pro']

let AntDesign
let MaterialIcons
let MaterialCommunityIcons
let Ionicons
let Fontisto
let Foundation
let EvilIcons
let Entypo
let FAIcons
let SimpleLineIcons
let Feather
let FontAwesome
let FontAwesome5
let FontAwesome5Pro
let Octicons
let Zocial

for (const iconType of IconTypes) {
    const isExpo = global.__expo && global.__expo.Icon
    switch (iconType) {
        case 'AntDesign':
            try {
                AntDesign = require('react-native-vector-icons/AntDesign').default;
            } catch (error) {

            }
        case 'Zocial':
            try {
                Zocial = require('react-native-vector-icons/Zocial').default;
            } catch (error) {

            }
        case 'Octicons':
            try {
                Octicons = require('react-native-vector-icons/Octicons').default;
            } catch (error) {

            }
        case 'MaterialIcons':
            try {
                MaterialIcons = require('react-native-vector-icons/MaterialIcons').default;
            } catch (error) {

            }
        case 'MaterialCommunityIcons':
            try {
                MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons').default;
            } catch (error) {

            }
        case 'Ionicons':
            try {
                Ionicons = require('react-native-vector-icons/Ionicons').default;
            } catch (error) {

            }
        case 'Foundation':
            try {
                Foundation = require('react-native-vector-icons/Foundation').default;
            } catch (error) {

            }
        case 'EvilIcons':
            try {
                EvilIcons = require('react-native-vector-icons/EvilIcons').default;
            } catch (error) {

            }
        case 'Entypo':
            try {
                Entypo = require('react-native-vector-icons/Entypo').default;
            } catch (error) {

            }
        case 'SimpleLineIcons':
            try {
                SimpleLineIcons = require('react-native-vector-icons/SimpleLineIcons').default;
            } catch (error) {

            }
        case 'Feather':
            try {
                Feather = require('react-native-vector-icons/Feather').default;
            } catch (error) {

            }
        case 'FontAwesome':
            try {
                FontAwesome = require('react-native-vector-icons/FontAwesome').default;
            } catch (error) {

            }
        case 'FontAwesome5':
            try {
                FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;
            } catch (error) {

            }
        case 'FontAwesome5Pro':
            try {
                if (!isExpo) {
                    FontAwesome5Pro = require('react-native-vector-icons/FontAwesome5Pro').default;
                }
            } catch (e) { }
        case 'Fontisto':
            try {
                if (!isExpo) {
                    Fontisto = require('react-native-vector-icons/Fontisto').default;
                }
            } catch (error) {

            }
    }
}

export default type => {
    switch (type) {
        case 'AntDesign':
            return AntDesign
        case 'Zocial':
            return Zocial
        case 'Octicons':
            return Octicons
        case 'MaterialIcons':
            return MaterialIcons
        case 'MaterialCommunityIcons':
            return MaterialCommunityIcons
        case 'Ionicons':
            return Ionicons
        case 'Foundation':
            return Foundation
        case 'EvilIcons':
            return EvilIcons
        case 'Entypo':
            return Entypo
        case 'Fontisto':
            return Fontisto
        case 'SimpleLineIcons':
            return SimpleLineIcons
        case 'Feather':
            return Feather
        case 'FontAwesome':
            return FontAwesome
        case 'FontAwesome5':
            return FontAwesome5
        case 'FontAwesome5Pro':
            return FontAwesome5Pro
        default: return MaterialIcons
    }
}
