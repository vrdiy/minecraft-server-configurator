

import './App.css';
import { useState } from 'react';
import ServerProperties from './components/ServerProperties';
import ServerIcon from './components/ServerIcon';
import placeholder from './imgs/placeholder_icon.png';

function App() {
  
  // Import files from chosen directory
  const [serverIcon, setServerIcon] = useState(placeholder);

  return (
    <div className="App">
      <div>
        <h1 className="banner">Minecraft Server Configurator</h1>
        <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'16px',gap:'16px'}}>
          <div id='serverIconSection'>
            <ServerIcon icon={serverIcon}/>
          </div>
          <div id='serverPropertiesSection'>
            <ServerProperties  />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
