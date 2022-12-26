const { validationResult } = require('express-validator');

// get /
exports.inicio_get = (req, res) => {
    try{
        const title = 'Start';
        res.render("index.ejs", { title });
    } catch (err) { console.log( err )}
    
}
// recieve message from human
// post /
exports.inicio_post = (req, res) => {
    try{
        const title = "Start";
        //validate data
        const errors = validationResult(req);
        //output errors
        if(!errors.isEmpty()) {
            const alert = errors.array();
            res.render('index', { title, alert });
        }
        else{
            res.render('index', { title } );
        }

    }catch(err){ console.log(err)}
    
}