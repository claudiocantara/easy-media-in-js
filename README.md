# `Easy Media In Js`
[![npm version](https://badge.fury.io/js/easy-media-in-js.svg)](https://badge.fury.io/js/easy-media-in-js)
![core size](https://img.shields.io/bundlephobia/min/easy-media-in-js?label=core%20size)
![core gzip size](https://img.shields.io/bundlephobia/minzip/easy-media-in-js.svg?label=core%20gzip%20size)

## Demo 
[👀 Demo Sandbox](https://codesandbox.io/s/easy-css-in-js-cgidd)

## Descrition
Working with media query can be a mess, to solve thois problem I created this small library based on the ideas included in the  Google's Material Design design system, in an effort to handle the most common breakpoint sizes. This library works exclusively with CSS-in-JS solutions, such as Emotion and Styled Components.

This imagem show the possible breakpoints.

<img srcset="https://miro.medium.com/max/552/1*AyDtnhKNPvTsHMESCSqprw.png 276w, https://miro.medium.com/max/1104/1*AyDtnhKNPvTsHMESCSqprw.png 552w, https://miro.medium.com/max/1280/1*AyDtnhKNPvTsHMESCSqprw.png 640w, https://miro.medium.com/max/1456/1*AyDtnhKNPvTsHMESCSqprw.png 728w, https://miro.medium.com/max/1632/1*AyDtnhKNPvTsHMESCSqprw.png 816w, https://miro.medium.com/max/1808/1*AyDtnhKNPvTsHMESCSqprw.png 904w, https://miro.medium.com/max/1984/1*AyDtnhKNPvTsHMESCSqprw.png 992w, https://miro.medium.com/max/2000/1*AyDtnhKNPvTsHMESCSqprw.png 1000w" sizes="1000px" role="presentation" src="https://miro.medium.com/max/1920/1*AyDtnhKNPvTsHMESCSqprw.png">

Well, it's imposible to cover all the the use cases. Based on this guide a few widely used breakpoints were chosen:

```js
const sizes = {
  smallPhone: 300, // To Handle with phones like Iphone 5S
  phone: 600,
  tablet: 960,
  desktop: 1280, 
  largeDesktop: 1600 
}
```

You can override the rules or create your own, just use `setSizes()`.

```jsx

import useMedia, { setSizes } from 'easy-media-in-js'
// Use With Emotion
import styled from '@emotion/styled';
// Use With Styled Components
import styled from 'styled-components';

setSites({
  smallPhone: 300, // To Handle phones like Iphone 5S
  phone: 600,
  tablet: 960,
  desktop: 1280, 
  largeDesktop: 1600,
  customBreakpoint: 1800
})

// and use it like this: 

const Element = styled.div`
  ${useMedia('customBreapoint')} {
    [css property] : [property value];
  }
`
```

## Install 

Yarn
```bash
  yarn add easy-media-in-js
```
NPM
```bash
  npm install easy-media-in-js --save-dev
```

## Usage

Import the modules inside your file: 

```jsx
import useMedia from 'easy-media-in-js'
// Use With Emotion
import styled from '@emotion/styled';
// Use With Styled Components
import styled from 'styled-components';

const Element = styled.div`
  ${useMedia('phone')} {
    border: 1px solid red;
  }
`
```

Output 
```css
  @media (min-width: 600px) {
    border: 1px solid red;
  }
```

### Possibilities

```jsx
import useMedia from 'easy-media-in-js'
// Use With Emotion
import styled from '@emotion/styled';
// Use With Styled Components
import styled from 'styled-components';

const Element = styled.div`
  
  ${useMedia('<= phone')} {
    border: 1px solid red;
  }  

  ${useMedia('phone')} {
    border: 1px solid red;
  }

  ${useMedia('phone  < tablet')} {
    border: 1px solid red;
  }
  ${useMedia('phone  < tablet < desktop < largeDesktop')} {
    border: 1px solid red;
  }
  
`
```
Outputs: 

```css
  
  @media (max-width: 599px) {
    border: 1px solid red;
  }

  @media (min-width: 600px) {
    border: 1px solid red;
  }

  @media (min-width: 600px) and (min-width: 960px) {
  border: 1px solid red;
}

@media (min-width: 600px) and (min-width: 960px) and (min-width: 1600px) {
  border: 1px solid red;
}

```



