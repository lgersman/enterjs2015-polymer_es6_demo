Polymer({
  is : 'hello-events',
  
  properties : {
    count : {
      type               : Number,
      value              : 10/*,
      reflectToAttribute : true*/
    },
    text : {
      computed : 'getText(count)'
    }
  },
  
  listeners: {
    tap         : 'onTap',
    'reset.tap' : 'onReset'
  },
  
    // just for demo purposes : called by fallback content button
  onInc() {
    this.count++;
  },
  
  onTap(event) {
    (event.target.id === 'inc') && this.onInc(); 
    console.log(`tap event occurred somewhere. tap count = ${this.count}`);
  },
  
  onReset() {
    this.count = 0;
  },
   
  getText(count) {
    return `was clicked ${this.count} time${this.count !== 1 ? 's' : ''}.`;
  }
});

