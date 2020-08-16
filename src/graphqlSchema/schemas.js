const graphql = require("graphql");
const User = require("../schema/user");
const Exercise = require("../schema/exercise");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const ExerciseType = new GraphQLObjectType({
  name: "Exercise",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    teacher_id: { type: GraphQLID },
    name: { type: GraphQLString },
    desciption: { type: GraphQLString },
    num_of_times: { type: GraphQLString },
    repetitions: { type: GraphQLString },
    interval: { type: GraphQLString },
    weight: { type: GraphQLString },
    days_of_week: { type: GraphQLString },
    icon: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "QueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    userByName: {
      args: { name: { type: GraphQLString } },
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ name: args.name });
      },
    },
    userByEmailAndPass: {
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ email: args.email, password: args.password });
      },
    },
    exercise: {
      type: ExerciseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Exercise.findById(args.id);
      },
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve(parent, args) {
        return Exercise.find({});
      },
    },
    exercisesByTeacher: {
      type: new GraphQLList(ExerciseType),
      args: { teacher_id: { type: GraphQLID } },
      resolve(parent, args) {
        return Exercise.find({ teacher_id: args.teacher_id });
      },
    },
    exercisesByUser: {
      type: new GraphQLList(ExerciseType),
      args: { user_id: { type: GraphQLID } },
      resolve(parent, args) {
        return Exercise.find({ user_id: args.user_id });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },
    addExercise: {
      type: ExerciseType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        teacher_id: { type: GraphQLID },
        name: { type: GraphQLString },
        desciption: { type: GraphQLString },
        num_of_times: { type: GraphQLString },
        repetitions: { type: GraphQLString },
        interval: { type: GraphQLString },
        weight: { type: GraphQLString },
        days_of_week: { type: GraphQLString },
        icon: { type: GraphQLString },
      },
      resolve(parent, args) {
        let exercise = new Exercise({
          user_id: args.user_id,
          teacher_id: args.teacher_id,
          name: args.name,
          desciption: args.desciption,
          num_of_times: args.numOfTimes,
          repetitions: args.repetitions,
          interval: args.interval,
          weight: args.weight,
          days_of_week: args.daysOfWeek,
          icon: args.icon,
        });
        return exercise.save();
      },
    },
    updateExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID },
        teacher_id: { type: GraphQLID },
        name: { type: GraphQLString },
        desciption: { type: GraphQLString },
        numOfTimes: { type: GraphQLString },
        repetitions: { type: GraphQLString },
        interval: { type: GraphQLString },
        weight: { type: GraphQLString },
        days_of_week: { type: GraphQLString },
        icon: { type: GraphQLString },
      },
      resolve(root, args) {
        return Exercise.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              desciption: args.desciption,
              num_of_times: args.numOfTimes,
              repetitions: args.repetitions,
              interval: args.interval,
              weight: args.weight,
              days_of_week: args.days_of_week,
              icon: args.icon,
            },
          },
          { new: true }
        );
      },
    },
    deleteExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(root, args) {
        return Exercise.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
