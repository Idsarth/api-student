// Import interfaces
import { IResponse } from '@common/interfaces'

interface IParams {
  data: any
  code: number
  message: string
  url: string
  ok: boolean
}

export class ResponseService {
  public static response(params:IParams): IResponse {
    const { code, data, message, url, ok } = params
    return {
      data,
      status: {
        ok,
        code,
        message
      },
      info: {
        url,
        datetime: new Date(Date.now()).toLocaleString()
      }
    }
  }
}

