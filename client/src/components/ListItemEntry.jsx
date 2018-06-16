import React from 'react';
import $ from 'jquery';
import config from '../config/walmart.js';

export default class ListItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.item._id,
      item: props.item,
      quantity: props.item.quantity,
      price: props.item.price,
      category_id: props.item.category_id
    };

    this.typingTimer = 300;
    this.timeout ;
  }

  updateItemHistory() {
    let updatedItem = {
      _id: this.props.item._id,
      name: this.state.item.item_id.name,
      price: this.state.price,
      quantity: this.state.quantity
      }

    $.ajax({
      url: '/updateHistory',
      type: 'POST',
      data: JSON.stringify(updatedItem),
      contentType: 'application/json',
      success: (data) => {
        console.log('Saved to the database')
        this.props.update(JSON.parse(data)[0]);
      }
    });
  }

  timer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => (this.updateItemHistory()), this.typingTimer)
  }

  handleQtyChange(e) {
    this.setState({ quantity : e.target.value});
    this.timer();
  }

  handlePriceChange(e) {
    this.setState({ price : e.target.value});
    this.timer();
  }

  handleNameChange(e) {
    this.setState({item: { item_id: { name: e.target.value}}})
    this.timer();
  }

  setPrice() {
    $.ajax({
      url: 'https://api.walmartlabs.com/v1/search',
      data: {
        apiKey: config.WALMART_API_KEY,
        query: this.state.item.item_id.name,
        sort: 'price',
        order: 'asc',
        numItems: '1',
      },
<<<<<<< HEAD
      dataType: 'jsonp', // use jsonp only
      crossDomain: true, // tell browser to allow cross domain
=======
      dataType: 'jsonp',
      crossDomain: true,
>>>>>>> Remove notes from AJAX call
      success: (data) => {
        this.setState({
          price: data.items[0].salePrice,
        });
        this.updateItemHistory();
      },
      error: (err) => {
        console.log('Walmart API Error', err);
      }
    });
  }

  render() {
    let price = Number(this.state.quantity).toFixed(2);
    let quantity = Number(this.state.price).toFixed(2);
    return (
      // console.log('this is props.items', props.items)
        <tr>
            <td><input type="text" name="item" value={this.state.item.item_id.name} onChange={this.handleNameChange.bind(this)}/></td>
            <td><input type="number" min="0" name="quantity" value={this.state.quantity} onChange={this.handleQtyChange.bind(this)} step="any"/></td>
            <td><input type="number" min="0" name="price" value={this.state.price} onChange={this.handlePriceChange.bind(this)} step="any"/></td>
            <td><button onClick={this.setPrice.bind(this)}></button></td>
        </tr>
    );
  }
};