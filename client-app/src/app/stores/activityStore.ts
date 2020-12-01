import { makeAutoObservable, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react'
import { IActivity } from '../models/activity';
import Agent from '../api/Agent';

configure({enforceActions: 'always'});

class ActivityStore {
    constructor(){
        makeAutoObservable(this)
    }
    //observables
    activityRegistry = new Map();
    activities:IActivity[] = [];
    loadingInitial = false;
    selectedActivity: IActivity | undefined;
    editMode = false;
    submitting = false;
    target = '';

    //computed

   @computed get activitiesByDate(){
       return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
   }

   groupActivitiesByDate(activities: IActivity[]){
       const sortedActivities = activities.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
       )
       return Object.entries(sortedActivities.reduce((activities, activity) => {
const date = activity.date.split('T')[0];
activities[date] = activities[date] ? [...activities[date], activity] : [activity]
return activities;
       }, {} as {[key: string]: IActivity[]}));
   }



    //actions

    cancelSelectedAtivity = () => {
        this.selectedActivity = undefined;
    }
    cancelFormOpen = () => {
        this.editMode = false;
    }
    openEditForm = (id:string) => {
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = true;
    }
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await Agent.Activities.list()
            activities.forEach((activity) => {
                activity.date = activity.date.split('.')[0];
                this.activityRegistry.set(activity.id, activity);
              });
            //   console.log(this.groupActivitiesByDate(activities));
              
              this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    };

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if(activity){
            this.selectedActivity = activity
        } else {
            // this.loadingInitial = true;
            try{
                activity = await Agent.Activities.details(id);
                runInAction(() => {
                    this.selectedActivity = activity;
                    this.loadingInitial = false;
                console.log('load activity ran');
                })
                    
                
            } catch (error) {
                console.log(error);
                
            }
            // this.loadingInitial = false;

        }
    }

    clearActivity = () => {
        this.selectedActivity = undefined;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id)
    }

    createActivity = async (activity: IActivity) => {
        this.submitting = true;

        try{
            await Agent.Activities.create(activity);
            this.activityRegistry.set(activity.id, activity);
            this.submitting = false;

        } catch (error) {
            console.log(error);
            this.submitting = false;

        }
    };

    editActivity = async (activity: IActivity) => {
this.submitting = true;
try{
Agent.Activities.update(activity);
this.activityRegistry.set(activity.id, activity)
this.selectedActivity = activity;
this.submitting = false
} catch (error) {
    this.submitting = false
    console.log(error);
}
    }

    deleteActivity = async (event: SyntheticEvent<HTMLButtonElement> , id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try{
            await Agent.Activities.delete(id);
            this.activityRegistry.delete(id);
            this.submitting = false;
            this.target = '';

        } catch (error) {
console.log(error);
this.submitting = false;
this.target = '';

        }
    }


}

export default createContext(new ActivityStore())