import { gql } from 'apollo-boost';

const getTasksQuery = gql
`{
  tasks {
    id
    title
  }
}`;

const getProjectsQuery = gql
`{
  projects {
    id
    title
  }
}`;

// Define variables and types to pass into mutation
const addTaskMutation = gql
// ! defines required fields as variables - returns title/id only
`mutation($title: String!, $weight: Int!, $description: String!, $projectId: ID!)
  {
    addTask(
      title: $title,
      weight: $weight,
      description: $description,
      projectId: $projectId
    ) {
      title
      id
    }
}`;

const addProjectMutation = gql
`mutation($title: String!, $weight: Int!, $description: String!)
  {
    addProject(
      title: $title,
      weight: $weight,
      description: $description
    ) {
      title
      id
    }
}`;

const getTaskDetailQuery = gql
// Note that id is not required because does not originally exist - only in refetch
`query($id: ID) {
  task(id: $id) {
    id
    title
    weight
    description
    project {
      title
      description
      tasks {
        title
        id
      }
    }
  }
}`;

export { getTasksQuery, getProjectsQuery, addTaskMutation, addProjectMutation, getTaskDetailQuery };
