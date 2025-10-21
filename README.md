# Assignment 4b Changes
- Slightly updated functionality of registerCharacter in ZhuyinDictionary
  - succeed when adding duplicate character if the zhuyin matches instead of throwing error
  - if user provides simplified character, auto convert to traditional character
- Added a characterLibrary which is used to populate the ZhuyinDictionary
- Wrote and ran a script to add all characters in library to mongo db database
- Updated LevelMap concept to initialize the llm in constructor
- Updated startQuestion in Quiz to return expiry time

# Assignment 4a

[overall design file](/design/design-files/main.md)

## ZhuyinDictionary Concept
- [spec](/design/concepts/ZhynSpec/ZhuyinDictionary.md)
- [implementation](/src/concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.ts)
- [test cases](/design/testcase/zhuyinDict-testcases.md)
- [test script](/src/concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.test.ts)
- [test output](/src/concepts/ZhuyinDictionary/testExecution.md)
- [design file](/design/design-files/zhuyinDict.md)

## Quiz Concept
- [spec](/design/concepts/ZhynSpec/Quiz.md)
- [implementation](/src/concepts/Quiz/QuizConcept.ts)
- [test cases](/design/testcase/quiz-testcases.md)
- [test script](/src/concepts/Quiz/QuizConcept.test.ts)
- [test output](/src/concepts/Quiz/testExecution.md)
- [design file](/design/design-files/quiz.md)

## LevelMap Concept
- [spec](/design/concepts/ZhynSpec/LevelMap.md)
- [implementation](/src/concepts/LevelMap/LevelMapConcept.ts)
- [test cases](/design/testcase/levelMap-testcases.md)
- [test script](/src/concepts/LevelMap/LevelMapConcept.test.ts)
- [test output](/src/concepts/LevelMap/testExecution.md)
- [design file](/design/design-files/levelMap.md)
