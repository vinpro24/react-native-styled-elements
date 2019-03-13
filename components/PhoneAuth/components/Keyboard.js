import React from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')
const wrapperHeight = height * 0.35
const itemHeight = wrapperHeight / 4

export default class Keyboard extends React.PureComponent {
    onPress = (number) => () => {
        this.props.onChangeText(number)
    }

    render() {
        return (
            <View style={{ height: wrapperHeight, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', height: itemHeight }}>
                    <TouchableOpacity onPress={this.onPress('1')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress('2')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress('3')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', height: itemHeight }}>
                    <TouchableOpacity onPress={this.onPress('4')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress('5')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress('6')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', height: itemHeight }}>
                    <TouchableOpacity onPress={this.onPress('7')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress('8')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress('9')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', height: itemHeight }}>
                    <TouchableOpacity onPress={this.onPress('00')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPress('0')} style={styles.itemWrapper}>
                        <Text style={styles.itemText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onDelete} style={styles.itemWrapper}>
                        <Text style={[styles.itemText, { fontSize: 18 }]}>⌫</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = {
    itemWrapper: {
        width: wrapperHeight / 3,
        height: (wrapperHeight / 4) - 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        backgroundColor: '#F9F9F7'
    },
    itemText: {
        fontSize: 15,
        color: '#545258',
        fontWeight: '500'
    }

}
