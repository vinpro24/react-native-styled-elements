import React from 'react'
import { FlatList, RefreshControl, Text, ViewPropTypes, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

class ListView extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            loading: false,
            data: typeof props.data === 'function' ? [] : props.data,
            total: 0,
            perPage: props.perPage,
            page: props.page
        }
    }

    componentDidMount() {
        this.onRefresh()
    }

    onRefresh = () => {
        if (typeof this.props.data === 'function') {
            this.setState({ refreshing: true, loading: false })
            const { perPage } = this.state
            this.props.data({ data: [], page: 1, perPage }).then(res => {
                this.setState({ ...res, refreshing: false, loading: false })
            }).catch(() => {
                this.setState({ ...res, refreshing: false, loading: false })
            })
        } else if (typeof this.props.onRefresh === 'function') {
            this.props.onRefresh()
        }
    }

    onLoadmore = () => {
        if (typeof this.props.data === 'function') {
            if (this.state.refreshing || this.state.loading || this.state.data.length >= this.state.total) {
                return
            }
            this.setState({ refreshing: false, loading: true })
            const { data, page, perPage } = this.state
            this.props.data({ data, page, perPage }).then(res => {
                this.setState({ ...res, refreshing: false, loading: false })
            })
        } else if (typeof this.props.onLoadmore === 'function') {
            this.props.onLoadmore()
        }
    }

    onQueryChange = (rest) => {
        const params = {
            total: 0,
            page: rest && rest.page ? rest.page : this.props.page,
            perPage: rest && rest.perPage ? rest.perPage : this.props.perPage,
        }
        this.setState(params, () => {
            this.onRefresh()
        })
    }

    reload = () => {
        this.setState({ data: [], total: 0, page: this.props.page }, () => {
            this.onRefresh()
        })
    }

    render() {
        const { refreshing, loading, data } = this.state
        return (
            <FlatList
                data={data}
                keyExtractor={this.props.keyExtractor}
                renderItem={this.props.renderItem}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
                onEndReachedThreshold={this.props.onEndReachedThreshold}
                onEndReached={this.onLoadmore}
                numColumns={this.props.numColumns}
                ListEmptyComponent={refreshing ? null : this.props.ListEmptyComponent}
                ListFooterComponent={loading ? this.props.ListFooterComponent : null}
                ListHeaderComponent={this.props.ListHeaderComponent}
                disableVirtualization={this.props.disableVirtualization}
                removeClippedSubviews={this.props.removeClippedSubviews}
                showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
                showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
                initialNumToRender={this.props.initialNumToRender}
                maxToRenderPerBatch={this.props.maxToRenderPerBatch}
                windowSize={this.props.maxToRenderPerBatch}
                style={this.props.style}
                contentContainerStyle={this.props.contentContainerStyle}
            />
        )
    }
}

ListView.defaultProps = {
    data: [],
    page: 1,
    perPage: 10,
    keyExtractor: (item, index) => item.id || item._id || index.toString(),
    onEndReachedThreshold: 0.5,
    numColumns: 1,
    ListEmptyComponent: <Text style={{ margin: 16, color: '#484848', fontSize: 14 }}>No data to display</Text>,
    ListFooterComponent: <ActivityIndicator style={{ margin: 16, alignSelf: 'center' }} size='large' />,
    ListHeaderComponent: null,
    disableVirtualization: false,
    removeClippedSubviews: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    initialNumToRender: 20,
    maxToRenderPerBatch: 20,
    windowSize: 101,
    fetchData: () => Promise.resolve({ data: [] }),
}

ListView.propTypes = {
    style: ViewPropTypes.style,
    data: PropTypes.array,
    renderItem: PropTypes.oneOf([PropTypes.func, PropTypes.element, PropTypes.object]),
    page: PropTypes.number,
    numColumns: PropTypes.number,
    keyExtractor: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    disableVirtualization: PropTypes.bool,
    removeClippedSubviews: PropTypes.bool,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    initialNumToRender: PropTypes.number,
    maxToRenderPerBatch: PropTypes.number,
    windowSize: PropTypes.number,
    fetchData: PropTypes.func,
    onRefresh: PropTypes.func,
    onLoadmore: PropTypes.func,
}

export default ListView
