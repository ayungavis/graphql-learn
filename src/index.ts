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
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
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