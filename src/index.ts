import { link } from "fs";

const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `Hello, world!`,
    feed: () => async (parent, args, context) => {
      const links = await context.prisma.link.findMany();
      return links;
    },
  },
  Mutation: {
    createPost: (parent, args, context, info) => {
      const link = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });

      return link;
    },
    updatePost: async (parent, args, context, info) => {
      const link = await context.prisma.link.update({
        where: { id: args.id },
        data: {
          url: args.url,
          description: args.description,
        },
      });

      return link;
    },
    deletePost: async (parent, args, context, info) => {
      await prisma.link.delete({ where: { id: args.id } });
      return "Data successfully deleted.";
    },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
