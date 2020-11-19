import React, { SyntheticEvent } from 'react'
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
   deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id:string) => void;
   submitting: boolean
   target: string
}

export const ActivityDashboard: React.FC<IProps> = ({
    deleteActivity, submitting, target,
    activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivity, createActivity, editActivity}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
            <ActivityList target={target} submitting={submitting} deleteActivity={deleteActivity} selectActivity={selectActivity} activities={activities}/>
            </Grid.Column>
            <Grid.Column width={6}>
            { selectedActivity && !editMode && 
            <ActivityDetails setSelectedActivity={setSelectedActivity} setEditMode={setEditMode} selectedActivity={selectedActivity}/>}
            { editMode && <ActivityForm submitting={submitting}
            key={selectedActivity && selectedActivity.id || 0}
             createActivity={createActivity} editActivity={editActivity} activity={selectedActivity!} setEditMode={setEditMode} />}
            </Grid.Column>
        </Grid>
        
    )
}
