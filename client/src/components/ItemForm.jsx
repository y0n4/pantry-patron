import React from 'react';
import $ from 'jquery';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: 0,
      price: 0
    }

    //component-global timer and delay
    this.delay = 2000;
    this.timer;

    console.log(this.props.store)
    // bindings
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQuantChange = this.handleQuantChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handle value changes
  handleNameChange(e) {
    // console.log(e.target.value, 'was entered')
    this.setState({name: e.target.value});

    // clearTimeout(this.timer);
    // setTimeout(() => console.log('done')), this.delay);
  }

  handleQuantChange(e) {
    // console.log('new qty', e.target.value);
    this.setState({quantity: e.target.value});
  }

  handlePriceChange(e) {
    // console.log('new price', e.target.value);
    this.setState({price: e.target.value});
  }

  // handle submit of edit
  handleSubmit() {
    let itemName = this.state.name ? this.state.name : prompt('There is no such things as a null object in life. Give it a name');

    while(itemName === '') {
      itemName = prompt('Stop trying to be sneaky!');
    }

    let newItem = {
      name: itemName
    };
    // sends the item to the database and returns
    // the item with the corresponding item id
    // then sends it to be added to the list
    newItem = this.transformItem(newItem, (newItem) => {
          // newItem.price = this.state.price;
          // newItem.quantity = this.state.quantity;
      this.props.updateList(newItem, false);
    });
  }

  transformItem(newItem, callback) {
    /*
    sends the item to the database to get an objectId
    */
    $.ajax({
      url: 'search/item',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newItem),
      success: (data) => {
        callback(JSON.parse(data));
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  render() {
    return(

      <div>
        <form>
          <input
            type="text"
            placeholder="Enter an item..."
            name="item"
            value={this.state.name}
            onChange={this.handleNameChange}/>
          <button
            type="button"
            className="glyphicon glyphicon-plus"
            onClick={()=> (this.handleSubmit())}></button>
        </form>
       </div>
    );
  }
}

export default ItemForm;
