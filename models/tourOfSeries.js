var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var seriesSchema = new Schema({
    id : Number,
    name : String,
    date : { type :Date, default : Date.now}
});
var ToursOfSeries = module.exports = mongoose.model('tourOfSeries', seriesSchema);

module.exports.getAllData = function(callback){
    ToursOfSeries.find(callback).sort({'id' :'ascending'});
}

module.exports.createSeries = function(jsonData, callback){
    ToursOfSeries.create(jsonData, callback);
}

module.exports.deleteSerie = function(jsonData, callback){
    ToursOfSeries.deleteOne({id : jsonData.id}, callback);
}

module.exports.getASerie = function(jsonData, callback){
    ToursOfSeries.findOne({id : jsonData.id}, callback);
}

module.exports.updateASerie = function(jsonData, callback){
    ToursOfSeries.findOneAndUpdate({'id' : jsonData.id}, jsonData, callback);
}

module.exports.getForSearch = function(data, callback){
    console.log(data);
    ToursOfSeries.find({name : new RegExp(data, 'i')}, callback);
}   