import { Handler } from '../utils/make-api'

const updateUsers: Handler<'updateUsers'> = async(
	{ id, phoneNumber }
) => {
	return {
		usersAffected: 1,
	}
}

export default updateUsers
