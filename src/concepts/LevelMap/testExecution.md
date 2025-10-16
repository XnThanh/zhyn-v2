deno test .\src\concepts\LevelMap\LevelMapConcept.test.ts --allow-read --allow-sys --allow-net --allow-env  
Check file:///C:/Users/Thanh/dev/6.1040/zhyn-v2/src/concepts/LevelMap/LevelMapConcept.test.ts  
running 5 tests from ./src/concepts/LevelMap/LevelMapConcept.test.ts  
Principle: add/remove characters and generate sentence sequence ...  
------- output -------  
🤖 Requesting sentence generation from Gemini AI (Attempt 1)...  
✅ Received response from Gemini AI!  

🤖 RAW GEMINI RESPONSE  
======================
{
  "sentences": [
    {
      "sentence": "她愛我。"
    },
    {
      "sentence": "他愛我。"
    },
    {
      "sentence": "我們愛她。"
    },
    {
      "sentence": "我們愛他。"
    },
    {
      "sentence": "她愛他。"
    },
    {
      "sentence": "他愛她。"
    },
    {
      "sentence": "我愛她。"
    },
    {
      "sentence": "我愛他。"
    },
    {
      "sentence": "她好愛我。"
    },
    {
      "sentence": "他好愛我。"
    },
    {
      "sentence": "我們好愛她。"
    },
    {
      "sentence": "我們好愛他。"
    },
    {
      "sentence": "她好愛他。"
    },
    {
      "sentence": "他好愛她。"
    },
    {
      "sentence": "我好愛她。"
    }
  ]
}
======================

[
  "她愛我。",     "他愛我。",
  "我們愛她。",   "我們愛他。",
  "她愛他。",     "他愛她。",
  "我愛她。",     "我愛他。",
  "她好愛我。",   "他好愛我。",
  "我們好愛她。", "我們好愛他。",
  "她好愛他。",   "他好愛她。",
  "我好愛她。"
]
Generated 15 sentences (requested 15). Took 1 attempts  
----- output end -----  
Principle: add/remove characters and generate sentence sequence ... ok (2s)  
LevelMap: generateSentence fails on empty level ... ok (563ms)  
LevelMap: generateSentence works with one character ...  
------- output -------  
🤖 Requesting sentence generation from Gemini AI (Attempt 1)...  
✅ Received response from Gemini AI!  

🤖 RAW GEMINI RESPONSE  
======================
{
  "sentences": [
    {
      "sentence": "爸"
    },
    {
      "sentence": "爸爸"
    },
    {
      "sentence": "爸爸爸"
    },
    {
      "sentence": "爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸爸爸爸爸爸爸爸"
    },
    {
      "sentence": "爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸"
    }
  ]
}
======================

[
  "爸",
  "爸爸",
  "爸爸爸",
  "爸爸爸爸",
  "爸爸爸爸爸",
  "爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸爸爸爸爸爸爸爸",
  "爸爸爸爸爸爸爸爸爸爸爸爸爸爸爸"
]
Generated 15 sentences (requested 15). Took 1 attempts  
----- output end -----  
LevelMap: generateSentence works with one character ... ok (2s)  
LevelMap: generateSentence works with multiple characters ...  
------- output -------  
🤖 Requesting sentence generation from Gemini AI (Attempt 1)...  
✅ Received response from Gemini AI!  

🤖 RAW GEMINI RESPONSE  
======================
{
  "sentences": [
    {
      "sentence": "我愛爸媽。"
    },
    {
      "sentence": "爸媽愛我。"
    },
    {
      "sentence": "家愛爸媽。"
    },
    {
      "sentence": "家愛我。"
    },
    {
      "sentence": "我愛家。"
    },
    {
      "sentence": "爸愛我。"
    },
    {
      "sentence": "媽愛我。"
    },
    {
      "sentence": "我愛爸。"
    },
    {
      "sentence": "我愛媽。"
    },
    {
      "sentence": "爸愛家。"
    },
    {
      "sentence": "媽愛家。"
    },
    {
      "sentence": "我愛爸，我愛媽。"
    },
    {
      "sentence": "爸愛我，媽愛我。"
    },
    {
      "sentence": "我愛爸媽，我愛家。"
    },
    {
      "sentence": "爸媽愛我，我愛家。"
    }
  ]
}
======================

