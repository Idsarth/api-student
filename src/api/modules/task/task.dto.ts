import { IsString, IsEnum, IsOptional } from 'class-validator'

enum PLATFORM { PLATZI = 'PLATZI', UDEMY = 'UDEMY', EDTEAM = 'EDTEAM', YOUTUBE = 'YOUTUBE' }
export class CreateTaskDto {
  @IsString()
  public name:string

  @IsString()
  @IsOptional()
  public description:string

  @IsString()
  @IsOptional()
  public imageUrl:string

  @IsEnum(PLATFORM)
  public platform:PLATFORM
}