## Changes made

-  Split previous Database concept into two: ZhuyinDictionary and LevelMap. This allowed each of them to have a more specific purpose. (details explained in corresponding deign files)
- Removed the DisplayLanguage concept as it was not a major part of the purpose of the app, which is Zhuyin typing practice.
- Updated Quiz concept to manage the speed and accuracy inside itself (previously, I kind of assumed there was some function for me to call to get the speed and accuracy, but there is no way to do that if I don't track these variables in the state of Quiz).

## Interesting Moments
- LLM tends to overdo test cases (lots of overlap in test cases), and overchecks each step of testing (an assert after every single call - very safe, but oftentimes a bit much; I would simply perform a check at the end). I like to use LLM to give me a template for test code and adjust one example test case to my liking, then replug that template back into the LLM and have it generate the remaining test cases like I specified. However, I do find that Chat GPT does a better job of following the template than Context. Context likes to add a lot of test steps (`t.step()`) in the test cases, but I prefer separate test cases.  
[[Prompt]](../../context/design/concepts/Zhyn/QuizTest3.md/steps/prompt.00193d94.md)  
[[Artifact]](../../context/design/concepts/Zhyn/QuizTest3.md/20251016_015447.b8f2719f.md)

- LLM sometimes give good coding structure that I haven't thought of. For example, when it implemented countdown timer as expiryTime. My original idea was to have an internal timer (but I wasn't yet sure how to implement that), but the LLM-generated implmentation used expiry time (= current time + length of time). which makes so much more sense.  
[[Response]](../../context/design/concepts/Zhyn/QuizImplementation2.md/steps/response.bb8c3066.md)  
[[Artifact]](../../context/design/concepts/Zhyn/QuizImplementation2.md/20251015_171730.5c7e3204.md)  
--  
**Original sync:**  
**sync** endQuiz  
*when*  
  &emsp; system.countdown is 0:00  
*then*  
  &emsp; Quiz.endQuiz()  <br>
--  
**New sync after seeing LLM implementation:**  
**sync** endQuiz  
*when*  
  &emsp; system.currentTime == QuizEntry.expiryTime  
*then*  
  &emsp; Quiz.endQuiz() 

- LLM oftentimes adds functions that I did not specify in my concept spec. For example, the artifact below, I asked it to implement my LevelMap, which has no query actions, but Context auto generated 2 query functions in the implementation. This happened a couple times with other implemenations as well.  
[[Response]](../../context/design/concepts/Zhyn/LevelMapImplementation.md/steps/response.6aad8420.md)  
[[Artifact]](../../context/design/concepts/Zhyn/LevelMapImplementation.md/20251016_043747.172ae9fc.md)  

- I am genuinely very surprised at how good and usuable the code the Context generates is. I have been able to copy paste the Context implementation and it runs with no errors. I do make changes to the final version of the code, but the base code outputted does run smoothly. I've used ChatGPT for code generation before and even when generating code in small parts/snippets, GPT's generated code is chock full of different errors. Artifact below is Context implementing ZhuyinDictionary.  
[[Response]](../../context/design/concepts/Zhyn/ZhuyinDictImplementation.md/steps/response.5137e31f.md)  
[[Artifact]](../../context/design/concepts/Zhyn/ZhuyinDictImplementation.md/20251014_220824.81a898d1.md)

- I found it really helpful to use Context for brainstorming and clarifying ideas, especially when I was unsure or confused about the concept spec. Context seems to have a deeper understanding of the spec from the background documents fed into it. For example, the brainstorming response (linked below) pointed out issues in my original specification and explained to me how to revise it. This feedback was helped me refine my spec design.  
[[Response]](../../context/design/brainstorming/quiz-modularity.md/steps/response.a2bbfa55.md)