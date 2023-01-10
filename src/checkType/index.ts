import checkItems, {
  CheckTypeInput,
  configureTypeCheck,
  AllowedTypes,
} from './checkItems.js'

class Check {
  #required: boolean
  constructor(required: boolean) {
    this.#required = required
  }

  string(...args: CheckTypeInput[]) {
    checkItems(args, { type: String, required: this.#required })
  }

  number(...args: CheckTypeInput[]) {
    checkItems(args, { type: Number, required: this.#required })
  }

  boolean(...args: CheckTypeInput[]) {
    checkItems(args, { type: Boolean, required: this.#required })
  }

  array(...args: CheckTypeInput[]) {
    checkItems(args, { type: Array, required: this.#required })
  }
}

class RequiredCheck extends Check {
  get optional() {
    return new Check(false)
  }
}

export default new RequiredCheck(true)
export { configureTypeCheck, AllowedTypes }
