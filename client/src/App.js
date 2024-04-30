import logo from './logo.svg';
import './App.css';
import React from 'react';
import AppBar  from './components/Appbar';
import Pages  from './components/Pages';
import BasicModal from './components/Popup';
import StickyFooter from './components/footer';

function App() {
 
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          COUNSELLING AND VISITOR MANAGEMENT SYSTEM
          
        </p>
      
      <AppBar/>
      </header>
      <div className="App-body">
 
        <Pages/>
        
             </div>  
             <div>
              <BasicModal/>
             </div>
             <div>
              <StickyFooter/>
             </div>
             
             
             
    </div>
    
  );
}

export default App;



