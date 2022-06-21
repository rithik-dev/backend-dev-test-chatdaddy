import { DataSource } from 'typeorm'
import entities from '../entity'


export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.PG_HOST,
	port: +process.env.PG_PORT!,
	username: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	database: process.env.DBNAME,
	entities: entities,
	synchronize: true,
	logging: false,
	migrations: [],
})

let dataSource: DataSource

const conn = async() => {
	if(dataSource === undefined || !dataSource.isInitialized) {
		dataSource = await AppDataSource.initialize()
	}

	return dataSource
}

export default conn
