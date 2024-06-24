// Node Deps
import { RBAcModule } from 'nestjs-rbac'
// Constants
import { AvailableRoles } from '@/roles/config'

export default function () {
  return RBAcModule.forRoot(AvailableRoles)
}
