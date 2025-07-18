import "./overlay.css";

interface OverlaySelectRoleProps {
  setType: (type: "User" | "Company" | null) => void;
  setShowTypeSelector: (show: boolean) => void;
  page: string;
}

function OverlaySelectRole({
  setType,
  setShowTypeSelector,
  page,
}: OverlaySelectRoleProps) {
  return (
    <div className="login-type-overlay">
      <div className="overlay-content">
        <h2 style={{ marginBottom: "1.5rem" }}>{page} as</h2>
        <button
          style={{
            margin: "0 1rem 1rem 0",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
          }}
          onClick={() => {
            setType("User");
            setShowTypeSelector(false);
          }}
        >
          {page} as User
        </button>
        <button
          style={{
            margin: "0 0 1rem 1rem",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
          }}
          onClick={() => {
            setType("Company");
            setShowTypeSelector(false);
          }}
        >
          {page} as Company
        </button>
        <p style={{ marginTop: "1rem", color: "#666" }}>
          Please select your {page} type to continue.
        </p>
      </div>
    </div>
  );
}

export default OverlaySelectRole;
