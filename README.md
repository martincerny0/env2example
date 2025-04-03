# env2example [![npm version](https://img.shields.io/npm/v/env2example)](https://www.npmjs.com/package/env2example)

> Simple CLI tool to generate `.env.example` from your `.env` file — with typed placeholders or clean empty values.

---

## ✨ Features

- 🧪 Smart type placeholders (`<string>`, `<number>`, `<boolean>`)
- 🔍 Validates `.env` format and warns on syntax errors
- 🧼 Clean mode for empty values: `KEY=""`
- ⚡ Lightweight, fast and dependency-free (except `chalk` for pretty output)
- 🧠 Two CLI names available: `env2example` **and** `envex`

---

## 📦 Installation

### Run directly (no install):
```bash
npx env2example
# or
npx envex
```

### Or install globally:
```bash
npm install -g env2example
```

---

## 🚀 Usage

```bash
env2example           # Generate with typed placeholders
env2example --clean   # Generate with empty values: KEY=""
env2example --help    # Show help

# or using the alias:
envex
envex --clean
envex --help
```

---

## 📂 Example

Given a `.env` like:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
USE_SSL=true
```

Will generate `.env.example`:

```env
# Database
DB_HOST=<string>
DB_PORT=<number>
USE_SSL=<boolean>
```

With `--clean`:

```env
DB_HOST=""
DB_PORT=""
USE_SSL=""
```

---

## 🧠 Validation

If your `.env` contains invalid lines, you will see helpful error messages:

```bash
❌ Syntax error on line 5: "DATABASEURL"
```

---

## 🛠️ Options

| Flag       | Description                              |
|------------|------------------------------------------|
| `--clean`  | Output empty values (`KEY=""`)           |
| `--help`   | Show usage instructions                  |
|-------------------------------------------------------|

