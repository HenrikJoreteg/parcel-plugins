# parcel-optimizer-csp

![](https://img.shields.io/npm/dm/parcel-optimizer-csp.svg)![](https://img.shields.io/npm/v/parcel-optimizer-csp.svg)![](https://img.shields.io/npm/l/parcel-optimizer-csp.svg)

A [Parcel 2.0+](https://parceljs.org/) plugin for generating and inserting a CSP based on a super simple JSON config.

It automatically calculates a hash for your inline scripts and appends that to the `script-src` in the CSP so that browsers will run it.

## Why I made this:

We have an inline script for [Xchart.com](https://xchart.com/) that registers global error handlers. We do this as inline script, because if there's an error with loading a JS file required to run the app we want to know about it.

Another common reason would be inline scripts inserted for analytics.

**BUT** we're using a Content Security Policy (CSP) to prevent malicious scripts from being injected in any way.

CSP's `script-src` is one of the main reasons to use a CSP. [It specifies _valid_ sources for JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) and so, can completely prevent XSS (Cross-site scripting).

But, one of the tricky things people quickly notice is that if you have an inline snippet in the HTML that you pass to Parcel, like this:

```html
<script>
  console.log('I might be an analytics snippet or something')
</script>
```

This code will not run when you've specified a `script-src` unless you've listed: `'unsafe-inline'` which... kind of negates the whole point of setting a `script-src` to begin with.

If you're using CSP to prevent injected scripts, you can either specify a `nonce` or a hash of all the allowed scripts. A `nonce` is supposed to be unique from the server for each render, that doesn't work so well if you are building a PWA or static site (JAM Stack) when you may not have a server rendering on each request.

The other option is to calculate and specify a hash of each inline script that is allows to run: **That's the main reason this plugin exists**.

## Why is it an Optimizer plugin?

It's very important that this happens _last_ because if there's anything else that modifies the contents between the opening and closing `<script>` the hash would be different. So using the "optimize" stage made sense.

## How to use it

Create a `.csprc` config at the root of your directory. It should contain something like this:

`script-src` is the only one that gets processed at all. Any other keys you specify are simply used to generate the final CSP string.

```json
{
  "script-src": ["'self'", "polyfill.io"],
  "object-src": "'none'",
  "base-uri": "'none'"
}
```

Then, you must tell parcel to use the plugin. So you create / edit your `.parcelrc` as follows:

```json
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.html": ["...", "parcel-optimizer-csp"]
  }
}
```

**Note**: the `"..."` is important it tells parcel to do all the other stuff it would normally to do optimize. This just tacks on our new plugin at the end.

If with that `.csprc` and `.parcelrc` when you use Parcel to build your project for production this plugin will inject prepend the following CSP into the `<head>` your final HTML:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' polyfill.io 'sha256-uhzHJtYe3+WE2TVTxNYzdpz1n2axTAdgGXDltcHRQvc='; object-src 'none'; base-uri 'none';"
/>
```

**Please note**: certain CSP values need to be in single quotes. For example: `'self'` and `'none'`. This plugin does not attempt to quote them for you. It simply inserts them the way you've specified them.

## Running tests

```
npm test
```

## install

```
npm install parcel-optimizer-csp
```

## Change log

- `1.0.0`: First public release.

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

[MIT](http://mit.joreteg.com/)
