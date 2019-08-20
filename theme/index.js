import { StyleSheet } from 'react-native';

import typography from './typography'
import config from './config'

const colors = {
    primary: '#007aff',
    secondary: '#5856d6',
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    greyOutline: '#bbb',
    searchBg: '#303337',
    error: '#ff190c',
    divider: StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
}

const Theme = {
    ...config,
    colors,
    ...typography(config),
    setConfig: function (_config) {
        const theme = typography(_config)
        Object.keys(theme).forEach(key => {
            this[key] = { ...this[key], ...theme[key] }
        })
    },
    setTheme: function (theme) {
        Object.keys(theme).forEach(key => {
            this[key] = { ...this[key], ...theme[key] }
        })
    },
}

export default Theme
