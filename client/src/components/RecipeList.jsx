import React from 'react';

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ''
    }
  }

  render() {
    console.log('from recipelist', this.props.hit.recipe)
    return (
      <div className="each-recipe">
      <div><h3 className="recipe-title">{this.props.hit.recipe.label}</p></div>
        <img src={this.props.hit.recipe.image}/>
      </div>
    )
  }
}

export default RecipeList;
