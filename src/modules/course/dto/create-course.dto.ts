import { IsString } from 'class-validator'

export class CreateCourseDto {
  @IsString()
  public name:string

  @IsString()
  public imageUrl:string
}
