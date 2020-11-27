import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { RouteComponentProps } from 'react-router-dom';



interface DetailParams {
    id: string;
}


export const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    
const activityStore = useContext(ActivityStore)
const {createActivity, clearActivity, loadActivity, editActivity, submitting, selectedActivity: initialFormState, cancelFormOpen} = activityStore

useEffect(() => {
if(match.params.id && activity.id.length === 0) {
    loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState))
}
return () => {
clearActivity();
}
},[loadActivity, clearActivity, match.params.id, initialFormState])


const [activity, setActivity] = useState<IActivity>(
    {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }
)

const handleSubmit = () => {
    if(activity.id.length === 0){
        let newActivity = {
            ...activity,
            id: uuid()
        }
        createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    }    else {
        editActivity(activity).then(() => history.push(`/activities/${activity.id}`))
    }
}

const handleInputChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    const {name, value} = e.currentTarget
    setActivity({...activity, [name]: value})
} 

    return (
        <Grid>
<Grid.Column width={10}>
<Segment clearing >
           <Form onSubmit={handleSubmit}>
               <Form.Input onChange={handleInputChange} name="title" placeholder="Title" value={activity.title} />
               <Form.TextArea onChange={handleInputChange} name="description" rows={2} placeholder="Description"  value={activity.description} />
               <Form.Input onChange={handleInputChange} name="category" placeholder="Category"  value={activity.category}/>
               <Form.Input onChange={handleInputChange} name="date" type="datetime-local" placeholder="Date" value={activity.date} />
               <Form.Input onChange={handleInputChange} name="city" placeholder="City" value={activity.city} />
               <Form.Input onChange={handleInputChange} name="venue" placeholder="Venue" value={activity.venue} />
               <Button loading={submitting}  floated="right" positive type="submit" content='Submit' />
               <Button onClick={cancelFormOpen} floated="right"  type="button" content='Cancel' />
           </Form>
       </Segment>


</Grid.Column>



        </Grid>
    
    )
}
