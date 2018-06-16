import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import ListItemEntry from './ListItemEntry.jsx';
import ItemForm from './ItemForm.jsx';
import RecipeFilter from './RecipeFilter.jsx';

class ListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.list._id,
      store_id: this.props.list.store_id || { _id: 'select' },
      total_price: 0.00,
      items: this.props.list.items, //items db
      ingredients: this.props.list.items.map(item => item.item_id.name).join(', '),
      stores: this.props.stores
    };
    this.updateItem = this.updateItem.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
  } // end constructor

  componentDidMount() {
    // set the store drop down to the store in state, if it exists
    if (this.state.store_id._id) {
      $('.store-selection').val(this.state.store_id._id).change();
    }
  }

  //this func is not going to be used by us pls ignore
  handleStoreChange(e) {
    if (e.target.value === 'new') {
      let newStoreName = prompt('What store are you at?');

      while (newStoreName === '') {
        newStoreName = prompt('Come on, where you at gurl?');
      }

      // create the object needed for endpoint call.
      this.props.createStore({ name: newStoreName }, (newStore) => {
        const updatedList = {};
        updatedList._id = this.state._id;
        updatedList.name = this.state.name;
        updatedList.items = this.state.items;
        updatedList.total_price = this.state.total_price;
        updatedList.store_id = { _id: newStore._id };

        // send it to the server to update current list
        this.updateList(updatedList);
        // update the stores on the client side.
        this.setState({ stores: this.state.stores.concat([newStore]) });
        $('.store-selection').val(this.state.stores[this.state.stores.length -1]._id);
      });
    } else {
      (async () => {
        await this.setState({ store_id: { _id: e.target.value } });
        this.updateList(this.state);
      })();
    }
  }

  updateItem(updatedItem) {
    //edit work need to see from console but delete it and add it to ajax req for recipe l8r
    console.log(this.state.ingredients);
    var newIngredients = this.state.items.map(item => item.item_id.name).join(', ');
    this.setState({ingredients: newIngredients});
    console.log(this.state.ingredients);
    //end it here edit
    // console.log(this.state.items.length);
    /*
    grab current list
      find item using id
        grab item index ref
          update item in the list array
    */
    const oldItems = this.state.items;
    oldItems.forEach((item) => {
      if(item._id === updatedItem._id) {
        item.name = updatedItem.item_id.name;
        item.quantity = updatedItem.quantity;
        item.price = updatedItem.price;
      }
    });

    this.setState({items: oldItems});
  }

  //invoked by handleStoreChange() meant for store list- not being used atm
  updateList(updatedList) {
    $.ajax({
      url: '/updateList',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(updatedList),
      success: () => {
        this.setState({ store_id: updatedList.store_id });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  setRecipes() {
    $.ajax({
      url: 'https://api.edamam.com/search',
      method: 'GET',
      data: {
        q: 'beef',
        app_id: '6dfc4916',
        app_key: 'b5bbee65ae2104a9a5e33fa57cc83aeb',
        from: 0,
        to: 1
      },
      dataType: 'jsonp',
      crossDomain: true,
      success: (data) => {
        console.log('got it!', data);
      },
      err: (err) => {
        console.log('recipes not going through', err);
      }
    });
  }

  render() {
    return (
      <div>
        <h3>
          {this.props.list.name} total:
            ${ this.state.items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0).toFixed(2) }
        </h3>
        <br />
        <select className="form-control store-selection dropdown" onChange={this.handleStoreChange.bind(this)}>
          <option value="select" key="select">Stores</option>
          <option value="new" key="new">New store</option>
          {
              this.state.stores.map((store, index) => <option value={store._id} key={index}>{store.name}</option>)
            }
        </select>
        <br />
        <br />
        <table className="table table-hover" id="table" align="center">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price Per Item</th>
              <th>Use Suggested Price</th>
            </tr>
          </thead>
          <tbody>
            {
               this.state.items.map(item => <ListItemEntry update={this.updateItem.bind(this)} key={item._id} item={item} apiKey={window.WALMART_API_KEY}/>)
              }
          </tbody>
        </table>

        <br />
        <ItemForm setListEntryState={this.setState.bind(this)} updateItem={this.props.updateItem} />
        <div>
          <br />
          <button onClick={this.props.deleteList}>
            <span className="glyphicon glyphicon-trash" />Delete List
          </button>
        </div>
        <div>
          <RecipeFilter groceryItems={this.state}/>
        </div>
        <div>
        </div>
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
