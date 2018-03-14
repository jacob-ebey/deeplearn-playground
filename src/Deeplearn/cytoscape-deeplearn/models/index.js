import { Clip } from './Clip'
import { DataSource } from './DataSource'
import { FullyConnectedLayer } from './FullyConnectedLayer'
import { PostOp } from './PostOp'
import { Softmax } from './Softmax'

export default [
  new DataSource(),
  new PostOp(),
  new FullyConnectedLayer(),
  new Clip(),
  new Softmax()
]
