import { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getProjectsQuery, addProjectMutation } from "../queries/queries";

function AddProject(props) {
  // Component to add new project

  // Define state variables in inputsProject object
  // inputsProject is object, setInputsProject is function to set state
  const [inputsProject, setInputsProject] = useState({
    title: '',
    weight: 1,
    description: ''
  });

  const handleChange = (e) => {
    // When user changes input, update state
    const newInputsProject = {
      ...inputsProject
    };
    // weight is always string when passed as input, so need to cast for gql query
    if (e.target.name === "weight") newInputsProject[e.target.name] = parseInt(e.target.value);
    else newInputsProject[e.target.name] = e.target.value
    setInputsProject(newInputsProject)
  }

  const submitForm = (e) => {
    // When user submits form, add project to database
    e.preventDefault();
    // Call mutation with variables
    props.addProjectMutation({
      variables: {
        title: inputsProject.title,
        weight: inputsProject.weight,
        description: inputsProject.description
      },
      // Update dropdown with new project (refetch/rerender)
      refetchQueries: [{ query: getProjectsQuery }]
    });
  }

  return (
    // Structure of AddProject component using functions/state defined above
    <form
      className="project"
      id="add-project"
      onSubmit = {submitForm} >
      <div className="field" >
        <label> Project title: </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputsProject.title}/>
      </div>
      <div className="field">
        <label> Weight: </label>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={inputsProject.weight}/>
      </div>
      <div className="field">
      <label> description: </label>
      <textarea
        name="description"
        onChange={handleChange}
        value={inputsProject.description}/>
      </div>
      <button> + </button>
    </form>
  );
}

// Link ApolloClient to AddProject component
// Provide access to GraphQL data based on ApolloProvider in App.js
export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addProjectMutation, { name: "addProjectMutation" })
)(AddProject);
