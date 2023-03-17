export interface CheckOptions {
  type: AllowedTypes
  required: boolean
  typeError: string
  requiredError: string
  statusCode?: number
}

export type AllowedTypes =
  | StringConstructor
  | NumberConstructor
  | ArrayConstructor
  | BooleanConstructor

export interface CheckTypeInput {
  [index: string]: unknown
}

export default (object: CheckTypeInput, conf: CheckOptions) => {
  const entries = Object.entries(object).filter(
    ([key]) => !(key === 'type' || key === 'required')
  )

  entries.forEach(([key, value]) => {
    const throwRequiredError = () => {
      throw new ReqError(
        conf.requiredError.replace(/{\$key}/gim, key),
        conf.statusCode
      )
    }

    const throwTypeError = (type) => {
      throw new ReqError(
        conf.typeError.replace(/{\$key}/gim, key).replace(/{\$type}/gim, type),
        conf.statusCode
      )
    }

    if (conf.required === false && value === undefined) return
    if (
      conf.required === true &&
      (value == null || value === '' || Number.isNaN(value))
    ) {
      throwRequiredError()
    }

    switch (conf.type) {
      case String:
        if (!(typeof value === 'string' || value instanceof String)) {
          throwTypeError('string')
        }
        break

      case Number:
        if (!(typeof value === 'number' || value instanceof Number)) {
          throwTypeError('number')
        }
        break

      case Boolean:
        if (!(typeof value === 'boolean' || value instanceof Boolean)) {
          throwTypeError('boolean')
        }
        break

      case Array:
        if (!(Array.isArray(value) || value instanceof Array)) {
          throwTypeError('array')
        }
        break
    }
  })
}
