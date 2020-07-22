import React from 'react'
import logo from './lco.png'
import './App.css'

class App extends React.Component
{

  constructor(props){
    super(props)
    this.state = {
      newItem: "",
      list :[]
      count=0
    }
  }

  addItem(todoValue)
  {
    if(todoValue!=="")
    {
      const newItem = {
        id:Date.now(),
        value:todoValue,
        isDone:false
      }
      const list = [...this.state.list]
      const count=...this.state.count
      count=count+1
      list.push(newItem)

      this.setState({
        list,newItem:"",count
      })
    }
  }

  deleteItem(id)
  {
    const list=[...this.state.list] //gets reference to global list value
    const updatedList = list.filter(item=>
      item.id!==id
  )
    this.setState({
      list:updatedList
    })
  }

  updateInput(input)
  {
    this.setState({newItem:input})
  }

  render(){
    return(
      <div>
        <img src={logo} width="100" height="100" className="logo"/>
        <h1 className="App-title">Lco Todo App</h1>
        <div className="container">
          Add an Item...
          <br/>
          <input type="text"
          className="input-text" id="" placeholder="Write a Todo" required
          value={this.state.newItem} onChange={e=>this.updateInput(e.target.value)}></input>
          <button className="add-btn"
          onClick={()=>this.addItem(this.state.newItem)}
          disabled={!this.state.newItem.length}>Add Todo</button>
          <div className="list">
            <ul>
              {this.state.list.map(item=>{
                return(
                  <li key={item.id}>
                    <input type="checkbox" checked={item.isDone}></input>
                    {item.value}
                    <button className="btn" onClick={()=>this.deleteItem(item.id)}>Delete</button>
                  </li>
                )
              })}
              <li>
                <input type="checkbox" ></input>
                Record youtube Videos
                <button className="btn">Delete</button>
              </li>
            </ul>
            <br/>
            <button>Delete Checked</button>
          </div>
        </div>
      </div>
    )
  }
}
export default App;