// utils/raffle.ts

export const raffle = <T>(
  items: T[],
  selectedIds: Set<string>,
  count: number,
  getId: (item: T) => string
): T[] => {
  const winners = new Set<string>(selectedIds);

  const maxSelectableCount = Math.min(count, items.length);

  while (winners.size < maxSelectableCount) {
    const randomIndex = Math.floor(Math.random() * items.length);
    const winnerId = getId(items[randomIndex]);
    winners.add(winnerId);
  }

  const itemMap = items.reduce<{ [key: string]: T }>(
    (acc, cur) => ({
      ...acc,
      [getId(cur)]: cur,
    }),
    {}
  );

  return Array.from(winners).map((winnerId) => itemMap[winnerId]);
};
