import React, { Component } from 'react';
import './App.css';

//so this is our list that we're putting up on the page, here we just define it
const list = [
  {
  title: 'React',
  url: 'https://facebook.github.io/react/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
},
{
  title: 'Redux',
  url: 'https://github.com/reactjs/redux',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
},
];

const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  

//THIS IS THE ES5 version of above
/*function isSearched(searchTerm){
  return function(item){
    return !searchTerm ||
    //NOTE "includes" is an ES6 thing, we would have used indexOf before
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    //something that returns boolean
  }
}*/



// here we start making our component, it's called App
class App extends Component {
// we make a constructor, which is why more than one listing shows up, and we define the state (or props?)... 
  constructor(props){
    super(props);
//the state has a list, and it has a searchTerm...
    this.state={
      list,
      searchTerm: '',
    };
//here we're showing it how to delete the entry when the button is clicked, triggering onDismiss()
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
//now we define onSearchChange
    onSearchChange(event){
      this.setState({ searchTerm: event.target.value});

    }


//here we define onDimiss, CONFUSED ABOUT THIS!
//GOT IT! we're passing in the id of the item we're dismissing,
//return item.objectdID !== id means:
//"return all the items that are NOT the id of the one we're deleting"

    onDismiss(id){
      const isNotId = item =>{
        return item.objectID !== id;
      }
    // and here, we're changing the state to not include the listing we deleted... 
      const updatedList = this.state.list.filter(isNotId);
      this.setState({ list: updatedList});
    }
  //now we're telling it what to render on the screen
  render() {
    const { searchTerm, list } = this.state;
    return (

  // it's called App, remember className because we can't use just "class" in react
  // we do a map of the list, in it's current state, and it shows everything in there
  //now it has 2 components, Search & Table, which are pulled in

  //NOTE in "Search" now, the component ends with > and now we have "Search" outside
  //the tags, and then we end it with </Search>  so now the outside "Search" is a
  //child of this component... now go down to the Search component to see how we
  //call it
      <div className="App">
        
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
            >
            Search
            </Search>
          
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
     {/*   THESE ARE ALL IN THEIR OWN COMPONENTS NOW
     <form>
            <input 
            type="text"
            value={searchTerm}
            onChange={this.onSearchChange}
             />
        </form>*/}

      {/*  { list.filter(isSearched(this.state.searchTerm)).map (item => 
   // we're asking for the objectdID(maybe?), the title(whic is a link to the url), the author, comments, points...   
   // then we make a button which triggers onDismiss when clicked  
            <div key={item.objectID}>
               <span>
                 <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                 <button
                   onClick={() => this.onDismiss(item.objectID)}
                   type="button"
                   >
                    Dismiss
                 </button>
                </span>
              </div>
        
        )}*/}
      </div>
    )
  }
}
//now we're making the Search its own component 
//
//in CONST we added children, the "Search" string from above...
//and now we tell it to put that before the <input>

/*class Search extends Component {
  render(){
    const {value, onChange, children } = this.props;
      return (
        <form>
             {children}<input
              type="text"
              value={value}
              onChange={onChange}
              />
          </form>
      );
  }
}*/

//now we're refactoring the above Search Component into a Functional Stateless
//Component... here it goes:
//we pass the props into the arguments/parameters, inside curly braces...
const Search = ({value, onChange, children}) =>
    <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
        />
    </form>
//
//this Button component is (so far) passed into the Table component, below
//it has props of onClick, className, and children
//check out the className = ``, this in ES6 means, use the default parameter
/*class Button extends Component {
  render() {
    const {
      onClick,
      className =``,
      children,
    } = this.props;

    return(
      <button
        onClick={onClick}
        className={className}
        type="button"
        >
        {children}
        </button>
    )
  }
}*/
//ALSO REFACTORED INTO FUNCTIONAL STATELESS COMPONENT... 
//think about "stateless" and figure out why
const Button = ({onClick, className, children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
    >
    {children}
    </button>

//same with Table
const Table = ({list, pattern, onDismiss}) =>
        <div>
          { list.filter(isSearched(pattern)).map(item=>
            <div key={item.objectID}>
              <span>
                  <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button onClick={()=> onDismiss(item.objectID)}>
                  Dismiss
                </Button>
                </span>
              </div>
          )}
        </div>
  


//then we export it
export default App;
