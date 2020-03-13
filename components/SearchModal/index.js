import React from 'react';
import { View, Text, FlatList, Modal, StyleSheet, ViewPropTypes, SafeAreaView, Keyboard } from 'react-native';
import PropTypes from 'prop-types'
import Touchable from '../Touchable';
import Input from '../Input';

const SearchModal = props => {
    const [state, setState] = React.useState({
        data: [],
        visible: false
    })

    const show = () => {
        setState(s => ({ ...s, visible: true }))
    }
    const dismiss = () => {
        Keyboard.dismiss()
        setState(s => ({ ...s, visible: false }))
    }
    const onChangeText = (text) => {
        if (props.onSearch && text) {
            props.onSearch({ text }).then(res => {
                if (res) {
                    setState(s => ({ ...s, data: res.data || [] }))
                }
            })
        }
    }

    const onPress = (item) => () => {
        setState(s => ({ ...s, visible: false }))
        if (props.onSelectItem) {
            props.onSelectItem(item)
        }
    }

    const renderItem = (params) => {
        return (
            <Touchable onPress={onPress(params)}>
                {props.renderItem(params)}
            </Touchable>
        )
    }

    return (
        <>
            <Touchable onPress={show} style={[props.style]}>
                {props.children}
            </Touchable>
            <Modal animationType="slide" visible={state.visible} onRequestClose={props.dismiss}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Touchable onPress={dismiss} style={styles.backBtn}>
                            <Text style={{ fontSize: 26, fontWeight: '400' }}>{'←'}</Text>
                        </Touchable>
                        <Input
                            onChangeText={onChangeText}
                            placeholder="Type to search"
                            containerStyle={styles.input}
                            autoFocus
                            debounce={400}
                        />
                    </View>
                    <FlatList
                        style={styles.container}
                        data={state.data}
                        keyExtractor={i => i.id}
                        renderItem={renderItem}
                        keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps='always'
                        removeClippedSubviews={true}
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
    header: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', alignItems: 'center' },
    input: {
        marginHorizontal: 8,
        flex: 1
    },
    backBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


SearchModal.propTypes = {
    style: ViewPropTypes.style,
    type: PropTypes.oneOf(['AntDesign', 'Zocial', 'OcticIcons', 'MaterialIcons', 'MaterialCommunityIcons', 'Ionicons', 'Fontisto', 'FoundationIcons', 'EvilIcons', 'Entypo', 'FAIcons', 'SimpleLineIcons', 'Feather', 'FontAwesome', 'FontAwesome5', 'FontAwesome5Pro', 'ant-design', 'zocial', 'octicon', 'font-awesome', 'material', 'material-community', 'ionicon', 'foundation', 'simple-line-icon', 'feather', 'entypo']),
    onSelectItem: PropTypes.func,
    onSearch: PropTypes.func,
    renderItem: PropTypes.func,
}

SearchModal.defaultProps = {

}

function areEqual(p, n) {
    return p.children === n.children
}

export default React.memo(SearchModal, areEqual);
