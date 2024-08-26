
import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {
	
	return {
		store: {
			agendaName: "AngelCrispin",
			contacts: [],
			isLoading: false,
			inHome: true
		},
		actions: {
			
			createAgenda: () => {
				const store = getStore();
				setStore({isLoading:true})
				fetch("https://playground.4geeks.com/contact/agendas/"+store.agendaName,{method: "POST"})
					.then((response)=>response.status==201?getActions().getContacts():console.log(response.json()))
					.catch((error)=>console.log(error))
			},
			getContacts: () => {
				const store = getStore();
				setStore({isLoading:true})
				fetch("https://playground.4geeks.com/contact/agendas/"+store.agendaName+"/contacts",
					{
						method: "GET"}
					)
					.then((response)=>response.status==404?getActions().createAgenda():response.json())
					.then((data)=>setStore({contacts:data.contacts,isLoading:false}))
					.catch((error)=>console.log(error))
			},
			addContact: (contact) => {
				const store = getStore();
				setStore({isLoading:true})
				fetch("https://playground.4geeks.com/contact/agendas/"+store.agendaName+"/contacts",
					{
						method: "POST",
						headers:{"Content-Type":"application/json"},
						body: JSON.stringify(contact)
					})
					.then((response)=>response.status==201?response.json():console.log("Error al crear contacto."))
					.then((data)=>{
						const Swal = require('sweetalert2')
						Swal.fire({
							title: "Hecho!",
							text: "Contacto creado.",
							icon: "success"
						});
						console.log(data);
						setStore({isLoading:false})
					})
					.catch((error)=>console.log(error))
			},
			updateContact: (contact,id) => {
				const store = getStore();
				setStore({isLoading:true})
				fetch("https://playground.4geeks.com/contact/agendas/"+store.agendaName+"/contacts/"+id,
					{
						method: "PUT",
						headers:{"Content-Type":"application/json"},
						body: JSON.stringify(contact)
					})
					.then((response)=>{
						if(response.status==200){

							setStore({isLoading:false})
							console.log("Error al actualizar contacto.")
							Swal.fire({
								title: "Hecho!",
								text: "Contacto actualizado.",
								icon: "success"
							  });
						} else {
							console.log("Error al actualizar contacto.")
							Swal.fire({
								title: "Error!",
								text: "No se pudo actualizar el contacto.",
								icon: "error"
							  });
						}
					})
					.catch((error)=>console.log(error))
			},
			deleteContact: (id) => {
				Swal.fire({
					title: "Seguro que quiere eliminar el contacto?",
					showCancelButton: true,
					confirmButtonText: "Eliminar",
					cancelButtonText: `Cancelar`,
					confirmButtonColor: "red"
				  }).then((result) => {
					
					if (result.isConfirmed) {
					  
					const store = getStore();
					setStore({isLoading:true})
					fetch("https://playground.4geeks.com/contact/agendas/"+store.agendaName+"/contacts/"+id,{method: "DELETE"})
						.then((response) =>{
							const Swal = require('sweetalert2')
							if(response.status==204){

								setStore({isLoading:false})
								console.log("Error al eliminar contacto.")
								Swal.fire({
									title: "Hecho!",
									text: "Contacto eliminado.",
									icon: "success"
								});
								getActions().getContacts();
							} else {
								console.log("Error al eliminar contacto.")
								Swal.fire({
									title: "Error!",
									text: "No se pudo eliminar el contacto.",
									icon: "error"
								});
							}
						})
						.catch((error)=>console.log(error))
					} 
				});

			},
			setInHome: (value) => {
				setStore({inHome:value})
			},
		}
	};
};

export default getState;
