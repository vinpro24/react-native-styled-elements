import React from 'react'
import { Animated, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Icon from '../../Icon'
import theme from '../../../theme';

const { width } = Dimensions.get('window')
const numCol = Math.floor(width / 100)
const itemWidth = width / numCol

const ActionSheet = React.forwardRef((props, ref) => {
    let isShow = false
    const animHeight = new Animated.Value(0)
    const maxHeight = typeof props.children === 'array' ? Math.min(Math.ceil(props.children.length / numCol) * 80, 160) : 150

    React.useImperativeHandle(ref, () => ({
        show() {
            if (isShow) return
            isShow = true
            Animated.timing(animHeight, { toValue: maxHeight, duration: 250 }).start()
        },
        dismiss() {
            if (!isShow) return
            isShow = false
            Animated.timing(animHeight, { toValue: 0, duration: 250 }).start()
        }
    }))

    const onPress = onItemPress => () => {
        props.onPress()
        onItemPress && onItemPress()
    }
    if (typeof props.children === 'function' || typeof props.children === 'object') {
        const Component = props.children
        return (
            <Animated.View style={{ height: animHeight, backgroundColor: '#F9FBFF' }}>
                <ScrollView style={{ height: maxHeight }} showsVerticalScrollIndicator={false}>
                    <Component width={width} height={maxHeight} />
                </ScrollView>
            </Animated.View>
        )
    }
    return (
        <Animated.View style={{ height: animHeight, backgroundColor: '#F9FBFF' }}>
            <ScrollView style={{ height: maxHeight }} showsVerticalScrollIndicator={false}>

                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {props.children.map(i => {
                        let iconComponent
                        if (typeof i.icon === 'object') {
                            iconComponent = <Icon type={i.icon.type} name={i.icon.name} size={i.icon.size || 30} color={i.icon.color} style={i.icon.style} />
                        } else {
                            iconComponent = icon
                        }

                        return (
                            <TouchableOpacity onPress={onPress(i.onPress)} style={styles.itemWrapper}>
                                {iconComponent}
                                <Text style={theme.text}>{i.label}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </Animated.View>
    )
})

const styles = {
    itemWrapper: {
        width: itemWidth,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default ActionSheet

// import React from 'react'
// import { View, Text, Animated, StyleSheet } from 'react-native'
// import Icon from '../../Icon'

// const ActionSheet = React.forwardRef((props, ref) => {
//     let isShow = false
//     const animHeight = React.useRef(new Animated.Value(0)).current

//     React.useImperativeHandle(ref, () => ({
//         show() {
//             if (isShow) return
//             isShow = true
//             Animated.timing(animHeight, { toValue: 100, duration: 250 }).start()
//         },
//         dismiss() {
//             if (!isShow) return
//             isShow = false
//             Animated.timing(animHeight, { toValue: 0, duration: 250 }).start()
//         }
//     }))

//     return (
//         <Animated.View style={{ opacity: animHeight, height: animHeight, flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

//             {props.children.map(i => {
//                 let iconComponent
//                 if (typeof i.icon === 'object') {
//                     iconComponent = <Icon type={i.icon.type} name={i.icon.name} size={i.icon.size || 30} color={i.icon.color} style={StyleSheet.flatten([i.icon.style, { marginBottom: 16 }])} />
//                 } else {
//                     iconComponent = icon
//                 }

//                 return (
//                     <View style={{}}>
//                         {iconComponent}
//                         <Text>{i.label}</Text>
//                     </View>
//                 )
//             })}
//         </Animated.View>
//     )
// })

// export default ActionSheet
