# parcel-transformer-vars

![](https://img.shields.io/npm/dm/parcel-transformer-vars.svg)![](https://img.shields.io/npm/v/parcel-transformer-vars.svg)![](https://img.shields.io/npm/l/parcel-transformer-vars.svg)

A [Parcel 2.0+](https://parceljs.org/) plugin for injecting variables based on a JS config.

## Why I made this:

I want to be able to easily inject variable values into my JS that are dynamic to the environment and easily grab things like version numbers from the package.json without having my app require it directly and potentially including more than I want.

I want these variables to be able to exist anywhere in my JS and I want them to be injected as the right _type_ of value based on the type that the value is in my config.

For example if you define the following vars object;

```js
const pkg = require('./package.json')

module.exports = {
  APP_VERSION: pkg.version,
  BUILD_TIME: Date.now(),
  IS_AWESOME: true,
}
```

**Examples:**

```js
// will also replace quotes so it will evaluate to 'number'
// after being replaced.
console.log(typeof 'BUILD_TIME')
// This will stay a string because the value is a string
console.log(typeof 'APP_VERSION')
// This will become a boolean (removing quotes)
console.log(typeof 'IS_AWESOME')
```

## How to use it

Create a `.varsrc.js` config at the root of your directory. It should contain something like this:

```js
const pkg = require('./package.json')

module.exports = {
  // grab version from package.json
  APP_VERSION: pkg.version,
  // grab app name from package.json
  APP_NAME: pkg.name,
  // some other thing
  API_URL: process.env.API_URL || 'https://dev.api.com',
  // this one will be a boolean that will be `false` when you run `parcel build`
  IS_DEV: process.env.NODE_ENV !== 'production',
}
```

Then, you must tell parcel to use the plugin. So you create / edit your `.parcelrc` as follows:

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.js": ["parcel-transformer-vars", "..."]
  }
}
```

**Note**: the `"..."` is important it tells parcel to do this _first_ before the other stuff it would normally do.

If with that `.varsrc.js` and `.parcelrc` when you use Parcel in dev server or build mode this plugin will inject variables.

So, this:

```js
if ('IS_DEV') {
  console.log('This whole block will be totally gone when running parcel build')
}
```

**Please note**: this also works in inline JS you have in your HTML.

## tests

See `packages/parcel-test-project`

## install

```
npm install parcel-transformer-vars
```

## Change log

- `1.0.1`: Adding check in case plugin config is not defined yet
- `1.0.0`: First public release.

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

[MIT](http://mit.joreteg.com/)
