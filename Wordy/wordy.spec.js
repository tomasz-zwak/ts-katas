"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wordy_1 = require("./wordy");
describe("Wordy", function () {
    var wordy;
    beforeEach(function () {
        wordy = new wordy_1.Wordy();
    });
    describe("Performs simple no-op evaluation", function () {
        test("should return given number", function () {
            var sentence = "What is 10?";
            expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(10);
        });
    });
    describe("Performs simple addition", function () {
        test("should return correct addition result", function () {
            var sentence = "What is 10 plus 7?";
            expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(17);
        });
    });
    describe("Performs simple subtraction", function () {
        test("should return correct subtraction result", function () {
            var sentence = "What is 10 minus 2?";
            expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(8);
        });
    });
    describe("Performs simple multiplication", function () {
        test("should return correct multiplication result", function () {
            var sentence = "What is 10 multiplied by 3?";
            expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(30);
        });
    });
    describe("Performs simple division", function () {
        test("should return correct division result", function () {
            var sentence = "What is 10 divided by 5?";
            expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(2);
        });
    });
    describe("Performs multiple operations", function () {
        test("should return correct result", function () {
            var sentence = "What is 2 multiplied by 3 plus 10 divided by 8 minus 2?";
            expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(0);
        });
    });
    describe("Rejects incorrect syntax or unsupported operations", function () {
        test("should return error if syntax is incorrect", function () {
            var sentence = "What is 1 plus plus 2?";
            expect(function () { return wordy.validateShape(sentence).parse().evaluate(); }).toThrowError("Incorrect syntax or unsupported operation \n \" plus plus \" should be a number or a correct operation.");
        });
        test("should return error if sentence shape is incorrect", function () {
            var sentence = "Who is the President of the United States?";
            expect(function () { return wordy.validateShape(sentence).parse().evaluate(); }).toThrowError("Incorrect sentence shape.");
        });
    });
});
