import { SearchIcon, ChevronDownIcon } from "./IconComponents";

export default function RankingHeader() {
  return (
    <div className="header">
      <div className="header-left">
        <h1 className="title">Leaderboard</h1>
        <p className="subtitle">All representatives</p>
      </div>

      {/* <div className="header-right">
        <div className="search-container">
          <SearchIcon />
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        <div className="dropdown">
          <span>Overall</span>
          <ChevronDownIcon />
        </div>

        <div className="toggle-buttons">
          <button className="toggle-btn active">This Month</button>
          <button className="toggle-btn">All Time</button>
        </div>
      </div> */}
    </div>
  );
}
