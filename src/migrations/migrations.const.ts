import { EAvailableMigrations } from '@/migrations/dto/validate.dto'

export const REDIS_KEYS_MAP = {
  [EAvailableMigrations.MOVIE]: 'migrate-movies'
}

export const MIGRATE_CONSUMER_QUEUE_NAMES = {
  MIGRATE: 'migrate',
  MOVIE: 'migrate-movie'
}
