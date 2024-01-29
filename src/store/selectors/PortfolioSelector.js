import {createSelector} from 'reselect';

const getProjects = state => state.portfolio.project;



export const getProjectsByCategory = createSelector(
    getProjects,
    (_, category) => category,
    (items, category) => {
        if (category) {
            return items.filter(item => item.category === category);
        }
        return items; 
    }
    
);

export const getProjectsByID = createSelector(
    getProjects,
    (_, projectID) => projectID,
    (items, projectID) => {
        if (projectID) {
            return items.filter(item => item.id === projectID);
        }
        return items; 
    }
    
);