import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CatItem from './CatItem';

interface Cat {
  id: string;
  url: string;
  isFavorite: boolean;
}

const CatList: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  
  useEffect(() => {
    async function fetchCats() {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
      const catData = response.data.map((cat: any) => ({
        id: cat.id,
        url: cat.url,
        isFavorite: false
      }));
      setCats(catData);
    }
    fetchCats();
  }, []);

  const handleToggleFavorite = async (id: string) => {
    const updatedCats = cats.map(cat =>
      cat.id === id ? { ...cat, isFavorite: !cat.isFavorite } : cat
    );
    setCats(updatedCats);

    const cat = cats.find(cat => cat.id === id);
    if (cat?.isFavorite) {
      await axios.delete(`/likes/${id}`); 
    } else {
      await axios.post(`/likes`, { cat_id: id }); 
    }
  };

  return (
    <div className="cat-list">
      {cats.map(cat => (
        <CatItem
          key={cat.id}
          id={cat.id}
          url={cat.url}
          isFavorite={cat.isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default CatList;
