import { DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: './env/local.env' })
}

const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: true,
  migrationsTableName: 'migration_todo',
  migrations: ['database/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'database/migrations',
  // },
  // ssl:` {
  //   rejectUnauthorized: false,
  // },
}


export default config
