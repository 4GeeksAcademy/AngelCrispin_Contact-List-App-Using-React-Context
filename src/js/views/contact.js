import React, { useContext, useEffect,useState } from 'react'
import { Link } from "react-router-dom";
import {Context} from "../store/appContext"
import { useParams } from 'react-router-dom';

const AddContact = () => {

	const {store,actions} = useContext(Context);
	const { id=0 } = useParams();
	const [name,setName] = useState('');
	const [phone,setPhone] = useState('');
	const [email,setEmail] = useState('');
	const [address,setAddress] = useState('');

	useEffect(()=>{

		actions.setInHome(false);
		const contact = store.contacts.filter(x => x.id == id);
		if(contact.length>0){
			setName(contact[0].name);
			setPhone(contact[0].phone);
			setEmail(contact[0].email);
			setAddress(contact[0].address);
		}

	},[]);

	const handleSubmit = (event) => {
		event.preventDefault();
	
		const formData = new FormData(event.target);
		const data = {
			name: formData.get('name'),
			phone: formData.get('phone'),
			email: formData.get('email'),
			address: formData.get('address'),
		};

		if(id>0){
			actions.updateContact(data,id);
		} else {
			actions.addContact(data);
		}
	  };

    return (
		
		<div className="formContact  m-5" >
		<h1 className="text-center">{id>0?"Edit":"Add a new"} contact</h1>
		<form id="form" onSubmit={handleSubmit}>
			<div className="mb-3">
				<label className="form-label">Full Name</label>
				<input type="text" className="form-control" id="inputFullName" name="name" placeholder="Full Name" defaultValue={name}/>
			</div>
			<div className="mb-3">
				<label className="form-label">Email</label>
				<input type="text" className="form-control" id="inputEmail" name="email" placeholder="Enter Email" defaultValue={email}/>
			</div>
			<div className="mb-3">
				<label className="form-label">Phone</label>
				<input type="text" className="form-control" id="inputPhone" name="phone" placeholder="Enter Phone" defaultValue={phone}/>
			</div>
			<div className="mb-3">
				<label className="form-label">Address</label>
				<input type="text" className="form-control" id="inputAddress" name="address" placeholder="Enter Address" defaultValue={address}/>
			</div>
			<button type="submit" className="btn btn-primary w-100">Save</button>
			<Link to="/">
                <span>Or get back to contacts</span>
			</Link>
		</form>
		</div>
    );

}

export default AddContact;
