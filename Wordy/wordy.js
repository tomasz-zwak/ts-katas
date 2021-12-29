"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wordy = void 0;
var Operation;
(function (Operation) {
    Operation["start"] = "what is";
    Operation["plus"] = "plus";
    Operation["minus"] = "minus";
    Operation["multiply"] = "multiplied by";
    Operation["divide"] = "divided by";
    Operation["end"] = "?";
})(Operation || (Operation = {}));
var Expect;
(function (Expect) {
    Expect[Expect["Word"] = 0] = "Word";
    Expect[Expect["Number"] = 1] = "Number";
})(Expect || (Expect = {}));
var Wordy = /** @class */ (function () {
    function Wordy() {
    }
    Wordy.prototype.validateShape = function (sentence) {
        var cleanSentence = sentence.toLowerCase().trim();
        if (!this.startsCorrectly(cleanSentence) ||
            !this.isQuestion(cleanSentence) ||
            !this.hasAnyNumbers(cleanSentence)) {
            throw new Error("Incorrect sentence shape.");
        }
        return new WordyValidatedImpl(cleanSentence);
    };
    Wordy.prototype.hasAnyNumbers = function (str) {
        return str.match(/\d/g) !== null;
    };
    Wordy.prototype.startsCorrectly = function (str) {
        return str.startsWith(Operation.start);
    };
    Wordy.prototype.isQuestion = function (str) {
        return str.endsWith("?");
    };
    return Wordy;
}());
exports.Wordy = Wordy;
var WordyValidatedImpl = /** @class */ (function () {
    function WordyValidatedImpl(sentence) {
        this.sentence = sentence;
        this.operations = [];
        this.numbers = [];
        this.expected = Expect.Word;
        this.ops = Object.values(Operation);
    }
    WordyValidatedImpl.prototype.parse = function () {
        var operation;
        do {
            operation = this.extractNext(this.sentence);
            if (operation && this.sentence.indexOf(operation) === 0) {
                if (this.ops.includes(operation.trim())) {
                    this.addOperation(operation);
                }
                else {
                    this.addNumber(operation);
                }
            }
        } while (operation !== Operation.end && operation);
        return new WordyParsedImpl(this.operations, this.numbers);
    };
    WordyValidatedImpl.prototype.extractNext = function (sentence) {
        var _a, _b;
        var match;
        if (this.expected === Expect.Word) {
            match = (_a = this.sentence.match(/[^\d]*/)) === null || _a === void 0 ? void 0 : _a.at(0);
        }
        else {
            match = (_b = this.sentence.match(/[\d]*/)) === null || _b === void 0 ? void 0 : _b.at(0);
        }
        return match;
    };
    WordyValidatedImpl.prototype.addOperation = function (operation) {
        if (operation !== Operation.end) {
            this.operations.push(operation.trim());
        }
        this.sentence = this.sentence.replace(operation, "");
        this.expected = Expect.Number;
    };
    WordyValidatedImpl.prototype.addNumber = function (numberStr) {
        var number = parseInt(numberStr);
        if (!isNaN(number)) {
            this.numbers.push(number);
            this.sentence = this.sentence.replace(numberStr, "");
            this.expected = Expect.Word;
        }
        else {
            throw new Error("Incorrect syntax or unsupported operation \n \"".concat(numberStr, "\" should be a number or a correct operation."));
        }
    };
    return WordyValidatedImpl;
}());
var WordyParsedImpl = /** @class */ (function () {
    function WordyParsedImpl(operations, numbers) {
        this.operations = operations;
        this.numbers = numbers;
        this.result = 0;
    }
    WordyParsedImpl.prototype.evaluate = function () {
        var _this = this;
        this.operations.forEach(function (op, i) {
            if (op === Operation.start)
                _this.result = _this.numbers[i];
            if (op === Operation.plus)
                _this.result += _this.numbers[i];
            if (op === Operation.minus)
                _this.result -= _this.numbers[i];
            if (op === Operation.multiply)
                _this.result *= _this.numbers[i];
            if (op === Operation.divide)
                _this.result /= _this.numbers[i];
        });
        return this.result;
    };
    return WordyParsedImpl;
}());
