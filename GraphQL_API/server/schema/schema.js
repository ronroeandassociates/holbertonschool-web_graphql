const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const Project = require('../models/project');
const Task = require('../models/task');

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

// Schema definition for projects
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: (parent, _args) => Task.find({ projectId: parent.id })
    },
  })
});

// Root query for defining types of queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      // fields in task defined by TaskType - object of type TaskType
      type: TaskType,
      // args defines id as only way to search for specific task
      args: { id: { type: GraphQLID } },
      // resolve fetches data from database based on id - task(id:"6226feb8fcbbf3df2cf632e1")
      resolve: (_parent, args) => Task.findById(args.id)
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Project.findById(args.id)
    },
    tasks: {
      type: new GraphQLList(TaskType),
      // resolve fetches all tasks from database - notice no args
      resolve: () => Task.find({})
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => Project.find({})
    }
  })
});

// Mutations for defining types of mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // addProject mutation adds ProjectType to database
    addProject: {
      type: ProjectType,
      // args defines fields necessary to add project (non-nullable)
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      // resolve creates new project and saves to database
      resolve: (_parent, args) => {
        const proj = new Project({
          // Notice args are passed in as object
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        // return is necessary to view what just addded - otherwise adds and saves but returns null
        return proj.save();
      }
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        const tsk = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId,
        });
        return tsk.save();
      }
    },
  })
});

// Schema definition for queries based on RootQuery fields
const schema = new GraphQLSchema({
  // Define all queries and mutations used in app.js graphqlHTTP object
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;
