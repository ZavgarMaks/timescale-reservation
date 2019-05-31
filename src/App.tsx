import React from 'react';
import './App.css';
import Timescale from './Components/Timescale';
import { HoursData } from './MockData';

const App: React.FC = () => {
  return (
    <div className="App">
      <Timescale 
        hoursData={HoursData}
      />
    </div>
  );
}

export default App;
