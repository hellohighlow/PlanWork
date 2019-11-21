import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    activeItem: this.props.activeItem
	  };
	}
	handleChange = e => {
	  let { name, value } = e.target;
	  const activeItem = { ...this.state.activeItem, [name]: value };
	  this.setState({ activeItem });
	};
	render() {
	  const { toggle, onSave } = this.props;
	  return (
	    <Modal isOpen={true} toggle={toggle}>
	      <ModalHeader toggle={toggle}> Event Item </ModalHeader>
	      <ModalBody>
	        <Form>
	          <FormGroup>
	            <Label for="title">Title</Label>
	            <Input
	              type="text"
	              name="title"
	              value={this.state.activeItem.title}
	              onChange={this.handleChange}
	              placeholder="Enter Event title"
	            />
	          </FormGroup>
	          <FormGroup>
	            <Label for="date">Date</Label>
	            <Input
	              type="date"
	              name="date"
	              value={this.state.activeItem.date}
	              onChange={this.handleChange}
	              placeholder="Enter date and time"
	            />
	          </FormGroup>
	          <FormGroup>
	            <Label for="location">
						Location
	               <Input
	               type="text"
	               name="location"
						value={this.state.activeItem.location}
	               onChange={this.handleChange}
						placeholder="Enter location"
	               />
	            </Label>
	          </FormGroup>
	        </Form>
	      </ModalBody>
	      <ModalFooter>
	        <Button color="success" onClick={() => onSave(this.state.activeItem)}>
	          Save
	        </Button>
	      </ModalFooter>
	    </Modal>
	  );
	}
}
