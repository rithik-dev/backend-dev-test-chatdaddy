import { Boom } from '@hapi/boom'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { User } from '../entity'
import { Handler } from '../utils/make-api'

const updateUsers: Handler<'updateUsers'> = async(
	{
		query,
		body: { age, name, phoneNumber }
	},
	{ db }
) => {
	if(query.id === undefined && query.phoneNumber === undefined) {
		throw new Boom('No parameters passed', { statusCode: 400 })
	}

	const userRepo = await db.getRepository(User)

	const where: { id?: string, phoneNumber?: string } = {}

	if(query.id !== undefined) {
		where.id = query.id
	}

	if(query.phoneNumber !== undefined) {
		where.phoneNumber = query.phoneNumber
	}


	const partialUser: QueryDeepPartialEntity<User> = {}

	if(name !== undefined) {
		partialUser.name = name
	}

	if(phoneNumber !== undefined) {
		partialUser.phoneNumber = phoneNumber
	}

	if(age !== undefined) {
		partialUser.age = age
	}

	const res = await userRepo.update(where, partialUser)

	return {
		usersAffected: res.affected!,
	}
}

export default updateUsers
