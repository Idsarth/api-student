import { IsString, IsEnum, IsOptional } from 'class-validator'

// Import enums
import { StatusTask, Platform } from '@common/enums'

export class CreateCourseDto {
  @IsString()
  public name:string

  @IsString()
  @IsOptional()
  public description:string

  @IsString()
  @IsOptional()
  public imageUrl:string

  @IsString()
  @IsEnum(StatusTask)
  @IsOptional()
  public status:string

  @IsString()
  @IsEnum(Platform)
  public platform:Platform
}
