import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         activeItem: {
            title: "",
            date: "",
            time: "",
            location: ""
         },
         eventList:[]
      };
   }
   componentDidMount() {
      this.refreshList();
   }
   refreshList = () => {
      axios
         .get("http://localhost:8000/api/events/")
         .then(res => this.setState({ eventList: res.data}))
         .catch(err => console.log(err));
   };
   renderItems = () => {
      const { viewCompleted } = this.state;
      const newItems = this.state.eventList.filter(
         item => item.completed === viewCompleted
      );
      return newItems.map(item => (
         <li
         key={item.id}
         className="list-group-item d-flex justify-content-between align-items-center"
         >
            <span
            title={item.title}
            >
               {item.title}
            </span>
            <span
            title={item.location}
            >
               {item.location}
            </span>
            <span
            title={item.date}
            >
               {item.date}
            </span>
            <span>
               <button
               onClick={() => this.editItem(item)}
               className="btn btn-secondary mr-2"
               >
                  {" "}
                  Edit{" "}
               </button>
               <button
               onClick={() => this.handleDelete(item)}
               className="btn btn-danger"
               >
                  Delete{" "}
               </button>
            </span>
         </li>
      ));
   };
   toggle = () => {
      this.setState({modal: !this.state.modal});
   };
   handleSubmit = item => {
      this.toggle();
      if (item.id) {
         axios
         .put(`http://localhost:8000/api/events/${item.id}/`, item)
         .then(res => this.refreshList())
         .catch(err => console.log(err));
         return;
      }
      axios
      .post("http://localhost:8000/api/events/", item)
      .then(res => this.refreshList());
   };
   handleDelete = item => {
      axios
      .delete(`http://localhost:8000/api/events/${item.id}`)
      .then(res => this.refreshList());
   };
   createItem = () => {
      const item = { title: "", date: "", location: "" };
      this.setState({ activeItem: item, modal: !this.state.modal });
   };
   editItem = item => {
      this.setState({ activeItem: item, modal: !this.state.modal });
   };
   render() {
      return (
         <main className="content">
            <h1 className="text-white text-uppercase text-center my-4">PlanWork</h1>
            <div className="row ">
               <div className="col-md-6 col-sm-10 mx-auto p-0">
                  <div className="card p-3">
                     <div className="">
                        <button onClick={this.createItem} className="btn btn-primary">
                           Add event
                        </button>
                     </div>
                     <div className="">
                        <
                     <ul className="list-group list-group-flush">
                        {this.renderItems()}
                     </ul>
                  </div>
               </div>
            </div>
            {this.state.modal ? (
               <Modal
               activeItem={this.state.activeItem}
               toggle={this.toggle}
               onSave={this.handleSubmit}
               />
            ) : null}
         </main>
      );
   }
}
export default App;
