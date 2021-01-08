import { IsString } from 'class-validator'

export class TechDto {
  @IsString()
  public name:string

  @IsString()
  public imageUrl:string

  @IsString()
  public docsUrl:string
}