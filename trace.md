Incoming request: /api/LevelMap/generateSentences
Incoming request: /api/LevelMap/generateSentences
[Requesting] Received request for path: /LevelMap/generateSentences
Requesting.request {
  levelName: 'Beginner',
  topic: 'Daily life',
  path: '/LevelMap/generateSentences'
} => { request: '019a61b1-87e5-7f7c-b88b-09be4fc56c87' }
🤖 Requesting sentence generation from Gemini AI (Attempt 1)...
✅ Received response from Gemini AI!
🤖 RAW GEMINI RESPONSE
======================
{
  "sentences": [
    {
      "sentence": "我愛吃水果。"
    },
    {
      "sentence": "你喜歡喝茶嗎？"
    },
    {
      "sentence": "這是我的書。"
    },
    {
      "sentence": "我們去看朋友。"
    },
    {
      "sentence": "媽媽在家。"
    },
    {
      "sentence": "老師說話。"
    },
    {
      "sentence": "爸爸去公司。"
    },
    {
      "sentence": "今天天氣很好。"
    }
  ]
}
======================
⚠️ "老師說話。" contains characters not in level "Beginner" and was removed.
[
  "我愛吃水果。",
  "你喜歡喝茶嗎？",
  "這是我的書。",
  "我們去看朋友。",
  "媽媽在家。",
  "爸爸去公司。",
  "今天天氣很好。"
]
🤖 Requesting sentence generation from Gemini AI (Attempt 2)...
✅ Received response from Gemini AI!
🤖 RAW GEMINI RESPONSE
======================
{
  "sentences": [
    {
      "sentence": "我早上去學校。"
    },
    {
      "sentence": "他中午吃米飯。"
    },
    {
      "sentence": "妹妹愛玩貓。"
    },
    {
      "sentence": "我們晚上看電視。"
    },
    {
      "sentence": "老師今天有課嗎？"
    },
    {
      "sentence": "他買了水果和菜。"
    },
    {
      "sentence": "家裡有什麼？"
    },
    {
      "sentence": "我喜歡你的書包。"
    }
  ]
}
======================
⚠️ "他中午吃米飯。" contains characters not in level "Beginner" and was removed.
⚠️ "我們晚上看電視。" contains characters not in level "Beginner" and was removed.
⚠️ "他買了水果和菜。" contains characters not in level "Beginner" and was removed.
[ "我早上去學校。", "妹妹愛玩貓。", "老師今天有課嗎？", "家裡有什麼？", "我喜歡你的書包。" ]
Generated 12 sentences (requested 8). Took 2 attempts
LevelMap.generateSentences { levelName: 'Beginner', topic: 'Daily life' } => {
  sentences: [
    '我愛吃水果。',
    '你喜歡喝茶嗎？',
    '這是我的書。',
    '我們去看朋友。',
    '媽媽在家。',
    '爸爸去公司。',
    '今天天氣很好。',
    '我早上去學校。',
    '妹妹愛玩貓。',
    '老師今天有課嗎？',
    '家裡有什麼？',
    '我喜歡你的書包。'
  ]
}
Requesting.respond {
  request: '019a61b1-87e5-7f7c-b88b-09be4fc56c87',
  sentences: [
    '我愛吃水果。',
    '你喜歡喝茶嗎？',
    '這是我的書。',
    '我們去看朋友。',
    '媽媽在家。',
    '爸爸去公司。',
    '今天天氣很好。',
    '我早上去學校。',
    '妹妹愛玩貓。',
    '老師今天有課嗎？',
    '家裡有什麼？',
    '我喜歡你的書包。'
  ]
} => { request: '019a61b1-87e5-7f7c-b88b-09be4fc56c87' }
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 喜...
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING ？...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 你...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVED ㄒㄧˇ for 喜
ZhuyinDictionary.getAnswer { character: '喜' } => { zhuyinRep: 'ㄒㄧˇ' }
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 朋...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 去...
RETRIEVING 妹...
RETRIEVED ㄆㄥˊ for 朋
ZhuyinDictionary.getAnswer { character: '朋' } => { zhuyinRep: 'ㄆㄥˊ' }
RETRIEVED ㄑㄩˋ for 去
ZhuyinDictionary.getAnswer { character: '去' } => { zhuyinRep: 'ㄑㄩˋ' }
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 媽...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVED ㄇㄟˋ for 妹
ZhuyinDictionary.getAnswer { character: '妹' } => { zhuyinRep: 'ㄇㄟˋ' }
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 嗎...
RETRIEVED ㄇㄚ  for 媽
ZhuyinDictionary.getAnswer { character: '媽' } => { zhuyinRep: 'ㄇㄚ ' }
RETRIEVED `? for ？
RETRIEVED ㄋㄧˇ for 你
ZhuyinDictionary.getAnswer { character: '？' } => { zhuyinRep: '`?' }
ZhuyinDictionary.getAnswer { character: '你' } => { zhuyinRep: 'ㄋㄧˇ' }
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 們...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 爸...
RETRIEVING 歡...
RETRIEVING 氣...
RETRIEVING 看...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING ？...
RETRIEVED ㄇㄣ˙ for 們
ZhuyinDictionary.getAnswer { character: '們' } => { zhuyinRep: 'ㄇㄣ˙' }
RETRIEVED ㄏㄨㄢ  for 歡
RETRIEVED ㄅㄚˋ for 爸
RETRIEVED ㄎㄢˋ for 看
ZhuyinDictionary.getAnswer { character: '歡' } => { zhuyinRep: 'ㄏㄨㄢ ' }
ZhuyinDictionary.getAnswer { character: '爸' } => { zhuyinRep: 'ㄅㄚˋ' }
ZhuyinDictionary.getAnswer { character: '看' } => { zhuyinRep: 'ㄎㄢˋ' }
RETRIEVED `? for ？
ZhuyinDictionary.getAnswer { character: '？' } => { zhuyinRep: '`?' }
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 去...
RETRIEVING 包...
RETRIEVING 喝...
RETRIEVING 學...
RETRIEVING 妹...
RETRIEVING 師...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 我...
RETRIEVING 吃...
RETRIEVING 。...
RETRIEVING ？...
RETRIEVING 媽...
RETRIEVING 歡...
RETRIEVING 。...
RETRIEVING 什...
RETRIEVING 爸...
RETRIEVED ㄏㄜ  for 喝
RETRIEVED ㄅㄠ  for 包
RETRIEVED ㄑㄩˋ for 去
ZhuyinDictionary.getAnswer { character: '喝' } => { zhuyinRep: 'ㄏㄜ ' }
ZhuyinDictionary.getAnswer { character: '包' } => { zhuyinRep: 'ㄅㄠ ' }
ZhuyinDictionary.getAnswer { character: '去' } => { zhuyinRep: 'ㄑㄩˋ' }
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 家...
RETRIEVING 你...
RETRIEVING 書...
RETRIEVING 很...
RETRIEVING 友...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 茶...
RETRIEVING 的...
RETRIEVING 校...
RETRIEVING 是...
RETRIEVING 。...
RETRIEVING 這...
RETRIEVED ㄇㄟˋ for 妹
RETRIEVED ㄒㄩㄝˊ for 學
RETRIEVED ㄕ  for 師
ZhuyinDictionary.getAnswer { character: '妹' } => { zhuyinRep: 'ㄇㄟˋ' }
ZhuyinDictionary.getAnswer { character: '學' } => { zhuyinRep: 'ㄒㄩㄝˊ' }
ZhuyinDictionary.getAnswer { character: '師' } => { zhuyinRep: 'ㄕ ' }
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 我...
RETRIEVING 我...
RETRIEVING 。...
RETRIEVING 有...
RETRIEVING 。...
RETRIEVING 水...
RETRIEVING 愛...
RETRIEVING 書...
RETRIEVING 早...
RETRIEVING 上...
RETRIEVING 。...
RETRIEVING 天...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 愛...
RETRIEVING 麼...
RETRIEVING 去...
RETRIEVING 的...
RETRIEVING 嗎...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 。...
RETRIEVING 我...
RETRIEVING 好...
RETRIEVING 貓...
RETRIEVING 公...
RETRIEVING 喜...
RETRIEVING 果...
RETRIEVING 。...
RETRIEVING 今...
RETRIEVING 天...
RETRIEVED ㄇㄚ˙ for 嗎
RETRIEVED ㄨㄛˇ for 我
RETRIEVED `. for 。
RETRIEVED ㄔ  for 吃
ZhuyinDictionary.getAnswer { character: '嗎' } => { zhuyinRep: 'ㄇㄚ˙' }
ZhuyinDictionary.getAnswer { character: '我' } => { zhuyinRep: 'ㄨㄛˇ' }
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
ZhuyinDictionary.getAnswer { character: '吃' } => { zhuyinRep: 'ㄔ ' }
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 在...
RETRIEVING 裡...
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
Incoming request: /api/ZhuyinDictionary/getAnswer
RETRIEVING 有...
RETRIEVING 課...
RETRIEVING 司...
RETRIEVING 玩...
RETRIEVING 天...
RETRIEVING 。...
RETRIEVING 老...
RETRIEVING 我...
RETRIEVING 今...
RETRIEVING 家...
RETRIEVED `. for 。
RETRIEVED ㄕㄣˊ for 什
RETRIEVED ㄏㄨㄢ  for 歡
RETRIEVED ㄇㄚ  for 媽
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
ZhuyinDictionary.getAnswer { character: '什' } => { zhuyinRep: 'ㄕㄣˊ' }
ZhuyinDictionary.getAnswer { character: '歡' } => { zhuyinRep: 'ㄏㄨㄢ ' }
ZhuyinDictionary.getAnswer { character: '媽' } => { zhuyinRep: 'ㄇㄚ ' }
RETRIEVED ㄐㄧㄚ  for 家
RETRIEVED ㄕㄨ  for 書
ZhuyinDictionary.getAnswer { character: '家' } => { zhuyinRep: 'ㄐㄧㄚ ' }
ZhuyinDictionary.getAnswer { character: '書' } => { zhuyinRep: 'ㄕㄨ ' }
RETRIEVED ㄅㄚˋ for 爸
RETRIEVED ㄋㄧˇ for 你
RETRIEVED ㄑㄧˋ for 氣
ZhuyinDictionary.getAnswer { character: '爸' } => { zhuyinRep: 'ㄅㄚˋ' }
ZhuyinDictionary.getAnswer { character: '你' } => { zhuyinRep: 'ㄋㄧˇ' }
ZhuyinDictionary.getAnswer { character: '氣' } => { zhuyinRep: 'ㄑㄧˋ' }
RETRIEVED ㄧㄡˇ for 友
ZhuyinDictionary.getAnswer { character: '友' } => { zhuyinRep: 'ㄧㄡˇ' }
RETRIEVED ㄔㄚˊ for 茶
ZhuyinDictionary.getAnswer { character: '茶' } => { zhuyinRep: 'ㄔㄚˊ' }
RETRIEVED ㄉㄜ˙ for 的
RETRIEVED ㄒㄧㄠˋ for 校
RETRIEVED ㄕˋ for 是
ZhuyinDictionary.getAnswer { character: '的' } => { zhuyinRep: 'ㄉㄜ˙' }
ZhuyinDictionary.getAnswer { character: '校' } => { zhuyinRep: 'ㄒㄧㄠˋ' }
ZhuyinDictionary.getAnswer { character: '是' } => { zhuyinRep: 'ㄕˋ' }
RETRIEVED `. for 。
RETRIEVED ㄓㄜˋ for 這
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
ZhuyinDictionary.getAnswer { character: '這' } => { zhuyinRep: 'ㄓㄜˋ' }
RETRIEVED ㄨㄛˇ for 我
ZhuyinDictionary.getAnswer { character: '我' } => { zhuyinRep: 'ㄨㄛˇ' }
RETRIEVED `. for 。
RETRIEVED ㄨㄛˇ for 我
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
ZhuyinDictionary.getAnswer { character: '我' } => { zhuyinRep: 'ㄨㄛˇ' }
RETRIEVED `. for 。
RETRIEVED ㄧㄡˇ for 有
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
ZhuyinDictionary.getAnswer { character: '有' } => { zhuyinRep: 'ㄧㄡˇ' }
RETRIEVED ㄕㄨㄟˇ for 水
ZhuyinDictionary.getAnswer { character: '水' } => { zhuyinRep: 'ㄕㄨㄟˇ' }
RETRIEVED ㄞˋ for 愛
ZhuyinDictionary.getAnswer { character: '愛' } => { zhuyinRep: 'ㄞˋ' }
RETRIEVED ㄕㄨ  for 書
ZhuyinDictionary.getAnswer { character: '書' } => { zhuyinRep: 'ㄕㄨ ' }
RETRIEVED ㄕㄤˋ for 上
RETRIEVED ㄗㄠˇ for 早
RETRIEVED `. for 。
RETRIEVED ㄊㄧㄢ  for 天
ZhuyinDictionary.getAnswer { character: '上' } => { zhuyinRep: 'ㄕㄤˋ' }
ZhuyinDictionary.getAnswer { character: '早' } => { zhuyinRep: 'ㄗㄠˇ' }
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
ZhuyinDictionary.getAnswer { character: '天' } => { zhuyinRep: 'ㄊㄧㄢ ' }
RETRIEVED ㄞˋ for 愛
ZhuyinDictionary.getAnswer { character: '愛' } => { zhuyinRep: 'ㄞˋ' }
RETRIEVED `? for ？
ZhuyinDictionary.getAnswer { character: '？' } => { zhuyinRep: '`?' }
RETRIEVED ㄇㄜ˙ for 麼
RETRIEVED ㄉㄜ˙ for 的
ZhuyinDictionary.getAnswer { character: '麼' } => { zhuyinRep: 'ㄇㄜ˙' }
ZhuyinDictionary.getAnswer { character: '的' } => { zhuyinRep: 'ㄉㄜ˙' }
RETRIEVED ㄇㄚ˙ for 嗎
RETRIEVED ㄑㄩˋ for 去
RETRIEVED ㄨㄛˇ for 我
RETRIEVED ㄏㄣˇ for 很
RETRIEVED ㄇㄠ  for 貓
ZhuyinDictionary.getAnswer { character: '嗎' } => { zhuyinRep: 'ㄇㄚ˙' }
ZhuyinDictionary.getAnswer { character: '去' } => { zhuyinRep: 'ㄑㄩˋ' }
ZhuyinDictionary.getAnswer { character: '我' } => { zhuyinRep: 'ㄨㄛˇ' }
ZhuyinDictionary.getAnswer { character: '很' } => { zhuyinRep: 'ㄏㄣˇ' }
ZhuyinDictionary.getAnswer { character: '貓' } => { zhuyinRep: 'ㄇㄠ ' }
RETRIEVED ㄍㄨㄥ  for 公
ZhuyinDictionary.getAnswer { character: '公' } => { zhuyinRep: 'ㄍㄨㄥ ' }
RETRIEVED ㄒㄧˇ for 喜
ZhuyinDictionary.getAnswer { character: '喜' } => { zhuyinRep: 'ㄒㄧˇ' }
RETRIEVED ㄗㄞˋ for 在
RETRIEVED ㄐㄧㄣ  for 今
RETRIEVED `. for 。
RETRIEVED ㄊㄧㄢ  for 天
RETRIEVED ㄍㄨㄛˇ for 果
ZhuyinDictionary.getAnswer { character: '在' } => { zhuyinRep: 'ㄗㄞˋ' }
ZhuyinDictionary.getAnswer { character: '今' } => { zhuyinRep: 'ㄐㄧㄣ ' }
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
ZhuyinDictionary.getAnswer { character: '天' } => { zhuyinRep: 'ㄊㄧㄢ ' }
ZhuyinDictionary.getAnswer { character: '果' } => { zhuyinRep: 'ㄍㄨㄛˇ' }
RETRIEVED ㄌㄧˇ for 裡
ZhuyinDictionary.getAnswer { character: '裡' } => { zhuyinRep: 'ㄌㄧˇ' }
RETRIEVED ㄧㄡˇ for 有
RETRIEVED ㄙ  for 司
RETRIEVED ㄨㄢˊ for 玩
RETRIEVED ㄎㄜˋ for 課
RETRIEVED `. for 。
RETRIEVED ㄊㄧㄢ  for 天
ZhuyinDictionary.getAnswer { character: '有' } => { zhuyinRep: 'ㄧㄡˇ' }
ZhuyinDictionary.getAnswer { character: '司' } => { zhuyinRep: 'ㄙ ' }
ZhuyinDictionary.getAnswer { character: '玩' } => { zhuyinRep: 'ㄨㄢˊ' }
ZhuyinDictionary.getAnswer { character: '課' } => { zhuyinRep: 'ㄎㄜˋ' }
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
ZhuyinDictionary.getAnswer { character: '天' } => { zhuyinRep: 'ㄊㄧㄢ ' }
RETRIEVED ㄌㄠˇ for 老
ZhuyinDictionary.getAnswer { character: '老' } => { zhuyinRep: 'ㄌㄠˇ' }
RETRIEVED ㄐㄧㄣ  for 今
ZhuyinDictionary.getAnswer { character: '今' } => { zhuyinRep: 'ㄐㄧㄣ ' }
RETRIEVED ㄨㄛˇ for 我
RETRIEVED ㄐㄧㄚ  for 家
ZhuyinDictionary.getAnswer { character: '我' } => { zhuyinRep: 'ㄨㄛˇ' }
ZhuyinDictionary.getAnswer { character: '家' } => { zhuyinRep: 'ㄐㄧㄚ ' }
RETRIEVED ㄏㄠˇ for 好
ZhuyinDictionary.getAnswer { character: '好' } => { zhuyinRep: 'ㄏㄠˇ' }
RETRIEVED `. for 。
ZhuyinDictionary.getAnswer { character: '。' } => { zhuyinRep: '`.' }
Incoming request: /api/Quiz/makeQuiz
Incoming request: /api/Quiz/makeQuiz
[Requesting] Received request for path: /Quiz/makeQuiz
Requesting.request {
  apiKey: '4463d753-7231-44ba-88a6-6d71c7c4e030-01cb6500-f68d-4148-9fce-2acbefaac557',
  length: 30,
  path: '/Quiz/makeQuiz'
} => { request: '019a61b1-de8b-7f68-a3b7-742855d59528' }
CREATED new quiz with ID: 019a61b1-de9c-718e-bb51-1799d3ade10f, length: 30 seconds
Quiz.makeQuiz {
  apiKey: '4463d753-7231-44ba-88a6-6d71c7c4e030-01cb6500-f68d-4148-9fce-2acbefaac557',
  length: 30
} => { quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f' }
Requesting.respond {
  request: '019a61b1-de8b-7f68-a3b7-742855d59528',
  response: '019a61b1-de9c-718e-bb51-1799d3ade10f'
} => { request: '019a61b1-de8b-7f68-a3b7-742855d59528' }
Incoming request: /api/Quiz/registerQuestion
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-df47-72b0-9611-9fa55d1fde7b' }
我 REGISTERED as question 019a61b1-df64-7b92-b282-962e269a04a9 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ'
} => { questionId: '019a61b1-df64-7b92-b282-962e269a04a9' }
Requesting.respond {
  request: '019a61b1-df47-72b0-9611-9fa55d1fde7b',
  response: '019a61b1-df64-7b92-b282-962e269a04a9'
} => { request: '019a61b1-df47-72b0-9611-9fa55d1fde7b' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '愛',
  targetZhuyinRep: 'ㄞˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-dfe8-718d-8d6b-088a00a3f8d8' }
