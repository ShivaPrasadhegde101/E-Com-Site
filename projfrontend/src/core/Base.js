import React from 'react'
import Menu from './menu'


import '../styles.css'

const Base=({title="My Title",
description="My decription",
className="bg-dark text-white p-4",

children})=>
{
   
    return(
        <div>
            <Menu></Menu>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                     <h2 className="display-4">{title}</h2>
                     <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <div className="spacing">
                <h1>&nbsp;</h1>
            </div>
            <footer className="footer bg-dark mt-auto pt-2">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>Contact Us on</h4>
                    <a href="https://www.facebook.com/shivprasadhegde.hegde" className="fa fa-facebook" target="blank"></a>
                    &nbsp;
                    <a href="https://linkedin.com/in/shivaprasad-hegde-83a74a17b" className="fa fa-linkedin" target="blank" ></a>

                </div>
                <div className="container">
                    
                </div>
                
            </footer>
        </div>
    )
}

export default Base