// react
import React from 'react'

class Category extends React.Component {
    constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
    }

  handleClick() {
    this.props.setStateCategories(this.props)
  }

  render() {
    return (
      <div className="Category">
        <button className={this.props.isActive ? 'active' : ''} onClick={this.handleClick}>{this.props.name}</button>
      </div>
    )
  }
}

class CategoriesList extends React.Component {
  render() {
    const category = this.props.categories.map((category) =>
      <Category
        key={category.id}
        id={category.id}
        name={category.name}
        isActive={category.isActive}
        setStateCategories={this.props.setStateCategories}
      />
    )
    return (
      <div className="Categories-list">
        {category}
      </div>
    )
  }
}

export default CategoriesList
