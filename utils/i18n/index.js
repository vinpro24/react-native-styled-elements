import { NativeModules, Platform } from 'react-native'
import { Localization } from 'expo-localization'

//Enable fallbacks if you want`en-US` and`en-GB` to fallback to`en` .settings.AppleLocale.replace(/_/, '-')
//Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier,

let defaultLocale = 'en-US'
if (Localization) {
    defaultLocale = Localization.locale
} else if (Platform.OS === 'ios') {
    if (NativeModules.SettingsManager) {
        defaultLocale = NativeModules.SettingsManager.settings.AppleLocale
    }
} else if (Platform.OS === 'android') {
    defaultLocale = NativeModules.I18nManager.localeIdentifier
}

export default {
    fallbacks: true,
    locale: defaultLocale,
    translations: {},
    getLanguage: function () {
        if (this.fallbacks) return this.locale.replace(/(\s*(-|_).*$)/, '')
        return this.locale
    },
    t: function (key) {
        if (!this.translations[this.locale]) return null
        return this.translations[this.locale][key]
    }
};
