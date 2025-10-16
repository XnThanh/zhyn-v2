deno test --allow-read --allow-sys --allow-net --allow-env .\src\concepts\ZhuyinDictionary\ZhuyinDictionaryConcept.test.ts
Check file:///C:/Users/Thanh/dev/6.1040/zhyn-v2/src/concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.test.ts  
running 5 tests from ./src/concepts/ZhuyinDictionary/ZhuyinDictionaryConcept.test.ts  
Principle: Register several characters, lookup a character, lookup a wrong Zhuyin, lookup a partial zhuyin ...  
------- output -------  
REGISTERED 我 --> ㄨㄛˇ  
REGISTERED 是 --> ㄕˋ  
REGISTERED 文 --> ㄨㄣˊ  
RETRIEVING 我...  
RETRIEVED ㄨㄛˇ for 我  
LOOKUP ㄨㄛˊ FOUND []  
LOOKUP ㄨㄛ FOUND [我]  
----- output end -----  
Principle: Register several characters, lookup a character, lookup a wrong Zhuyin, lookup a partial zhuyin ... ok (743ms)  
register: add new and duplicate characters ...  
------- output -------  
REGISTERED 爸 --> ㄅㄚˋ  
----- output end -----  
register: add new and duplicate characters ... ok (552ms)  
unregister – existing and non-existing character ...  
------- output -------   
REGISTERED 好 --> ㄏㄠˇ  
UNREGISTERED 好  
----- output end -----  
unregister – existing and non-existing character ... ok (586ms)  
getAnswer – existing and non-existent character ...  
------- output -------  
REGISTERED 你 --> ㄋㄧˇ  
RETRIEVING 你...  
RETRIEVED ㄋㄧˇ for 你  
RETRIEVING 她...  
----- output end -----  
getAnswer – existing and non-existent character ... ok (519ms)  
lookupZhuyin – full, partial, and no match ...  
------- output -------  
REGISTERED 媽 --> ㄇㄚ  
REGISTERED 馬 --> ㄇㄚˇ  
REGISTERED 罵 --> ㄇㄚˋ  
LOOKUP ㄇㄚˇ FOUND [馬]  
LOOKUP ㄇㄚ FOUND [媽,馬,罵]  
LOOKUP ㄇㄚˊ FOUND []  
----- output end -----  
lookupZhuyin – full, partial, and no match ... ok (697ms)  

ok | 5 passed | 0 failed (3s)  