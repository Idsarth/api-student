import { model, Schema, Document } from 'mongoose'

// Import interfaces
import { ITask } from '../../interfaces'

interface ITaskModel extends ITask, Document {}

export const TaskSchema = new Schema({

})

const Task = model<ITaskModel>('task', TaskSchema)
export default Task
