import React from 'react';
import Tabs from './Components/Tabs';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Кошачий Пинтерест</h1>
      <Tabs />
    </div>
  );
};

export default App;