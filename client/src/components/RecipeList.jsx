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
        <p className="recipe-title">{this.props.hit.recipe.label}</p>
        <a href={this.props.hit.recipe.url}><img src={this.props.hit.recipe.image} target="_blank" className="recipe-pic"/></a>
        <p className="recipe-diet">Diet: {this.props.hit.recipe.dietLabels.join(', ')}</p>
        <p className="recipe-health">Health: {this.props.hit.recipe.healthLabels.join(', ')}</p>
        <ul className="recipe-ingredients">
          {this.props.hit.recipe.ingredientLines.map(eachIngredient => <li>{eachIngredient}</li>)}
        </ul>
      </div>
    )
  }
}

export default RecipeList;
