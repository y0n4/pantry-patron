import React from 'react';

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
    }
  }

  render() {
    // console.log('from recipelist', this.props.hit.recipe)
    return (
      <div className="each-recipe">
        <a href={this.props.hit.recipe.url} target="_blank"><p className="recipe-title">{this.props.hit.recipe.label}</p></a>
        <a href={this.props.hit.recipe.url} target="_blank"><img src={this.props.hit.recipe.image} className="recipe-pic"/></a>
        <br /><br />
        <p className="recipe-type">
          <b>Dietary Label(s):</b> {this.props.hit.recipe.dietLabels.join(', ')}<br />
          <b>Health Label(s):</b> {this.props.hit.recipe.healthLabels.join(', ')}</p>
        <ul className="recipe-ingredients">
          <b>Ingredients:</b>
          {this.props.hit.recipe.ingredientLines.map((eachIngredient, index) => <li key={index}>{eachIngredient}</li>)}
        </ul>
        <p><b><a href={this.props.hit.recipe.url} target="_blank"><i>Step-by-step Instructions</i></a></b></p>
      </div>
    )
  }
}

export default RecipeList;
