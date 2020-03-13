import React from 'react'
import { View, StyleSheet, ViewPropTypes, Image, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import theme from '../../theme'

const ListItem = props => {
    const { children, title, subtitle, style, leftComponent, leftAvatar, leftIcon, rightComponent, rightAvatar, rightIcon, titleStyle, subtitleStyle, topDivider, bottomDivider, chevron, onPress, onLongPress } = props

    let leftIconComponent
    if (typeof leftIcon === 'object' && leftIcon.type) {
        leftIconComponent = <Icon type={leftIcon.type} name={leftIcon.name} size={leftIcon.size} color={leftIcon.color} style={StyleSheet.flatten([leftIcon.style, { marginRight: 16 }])} />
    } else {
        leftIconComponent = leftIcon
    }

    let leftAvatarComponent
    if (typeof leftAvatar === 'object' && leftAvatar.source) {
        leftAvatarComponent = <Image source={leftAvatar.source} style={StyleSheet.flatten([styles.leftAvatar, leftAvatar.style])} />
    } else {
        leftAvatarComponent = leftAvatar
    }

    let rightIconComponent
    if (typeof rightIcon === 'object' && rightIcon.type) {
        rightIconComponent = <Icon type={rightIcon.type} name={rightIcon.name} size={rightIcon.size} color={rightIcon.color} style={StyleSheet.flatten([rightIcon.style])} />
    } else {
        rightIconComponent = rightIcon
    }

    let rightAvatarComponent
    if (typeof rightAvatar === 'object' && rightAvatar.source) {
        rightAvatarComponent = <Image source={rightAvatar.source} style={StyleSheet.flatten([styles.rightAvatar, rightAvatar.style])} />
    } else {
        rightAvatarComponent = rightAvatar
    }

    const ContainerView = onPress || onLongPress ? TouchableOpacity : View

    return (
        <ContainerView onPress={onPress} onLongPress={onLongPress} style={[styles.container, style, topDivider && styles.topDivider, bottomDivider && styles.bottomDivider]}>
            {leftComponent || leftIconComponent || leftAvatarComponent ? (
                <View style={StyleSheet.flatten([styles.leftContainer])}>
                    {leftComponent && leftComponent}
                    {leftIconComponent && leftIconComponent}
                    {leftAvatarComponent && leftAvatarComponent}
                </View>
            ): null}
            <View style={StyleSheet.flatten([styles.bodyContainer])}>
                <Text style={[theme.subtitle, titleStyle]} numberOfLines={1}>{title}</Text>
                {subtitle ? <Text style={[theme.footnote, styles.subtitleStyle, subtitleStyle]} numberOfLines={1}>{subtitle}</Text> : null}
            </View>
            {rightComponent || rightIconComponent || rightAvatarComponent ? (
                <View style={StyleSheet.flatten([styles.rightContainer])}>
                    {rightComponent && rightComponent}
                    {rightIconComponent && rightIconComponent}
                    {rightAvatarComponent && rightAvatarComponent}
                </View>
            ): null}
            
            {chevron && <Icon type='Feather' name='chevron-right' size={20} color={theme.colors.grey4} style={{ marginLeft: theme.spacing(1), alignSelf: 'center' }} />}
            {children}
        </ContainerView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(1) * 2,
    },
    subtitleStyle: {
        marginTop: 2
    },
    leftContainer: {
        paddingRight: theme.spacing(1)
    },
    rightContainer: {
        paddingLeft: theme.spacing(1)
    },
    bodyContainer: {
        flex: 1,
    },
    leftAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    righttAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    topDivider: {
        borderColor: theme.colors.divider,
        borderTopWidth: StyleSheet.hairlineWidth
    },
    bottomDivider: {
        borderColor: theme.colors.divider,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})

ListItem.propTypes = {
    leftComponent: PropTypes.oneOf([PropTypes.func, PropTypes.element]),
    rightComponent: PropTypes.oneOf([PropTypes.func, PropTypes.element]),
    leftAvatar: PropTypes.oneOf([PropTypes.func, PropTypes.object]),
    leftIcon: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.object]),
    rightAvatar: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.object, PropTypes.shape({ source: PropTypes.shape({ uri: PropTypes.string }) })]),
    rightIcon: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.object]),
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    subtitle: PropTypes.string,
    subtitleStyle: Text.propTypes.style,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    topDivider: PropTypes.bool,
    bottomDivider: PropTypes.bool,
    chevron: PropTypes.bool,
}

const areEqual = (prevProps, nextProps) => {
    return prevProps.size === nextProps.size && prevProps.title === nextProps.title && prevProps.subtitle === nextProps.subtitle
}

export default React.memo(ListItem, areEqual)
