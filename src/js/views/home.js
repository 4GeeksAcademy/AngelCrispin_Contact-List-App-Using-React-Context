import React,{useEffect,useContext} from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.setInHome(true);
		actions.getContacts();
	}, []);

	return (
	<div className="mt-5">

		{!store.isLoading ? (store.contacts.length>0?(store.contacts.map((contact, index) => {
			return(
			<div key={contact.id} className="cardList" >
				<img className="imageCircle" alt="..." src="https://static.vecteezy.com/system/resources/thumbnails/003/492/377/small/closeup-male-studio-portrait-of-happy-man-looking-at-the-camera-image-free-photo.jpg"/>
				<div className="information">
					<div className="row titleCard">
						<h5 className="col-10 card-title">{contact.name}</h5>
						<Link className="col-1 fa-solid fa-pencil btnEdit" onClick={()=>"Change view"} to={"/editContact/"+contact.id}>
						</Link>
						<i className="col-1 fa-solid fa-trash-can" onClick={()=>actions.deleteContact(contact.id)}></i>
					</div>
					<div className="row">
						<i className="col-1 fa-solid fa-location-dot"></i> 
						<div className="col-11">{contact.address}</div>
					</div>
					<div className="row">
						<i className="col-1 fa-solid fa-phone"></i> 
						<div className="col-11">{contact.phone}</div>
					</div>
					<div className="row">
						<i className="col-1 fa-solid fa-envelope"></i> 
						<div className="col-11">{contact.email}</div>
					</div>
					
				</div>
			</div>)
		})):(<h4 className="text-center" > Sin contactos </h4>)
	):(<div className="lds-hourglass"></div>)}
	</div>
);
}