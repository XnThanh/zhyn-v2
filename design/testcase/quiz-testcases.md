**principle**
1. system makes new quiz with 1 second timer (for testing feasibility)  
2. system register 3 questions  
3. user correctly answers question 1  
4. user incorrectly answers question 2  
5. timer runs out before user finishes question 3, system gets speed and accuracy of quiz  

**registerQuestion**  
add new question  
add new question with duplicate character (ok)  

**startQuestion**  
start question with valid question id [tested in principle]  
start question that already started  
start question with invalid question id  

**submitAnswer**  
submit correct answer [tested in principle]  
submit incorrect answer [tested in principle]  
submit with invalid question id  
submit question that has not started  
