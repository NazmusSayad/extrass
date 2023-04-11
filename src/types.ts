import { handleError } from 'req-error'
import { DEFAULT_MESSAGES } from './checkType'

export type GetBodyMethod = <T extends string[]>(
  ...props: T
) => Record<T[number], any>

export type DefaultSussessMethod = <Data extends unknown>(
  data: Data
) => { status: string; data: Data }

export interface MasterOptions {
  ping?: string
  successMethod?: DefaultSussessMethod
  errorMessages?: Parameters<typeof handleError>[1]
  formatError?: Parameters<typeof handleError>[2]
}

export type TypeCheckMessages = Partial<typeof DEFAULT_MESSAGES> & {
  statusCode?: number
}

export type CheckFunction = (
  object: { [index: string]: unknown },
  options?: TypeCheckMessages
) => void

export interface TypeCheckOptions {
  type: AllowedTypes
  required: boolean
  typeError: string
  requiredError: string
  statusCode?: number
}

export type AllowedTypes =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ArrayConstructor
  | [StringConstructor]
  | [NumberConstructor]
  | [BooleanConstructor]
