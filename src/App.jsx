import Hero from "./components/Hero";
import Demo from "./components/Demo";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <main className="main-content [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <div className="max-w-7xl mx-auto sm:px-16 px-6 flex justify-center items-center flex-col font-sans">
          <Hero />
          <Demo />
        </div>
      </main>
    </div>
  );
};

export default App;