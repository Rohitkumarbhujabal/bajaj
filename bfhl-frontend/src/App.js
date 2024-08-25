import React, { useState } from 'react';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await fetch('https://bajaj-10ii.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedJson)
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON input. Please check your JSON format.");
      console.error("Error parsing JSON or fetching data:", error);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = selectedOptions.reduce((acc, option) => {
      acc[option.value] = response[option.value];
      return acc;
    }, {});

    return (
      <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>BFHL Frontend</h1>
      <textarea
        rows="10"
        cols="50"
        placeholder='Enter JSON like {"data": ["M", "1", "334", "4", "B", "Z", "a"]}'
        value={jsonInput}
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
        placeholder="Select fields to display"
      />
      <div>
        <h3>Response:</h3>
        {renderResponse()}
      </div>
    </div>
  );
};

export default App;
