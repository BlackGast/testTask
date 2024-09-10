import React, { useState } from 'react';
import CatList from './CatList';
import FavoriteCats from './FavoriteCats';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  return (
    <div className="tabs">
      <button onClick={() => setActiveTab('all')}>Все котики</button>
      <button onClick={() => setActiveTab('favorites')}>Любимые котики</button>

      <div className="tab-content">
        {activeTab === 'all' ? <CatList /> : <FavoriteCats />}
      </div>
    </div>
  );
};

export default Tabs;