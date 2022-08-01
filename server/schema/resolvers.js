const { User } = require('../models');
// gql error handling
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if(context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        
      return userData;
      }
  
      throw new AuthenticationError('Pease login to use this service!');
    }
  },
  
   Mutation: {
      addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
  
      return { token, user };
    },
  
      login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new AuthenticationError('Credentials are incorrect!');
      }
        
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw new AuthenticationError('Credentials are incorrect!');
      }
  
      const token = signToken(user);
      return { token, user };
      },
      
      saveBook: async (parent, { input }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: input } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('Please login to use this service!')
      },
  
      deleteBook: async (parent, args, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: args.bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('Please login to use this service!')
      } 
    }
  };
  
  module.exports = resolvers;
