import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { setupDataSource } from '../../test/in-memory-db-setup';
import { CardController } from './card.controller';
import { CardModule } from './card.module';

describe('CardController', () => {
  let controller: CardController;

  beforeEach(async () => {
    const dataSource = await setupDataSource();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dataSource.options),
        LoggerModule.forRoot(),
        CardModule,
      ],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    controller = module.get<CardController>(CardController);
  });

  it('Should create card and return it', async () => {
    await controller.create({
      title: 'test',
      description: 'test test',
      status: 'todo',
    });
    const all = await controller.getAll();
    const target = all[0];
    expect(all.length).toEqual(1);
    expect(target.title).toEqual('test');
    expect(target.description).toEqual('test test');
    expect(target.id).toBeDefined();
    expect(target.id.length).toEqual(36);

    const one = await controller.getOne(all[0].id);
    expect(one?.title).toEqual('test');
    expect(one?.description).toEqual('test test');
    expect(one?.status).toEqual('todo');
  });

  it('Should create multiple cards', async () => {
    await controller.create({
      title: 'test',
      description: 'test test',
      status: 'todo',
    });

    await controller.create({
      title: 'test 2',
      description: 'test test 2',
      status: 'todo',
    });

    const all = await controller.getAll();

    expect(all.length).toEqual(2);
  });

  it('Should create card, update it correctly and return it', async () => {
    const creationResult = await controller.create({
      title: 'test',
      description: 'test test',
      status: 'todo',
    });

    await controller.update(creationResult.id, {
      title: 'updated title',
      description: 'updated description',
      status: 'done',
    });

    const updatedCard = await controller.getOne(creationResult.id);

    expect(updatedCard?.title).toEqual('updated title');
    expect(updatedCard?.description).toEqual('updated description');
    expect(updatedCard?.status).toEqual('done');
  });

  it('Should create card, delete it correctly and return null', async () => {
    const creationResult = await controller.create({
      title: 'test',
      description: 'test test',
      status: 'todo',
    });

    await controller.delete(creationResult.id);

    const updatedCard = await controller.getOne(creationResult.id);

    expect(updatedCard).toBeNull();
  });
});
