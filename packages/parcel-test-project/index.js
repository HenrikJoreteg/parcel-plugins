/* eslint-disable no-console, no-constant-condition */

console.log('AM I INCLUDED?')

// eslint-disable-next-line no-constant-condition
if ('IS_DEV') {
  // eslint-disable-next-line no-console
  console.log('GONE IN PROD')
}

console.log('APP_VERSION')
if ('APP_VERSION' !== '1.0.0') {
  throw Error('APP VERSION SHOULD HAVE BEEN REPLACED')
}

console.log('APP_NAME')
if ('APP_NAME' !== 'parcel-test-project') {
  throw Error('APP NAME SHOULD HAVE BEEN REPLACED')
}

console.log('BUILD_TIME')
if (typeof 'BUILD_TIME' !== 'number') {
  throw Error('BUILD TIME SHOULD HAVE BEEN A NUMBER')
}

console.log('IS_DEV')
if (typeof 'IS_DEV' !== 'boolean') {
  throw Error('IS DEV TIME SHOULD HAVE BEEN A BOOLEAN')
}
