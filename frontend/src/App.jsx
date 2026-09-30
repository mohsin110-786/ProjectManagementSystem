import {  useEffect, useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ updateName , setUpdateName] = useState("");
  const [editingUserId , setEditingUserId] = useState(null);
   
    useEffect(() => {
          fetch("http://localhost:5000/Users")
          .then((response) => response.json())
          .then((data) =>  setUsers(data))
    }, []);

    const createUser = () => {
          fetch("http://localhost:5000/Users" , {method: "POST" , headers:{"Content-Type" : "application/json",}, 
           
            body: JSON.stringify({
              name: name, email : email , password: password,
            }),
          })
          .then((response) =>response.json() )
          .then((data) => { console.log(data);
          setName("");
          setEmail("");
          setPassword("");

          fetch("http://localhost:5000/Users")
          .then((response) => response.json())
          .then((data) => setUsers(data));
          });
    } ;
     
    const updateUser = (id) => {
       fetch(`http://localhost:5000/Users/${id}` , {method: "PUT" , headers: {"Content-Type" :"application/json" ,},
        body: JSON.stringify({
             name: updateName,
        }),  
      })
         .then((response)  => response.json())
         .then((data) => { console.log(data);
          
          setEditingUserId(null);
         fetch("http://localhost:5000/Users")
         .then((response) => response.json())
         .then((data) => setUsers(data)) ;
         });
    };

      const deleteUser = (id) => {

         const confirmDelete = window.confirm("Are you Sure you want to delete this user?");
          
         if(!confirmDelete){
          return;
         }
       fetch(`http://localhost:5000/Users/${id}` , {method: "DELETE" , })
  
         .then((response)  => response.json())
         .then((data) => { console.log(data);
          
         fetch("http://localhost:5000/Users")
         .then((response) => response.json())
         .then((data) => setUsers(data)) ;
         });
    };
    
  return (
   <div className= "app" >  
       
    <h1>User Management</h1>
      <div className="section-container" >
        
        <div className= "user-section">
          <h2>Users</h2>
           {users.map((user) => (
            <div className="user-card" key={ user._id}>
            <p className="user-name" > Name: {user.name}</p>
            <p className="user-email" > Email: {user.email}</p>
            <button className="update-btn" onClick= {() =>  setEditingUserId(user._id)} >Update</button>
            <button className="delete-btn" onClick= {()=> deleteUser(user._id)} >Delete</button>            
            {editingUserId === user._id && (
              <div className="edit-controls">
                 <input  type="text" placeholder="Enter new Name" value={updateName} onChange={(e) => setUpdateName(e.target.value) } />
                 <button className="submit-btn"  onClick={() => updateUser(user._id)} > Submit </button>
                 <button className="cancel-btn" onClick = {() => {setEditingUserId(null); setUpdateName(""); }} >Cancel</button>
              </div>
            )}
            </div>
            
           ))}
       </div>
     

       <div className= "Create-user-section">
        <h2>Create User</h2>
        <input type= "text" placeholder= "Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input  type= "email" placeholder= "Enter Email" value={email} onChange= {(e) => setEmail(e.target.value)} />
        <input type= "password" placeholder= "Enter Password" value={password}  onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button className="create-btn" onClick={createUser} >Create User</button>
       </div>

      </div>
   </div>
  )

}
  


export default App
