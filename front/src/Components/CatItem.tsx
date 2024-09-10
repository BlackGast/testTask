import React from 'react';

interface CatItemProps {
  id: string;
  url: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const CatItem: React.FC<CatItemProps> = ({ id, url, isFavorite, onToggleFavorite }) => {
  return (
    <div className="cat-item">
      <img src={url} alt="cat" className="cat-image" />
      <button onClick={() => onToggleFavorite(id)}>
        {isFavorite ? 'Убрать из любимых' : 'Добавить в любимые'}
      </button>
    </div>
  );
};

export default CatItem;
