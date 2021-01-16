// Import interfaces
import { IHandler } from '@common/interfaces'

// Import handlers
// import TechHandler from '../modules/tech/tech.handler'
// import CourseHandler from '../modules/course/course.handler'
// import TaskHandler from '../modules/task/task.handler'
import FileHandler from '@modules/file/file.handler'

export const handlers: IHandler[] = [
  // CourseHandler, 
  // TaskHandler, 
  // TechHandler,
  FileHandler
]