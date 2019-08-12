module.exports = function(app,db){
    app.get('/', function(req, res){
        res.send({msg:'Olá'});
    });

    app.post('/api', function(req, res){
        let data = req.body;
        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
                collection.insert(data, function(err, records){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(records);
                    }
                    mongoclient.close();
                });
            });
        });
    });
}