import "./style1.css";
import ListStudent from "../student/list-student";
import FormStudent from "../student/new-student";
import React from "react";
import StudentModel from "../../models/student-model";
import axios from "../../utils/axios";

class Home extends React.Component {
  constructor() {
    // -----call the constroctor of the parent class
    super();
    // ------data
    this.state = {
      nom: "",
      prenom: "",
      avatar: "",
      email: "",
      updatedStudent_id:-1,
      textBtnState:"Add Student",
      iconBtnState:"fas fa-plus-circle",
      action:"ADD",

      List_students_data: [],
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
    };
  }
  render() {
    return (
      <>
        <h1 className="text-center text-white mt-5">
          <span className="text-warning">Home</span> 🏠
        </h1>
        <div className="container-fluid d-flex p-4">
          <FormStudent
            iconBtn={this.state.iconBtnState}
            textBtn={this.state.textBtnState}
            handleAddSubmit={this.addStudent}
            handleEditSubmit={this.submitEditStudent}
            changeInput={this.changeInput}
            // changeInputPren = {this.changeInputPren}
            // changeInputAvatar = {this.changeInputAvatar}
            // changeInputEmail = {this.changeInputEmail}
            avatar={this.state.avatar}
            nom={this.state.nom}
            prenom={this.state.prenom}
            email={this.state.email}
            action={this.state.action}
          />
          <ListStudent 
          listData={this.state.List_students_data}
          homeHandleDeleteStudent={this.deleteStudent}
          homeHandleEdit={this.editStudent}
          
          />
        </div>
      </>
    );
  }

  changeInput = (event) => {
    let val = event.target.value;
    let input = event.target.name;
    this.setState({ [input]: val });
  };
  // changeInputPren = (event)=>{
  //   this.setState({prenom: event.target.value })
  // }
  // changeInputAvatar= (event)=>{
  //   this.setState({avatar :event.target.value })
  // }
  // changeInputEmail = (event)=>{
  //   this.setState({email: event.target.value })
  // }
  addStudent = (event) => {
    event.preventDefault();
    event.target.reset();

    if (
      this.state.nom == "" ||
      this.state.prenom == "" ||
      this.state.email == "" ||
      this.state.avatar == ""
    ) {
      alert("veulliez remplir tout les champs");
    } else {
      let nStudent = new StudentModel(
        0,
        this.state.nom,
        this.state.prenom,
        this.state.email,
        this.state.avatar,
        false
      );
      this.setState({
        nom: "",
        prenom: "",
        avatar: "",
        email: "",
      });
      let newStudentList = this.state.List_students_data;
      newStudentList.push(nStudent);
      this.setState({ List_students_data: newStudentList });
      const data_student={
        nom: nStudent.nom,
        prenom: nStudent.prenom,
        email: nStudent.email,
        avatar: nStudent.avatar,
        ispresent:nStudent.ispresent,
      }
    

      axios.post("students.json", data_student).then((response)=>{
        let id_new_student = response.data.name;

        let newListStudent=this.state.List_students_data;
        newListStudent.forEach(s=>{
          if(s.id==0){
            s.id=id_new_student;
          }
        })
        this.setState({List_students_data:newListStudent})
       

      
      })
    }
  
  }
     //------- recuperer la liste des etudiants depuis firebase
     componentDidMount(){
      axios.get("students.json").then((response)=>{
      if(response.data!=null){
        let keys = Object.keys(response.data)
        let listEtudiant = keys.map(k=>{
        
         let ns = new StudentModel(k,
           response.data[k].nom,
           response.data[k].prenom,
           response.data[k].email,
           response.data[k].avatar,
           response.data[k].ispresent
           );
         return ns; 
        }) 
       
        this.setState({List_students_data:listEtudiant})      
        
      } 
     })
      
       
    
    }
    deleteStudent= (idStudent)=>{
      let choice = window.confirm("are you sure")
      if(choice==true){
        axios.delete("students/"+idStudent+".json").then(()=>{
          let newList = this.state.List_students_data.filter((s)=>s.id!=idStudent
          );
          this.setState({List_students_data:newList});
        })
      }
      
      
    }
    editStudent=(updatedStudent)=>{
      // ----changer le text de la boutton  
      this.setState({textBtnState:'Edit Student'})
      this.setState({iconBtnState:'fas fa-edit'})
      this.setState({
        nom:updatedStudent.nom,
        prenom:updatedStudent.prenom,
        email:updatedStudent.email,
        avatar:updatedStudent.avatar,
        updatedStudent_id:updatedStudent.id,
      })
      // -----changer l'action de state 
      this.setState({action:"EDIT"})
    }
    submitEditStudent=(event)=>{
      event.preventDefault();
     const student_data={
     
      nom:this.state.nom,
     prenom:this.state.prenom,
     email:this.state.email,
     avatar:this.state.avatar,
    }
    axios.put("students/"+this.state.updatedStudent_id+".json",student_data).then((response)=>{
      let newList=this.state.List_students_data;
      newList.forEach((s)=>{
        if(s.id==this.state.updatedStudent_id){
          s.nom=response.data.nom;
          s.prenom=response.data.prenom;
          s.email=response.data.email;
          s.avatar=response.data.avatar;
        }
      })
      this.setState({List_students_data:newList})

      // ----------vider le formulaire
      event.target.reset();
      this.setState({
        nom:"",
        prenom:"",
        email:"",
        avatar:"",
        updatedStudent_id:-1,
        textBtnState:"Add Student",
        iconBtnState:"fas fa-plus-circle",
        action:"ADD"

      })

    })
    }
}
export default Home;
