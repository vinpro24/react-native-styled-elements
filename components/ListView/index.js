import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default class ListView extends Component {
    static propTypes = {
        data: PropTypes.array,
        renderItem: PropTypes.func,
        keyExtractor: PropTypes.func,
        fetchData: PropTypes.func,
        page: PropTypes.number,
        perPage: PropTypes.number,
        ListEmptyComponent: PropTypes.element
    }

    static defaultProps = {
        data: [],
        keyExtractor: (item) => item.id || item._id,
        fetchData: () => { },
        page: 1,
        perPage: 10,
        ListEmptyComponent: <Text style={{ textAlign: 'center', margin: 60 }}>No items.</Text>
    }

    state = {
        data: this.props.data,
        page: this.props.page,
        isRefreshing: true,
        isLoadmore: false
    }

    componentWillMount() {
        this.fetchData(this.state.page)
    }

    fetchData = (page) => {
        this.props.fetchData({ page, data: this.state.data }, data => {
            const nextPage = data.length > this.state.data.length ? page + 1 : page
            this.setState({
                data,
                page: nextPage,
                isRefreshing: false,
                isLoadmore: false
            })
        }, error => {
            this.setState({
                isRefreshing: false,
                isLoadmore: false
            })
        })
    }

    onLoadmore = () => {
        if (!this.state.isLoadmore && this.state.data.length % this.props.perPage === 0) {
            this.state.isLoadmore = true
            this.fetchData(this.state.page)
        }

    }

    onRefresh = () => {
        if (!this.state.isRefreshing) {
            this.setState({ isRefreshing: true }, () => {
                this.fetchData(1)
            })
        }
    }

    render() {
        const { isRefreshing, data } = this.state
        return (
            <FlatList
                style={{ flex: 1 }}
                extraData={this.state}
                data={data}
                renderItem={this.props.renderItem}
                keyExtractor={this.props.keyExtractor}
                onRefresh={this.onRefresh}
                refreshing={isRefreshing}
                onEndReachedThreshold={0.7}
                onEndReached={this.onLoadmore}
                ListEmptyComponent={!isRefreshing ? this.props.ListEmptyComponent : null}
            />
        )
    }
}
