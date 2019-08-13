const { check, validationResult } = require('express-validator');

module.exports = function(app, db, objectId){
    app.get('/', function(req, res){
        res.send('api');
    });

    app.post('/api', [
        check('name').not().isEmpty().withMessage('name is not null'),
        check('image').not().isEmpty().withMessage('image is not null'),

    ],function(req, res){

        let errors = validationResult(req);
        let arr = errors.array();
        if(!errors.isEmpty()){
            res.status(400).json({error: arr[0].msg});
            return false;
        }

        let data = req.body;
        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
                collection.insert(data, function(err, records){

                    !err ? res.status(200).json(records) : res.status(500).json(err);
                    
                    mongoclient.close();
                });
            });
        });
    });

    app.get('/api', function(req, res){
    
        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
                collection.find().toArray(function(err, resul){


                    !err ? res.status(200).json(resul) : res.status(500).json(err);

                    mongoclient.close();
                });
            });
        });
    });

    app.get('/api/:id', function(req, res){

        let params = req.params.id;
        
        if(params.length != 24){
            res.json({error: '24 hex characters'});
            return false;
        }

        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
                collection.find({ _id :objectId(params)}).toArray(function(err, resul){
                    
                    !err ? res.status(200).json(resul) : res.status(500).json(err);

                    mongoclient.close();
                });
            });
        });
    });

    app.put('/api/:id', function(req, res){

        let params = req.params.id;

        if(params.length != 24){
            res.json({error: '24 hex characters'});
            return false;
        }

        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
            
                collection.update(
                    { _id: objectId(params) },
                    { $set:{name: req.body.name}},
                    {},
                    function(err, records){

                        !err ? res.status(200).json(records) : res.status(500).json(err);

                        mongoclient.close();
                    }
                );
            });
        });
    });

    app.delete('/api/:id', function(req, res){

        let params = req.params.id;

        if(params.length != 24){
            res.json({error: '24 hex characters'});
            return false;
        }
        
        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
            
                collection.remove(
                    {_id: objectId(params)},
                    function(err, records){

                        !err ? res.status(200).json(records) : res.status(400).json(err);

                        mongoclient.close();
                    }
                );
            });
        });
    });
    
}