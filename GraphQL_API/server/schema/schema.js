const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');

// Schema definition for tasks
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    projectId: { type: GraphQLID },
    project: {
      type: ProjectType,
      resolve: (parent, _args) => Project.findById(parent.projectId)
    },
  })
});
