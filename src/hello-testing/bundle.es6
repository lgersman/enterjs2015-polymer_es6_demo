import add from './add.es6';

Polymer({
  is : 'hello-testing',
  
  properties : {
    value : {
      type               : Number,
      value              : 0,
      reflectToAttribute : true
    },
    result : {
      type               : Number,
      value              : 0,
      reflectToAttribute : true
    },
    disabled : {
      type               : Boolean,
      value              : false
    }
  },

  listeners: {
    input : 'onInput'
  },
  
  onInput() {
    this.disabled = !!this.$.valueInput.validationMessage;
  },

  onAdd(event) {
    try {
      this.result = add(this.result, parseInt(this.value, 10));
    } catch(error) {  
      console.warn(`failed to add(${this.result}, ${this.value}) : ` + error.message);
    }
  }
});

