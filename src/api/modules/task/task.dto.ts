import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator'

export enum PLATFORM { PLATZI = 'PLATZI', UDEMY = 'UDEMY', EDTEAM = 'EDTEAM', YOUTUBE = 'YOUTUBE' }
export enum STATUS {CURRENT = 'CURRENT', PENDING = 'PENDING', COMPLETED = 'COMPLETED'}
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
  @IsEnum(PLATFORM)
  public platform:PLATFORM
  
  @IsString()
  @IsEnum(STATUS)
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
  @IsEnum(PLATFORM)
  @IsOptional()
  public platform:PLATFORM
  
  @IsString()
  @IsEnum(STATUS)
  @IsOptional()
  public status:string

  @IsBoolean()
  @IsOptional()
  public isActive: boolean
}