[
  "我愛爸媽。",         "爸媽愛我。",
  "家愛爸媽。",         "家愛我。",
  "我愛家。",           "爸愛我。",
  "媽愛我。",           "我愛爸。",
  "我愛媽。",           "爸愛家。",
  "媽愛家。",           "我愛爸，我愛媽。",
  "爸愛我，媽愛我。",   "我愛爸媽，我愛家。",
  "爸媽愛我，我愛家。"
]
Generated 15 sentences (requested 15). Took 1 attempts  
----- output end -----  
LevelMap: generateSentence works with multiple characters ... ok (2s)  
LevelMap: generateSentence works with many characters ...  
------- output -------  
🤖 Requesting sentence generation from Gemini AI (Attempt 1)...  
✅ Received response from Gemini AI!  

🤖 RAW GEMINI RESPONSE  
======================
{
  "sentences": [
    {
      "sentence": "我們去飯館吃飯。"
    },
    {
      "sentence": "這飯館很好吃。"
    },
    {
      "sentence": "你愛吃什麼飯？"
    },
    {
      "sentence": "我愛吃米飯和菜。"
    },
    {
      "sentence": "飯館裡有很多人。"
    },
    {
      "sentence": "我們在飯館看書。"
    },
    {
      "sentence": "你跟誰去飯館？"
    },
    {
      "sentence": "我跟朋友去飯館。"
    },
    {
      "sentence": "飯館的飯很好吃。"
    },
    {
      "sentence": "你今天要去飯館嗎？"
    },
    {
      "sentence": "我明天要去飯館。"
    },
    {
      "sentence": "飯館裡有什麼菜？"
    },
    {
      "sentence": "飯館裡有肉和魚。"
    },
    {
      "sentence": "這個飯館很不錯。"
    },
    {
      "sentence": "我們在飯館坐著。"
    }
  ]
}
======================

⚠️ "我愛吃米飯和菜。" contains characters not in level "Beginner" and was removed.  
⚠️ "你跟誰去飯館？" contains characters not in level "Beginner" and was removed.  
⚠️ "飯館裡有肉和魚。" contains characters not in level "Beginner" and was removed.  
⚠️ "這個飯館很不錯。" contains characters not in level "Beginner" and was removed.  
⚠️ "我們在飯館坐著。" contains characters not in level "Beginner" and was removed.  
[
  "我們去飯館吃飯。",
  "這飯館很好吃。",
  "你愛吃什麼飯？",
  "飯館裡有很多人。",
  "我們在飯館看書。",
  "我跟朋友去飯館。",
  "飯館的飯很好吃。",
  "你今天要去飯館嗎？",
  "我明天要去飯館。",
  "飯館裡有什麼菜？"
]
🤖 Requesting sentence generation from Gemini AI (Attempt 2)...  
✅ Received response from Gemini AI!  

🤖 RAW GEMINI RESPONSE  
======================
{
  "sentences": [
    {
      "sentence": "這家飯館的菜很好吃。"
    },
    {
      "sentence": "你喜歡吃什麼菜？"
    },
    {
      "sentence": "我們明天去飯館。"
    },
    {
      "sentence": "飯館裡有魚和肉。"
    },
    {
      "sentence": "我跟朋友去飯館。"
    },
    {
      "sentence": "這飯館的飯很好吃。"
    },
    {
      "sentence": "你今天要去飯館嗎？"
    },
    {
      "sentence": "我明天要去飯館。"
    },
    {
      "sentence": "飯館裡有什麼菜？"
    },
    {
      "sentence": "這飯館的菜很多。"
    },
    {
      "sentence": "你愛吃米飯嗎？"
    },
    {
      "sentence": "我們在飯館看書。"
    },
    {
      "sentence": "這飯館的飯很好。"
    },
    {
      "sentence": "你喜歡這家飯館嗎？"
    },
    {
      "sentence": "飯館裡有雞蛋和牛奶。"
    }
  ]
}
======================

⚠️ "你喜歡吃什麼菜？" contains characters not in level "Beginner" and was removed.  
[
  "這家飯館的菜很好吃。",
  "我們明天去飯館。",
  "我跟朋友去飯館。",
  "這飯館的飯很好吃。",
  "你今天要去飯館嗎？",
  "我明天要去飯館。",
  "飯館裡有什麼菜？",
  "這飯館的菜很多。",
  "你愛吃米飯嗎？",
  "我們在飯館看書。",
  "這飯館的飯很好。"
]  
⚠️ "飯館裡有魚和肉。" contains characters not in level "Beginner" and was removed.  
⚠️ "你喜歡這家飯館嗎？" contains characters not in level "Beginner" and was removed.  
⚠️ "飯館裡有雞蛋和牛奶。" contains characters not in level "Beginner" and was removed.  
Generated 16 sentences (requested 15). Took 2 attempts  
----- output end -----  
LevelMap: generateSentence works with many characters ... ok (10s)  

ok | 5 passed | 0 failed (18s)