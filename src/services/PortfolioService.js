export const formatCategories = (categoriesData) =>{
    let categories = [];
    for (const key in categoriesData) {
        categories.push({id: key, category: categoriesData[key].category});
    }
    return categories;
}

export const formatProjects = (projectsData) =>{
    let projects = [];
    for (const key in projectsData) {
        projects.push({ ...projectsData[key], id: key});
    }
    return projects;
}
export const findProjectCategory = (categoryID, categories) => {
   const categoryName = categories.filter(category => {
        return category.id === categoryID    
    });
    return categoryName;     
}
