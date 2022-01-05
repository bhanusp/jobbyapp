import {Route, Switch, Redirect} from 'react-router-dom'

import JobRoute from './components/JobRoute'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import JobItem from './components/JobItem'

import './App.css'
import Home from './components/Home'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
      <Route path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </div>
)

export default App
