import { type IStorageRbac } from 'nestjs-rbac'

export const AvailableRoles: IStorageRbac = {
  roles: ['admin', 'user'],
  permissions: {
    deviceAdmin: ['all', 'delete', 'freeze'],
  },
  grants: {
    admin: ['&user', 'deviceAdmin'],
    user: [],
  },
  filters: [],
}
