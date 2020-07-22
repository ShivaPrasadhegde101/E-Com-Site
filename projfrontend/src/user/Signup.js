import React ,{useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper'

const Signup= ()=>{

    const [values,setValues]= useState({
        name: "",
        email:"",
        password:"",
        error:"",
        success:false
    })

    //NOTE:Set value is used to modify the values
    const {name,email,password,error,success}=values

    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const onSubmit = event=>{
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password}).then(data=>{
            if(data.error)
            {
                setValues({...values,error:data.error,success:false})
            }
            else
            {
                setValues({...values,
                name:"",
            email:"",password:"",error:"",success:true})
            }
        }).catch(console.log("Error in Sign up"))
    }

    const successMessage=()=>{
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
<div className="alert alert-success" style={{display:success?"":"none"}}>Account created successfully.Please <Link to="/signin">Login Here</Link></div>
</div>
</div>
        )}


    const errorMessage=()=>{
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger" style={{display:error?"":"none"}}>{error}</div>
        </div>
        </div>
        )}
    const signUpForm=()=>{
        return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input type="text" className="form-control" onChange={handleChange("name")} value={name}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input className="form-control" type="email" onChange={handleChange("email")} value={email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input type="password" className="form-control" onChange={handleChange("password")} value={password}></input>
                    </div>
                    <button onClick ={onSubmit} className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </div>
        )
    }

return(
    <Base title="Sign up " description="">
        {errorMessage()}
        {successMessage()}
    {signUpForm()}
    </Base>
)
}

export default Signup