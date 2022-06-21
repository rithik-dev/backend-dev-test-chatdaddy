import { Handler } from '../utils/make-api'

const deleteUsers: Handler<'deleteUsers'> = async(
	{ id, phoneNumber }
) => {
	return {
		usersAffected: 1,
	}
}

export default deleteUsers
