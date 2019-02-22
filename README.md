## react-native-styled-elements [Still in development]

## Installation

```
npm install react-native-styled-elements
```

# DefaultTextProps, DefaultTextStyle

```js
import { setDefaultTextProps, setDefaultTextStyle } from 'react-native-styled-elements';

setDefaultTextProps(textProps)
setDefaultTextStyle(textStyle)
```

#  I18n translations
Get the user preferred languages and use the library of your choice to translate your app. Uses the user preferred locale as default.

```js
import { i18n } from 'react-native-styled-elements';

//Enable fallbacks if you want`en-US` and`en-GB` to fallback to`en`
i18n.fallbacks = true
i18n.locale = 'en'
i18n.translations = {
    en: { welcome: 'Hello' }
}
i18n.getLanguage() // or i18n.locale
console.log(i18n.t('welcome'))
```

# UpDownPuller

```js
import { UpDownPuller } from 'react-native-styled-elements';

<UpDownPuller
    miniHeight={210}
    top={80}
    containerStyle={}
    onPullDown={}
    onPullUp={}
>
    ...rest of your component
</UpDownPuller>
```

## DropdownMenu

```js
import { DropDownMenu } from 'react-native-styled-elements';

<DropDownMenu
    options={[{ title: '', value: {} }]}
    onOptionSelected={item => {}}
    onClose={}
    buttonTextStyle={}
    renderButton={}
    selectedValue={}
/>
```


## Icon
You have to install [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

```js
import { Icon } from 'react-native-styled-elements';

<Icon
    name='comment-discussion'
    type='OcticonIcon'
    size={20}
    color='#000'
    onPress={() => {}}
/>
```

## Button
```js
import { Button } from 'react-native-styled-elements';

<Button
    title=""
    containerStyle={}
    titleStyle={}
    disabled={true/false}
    onPress={}
/>
```

## ListView
```js
import { ListView } from 'react-native-styled-elements';

<ListView
    data={this.state.data}
    renderItem={({ item, index }) => {}}
    keyExtractor={i => i.id}
    page={1}
    perPage={10}
    fetchData={({ page }, onSuccess, onError) => {}}
/>
```

## SwipeableItem
```js
import { SwipeableItem } from 'react-native-styled-elements';

<SwipeableItem
    renderLeft={}
    renderRight={}
    style={}
/>
```

## KeyboardSpacer
```js
import { KeyboardSpacer } from 'react-native-styled-elements';

<KeyboardSpacer />
```