愛 REGISTERED as question 019a61b1-e005-7fe4-97a0-ec512d3a83a7 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '愛',
  targetZhuyinRep: 'ㄞˋ'
} => { questionId: '019a61b1-e005-7fe4-97a0-ec512d3a83a7' }
Requesting.respond {
  request: '019a61b1-dfe8-718d-8d6b-088a00a3f8d8',
  response: '019a61b1-e005-7fe4-97a0-ec512d3a83a7'
} => { request: '019a61b1-dfe8-718d-8d6b-088a00a3f8d8' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '吃',
  targetZhuyinRep: 'ㄔ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e066-7073-860d-f563c154f42c' }
吃 REGISTERED as question 019a61b1-e083-75b5-b6fd-bbac7229bf69 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '吃',
  targetZhuyinRep: 'ㄔ '
} => { questionId: '019a61b1-e083-75b5-b6fd-bbac7229bf69' }
Requesting.respond {
  request: '019a61b1-e066-7073-860d-f563c154f42c',
  response: '019a61b1-e083-75b5-b6fd-bbac7229bf69'
} => { request: '019a61b1-e066-7073-860d-f563c154f42c' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '水',
  targetZhuyinRep: 'ㄕㄨㄟˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e0eb-7876-876a-9fdb9f42d76b' }
