import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CardStatus } from './types';

export class CreateCardDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(CardStatus)
  status: CardStatus;
}

export class UpdateCardDto extends CreateCardDto {}
