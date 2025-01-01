import mongoose from 'mongoose';
import { saveItems, Item } from '../src/database';

jest.mock('mongoose'); // Mock Mongoose

interface ItemType {
  base_type: string;
  modifiers: string[];
}

describe('saveItems', () => {
  it('should save items to the database', async () => {
    // Mock the insertMany method
    (Item.insertMany as jest.Mock).mockResolvedValue([{ base_type: 'Rare Sword', modifiers: ['+20% increased attack speed'] }]);

    const items: ItemType[] = [
      { base_type: 'Rare Sword', modifiers: ['+20% increased attack speed'] }
    ];

    await saveItems(items);

    // Check that the insertMany method was called
    expect(Item.insertMany).toHaveBeenCalledWith(items);
  });
});