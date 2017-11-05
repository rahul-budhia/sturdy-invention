import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { cards: [] }
  }
  getCards() {
    let self = this;
    let opts = {
    	type: 'redirect',
    	name: 'Demo',
    	scope: { read: true, write: true, account: true },
    	success: (res) => { console.log(res) },
    	error: (res) => { console.log('error', res) }
    }
    window.Trello.authorize(opts);
    window.Trello.rest('GET',
      'boards/Q1RBoIF8/cards',
      (res) => {
        self.setState({cards: res})
      },
      (res) => {console.log(res)}
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Trello Demo</h1>
        </header>
        <p className="App-intro">
          Click on the button to get cards
        </p>
        <button onClick={this.getCards.bind(this)}>Get Cards</button>
        <ul>
        {this.state.cards.map(
          (card) => (
            <li key={card.id}>{card.name}</li>
          )
        )}
        </ul>
      </div>
    );
  }
}

export default App;
