import React,{useState, useEffect} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { updateCategory, getCategories ,getCategory} from './helper/adminapicall'


const UpdateCategory =({match})=>{

    const [name,setName]=useState("")
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)

    const{user,token}=isAuthenticated()

    const handleChange = (event)=>{
        setError("")
        setName(event.target.value)
    }

    const preload = categoryId => {
        getCategory(categoryId).then(data => {
          //console.log(data);
          if (data.error) {
            setError(true)
          } else {

            setName(data.name)
          }
          
        });
      };
      
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

    const onSubmit = (event)=>{
        event.preventDefault()
        setError("")
        setSuccess(false)

        //backend request fired
        updateCategory(match.params.categoryId,user._id,token,{name}).then(data=>{
            if(data.error)
            setError(true)
            else
            {
            setError("")
            setSuccess(true)
            setName("")
            }
        }).catch()
    }
    const goBack=()=>(
<div className="mt-5">
<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
</div>
    )

    const successMessage = ()=>{
        if(success)
        {
        return <h4 className="text-success">Category Updated Successfully</h4>
        }
    }

    const warningMessage = ()=>{
        if(error)
        {
        return <h4 className="text-success">Failed to Update category</h4>
        }
    }
    const myCategoryForm =()=>(
        <form>
<div className="form-group">
<p className="lead">Enter the category</p>
<input type="text" className="form-control my-3" autoFocus required placeholder="Enter "
onChange={handleChange} value={name}></input>
<button className="btn btn-outline-info" onClick={onSubmit}>Update Category</button>
</div>
        </form>
    );
    return (
        <Base title="Update a category Here" description="Update Category Here" className="container bg-info p-4">
<div className="row bg-white rounded">
<div className="col-8 offset-md-2">
    {successMessage()}
    {warningMessage()}
    {myCategoryForm()}
    {goBack()}

</div>
</div>
        </Base>
    )
}

export default UpdateCategory