// import "./RankingPage.css"

// // Icon components (you can replace these with your preferred icon library)
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="8" />
//     <path d="m21 21-4.35-4.35" />
//   </svg>
// )

// const ChevronDownIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <polyline points="6,9 12,15 18,9" />
//   </svg>
// )

// const InfoIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="10" />
//     <line x1="12" y1="16" x2="12" y2="12" />
//     <line x1="12" y1="8" x2="12.01" y2="8" />
//   </svg>
// )

// const TrendingUpIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
//     <polyline points="17,6 23,6 23,12" />
//   </svg>
// )

// const TrendingDownIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
//     <polyline points="17,18 23,18 23,12" />
//   </svg>
// )

// export default function RankingPage() {
//   const topThree = [
//     {
//       id: 2,
//       name: "John Doe",
//       level: 3,
//       position: 2,
//       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
//       change: -2,
//     },
//     {
//       id: 1,
//       name: "Rey Mibourne",
//       level: 3,
//       position: 1,
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
//       change: 5,
//     },
//     {
//       id: 3,
//       name: "Augusta Mitchell",
//       level: 3,
//       position: 3,
//       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
//       change: 6,
//     },
//   ]

//   const allRankings = [
//     {
//       position: 1,
//       name: "Rey Mibourne",
//       level: 3,
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
//       change: 5,
//       changeType: "up",
//     },
//     {
//       position: 2,
//       name: "John Doe",
//       level: 3,
//       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
//       change: 2,
//       changeType: "down",
//     },
//     {
//       position: 3,
//       name: "Augusta Mitchell",
//       level: 3,
//       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
//       change: 6,
//       changeType: "up",
//     },
//     {
//       position: 4,
//       name: "Rey Mibourne",
//       level: 3,
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
//       change: 2,
//       changeType: "up",
//     },
//   ]

//   const achievements = [
//     { level: 1, value: "0.5", label: "Talk to Listen Ratio", color: "blue", count: 1 },
//     { level: 3, value: "30", label: "Positive Sentiment", color: "orange", count: 1 },
//     { level: 4, value: "60", label: "Number of Questions", color: "teal", count: 2 },
//     { level: 2, value: "5", label: "Conversations", color: "purple", count: 1 },
//   ]

//   return (
//     <div className="ranking-page">
//       <div className="container mt-5 mb-5">
//         {/* Header */}
//         <div className="header">
//           <div className="header-left">
//             <h1 className="title">Leaderboard</h1>
//             <p className="subtitle">All representatives &gt; Compare</p>
//           </div>

//           <div className="header-right">
//             <div className="search-container">
//               <SearchIcon />
//               <input type="text" placeholder="Search" className="search-input" />
//             </div>

//             <div className="dropdown">
//               <span>Overall</span>
//               <ChevronDownIcon />
//             </div>

//             <div className="toggle-buttons">
//               <button className="toggle-btn active">This Month</button>
//               <button className="toggle-btn">All Time</button>
//             </div>
//           </div>
//         </div>

//         <div className="main-content">
//           {/* Left Column */}
//           <div className="left-column">
//             {/* Podium */}
//             <div className="podium-card">
//               <div className="podium">
//                 {/* 2nd Place */}
//                 <div className="podium-person second">
//                   <img
//                     src={topThree[0].avatar || "/placeholder.svg"}
//                     alt={topThree[0].name}
//                     className="podium-avatar"
//                   />
//                   <div className="podium-name">{topThree[0].name}</div>
//                   <div className="podium-level">Level {topThree[0].level}</div>
//                   <div className="podium-number">2</div>
//                 </div>

//                 {/* 1st Place */}
//                 <div className="podium-person first">
//                   <img
//                     src={topThree[1].avatar || "/placeholder.svg"}
//                     alt={topThree[1].name}
//                     className="podium-avatar large"
//                   />
//                   <div className="podium-name large">{topThree[1].name}</div>
//                   <div className="podium-level">Level {topThree[1].level}</div>
//                   <div className="podium-number gold">1</div>
//                 </div>

