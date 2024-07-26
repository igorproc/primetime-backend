// Node Deps
import { Logger } from '@nestjs/common'
import axios, { AxiosHeaders, AxiosInstance, Method } from 'axios'

type InstancePayload = {
  apiUrl: string,
  secure: InstanceSecureKeys,
}

interface InstanceSecureKeys {
  header: string,
}

interface Error {
  error: 'null' | '_1',
  code: number,
}

export type TCreateRequestInstance =  <T>(method: Method, slug: string, data: unknown, secureKey?: string) => Promise<T | Error>

export function createRequestInstance(payload: InstancePayload) {
  let axiosInstance: AxiosInstance | null = null
  const logger: Logger = new Logger('axiosInstance')

  const createInstance = () => {
    const instance = axios.create()

    instance.defaults.baseURL = payload.apiUrl
    instance.defaults.withCredentials = true
    instance.defaults.headers['Content-Type'] = 'application/json'

    return instance
  }
  axiosInstance = createInstance()

  return async <T>(method: Method, slug: string, secureKey?: string, data?: unknown): Promise<T | Error> => {
    if (!axiosInstance) {
      axiosInstance = createInstance()
    }

    const headers: AxiosHeaders = {} as AxiosHeaders
    if (secureKey) {
      headers[payload.secure.header] = secureKey
    }

    try {
      const response = await axiosInstance.request<T>({
        method,
        url: slug,
        data: data || {},
        headers,
      })

      return response.data
    } catch (error) {
      logger.warn(`Fetch error with data: ${JSON.stringify(error?.response?.data)}`)
      return { error: '_1', code: error?.code || 502 }
    }
  }
}
