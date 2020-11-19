import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
   deleteActivity: (id:string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
    deleteActivity,
    activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivity, createActivity, editActivity}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
            <ActivityList deleteActivity={deleteActivity} selectActivity={selectActivity} activities={activities}/>
            </Grid.Column>
            <Grid.Column width={6}>
            { selectedActivity && !editMode && 
            <ActivityDetails setSelectedActivity={setSelectedActivity} setEditMode={setEditMode} selectedActivity={selectedActivity}/>}
            { editMode && <ActivityForm
            key={selectedActivity && selectedActivity.id || 0}
             createActivity={createActivity} editActivity={editActivity} activity={selectedActivity!} setEditMode={setEditMode} />}
            </Grid.Column>
        </Grid>
        
    )
}
