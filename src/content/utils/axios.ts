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

export type TCreateRequestInstance =  <T>(method: Method, slug: string, data: unknown, secureKey?: string) => Promise<T>

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

  return async <T>(method: Method, slug: string, secureKey?: string, data?: unknown): Promise<T> => {
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
    }
  }
}
