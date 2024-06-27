// utils/raffle.test.ts

import { raffle } from './raffle';

interface TestItem {
  id: string;
  name: string;
}

const items: TestItem[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
  { id: '4', name: 'Item 4' },
  { id: '5', name: 'Item 5' },
];

const getId = (item: TestItem) => item.id;

describe('raffle', () => {
  it('should select the specified number of winners', () => {
    const selectedIds = new Set<string>();
    const count = 3;

    const winners = raffle(items, selectedIds, count, getId);

    expect(winners).toHaveLength(count);
    const winnerIds = winners.map(getId);
    expect(new Set(winnerIds).size).toBe(count);
  });

  it('should include already selected winners', () => {
    const selectedIds = new Set<string>(['1', '2']);
    const count = 3;

    const winners = raffle(items, selectedIds, count, getId);

    expect(winners).toHaveLength(count);
    const winnerIds = winners.map(getId);
    expect(new Set(winnerIds).size).toBe(count);
    expect(winnerIds).toEqual(expect.arrayContaining(['1', '2']));
  });

  it('should handle case when count is more than items length', () => {
    const selectedIds = new Set<string>();
    const count = 10; // More than items length

    const winners = raffle(items, selectedIds, count, getId);

    expect(winners).toHaveLength(items.length);
    const winnerIds = winners.map(getId);
    expect(new Set(winnerIds).size).toBe(items.length);
  });

  it('should handle case when no items are passed', () => {
    const selectedIds = new Set<string>();
    const count = 3;

    const winners = raffle([], selectedIds, count, getId);

    expect(winners).toHaveLength(0);
  });
});
