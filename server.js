var express = require('express');
var express_graphql = require('express-graphql');
const cors = require('cors');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        author(id: Int!): Author
        authors(topic: String): [Author]
    },
    type Author {
        id: Int
        name: String
        year: Int
    }
`);

var faker = require('faker');

var authors = [];

for (let index = 0; index < 10; index++) {
    authors.push(
        {
            id: index + 1,
            name: faker.name.findName(),
            year: new Date(faker.date.between('1920-10-10', '1990-10-10')).getFullYear()
        }
    );
}

var getAuthor = function(args) { 
    var id = args.id;
    return authors.filter(author => {
        return author.id == id;
    })[0];
}

var getAuthors = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return authors.filter(author => author.topic === topic);
    } else {
        return authors;
    }
}

var root = {
    author: getAuthor,
    authors: getAuthors
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true

}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));