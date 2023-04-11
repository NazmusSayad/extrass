import * as utils from '../utils'
import { TypeCheckOptions } from '../types'
interface AnyObject {
  [index: string]: unknown
}

export default (object: AnyObject, conf: TypeCheckOptions) => {
  for (let key in object) {
    checkSingleItem(key, object[key], conf)
  }
}

const checkSingleItem = (key: string, value, conf: TypeCheckOptions) => {
  if (conf.required === false && value === undefined) return
  if (conf.required === true && utils.isNotExists(value)) {
    throw new ReqError(
      conf.requiredError.replace(/{\$key}/gim, key),
      conf.statusCode
    )
  }

  // Check value type
  const throwTypeError = (type: string) => {
    throw new ReqError(
      conf.typeError.replace(/{\$key}/gim, key).replace(/{\$type}/gim, type),
      conf.statusCode
    )
  }

  const isResolved = checkValueType(conf.type, value, throwTypeError)
  if (isResolved === false && utils.isArray(conf.type)) {
    /* Just check if the value is an array */
    checkValueType(Array, value, throwTypeError)

    /* Check every element of the value */
    const childType = conf.type[0]
    value.forEach((value) => {
      checkValueType(childType, value, throwTypeError, true)
    })
  }
}

const checkValueType = (type, value, typeError: Function, isChild = false) => {
  switch (type) {
    case Array:
      if (utils.isArray(value)) return
      /* array isn't availabe in child mode */
      typeError('array')

    case String:
      if (utils.isString(value)) return
      typeError(isChild ? 'array of string' : 'string')

    case Number:
      if (utils.isNumber(value)) return
      typeError(isChild ? 'array of number' : 'number')

    case Boolean:
      if (utils.isBoolean(value)) return
      typeError(isChild ? 'array of boolean' : 'boolean')
  }

  return false
}