水 REGISTERED as question 019a61b1-e108-7c70-8d9f-f294e7f154c9 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '水',
  targetZhuyinRep: 'ㄕㄨㄟˇ'
} => { questionId: '019a61b1-e108-7c70-8d9f-f294e7f154c9' }
Requesting.respond {
  request: '019a61b1-e0eb-7876-876a-9fdb9f42d76b',
  response: '019a61b1-e108-7c70-8d9f-f294e7f154c9'
} => { request: '019a61b1-e0eb-7876-876a-9fdb9f42d76b' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '果',
  targetZhuyinRep: 'ㄍㄨㄛˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e174-7442-8831-6decb1964d79' }
果 REGISTERED as question 019a61b1-e191-74ce-899b-b2a53f4f6ff4 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '果',
  targetZhuyinRep: 'ㄍㄨㄛˇ'
} => { questionId: '019a61b1-e191-74ce-899b-b2a53f4f6ff4' }
Requesting.respond {
  request: '019a61b1-e174-7442-8831-6decb1964d79',
  response: '019a61b1-e191-74ce-899b-b2a53f4f6ff4'
} => { request: '019a61b1-e174-7442-8831-6decb1964d79' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e1fb-73b0-850a-4fe4810d7c5d' }
。 REGISTERED as question 019a61b1-e219-7bc0-bba5-797006709cfb in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b1-e219-7bc0-bba5-797006709cfb' }
Requesting.respond {
  request: '019a61b1-e1fb-73b0-850a-4fe4810d7c5d',
  response: '019a61b1-e219-7bc0-bba5-797006709cfb'
} => { request: '019a61b1-e1fb-73b0-850a-4fe4810d7c5d' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '你',
  targetZhuyinRep: 'ㄋㄧˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e287-741f-b255-b204082896d2' }
你 REGISTERED as question 019a61b1-e2a3-71f0-a45b-79b0d47ad02e in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '你',
  targetZhuyinRep: 'ㄋㄧˇ'
} => { questionId: '019a61b1-e2a3-71f0-a45b-79b0d47ad02e' }
Requesting.respond {
  request: '019a61b1-e287-741f-b255-b204082896d2',
  response: '019a61b1-e2a3-71f0-a45b-79b0d47ad02e'
} => { request: '019a61b1-e287-741f-b255-b204082896d2' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '喜',
  targetZhuyinRep: 'ㄒㄧˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e310-7271-bed6-88ae88f46588' }
喜 REGISTERED as question 019a61b1-e32d-763e-846c-c47037ba9269 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '喜',
  targetZhuyinRep: 'ㄒㄧˇ'
} => { questionId: '019a61b1-e32d-763e-846c-c47037ba9269' }
Requesting.respond {
  request: '019a61b1-e310-7271-bed6-88ae88f46588',
  response: '019a61b1-e32d-763e-846c-c47037ba9269'
} => { request: '019a61b1-e310-7271-bed6-88ae88f46588' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '歡',
  targetZhuyinRep: 'ㄏㄨㄢ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e39e-7eb8-9f1e-0e3cea9d79b6' }
歡 REGISTERED as question 019a61b1-e3bb-7ade-a044-768e677a8512 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '歡',
  targetZhuyinRep: 'ㄏㄨㄢ '
} => { questionId: '019a61b1-e3bb-7ade-a044-768e677a8512' }
Requesting.respond {
  request: '019a61b1-e39e-7eb8-9f1e-0e3cea9d79b6',
  response: '019a61b1-e3bb-7ade-a044-768e677a8512'
} => { request: '019a61b1-e39e-7eb8-9f1e-0e3cea9d79b6' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '喝',
  targetZhuyinRep: 'ㄏㄜ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e419-7277-8ceb-898ec4b0f075' }
喝 REGISTERED as question 019a61b1-e436-7036-be4b-7e327dc45535 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '喝',
  targetZhuyinRep: 'ㄏㄜ '
} => { questionId: '019a61b1-e436-7036-be4b-7e327dc45535' }
Requesting.respond {
  request: '019a61b1-e419-7277-8ceb-898ec4b0f075',
  response: '019a61b1-e436-7036-be4b-7e327dc45535'
} => { request: '019a61b1-e419-7277-8ceb-898ec4b0f075' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '茶',
  targetZhuyinRep: 'ㄔㄚˊ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e4bf-776d-b776-65b3cc66f72e' }
茶 REGISTERED as question 019a61b1-e4dc-7b8c-94ca-85519c1ffbc4 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '茶',
  targetZhuyinRep: 'ㄔㄚˊ'
} => { questionId: '019a61b1-e4dc-7b8c-94ca-85519c1ffbc4' }
Requesting.respond {
  request: '019a61b1-e4bf-776d-b776-65b3cc66f72e',
  response: '019a61b1-e4dc-7b8c-94ca-85519c1ffbc4'
} => { request: '019a61b1-e4bf-776d-b776-65b3cc66f72e' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '嗎',
  targetZhuyinRep: 'ㄇㄚ˙',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e53c-7d26-a47c-25cfad54360c' }
嗎 REGISTERED as question 019a61b1-e559-7de5-b807-3ac6cbf2c785 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '嗎',
  targetZhuyinRep: 'ㄇㄚ˙'
} => { questionId: '019a61b1-e559-7de5-b807-3ac6cbf2c785' }
Requesting.respond {
  request: '019a61b1-e53c-7d26-a47c-25cfad54360c',
  response: '019a61b1-e559-7de5-b807-3ac6cbf2c785'
} => { request: '019a61b1-e53c-7d26-a47c-25cfad54360c' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '？',
  targetZhuyinRep: '`?',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e5b4-7860-af0d-9884ee40068e' }
？ REGISTERED as question 019a61b1-e5d1-719d-a5c6-e9a51e0ba124 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '？',
  targetZhuyinRep: '`?'
} => { questionId: '019a61b1-e5d1-719d-a5c6-e9a51e0ba124' }
Requesting.respond {
  request: '019a61b1-e5b4-7860-af0d-9884ee40068e',
  response: '019a61b1-e5d1-719d-a5c6-e9a51e0ba124'
} => { request: '019a61b1-e5b4-7860-af0d-9884ee40068e' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '這',
  targetZhuyinRep: 'ㄓㄜˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e654-70cd-bf98-cbfb518c7fb7' }
這 REGISTERED as question 019a61b1-e671-7c1a-871e-63475911076b in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '這',
  targetZhuyinRep: 'ㄓㄜˋ'
} => { questionId: '019a61b1-e671-7c1a-871e-63475911076b' }
Requesting.respond {
  request: '019a61b1-e654-70cd-bf98-cbfb518c7fb7',
  response: '019a61b1-e671-7c1a-871e-63475911076b'
} => { request: '019a61b1-e654-70cd-bf98-cbfb518c7fb7' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '是',
  targetZhuyinRep: 'ㄕˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e721-7829-808f-eb5e011e54b9' }
