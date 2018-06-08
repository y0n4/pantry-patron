import React from 'react';
import $ from 'jquery';
import ListItemEntry from './ListItemEntry.jsx';
import ItemForm from './ItemForm.jsx';

class ListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.list._id,
      store: '' || this.props.stores.name,
      total_price: 0.00,
      items: this.props.list.items,
      stores: this.props.stores
    }
  } // end constructor

  updateList(newItem, callback) {
    $.ajax({
      url: '/addItem',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        newItem: newItem,
        list: this.props.list._id,
      }),
      success: (data) => {
        data = JSON.parse(data);
        this.setState({items: data[0].items});
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  handleStoreChange(e) {
    this.setState({store: e.target.value});
  }

  updateItem(updatedItem) {
    /*
    grab current list
      find item using id
        grab item index ref
          update item in the list array
    */
    let oldItems = this.state.items;
    oldItems.forEach((item) => {
      if(item._id === updatedItem._id) {
        item.name = updatedItem.name;
        item.quantity = updatedItem.quantity;
        item.price = updatedItem.price;
      }
    });
  }

  render() {
      return (
        <div>
          <h3>{this.props.list.name}</h3>
          <br/>
          <select className="store-selection" onChange={this.handleStoreChange.bind(this)}>
            <option key="new">New store</option>
            {
              this.state.stores.map((store, index) => {
                return <option key={index}>{store}</option>
              })
            }
          </select>
          <br/>
          <br/>
          <table>
            <tbody>
              {
                this.state.items.map((item) => {
                  return <ListItemEntry update={this.updateItem.bind(this)} key={item._id} item={item}/>
                })
              }
            </tbody>
          </table>

          <br/>
          <ItemForm updateList={this.updateList.bind(this)}/>
          <button type="button">Delete</button>
          <button type="calculate">Calculate</button>
        </div>
      );
  } // end render
} // end component

export default ListEntry;