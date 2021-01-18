import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator'

// Import enums
import { StatusTask, Platform } from '@common/enums'

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  public name:string

  @IsString()
  @IsOptional()
  public description:string

  @IsString()
  @IsOptional()
  public imageUrl:string

  @IsBoolean()
  @IsOptional()
  public isActive:boolean

  @IsBoolean()
  @IsOptional()
  public completed:boolean

  @IsString()
  @IsEnum(StatusTask)
  @IsOptional()
  public status:string

  @IsString()
  @IsEnum(Platform)
  @IsOptional()
  public platform:Platform
}
