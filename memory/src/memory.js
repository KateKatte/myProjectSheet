import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import MemoryGame from './game'


// const сardState = {
//   close: 0,
//   open: 1,
//   exit: 2
// }


class ChangePictures extends Component {
  constructor(props){
    super (props);
    this.state = {pictures: this.props.pictures,
      pictId: this.props.item

    }

    this.changeShirt = this.changeShirt.bind(this);
  
  }

  changeShirt (event) {
    this.setState(
      (prevState, props) => ({
        pictures: !prevState.pictures
      })
  );
  if (this.props.onclick){
      this.props.onclick();
  }
}
    
render() {
    var arrId = []
    for (var i = 0; i<arrId.length; i++ ) {
      arrId[i] = i
    }
    let style={backgroundColor: this.state.pictures ? 'red' : 'grey'}
    return (
      <div>
          {/* <div id = {this.state.arrId[i]} className="cell"onClick ={(a) => this.changeShirt (a)} > pict2 </div> */}
          <div id = '1' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '2' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '3' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '4' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '5' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '6' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '7' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '8' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '9' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '10' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '11' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '12' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '13' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '14' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '15' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '16' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '17' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '18' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '19' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '20' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '21' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '22' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '23' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '24' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '25' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '26' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '27' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '28' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '29' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '30' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '31' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '32' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '33' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '34' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '35' className="cell" style={style} onClick={this.changeShirt}>pict3</div>
          <div id = '36' className="cell" style={style} onClick={this.changeShirt}>pict3</div>              
        </div>
    );
  } 
}