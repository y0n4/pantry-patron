import React from 'react';
import $ from 'jquery';
import RecipeList from './RecipeList.jsx';
import ListEntry from './ListEntry.jsx';

class RecipeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesRangeStart: '',
      caloriesRangeEnd: '',
      diet: 'balanced',
      health: 'peanut-free',
      filteredItem: [],
      currentItems: [],
    };
    this.handleRangeStartChange = this.handleRangeStartChange.bind(this);
    this.handleRangeEndChange = this.handleRangeEndChange.bind(this);
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
    this.groceryFilter(itemHolderString);

    return (
      <div className="recipe-display">
        {this.state.filteredItem.map((hit, index) => <RecipeList hit={hit} key={index} />)}
      </div>
    );
  }

  // this ajax request will make a call to edamam and return items based on the calories
  groceryFilter(itemList) {
    let range = '0-10000';
    let diet = this.state.diet;
    let health = this.state.health;

    if ((this.state.caloriesRangeStart !== '') && (this.state.caloriesRangeEnd !== '')) {
      range = this.state.caloriesRangeStart + '-' + this.state.caloriesRangeEnd;
    }

    $.ajax({
      url: '/api/edamam/filter',
      method: 'GET',
      data: {
        q: `${itemList}`,
        calories: range,
        diet: diet,
        health: health,
      },
      success: (data) => {
        this.setState( {filteredItem: data.hits} )
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
    this.setState( {currentItems: entireGroceryList} )
  }

  render() {
    return (
      <form className="filter-form" onSubmit={this.handleSubmit}>
        <div className="filter-container">
          <label className="filter-labels">
            Calories Range:
          </label>
          <input className="filter-input-box" type="text" value={this.state.caloriesRangeStart} placeholder="from" onChange={this.handleRangeStartChange} />
          <input className="filter-input-box" type="text" value={this.state.caloriesRangeEnd} placeholder="to" onChange={this.handleRangeEndChange} />
        </div>
        <div className="filter-container">
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
        <div className="filter-container">
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
