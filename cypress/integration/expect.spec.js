/// <reference types ="cypress"/>


describe('Comparação dados', ()=>{
        it('Comparação dados', ()=>{
            const a = 1;

            expect(a).equal(1);
            expect(a, 'Deveria ser 1').equal(1);
            expect(a).to.be.equal(1);
            expect('a').not.to.be.equal('b');
            a.should('to.be.equal', 1)
        })
})
describe('Verdadeiro ee Falso', ()=>{
        it('Verdadeiro', ()=>{
            const a = true;
            const b = null;
            let c = undefined;

            expect(a).to.be.true;
            expect(true).to.be.true;
            expect(b).to.be.null;
            expect(a).to.be.not.null;
            expect(b).to.be.null;
            expect(c).to.be.undefined;
        })
})

describe('Objetos em JS', ()=>{
        it('Comparação de objetos', ()=>{
            
            const objt ={
                a:1,
                b:2
            }

            expect(objt).to.equal(objt);
            expect(objt).to.equals(objt);
            expect(objt).eql({a:1,b:2})
            expect(objt).to.not.be.empty;
            expect({}).to.be.empty;
        })
    })


describe('Arrays', ()=>{
        it('Comparação de Arrays', ()=>{
            
            const arr =[1,2,3]

            expect(arr).to.have.members([1,2,3])
            expect(arr).to.include.members([1,3])
            expect(arr).to.not.be.empty;
        })
})

describe('Tipos dados', ()=>{
        it('Tipos', ()=>{
            
            const num = 1;
            const str= 'String';

            expect(num).to.be.a('Number');
            expect(str).to.be.a('String');
            expect({}).to.be.a('object');
            expect([]).to.be.a('array');
        })
})

describe('Inteiros e Float', ()=>{
        it('Numeros', ()=>{
            
            const number = 4;
            const floatNumber= 5.552;

            expect(number).to.be.equal(4);
            expect(number).to.be.above(3);
            expect(number).to.be.below(7);
            expect(floatNumber).to.be.equal(5.552);
            //precisão
            expect(floatNumber).to.be.closeTo(5.55 ,0.1);
        })

})