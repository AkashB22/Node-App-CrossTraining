let  express = require('express');
let  router = express.Router();
let  tourOfSeries = require('./../models/tourOfSeries');

router.get('/',function(req,res){
    let  givenData = typeof(req.query.name) == 'string' && req.query.name.length > 0 ? req.query.name : '';
    if(givenData){
        tourOfSeries.getForSearch(givenData, function(err, data){
            if(err) throw err;
            res.json(data);
        });
    } else{
        tourOfSeries.getAllData(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    }
});

router.post('/',function(req,res){
    let  data = req.body;
    let  modelData = new tourOfSeries({
        id : data.id,
        name : data.name
    })
    tourOfSeries.createSeries(modelData, function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

router.delete('/:id', function(req,res){
    let  seriesId = req.params.id;
    console.log(seriesId);
    let  modelData = new tourOfSeries({
        id : seriesId
    });
    tourOfSeries.deleteSerie(modelData, function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

router.get('/:id', function(req,res){
    let  seriesId = req.params.id;
    let  modelData = new tourOfSeries({
        id : seriesId
    });
    tourOfSeries.getASerie(modelData, function(err, data){
        if(err) throw err;
        res.json(data);
    })
});

router.put('/', function(req,res){
    let  series = req.body;
    series.date = new Date;
    tourOfSeries.updateASerie(series, function(err,data){
        if(err) throw err;
        res.json(data);
    });
});
module.exports =router;