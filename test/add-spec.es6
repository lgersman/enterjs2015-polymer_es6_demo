import add from '../src/hello-testing/add.es6';

describe('hello-testing', ()=>{
  describe('add', ()=>{
    it('should work', ()=>{
      expect(add(2, 3)).toEqual(5);
    });

    it('1st param must be a number', ()=>{
      expect(add(2, 3)).toEqual(5);

      expect(add(2.5, 3)).toEqual(5.5);

      expect(()=>add('huhu', 3)).toThrow();
    });

    it('2nd param must be a number', ()=>{
      expect(add(2, 3.5)).toEqual(5.5);

      expect(()=>add(3, 'huhu')).toThrow();
    });

    it('2nd param cannot be zero', ()=>{
      expect(()=>add(3, 0))/*.not*/.toThrow();
    });

    it('(senseless but educational) delayed computation', done=>{
      setTimeout(
        ()=>{
          expect(()=>add(3, 0)).toThrow();
          done();
        },
        1000
      );
    });
  });
});
