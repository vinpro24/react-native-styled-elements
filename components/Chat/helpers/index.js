
export const ObjectID = () => {
    const timestamp = (Date.now() / 1000).toString(16).substr(0, 8)
    return timestamp + 'xx'.replace(/[x]/g, () => Math.random().toString(16).substr(2, 8)).toLowerCase()
}

export const Theme = {
    bubbleLeftStyle: {
        alignSelf: 'flex-start',
        marginRight: 28,
        marginVertical: 8,
        padding: 16,
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        backgroundColor: '#F3F4F6'
    },
    bubbleRightStyle: {
        alignSelf: 'flex-end',
        marginLeft: 50,
        marginVertical: 8,
        padding: 16,
        borderRadius: 16,
        borderBottomRightRadius: 0,
        backgroundColor: '#5280FA'
    },
    bubbleLeftTextStyle: {
        color: '#484848',
        fontSize: 14,
        fontWeight: '400',
        backgroundColor: 'transparent'
    },
    bubbleRightTextStyle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
        backgroundColor: 'transparent'
    },
    bubbleImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    datetimeLeftStyle: {
        color: '#484848',
        fontSize: 11,
        fontWeight: '400',
        backgroundColor: 'transparent',
        marginTop: 8,
        textAlign: 'left'
    },
    datetimeRightStyle: {
        color: '#eee',
        fontSize: 11,
        fontWeight: '400',
        backgroundColor: 'transparent',
        marginTop: 8,
        textAlign: 'right'
    },
    statusSending: {
        width: 12,
        height: 12,
        margin: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#5280FA',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    statusSent: {
        width: 12,
        height: 12,
        margin: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        backgroundColor: '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    statusReceived: {
        width: 12,
        height: 12,
        margin: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#5280FA',
        backgroundColor: '#5280FA',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    textInput: {
        flex: 1,
        height: 36,
        padding: 0,
        paddingHorizontal: 18,
        backgroundColor: '#F0F1F5',
        borderRadius: 18
    },
    image: {
        width: 120,
        height: 90,
        borderRadius: 16,
    }
}
