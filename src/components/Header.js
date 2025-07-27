import '../pages/LandingScreen.css';

function Header({ children, title, subtitle }) {
  return (
    <div className="banner">
      <h1>{title}</h1>
      <div style={{float:"left"}}></div>
      <p style={{textAlign:"left", marginTop:"70px"}}>{subtitle}</p>
      {children}
    </div>
  );
}

export default Header;