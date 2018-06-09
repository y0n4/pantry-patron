import React from 'react';
import $ from 'jquery';

import Category from './Category.jsx'
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
    console.log(this.props.item._id, this.state.item.item_id.name);

    let updatedItem = {
      _id: this.props.item._id,
      name: this.state.item.item_id.name,
      price: this.state.price,
      quantity: this.state.quantity
      }
    console.log( updatedItem);

    $.ajax({
      url: '/updateHistory',
      type: 'POST',
      data: JSON.stringify(updatedItem),
      contentType: 'application/json',
      success: (data) => {
        console.log('returned', JSON.parse(data))
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

  render() {
    let price = Number(this.state.quantity).toFixed(2);
    let quantity = Number(this.state.price).toFixed(2);
    return (
        <tr>
            <td> <input type="text" name="item" value={this.state.item.item_id.name} onChange={this.handleNameChange.bind(this)}/></td>
            <td><input type="number" min="0" name="quantity" value={this.state.quantity} onChange={this.handleQtyChange.bind(this)} step="any"/></td>
            <td><input type="number" min="0" name="price" value={this.state.price} onChange={this.handlePriceChange.bind(this)} step="any"/></td>
        </tr>
    );
  }
};