是 REGISTERED as question 019a61b1-e73d-7024-81f9-1d92934611dd in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '是',
  targetZhuyinRep: 'ㄕˋ'
} => { questionId: '019a61b1-e73d-7024-81f9-1d92934611dd' }
Requesting.respond {
  request: '019a61b1-e721-7829-808f-eb5e011e54b9',
  response: '019a61b1-e73d-7024-81f9-1d92934611dd'
} => { request: '019a61b1-e721-7829-808f-eb5e011e54b9' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e7e7-79ab-bf63-7cc79a44b64f' }
我 REGISTERED as question 019a61b1-e804-77e1-a9d6-e4e91db775f2 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ'
} => { questionId: '019a61b1-e804-77e1-a9d6-e4e91db775f2' }
Requesting.respond {
  request: '019a61b1-e7e7-79ab-bf63-7cc79a44b64f',
  response: '019a61b1-e804-77e1-a9d6-e4e91db775f2'
} => { request: '019a61b1-e7e7-79ab-bf63-7cc79a44b64f' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '的',
  targetZhuyinRep: 'ㄉㄜ˙',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e86b-75cf-be32-4fc7d3c5963c' }
的 REGISTERED as question 019a61b1-e887-7b6c-97da-c86fec8a401d in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '的',
  targetZhuyinRep: 'ㄉㄜ˙'
} => { questionId: '019a61b1-e887-7b6c-97da-c86fec8a401d' }
Requesting.respond {
  request: '019a61b1-e86b-75cf-be32-4fc7d3c5963c',
  response: '019a61b1-e887-7b6c-97da-c86fec8a401d'
} => { request: '019a61b1-e86b-75cf-be32-4fc7d3c5963c' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '書',
  targetZhuyinRep: 'ㄕㄨ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e8e7-7d17-b8d5-6577e9deaef3' }
書 REGISTERED as question 019a61b1-e904-77b6-906c-af4b68b7df30 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '書',
  targetZhuyinRep: 'ㄕㄨ '
} => { questionId: '019a61b1-e904-77b6-906c-af4b68b7df30' }
Requesting.respond {
  request: '019a61b1-e8e7-7d17-b8d5-6577e9deaef3',
  response: '019a61b1-e904-77b6-906c-af4b68b7df30'
} => { request: '019a61b1-e8e7-7d17-b8d5-6577e9deaef3' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-e966-7f16-9883-dd558fad0972' }
。 REGISTERED as question 019a61b1-e983-76dc-8b8e-9a512a8e413d in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b1-e983-76dc-8b8e-9a512a8e413d' }
Requesting.respond {
  request: '019a61b1-e966-7f16-9883-dd558fad0972',
  response: '019a61b1-e983-76dc-8b8e-9a512a8e413d'
} => { request: '019a61b1-e966-7f16-9883-dd558fad0972' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-ea52-7dea-98b6-b3c8e6bc2139' }
我 REGISTERED as question 019a61b1-ea6f-76ec-8a0e-79fa23aa8694 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ'
} => { questionId: '019a61b1-ea6f-76ec-8a0e-79fa23aa8694' }
Requesting.respond {
  request: '019a61b1-ea52-7dea-98b6-b3c8e6bc2139',
  response: '019a61b1-ea6f-76ec-8a0e-79fa23aa8694'
} => { request: '019a61b1-ea52-7dea-98b6-b3c8e6bc2139' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '們',
  targetZhuyinRep: 'ㄇㄣ˙',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-eb1c-7551-903b-3b2958df1d57' }
們 REGISTERED as question 019a61b1-eb38-7127-8830-d0dddc756491 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '們',
  targetZhuyinRep: 'ㄇㄣ˙'
} => { questionId: '019a61b1-eb38-7127-8830-d0dddc756491' }
Requesting.respond {
  request: '019a61b1-eb1c-7551-903b-3b2958df1d57',
  response: '019a61b1-eb38-7127-8830-d0dddc756491'
} => { request: '019a61b1-eb1c-7551-903b-3b2958df1d57' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '去',
  targetZhuyinRep: 'ㄑㄩˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-eb93-7e0c-80a7-d3a5cd35f43a' }
去 REGISTERED as question 019a61b1-ebaf-7283-bafa-e10e063ef856 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '去',
  targetZhuyinRep: 'ㄑㄩˋ'
} => { questionId: '019a61b1-ebaf-7283-bafa-e10e063ef856' }
Requesting.respond {
  request: '019a61b1-eb93-7e0c-80a7-d3a5cd35f43a',
  response: '019a61b1-ebaf-7283-bafa-e10e063ef856'
} => { request: '019a61b1-eb93-7e0c-80a7-d3a5cd35f43a' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '看',
  targetZhuyinRep: 'ㄎㄢˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-ec35-7f81-a31c-78fb29596cb7' }
看 REGISTERED as question 019a61b1-ec52-79a3-a416-a979de7a9109 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '看',
  targetZhuyinRep: 'ㄎㄢˋ'
} => { questionId: '019a61b1-ec52-79a3-a416-a979de7a9109' }
Requesting.respond {
  request: '019a61b1-ec35-7f81-a31c-78fb29596cb7',
  response: '019a61b1-ec52-79a3-a416-a979de7a9109'
} => { request: '019a61b1-ec35-7f81-a31c-78fb29596cb7' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '朋',
  targetZhuyinRep: 'ㄆㄥˊ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-ecad-78fe-8c65-bab326595111' }
朋 REGISTERED as question 019a61b1-ecca-74f8-86e2-230cc455a593 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '朋',
  targetZhuyinRep: 'ㄆㄥˊ'
} => { questionId: '019a61b1-ecca-74f8-86e2-230cc455a593' }
Requesting.respond {
  request: '019a61b1-ecad-78fe-8c65-bab326595111',
  response: '019a61b1-ecca-74f8-86e2-230cc455a593'
} => { request: '019a61b1-ecad-78fe-8c65-bab326595111' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '友',
  targetZhuyinRep: 'ㄧㄡˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-ed2f-7257-98bf-a45043c5a316' }
友 REGISTERED as question 019a61b1-ed4d-7218-a52d-b660597cdb57 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '友',
  targetZhuyinRep: 'ㄧㄡˇ'
} => { questionId: '019a61b1-ed4d-7218-a52d-b660597cdb57' }
Requesting.respond {
  request: '019a61b1-ed2f-7257-98bf-a45043c5a316',
  response: '019a61b1-ed4d-7218-a52d-b660597cdb57'
} => { request: '019a61b1-ed2f-7257-98bf-a45043c5a316' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-ede3-78b9-b3af-69f4c1934696' }
。 REGISTERED as question 019a61b1-ee00-7c12-81d6-569def993b6c in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b1-ee00-7c12-81d6-569def993b6c' }
Requesting.respond {
  request: '019a61b1-ede3-78b9-b3af-69f4c1934696',
  response: '019a61b1-ee00-7c12-81d6-569def993b6c'
} => { request: '019a61b1-ede3-78b9-b3af-69f4c1934696' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '媽',
  targetZhuyinRep: 'ㄇㄚ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-eeba-7432-87b3-53efb6fc3ddb' }
媽 REGISTERED as question 019a61b1-eed6-75b6-be2d-61ff2483a591 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '媽',
  targetZhuyinRep: 'ㄇㄚ '
} => { questionId: '019a61b1-eed6-75b6-be2d-61ff2483a591' }
Requesting.respond {
  request: '019a61b1-eeba-7432-87b3-53efb6fc3ddb',
  response: '019a61b1-eed6-75b6-be2d-61ff2483a591'
} => { request: '019a61b1-eeba-7432-87b3-53efb6fc3ddb' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '媽',
  targetZhuyinRep: 'ㄇㄚ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-ef37-728b-be41-a5afe9d67e78' }
媽 REGISTERED as question 019a61b1-ef53-77c1-9194-cf8138e563c0 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '媽',
  targetZhuyinRep: 'ㄇㄚ '
} => { questionId: '019a61b1-ef53-77c1-9194-cf8138e563c0' }
Requesting.respond {
  request: '019a61b1-ef37-728b-be41-a5afe9d67e78',
  response: '019a61b1-ef53-77c1-9194-cf8138e563c0'
} => { request: '019a61b1-ef37-728b-be41-a5afe9d67e78' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '在',
  targetZhuyinRep: 'ㄗㄞˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-efeb-7c16-9484-42d3f5bd99cf' }
在 REGISTERED as question 019a61b1-f009-720a-bf58-6bbf8d7ef492 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '在',
  targetZhuyinRep: 'ㄗㄞˋ'
} => { questionId: '019a61b1-f009-720a-bf58-6bbf8d7ef492' }
Requesting.respond {
  request: '019a61b1-efeb-7c16-9484-42d3f5bd99cf',
  response: '019a61b1-f009-720a-bf58-6bbf8d7ef492'
} => { request: '019a61b1-efeb-7c16-9484-42d3f5bd99cf' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '家',
  targetZhuyinRep: 'ㄐㄧㄚ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f070-7a5d-a9fc-cb48e2ce959f' }
家 REGISTERED as question 019a61b1-f08e-7fb8-9153-228f36e16ac1 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '家',
  targetZhuyinRep: 'ㄐㄧㄚ '
} => { questionId: '019a61b1-f08e-7fb8-9153-228f36e16ac1' }
Requesting.respond {
  request: '019a61b1-f070-7a5d-a9fc-cb48e2ce959f',
  response: '019a61b1-f08e-7fb8-9153-228f36e16ac1'
} => { request: '019a61b1-f070-7a5d-a9fc-cb48e2ce959f' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f0f0-7665-bbc6-90d4415dfbe7' }
。 REGISTERED as question 019a61b1-f10c-7214-9191-8bc1cd65bb88 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b1-f10c-7214-9191-8bc1cd65bb88' }
Requesting.respond {
  request: '019a61b1-f0f0-7665-bbc6-90d4415dfbe7',
  response: '019a61b1-f10c-7214-9191-8bc1cd65bb88'
} => { request: '019a61b1-f0f0-7665-bbc6-90d4415dfbe7' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '爸',
  targetZhuyinRep: 'ㄅㄚˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f169-759e-bdfb-116826a9d662' }
爸 REGISTERED as question 019a61b1-f186-7df2-bc10-b69a0f5730dc in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '爸',
  targetZhuyinRep: 'ㄅㄚˋ'
} => { questionId: '019a61b1-f186-7df2-bc10-b69a0f5730dc' }
Requesting.respond {
  request: '019a61b1-f169-759e-bdfb-116826a9d662',
  response: '019a61b1-f186-7df2-bc10-b69a0f5730dc'
} => { request: '019a61b1-f169-759e-bdfb-116826a9d662' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '爸',
  targetZhuyinRep: 'ㄅㄚˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f250-7144-80dd-986ee9fd9459' }
