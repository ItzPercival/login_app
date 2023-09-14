import Login from "./components/Login.js"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <div className="h-screen w-screen bg-slate-50">
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
