import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react'
import './styles.css';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import Agent from '../api/Agent';
import { LoadingComponent } from './LoadingComponent';



const App = () =>  {
const [activities, setActivities] = useState<IActivity[]>([])
const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
const [editMode, setEditMode] = useState(false);
const [loading, setLoading] = useState(true);
const [submitting, setSubmitting] = useState(false);
const [target, setTarget] = useState('');

const handleSelectActivity = (id: string) => {
  setSelectedActivity(activities.filter(a => a.id === id)[0]);
  setEditMode(false);
}

const handleOpenCreateForm = () => {
  setSelectedActivity(null)
  setEditMode(true)
}

const handleCreateActivity = (activity: IActivity) => {
  setSubmitting(true)
  Agent.Activities.create(activity).then(() => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false)
  }).then(() => setSubmitting(false))

}

const handleEditActivity = (activity: IActivity) => {
  setSubmitting(true)
  Agent.Activities.update(activity).then(() => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }).then(() => setSubmitting(false))

}

const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
  setSubmitting(true)
  setTarget(event.currentTarget.name)
  Agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(a => a.id !== id)])

  }).then(() => setSubmitting(false))
}

 useEffect(() => {
 Agent.Activities.list()
  .then(response => {
let activities: IActivity[] = [];
response.forEach((activity) => {
  activity.date = activity.date.split('.')[0];
  activities.push(activity);
})
   setActivities(activities);
  }).then(() => setLoading(false));
  }, []);

  if(loading) return <LoadingComponent content="Loading activities...." />
 
  
  return (
    <>
    <NavBar openCreateForm={handleOpenCreateForm}/>
    <Container style={{marginTop:'7em'}}>
   <ActivityDashboard 
   submitting={submitting}
   deleteActivity={handleDeleteActivity}
   createActivity={handleCreateActivity}
   editActivity={handleEditActivity}
   setSelectedActivity={setSelectedActivity}
   selectedActivity={selectedActivity} 
   selectActivity={handleSelectActivity} 
   activities={activities} 
   editMode={editMode}
   setEditMode={setEditMode}
   target={target}
   />

    </Container>
   </>
  );
  }


export default App;
