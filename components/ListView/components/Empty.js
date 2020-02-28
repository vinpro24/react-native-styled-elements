import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../../../theme'
import Button from '../../Button'

const Empty = props => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/empty_box.png')} style={styles.img} />
            <Text style={[Theme.text, styles.text]}>No data to display</Text>
            <Button title="Refresh" onPress={props.onRefresh} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    img: {
        width: 80,
        height: 80
    },
    text: {
        margin: 16,
        color: '#484848'
    }
})

export default React.memo(Empty, () => true)
