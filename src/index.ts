import { url } from "inspector";

const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    description: "Lorem ipsum dolor sit amet.",
    url: "https://github.com/ayungavis/graphql-learn",
  },
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `Hello, world!`,
    feed: () => links,
  },
  Mutation: {
    createPost: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
    updatePost: (parent, args) => {
      const index = links.findIndex((item) => item.id === args.id);
      const item = links.find((item) => item.id === args.id);
      const result = {
        ...item,
        url: args.url,
        description: args.description,
      };

      links.splice(index, 1);
      links.push(result);
      return result;
    },
    deletePost: (parent, args) => {
      const index = links.findIndex((item) => item.id === args.id);
      links.splice(index, 1);
      return `Link successfully deleted!`;
    },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
