import { NativeModules, Platform } from 'react-native'

//Enable fallbacks if you want`en-US` and`en-GB` to fallback to`en` .settings.AppleLocale.replace(/_/, '-')

function getDeviceLocale() {
    try {
        const expoLocal = require.resolve('expo-localization')
        if (expoLocal && expoLocal.Localization) {
            return expoLocal.Localization.locale
        } else {
            throw Error('expo-localization is not found')
        }
    } catch (e) {
        if (Platform.OS === 'ios') {
            if (NativeModules.SettingsManager) {
                return NativeModules.SettingsManager.settings.AppleLocale
            }
        } else if (Platform.OS === 'android') {
            return NativeModules.I18nManager.localeIdentifier
        }
        return 'en-US'
    }

}

export default {
    fallbacks: true,
    locale: getDeviceLocale(),
    defaultLocale: 'en-US',
    translations: {},
    getLanguage: function () {
        if (this.fallbacks) return this.locale.replace(/(\s*(-|_).*$)/, '')
        return this.locale
    },
    getDefaultLanguage: function () {
        if (this.fallbacks) return this.defaultLocale.replace(/(\s*(-|_).*$)/, '')
        return this.defaultLocale
    },
    t: function (key, param) {
        if (!this.translations[this.getLanguage()]) {
            if (this.translations[this.getDefaultLanguage()]) {
                let text = this.translations[this.getDefaultLanguage()][key]
                if (param) {
                    Object.keys(param).forEach(i => {
                        text = text.split('[' + i + ']').join(param[i])
                    })
                }
                return text
            }
            return null
        }
        let text = this.translations[this.getLanguage()][key]
        if (param) {
            Object.keys(param).forEach(i => {
                text = text.split('[' + i + ']').join(param[i])
            })
        }
        return text
    }
};
