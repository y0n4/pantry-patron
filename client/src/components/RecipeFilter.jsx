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
      diet: 'balanced',
      health: 'dairy-free',
      items: '',
    };
    this.handleRangeStartChange = this.handleRangeStartChange.bind(this);
    this.handleRangeEndChange = this.handleRangeEndChange.bind(this);
    this.handleCookTimeStartChange = this.handleCookTimeStartChange.bind(this);
    this.handleCookTimeEndChange = this.handleCookTimeEndChange.bind(this);
    this.handleDietChange = this.handleDietChange.bind(this);
    this.handleHealthChange = this.handleHealthChange.bind(this);
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

  // this function will update the dietary changes
  handleDietChange(e) {
    this.setState( {diet: e.target.value} );
  }

  // this function will update health changes
  handleHealthChange(e) {
    this.setState( {health: e.target.value} );
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
    let diet = this.state.diet;
    let health = this.state.health;

    if ((this.state.caloriesRangeStart !== '') && (this.state.caloriesRangeEnd !== '')) {
      range = this.state.caloriesRangeStart + '-' + this.state.caloriesRangeEnd;
    }

    if ((this.state.cookTimeStart !== '') && (this.state.cookTimeEnd !== '')) {
      time = this.state.cookTimeStart + '-' + this.state.cookTimeEnd;
    }
    // $.ajax({
    //   url: 'https://api.edamam.com/search',
    //   method: 'GET',
    //   data: {
    //     q: `${itemList}`,
    //     app_id: recipeAPI.RECIPE_API_ID,
    //     app_key: recipeAPI.RECIPE_API_KEYS,
    //     from: 0,
    //     to: 3,
    //     calories: range,
    //     time: time,
    //     diet: diet,
    //     health: health,
    //   },
    $.ajax({
      url: '/api/edamam/filter',
      method: 'GET',
      data: {
        q: `${itemList}`,
        calories: range,
        time: time,
        diet: diet,
        health: health,
      },
      success: (data) => {
        console.log('Data is ->', data);
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
          <label className="filter-labels">
            Calories Range:
          </label>
          <input className="filter-input-box" type="text" value={this.state.caloriesRangeStart} placeholder="from" onChange={this.handleRangeStartChange} />
          <input className="filter-input-box" type="text" value={this.state.caloriesRangeEnd} placeholder="to" onChange={this.handleRangeEndChange} />
        </div>
        <div>
            <label className="filter-labels">
              Preparation Time:
            </label>
          <input className="filter-input-box" type="text" value={this.state.cookTimeStart} placeholder="from" onChange={this.handleCookTimeStartChange} />
          <input className="filter-input-box" type="text" value={this.state.cookTimeEnd} placeholder="to" onChange={this.handleCookTimeEndChange} />
        </div>
        <div>
          <label className="filter-labels">
            Dietary Plan:
          </label>
          <select value={this.state.diet} onChange={this.handleDietChange}>
            <option value="balanced">Balanced</option>
            <option value="high-protein">High Protein</option>
            <option value="low-carb">Low Carb</option>
            <option value="low-fat">Low Fat</option>
          </select>
        </div>
        <div>
          <label className="filter-labels">
            Dietary Restriction
            </label>
            <select value={this.state.health} onChange={this.handleHealthChange}>
              <option value="dairy-free">Dairy Free</option>
              <option value="gluten-free">Gluten Free</option>
              <option value="kosher">Kosher</option>
              <option value="paleo">Paleo</option>
              <option value="peanut-free">No Peanuts</option>
              <option value="tree-nut-free">No Tree Nuts</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
        </div>
        <input className="grocery-filter-button" type="submit" value="Submit" />
      </form>
    );
  }
}

export default RecipeFilter;
