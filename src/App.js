import { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      newItem: "",
      list: [],
      completedTodos: [],
      completedZero: 'true'
    }
  }
  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  addItem(){
    const newItem = {
      id: 1+ Math.random(),
      value: this.state.newItem.slice()
    }
    const list = [...this.state.list];
    list.unshift(newItem);
    if(newItem.value.includes("#")) {
      newItem.value = '★ '+ newItem.value
    }
    this.setState({
      list,
      newItem: ""
    });
  }
  completedItem(id, key) {
    const itemCompleted = {
      id: id,
      value: key
    }
    const list = [...this.state.list];
    const todos =[...this.state.completedTodos]
    const updatedList = list.filter(item => item.id !== id);
    console.log(key);
    todos.unshift(itemCompleted);
    this.setState({ 
      list: updatedList, 
      completedTodos: todos,
      newItem: "",
      completedZero: 'false'
    });
  }
  resetList() {
    this.setState({list: [], completedTodos:[], completedZero: 'true' });
  }
  updateInput(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="todo-app-content">
            <h1 className="app-title text-center">MY TODO APP</h1>
            <div className="input-wrapper">
              <input
                  type="text"
                  className="input-field"
                  placeholder="A Todo List Item..."
                  value={this.state.newItem}
                  onChange={e => this.updateInput("newItem", e.target.value)}
                />
                <div className="btn-wrapper">
                  <button
                    className="add-btn"
                    onClick={() => this.addItem()}
                    disabled={!this.state.newItem.length}
                  >
                    Add Todo
                  </button>
                  <button
                    className="add-rst"
                    onClick={() => this.resetList()}
                  >
                    Reset
                  </button>
                </div>
            </div>
          </div>
          <div className="all-card-wrapper">
            <div className="row">
            {this.state.list.map(item => {
              return (
                <div  className="col-xl-3 p-2 col-md-4 col-sm-12 text-center " key={item.id}>
                  <div className="each-card"
                  onClick={() => this.completedItem(item.id, item.value)}
                  >
                   {item.value}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
          <div className="completed-todos">
            <h4 className="completed-task">
              {this.state.completedZero === 'false' ? "List of all Todo's Completed": ''}
            </h4>
          <div className="row">
            {this.state.completedTodos.map(item => {
              return (
                <div  className="col-xl-3 p-2 col-md-4 col-sm-12 text-center ">
                  <div className="each-card-completed">
                  &#10003; {item.value}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
      </div>
        <div class="app-instructions-wrapper">
          <h4>About The App..</h4>
            <div class="content-intructions">
            <p><span>+</span> A list of TODO cards where each todo is appended on creation.( ..Done)</p>
            <p><span>+</span> Clicking on a TODO card should mark the TODO as complete and move it to the bottom
              of the list.( ..Done)</p>
            <p><span>+</span> The active TODO cards should appear in order of creation (most recent on top), while
              the completed todo cards should appear in order of completion (most recent on top).(...Implemented most recent at the very first) ( ..Done)</p>
            <p><span>+</span> A reset button on the top right corner of the App to clear all Todo(s) and return to initial
              state.( ..Done)</p>
            <p><span>+</span> Hitting the refresh button (including hard refresh) in the browser should not cause any
              change in the state of the app (it should work like a regular offline app).( ..Done)</p>
            <p><span>+</span> Create a Hash-tag feature:( ..Done)</p>
            <p><span>+</span> Any text in todo matching the #hashtag pattern should be separately highlighted.(....Here Text contains #, has a Star symbol before Text....)( ..Done)</p>
            <p><span>+</span> Clicking on a hashtag should act as a filter and show only Todo(s) containing that tag.</p>
            <p><span>+</span> Hashtags can be stacked and the result should be only Todo(s) where all of them are
              present (ex. after clicking #work I should then be able to click #back-end to see Todo(s)
              containing both tags).(.....Not Done, Didn't understand this point...)</p>
          </div>
      </div>
      </div>
    );
  }
}
export default App;
