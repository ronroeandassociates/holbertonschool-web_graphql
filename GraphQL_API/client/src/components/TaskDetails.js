import { graphql } from 'react-apollo';
import { getTaskDetailQuery } from '../queries/queries';

function TaskDetails(props) {
  // Component to display task details in sidebar

  function displayTaskDetails() {
    // Define structure for task component inside main TaskDetails component
    const { task } = props.data;
    // Set display options for if task clicked on or not
    if (task) {
      return (
        <div>
          <h2>Title of task: { task.title }</h2>
          <p>Weight of the task: { task.weight }</p>
          <p>Title of the project: { task.project.title }</p>
          <p>All tasks of the project:</p>
          <ul className="other-tasks"> {
            // li for each task in project - gross mapping syntax imo
              task.project.tasks.map(item => {
                return (<li key={item.id}>{item.title}</li>)
              })
            }
            </ul>
        </div>
      )
    } else {
      return (<div>No task selected...</div>)
    }
  }

  return (
    <div id="task-details">
      {displayTaskDetails()}
    </div>
  );
}

// Bind query to component with variables
// Defines that id is passed from TaskList component to getTaskDetailQuery in queries.js
/* Pretty sure how this works is that React reads file and there is no task then hits this,
  runs query, then comes back with data and actually renders component,
  which is why $id is nullable in getTaskDetailQuery - runs twice */
export default graphql(getTaskDetailQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.taskId
      }
    }
  }
})(TaskDetails);
