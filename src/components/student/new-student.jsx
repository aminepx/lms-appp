import React from 'react'
export default function NewStudent(props) {
    return (
        <div className="col-4 border p-5">
          <div className="avatar border mx-auto mt-5 " />
          <form onSubmit={props.handleSumbit} autoComplete="off">
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input
              name="nom"
              onChange={props.changeInput}
                placeholder="Firstname"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input
              name="prenom"
                onChange = {props.changeInput}
                placeholder="Lastname"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input
              name="email"
              onChange = {props.changeInput}
                placeholder="Email address"
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-4 mt-4 w-70 mx-auto">
              <input
              name="avatar"
              onChange = {props.changeInput}
                placeholder="Url Avatar"
                type="text"
                className="form-control"
              />
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Add Student <i className="fas fa-plus-circle" />
              </button>
            </div>
          </form>
        </div>
    )
}
