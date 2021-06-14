import { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      newItem: "",
      list: [], 
      addedItem: 'false'
    }
  }

  addItem(){
    const newItem = {
      id: 1+ Math.random(),
      value: this.state.newItem.slice()
    }
    const list = [...this.state.list];
    list.push(newItem);
    this.setState({
      list,
      newItem: "",
      addedItem: 'true'
    });
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
                  placeholder="Add a Todo..."
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
                </div>
            </div>
          </div>
          <div className="all-card-wrapper">
          <h4 className="all-todo">
              {this.state.addedItem === 'true'  ? "List of all Todo's": ''}
            </h4>
            <div className="row">
            {this.state.list.map(item => {
              return (
                <div  className="col-xl-3 p-2 col-md-4 col-sm-12 text-center " key={item.id}>
                  <div className="each-card"
                  >
                   {item.value}
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
