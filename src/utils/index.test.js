import { getFormattedNumber, percentageGrowthRate } from "./index.js"

describe("Test getFormattedNumber(number)", () => {
    const func = getFormattedNumber;
    
    it(`0 -> '0'`, () => {
        expect(func(0)).to.equal('0');
    })
    it(`111111 -> '111,111'`, () => {
        expect(func(111111)).to.equal('111,111');
    })
    it(`'' -> ''`, () => {
        expect(func('')).to.equal('0');
    })
    it(`'asdfs' -> ''`, () => {
        expect(func('')).to.equal('0');
    })
    it(`null -> ''`, () => {
        // revisit this
        expect(func(null)).to.equal('');
    })
});


describe("Test percentageGrowthRate(prevAmount, currAmount)", () => {
    const func = percentageGrowthRate;
    
    it(`100, 110 -> 10`, () => {
        expect(func(100, 110)).to.equal(10);
    })
    it(`100, 100 -> 10`, () => {
        expect(func(100, 100)).to.equal(0);
    })
});