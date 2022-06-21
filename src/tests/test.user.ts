import { Chance } from 'chance'
import request from 'supertest'
import { Response } from '../utils/make-api'
import { describeWithApp } from './test-setup'

const chance = new Chance()

describeWithApp('User Tests', app => {

	it('should create a user', async() => {
		for(let i = 0; i < 10; i++) {
			const req = {
				name: chance.name(),
				phoneNumber: chance.phone(),
				age: chance.integer({ min: 0, max: 150 })
			}
			const response = await request(app)
				.post('/users')
				.send(req)
				.expect(200)
				.then(res => res.body as Response<'createUser'>)

			expect(response.id).toBeTruthy()
			expect(response.age).toEqual(req.age)
			expect(response.phoneNumber).toEqual(req.phoneNumber)
			expect(response.name).toEqual(req.name)
		}
	})

	it('should modify a user correctly', async() => {
		const createReq = {
			name: chance.name(),
			phoneNumber: chance.phone(),
			age: chance.integer({ min: 0, max: 150 })
		}
		const updateReq = {
			name: chance.name()
		}
		const response = await request(app)
			.post('/users')
			.send(createReq)
			.expect(200)
			.then(res => res.body as Response<'createUser'>)

		await request(app)
			.patch('/users')
			.query({ id: response.id })
			.send(updateReq)
			.expect(200)
			.then(res => {
				const body = res.body as Response<'updateUsers'>
				expect(body.usersAffected).toEqual(1)
			})

		const users: Response<'getUsers'> = await request(app)
			.get('/users')
			.query({ id: response.id })
			.expect(200)
			.then(res => res.body)

		expect(users[0].id).toEqual(response.id)
		expect(users[0].name).toEqual(updateReq.name)
	})

	it('should delete a user', async() => {
		const createReq = {
			name: chance.name(),
			phoneNumber: chance.phone(),
			age: chance.integer({ min: 0, max: 150 })
		}

		const response = await request(app)
			.post('/users')
			.send(createReq)
			.expect(200)
			.then(res => res.body as Response<'createUser'>)

		await request(app)
			.delete('/users')
			.query({ id: response.id })
			.send({})
			.expect(200)
			.then(res => {
				const body = res.body as Response<'deleteUsers'>
				expect(body.usersAffected).toEqual(1)
			})

		const users: Response<'getUsers'> = await request(app)
			.get('/users')
			.query({ id: response.id })
			.expect(200)
			.then(res => res.body)

		expect(users).toEqual([])
	})
})
