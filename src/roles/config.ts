import { type IStorageRbac } from 'nestjs-rbac'

export const AvailableRoles: IStorageRbac = {
  roles: ['admin', 'user'],
  permissions: {
    watchUser: ['getMovie'],
    watchAdmin: ['seedOldContent'],
    deviceAdmin: ['all', 'delete', 'freeze'],
    dataBalancerAdmin: ['update', 'get', 'add'],
  },
  grants: {
    admin: ['&user', 'deviceAdmin', 'dataBalancerAdmin', 'seedOldContent'],
    qa: ['&user', 'dataBalancerAdmin', 'deviceAdmin@all'],
    user: ['watchUser'],
  },
  filters: [],
}
