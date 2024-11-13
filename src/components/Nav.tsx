import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <Navbar
        links={[
          <Link key={1} className="nav-link text-light nav-item" to="/">
            Candidate Search
          </Link>,
          <Link key={2} className="nav-link text-light nav-item" to="/SavedCandidates">
            Saved Candidates
          </Link>,
        ]}
      />
    </div>
  )
};

export default Nav;
