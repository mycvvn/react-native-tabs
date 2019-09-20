## Demo
<img src="https://raw.githubusercontent.com/mycvvn/react-native-tabs/master/demo/demo.gif" width="360">

## Installation
Yarn:
```sh
$ npm i @tickid/react-native-tabs --save
```
or NPM:
```sh
$ yarn add @tickid/react-native-tabs
```

## Usage
Sample code to use this simple library:
```jsx
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Tabs, Tab } from '@tickid/react-native-tabs';

export default class TabsExample extends Component {
  render() {
    return (
      <Tabs>
        <Tab heading="Tab one">
          <Text>Content of #tabOne</Text>
        </Tab>

        <Tab heading="Tab two">
          <Text>Content of #tabTwo</Text>
        </Tab>

        <Tab heading="Tab three">
          <Text>Content of #tabThree</Text>
        </Tab>
      </Tabs>
    );
  }
}
```

## Props:

## <Tabs>
| Property | Type | Default | Description |
|-------------|----------|--------------|----------------------------------------------------------------|
| `tabIndex`     | `Number` | `0` | The default tab index is active. (optional)|
| `tabChangeDuration`     | `Number` | `100` | Slider speed in milliseconds. (optional)|
| `activeTabTitleStyle`     | `Style` |  | Style applied to active tab title. (optional)|
| `tabContainerStyle`     | `Style` |  | Style applied to tab container. (optional)|
| `activeTabContainerStyle`     | `Style` |  | Style applied to active tab container. (optional)|
| `tabBodyStyle`     | `Style` |  | Style applied to tab body (Wrap <Tab>). (optional)|
| `onChangeTab`     | `Function` |  | Called when the tab change. (optional)|
| `activeLineColor`     | `String` | `#355587` | Specifies the background color for active tab. (optional)|


## <Tab>
| Property | Type | Default | Description |
|-------------|----------|--------------|----------------------------------------------------------------|
| `heading`     | `String` |  | The title of the tab. (required)|
| `containerStyle`     | `Style` |  | Styles are applied individually to each tab. (optional)|