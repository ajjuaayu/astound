// NOTE: This is an in-memory store and will reset on server restart.
// For a persistent guestbook, a database solution would be required.

export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

let wishes: Wish[] = [
  { id: '1', name: 'Example User', message: 'Happy Birthday Aayushi! Hope you have a fantastic day!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: '2', name: 'Another Friend', message: 'Wishing you all the best on your special day! 🎉', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
];

export const getWishes = (): Wish[] => {
  // Return a copy and sort by timestamp descending
  return [...wishes].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const addWish = (name: string, message: string): Wish => {
  const newWish: Wish = {
    id: Date.now().toString(), // Simple ID for demo
    name,
    message,
    timestamp: new Date(),
  };
  // Add to the beginning of the array
  wishes = [newWish, ...wishes];
  return newWish;
};
