# Database Population Scripts

This directory contains scripts to populate the database with initial data.

## Available Scripts

### 1. Character Registration (`internalCharacterRegistration.ts`)

Registers characters with their Zhuyin pronunciations in the ZhuyinDictionary.

**Usage:**
```bash
deno run --allow-env --allow-net --allow-read src/scripts/internalCharacterRegistration.ts <set-name>
```

**Available sets:**
- `newbie` - Basic characters (pronouns, numbers, verbs, nouns, colors)
- `beginner` - Additional beginner-level characters (school, time, actions, nature, places, animals, food)
- `intermediate` - Intermediate-level characters
- `advanced` - Advanced-level characters
- `all` - Registers all character sets in order

**Examples:**
```bash
# Register only newbie characters
deno run --allow-env --allow-net --allow-read src/scripts/internalCharacterRegistration.ts newbie

# Register all characters
deno run --allow-env --allow-net --allow-read src/scripts/internalCharacterRegistration.ts all
```

---

### 2. Level Population (`internalLevelPopulation.ts`)

Populates learning levels with their corresponding character sets in the LevelMap.

**Usage:**
```bash
deno run --allow-env --allow-net --allow-read src/scripts/internalLevelPopulation.ts <level-name>
```

**Available levels:**
- `newbie` - Populates Newbie level with basic characters (117 chars)
- `beginner` - Populates Beginner level with newbie + beginner characters (206 chars)
- `intermediate` - Populates Intermediate level with newbie + beginner + intermediate characters (313 chars)
- `advanced` - Populates Advanced level with all characters (408 chars)
- `all` - Populates all levels in order

**Note:** Levels are cumulative. Each higher level includes all characters from lower levels plus new ones:
- **Newbie** = newbieSet (117 characters)
- **Beginner** = newbieSet + beginnerAddOnSet (117 + 89 = 206 characters)
- **Intermediate** = newbieSet + beginnerAddOnSet + intermediateAddOnSet (206 + 107 = 313 characters)
- **Advanced** = newbieSet + beginnerAddOnSet + intermediateAddOnSet + advancedAddOnSet (313 + 95 = 408 characters)

**Examples:**
```bash
# Populate only the newbie level
deno run --allow-env --allow-net --allow-read src/scripts/internalLevelPopulation.ts newbie

# Populate all levels
deno run --allow-env --allow-net --allow-read src/scripts/internalLevelPopulation.ts all
```

---

## Initial Setup Workflow

To set up the database from scratch:

1. **Register all characters in the dictionary:**
   ```bash
   deno run --allow-env --allow-net --allow-read src/scripts/internalCharacterRegistration.ts all
   ```

2. **Populate all levels with characters:**
   ```bash
   deno run --allow-env --allow-net --allow-read src/scripts/internalLevelPopulation.ts all
   ```

## Character Set Organization

### Newbie Set (117 characters)
- Basic pronouns: 我, 你, 他, 她, 它, 們
- Basic numbers: 零, 一, 二, 三, 四, 五, 六, 七, 八, 九, 十, 幾, 多, 少
- Basic verbs: 是, 想, 要, 吃, 喝, 有, 不, 沒, 可, 以, 在, 謝, 說, 學, 喜, 歡, 和
- Basic people: 人, 朋, 友, 爸, 媽, 哥, 姐, 弟, 妹, 家, 老, 師
- Basic nouns: 水, 口, 書, 車, 茶, 牛, 豬, 雞, 肉, 米, 飯, 菜, 麵
- Basic colors: 色, 紅, 藍, 黃, 綠, 黑, 白
- Basic misc: 個, 太, 很, 好, 什, 麼, 錯, 嗎, 這, 那, 的, 了, 上, 下, 生

### Beginner Add-On Set (89 characters)
- School, time, actions, nature, places, animals, colors, food

### Intermediate Add-On Set (107 characters)
- More complex characters and particles

### Advanced Add-On Set (95 characters)
- Advanced vocabulary and literary particles

## Environment Requirements

Make sure you have a `.env` file in the project root with:
```
MONGODB_URL=<your-mongodb-connection-string>
DB_NAME=<your-database-name>
```
