import { randomUUID } from 'crypto';
import { DataType, newDb } from 'pg-mem';
import { DataSource } from 'typeorm';

export const setupDataSource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  // current_database and version functions are needed by TypeORM
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });
  db.public.registerFunction({
    name: 'version',
    returns: DataType.text,
    implementation: () => '1',
  });

  // pg-mem does not have uuid_generate_v4 function
  // see https://github.com/oguimbal/pg-mem/wiki/FAQ#-what-if-i-need-an-extension-like-uuid-ossp-
  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: () => randomUUID(),
      impure: true,
    });
  });

  const ds: DataSource = (await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
  })) as DataSource;
  await ds.initialize();
  await ds.synchronize();

  return ds;
};
