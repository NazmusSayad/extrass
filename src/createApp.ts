import express, { Express } from 'express'
import expressUtils, { ConfigOptions } from './expressUtils'

export default (arg?: ConfigOptions): Express => {
  return expressUtils(express(), arg)
}
