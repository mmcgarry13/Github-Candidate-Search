import { useState } from 'react'; // add useEffect back when ready
import { searchGithub, searchGithubUser } from '../api/API';
import.meta.env.VITE_GITHUB_TOKEN;

const CandidateSearch = () => {

  const [inputValue, setInputValue] = useState<string>(''); // create a state variable to take a string for searching for candidates


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // event handler for the html input field
  };

  const handleEnterPress = () => {
    searchGithubUser(inputValue); // event handler for enter press on input field
    console.log("Input:", inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnterPress();
    }
  };

  const GithubUsers: React.FC = () => {
    const [users, setUsers] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fetched, setFetched] = useState(false); // Flag to track if data has been fetched
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      setFetched(false);

      try {
        const data = await searchGithub();
        setUsers(data);
        setFetched(true); // Set fetched to true after data is successfully loaded
      } catch (err) {
        setError('Failed to fetch GitHub users.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    }
    return (
      <div>
        <h1>GitHub Users</h1>
        <button onClick={fetchUsers}>Search Random Candidate</button>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Conditionally render the users list only if data has been fetched */}
        {fetched && !loading && !error && (
          <div>
            {users.map(user => (
              <div key={user.id} style={{ border: '1px solid #ddd', padding: '8px', margin: '8px' }}>
                <img src={user.avatar_url} alt={`${user.login}'s avatar`} width={50} height={50} />
                <h2>{user.login}</h2>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };




  return <div>
    <h1>CandidateSearch</h1>
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
    <GithubUsers />

  </div>


}


export default CandidateSearch;
