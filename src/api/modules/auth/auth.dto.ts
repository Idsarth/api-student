import { IsString } from 'class-validator'

export class AuthDto {
  @IsString()
  public email:string

  @IsString()
  public password:string
}