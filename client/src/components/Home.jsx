import React from 'react';
import io from 'socket.io-client';
import Welcome from '../images/welcome-logo.png';
import NavBar from './Navigation.jsx';

const welcomeStyle = {
  width: '200px',
  height: '100px',
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user.username,
      message: '',
      messages: [],
    };
    const port = 'localhost:3000';
    this.socket = io(`${port}`);

    this.socket.on('receivedMsg', (data) => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    });


    this.sending = (term) => {
      term.preventDefault();
      this.socket.emit('sendMsg', {
        user: this.state.username,
        message: this.state.message,
      });
      this.setState({ message: '' });
    };
  }
  render() {
    return (

      <div className="container text-center">
        <NavBar {...this.props} />
        <img src={Welcome} style={{ width: '300px', height: '120px' }} />
        <h3 className="username-display"> {this.props.user.username} ! </h3>
        <div className="row">
          <div className="col-md centered">
            <div className="card">
              <div className="card-body">
                <div className="card-title"><h3>Share your daily tips here!</h3></div>
                <hr />
                <div className="messages text-warning">
                  <h4>Yona: Go for the non-organic stuff, it's cheaper </h4>
                  <h4>Ainslie: Bring cash instead of your card so you would have to stick to a budget.</h4>
                  <h4>Kenny: Don't go shopping hungry to prevent buying too many snacks!</h4>
                  <h4>Selena: What should I eat today?</h4>
                  {this.state.messages.map((message, key) => (
                    <h4 className="messageList" key={key}>

                      {message.user}: {message.message}
                    </h4>

                    ))}
                </div>
              </div>
              <div className="card-footer">
                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={term => this.setState({ username: term.target.value })}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  placeholder="share your tips!"
                  className="form-control"
                  value={this.state.message}
                  onChange={term => this.setState({ message: term.target.value })}
                />
                <br />
                <button
                  onClick={this.sending}
                  className="btn btn-primary form-control"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
