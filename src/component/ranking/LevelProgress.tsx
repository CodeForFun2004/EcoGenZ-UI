import { InfoIcon } from "./IconComponents";

export default function LevelProgress() {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <h4 className="card-title">
          Level 3
          <InfoIcon />
        </h4>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: "87%" }}></div>
      </div>
      <div className="progress-text">
        <span className="progress-percentage">87%</span> completed
      </div>
    </div>
  );
}