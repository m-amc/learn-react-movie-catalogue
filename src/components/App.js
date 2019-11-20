import React from 'react';
import '../App.css';
import Catalogue from '../components/Catalogue';

/* 
  Demonstrating React Context API 
  Creating an app configuration context.
*/

export const ConfigContext = React.createContext();

const config = {
  isAuthorized: true
}

function App() {
  return (
    // Wrapping the App with the ConfigContext so that the value prop will be available across the app components
    <ConfigContext.Provider value = {config}>
      <div className="App">
        <header>
          <h1>Movie Catalog</h1>
        </header>

        <Catalogue />
      </div>
    </ConfigContext.Provider>

  );
}

export default App;
