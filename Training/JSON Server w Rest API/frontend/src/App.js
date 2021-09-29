import logo from './logo.svg';
import './App.css';

function App() {

  
  return (
    <div className="App">
      <h1 align="center">

          Welcome to Employee Database

      </h1>
      
    </div>
  );
}

function getLists() {
  this.setState({ loading: true }, () => {
    fetch("http://localhost:4000/employees")
      .then(res => res.json())
      .then(result =>
        this.setState({
          loading: false,
          alldata: result
        })
      )
      .catch(console.log);
  });
}

function createList() {
  fetch("http://localhost:4000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state.singledata)
  }).then(
    this.setState({
      singledata: {
        title: "",
        author: ""
      }
    })
  );
}


function updateList(event, id) {
  fetch("http://localhost:4000/employees/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state.singledata)
  })
    .then(res => res.json())
    .then(result => {
      this.setState({
        singledata: {
          title: "",
          author: ""
        }
      });
      this.getLists();
    });
}

function deleteList(event, id) {
  fetch("http://localhost:4000/employees/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state.singledata)
  })
    .then(res => res.json())
    .then(result => {
      this.setState({
        singledata: {
          title: "",
          author: ""
        }
      });
      this.getLists();
    });
}

export default App;
