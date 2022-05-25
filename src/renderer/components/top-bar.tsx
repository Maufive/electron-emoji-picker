const TopBar: React.FC = ({ children }) => (
  <nav id="top-bar" className="w-screen h-12 items-center flex z-0 fixed top-0">
    {children}
  </nav>
)

export default TopBar
