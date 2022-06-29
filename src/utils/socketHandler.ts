//@ts-ignore
import io from 'socket.io-client'
import { config } from '../../config'

export interface SocketHandlerType {
  connected: boolean
  disconnected: boolean
  connect: () => void
  disconnect: () => void
  on: (event: string, eventHandler: (payload?: any) => void) => void
  off: (event?: string) => () => void
  emit: (event: string, payload?: object) => void
}

export const socketHandler: SocketHandlerType = io(config.webSocketUrl)
