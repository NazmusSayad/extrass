# extrass

Packed with some express utils

<a href="https://npmjs.com/package/extrass">
  <img src="https://img.shields.io/npm/v/extrass" alt="npm package"> 
</a>

## Installation

- with npm

```shell
npm i extrass
```

- with yarn

```shell
yarn add extrass
```

- with pnpm

```shell
pnpm add extrass
```

## Usage

`app.js`

```js
const express = require('express')
const extrass = require('extrass')
/* After importing this, a class named "ReqError" will be global
and everything those are exported from req-error package is also exported here
check https://www.npmjs.com/package/req-error for that
*/

const app = express()

extrass(app, {
  // If any strings provided that will be the route for pinging the server
  ping: '/ping',

  // This will be the res.success method, If you provide here. don't forget to declear it's types manually
  successMethod: function (data) {
    const resData = { status: 'success', data }
    this.json(resData)
    return resData
  },

  // This will be the message
  errorMessages: {
    statusCode: 400,
    notFound: ["Oops, looks like you're lost in space!", 404],
    exceptions: ['Something went very wrong!', 500],
    JSONParse: ['Invalid data recieved', 400],
    jwtExpire: ['Your token is no longer valid', 401],
    jwtInvalid: ['Login credentials are invalid', 401],
    mongoCast: ['Invalid input for `{$}`', 400],
    mongoObjParam: ['Invalid input for `{$}`', 400],
  },

  // Format the Error
  formatError: (error, statusCode) => {
    // If NODE_ENV === 'development'
    // error = {
    //   message: 'Invalid auth token',
    //   error: Error,
    //   stack: Error.stack,
    // }
    //
    // Else:
    // error = {
    //   message: 'Invalid auth token',
    // }

    return {
      status: statusCode < 500 ? 'fail' : 'error',
      ...error,
    }
  },
})

app.listen(/* ... */)
```

## Must watch:

[Checkout 'req-error'](https://www.npmjs.com/package/req-error)
