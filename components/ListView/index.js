import React from 'react'
import { FlatList, Text, ViewPropTypes, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import PlaceHolder from './components/PlaceHolder'
import Empty from './components/Empty'

const ListView = React.forwardRef((props, ref) => {
    const [state, setState] = React.useState({
        refreshing: false,
        loading: false,
        data: [],
        total: 0,
        page: 1
    })

    React.useEffect(() => {
        onRefresh()
    }, [])

    React.useImperativeHandle(ref, () => ({
        refresh: onRefresh
    }));

    const onRefresh = React.useCallback(() => {
        if (typeof props.data === 'function') {
            setState(s => ({ ...s, refreshing: true }))
            props.data({ data: [], page: 1, perPage: props.perPage }).then(res => {
                setState(s => ({ ...s, data: res.data, total: res.total, page: res.page, refreshing: false }))
            }).catch(() => {
                setState(s => ({ ...s, refreshing: false }))
            })
        } else if (typeof props.onRefresh === 'function') {
            props.onRefresh({ page: 1, perPage: props.perPage })
        }
    }, [])

    const onLoadmore = React.useCallback(() => {
        if (state.refreshing || state.loading || state.data.length >= state.total) {
            return
        }
        if (typeof props.data === 'function') {
            setState(s => ({ ...s, loading: true }))
            props.data({ data: state.data, page: state.page, perPage: props.perPage }).then(res => {
                setState(s => ({ ...s, data: res.data, total: res.total, page: res.page, loading: false }))
            }).catch(() => {
                setState(s => ({ ...s, loading: false }))
            })
        } else if (typeof props.onLoadmore === 'function') {
            props.onLoadmore({ page, perPage: props.perPage })
        }
    }, [state.page, state.total])

    return (
        <FlatList
            data={state.data}
            keyExtractor={props.keyExtractor}
            renderItem={props.renderItem}
            refreshing={state.refreshing}
            onRefresh={onRefresh}
            onEndReachedThreshold={props.onEndReachedThreshold}
            onEndReached={onLoadmore}
            ListHeaderComponent={props.ListHeaderComponent}
            ListEmptyComponent={state.refreshing ? null : props.ListEmptyComponent ? props.ListEmptyComponent : <Empty onRefresh={onRefresh} />}
            ListFooterComponent={state.refreshing && !state.data.length ? PlaceHolder : state.loading ? <ActivityIndicator style={{ margin: 16, alignSelf: 'center' }} size='large' /> : props.ListFooterComponent}
            style={props.style}
            contentContainerStyle={props.contentContainerStyle}
            numColumns={props.numColumns}
            keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
            disableVirtualization={props.disableVirtualization}
            removeClippedSubviews={props.removeClippedSubviews}
            showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
            showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
            initialNumToRender={props.initialNumToRender}
            maxToRenderPerBatch={props.maxToRenderPerBatch}
            windowSize={props.maxToRenderPerBatch}
        />
    )
})

ListView.propTypes = {
    style: ViewPropTypes.style,
    data: PropTypes.oneOf([PropTypes.func, PropTypes.array]),
    renderItem: PropTypes.func,
    page: PropTypes.number,
    numColumns: PropTypes.number,
    keyExtractor: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    keyboardShouldPersistTaps: PropTypes.string,
    disableVirtualization: PropTypes.bool,
    removeClippedSubviews: PropTypes.bool,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    initialNumToRender: PropTypes.number,
    maxToRenderPerBatch: PropTypes.number,
    windowSize: PropTypes.number,
    onRefresh: PropTypes.func,
    onLoadmore: PropTypes.func,
    ListHeaderComponent:PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
}

ListView.defaultProps = {
    data: [],
    page: 1,
    perPage: 10,
    keyExtractor: (item, index) => `${item.id || item._id || index.toString()}`,
    onEndReachedThreshold: 0.5,
    numColumns: 1,
    ListEmptyComponent: null,
    ListFooterComponent: null,
    ListHeaderComponent: null,
    keyboardShouldPersistTaps: 'always',
    disableVirtualization: false,
    removeClippedSubviews: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    initialNumToRender: 20,
    maxToRenderPerBatch: 20,
    windowSize: 101,
    style: { flex: 1 }
}

const areEqual = (prevProps, nextProps) => {
    return typeof nextProps.data !== 'function' && JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && prevProps.numColumns === nextProps.numColumns && prevProps.perPage === nextProps.perPage && prevProps.page === nextProps.page
}

export default React.memo(ListView, areEqual)
