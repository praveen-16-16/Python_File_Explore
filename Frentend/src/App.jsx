import React, { useState } from 'react';


const App = () => {
  const [output, setOutput] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRunFile = async () => {
    if (!file) {
      setOutput('Please select a Python file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/run-python', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (err) {
      setOutput('Error running Python file.');
    }
  };

  return (
    <div>
      <h1>Upload and Run Python File</h1>
      <input type="file" accept=".py" onChange={handleFileChange} />
      <button onClick={handleRunFile}>Run</button>
      <pre>{output}</pre>
    </div>
  );
};

export default App;
