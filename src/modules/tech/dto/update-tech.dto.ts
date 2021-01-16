import { IsOptional, IsString, IsBoolean } from 'class-validator'

export class UpdateTechDto {
  @IsString()
  @IsOptional()
  public name:string

  @IsString()
  @IsOptional()
  public imageUrl:string

  @IsString()
  @IsOptional()
  public docsUrl:string

  @IsBoolean()
  @IsOptional()
  public isActive:boolean
}