爸 REGISTERED as question 019a61b1-f26d-7de9-b693-f93faae45a38 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '爸',
  targetZhuyinRep: 'ㄅㄚˋ'
} => { questionId: '019a61b1-f26d-7de9-b693-f93faae45a38' }
Requesting.respond {
  request: '019a61b1-f250-7144-80dd-986ee9fd9459',
  response: '019a61b1-f26d-7de9-b693-f93faae45a38'
} => { request: '019a61b1-f250-7144-80dd-986ee9fd9459' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '去',
  targetZhuyinRep: 'ㄑㄩˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f2cd-710c-a922-571081848dcb' }
去 REGISTERED as question 019a61b1-f2eb-7bac-97c9-a4ed8da3c13e in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '去',
  targetZhuyinRep: 'ㄑㄩˋ'
} => { questionId: '019a61b1-f2eb-7bac-97c9-a4ed8da3c13e' }
Requesting.respond {
  request: '019a61b1-f2cd-710c-a922-571081848dcb',
  response: '019a61b1-f2eb-7bac-97c9-a4ed8da3c13e'
} => { request: '019a61b1-f2cd-710c-a922-571081848dcb' }
Incoming request: /api/Quiz/registerQuestion
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '公',
  targetZhuyinRep: 'ㄍㄨㄥ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f37e-7c81-b22b-a8e1681c38bf' }
公 REGISTERED as question 019a61b1-f39a-7ac6-8a2a-118b2140dc75 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '公',
  targetZhuyinRep: 'ㄍㄨㄥ '
} => { questionId: '019a61b1-f39a-7ac6-8a2a-118b2140dc75' }
Requesting.respond {
  request: '019a61b1-f37e-7c81-b22b-a8e1681c38bf',
  response: '019a61b1-f39a-7ac6-8a2a-118b2140dc75'
} => { request: '019a61b1-f37e-7c81-b22b-a8e1681c38bf' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '司',
  targetZhuyinRep: 'ㄙ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f44e-7e7f-aa5e-a223ebaaaad4' }
司 REGISTERED as question 019a61b1-f46a-77a4-b0f0-3ec523929e53 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '司',
  targetZhuyinRep: 'ㄙ '
} => { questionId: '019a61b1-f46a-77a4-b0f0-3ec523929e53' }
Requesting.respond {
  request: '019a61b1-f44e-7e7f-aa5e-a223ebaaaad4',
  response: '019a61b1-f46a-77a4-b0f0-3ec523929e53'
} => { request: '019a61b1-f44e-7e7f-aa5e-a223ebaaaad4' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f4ca-7b22-82ed-1ea096c4cae2' }
。 REGISTERED as question 019a61b1-f4e7-72a4-8f54-fd8800c17def in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b1-f4e7-72a4-8f54-fd8800c17def' }
Requesting.respond {
  request: '019a61b1-f4ca-7b22-82ed-1ea096c4cae2',
  response: '019a61b1-f4e7-72a4-8f54-fd8800c17def'
} => { request: '019a61b1-f4ca-7b22-82ed-1ea096c4cae2' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '今',
  targetZhuyinRep: 'ㄐㄧㄣ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f545-754b-a867-b5e165f1991f' }
今 REGISTERED as question 019a61b1-f562-7e4e-a644-c21062842328 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '今',
  targetZhuyinRep: 'ㄐㄧㄣ '
} => { questionId: '019a61b1-f562-7e4e-a644-c21062842328' }
Requesting.respond {
  request: '019a61b1-f545-754b-a867-b5e165f1991f',
  response: '019a61b1-f562-7e4e-a644-c21062842328'
} => { request: '019a61b1-f545-754b-a867-b5e165f1991f' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '天',
  targetZhuyinRep: 'ㄊㄧㄢ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f5e8-783a-bbce-8180aea34206' }
天 REGISTERED as question 019a61b1-f605-734f-a1dd-25fd3914eddc in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '天',
  targetZhuyinRep: 'ㄊㄧㄢ '
} => { questionId: '019a61b1-f605-734f-a1dd-25fd3914eddc' }
Requesting.respond {
  request: '019a61b1-f5e8-783a-bbce-8180aea34206',
  response: '019a61b1-f605-734f-a1dd-25fd3914eddc'
} => { request: '019a61b1-f5e8-783a-bbce-8180aea34206' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '天',
  targetZhuyinRep: 'ㄊㄧㄢ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f6c6-747f-9c57-82d00613fe5b' }
天 REGISTERED as question 019a61b1-f6e3-7e53-bac5-1e2dcf3f20c3 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '天',
  targetZhuyinRep: 'ㄊㄧㄢ '
} => { questionId: '019a61b1-f6e3-7e53-bac5-1e2dcf3f20c3' }
Requesting.respond {
  request: '019a61b1-f6c6-747f-9c57-82d00613fe5b',
  response: '019a61b1-f6e3-7e53-bac5-1e2dcf3f20c3'
} => { request: '019a61b1-f6c6-747f-9c57-82d00613fe5b' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '氣',
  targetZhuyinRep: 'ㄑㄧˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f77d-766e-92ca-96c08d4fcce6' }
氣 REGISTERED as question 019a61b1-f799-7165-adc2-ab52dc7ecb09 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '氣',
  targetZhuyinRep: 'ㄑㄧˋ'
} => { questionId: '019a61b1-f799-7165-adc2-ab52dc7ecb09' }
Requesting.respond {
  request: '019a61b1-f77d-766e-92ca-96c08d4fcce6',
  response: '019a61b1-f799-7165-adc2-ab52dc7ecb09'
} => { request: '019a61b1-f77d-766e-92ca-96c08d4fcce6' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '很',
  targetZhuyinRep: 'ㄏㄣˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f851-7463-aa67-660d8464fcf3' }
很 REGISTERED as question 019a61b1-f86e-7a18-ad00-413320129407 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '很',
  targetZhuyinRep: 'ㄏㄣˇ'
} => { questionId: '019a61b1-f86e-7a18-ad00-413320129407' }
Requesting.respond {
  request: '019a61b1-f851-7463-aa67-660d8464fcf3',
  response: '019a61b1-f86e-7a18-ad00-413320129407'
} => { request: '019a61b1-f851-7463-aa67-660d8464fcf3' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '好',
  targetZhuyinRep: 'ㄏㄠˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f8ca-7779-bc6c-798597bf4568' }
好 REGISTERED as question 019a61b1-f8e6-7275-ba91-fef6a23c4385 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '好',
  targetZhuyinRep: 'ㄏㄠˇ'
} => { questionId: '019a61b1-f8e6-7275-ba91-fef6a23c4385' }
Requesting.respond {
  request: '019a61b1-f8ca-7779-bc6c-798597bf4568',
  response: '019a61b1-f8e6-7275-ba91-fef6a23c4385'
} => { request: '019a61b1-f8ca-7779-bc6c-798597bf4568' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f942-7f37-8d13-3ff51c4e091f' }
。 REGISTERED as question 019a61b1-f95f-7157-bd94-d3c532cee7bf in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b1-f95f-7157-bd94-d3c532cee7bf' }
Requesting.respond {
  request: '019a61b1-f942-7f37-8d13-3ff51c4e091f',
  response: '019a61b1-f95f-7157-bd94-d3c532cee7bf'
} => { request: '019a61b1-f942-7f37-8d13-3ff51c4e091f' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-f9bf-7d5a-9dd3-390dd9cb42e1' }
我 REGISTERED as question 019a61b1-f9dc-7509-886b-0c1cb7072ec5 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ'
} => { questionId: '019a61b1-f9dc-7509-886b-0c1cb7072ec5' }
Requesting.respond {
  request: '019a61b1-f9bf-7d5a-9dd3-390dd9cb42e1',
  response: '019a61b1-f9dc-7509-886b-0c1cb7072ec5'
} => { request: '019a61b1-f9bf-7d5a-9dd3-390dd9cb42e1' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '早',
  targetZhuyinRep: 'ㄗㄠˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-fa59-7916-885a-b9508a907d89' }
早 REGISTERED as question 019a61b1-fa75-7f93-9e89-7ef456ce2e50 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '早',
  targetZhuyinRep: 'ㄗㄠˇ'
} => { questionId: '019a61b1-fa75-7f93-9e89-7ef456ce2e50' }
Requesting.respond {
  request: '019a61b1-fa59-7916-885a-b9508a907d89',
  response: '019a61b1-fa75-7f93-9e89-7ef456ce2e50'
} => { request: '019a61b1-fa59-7916-885a-b9508a907d89' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '上',
  targetZhuyinRep: 'ㄕㄤˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-fb1a-796d-81f0-bf94933f9ebe' }
上 REGISTERED as question 019a61b1-fb45-786b-8cbd-91e990afb382 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '上',
  targetZhuyinRep: 'ㄕㄤˋ'
} => { questionId: '019a61b1-fb45-786b-8cbd-91e990afb382' }
Requesting.respond {
  request: '019a61b1-fb1a-796d-81f0-bf94933f9ebe',
  response: '019a61b1-fb45-786b-8cbd-91e990afb382'
} => { request: '019a61b1-fb1a-796d-81f0-bf94933f9ebe' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '去',
  targetZhuyinRep: 'ㄑㄩˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-fbe9-7ba0-9cab-0c56df61b795' }
