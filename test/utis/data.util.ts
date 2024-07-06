// Node Deps
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const getDataFromJson = <T>(relativePath: string): T | null => {
  const absolutePath =  resolve(__dirname, '../mock', relativePath)
  try {
    const fileData = readFileSync(absolutePath, 'utf-8')
    if (!fileData) {
      return null
    }

    return JSON.parse(fileData) as T
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw Error('[Utils/data] File not found!')
    }
    if (error.code === 'EACCES') {
      throw Error('[Utils/data] Permission denied!')
    }

    throw Error(`[Utils/data] Json file read error: ${absolutePath}`)
  }
}