//                 {/* 3rd Place */}
//                 <div className="podium-person third">
//                   <img
//                     src={topThree[2].avatar || "/placeholder.svg"}
//                     alt={topThree[2].name}
//                     className="podium-avatar"
//                   />
//                   <div className="podium-name">{topThree[2].name}</div>
//                   <div className="podium-level">Level {topThree[2].level}</div>
//                   <div className="podium-number">3</div>
//                 </div>
//               </div>
//             </div>

//             {/* Rankings List */}
//             <div className="rankings-card">
//               {allRankings.map((person, index) => (
//                 <div key={index} className="ranking-item">
//                   <div className="ranking-left">
//                     <div className="position">{person.position}</div>
//                     <img src={person.avatar || "/placeholder.svg"} alt={person.name} className="ranking-avatar" />
//                     <div className="ranking-info">
//                       <div className="ranking-name">{person.name}</div>
//                       <div className="ranking-level">Level {person.level}</div>
//                     </div>
//                   </div>

//                   <div className="ranking-change">
//                     {person.changeType === "up" ? <TrendingUpIcon /> : <TrendingDownIcon />}
//                     <span className={`change-text ${person.changeType}`}>{person.change} from last month</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="right-column">
//             {/* Profile Card */}
//             <div className="profile-card">
//               <img
//                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
//                 alt="Rey Mibourne"
//                 className="profile-avatar"
//               />
//               <h3 className="profile-name">Rey Mibourne</h3>
//               <div className="level-badge">Level 3</div>
//               <div className="stars">
//                 <span>★</span>
//                 <span>★</span>
//                 <span>★</span>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="categories-card">
//               <h4 className="card-title">Achiever in other categories</h4>
//               <div className="badges">
//                 <span className="badge cyan">Best Talk</span>
//                 <span className="badge teal">Best Listening</span>
//                 <span className="badge blue">Talk to Listen Ratio</span>
//               </div>
//             </div>

//             {/* Achievements */}
//             <div className="achievements-card">
//               <h4 className="card-title">Achievements</h4>
//               <div className="achievements-list">
//                 {achievements.map((achievement, index) => (
//                   <div key={index} className="achievement-item">
//                     <div className="achievement-left">
//                       <div className={`achievement-icon ${achievement.color}`}>{achievement.value}</div>
//                       <div className="achievement-info">
//                         <div className="achievement-level">Level {achievement.level}</div>
//                         <div className="achievement-label">
//                           {achievement.label}
//                           <InfoIcon />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="achievement-count">{achievement.count}</div>
//                   </div>
//                 ))}
//               </div>

//               <button className="more-achievements">+ 5 More Achievements</button>
//             </div>

//             {/* Level Progress */}
//             <div className="progress-card">
//               <div className="progress-header">
//                 <h4 className="card-title">
//                   Level 3
//                   <InfoIcon />
//                 </h4>
//               </div>
//               <div className="progress-bar">
//                 <div className="progress-fill" style={{ width: "87%" }}></div>
//               </div>
//               <div className="progress-text">
//                 <span className="progress-percentage">87%</span> completed
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import "./RankingPage.css";
import RankingHeader from "../../component/ranking/RankingHeader";
import Podium from "../../component/ranking/Podium";
import RankingsList from "../../component/ranking/RankingsList";
import ProfileCard from "../../component/ranking/ProfileCard";
import Categories from "../../component/ranking/Categories";
import Achievements from "../../component/ranking/Achievements";
import LevelProgress from "../../component/ranking/LevelProgress";

import { topThreeData, allRankingsData, achievementsData } from "../../data";
import RankingsListContainer from "../../component/ranking/RankingListContainer";

export default function RankingPage() {
  return (
    <div className="ranking-page">
      <div className="container mt-5 mb-5">
        {/* Header */}
        <RankingHeader />

        <div className="main-content">
          {/* Left Column */}
          <div className="left-column">
            {/* Podium */}
            <Podium />

            {/* Rankings List */}
            <RankingsListContainer />
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Profile Card */}
            <ProfileCard />

            {/* Categories
            <Categories /> */}

            {/* Achievements */}
            <Achievements />

            {/* Level Progress */}
            <LevelProgress />
          </div>
        </div>
      </div>
    </div>
  );
}
