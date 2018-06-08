import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ListItemEntry from './ListItemEntry.jsx';
import ItemForm from './ItemForm.jsx';

class ListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.list._id,
      store_id: '' || this.props.stores.name,
      total_price: 0.00,
      items: this.props.list.items,
      stores: this.props.stores,
    };
    this.updateItem = this.updateItem.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
  } // end constructor

  componentDidMount() {
    // set the store drop down to the store in state, if it exists
  }

  handleStoreChange(e) {
    if(e.target.value === 'new') {
      alert('You want to make a new store?')
      let newStoreName = prompt('What store are you at?');

      while(newStoreName === '') {
        newStoreName = prompt('I know for sure there is not a store without \nsome sort of name out there. Where you at?')
      }

      this.props.createStore({name: newStoreName}, (newStore) => {
        let updatedList = {};
        updatedList.name = this.state.name;
        updatedList.items = this.state.items;
        updatedList.total_price = this.state.total_price;
        updatedList.store_id = newStore._id;
        updatedList.update = true;


      });

    } else {
      this.setState({store_id: e.target.value});
    }
  }

  updateItem(updatedItem) {
    /*
    grab current list
      find item using id
        grab item index ref
          update item in the list array
    */
    const oldItems = this.state.items;
    oldItems.forEach((item) => {
      if (item._id === updatedItem._id) {
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
            <option value={'select'} key="select">Stores</option>
            <option value={'new'} key="new">New store</option>
            {
              this.state.stores.map((store, index) => {
                return <option value={store._id} key={index}>{store.name}</option>
              })
            }
          </select>
          <br/>
          <br/>
          <table>
            <thead>
              <tr>
                <th>Items</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.items.map((item) => {
                  return <ListItemEntry update={this.updateItem.bind(this)} key={item._id} item={item}/>
                })
              }
            </tbody>
          </table>

          <br/>
          <ItemForm setListEntryState={this.setState.bind(this)} updateItem={this.props.updateItem}/>
          <button type="button" onClick={this.onDeleteClick}>Delete</button>
          <button type="calculate">Calculate</button>
        </div>
      );
  } // end render
} // end component

ListEntry.propTypes = {
  list: PropTypes.shape({
    name: PropTypes.string,
    items: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
  deleteList: PropTypes.func.isRequired,
};

export default ListEntry;
