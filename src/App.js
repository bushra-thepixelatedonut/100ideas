import logo from './logo.svg';
import './App.css';
import {useState} from 'react';


function Item(props) {
  const [data, onChangeData]= props.data;
  const id = props.id

  let currentData = data[id];

  const handleChange = (id, text) => {
    let copiedData = {...data};
    copiedData[id] = text;

    onChangeData( changeData => ({
        ...copiedData
    }));
  }

  return (
    <div className="item">
      <div className="item-number">{id}</div>
      <div className="item-content">
        <textarea className="item-content-text" value={currentData}
          onChange={({ target: { "value": currentData }}) => {
            handleChange(id, currentData);
          }}
        >
            
        </textarea>
      </div>
    </div>
  );
}

function App() {
  const [count, onChangeCount]=useState(10);
  const [data, onChangeData]=useState({});

  let items = [];
  for (let i = 0; i < count; i++) {
    items.push(<Item key={i} id={i+1} data={[data, onChangeData]}/>);
  }

  return (
    <div className="App">
      <div className='header'>
        {count} Ideas
      </div>
      <div className='container'>
          <div className='slider'>
            <input 
              type="range"
              min="1" 
              max="100"
              value={count}
              onChange={({ target: { "value": radius } }) => {
                                  onChangeCount(radius);
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
