import { Wordy } from "./wordy";

describe("Wordy", () => {
  let wordy: Wordy;
  beforeEach(() => {
    wordy = new Wordy();
  });
  describe("Performs simple no-op evaluation", () => {
    test("should return given number", () => {
      const sentence = "What is 10?";
      expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(10);
    });
  });
  describe("Performs simple addition", () => {
    test("should return correct addition result", () => {
      const sentence = "What is 10 plus 7?";
      expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(17);
    });
  });
  describe("Performs simple subtraction", () => {
    test("should return correct subtraction result", () => {
      const sentence = "What is 10 minus 2?";
      expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(8);
    });
  });
  describe("Performs simple multiplication", () => {
    test("should return correct multiplication result", () => {
      const sentence = "What is 10 multiplied by 3?";
      expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(30);
    });
  });
  describe("Performs simple division", () => {
    test("should return correct division result", () => {
      const sentence = "What is 10 divided by 5?";
      expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(2);
    });
  });
  describe("Performs multiple operations", () => {
    test("should return correct result", () => {
      const sentence =
        "What is 2 multiplied by 3 plus 10 divided by 8 minus 2?";
      expect(wordy.validateShape(sentence).parse().evaluate()).toEqual(0);
    });
  });
  describe("Rejects incorrect syntax or unsupported operations", () => {
    test("should return error if syntax is incorrect", () => {
      const sentence = "What is 1 plus plus 2?";
      expect( () => wordy.validateShape(sentence).parse().evaluate()).toThrowError(`Incorrect syntax or unsupported operation \n " plus plus " should be a number or a correct operation.`);
    });
    test("should return error if sentence shape is incorrect", () => {
      const sentence = "Who is the President of the United States?";
      expect( () => wordy.validateShape(sentence).parse().evaluate()).toThrowError("Incorrect sentence shape.");
    });
  });
});