去 REGISTERED as question 019a61b1-fc05-704b-a49f-6d3dbf64080c in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '去',
  targetZhuyinRep: 'ㄑㄩˋ'
} => { questionId: '019a61b1-fc05-704b-a49f-6d3dbf64080c' }
Requesting.respond {
  request: '019a61b1-fbe9-7ba0-9cab-0c56df61b795',
  response: '019a61b1-fc05-704b-a49f-6d3dbf64080c'
} => { request: '019a61b1-fbe9-7ba0-9cab-0c56df61b795' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '學',
  targetZhuyinRep: 'ㄒㄩㄝˊ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-fccd-7572-bdc5-fcc8ea5df760' }
學 REGISTERED as question 019a61b1-fcea-7ce9-b9f0-a000d3228924 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '學',
  targetZhuyinRep: 'ㄒㄩㄝˊ'
} => { questionId: '019a61b1-fcea-7ce9-b9f0-a000d3228924' }
Requesting.respond {
  request: '019a61b1-fccd-7572-bdc5-fcc8ea5df760',
  response: '019a61b1-fcea-7ce9-b9f0-a000d3228924'
} => { request: '019a61b1-fccd-7572-bdc5-fcc8ea5df760' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '校',
  targetZhuyinRep: 'ㄒㄧㄠˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-fd53-7eb1-810f-f539413367bb' }
校 REGISTERED as question 019a61b1-fd70-7531-8c94-a9823d689749 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '校',
  targetZhuyinRep: 'ㄒㄧㄠˋ'
} => { questionId: '019a61b1-fd70-7531-8c94-a9823d689749' }
Requesting.respond {
  request: '019a61b1-fd53-7eb1-810f-f539413367bb',
  response: '019a61b1-fd70-7531-8c94-a9823d689749'
} => { request: '019a61b1-fd53-7eb1-810f-f539413367bb' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-fde9-7d57-9aa7-a030816623f6' }
。 REGISTERED as question 019a61b1-fe07-7a86-95e3-a392efdf1422 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b1-fe07-7a86-95e3-a392efdf1422' }
Requesting.respond {
  request: '019a61b1-fde9-7d57-9aa7-a030816623f6',
  response: '019a61b1-fe07-7a86-95e3-a392efdf1422'
} => { request: '019a61b1-fde9-7d57-9aa7-a030816623f6' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '妹',
  targetZhuyinRep: 'ㄇㄟˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-feae-7036-b807-f3b9d6562b7c' }
妹 REGISTERED as question 019a61b1-fed2-72c9-a5fc-ac8fd73c0292 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '妹',
  targetZhuyinRep: 'ㄇㄟˋ'
} => { questionId: '019a61b1-fed2-72c9-a5fc-ac8fd73c0292' }
Requesting.respond {
  request: '019a61b1-feae-7036-b807-f3b9d6562b7c',
  response: '019a61b1-fed2-72c9-a5fc-ac8fd73c0292'
} => { request: '019a61b1-feae-7036-b807-f3b9d6562b7c' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '妹',
  targetZhuyinRep: 'ㄇㄟˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-ff33-76b9-875f-7bc6688c31ef' }
妹 REGISTERED as question 019a61b1-ff50-7798-8382-af57a673dbf1 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '妹',
  targetZhuyinRep: 'ㄇㄟˋ'
} => { questionId: '019a61b1-ff50-7798-8382-af57a673dbf1' }
Requesting.respond {
  request: '019a61b1-ff33-76b9-875f-7bc6688c31ef',
  response: '019a61b1-ff50-7798-8382-af57a673dbf1'
} => { request: '019a61b1-ff33-76b9-875f-7bc6688c31ef' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '愛',
  targetZhuyinRep: 'ㄞˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b1-ffb5-7655-adf0-a0352a244b25' }
愛 REGISTERED as question 019a61b1-ffd1-76e0-991f-b643c0a8cd56 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '愛',
  targetZhuyinRep: 'ㄞˋ'
} => { questionId: '019a61b1-ffd1-76e0-991f-b643c0a8cd56' }
Requesting.respond {
  request: '019a61b1-ffb5-7655-adf0-a0352a244b25',
  response: '019a61b1-ffd1-76e0-991f-b643c0a8cd56'
} => { request: '019a61b1-ffb5-7655-adf0-a0352a244b25' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '玩',
  targetZhuyinRep: 'ㄨㄢˊ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0034-7bc8-88b1-985c71cab051' }
玩 REGISTERED as question 019a61b2-0052-7372-990b-03727a037c9e in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '玩',
  targetZhuyinRep: 'ㄨㄢˊ'
} => { questionId: '019a61b2-0052-7372-990b-03727a037c9e' }
Requesting.respond {
  request: '019a61b2-0034-7bc8-88b1-985c71cab051',
  response: '019a61b2-0052-7372-990b-03727a037c9e'
} => { request: '019a61b2-0034-7bc8-88b1-985c71cab051' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '貓',
  targetZhuyinRep: 'ㄇㄠ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-00bd-7c3c-a297-7beaaac50e1e' }
貓 REGISTERED as question 019a61b2-00da-79a9-b32e-a23e505b4aa1 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '貓',
  targetZhuyinRep: 'ㄇㄠ '
} => { questionId: '019a61b2-00da-79a9-b32e-a23e505b4aa1' }
Requesting.respond {
  request: '019a61b2-00bd-7c3c-a297-7beaaac50e1e',
  response: '019a61b2-00da-79a9-b32e-a23e505b4aa1'
} => { request: '019a61b2-00bd-7c3c-a297-7beaaac50e1e' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0187-76d0-b917-914e08ac8acf' }
。 REGISTERED as question 019a61b2-01a4-787b-b973-24b131c37ad9 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b2-01a4-787b-b973-24b131c37ad9' }
Requesting.respond {
  request: '019a61b2-0187-76d0-b917-914e08ac8acf',
  response: '019a61b2-01a4-787b-b973-24b131c37ad9'
} => { request: '019a61b2-0187-76d0-b917-914e08ac8acf' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '老',
  targetZhuyinRep: 'ㄌㄠˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0209-76fe-a8f4-dd2885e43881' }
老 REGISTERED as question 019a61b2-0226-7f70-9e7c-7556fa75145d in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '老',
  targetZhuyinRep: 'ㄌㄠˇ'
} => { questionId: '019a61b2-0226-7f70-9e7c-7556fa75145d' }
Requesting.respond {
  request: '019a61b2-0209-76fe-a8f4-dd2885e43881',
  response: '019a61b2-0226-7f70-9e7c-7556fa75145d'
} => { request: '019a61b2-0209-76fe-a8f4-dd2885e43881' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '師',
  targetZhuyinRep: 'ㄕ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0283-7bb4-993f-a31d1bfb2d87' }
師 REGISTERED as question 019a61b2-02a0-782f-b6fe-117e007d03a3 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '師',
  targetZhuyinRep: 'ㄕ '
} => { questionId: '019a61b2-02a0-782f-b6fe-117e007d03a3' }
Requesting.respond {
  request: '019a61b2-0283-7bb4-993f-a31d1bfb2d87',
  response: '019a61b2-02a0-782f-b6fe-117e007d03a3'
} => { request: '019a61b2-0283-7bb4-993f-a31d1bfb2d87' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '今',
  targetZhuyinRep: 'ㄐㄧㄣ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-02fd-7951-8364-0af38e020008' }
今 REGISTERED as question 019a61b2-031a-7600-867f-6739683f5960 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '今',
  targetZhuyinRep: 'ㄐㄧㄣ '
} => { questionId: '019a61b2-031a-7600-867f-6739683f5960' }
Requesting.respond {
  request: '019a61b2-02fd-7951-8364-0af38e020008',
  response: '019a61b2-031a-7600-867f-6739683f5960'
} => { request: '019a61b2-02fd-7951-8364-0af38e020008' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '天',
  targetZhuyinRep: 'ㄊㄧㄢ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-037b-7673-b8e4-65141942dfa6' }
天 REGISTERED as question 019a61b2-0398-7959-8828-50aad4092575 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '天',
  targetZhuyinRep: 'ㄊㄧㄢ '
} => { questionId: '019a61b2-0398-7959-8828-50aad4092575' }
Requesting.respond {
  request: '019a61b2-037b-7673-b8e4-65141942dfa6',
  response: '019a61b2-0398-7959-8828-50aad4092575'
} => { request: '019a61b2-037b-7673-b8e4-65141942dfa6' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '有',
  targetZhuyinRep: 'ㄧㄡˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-044d-72aa-9941-bfa587ef0281' }
有 REGISTERED as question 019a61b2-046a-7bca-b9b2-668d799c4ce3 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '有',
  targetZhuyinRep: 'ㄧㄡˇ'
} => { questionId: '019a61b2-046a-7bca-b9b2-668d799c4ce3' }
Requesting.respond {
  request: '019a61b2-044d-72aa-9941-bfa587ef0281',
  response: '019a61b2-046a-7bca-b9b2-668d799c4ce3'
} => { request: '019a61b2-044d-72aa-9941-bfa587ef0281' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '課',
  targetZhuyinRep: 'ㄎㄜˋ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0520-7553-aa6a-117c4dc8bbf8' }
