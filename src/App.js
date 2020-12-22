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
      </div>
    );
  }
}
export default App;
