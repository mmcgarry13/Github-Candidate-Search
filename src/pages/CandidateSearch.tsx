import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
// import VITE_GITHUB_TOKEN from '../../environment/.env';
const GITHUB_API_URL = "https://api.github.com";


interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  [key: string]: any;
}

const CandidateSearch = () => {

  const [inputValue, setInputValue] = useState<string>(''); // create a state variable to take a string for searching for candidates

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // event handler for the html input field
  };

  return <div>
    <h1>CandidateSearch</h1>;
    <input
      type="text"
      id="textInput"
      name="value"
      onChange={handleChange}
      value={inputValue}
      placeholder="Search for a candidate"
    />
    <p>Current Input: {inputValue}</p>
  </div>

}


export default CandidateSearch;
