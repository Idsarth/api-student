export interface IResponse {
  data: any
  status: {
    ok: boolean
    code: number
    message: string
  }
  info: {
    url: string
    datetime: string
  }
}