課 REGISTERED as question 019a61b2-053f-76ba-9b28-8ce7a237965a in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '課',
  targetZhuyinRep: 'ㄎㄜˋ'
} => { questionId: '019a61b2-053f-76ba-9b28-8ce7a237965a' }
Requesting.respond {
  request: '019a61b2-0520-7553-aa6a-117c4dc8bbf8',
  response: '019a61b2-053f-76ba-9b28-8ce7a237965a'
} => { request: '019a61b2-0520-7553-aa6a-117c4dc8bbf8' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '嗎',
  targetZhuyinRep: 'ㄇㄚ˙',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-05a5-72c7-9a25-f55b3550c1da' }
嗎 REGISTERED as question 019a61b2-05c2-77b1-8b4b-89933cf39f4d in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '嗎',
  targetZhuyinRep: 'ㄇㄚ˙'
} => { questionId: '019a61b2-05c2-77b1-8b4b-89933cf39f4d' }
Requesting.respond {
  request: '019a61b2-05a5-72c7-9a25-f55b3550c1da',
  response: '019a61b2-05c2-77b1-8b4b-89933cf39f4d'
} => { request: '019a61b2-05a5-72c7-9a25-f55b3550c1da' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '？',
  targetZhuyinRep: '`?',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-061f-782c-8ca8-5f5bb5948b36' }
？ REGISTERED as question 019a61b2-063c-758f-8ee1-a7ff72ea1847 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '？',
  targetZhuyinRep: '`?'
} => { questionId: '019a61b2-063c-758f-8ee1-a7ff72ea1847' }
Requesting.respond {
  request: '019a61b2-061f-782c-8ca8-5f5bb5948b36',
  response: '019a61b2-063c-758f-8ee1-a7ff72ea1847'
} => { request: '019a61b2-061f-782c-8ca8-5f5bb5948b36' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '家',
  targetZhuyinRep: 'ㄐㄧㄚ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0697-72d9-bca7-66e64beb4085' }
家 REGISTERED as question 019a61b2-06b5-78d9-afeb-ca9ce7527ab4 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '家',
  targetZhuyinRep: 'ㄐㄧㄚ '
} => { questionId: '019a61b2-06b5-78d9-afeb-ca9ce7527ab4' }
Requesting.respond {
  request: '019a61b2-0697-72d9-bca7-66e64beb4085',
  response: '019a61b2-06b5-78d9-afeb-ca9ce7527ab4'
} => { request: '019a61b2-0697-72d9-bca7-66e64beb4085' }
Incoming request: /api/Quiz/registerQuestion
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '裡',
  targetZhuyinRep: 'ㄌㄧˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0744-7600-8b53-93a004685474' }
裡 REGISTERED as question 019a61b2-0761-72fd-bb23-d7c889003440 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '裡',
  targetZhuyinRep: 'ㄌㄧˇ'
} => { questionId: '019a61b2-0761-72fd-bb23-d7c889003440' }
Requesting.respond {
  request: '019a61b2-0744-7600-8b53-93a004685474',
  response: '019a61b2-0761-72fd-bb23-d7c889003440'
} => { request: '019a61b2-0744-7600-8b53-93a004685474' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '有',
  targetZhuyinRep: 'ㄧㄡˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-07e6-7fbc-a2ac-a9b6254c5d3f' }
有 REGISTERED as question 019a61b2-0802-7280-b539-eebeffad98ff in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '有',
  targetZhuyinRep: 'ㄧㄡˇ'
} => { questionId: '019a61b2-0802-7280-b539-eebeffad98ff' }
Requesting.respond {
  request: '019a61b2-07e6-7fbc-a2ac-a9b6254c5d3f',
  response: '019a61b2-0802-7280-b539-eebeffad98ff'
} => { request: '019a61b2-07e6-7fbc-a2ac-a9b6254c5d3f' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '什',
  targetZhuyinRep: 'ㄕㄣˊ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-08bd-759e-9560-098d243eedd8' }
什 REGISTERED as question 019a61b2-08da-7018-8152-1995e26c37bb in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '什',
  targetZhuyinRep: 'ㄕㄣˊ'
} => { questionId: '019a61b2-08da-7018-8152-1995e26c37bb' }
Requesting.respond {
  request: '019a61b2-08bd-759e-9560-098d243eedd8',
  response: '019a61b2-08da-7018-8152-1995e26c37bb'
} => { request: '019a61b2-08bd-759e-9560-098d243eedd8' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '麼',
  targetZhuyinRep: 'ㄇㄜ˙',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-093f-7004-b3b2-7901948e1c16' }
麼 REGISTERED as question 019a61b2-095b-7fb6-8156-f70bf6536fda in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '麼',
  targetZhuyinRep: 'ㄇㄜ˙'
} => { questionId: '019a61b2-095b-7fb6-8156-f70bf6536fda' }
Requesting.respond {
  request: '019a61b2-093f-7004-b3b2-7901948e1c16',
  response: '019a61b2-095b-7fb6-8156-f70bf6536fda'
} => { request: '019a61b2-093f-7004-b3b2-7901948e1c16' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '？',
  targetZhuyinRep: '`?',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-09cb-7fed-a7bc-bf37c075ddf1' }
？ REGISTERED as question 019a61b2-09eb-710e-b367-fac41cd84532 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '？',
  targetZhuyinRep: '`?'
} => { questionId: '019a61b2-09eb-710e-b367-fac41cd84532' }
Requesting.respond {
  request: '019a61b2-09cb-7fed-a7bc-bf37c075ddf1',
  response: '019a61b2-09eb-710e-b367-fac41cd84532'
} => { request: '019a61b2-09cb-7fed-a7bc-bf37c075ddf1' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0a4a-7c88-a30e-7af84ed99943' }
我 REGISTERED as question 019a61b2-0a68-72d8-bebc-61fe8371f46b in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '我',
  targetZhuyinRep: 'ㄨㄛˇ'
} => { questionId: '019a61b2-0a68-72d8-bebc-61fe8371f46b' }
Requesting.respond {
  request: '019a61b2-0a4a-7c88-a30e-7af84ed99943',
  response: '019a61b2-0a68-72d8-bebc-61fe8371f46b'
} => { request: '019a61b2-0a4a-7c88-a30e-7af84ed99943' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '喜',
  targetZhuyinRep: 'ㄒㄧˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0ac3-7f62-89bc-c2d6f159960e' }
喜 REGISTERED as question 019a61b2-0ae0-7e07-a9b9-7246a5ef0e8b in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '喜',
  targetZhuyinRep: 'ㄒㄧˇ'
} => { questionId: '019a61b2-0ae0-7e07-a9b9-7246a5ef0e8b' }
Requesting.respond {
  request: '019a61b2-0ac3-7f62-89bc-c2d6f159960e',
  response: '019a61b2-0ae0-7e07-a9b9-7246a5ef0e8b'
} => { request: '019a61b2-0ac3-7f62-89bc-c2d6f159960e' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '歡',
  targetZhuyinRep: 'ㄏㄨㄢ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0b82-70c0-8a72-34d01de20c94' }
歡 REGISTERED as question 019a61b2-0b9e-7ffa-a204-e7f0d9ed5899 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '歡',
  targetZhuyinRep: 'ㄏㄨㄢ '
} => { questionId: '019a61b2-0b9e-7ffa-a204-e7f0d9ed5899' }
Requesting.respond {
  request: '019a61b2-0b82-70c0-8a72-34d01de20c94',
  response: '019a61b2-0b9e-7ffa-a204-e7f0d9ed5899'
} => { request: '019a61b2-0b82-70c0-8a72-34d01de20c94' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '你',
  targetZhuyinRep: 'ㄋㄧˇ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0c4d-7c32-88cb-2e54118b67d1' }
你 REGISTERED as question 019a61b2-0c69-72a8-9fd9-ed6c65c71cf3 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '你',
  targetZhuyinRep: 'ㄋㄧˇ'
} => { questionId: '019a61b2-0c69-72a8-9fd9-ed6c65c71cf3' }
Requesting.respond {
  request: '019a61b2-0c4d-7c32-88cb-2e54118b67d1',
  response: '019a61b2-0c69-72a8-9fd9-ed6c65c71cf3'
} => { request: '019a61b2-0c4d-7c32-88cb-2e54118b67d1' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '的',
  targetZhuyinRep: 'ㄉㄜ˙',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0d15-7a31-ac4d-bc0fc5494d1f' }
的 REGISTERED as question 019a61b2-0d33-73af-af70-2ec279c47f42 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '的',
  targetZhuyinRep: 'ㄉㄜ˙'
} => { questionId: '019a61b2-0d33-73af-af70-2ec279c47f42' }
Requesting.respond {
  request: '019a61b2-0d15-7a31-ac4d-bc0fc5494d1f',
  response: '019a61b2-0d33-73af-af70-2ec279c47f42'
} => { request: '019a61b2-0d15-7a31-ac4d-bc0fc5494d1f' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '書',
  targetZhuyinRep: 'ㄕㄨ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0d97-74ca-9586-5d9f152aee59' }
