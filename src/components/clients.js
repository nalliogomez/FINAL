import React, { useEffect,useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {show_alert} from '../functions';

const ShowClients = () => {
    const url = "http://localhost:8080/api/clients/";
    const [clients,setClients] = useState([]);
    const [id,setId] = useState([]);
    const [name,setName] = useState([]);
    const [address,setAddress] = useState([]);
    const [nit,setNit] = useState([]);
    const [phone,setPhone] = useState([]);
    const [operation,setOperation]= useState(1);
    const [title,setTitle] = useState('');
    const i = 0;
    useEffect(()=>{
        getClients();
    },[]);

    const getClients = async () => {
        const response = await axios.get(url)
        .then(response => {
            setClients(response.data);
          })
          .catch(error => {
            console.log('Error:', error);
          });
    }

    const openModal = (op,id, name, address, nit, phone) =>{
        setId('');
        setName('');
        setAddress('');
        setNit('');
        setPhone('');
        setOperation(op);
        if(op === 1){
            setTitle('Registrar Cliente');
        }
        else if(op === 2){
            setTitle('Editar Cliente');
            setId(id);
            setName(name);
            setAddress(address);
            setNit(nit);
            setPhone(phone);
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        },500);
    }

    const validar = () => {
        var parametros;
        var metodo;
        if(name.length == 0){
            show_alert('Escribe el nombre del cliente','warning');
        }
        else if(address.length == 0){
            show_alert('Escribe la direccion del cliente','warning');
        }
        else if(nit.length == 0){
            show_alert('Escribe el nit del cliente','warning');
        }
        else if(phone.length == 0){
            show_alert('Escribe el telefono del cliente','warning');
        }
        else{
            if(operation === 1){
                parametros= {name:name.trim(),address: address.trim(),nit:nit.trim(),phone:phone.trim()};
                metodo= 'POST';
                var ruta = "http://localhost:8080/api/clients/";
            }
            else{
                parametros={id:id,name:name.trim(),address: address.trim(),nit:nit.trim(),phone:phone.trim()};
                metodo= 'PUT';
                var ruta = "http://localhost:8080/api/clients/"+id;
            }
            envarSolicitud(metodo,parametros,ruta);
        }
    }

    const envarSolicitud = async(metodo,parametros,ruta) => {
        await axios({ method:metodo, url: ruta, data:parametros}).then(function(respuesta){
            var tipo = respuesta.status;
            var msj = 'Procesado Correctamente';

            if(tipo === 200){
                show_alert(msj,'success');
                document.getElementById('btnCerrar').click();
                getClients();
            }
        })
        .catch(function(error){
            show_alert('Error en la solicitud','error');
            console.log(error);
        });
    }

    const deleteClient = (id,name) =>{
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Seguro de eliminar el cliente '+name+' ?',
            icon: 'question',text:'No se podrá dar marcha atrás',
            showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
        }).then((result) =>{
            if(result.isConfirmed){
                setId(id);
                var ruta = "http://localhost:8080/api/clients/"+id;
                envarSolicitud('DELETE',{id:id},ruta);
            }
            else{
                show_alert('El producto NO fue eliminado','info');
            }
        });
    }

  return (
    <div className='App'>
        <div className='container-Fluid'>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
                        <button  className='btn btn-success' onClick={()=> openModal(1)} data-bs-toggle="modal" data-bs-target="#modalClients">
                            <i className='fa-solid fa-user-plus'></i> Nuevo Cliente
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                <div className='table table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr className='text-center'>
                                <th>#</th>
                                <th>Cliente</th>
                                <th>Nit</th>
                                <th>Dirección</th>
                                <th>Telefono</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {
                                clients.map((client,id)=>(
                                    <tr key={client.id}>
                                        <td>{(client.id)}</td>
                                        <td>{(client.name)}</td>
                                        <td>{(client.nit)}</td>
                                        <td>{(client.address)}</td>
                                        <td>{(client.phone)}</td>
                                        <td className='text-center'>
                                            <button onClick={() => openModal(2,client.id,client.name,client.address,client.nit,client.phone)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalClients'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp;
                                            <button onClick={()=>deleteClient(client.id,client.name)} className='btn btn-danger'>
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )

                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="modalClients" className='modal fade' aria-hidden='true'>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <input type='hidden' id='id'></input>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-signature'></i></span>
                        <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={name}
                        onChange={(e)=> setName(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-location-dot'></i></span>
                        <input type='text' id='direccion' className='form-control' placeholder='Dirección' value={address}
                        onChange={(e)=> setAddress(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-hashtag'></i></span>
                        <input type='text' id='nit' className='form-control' placeholder='NIT' value={nit}
                        onChange={(e)=> setNit(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-phone'></i></span>
                        <input type='number' id='telefono' className='form-control' placeholder='Tel.' value={phone}
                        onChange={(e)=> setPhone(e.target.value)}></input>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" id='btnCerrar' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={() => validar()} className="btn btn-success"><i className='fa-solid fa-floppy-disk'></i>&nbsp;Guardar</button>
                </div>
                </div>
            </div>
            
        </div>
    </div>
    
  )
}

export default ShowClients
