import React,{useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import {Context} from "../store/appContext"

export const Navbar = () => {
	const {store} = useContext(Context);

	useEffect(() => {
		console.log(store.inHome);
	}, [store.inHome]);

	return (
		<nav className="navbar m-3">
			<span className="navbar-brand mb-0 h1">Contact List App Using React & Context</span>
			<div className={"ml-auto "+ (store.inHome?"":"invisible")}>
				<Link to="/addContact">
					<button className="btn btn-success">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};
