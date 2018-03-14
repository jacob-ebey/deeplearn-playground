import { ArgMax } from './ArgMax'
import { BooleanClip } from './BooleanClip'
import { Clip } from './Clip'
import { DataSource } from './DataSource'
import { FullyConnectedLayer } from './FullyConnectedLayer'
import { PostOp } from './PostOp'
import { Softmax } from './Softmax'

export default [
  new DataSource(),
  new PostOp(),
  new FullyConnectedLayer(),
  new ArgMax(),
  new BooleanClip(),
  new Clip(),
  new Softmax()
]
