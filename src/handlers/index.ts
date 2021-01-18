// Import interfaces
import { IHandler } from '@common/interfaces'

// Import handlers
import TechHandler from '@modules/tech/tech.handler'
import TaskHandler from '@modules/course/course.handler'
import FileHandler from '@modules/file/file.handler'
import NoteHandler from '@modules/note/note.handler'
import CourseHandler from '@modules/topic/topic.handler'

export const handlers: IHandler[] = [
  TechHandler,
  CourseHandler,
  TaskHandler,
  FileHandler,
  NoteHandler,
]
