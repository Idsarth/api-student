import { IsString, IsOptional } from 'class-validator'

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  public name:string

  @IsString()
  @IsOptional()
  public description:string
}
