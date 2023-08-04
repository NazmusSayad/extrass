import { env, r } from 'rype'

const str = r.noCheck({ abc: r.o.string() })({})

const result = env({
  a: r.string(),
  b: r.string(),
  c: r.number(),
  d: r.number(),
  e: r.o.number(),
})

export default { ...result }
