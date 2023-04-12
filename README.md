# express-master

Packed with some express utils

<a href="https://npmjs.com/package/express-master">
  <img src="https://img.shields.io/npm/v/express-master" alt="npm package"> 
</a>

## Installation

- with npm

```shell
npm i express-master req-error
```

- with yarn

```shell
yarn add express-master req-error
```

- with pnpm

```shell
pnpm add express-master req-error
```

## Usage

`app.js`

```js
const express = require('express')
const master = require('express-master').default
/* After importing this, a class named "ReqError" will be global 
check https://www.npmjs.com/package/req-error for that
*/

const app = express()

master(app, {
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

`controller.js`

```ts
import { checkType } from 'express-master'

const handleSuccess = (req, res) => {
  res.success({ user: { name: 'John Doe' } })
}

const handleSomething = (req, res) => {
  const stringBody = req.getBody('name', 'username', 'imageURL')
  const numberBody = req.getBody('age', 'rating', 'salary')
  const booleanBody = req.getBody('isMuslim', 'isLovely')
  const arrayBody = req.getBody('hobbies', 'children', 'friends')
  const arrayOfStringBody = req.getBody('hobbies', 'children', 'friends')
  const arrayOfNumberBody = req.getBody('ageList', 'salaryList')
  const arrayOfBooleanBody = req.getBody('binary', 'justTrueFalseArray')

  // Basic:
  checkType.string({ key: 'value', key2: 'value2' })

  // Advanced:
  checkType.string(stringBody)
  checkType.number(numberBody)
  checkType.boolean(booleanBody)
  checkType.array(arrayBody)
  checkType.arrayOfString(arrayOfStringBody)
  checkType.arrayOfNumber(arrayOfNumberBody)
  checkType.arrayOfBoolean(arrayOfBooleanBody)

  // This just skips type check if the value is undefined
  checkType.optional.string(stringBody)
  checkType.optional.number(numberBody)
  checkType.optional.boolean(booleanBody)
  checkType.optional.array(arrayBody)
  checkType.optional.arrayOfString(arrayOfStringBody)
  checkType.optional.arrayOfNumber(arrayOfNumberBody)
  checkType.optional.arrayOfBoolean(arrayOfBooleanBody)
}
```
