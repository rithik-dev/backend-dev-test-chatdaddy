import { Boom } from '@hapi/boom'
import { User } from '../entity'
import { Handler } from '../utils/make-api'

const deleteUsers: Handler<'deleteUsers'> = async(
	{ query: { id, phoneNumber } },
	{ db }
) => {
	const userRepo = await db.getRepository(User)

	if(id === undefined && phoneNumber === undefined) {
		throw new Boom('No parameters passed', { statusCode: 400 })
	}

	const where: { id?: string, phoneNumber?: string } = {}

	if(id !== undefined) {
		where.id = id
	}

	if(phoneNumber !== undefined) {
		where.phoneNumber = phoneNumber
	}


	const res = await userRepo.delete(where)

	return {
		usersAffected: res.affected!,
	}
}

export default deleteUsers
