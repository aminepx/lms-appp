import "./style1.css"
import ListStudent from '../student/list-student';
import NewStudent from '../student/new-student';
import React from 'react';
import StudentModel from '../../models/student-model';


class Home extends React.Component{  
constructor(){
  // -----call the constroctor of the parent class
  super();
  // ------data
  this.state={
    nom :"",
    prenom:"",
    avatar:"",
    email:"",
    
    List_students_data : [],
    //   new StudentModel("ramzi1",
    // "amine1",
    // "aminepx1@gmail.com",
    // "https://i.imgur.com/1o1zEDM.png",
    // true),
    // new StudentModel("ramzi2",
    // "amine2",
    // "aminepx2@gmail.com",
    // "https://i.imgur.com/1o1zEDM.png",
    // true),
    // new StudentModel("ramzi3",
    // "amine3",
    // "aminepx@gmail.com",
    // "https://i.imgur.com/1o1zEDM.png",
    // true),
    // new StudentModel("ramzi4",
    // "amine4",
    // "aminepx4@gmail.com",
    // "https://i.imgur.com/1o1zEDM.png",
    // true),
    // new StudentModel("ramzi5",
    // "amine5",
    // "aminepx5@gmail.com",
    // "https://i.imgur.com/1o1zEDM.png",
    // true)
    // ]
   
  }
  
};
  render(){
  return(
    <>
    <h1 className="text-center text-white mt-5">
              <span className="text-warning">Home</span> 🏠
          </h1>
          <div className="container-fluid d-flex p-4">
          
            <NewStudent handleSumbit={this.addStudent}
            changeInput = {this.changeInput}
            // changeInputPren = {this.changeInputPren}
            // changeInputAvatar = {this.changeInputAvatar}
            // changeInputEmail = {this.changeInputEmail}
            />
            <ListStudent listData={this.state.List_students_data}/>
            
          </div>
          
    </>  
        );
}





changeInput = (event)=>{
  let val =event.target.value;
  let input=event.target.name;
  this.setState({[input]:val});
}
// changeInputPren = (event)=>{
//   this.setState({prenom: event.target.value })
// }
// changeInputAvatar= (event)=>{
//   this.setState({avatar :event.target.value })
// }
// changeInputEmail = (event)=>{
//   this.setState({email: event.target.value })
// }
addStudent = (event)=>{
  event.preventDefault();
  event.target.reset();

  if(this.state.nom=="" || this.state.prenom=="" || this.state.email=="" || this.state.avatar==""){
    alert("veulliez remplir tout les champs" )
  }

else{
  let nStudent = new StudentModel(
    this.state.List_students_data.length + 1,
    this.state.nom,
    this.state.prenom,
    this.state.email,
    this.state.avatar,
    false)
this.setState({
  nom :"",
    prenom:"",
    avatar:"",
    email:"",
})
let newStudentList =this.state.List_students_data;
newStudentList.push(nStudent);
this.setState({List_students_data:newStudentList})

}
}

}
export default Home;