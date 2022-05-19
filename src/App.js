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

  const downloadTxtFile = () => {
    console.log("clicked")
    const element = document.createElement("a");
    let texts = [];
    Object.entries(data).forEach(([key, value]) => {
      texts.push(`${key}. ${value}\n`);
    });
    const file = new Blob(texts, {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "100ideas-" + Date.now() + ".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
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
          <div className="btnDiv">
            <button id="uploadBtn" value="upload">Upload</button>
            <button id="downloadBtn" onClick={downloadTxtFile} value="download">Download</button>
          </div>
          <div className='content'>
            {items}
          </div>
      </div>
    </div>
  );
}

export default App;
