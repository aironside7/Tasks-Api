const express =require("express")
const app=express()
const taskArry= require("./src/data")
const bodyParser=require("body-parser")
const port = 8000
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

let newId= taskArry.length+1

app.get("/v1/tasks",(req,res)=>{
    try{
       res.json({
        taskArry
       })
    }catch(e){
         res.status(400).json({
            status:"failed"
         })
    }
})
app.get("/v1/tasks/:id",(req,res)=>{
    try{
      const idx = taskArry.findIndex((obj)=>obj.id==req.params.id)
      if(idx==-1){
        return res.status(400).json({
            status:"falied"
        })
      }
      res.json({
        task:taskArry[idx]
      })
    }catch{
        res.status(400).json({
            status:e
        })
    }
})

app.post("/v1/tasks", (req,res)=>{
    try{
        if(!req.body.title || !req.body.is_completed){
            return res.status(400).json({
                status:"error"
            })
        }
        taskArry.push({
            id:newId,
            title:req.body.title,
            is_completed:req.body.is_completed
        })
        newId++
        res.json({
            
            id:newId
        })
    }catch(e){
        res.status(400).json({
            status:e
        })
    }
})
app.put("/v1/tasks/:id",(req,res)=>{
    try{
        const idx = taskArry.findIndex((obj)=>obj.id==req.params.id)
        if(idx==-1){
          return res.status(400).json({
              status:"falied"
          })
        }
         if(req.body.title) taskArry[idx].title=req.body.title
         if(req.body.is_completed) taskArry[idx].is_completed=req.body.is_completed


        res.json({
          
          task:taskArry[idx]
        })
      }catch{
          res.status(400).json({
              status:e
          })
      }
})

app.delete("/v1/tasks/:id",(req,res)=>{
    try{
        const idx = taskArry.findIndex((obj)=>obj.id==req.params.id)
        if(idx==-1){
          return res.status(400).json({
              status:"falied"
          })
        }
          taskArry.splice(idx,1);
          res.json({
            status:"deleted",
            
          })
      }catch(e){
          res.status(400).json({
              status:e
          })
      }
})

app.post("/v1/tasks",(req,res)=>{
    try{
        
        taskArry.concat(task)({
            id:newId,
            title:req.body.title,
            is_completed:req.body.is_completed
        })
        newId++
        res.json({
            status:"success",
            id:newId
        })
    }catch(e){
        res.status(400).json({
            status:e
        })
    }
})
app.delete("/v1/tasks",(req,res)=>{
    try{
        
       
        let taskArry2=[]
          taskArry=taskArry2;
          res.json({
            status:"deleted",
            
          })
      }catch(deleted){
          res.status(400).json({
              status:deleted
          })
      }
})

app.listen(port,()=>{
    console.log(`server is up on ${port}`)
})