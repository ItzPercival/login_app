import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Welcome from './components/Welcome.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <div className="h-screen w-screen bg-slate-50">
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/welcome" Component={Welcome} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
