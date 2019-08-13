
module.exports = function(app, db, objectId){
    app.get('/', function(req, res){
        res.send({msg:'Olá'});
    });

    app.post('/api', function(req, res){
        let data = req.body;
        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
                collection.insert(data, function(err, records){

                    !err ? res.json(records) : res.json(err);
                    
                    mongoclient.close();
                });
            });
        });
    });

    app.get('/api', function(req, res){
    
        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
                collection.find().toArray(function(err, resul){

                    !err ? res.json(resul) : res.json(err);

                    mongoclient.close();
                });
            });
        });
    });

    app.get('/api/:id', function(req, res){

        let params = req.params.id;

        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
                collection.find(objectId(params)).toArray(function(err, resul){

                    !err ? res.json(resul) : res.json(err);

                    mongoclient.close();
                });
            });
        });
    });

    app.put('/api/:id', function(req, res){

        let params = req.params.id;

        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
            
                collection.update(
                    { _id: objectId(params) },
                    { $set:{name: req.body.name}},
                    {},
                    function(err, records){

                        !err ? res.json(records) : res.json(err);

                        mongoclient.close();
                    }
                );
            });
        });
    });

    app.delete('/api/:id', function(req, res){

        let params = req.params.id;

        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
            
                collection.remove(
                    {_id: objectId(params)},
                    function(err, records){

                        !err ? res.json(records) : res.json(err);

                        mongoclient.close();
                    }
                );
            });
        });
    });
    
}