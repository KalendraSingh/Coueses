import {Route, Switch} from 'react-router-dom'
import './App.css'

import AllCourses from './components/AllCourses/index'
import CourseDetails from './components/CourseDetail'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={AllCourses} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route component={NotFound} />
  </Switch>
)
export default App
