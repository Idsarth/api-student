// Import interfaces
import { IHandler } from './interfaces'

// Import handlers
import TechHandler from './modules/tech/tech.handler'
import CourseHandler from './modules/course/course.handler'

export const handlers: IHandler[] = [CourseHandler]
