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
    translations: {},
    getLanguage: function () {
        if (this.fallbacks) return this.locale.replace(/(\s*(-|_).*$)/, '')
        return this.locale
    },
    t: function (key) {
        if (!this.translations[this.getLanguage()]) return null
        return this.translations[this.getLanguage()][key]
    }
};
