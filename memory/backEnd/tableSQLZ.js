var Sequelize = require('sequelize');
var sequelize = new Sequelize('googlesheet', 'root', 'denev2211',
                    {host: 'localhost',
                    dialect: 'mysql',
                    pool: {max: 5,
                        min: 0,
                        idle: 10000 },
                    logging: false
                } );

var User = sequelize.define('user', {
    login: Sequelize.STRING,
    mail: Sequelize.STRING,
    password:  Sequelize.TEXT,
});
var Sheet = sequelize.define('sheet', {
    title: Sequelize.STRING,
} )

User.hasMany(Sheet)

Sheet.belongsTo(User, {through: 'UserSheet'})

sequelize.sync()

async function fillDB(){
    await sequelize.sync()
    var user1 = await User.create( {
                            login: 'Summer',
                            mail: 'summer@google.com',
                            password: '123summer!'
                        })
    var user2 = await User.create(
                        {
                            login: 'Spring',
                            mail: 'spring@yahoo.com',
                            password: '456spring)'
                        })
    
    var sheetUs1_1 = await Sheet.create({title: 'first sheet'})
    var sheetUs1_2 = await Sheet.create({title: 'min_max sheet'})
    
    user1.addSheet(sheetUs1_1)
    user1.addSheet(sheetUs1_2)
    
    var sheetUs2_1 = await Sheet.create({title: 'my_Sheet'})
    var sheetUs2_2 = await Sheet.create({title: 'sheet_11.07.2018'})
    
    user2.addSheet(sheetUs2_1)
    user2.addSheet(sheetUs2_2)
}

// fillDB()

var express = require('express');
const cors = require ('cors');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var app = express();
app.use(cors())

// GraphQL schema
var schema = buildSchema(`
    type Query {
        sheet(id: Int!): Sheet
        user (id: Int!): User
    }
    type Sheet {
        id: Int
        title: String
    }
    type User {
        id: Int
        login: String
    }
`);
function getSheet(args){
    let id = args.id
    return Sheet.findById(id)
}
// Root resolver
var root = {
    sheet: getSheet
};
// Create an express server and a GraphQL endpoint
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
