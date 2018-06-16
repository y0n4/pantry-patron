import React from 'react';
import $ from 'jquery';
import recipeAPI from '../config/walmart.js';

class RecipeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesRangeStart: '',
      caloriesRangeEnd: '',
      cookTimeStart: '',
      cookTimeEnd: '',
      items: '',
    };
    this.handleRangeStartChange = this.handleRangeStartChange.bind(this);
    this.handleRangeEndChange = this.handleRangeEndChange.bind(this);
    this.handleCookTimeStartChange = this.handleCookTimeStartChange.bind(this);
    this.handleCookTimeEndChange = this.handleCookTimeEndChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // function to update the beginning value of calories
  handleRangeStartChange(e) {
    this.setState({ caloriesRangeStart: e.target.value });
  }

  // function to update the end value of calories
  handleRangeEndChange(e) {
    this.setState({ caloriesRangeEnd: e.target.value });
  }

  // function to update beginning value of prep time
  handleCookTimeStartChange(e) {
    this.setState({ cookTimeStart: e.target.value });
  }

  // function to update the end value of prep time
  handleCookTimeEndChange(e) {
    this.setState({ cookTimeEnd: e.target.value });
  }
  // this function will loop through the entire list and fetch all of the grocery names
  getGroceryItems(list) {
    const itemHolder = [];
    list.forEach(names => {
      itemHolder.push(names.item_id.name)
    })
    const itemHolderString = itemHolder.join();
    this.caloriesFilter(itemHolderString);
  }

  // this ajax request will make a call to edamam and return items based on the calories
  caloriesFilter(itemList) {
    let range = '0-10000';
    let time = '0-1000';
    if ((this.state.caloriesRangeStart !== '') && (this.state.caloriesRangeEnd !== '')) {
      range = this.state.caloriesRangeStart + '-' + this.state.caloriesRangeEnd;
    }

    if ((this.state.cookTimeStart !== '') && (this.state.cookTimeEnd !== '')) {
      time = this.state.cookTimeStart + '-' + this.state.cookTimeEnd;
    }
    $.ajax({
      url: 'https://api.edamam.com/search',
      method: 'GET',
      data: {
        q: `${itemList}`,
        app_id: recipeAPI.RECIPE_API_ID,
        app_key: recipeAPI.RECIPE_API_KEYS,
        from: 0,
        to: 3,
        calories: range,
        time: time,
      },
      dataType: 'jsonp',
      crossDomain: true,
      success: (data) => {
        console.log('Data is', data);
      },
      err: (err) => {
        console.log(err);
      },
    });
  }

  // this function update the state with a beginning and an end for calories
  handleSubmit(e) {
    let entireGroceryList = this.props.groceryItems.items;
    e.preventDefault();
    this.getGroceryItems(entireGroceryList);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Calories Range:
          </label>
          <input type="text" value={this.state.caloriesRangeStart} placeholder="from" onChange={this.handleRangeStartChange} />
          <input type="text" value={this.state.caloriesRangeEnd} placeholder="to" onChange={this.handleRangeEndChange} />
        </div>
        <div>
            <label>
              Preparation Time:
            </label>
          <input type="text" value={this.state.cookTimeStart} placeholder="from" onChange={this.handleCookTimeStartChange} />
          <input type="text" value={this.state.cookTimeEnd} placeholder="to" onChange={this.handleCookTimeEndChange} />
        </div>
        <input className="grocery-filter-button" type="submit" value="Submit" />
      </form>
    );
  }
}

export default RecipeFilter;
