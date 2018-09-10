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
    key: Sequelize.STRING,
    grid: Sequelize.TEXT('long')
} )

Sheet.beforeCreate(function(model, options) {
    return new Promise ((resolve, reject) => {
        var shajs = require('sha.js')
        model.key = shajs('sha256').update(`${Math.random}${(new Date()).toString()}${this.title}`).digest('hex')
        resolve(model, options)
    });
})

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
    var sheetUs1_1 = await Sheet.create({grid: 'some array'})
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
    type Mutation {
        createUser(login: String!, mail: String!, password: String!): User
        createSheet(userID: Int!, title: String!, grid: String!): User
    }

    type Sheet {
        id: Int
        title: String
        key: String
        grid: String
    }
    type User {
        id: Int
        login: String
        mail: String
        password: String
        sheets: [Sheet]
    }
`);

async function getUser(args){
    let id = args.id
    let user = await User.findById(id)
    user.sheets = await user.getSheets()
    return user;
}

function getSheet(args){
    let id = args.id
    return Sheet.findById(id)
}

function getUserSheets(args){
    let id = args.id
    return User.findById(id).then( user => user.getSheets() )
}

async function createUser({login, mail, password}){
    return User.create({login, mail, password})
}
async function createSheet({userID, title, grid}){
    let user  = await User.findById(userID)
    let sheet = await Sheet.create({title, grid})
    user.addSheet(sheet)
    return sheet
}


var root = {
    sheet: getSheet,
    user: getUser,
    createUser,
    createSheet,
};

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
