import React, {  useEffect,  useContext } from 'react';
import { Container } from 'semantic-ui-react'
import './styles.css';
import  NavBar  from '../../features/nav/NavBar';
import  ActivityDashboard  from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import { observer } from 'mobx-react-lite';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom'
import Homepage from '../../features/home/Homepage';
import { ActivityForm } from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


const App: React.FC<RouteComponentProps> = ({location}) =>  {
const activityStore = useContext(ActivityStore)


 useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content="Loading activities...." />
 
  
  return (
    <>
<Route path="/" exact component={Homepage} />
<Route path={'/(.+)'} render={() => 
<>
<NavBar />
<Container style={{marginTop:'7em'}}>
<Switch>
  <Route path="/activities" exact component={ActivityDashboard} />
  <Route path="/activities/:id" component={ActivityDetails} />
  <Route key={location.key} path={["/createactivity", '/manage/:id']} component={ActivityForm} />
  </Switch>
</Container>
</>


} />
 
   </>
  );
  }


export default withRouter(observer(App))
