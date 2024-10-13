import {BrowserRouter, Route, Switch} from 'react-router-dom'

import AdminDashboard from './components/AdminDashboard'
import UserForm from './components/UserForm'


import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AdminDashboard} />
      <Route exact path="/login" component={UserForm} />
    </Switch>
  </BrowserRouter>
)

export default App