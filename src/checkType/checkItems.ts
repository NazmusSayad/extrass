import ReqError from 'req-error'

const messages = {
  type: '{$key} should be {$type}',
  required: '{$key} is missing',
}

const throwRequiredMessage = (key: string) => {
  throw new ReqError(messages.required.replace(/{\$key}/gim, key))
}
const throwTypeMessage = (key: string, type: string) => {
  throw new ReqError(
    messages.type.replace(/{\$key}/gim, key).replace(/{\$type}/gim, type)
  )
}

const checkSingle = (
  object: CheckTypeInput,
  { type, required }: CheckOptions
) => {
  const entries = Object.entries(object).filter(
    ([key]) => !(key === 'type' || key === 'required')
  )

  entries.forEach(([key, value]) => {
    if (required !== false && (value == null || value === '')) {
      throwRequiredMessage(key)
    }

    switch (type) {
      case String:
        if (!(typeof value === 'string' || value instanceof String)) {
          throwTypeMessage(key, 'string')
        }
        break

      case Number:
        if (!(typeof value === 'number' || value instanceof Number)) {
          throwTypeMessage(key, 'number')
        }
        break

      case Boolean:
        if (!(typeof value === 'boolean' || value instanceof Boolean)) {
          throwTypeMessage(key, 'boolean')
        }
        break

      case Array:
        if (!(Array.isArray(value) || value instanceof Array)) {
          throwTypeMessage(key, 'array')
        }
        break
    }
  })
}

export default (objects: CheckTypeInput[], options: CheckOptions) => {
  objects.forEach((obj) => checkSingle(obj, options))
}
export const configureTypeCheck = (errMessages: Partial<typeof messages>) => {
  Object.assign(messages, errMessages)
}

interface CheckOptions {
  type: AllowedTypes
  required: boolean
}

export type AllowedTypes =
  | StringConstructor
  | NumberConstructor
  | ArrayConstructor
  | BooleanConstructor

export interface CheckTypeInput {
  [index: string]: unknown
}
