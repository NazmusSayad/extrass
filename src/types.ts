import { ErrorMessagesOptional, GetErrorInfoHandler } from 'req-error'

export type GetBodyMethod = <T extends string[]>(
  ...props: T
) => Record<T[number], any>

export type DefaultSuccessMethod = <Data extends unknown>(
  data: Data
) => { status: string; data: Data }

export type DefaultErrorMethod = <Info extends { [i: string]: unknown }>(
  message: Info
) => { status: string } & Info

export interface MasterOptions {
  ping?: string
  errorMethod?: DefaultErrorMethod
  successMethod?: DefaultSuccessMethod
  errorMessages?: ErrorMessagesOptional
  errorHandlers?: GetErrorInfoHandler[]
}
