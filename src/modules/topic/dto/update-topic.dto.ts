import { IsString, IsOptional } from 'class-validator'

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  public name:string

  @IsString()
  @IsOptional()
  public imageUrl:string
}
