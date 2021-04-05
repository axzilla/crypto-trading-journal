import Adapters from 'next-auth/adapters'
import { v4 as uuidv4 } from 'uuid'

export default class User extends Adapters.TypeORM.Models.User.model {
  constructor(name: string, email: string, image: string, emailVerified: boolean) {
    super(name, email, image, emailVerified)
  }
}

export const UserSchema = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,

    uuid: {
      nullable: true,
      type: 'uuid',
      unique: true,
      isPrimary: true,
      generationStrategy: 'uuid',
      default: uuidv4()
    }
  }
}
