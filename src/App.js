import './App.css';
import {useState, useRef} from 'react';



function Item(props) {
  const [data, onChangeData]= props.data;
  const id = props.id
  const [currText, onChangeText]= useState(data[id]);

  const handleChange = (id, text) => {
    let copiedData = {...data};
    copiedData[id] = text;

    onChangeData( changeData => ({
        ...copiedData
    }));
    onChangeText(text);
  }
  return (
    <div className="item">
      <div className="item-number">{id}</div>
      <div className="item-content">
        <textarea className="item-content-text" value={currText}
          rows={currText && currText.split("\n").length > 2 ? currText.split("\n").length : 2}
          onChange={({ target: { "value": currentData }}) => {
            handleChange(id, currentData);
          }}
          style={{"height": "fit-content"}}
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
  const footerContent = "Made by "

  let items = [];
  for (let i = 0; i < count; i++) {
    items.push(<Item key={i} id={i+1} data={[data, onChangeData]}/>);
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    let texts = [];
    Object.entries(data).forEach(([key, value]) => {
      if (Number(key) <= count) {
        
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
    const file = event.target.files[0];
    const reader = new FileReader();
    

    reader.onload = (event) => {
      let loadedData = {};
      const text = event.target.result;
      const lines = text.split("\n");
      if (lines.length > 100) {
        if (!window.confirm("File has more than 100 lines. Extra lines will be dropped. Do you want to load the file anyway?")){
          return;
        }
      }
      lines.forEach((line, index) => {
        // upload entries only based on max count
        if(index <= 100) {
          line = line.replace(/^\d*\.\s*/, '' )
          loadedData[index+1] = line;
        }
      }); 
      onChangeData({...loadedData});
      onChangeCount(lines.length);
    } 

    reader.readAsText(file);    
    event.target.value = ''
}

  return (
    <div className="App">
      <div className='header'>
        {count} Ideas
        <div className='subheader'>
          Want an editor to brainstrom 100 Ideas? <br/>
          Here you go!
        </div>
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
      <footer className='footer'>
          <div className="btnDiv">
            <input type="file" accept="text/*" style={{ display: 'none' }} ref={fileInputRef} onChange={(e) => uploadTxtFile(e)} id="contained-button-file"/>
            <button id="uploadBtn" onClick={()=> {fileInputRef.current.click()}} value="upload">Upload</button>
            <button id="downloadBtn" onClick={downloadTxtFile} value="download">Download</button>
          </div>
          <div className="footeContent">
          {footerContent}
          <a rel="noreferrer" href="https://bhavaniravi.com" target="_blank">Bhavani Ravi</a>
          </div>      
      </footer>
    </div>
  );
}

export default App;
