import { IsString } from 'class-validator'

export class CreateTechDto {
  @IsString()
  public name:string

  @IsString()
  public imageUrl:string

  @IsString()
  public docsUrl:string
}