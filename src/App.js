import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Item(props) {
  return (
    <div className="item">
      <div className="item-number">{props.id}</div>
      <div className="item-content">
        <textarea className="item-content-text"></textarea>
      </div>
    </div>
  );
}

function App() {
  const [value,onChange]=useState(10);

  let items = [];
  for (let i = 0; i < value; i++) {
    items.push(<Item key={i} id={i+1}/>);
  }

  return (
    <div className="App">
      <div className='header'>
        {value} Ideas
      </div>
      <div className='container'>
          <div className='slider'>
            <input 
              type="range"
              min="1" 
              max="100"
              value={value}
              onChange={({ target: { value: radius } }) => {
                                  onChange(radius);
                                }}
            />
          </div>
          <div className='content'>
            {items}
          </div>
      </div>
    </div>
  );
}

export default App;
