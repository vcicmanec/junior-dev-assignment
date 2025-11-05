import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CardStatus } from '../card/types';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CardStatus, default: 'todo' })
  status: CardStatus;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
