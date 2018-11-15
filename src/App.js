import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';

//state only works in extends Component not in normal functions
class App extends Component {
  state = {
    persons: [
      {id:'kkdj',name: 'Max', age:30 },
      {id:'dkjak',name: 'Manu', age: 26 },
      {id:'dkjke',name: 'Blacky', age: 30 }
    ],
    otherState: 'some other value',
    showPersons: false
  }
//Create copy of the state and then update with setState to keep from mutating state
deletePersonsHandler=(personIndex) => {
  const persons = [...this.state.persons];
  persons.splice(personIndex,1);
  this.setState({persons:persons})
}


//Find the person we are looking for. p is a person p.id ====id then true. personINdex will hold
// the index of the array where ids are equal

nameChangedHandler = (event,id) => {
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });

//Get the person itself by reaching out the Person Index.
// This will not mutate using the spread operator
  const person = {
    ...this.state.persons[personIndex]
  };
//update the person name.  This is a copy,copy
  person.name = event.target.value;

// Get persons by reaching out to state.  Now we update persons array at the personIndex postion
// person[personIndex] is updated person. Always using copies
 const persons = [...this.state.persons];
 persons[personIndex] = person;

// Now we got an updated person's array. Set state here and set it
//to this updated persons array, which is a copy of the old array
//where we updated one element with the updated person where we adjusted the name

  this.setState({persons:persons} );

    }



  togglePersonsHandler =() => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})

  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',

    };
    let persons =null;
    if(this.state.showPersons) {

      persons = (
        <div>
        {this.state.persons.map((person,index) => {
          return <Person
          click={() =>this.deletePersonsHandler(index)}
          name = {person.name}
          age = {person.age}
          key = {person.id}
          changed= {(event) => this.nameChangedHandler(event,person.id)}/>
        })}

      </div>
      );
      style.backgroundColor ='red';


    }

  const classes = [];
    if (this.state.persons.length <=2) {
      classes.push('red');
    }
      if (this.state.persons.length <=1) {
        classes.push('bold');
      }
   return (

      <div className="App">
       <h1> Hi, Im a React App</h1>
       <p className = {classes.join(' ')}>This is really working</p>
       <button
        style = {style}
       onClick ={this.togglePersonsHandler}>Toggle Person</button>
       {persons}

      </div>

    );
//return React.createElement('div',{className:'App'},React.createElement('h1',null,'Does this work now?'))
  }
}

export default App;
