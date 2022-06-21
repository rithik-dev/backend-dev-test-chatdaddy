import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
		id: string

	@Column()
		name: string

	@Column()
		phoneNumber: string

	@Column()
		age: number
}
