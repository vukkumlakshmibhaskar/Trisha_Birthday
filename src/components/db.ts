import Dexie, { Table } from 'dexie';

export interface Message {
  id: number;
  from: string;
  message: string;
  avatar?: string;
}

class BirthdayWishesDB extends Dexie {
  messages!: Table<Message, number>;

  constructor() {
    super('BirthdayWishesDB');
    this.version(1).stores({
      messages: '++id,from,message'
    });
  }
}

export const db = new BirthdayWishesDB();
