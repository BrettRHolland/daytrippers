import React, { Component } from 'react';
import CategoryTile from '../components/CategoryTile';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    }
  }
  
  componentDidMount() {
    fetch('/api/v1/trips')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ categories: body.categories });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  
  render() {
    let className;
    let categories = this.state.categories.map(category => {
      
      if(category.id === this.state.selectedCategoryId){
        className = "active"
      } else {
        className = ""
      }
      
      let handleClick = () => {
        this.props.onChange(category.id)
      }
      
      return(
        <CategoryTile
          key={category.id}
          id={category.id}
          name={category.name}
          handleClick={handleClick}
          className={className}
        />
      )
    })
    
    return(
      <div>
        <h1>Categories</h1>
        <ul>
          {categories}
        </ul>
      </div>
    )
  }
}

export default CategoriesContainer;