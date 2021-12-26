const express=require('express')
const app=express()

const db=require('./db')
const Todo=require('./todo')
//console.log(Todo);

app.use(express.json())


app.get('/',(req,res)=>{
    res.json('GET / is Working')
})

app.get('/tasks',(req,res)=>{
    Todo.find({},(err,data)=>{
        if (err) {
            console.log('ERROR:',err);
        } else {
            res.json(data);
        }
    });
});

app.post('/tasks',(req,res)=>{
    console.log('25:',req.body)

    Todo.create(req.body ,(err,newTask)=>{
        if (err) {
            console.log('ERROR:',err);
        } else {
            res.status(201).json(newTask);
        }
    });
});

app.delete('/tasks/:id',(req,res)=>{
    console.log('37:',req.params.id)

    Todo.deleteOne({_id: req.params.id} ,(err,deleteObj)=>{
        if (err) {
            console.log('ERROR:',err);
        } else {
            deleteObj.deleteedCount === 1
            res.json('Delete this todo successfully');
            res.status(404).json('This todo is not found');
            //console.log(deleteObj);

        }
    });
});

app.put('/tasks/:id',(req,res)=>{
    //console.log('37:',req.params.id)

    Todo.updateOne(
        {_id: req.params.id},
        {title: req.body.newtitle},
        (err,updateObj) =>{
        if (err) {
            console.log('ERROR:',err);
            res.status(400).json(err)
        } else {
            console.log(updateObj);

            updateObj.modifiedcount === 1
            res.json('Delete this todo successfully');
            res.status(404).json('This todo is not found');
            

        }
    });
});


/*app.get('/completed',(req,res)=>{
    Todo.find({ isCompleted:true },(err,data)=>{
        if (err) {
            console.log('ERROR:',err);
        } else {
            res.json(data);
            console.log(data);
        }
    });
}); */

/*app.get('/not_completed',(req,res)=>{
    Todo.find({ isCompleted:false },(err,data)=>{
        if (err) {
            console.log('ERROR:',err);
        } else {
            res.json(data);
            console.log(data);
        }
    });
}); */

//...........?key=value&key=value
app.get('/filter',(req,res)=>{
        console.log(req.query);
    Todo.find({ isCompleted: req.query.isCompleted },(err,data)=>{
        if (err) {
            console.log('ERROR:',err);
        } else {
            res.json(data);
        }
    });
});


app.listen(5000,()=>{
    console.log('SERVER IS WORKING...');
})