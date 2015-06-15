Polymer({
  is : 'dynamic-hello',
  
  properties : {
    who : {
      value              : 'world',
      reflectToAttribute : true
    },
    text : {
        // remark : its a good idea to iterate all properties infecting the computed value  
      computed : 'getText(who)'
    }
  },
  
  getText(/*not used, we have this available*/ who) {
      // can be multiline
    return `dynamic hello ${this.who}`;
  }
});
