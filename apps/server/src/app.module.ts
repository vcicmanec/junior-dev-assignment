import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../../.env', '.env'],
      validationSchema: Joi.object({
        ENVIRONMENT: Joi.string()
          .valid('local', 'development', 'production')
          .required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        synchronize: config.get('ENVIRONMENT') === 'local',
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
    }),
    LoggerModule.forRoot(),
    CardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
