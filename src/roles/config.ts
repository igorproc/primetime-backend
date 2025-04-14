import { type IStorageRbac } from 'nestjs-rbac'

export const AvailableRoles: IStorageRbac = {
  roles: ['admin', 'qa', 'user', 'user_verify'],
  permissions: {
    watch: ['getMovie'],
    device: ['all', 'delete', 'freeze'],
    dataBalancer: ['update', 'get', 'add'],
    migration: ['getMigrationsList', 'updateMigration', 'deleteMigration', 'startMigration'],
  },
  grants: {
    user: ['watch@getMovie'],
    user_verify: ['&user'],
    qa: ['&user', 'device@all', 'dataBalancer@get', 'migration'],
    admin: [
      '&user',
      '&qa',
      'deviceAdmin',
      'dataBalancer',
      'device',
      'watch',
    ],
  },
  filters: [],
}
