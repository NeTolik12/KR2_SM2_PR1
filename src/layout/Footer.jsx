export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="developer-section">
              <span className="developer-info">
                <span className="code-icon">🍻</span>
                <span className="dev-text">Разработано by</span>
                <a href="https://github.com/NeTolik12" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="developer-link">
                  <span className="dev-name-glitch" data-text="_Sh1VeN_">_Sh1VeN_</span>
                </a>
              </span>
            </div>
            
            <div className="footer-decoration">
              <div className="footer-dots"></div>
            </div>
            
            <div className="copyright-section">
              <span className="copyright">
                © {new Date().getFullYear()} React Movies
              </span>
              <span className="version">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-wave"></div>
    </footer>
  )
}
