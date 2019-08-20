import React from 'react'
import { FlatList, RefreshControl, Text, ViewPropTypes, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

function ListView(props) {
    const [state, setState] = React.useState({
        data: props.data,
        total: 0,
        refreshing: false,
        loading: false,
        page: props.page || 1
    })

    React.useEffect(() => {
        _onRefresh()
    }, [])

    const _onRefresh = () => {
        if (state.loading || state.refreshing) return
        setState({ ...state, refreshing: true })
        props.fetchData({ data: state.data, page: props.page }).then(res => {
            setState({
                ...state,
                data: res.data,
                total: res.total,
                loading: false,
                refreshing: false
            });
        }).catch(error => {
            setState({
                ...state,
                loading: false,
                refreshing: false
            });
        });
    }

    const _onLoadmore = () => {
        if (state.loading || state.refreshing || state.data.length >= state.total) return
        setState({ ...state, loading: true })
        props.fetchData({ data: state.data, page: state.page }).then(res => {
            setState({
                ...state,
                data: res.data,
                total: res.total,
                page: res.page,
                loading: false,
                refreshing: false
            });
        }).catch(error => {
            setState({
                ...state,
                loading: false,
                refreshing: false
            });
        });
    }

    return (
        <FlatList
            data={state.data}
            renderItem={props.renderItem}
            refreshControl={
                <RefreshControl
                    refreshing={state.refreshing}
                    onRefresh={_onRefresh}
                />
            }
            keyExtractor={props.keyExtractor}
            onEndReachedThreshold={props.onEndReachedThreshold}
            onEndReached={_onLoadmore}
            numColumns={props.numColumns}
            ListEmptyComponent={state.refreshing ? null : props.ListEmptyComponent}
            ListFooterComponent={state.loading ? props.ListFooterComponent : null}
            ListHeaderComponent={props.ListHeaderComponent}
            disableVirtualization={props.disableVirtualization}
            removeClippedSubviews={props.removeClippedSubviews}
            initialNumToRender={props.initialNumToRender}
            maxToRenderPerBatch={props.maxToRenderPerBatch}
            windowSize={props.maxToRenderPerBatch}
            style={props.style}
            contentContainerStyle={props.contentContainerStyle}
        />
    )
}

ListView.defaultProps = {
    data: [],
    page: 1,
    keyExtractor: (item, index) => item.id || item._id || index.toString(),
    onEndReachedThreshold: 0.5,
    numColumns: 1,
    ListEmptyComponent: <Text style={{ margin: 16, color: '#484848', fontSize: 14 }}>No data to display</Text>,
    ListFooterComponent: <ActivityIndicator style={{ margin: 16, alignSelf: 'center' }} size='large' />,
    ListHeaderComponent: null,
    disableVirtualization: false,
    removeClippedSubviews: true,
    initialNumToRender: 20,
    maxToRenderPerBatch: 20,
    windowSize: 101,
    fetchData: () => Promise.resolve({ data: [] }),
}

ListView.propTypes = {
    style: ViewPropTypes.style,
    data: PropTypes.array,
    renderItem: PropTypes.oneOf(PropTypes.func, PropTypes.element, PropTypes.object),
    page: PropTypes.number,
    numColumns: PropTypes.number,
    keyExtractor: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    disableVirtualization: PropTypes.bool,
    removeClippedSubviews: PropTypes.bool,
    initialNumToRender: PropTypes.number,
    maxToRenderPerBatch: PropTypes.number,
    windowSize: PropTypes.number,
    fetchData: PropTypes.func,
}

export default ListView
