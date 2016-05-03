var LinkedList = require('linkedlist');

var smaGenerator = function* (period){
    var list = new LinkedList()
    var sum = 0;
    var counter = 1;
    var current = yield;
    list.push(0);
    while(true){
        if(counter < period){
            counter ++;
            list.push(current);   
            sum = sum + current;
            current = yield;
        }
        else{
         sum = sum - list.shift() + current;
         let result = ((sum) / period);
         current = yield result
         list.push(current);
        }
    }
}

module.exports = function(data, period, options) {
    var output = [];
    var ma = smaGenerator(10);
    ma.next();
    data.forEach(function(price) {
       var result = ma.next(price) 
       if(result.value){
           output.push(result.value);
       }
    });
    
    if(options.generator){
        return {
            result : output,
            generator : ma
        }    
    }else {
        return output;
    }
}
