const typography = (config) => ({
    headline: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        fontFamily: config.fontFamily,
        letterSpacing: 0.361328,
        lineHeight: 32,
    },
    title: {
        fontFamily: config.fontFamily,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        color: '#222222',
        lineHeight: 28,
        letterSpacing: 0.361328
    },
    subhead: {
        fontFamily: config.fontFamily,
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: '#222222',
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: -0.45
    },
    body: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontFamily: config.fontFamily,
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: -0.408
    },
    callout: {
        backgroundColor: 'transparent',
        color: '#484848',
        fontFamily: config.fontFamily,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: -0.32
    },
    subtitle: {
        backgroundColor: 'transparent',
        color: '#222222',
        fontFamily: config.fontFamily,
        fontSize: 15,
        fontWeight: 'normal',
        letterSpacing: -0.24,
        lineHeight: 18
    },
    text: {
        fontFamily: config.fontFamily,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        color: '#484848',
        lineHeight: 17,
        letterSpacing: -0.154
    },
    footnote: {
        backgroundColor: 'transparent',
        fontFamily: config.fontFamily,
        fontSize: 13,
        color: '#484848',
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: -0.078
    },
    caption1: {
        backgroundColor: 'transparent',
        color: '#484848',
        fontFamily: config.fontFamily,
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 15
    },
    caption2: {
        backgroundColor: 'transparent',
        color: '#484848',
        fontFamily: config.fontFamily,
        fontSize: 11,
        fontWeight: '400',
        letterSpacing: 0.06,
        lineHeight: 14
    },
})

export default typography
