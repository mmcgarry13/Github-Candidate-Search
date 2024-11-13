import { useEffect, useState } from 'react';

const SavedCandidates = () => {
  const [users, setUsers] = useState<Candidate[]>([]);
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    if (savedUsers.length > 0) {
      setUsers(savedUsers);
    }
  }, []);
  return (
    <div>
      <h1>Potential Candidates</h1>
      {users.map(user => (
        <div key={user.id} style={{ border: '1px solid #ddd', padding: '8px', margin: '8px' }}>
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} width={50} height={50} />
          <h2>{user.login}</h2>
          <h2>{user.name}</h2>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      ))}
    </div>
  );
};

export default SavedCandidates;
