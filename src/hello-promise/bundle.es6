Polymer({
  is : 'hello-promise',
  
  properties : {
    url : {
      typ : String,
      observer : '_urlChanged'
    },
    persons : {
      type : Array
    },
    error : {
      type : String
    },
    ascending : {
      type  : Boolean,
      value : true,
      observer : '_orderChanged'
    }
  },  
  
  _mkHref(email) {
    return `mailto:${email}`; 
  },
  
  _orderChanged() {
    console.log(`ascending changed : ${this.ascending}`);
    if (this.persons) {
      this.persons.sort((l, r)=>
        (this.ascending ? l : r).name.localeCompare((this.ascending ? r : l).name)
      );
        // force array changed detection 
      this.persons = Array.from(this.persons);
      
      console.log(`sorted persons=${JSON.stringify(this.persons, null, '  ')}`);  
    }    
  },
    
  _urlChanged(url) {
      // reset error and persons
    this.error = this.persons = null;
    
      // start loading data
    this.promise = fetch(url)
      // wait 2 seconds
    .then(res=>
      new Promise(
        (resolve, reject)=>setTimeout(
          ()=>resolve(res), 
          2000
        )
      )
    )
      // figure out error or data received 
    .then(res=>{
      this.promise = null;
      if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res.json());
      } else {
        return Promise.reject(res.statusText);
      }
    })
      // process error/data
    .then(
      persons=>{
        this.persons = persons;
        console.log(`persons=${JSON.stringify(this.persons, null, '  ')}`);
        this._orderChanged();
      },
      error=>this.error = `Failed to load data from '${url}' : ${error}` 
    );
  }
});

