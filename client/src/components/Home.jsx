import React from 'react';

import NavBar from './Navigation.jsx';
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="text-center">
    {/*{...this.props passes down match and history}*/}
        <NavBar {...this.props}/>
        <br/>

        <h3> Welcome {this.props.user.username} ! </h3>
        <hr width="30%" align='center'/>
        <div> Ready to shop mindfully? Check out the list tab to get started </div>

        <br/>
        <h3> Tips </h3>
        <hr width="30%" align='center'/>
        <div className="tip">
          <p>Reprehenderit elit dolore ut eiusmod veniam pariatur commodo duis consequat adipisicing dolore eu magna.</p>
        </div>
        <div className="tip">
          <p>Laboris do occaecat ex mollit magna eiusmod labore nulla quis quis labore non laboris ut in ex commodo sed commodo amet sit nulla reprehenderit dolore nisi ut ut veniam occaecat in mollit sed deserunt occaecat laborum nisi pariatur enim nulla officia ut est dolor nulla magna ex ex nulla non fugiat in do anim ullamco dolore voluptate eu velit incididunt sit aliquip aute non ut reprehenderit fugiat officia excepteur aliqua ad duis sit consequat deserunt sit cillum aliqua mollit incididunt cupidatat cillum aliquip velit et sunt et ex ut consequat qui quis occaecat quis dolore consectetur sunt adipisicing commodo aliquip</p>
        </div>
        <div className="tip">
          <p>Aute consectetur.</p>
        </div>
        <div className="tip">
          <p>Fugiat eu nisi sunt nisi fugiat ullamco irure ut nostrud anim incididunt.</p>
        </div>
      </div>
    );
  }
}

export default Home;