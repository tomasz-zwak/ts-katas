enum Operation {
  start = "what is",
  plus = "plus",
  minus = "minus",
  multiply = "multiplied by",
  divide = "divided by",
  end = "?",
}

enum Expect {
  Word,
  Number,
}

interface WordyBuilder {
  /**
   * Validates the shape of a sentence
   * @param sentence sentence which shape should be validated
   */
  validateShape(sentence: string): WordyValidated;
}

interface WordyValidated {
  /**
   * Parse evaluated sentence and extract operations.
   */
  parse(): WordyParsed;
}

interface WordyParsed {
  /**
   * Evaluate all operations and return a number
   */
  evaluate(): number;
}

export class Wordy implements WordyBuilder {
  validateShape(sentence: string): WordyValidated {
    const cleanSentence = sentence.toLowerCase().trim();
    if (
      !this.startsCorrectly(cleanSentence) ||
      !this.isQuestion(cleanSentence) ||
      !this.hasAnyNumbers(cleanSentence)
    ) {
      throw new Error("Incorrect sentence shape.");
    }
    return new WordyValidatedImpl(cleanSentence);
  }

  private hasAnyNumbers(str: string): boolean {
    return str.match(/\d/g) !== null;
  }

  private startsCorrectly(str: string): boolean {
    return str.startsWith(Operation.start);
  }

  private isQuestion(str: string): boolean {
    return str.endsWith("?");
  }
}

class WordyValidatedImpl implements WordyValidated {
  private operations: string[] = [];
  private numbers: number[] = [];
  private expected: Expect = Expect.Word;
  private ops: string[] = Object.values(Operation);

  constructor(private sentence: string) {}

  parse(): WordyParsed {
    let operation: string | undefined;
    do {
      operation = this.extractNext(this.sentence);
      if (operation && this.sentence.indexOf(operation) === 0) {
        if (this.ops.includes(operation.trim())) {
          this.addOperation(operation);
        } else {
          this.addNumber(operation);
        }
      }
    } while (operation !== Operation.end && operation);
    return new WordyParsedImpl(this.operations, this.numbers);
  }

  private extractNext(sentence: string): string | undefined {
    let match: string | undefined;
    if (this.expected === Expect.Word) {
      match = this.sentence.match(/[^\d]*/)?.at(0);
    } else {
      match = this.sentence.match(/[\d]*/)?.at(0);
    }
    return match;
  }

  private addOperation(operation: string): void {
    if (operation !== Operation.end) {
      this.operations.push(operation.trim());
    }
    this.sentence = this.sentence.replace(operation, "");
    this.expected = Expect.Number;
  }

  private addNumber(numberStr: string): void {
    let number = parseInt(numberStr);
    if (!isNaN(number)) {
      this.numbers.push(number);
      this.sentence = this.sentence.replace(numberStr, "");
      this.expected = Expect.Word;
    } else {
      throw new Error(
        `Incorrect syntax or unsupported operation \n "${numberStr}" should be a number or a correct operation.`
      );
    }
  }
}

class WordyParsedImpl implements WordyParsed {
  private result: number = 0;

  constructor(
    private readonly operations: string[],
    private readonly numbers: number[]
  ) {}

  evaluate(): any {
    this.operations.forEach((op, i) => {
      if (op === Operation.start) this.result = this.numbers[i];
      if (op === Operation.plus) this.result += this.numbers[i];
      if (op === Operation.minus) this.result -= this.numbers[i];
      if (op === Operation.multiply) this.result *= this.numbers[i];
      if (op === Operation.divide) this.result /= this.numbers[i];
    });

    return this.result;
  }
}
