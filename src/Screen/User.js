import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import emailjs from "emailjs-com"




const User = () => {
    const [Data, setData] = useState([]);
    const [RowData, setRowData] = useState([]);
    const [ViewShow, setViewShow] = useState(false);

    const handleViewShow = () => { setViewShow(true) }
    const handleViewClose = () => { setViewShow(false) }

    //edit model

    const [ViewEdit, setEditShow] = useState(false);

    const handleEditShow = () => { setEditShow(true) };
    const handleEditClose = () => { setEditShow(false) };

    //add new user

    const [ViewAdd, setAddShow] = useState(false);
    const handleAddShow = () => { setAddShow(true) };
    const handleAddClose = () => { setAddShow(false) };

    // send user
    const [ViewSend, setSendShow] = useState(false);
    const handleSendShow = () => { setSendShow(true) };
    const handleSendClose = () => { setSendShow(false) };

    //local stroing of data 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [hobbies, setHobbies] = useState("");


    //delete user
    const [Delete, setDelete] = useState(false)


    //id to update and delete record
    const [id, setId] = useState("");

    //send email


    //getting user
    const GetUserData = () => {
        //getting user data
        const url = 'https://full-app-todo.herokuapp.com/user'
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'success') {
                    alert(message, status)
                }
                else {
                    setData(data)
                    console.log(data)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    //adding user
    const handleSubmit = () => {
        //adding to the database
        const url = 'https://full-app-todo.herokuapp.com/user';
        const Info = { name, email, number, hobbies }
        axios.post(url, Info, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const result = response.data;
                const { status, message, } = result;
                if (status !== 'success') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err)
            })
    }
    //editing user
    const handleEdit = () => {
        //editing user
        const url = `https://full-app-todo.herokuapp.com/user/${id}`;
        const Info = { name, email, number, hobbies }
        axios.put(url, Info, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const result = response.data;
                const { status, message, } = result;
                if (status !== 'success') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err)
            })
    }

    //delete 
    const handleDelete = () => {
        //editing user
        const url = `https://full-app-todo.herokuapp.com/user/${id}`;
        axios.delete(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const result = response.data;
                const { status, message, } = result;
                if (status !== 'success') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err)
            })
    }
    //sending checked items to email

    const handleSendData = (e) => {
        
        var templateParams = { name:RowData.name, email:RowData.email, number:RowData.number, hobbies:RowData.hobbies };
        console.log(templateParams)

        emailjs.send('service_4uyavoq', 'fulsatck_template', templateParams,  'ELepgvZVw53qBXqXU')
        .then(function(response) {

            console.log('SUCCESS!', response.status, response.text);
            alert("Email Sent Succesfully......", response.status, response.text)
            window.location.reload()

        }, function(error) {
            console.log('FAILED...', error);

        });
    }


    useEffect(() => {
        GetUserData();
               
    }, [])



    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handleAddShow() }}><i className='fa fa-plu'></i>
                        Add New User
                    </Button>
                    <br/><br/>
                    <hr/>

                    <Button variant='primary'  onClick={() => { handleSendShow() }}><i className='fa fa-plu' ></i>
                        Send User Info
                    </Button>
                </div>
            </div>

            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th type='checkbox'>Select</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Hobbies</th>
                                <th>Update/Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td><input type="checkbox" id="select" name="select" value="rows" onClick={() => {(setRowData(item))}}/></td>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.number}</td>
                                    <td>{item.email}</td>
                                    <td>{item.hobbies}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(setRowData(item)) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={() => { handleEditShow(setRowData(item), setId(item._id)) }}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => { handleViewShow(setRowData(item), setId(item._id), setDelete(true)) }}>Delete</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={handleViewClose}
                    backdrop="static"
                    keyboard={false}
                    >

                        <Modal.Header closeButton>
                            <Modal.Title>View User Data</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                                
                                <div className='form-group'><input type="id" className='form-control' value={RowData._id} readOnly /> </div>
                                <div className='form-group'><input type="text" className='form-control' value={RowData.name} readOnly /> </div>
                                <div className='form-group'><input type="email" className='form-control' value={RowData.email} readOnly /> </div>
                                <div className='form-group'><input type="text" className='form-control' value={RowData.number} readOnly /> </div>
                                <div className='form-group'><input type="text" className='form-control' value={RowData.hobbies} readOnly /> </div>

                                {
                                    Delete && (
                                        <Button type="submit" className='btn btn-danger mt-4' onClick={ handleDelete }>Delete User</Button>
                                        )
                                }
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleViewClose}>Close</Button>
                        </Modal.Footer>
                </Modal>
            </div>


                {/* Submit to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewAdd}
                    onHide={handleAddClose}
                    backdrop="static"
                    keyboard={false}>

                        <Modal.Header closeButton>
                            <Modal.Title>Add User Data</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                        <div>

                            <div className='form-group'><input type="id" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter your name" /> </div>
                            <div className='form-group'><input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your email" /> </div>
                            <div className='form-group'><input type="text" className='form-control' onChange={(e) => setNumber(e.target.value)} placeholder="Please enter Phone Number" /> </div>
                            <div className='form-group'><input type="text" className='form-control' onChange={(e) => setHobbies(e.target.value)} placeholder="Please enter your Hobby" /> </div>

                        </div>

                        <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmit}>Add User</Button>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleAddClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* Edit your data*/}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}>

                        <Modal.Header closeButton>
                            <Modal.Title>Edit User Data</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>

                                <div className='form-group'>
                                        <label>Name</label>
                                        <input type="id" className='form-control' onChange={(e) => setName(e.target.value)} placeholder="Please enter your name" defaultValue={RowData.name} /> </div>
                                <div className='form-group'>
                                        <label>Email</label>
                                        <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your email" defaultValue={RowData.email} /> </div>
                               <div className='form-group'>
                                        <label>Number</label>
                                        <input type="text" className='form-control' onChange={(e) => setNumber(e.target.value)} placeholder="Please enter Phone Number" defaultValue={RowData.number} /> </div>
                                <div className='form-group'>
                                        <label>Hobbies</label>
                                        <input type="text" className='form-control' onChange={(e) => setHobbies(e.target.value)} placeholder="Please enter your Hobby" defaultValue={RowData.hobbies} /></div>

                                        <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit User</Button>
                            </div>
                    </Modal.Body>
                            
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/*send Data*/}
            <div className='model-box-view'>
                <Modal
                    show={ViewSend}
                    onHide={handleSendClose}
                    backdrop="static"
                    keyboard={false}
                    onSubmit ={handleSendData}>

                        <Modal.Header closeButton>
                            <Modal.Title>Send User Data</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <div>
                                
                                <div className='form-group'><input type="id" className='form-control' value={RowData._id} readOnly /> </div>
                                <div className='form-group'><input type="text" className='form-control' value={RowData.name} readOnly /> </div>
                                <div className='form-group'><input type="email" className='form-control' value={RowData.email} readOnly /> </div>
                                <div className='form-group'><input type="text" className='form-control' value={RowData.number} readOnly /> </div>
                                <div className='form-group'><input type="text" className='form-control' value={RowData.hobbies} readOnly /> </div>

                                <Button type='submit' className='btn btn-success mt-4' onClick={(e)=>handleSendData(e)}>Send User</Button>
                        </div>
                                
                    </Modal.Body>
                            
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleSendClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default User