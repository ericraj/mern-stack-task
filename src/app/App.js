import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            title: '',
            description: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(e) {
        // console.log(e.target.name);
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.setState({tasks: data});
                console.log(this.state.tasks);
            });
    }

    addTask(e) {
        e.preventDefault();

        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Updated'});
                this.setState({_id:'', title:'', description: ''});
                this.getTasks();
            })
            .catch(err => console.error(err));
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Saved'});
                this.setState({title:'', description: ''});
                this.getTasks();
            })
            .catch(err => console.error(err));
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    _id: data._id,
                    title: data.title,
                    description: data.description
                })
            })
    }

    deleteTask(id) {
        if(confirm('Are you sure to delete')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Deleted'});
                this.getTasks();
            });
        }
    }

    render() {
        return(
            <div>
                {/* Navigation */}
                <nav className="light-blue darken-4">
                    <div className="nav-wrapper container">
                        <a href="#" className="brand-logo">MERN Stack Task</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#">Login</a></li>
                            <li><a href="#">About</a></li>
                        </ul>
                    </div>
                </nav>

                {/* Form */}
                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" name="title" placeholder="Task Title" onChange={this.handleChange} value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" name="description" placeholder="Task Description" onChange={this.handleChange} value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            <table className="highlight">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn btn-small light-blue darken-4" onClick={() => this.editTask(task._id)}>
                                                            edit
                                                        </button>
                                                        <button className="btn btn-small red darken-4" style={{margin: 4}} onClick={() => this.deleteTask(task._id)}>
                                                            delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default App;