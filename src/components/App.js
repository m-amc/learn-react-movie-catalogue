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
    <ConfigContext.Provider value={config}>
      <div className="App">
        <header>
          <h1>Movie Catalogue</h1>
          <p>(React Hooks Demonstration)</p>
        </header>

        <Catalogue />

        <footer>
          <a href="https://anamorales.dev" target="_blank" rel="noopener noreferrer">&copy; 2019 Ana Morales</a>
          <p>Powered by <span><a href="https://www.themoviedb.org/" target="_blank" >The Movie DB API</a></span></p>

        </footer>
      </div>
    </ConfigContext.Provider>

  );
}

export default App;
