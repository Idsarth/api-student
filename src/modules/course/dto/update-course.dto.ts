import { IsString, IsOptional } from 'class-validator'

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  public name:string

  @IsString()
  @IsOptional()
  public imageUrl:string
}
