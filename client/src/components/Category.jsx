// import React from 'react';
// import $ from 'jquery';

// export default class Category extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       category: '',
//       _id: ''
//     };
//   }// end constructor

//   handleCategoryChange(e) {
//     this.setState({category: e.target.value});
//     // console.log(e.target.value);
//   } //end handleCategoryChange

//   handleNewCategory() {
//     let newCategory = {
//       name: prompt("Enter a new category")
//     }

//     let set = this.setState.bind(this);
//     $.ajax({
//       type: 'POST',
//       url: '/category/create',
//       contentType: 'application/json',
//       data: JSON.stringify(newCategory),
//       success: (data) => {
//         console.log('response to category', data)
//         data = JSON.parse(data);
//         this.setState({
//           category: data.name,
//           _id: data._id
//         })

//         this.props.update({categories: this.props.categories.concat([data])})
//       },
//       error: (err) => {
//         console.error(err);
//       }
//     });
//     console.log(newCategory);
//   }
//   render() {
//     if(this.state.category === 'new') {
//       this.handleNewCategory();
//     }
//     return(

//         <select onChange={this.handleCategoryChange.bind(this)}>
//           <option value="" key=""></option>
//           <option value="new" key="new">New Category</option>
//           {
//             /*render options dynamically*/
//             this.props.categories.map((category) => {
//             return <option value={category._id} >{category.name}</option>
//           })
//           }
//         </select>

//     );
//   } // end render
// };