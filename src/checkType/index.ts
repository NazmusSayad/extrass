import checkItem from './checkItem.js'
import { AllowedTypes, CheckFunction, TypeCheckMessages } from '../types.js'

export const DEFAULT_MESSAGES = {
  typeError: `Expected '{$key}' should be '{$type}'`,
  requiredError: `Value for '{$key}' is required`,
}

class Check {
  #required: boolean
  constructor(required: boolean) {
    this.#required = required
  }

  #getOptions(config: TypeCheckMessages) {
    return {
      ...DEFAULT_MESSAGES,
      ...config,

      required: this.#required,
    }
  }

  #createTypeChecker(type: AllowedTypes): CheckFunction {
    return (object, options = {}) => {
      checkItem(object, { type, ...this.#getOptions(options) })
    }
  }

  string = this.#createTypeChecker(String)
  number = this.#createTypeChecker(Number)
  boolean = this.#createTypeChecker(Boolean)
  array = this.#createTypeChecker(Array)
  arrayOfString = this.#createTypeChecker([String])
  arrayOfNumber = this.#createTypeChecker([Number])
  arrayOfBoolean = this.#createTypeChecker([Boolean])
}

class RequiredCheck extends Check {
  get optional() {
    return new Check(false)
  }

  configure(errorMessages: TypeCheckMessages) {
    Object.assign(DEFAULT_MESSAGES, errorMessages)
  }
}

export default new RequiredCheck(true)
