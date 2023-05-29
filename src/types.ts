import handleError from "./handleError";

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
