import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto } from './dtos';

@Controller('cards')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  @Get()
  async getAll() {
    this.logger.info('Fetching all cards');
    return this.cardService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    this.logger.info('Fetching card', { id });
    return this.cardService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateCardDto) {
    return this.cardService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    await this.cardService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.cardService.delete(id);
    } catch (e) {
      throw new NotFoundException((e as Error).message);
    }
  }
}
