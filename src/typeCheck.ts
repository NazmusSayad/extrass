import ReqError from 'req-error'

export type AllowedTypes =
  | StringConstructor
  | NumberConstructor
  | ArrayConstructor
  | BooleanConstructor

export type TypeCheckInput =
  | {
      [index: string]: any
      type: AllowedTypes
    }
  | {
      [index: string]: any
      required: boolean
    }
  | {
      [index: string]: any
      type: AllowedTypes
      required: boolean
    }

const check = (arg: TypeCheckInput) => {
  const entries = Object.entries(arg).filter(
    ([key]) => !(key === 'type' || key === 'required')
  )

  entries.forEach(([key, value]) => {
    if (arg.required !== false && (value == null || value === '')) {
      throw new ReqError(`'${key}' field is mising`)
    }

    switch (arg.type) {
      case String:
        if (!(typeof value === 'string' || value instanceof String)) {
          throw new ReqError(`'${key}' must be a string`)
        }
        break

      case Number:
        if (!(typeof value === 'number' || value instanceof Number)) {
          throw new ReqError(`'${key}' must be a number`)
        }
        break

      case Boolean:
        if (!(typeof value === 'boolean' || value instanceof Boolean)) {
          throw new ReqError(`'${key}' must be a boolean`)
        }
        break

      case Array:
        if (!(Array.isArray(value) || value instanceof Array)) {
          throw new ReqError(`'${key}' must be an array`)
        }
        break
    }
  })
}

export default (...args: Parameters<typeof check>[0][]) => args.forEach(check)
