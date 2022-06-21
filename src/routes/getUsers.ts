import { User } from '../entity'
import { Handler } from '../utils/make-api'

const getUsers: Handler<'getUsers'> = async(
	{ query: { id, phoneNumber } },
	{ db }
) => {
	const userRepo = await db.getRepository(User)

	const where: { id?: string, phoneNumber?: string } = {}

	if(id !== undefined) {
		where.id = id
	}

	if(phoneNumber !== undefined) {
		where.phoneNumber = phoneNumber
	}


	return await userRepo.find({ where })

}

export default getUsers
