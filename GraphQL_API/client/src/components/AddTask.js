import { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getProjectsQuery, addTaskMutation, getTasksQuery } from "../queries/queries";

function AddTask(props) {
  // Component to add new task

  // Set function to update state and default state object values
  const [inputs, setInputs] = useState({
    // Note that "weight" is number here but string when input is changed so need to cast again later
    title: "",
    weight: 1,
    description: "",
    projectId: ""
  });

  // On change to any input, update state
  const handleChange = (e) => {
    const newInputs = {
      ...inputs
    };
    // Make sure weight is always number
    if (e.target.name === "weight") newInputs[e.target.name] = parseInt(e.target.value);
    else newInputs[e.target.name] = e.target.value
    setInputs(newInputs)
  }

  const submitForm = (e) => {
    e.preventDefault();
    // Call mutation with variables
    props.addTaskMutation({
      variables: {
        title: inputs.title,
        weight: inputs.weight,
        description: inputs.description,
        projectId: inputs.projectId
      },
      // Update page with new task (refetch/rerender)
      refetchQueries: [{ query: getTasksQuery }]
    });
  }

  function displayProjects() {
    // Add project titles to dropdown based on data from props
    // This is component inside main AddTask component
    const data = props.getProjectsQuery;
    if (data.loading) {
      // If loading, display loading message (data exists twice - loading and complete)
      return (<option disabled>Loading projects...</option>);
    } else {
      return data.projects.map(project => {
        // If loading complete, display project titles associated with ids as options
        return (
          // option key required for no console errors - not actually required
          <option
            key={project.id}
            value={project.id}
          >
            {project.title}
          </option>
        );
      })
    }
  }

  return (
    <form
      className="task"
      id="add-task"
      onSubmit={submitForm} >
      <div className="field" >
        <label> Task title: </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputs.title}
          required/>
      </div>
      <div className="field" >
        <label> Weight: </label>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={inputs.weight}
          required/>
      </div>
      <div className="field">
        <label> description: </label>
        <textarea
          name="description"
          onChange={handleChange}
          value={inputs.description}
          required/>
      </div>
      <div className="field">
        <label> Project: </label>
        <select
          name="projectId"
          onChange={handleChange}
          value={inputs.projectId}
          required>
          <option
            value=""
            disabled="disabled">Select project
          </option>
          {displayProjects()}
        </select>
      </div>
      <button> + </button>
    </form>
  );
}

// Create higher-order components that can execute queries and update based on data in Apollo store
export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addTaskMutation, { name: "addTaskMutation" })
)(AddTask);
