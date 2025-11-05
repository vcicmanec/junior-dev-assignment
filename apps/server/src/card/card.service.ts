import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';
import { CreateCardDto, UpdateCardDto } from './dtos';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  public async findAll() {
    return this.cardRepository.find();
  }

  public async findOne(id: string) {
    return this.cardRepository.findOneBy({ id });
  }

  public async create(dto: CreateCardDto) {
    return this.cardRepository.save(dto);
  }

  public async update(id: string, dto: UpdateCardDto) {
    await this.cardRepository.update(id, dto);
  }

  public async delete(id: string) {
    const result = await this.cardRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`Card with ID ${id} not found`);
    }

    return result;
  }
}
