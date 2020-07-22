import React ,{useState} from 'react'
import Base from '../core/Base'
import {Link,Redirect} from 'react-router-dom'

import {signin,authenticate,isAuthenticated} from '../auth/helper'
const Signin= ()=>{

    const [values,setValues]=useState({
        email:"S@gmail.com",
        password:"12345",
        error:"",
        loading:false,
        didRedirect:false
    })

    const {email,password,error,loading,didRedirect}=values
    const {user} = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(
            data=>{
                if(data.error)
                {
                    setValues({...values,error:data.error,loading:false})
                }
                else
                {
                    authenticate(data,()=>{
                        setValues({...values,email:"",password:"",error:"",didRedirect:true})
                    })
                }
            }
        )
        .catch(err=>{if(err)console.log("signin request failed")})
    }

    const preformRedirect = ()=>{
        if(didRedirect)
        {
            if(user && user.role===1)
            {
                return <Redirect to="/admin/dashboard"/>
            }
            else
            {
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated())
        {
            
            return <Redirect to="/"></Redirect>
        }
    }


    const loadingMessage=()=>{
        return(
            loading && (
                <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
                </div>
                </div>
            )
        )

        }
    const errorMessage=()=>{
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger" style={{display:error?"":"none"}}>{error}</div>
        </div>
        </div>
        )}

    const signInForm=()=>{
        return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input onChange={handleChange("email")} className="form-control" type="email" value={email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input onChange={handleChange("password")} type="password" className="form-control" value={password}></input>
                    </div>
                    <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                </form>
            </div>
        </div>
        )
    }



return(
    <Base title="Sign in " description="">
        {loadingMessage()}
        {errorMessage()}
    {signInForm()}

    {preformRedirect()}
    </Base>
)
}

export default Signin