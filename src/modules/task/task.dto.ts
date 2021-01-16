import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator'

// Import enums
import { StatusTask, Platform } from '@common/enums'

export class CreateTaskDto {
  @IsString()
  public name:string

  @IsString()
  @IsOptional()
  public description:string

  @IsString()
  @IsOptional()
  public imageUrl:string

  @IsString()
  @IsEnum(Platform)
  public platform:Platform
  
  @IsString()
  @IsEnum(StatusTask)
  @IsOptional()
  public status:string
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  public name:string
  
  @IsString()
  @IsOptional()
  public description:string
  
  @IsString()
  @IsOptional()
  public imageUrl:string
  
  @IsString()
  @IsEnum(Platform)
  @IsOptional()
  public platform:Platform
  
  @IsString()
  @IsEnum(StatusTask)
  @IsOptional()
  public status:string

  @IsBoolean()
  @IsOptional()
  public isActive: boolean
}