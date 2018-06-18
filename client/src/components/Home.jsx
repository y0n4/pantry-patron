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
    const port = process.env.PORT || 3000;
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

      <div className="msgContainer">
        <NavBar {...this.props} />
        <img src={Welcome} style={{ width: '300px', height: '120px' }} />
        <h3 className="username-display"> {this.props.user.username} ! </h3>
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Share your daily tips here!</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map((message, key) => (
                    <div className="messageList" key={key}>
                      {message.user}: {message.message}
                    </div>
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
