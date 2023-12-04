const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()



const varifyAdmin = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json('Token is missing')
    }else{
        jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=>{
            if(err){
                return res.json('Error with Token')
            }else{
                if(decoded.role === 'admin'){
                    next()
                }else{
                    return res.json('not admin')
                }
            }
        })
    }
}

const varifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json('Token is missing')
    }else{
        jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=>{
            if(err){
                return res.json('Error with Token')
            }else{
                if(decoded.role === 'user'){
                    next()
                }else{
                    return res.json('not admin')
                }
            }
        })
    }
}

module.exports = varifyAdmin, varifyUser