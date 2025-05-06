[![Npm Version][npm-version-image]][npm-version-url]
[![Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]

# mui-outlined-phone-input
- Phone number input for React with corresponding country picker
- Styled to match @mui-material outlined textfield

<br>

**Table of Contents**
- [Installation](#item-one)
- [Basic Example](#item-two)
- [Props](#item-three)

<a id="item-one"></a>
## Install
```
npm install mui-outlined-phone-input
```

```
yarn add mui-outlined-phone-input
```

<a id="item-two"></a>
## Example

```js
import { Input as PhoneInput } from 'mui-outlined-phone-input';
import { useState } from 'react';

const Form = () => {
  const [phone, setPhone] = useState('+15045555555');

  return (
    <div>
      <PhoneInput
        value={phone ?? ''}
        onChange={(e: { target: { value: string } }) => setPhone(e?.target?.value ?? '')}
      />
    </div>
  )
}
```

<br />

<a id="item-three"></a>
### Props

| Name                | Type         | Default                 | Description                                                               |
|---------------------|--------------| ----------------------- |---------------------------------------------------------------------------|
| value               | `string`     | ''                      | The initial and or current value                                          |
| onChange            | `function`   | () => {}                | A function to update inputs value                                         |
| label               | `string`     | 'Phone number'          | (optional) The inputs label                                               |
| palceholder         | `string`     | '(504) 555-5555'        | (optional) The inputs placeholder                                         |
| error               | `boolean`    | false                   | (optional) Whether or not to show the input in error state                |
| helperText          | `string`     | ''                      | (optional) Inputs helperText                                              |
| className           | `string`     | ''                      | (optional) Classes to apply to the input                                  |
| wrapperClassName    | `string`     | ''                      | (optional) Classes to apply to the inputs wrapper                         |
| disabled            | `boolean`    | false                   | (optional) Whether or not to disabled the input                           |

<br />

[license-image]: https://img.shields.io/npm/l/mui-outlined-phone-input.svg?color=%23498af2
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/mui-outlined-phone-input.svg?color=%23498af2
[downloads-url]: http://npm-stat.com/charts.html?package=mui-outlined-phone-input
[npm-version-image]: https://img.shields.io/npm/v/mui-outlined-phone-input.svg?color=%23498af2
[npm-version-url]: https://www.npmjs.com/package/mui-outlined-phone-input
