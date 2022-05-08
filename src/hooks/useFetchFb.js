import { dbService } from 'firebase/fbase';
import { useEffect, useState } from 'react';

export default function useFetchFb(collectionName) {
  const [fetchedCards, setFetchedCards] = useState([]);

  const fetchCardsDb = async () => {
    const dbCards = await dbService.collection(collectionName).get();
    dbCards.forEach((document) => {
      const cardObject = {
        ...document.data(),
      };
      setFetchedCards((prev) => [cardObject, ...prev]);
    });
  };

  useEffect(() => {
    fetchCardsDb();
  }, []);

  return fetchedCards;
}
