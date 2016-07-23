var expect = require("chai").expect;
var Events = require("../Events.js");

describe("Get Events From Yelp API",function(){
     it("Gets the business name",function(){
          var ev = new Events("5","100","Miami","art");
          var getMiami = ev.getApiEvents(name => expect(name).to.be.a('string'));


          //expect(getMiami)
     })
})
