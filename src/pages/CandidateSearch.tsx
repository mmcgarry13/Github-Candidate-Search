import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import VITE_GITHUB_TOKEN from '../../environment/.env';
const GITHUB_API_URL = "https://api.github.com";

const CandidateSearch = () => {

  const [inputValue, setInputValue] = useState<string>(''); // create a state variable to take a string for searching for candidates

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // event handler for the html input field
  };

  const handleEnterPress = () => {
    searchGithubUser(inputValue);
    console.log("Input:", inputValue);
    // Here you can add any other functionality you want to perform with the input value
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnterPress();
    }
  };

  const handleButtonClick = () => {
    searchGithub();
    console.log("Button clicked! Searching random candidate");
    // Add the separate functionality you want for this button
  };


  return <div>
    <h1>CandidateSearch</h1>;
    <input
      type="text"
      id="textInput"
      name="value"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={inputValue}
      placeholder="Search for a candidate"
    />
    <p>Current Input: {inputValue}</p>
    <button onClick={handleButtonClick}>Search Random Candidate</button>
  </div>

}


export default CandidateSearch;
