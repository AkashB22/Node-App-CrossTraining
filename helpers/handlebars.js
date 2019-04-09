module.exports = {
    customifAccept : function(events, opts, options){
        for(var i in opts){
        if(events == opts[i]){
           return options.fn(this);
        }
        else{
            return options.inverse(this);
        }
    }
},
    customifDecline : function(events, opts, options){
    for(var i in opts){
    if(events == opts[i]){
       return options.fn(this);
    }
    else{
        return options.inverse(this);
    }
}
},
customifCreator : function(username, creator, options){
    if(username == creator){
       return options.fn(this);
    }
    else{
        return options.inverse(this);
    }
},
customifAnsweredUser : function(username, answeredUser, options){
   
    if(answeredUser == null){
        return options.inverse(this);
    }
    for(var i in answeredUser){
    if(username == answeredUser[i]){
       return options.fn(this);
    }
}
        return options.inverse(this);
},
customifEventCreator : function(username, status, options){
   
    if(status == null){
        return options.inverse(this);
    }
    for(var i in status){
    if(username == status[i]){
       return options.fn(this);
    }
    else{
        return options.inverse(this);
    }
}
}
};