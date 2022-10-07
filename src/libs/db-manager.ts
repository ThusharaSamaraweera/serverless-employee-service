import { Employee } from "src/entities/employee.entity";
import { DataSource, EntityManager } from "typeorm";

let dataSource: DataSource;

const getDBConnection = async (): Promise<EntityManager> => {
  if (dataSource && dataSource.isInitialized) {
    console.log("DB connection already initialized");
    return dataSource.manager;
  } else {
    console.log("Initializing DB connection");
    dataSource = new DataSource({
      applicationName: "employee-service",
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      schema: process.env.DB_SCHEMA,
      connectTimeoutMS: 30000,
      synchronize: true,
      logging: false,
      useUTC: true,
      entities: [ Employee],
    });

    return await dataSource
      .initialize()
      .then(() => {
        console.log("DB connection initialized");
        return dataSource.manager;
      })
      .catch((err) => {
        console.error("Error initializing DB connection", err);
        throw new Error(err);
      });
  }
};

export { getDBConnection };