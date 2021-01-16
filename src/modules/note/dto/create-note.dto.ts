import { IsString } from 'class-validator'

export class CreateNoteDto {
  @IsString()
  public name:string

  @IsString()
  public description:string
}
