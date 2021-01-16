import { IsString } from 'class-validator'

export class SigninDto {
  @IsString()
  public email:string

  @IsString()
  public password:string
}
