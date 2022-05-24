import './App.css';
import {useState, useRef} from 'react';



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
  

  const [count, onChangeCount]=useState(100);
  const [data, onChangeData]=useState({});
  const fileInputRef=useRef();

  let items = [];
  for (let i = 0; i < count; i++) {
    items.push(<Item key={i} id={i+1} data={[data, onChangeData]}/>);
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    let texts = [];
    Object.entries(data).forEach(([key, value]) => {
      if (key <= count) {
        texts.push(`${key}. ${value}\n`);
      }
    });
    const file = new Blob(texts, {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "100ideas-" + Date.now() + ".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const uploadTxtFile = (event) => {
    console.log("here...")
    const file = event.target.files[0];
    console.log(event.target.result)
    const reader = new FileReader();
    

    reader.onload = (event) => {
      let loadedData = {};
      const text = event.target.result;
      const lines = text.split("\n");
      if (lines.length > count) {
        if (!window.confirm("File has more lines than expected. Extra lines will be dropped. Do you want to load the file anyway?")){
          return;
        }
      }
      
      lines.forEach((line, index) => {
        // upload entries only based on max count
        if(index <= count) {
          line = line.replace(/^\d*\.\s*/, '' )
          loadedData[index+1] = line;
        }
      }); 
      onChangeData({...loadedData});
    } 

    reader.readAsText(file);    
    event.target.value = ''
}

  return (
    <div className="App">
      <div className='header'>
        {count} Ideas
      </div>
      <div className='subheader'>
        Want an editor to brainstrom 100 Ideas? <br/>
        Here you go!
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
            <input type="file" accept="text/*" style={{ display: 'none' }} ref={fileInputRef} onChange={(e) => uploadTxtFile(e)} id="contained-button-file"/>
            <button id="uploadBtn" onClick={()=> {fileInputRef.current.click()}} value="upload">Upload</button>
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
