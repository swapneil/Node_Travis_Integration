var assert = require('chai').assert;
var superagent = require('superagent');
var randomstring = require("randomstring");
var server = require('./server');

describe('server',function() {
    var instance;   
    beforeEach(function( done ) {
        instance = server.listen(4000, function(err) {
            done(err);
        })
    });
   
 
    afterEach(function( done ) {
        instance.close
(function(err) {
            done(err);
        });
    }
);
    
    
    it('should return Hello World at /', function( done ) { 
        superagent.get('http://localhost:4000/').end(function(err, res) {
            if (err) { 
    return done(err); 
}
        try{            
            
assert.equal(res.status, 200);
            assert.equal(res.text, '<h1>Hello World!</h1>');
            done();
  
      } catch (error){
            error.message = "INFO:Path / is not working!";
        }
        });
        

    });


    it('should return Hello <random> at /<random>', function( done ) {
        var random = randomstring.generate();
        superagent.get('http://localhost:4000/' + random).end(function(err, res) {

           if (err) { return done(err); }
           
            try {
  
              assert.equal(res.status, 200);
            
    assert.equal(res.text, 'Hello ' + random);
          
  } catch (error) {
                error.message = "INFO: Path /:name is not working!";
                return done(error);
            }
            done();
        });


    });


    it('should not execute alert()', function(done ) {
        var random = randomstring.generate();
 
       var string = '<svg/onload=alert("' + random + '");';
        superagent.get('http://localhost:4000/' + encodeURIComponent(string)).end(function(err, res) {
    if (err) { return done(err); }
            try {
   
             assert.equal(res.status, 200);
             
   assert.notEqual(res.text, 'Hello ' + string);
        
    } 
    catch (error) {
                error.message = "INFO: Path /:name is vulnerable to XSS!";
                return done(error);
            }
            done();
    
    });

    });


});

