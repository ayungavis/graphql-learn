const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

let links = [
  {
    id: "link-0",
    description: "Lorem ipsum dolor sit amet.",
    url: "https://github.com/ayungavis/graphql-learn",
  },
];

const resolvers = {
  Query: {
    info: () => `Hello, world!`,
    feed: () => links,
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
