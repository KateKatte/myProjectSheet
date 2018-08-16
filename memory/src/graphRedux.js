import React, { Component } from 'react';
import './App.css';
import {Router, Route, Link, Switch} from "react-router-dom"
import createHistory from "history/createBrowserHistory"
import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { GraphQLClient } from 'graphql-request'
const gql =  new GraphQLClient("http://localhost:4000/graphql", { headers: {} })

gql.request(`query getSheet ($sheetId: Int!) {
    sheet (id: $sheetId) {
      title
      id
    }
  }`,
  {
    "sheetId": 5
  }).then(data => console.log(data))

function getFeed() {
    store.dispatch({type: 'DATA_GOT'})
    gql.request(`query getUser ($userId: Int!, ) {
        user (id: $userId) {
          id
          login
          password
        }
      }`).then(data => store.dispatch({type: "DATA_GOT", data}))
}  

function userReducer(state, action){
    if (state === undefined){
        return {data: {}, status: 'DATA_LOAD'}
    }
    if (action.type === 'USER'){
        return {data: action.data.user, status: 'DATA_GOT'}
    }
    return state;
}


function sheetsReducer(state, action){
    if (action.type === undefined){
        return {data:[], status: 'DATA_LOAD'}
    }
    if (action.type === 'DATA'){
        console.log(action)
        return {data: action.data.sheet, status: 'DATA_GOT'}
    }
    return state;
  }

const reducerData = combineReducers({
//   sheet: sheetsReducer,
  user: userReducer
})

var store = createStore(reducerData);
store.subscribe( () => console.log(store.getState()))


class SheetFeed extends Component {
    render (props) {
        console.log(this.props)
        return (
            <div className='sheet'>
                <div>{this.props.sheet.id}</div>
                <div>{this.props.sheet.title}</div>
            </div>
        )
    }
}

class Feed extends Component {
    render(){
        console.log(this.props)
        // if (this.props.sheet.data.status === 'DATA_GOT'){
            return (
                <div className='feedContainer'> please, wait :) </div>
                
            )
        // }
            return (
                <div className='feedContainer'>
                    {this.props.sheet.data.map(item => <SheetFeed sheet={item} key={item.id} />)}
                </div>
            );
    }
}

class FeedPage extends Component {
    render (){
        getFeed();
        return (
            <div>
              <Link to='/addUser'>Add user...</Link>
              <Link to='/addSheet'>Add sheet...</Link>
              <Feed />
            </div>
        )
    }
}

class Sheet extends Component {
    render (){
        return (
            <div>
              user sheet: {this.props.sheet.title}
            </div>
        )
    }
}


class SheetsList extends Component {
    render (){
        if (this.props.sheets){
            return (
                <div className='sheets'>
                   {this.props.sheets.map( item => <Sheet sheet={item} key={item.id}/>)}
                </div>
            )
        }
        return (
            <div className='sheets'>
                Please, wait :)
            </div>
        )
    }
}

class User extends Component {
    render(){
        console.log(this.props)
        if (this.props.user.data.status === 'DATA_LOAD'){
            return (
                <div className='user'> Please, wait :) </div>
            )
        }
        return (
            <div className='user'>
                <div>user login: {this.props.user.data.login}</div>
                <SheetsList sheets={this.props.user.data.sheets} />
            </div>
        )
    }
}

const mapStateToProps = function(store) {
  return {
    sheet: store.sheet,
    user: store.user
  };
}

User = connect(mapStateToProps)(User)
Feed = connect(mapStateToProps)(Feed)

class UserSheetPage extends Component {
    render(){
        gql.request(`query getUserWithSheet($userID: Int!){
            user(id:$userID){
              login
              mail
                  sheets {
                    title
             }
            }
          }`, {userID: this.props.match.params.id})
            .then(data => store.dispatch({type: 'USER', data}))
        return (
            <User id={this.props.match.params.id}/>
        );
    }
}

class AddUser extends Component {
    save(){
        gql.request(
            `mutation createUser($login: String!, $mail:String!, $password:String!) {
                createUser(login: $login, mail: $mail, password: $password) {
                      login
                      mail
                      password
                }
              }`,
            {login: this.login.value,
             mail: this.mail.value,
             password: this.password.value}
        )
    }
    render (){
        return (
            <div>
              <input ref={c => this.login = c} placeholder = "login"/>
              <input ref={c => this.mail = c} placeholder = "mail"/>
              <input ref={c => this.password = c} placeholder = "password"/>
              <button onClick={this.save.bind(this)}>Save user</button>
            </div>
        )
    }
}

class AddSheet extends Component {
    save(){
        gql.request(
            `mutation createSheet($userID:Int!, $title:String!) {
                createSheet(userID: $userID, title: $title) {     
                   login
                }
              }`,
            {userID: this.userID.value,
             title: this.title.value}
        )
    }
    render (){
        return (
            <div>
              <input ref={c => this.userID = c} placeholder = "userID"/>
              <input ref={c => this.title = c} placeholder = "title"/>
              <button onClick={this.save.bind(this)}>Save sheet</button>
            </div>
        )
    }
}

class GetData extends Component {
  render () {
      return (
          <Router history= {createHistory ()}>
          <Switch>
            <Route path='/' component={FeedPage} exact />
            <Route path='/user/:id' component={UserSheetPage} />
            <Route path='/addUser' component={AddUser} exact />
            <Route path='/addSheet' component={AddSheet} exact />
           </Switch> 
          </Router>
      );
  }
}

class AppGraphRedux extends Component {
   render() {
    return (
        <Provider store={store}>
            <div className="App">
                <GetData/>
            </div>
        </Provider>
    );
  }
}

export default AppGraphRedux;