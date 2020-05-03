import { ConnectionOptions } from 'typeorm';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment = process.env.NODE_ENV || 'development';
let data: any = null;
let config: ConnectionOptions = null;

if (environment !== 'production') {
  data = dotenv.parse(fs.readFileSync('.env'));
  // Check typeORM documentation for more information.
  config = {
    type: data.DB_TYPE,
    host: data.DB_HOST,
    port: data.DB_PORT,
    username: data.DB_USERNAME,
    password: data.DB_PASSWORD,
    database: data.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    // We are using migrations, synchronize should be set to false.
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: true,
    logging: true,
    logger: 'file',

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      migrationsDir: 'src/migrations',
    },
  };
} else {
  const databaseUrl: string = process.env.HEROKU_POSTGRESQL_WHITE_URL;
  const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
  config = {
    type: 'postgres',
    host: connectionOptions.host,
    port: Number(connectionOptions.port),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    // We are using migrations, synchronize should be set to false.
    synchronize: true,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: false,
    logging: true,
    logger: 'file',

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      // Location of migration should be inside src folder
      // to be compiled into dist/ folder.
      migrationsDir: 'src/migrations',
    },
  };
}

export = config;
