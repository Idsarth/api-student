import { IsString } from 'class-validator'

export class CourseDto {
  @IsString()
  public name:string

  @IsString()
  public imageUrl:string
}