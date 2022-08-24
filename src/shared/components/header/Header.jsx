import "./Header.css";

const Header = ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header-logo">
        <img src="/netflix-logo.png" alt="Netflix" />
      </div>

      <div className="header-user">
        <img src="/user-icon.png" alt="User" />
      </div>
    </header>
  );
};

export { Header };
