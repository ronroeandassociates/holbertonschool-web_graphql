import { useState } from "react";
import { graphql } from 'react-apollo';
import TaskDetails from './TaskDetails';
import { getTasksQuery } from '../queries/queries';

function TaskList(props) {
  // Component to display list of tasks

  // Hold info about task selected in state
  // state is state object in this instance - I don't like this variable name
  // There's also not really a reason to be object rather than string
  const [state, setState] = useState({
    selected: null
  });

  function displayTasks() {
    // Define structure for display of each task inside main TaskList component
    const data = props.data;
    if (data.loading) {
      return (<div>Loading tasks...</div>);
    } else {
      return data.tasks.map(task => {
        return (
          <li
            key={task.id}
            onClick={(e) => {
              setState({
                selected: task.id
              });
            }}
          >
            {task.title}
          </li>
        );
      })
    }
  }

  return (
    // Note that state.selected is passed to TaskDetails component as props
    <div>
      <ul id="task-list">{displayTasks()}</ul>
      <TaskDetails taskId={state.selected} />
    </div>
  );
}

export default graphql(getTasksQuery)(TaskList);
