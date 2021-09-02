import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true,reurl:'',inputValue: ''};
    this.handleClick = this.handleClick.bind(this);
    this.changeState = this.changeState.bind(this)
  }

  changeState(event){
    this.setState({inputValue:event.target.value})
    console.log(event.target.value)
    event.preventDefault();
  }
  handleClick(event) {
    const requestEntity = {
      method :'GET',
      mode: 'no-cors',
      headers : {
        'Access-Control-Allow-Origin': '*',
      }
    };
    console.log(this.inputValue)
    fetch('http://localhost:3000?url='+this.inputValue,requestEntity)
    .then(response => response.json())
    .then(data => {
      this.setState({
        isToggleOn: !this.isToggleOn,
        reurl: data
      })
      console.log(data);
    }).catch((err) => {
      console.error(err);
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleClick}>
          <label>URL：</label>
          <input 
            value={this.state.inputValue} 
            onChange={this.changeState} />
          <input type="submit" value="送出"  />
        </form>
        <div>reurl: {this.state.reurl}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
reportWebVitals();
