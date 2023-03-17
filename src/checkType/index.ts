import checkItem, { AllowedTypes } from './checkItem.js'
const DEFAULT_MESSAGES = {
  typeError: `Expected '{$key}' should be '{$type}'`,
  requiredError: `Value for '{$key}' is required`,
}

type DefaultMessages = Partial<typeof DEFAULT_MESSAGES> & {
  statusCode?: number
}

interface CheckFunction {
  (object: { [index: string]: unknown }, options?: DefaultMessages): void
}

class Check {
  #required: boolean
  constructor(required: boolean) {
    this.#required = required
  }

  #getOptions(type: AllowedTypes, config: DefaultMessages) {
    return {
      ...DEFAULT_MESSAGES,
      ...config,

      required: this.#required,
      type,
    }
  }

  #createTypeChecker(type: AllowedTypes): CheckFunction {
    return (object, options = {}) => {
      checkItem(object, this.#getOptions(type, options))
    }
  }

  string = this.#createTypeChecker(String)
  number = this.#createTypeChecker(Number)
  boolean = this.#createTypeChecker(Boolean)
  array = this.#createTypeChecker(Array)
}

class RequiredCheck extends Check {
  get optional() {
    return new Check(false)
  }

  configure(errorMessages: DefaultMessages) {
    Object.assign(DEFAULT_MESSAGES, errorMessages)
  }
}

export default new RequiredCheck(true)
