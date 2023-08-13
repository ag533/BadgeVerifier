import logo from "./playmakers_logo.png";
import "./App.css";
import UploadForm from "./components/UploadForm";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://www.playmakers.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      </header>
      <div className="App-body">
        <p className="Body-header">Badge Verifier</p>
        <UploadForm />
      </div>
      <div className="App-footer">
        <p>
          Created by
          <b>Playmakers @2023</b>
        </p>
      </div>
    </div>
  );
}

export default App;
