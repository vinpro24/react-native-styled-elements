import React from 'react'
import { View, ViewPropTypes, StyleSheet, Image as RNImage, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

const Image = props => {
    const { ImageComponent } = props
    const [state, setState] = React.useState({
        isLoaded: false,
        isError: false
    })

    const onLoadEnd = () => {
        setState({ ...state, isLoaded: true })
    }
    const onError = () => {
        setState({ ...state, isError: true })
    }

    return (
        <React.Fragment>
            <View style={styles.container}>

                <ImageComponent
                    onLoadEnd={onLoadEnd}
                    onError={onError}
                    {...props}
                />

                {
                    !state.isLoaded && (
                        <ActivityIndicator size='large' style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]} />
                    )
                }

            </View>

        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'relative',
    },
})

Image.propTypes = {
    ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    placeholder: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    placeholderStyle: RNImage.propTypes.style,
    containerStyle: ViewPropTypes.style,
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ uri: PropTypes.string })]),
    resizeMethod: PropTypes.oneOf(["auto", "resize", "scale"])
}

Image.defaultProps = {
    ImageComponent: RNImage,
    resizeMethod: 'resize'
};

export default Image
