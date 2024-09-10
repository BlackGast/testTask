import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CatItem from './CatItem';

interface Cat {
  id: string;
  url: string;
  isFavorite: boolean;
}

const FavoriteCats: React.FC = () => {
  const [favoriteCats, setFavoriteCats] = useState<Cat[]>([]);

  useEffect(() => {
    async function fetchFavoriteCats() {
      const response = await axios.get('/likes');
      setFavoriteCats(response.data.data.map((like: any) => ({
        id: like.cat_id,
        url: `https://cdn2.thecatapi.com/images/${like.cat_id}.jpg`,
        isFavorite: true
      })));
    }
    fetchFavoriteCats();
  }, []);

  const handleToggleFavorite = async (id: string) => {
    const updatedCats = favoriteCats.filter(cat => cat.id !== id);
    setFavoriteCats(updatedCats);
    await axios.delete(`/likes/${id}`);
  };

  return (
    <div className="favorite-cat-list">
      {favoriteCats.map(cat => (
        <CatItem
          key={cat.id}
          id={cat.id}
          url={cat.url}
          isFavorite={true}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default FavoriteCats;
