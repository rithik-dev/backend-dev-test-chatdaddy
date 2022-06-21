import { Handler } from '../utils/make-api'

const createUser: Handler<'createUser'> = async(
	{ phoneNumber, name, age }
) => {
	return {
		id: '1',
		name,
		age,
		phoneNumber,
	}
}

export default createUser
