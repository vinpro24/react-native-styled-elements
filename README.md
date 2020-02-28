## react-native-styled-elements [Still in development]

## Installation

```
npm install react-native-styled-elements
```

# DefaultTextProps, DefaultTextStyle

```js
import { Theme } from 'react-native-styled-elements';

Theme.set({ 
    colors: {
        primary: '#6200ee',
        secondary: '#03dac5',
        accent: '#03dac4',
        background: '#f6f6f6',
        surface: '#ffffff',
        error: '#B00020',
        text: '#000000',
        onBackground: '#000000',
        onSurface: '#000000',
        disabled: 'rgba(0,0,0,0.26)',
        disabledBackgroundColor: '#D1D5D8',
        placeholder: 'rgba(0,0,0,0.54)',
        backdrop: 'rgba(0,0,0,0.5)',
        notification: '#F50057',
    }
})
Theme.setFontFamily('FontName')

<Text style={Theme.heading}>heading</Text>
<Text style={Theme.title}>title</Text>
<Text style={Theme.subtitle}>subtitle</Text>
<Text style={Theme.text}>text</Text>
<Text style={Theme.footnote}>footnote</Text>
<Text style={Theme.caption}>caption</Text>

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

const fetchData = ({ data, page, perPage }) => {
    return callAPI({ page, perPage }).then(res => {
        return { data: [...data, res.data], page: page + 1, total: res.total }
    })
}

<ListView
    data={fetchData}
    renderItem={({ item, index }) => {}}
    keyExtractor={i => i.id}
    page={1}
    perPage={10}
/>
```

## ListItem
```js
import { ListItem } from 'react-native-styled-elements';

<ListItem
    title="Title"
    subtitle="SubTitle"
/>
```


## Rating
```js
import { Rating } from 'react-native-styled-elements';

<Rating
    max={5}
    size={16}
    value={4.5}
    color={'#FFAB40'}
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

# ParallaxScrollView

```js
import { ParallaxScrollView } from 'react-native-styled-elements';

<ParallaxScrollView
    style={{}}
    renderForeground={<View />}
    parallaxHeaderHeight={150}
>
    ...rest of your component
</ParallaxScrollView>
```
