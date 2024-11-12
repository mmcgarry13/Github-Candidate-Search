import { useState } from 'react'; // add useEffect back when ready
import { searchGithub, searchGithubUser } from '../api/API';
import.meta.env.VITE_GITHUB_TOKEN;

const CandidateSearch = () => {

  const GithubUsers: React.FC = () => {
    const [users, setUsers] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState(''); // State to store input value


    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchGithub();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch GitHub users.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };


    const searchUser = async () => {
      if (!username) return; // Exit if input is empty

      try {
        const data = await searchGithubUser(username);
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch GitHub users.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    const saveUser = (user: Candidate) => {
      const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');

      // Check if user is already saved
      if (!savedUsers.find((savedUser: Candidate) => savedUser.id === user.id)) {
        // Add new user to saved users and store in localStorage
        savedUsers.push(user);
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
        alert(`${user.login} has been saved!`);
      } else {
        alert(`${user.login} is already saved.`);
      }
    };


    return (
      <div>
        <h1>GitHub Users</h1>

        <button onClick={fetchUsers}>Load Random GitHub Users</button>

        {/* Input field and search button for specific username */}
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            style={{ marginRight: '8px' }}
          />
          <button onClick={searchUser}>Search User</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          {users.map(user => (
            <div key={user.id} style={{ border: '1px solid #ddd', padding: '8px', margin: '8px' }}>
              <img src={user.avatar_url} alt={`${user.login}'s avatar`} width={50} height={50} />
              <h2>{user.login}</h2>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
              <div style={{ border: '1px' }}>
                <button onClick={() => saveUser(user)} style={{ marginTop: '10px' }}>
                  Save User
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  return <div>
    <h1>CandidateSearch</h1>
    <GithubUsers />

  </div>


}


export default CandidateSearch;
