## react-native-styled-elements [Still in development]

## Installation

```
npm install react-native-styled-elements
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

# DropdownMenu

```js
import { DropdownMenu } from 'react-native-styled-elements';

<DropdownMenu
    options={[{ title: '', value: {} }]}
    onOptionSelected={item => {}}
    onClose={}
    buttonTextStyle={}
    renderButton={}
    selectedValue={}
/>
```


```js
import { Icon } from 'react-native-styled-elements';

<Icon
    name='comment-discussion'
    type='octicon'
    size={20}
    color='#000'
/>
```


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