書 REGISTERED as question 019a61b2-0db4-793a-8f4e-51dac5369cf4 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '書',
  targetZhuyinRep: 'ㄕㄨ '
} => { questionId: '019a61b2-0db4-793a-8f4e-51dac5369cf4' }
Requesting.respond {
  request: '019a61b2-0d97-74ca-9586-5d9f152aee59',
  response: '019a61b2-0db4-793a-8f4e-51dac5369cf4'
} => { request: '019a61b2-0d97-74ca-9586-5d9f152aee59' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '包',
  targetZhuyinRep: 'ㄅㄠ ',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0e11-743b-a021-4b6d2dfb9538' }
包 REGISTERED as question 019a61b2-0e31-7eee-a89e-57a8e15a2572 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '包',
  targetZhuyinRep: 'ㄅㄠ '
} => { questionId: '019a61b2-0e31-7eee-a89e-57a8e15a2572' }
Requesting.respond {
  request: '019a61b2-0e11-743b-a021-4b6d2dfb9538',
  response: '019a61b2-0e31-7eee-a89e-57a8e15a2572'
} => { request: '019a61b2-0e11-743b-a021-4b6d2dfb9538' }
Incoming request: /api/Quiz/registerQuestion
[Requesting] Received request for path: /Quiz/registerQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  character: '。',
  targetZhuyinRep: '`.',
  path: '/Quiz/registerQuestion'
} => { request: '019a61b2-0e8e-70d0-8bab-3642eabb9a4b' }
。 REGISTERED as question 019a61b2-0eab-752f-87f9-06edd9dbef48 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.registerQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  character: '。',
  targetZhuyinRep: '`.'
} => { questionId: '019a61b2-0eab-752f-87f9-06edd9dbef48' }
Requesting.respond {
  request: '019a61b2-0e8e-70d0-8bab-3642eabb9a4b',
  response: '019a61b2-0eab-752f-87f9-06edd9dbef48'
} => { request: '019a61b2-0e8e-70d0-8bab-3642eabb9a4b' }
Incoming request: /api/Quiz/startQuestion
Incoming request: /api/Quiz/startQuestion
[Requesting] Received request for path: /Quiz/startQuestion
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  questionId: { response: '019a61b1-df64-7b92-b282-962e269a04a9' },
  path: '/Quiz/startQuestion'
} => { request: '019a61b2-407d-72f4-bfae-18de74e6ec13' }
Quiz 019a61b1-de9c-718e-bb51-1799d3ade10f timer started, will expire at 2025-11-08T04:21:33.272Z
STARTED question 019a61b1-df64-7b92-b282-962e269a04a9 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.startQuestion {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  questionId: '019a61b1-df64-7b92-b282-962e269a04a9'
} => { expiryTime: 2025-11-08T04:21:33.272Z }
Requesting.respond { request: '019a61b2-407d-72f4-bfae-18de74e6ec13' } => { request: '019a61b2-407d-72f4-bfae-18de74e6ec13' }
Incoming request: /api/Quiz/submitAnswer
Incoming request: /api/Quiz/submitAnswer
[Requesting] Received request for path: /Quiz/submitAnswer
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  questionId: { response: '019a61b1-df64-7b92-b282-962e269a04a9' },
  response: 'ㄨㄛˇ',
  path: '/Quiz/submitAnswer'
} => { request: '019a61b2-45f0-717b-93fe-30a061ac824d' }
AUTO-STARTED next question 019a61b1-e005-7fe4-97a0-ec512d3a83a7 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
SUBMITTED CORRECT ㄨㄛˇ for question 019a61b1-df64-7b92-b282-962e269a04a9 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.submitAnswer {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  questionId: '019a61b1-df64-7b92-b282-962e269a04a9',
  response: 'ㄨㄛˇ'
} => {}
Requesting.respond { request: '019a61b2-45f0-717b-93fe-30a061ac824d' } => { request: '019a61b2-45f0-717b-93fe-30a061ac824d' }
Incoming request: /api/Quiz/submitAnswer
[Requesting] Received request for path: /Quiz/submitAnswer
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  questionId: { response: '019a61b1-e005-7fe4-97a0-ec512d3a83a7' },
  response: 'ㄞ',
  path: '/Quiz/submitAnswer'
} => { request: '019a61b2-53b6-73ee-a4ad-e3360ba54865' }
AUTO-STARTED next question 019a61b1-e083-75b5-b6fd-bbac7229bf69 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
INCORRECT record added to quiz 019a61b1-de9c-718e-bb51-1799d3ade10f for question 019a61b1-e005-7fe4-97a0-ec512d3a83a7: {"character":"愛","target":"ㄞˋ","response":"ㄞ"}
SUBMITTED INCORRECT ㄞ for question 019a61b1-e005-7fe4-97a0-ec512d3a83a7 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.submitAnswer {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  questionId: '019a61b1-e005-7fe4-97a0-ec512d3a83a7',
  response: 'ㄞ'
} => {}
Requesting.respond { request: '019a61b2-53b6-73ee-a4ad-e3360ba54865' } => { request: '019a61b2-53b6-73ee-a4ad-e3360ba54865' }
Incoming request: /api/Quiz/submitAnswer
Incoming request: /api/Quiz/submitAnswer
[Requesting] Received request for path: /Quiz/submitAnswer
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  questionId: { response: '019a61b1-e083-75b5-b6fd-bbac7229bf69' },
  response: 'ㄔ ',
  path: '/Quiz/submitAnswer'
} => { request: '019a61b2-8402-726c-8bcd-0045a206768a' }
AUTO-STARTED next question 019a61b1-e108-7c70-8d9f-f294e7f154c9 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
SUBMITTED CORRECT ㄔ  for question 019a61b1-e083-75b5-b6fd-bbac7229bf69 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.submitAnswer {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  questionId: '019a61b1-e083-75b5-b6fd-bbac7229bf69',
  response: 'ㄔ '
} => {}
Requesting.respond { request: '019a61b2-8402-726c-8bcd-0045a206768a' } => { request: '019a61b2-8402-726c-8bcd-0045a206768a' }
Incoming request: /api/Quiz/submitAnswer
Incoming request: /api/Quiz/submitAnswer
[Requesting] Received request for path: /Quiz/submitAnswer
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  questionId: { response: '019a61b1-e108-7c70-8d9f-f294e7f154c9' },
  response: 'ㄅㄧㄥ ',
  path: '/Quiz/submitAnswer'
} => { request: '019a61b2-ab9b-71eb-a5f2-e296cef15196' }
AUTO-STARTED next question 019a61b1-e191-74ce-899b-b2a53f4f6ff4 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
INCORRECT record added to quiz 019a61b1-de9c-718e-bb51-1799d3ade10f for question 019a61b1-e108-7c70-8d9f-f294e7f154c9: {"character":"水","target":"ㄕㄨㄟˇ","response":"ㄅㄧㄥ "}
SUBMITTED INCORRECT ㄅㄧㄥ  for question 019a61b1-e108-7c70-8d9f-f294e7f154c9 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.submitAnswer {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  questionId: '019a61b1-e108-7c70-8d9f-f294e7f154c9',
  response: 'ㄅㄧㄥ '
} => {}
Requesting.respond { request: '019a61b2-ab9b-71eb-a5f2-e296cef15196' } => { request: '019a61b2-ab9b-71eb-a5f2-e296cef15196' }
Incoming request: /api/Quiz/submitAnswer
[Requesting] Received request for path: /Quiz/submitAnswer
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  questionId: { response: '019a61b1-e191-74ce-899b-b2a53f4f6ff4' },
  response: 'ㄍㄨㄛˇ',
  path: '/Quiz/submitAnswer'
} => { request: '019a61b2-b5d0-7180-8b24-83933aa5e3ec' }
AUTO-STARTED next question 019a61b1-e219-7bc0-bba5-797006709cfb in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
SUBMITTED CORRECT ㄍㄨㄛˇ for question 019a61b1-e191-74ce-899b-b2a53f4f6ff4 in quiz 019a61b1-de9c-718e-bb51-1799d3ade10f
Quiz.submitAnswer {
  quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f',
  questionId: '019a61b1-e191-74ce-899b-b2a53f4f6ff4',
  response: 'ㄍㄨㄛˇ'
} => {}
Requesting.respond { request: '019a61b2-b5d0-7180-8b24-83933aa5e3ec' } => { request: '019a61b2-b5d0-7180-8b24-83933aa5e3ec' }
Incoming request: /api/Quiz/endQuiz
Incoming request: /api/Quiz/endQuiz
[Requesting] Received request for path: /Quiz/endQuiz
Requesting.request {
  quizId: { response: '019a61b1-de9c-718e-bb51-1799d3ade10f' },
  path: '/Quiz/endQuiz'
} => { request: '019a61b2-b686-76ad-add9-ccf16fd32a17' }
Time is up! ENDING quiz 019a61b1-de9c-718e-bb51-1799d3ade10f and calculating results.
Quiz 019a61b1-de9c-718e-bb51-1799d3ade10f results: {
  "avgSpeed": 5977.8,
  "avgAccuracy": 0.6,
  "incorrectRecords": [
    {
      "character": "愛",
      "target": "ㄞˋ",
      "response": "ㄞ"
    },
    {
      "character": "水",
      "target": "ㄕㄨㄟˇ",
      "response": "ㄅㄧㄥ "
    }
  ]
}
Quiz.endQuiz { quizId: '019a61b1-de9c-718e-bb51-1799d3ade10f' } => {
  avgSpeed: 5977.8,
  avgAccuracy: 0.6,
  incorrectRecords: [
    { character: '愛', target: 'ㄞˋ', response: 'ㄞ' },
    { character: '水', target: 'ㄕㄨㄟˇ', response: 'ㄅㄧㄥ ' }
  ]
}
Requesting.respond {
  request: '019a61b2-b686-76ad-add9-ccf16fd32a17',
  avgSpeed: 5977.8,
  avgAccuracy: 0.6,
  incorrectRecords: [
    { character: '愛', target: 'ㄞˋ', response: 'ㄞ' },
    { character: '水', target: 'ㄕㄨㄟˇ', response: 'ㄅㄧㄥ ' }
  ]
} => { request: '019a61b2-b686-76ad-add9-ccf16fd32a17' }