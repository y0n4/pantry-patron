import React from 'react';

import NavBar from './Navigation.jsx';

const Home = (props) => (
  <div className="text-center">
{/*{...this.props passes down match and history}*/}
    <NavBar {...props}/>
    <br/>

    <h3 className="greeting"> Welcome {props.user.username} ! </h3>
    <div> Ready to shop mindfully? Check out the list tab to get started </div>

    <br/>
    <h3 className="greeting"> Tips </h3>
  {/*BEGIN TIPS*/}
    <div></div>
    <ul>
      <li className="tip">
        Don't go shopping hungry to prevent buying too many snacks!
      </li>
      <li className="tip">
        Bring cash instead of your card so you would have to stick to a budget.
      </li>
      <li className="tip">
        Go for the non-organic stuff, it's cheaper.
      </li>
      <li className="tip">
        Look for the sales tags!
      </li>
      <li className="tip">
        Try out the store brand, they're usually not as bad as you think.
      </li>
      <li className="tip">
        If you have extra money, buy extra non-perishables that you can hold onto if possible.
      </li>
      <li className="tip">
        Canned goods can help you prepare meals quicker. They also don't expire and spoil as fast as normal stuff.
      </li>
    </ul>
  {/*END TIPS*/}
  </div>
);

export default Home;