import { User } from '../entity'
import { Handler } from '../utils/make-api'

const createUser: Handler<'createUser'> = async(
	{ body: { age, phoneNumber, name } },
	{ db },
) => {
	const userRepo = await db.getRepository(User)

	const user = new User()

	user.name = name
	user.phoneNumber = phoneNumber
	user.age = age


	return await userRepo.save(user)
}

export default createUser
