ctrl + ~，到終端機打以下指令：
npm init --yes  
npm i linebot dotenv
npm i -D nodemon

<!-- npm i -D eslint   -->

npm init @eslint/config@latest 抓程式碼錯誤的套件，prettier 控制程式碼排版 i.e. printWidth、semicolon... ，vue 會再加上 editorconfig 管理檔案排版

√ What do you want to lint? · javascript
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · no / yes
√ Where does your code run? · node
The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm

npm i axios 抓外部資料的套件

到 package.json 裡面：
"type": "module", <= 增加這行
"name": "20250522",
"version": "1.0.0",
"main": "index.js",
"scripts": {
"dev": "nodemon index.js", <= 修改這行
"start": "node index.js" <= 增加這行

下載的延伸模組 prettier、live share、EditorConfig for VS Code

npm i -D prettier eslint-plugin-prettier eslint-config-prettier
把 eslint 跟 prettier 整合及安裝套件本體

打開 eslint.config.mjs：
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended' <= 新增這行

export default defineConfig([
{ files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
{ files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
eslintPluginPrettierRecommended <= 新增這行
]);

新增 .editorconfig 檔案：
貼上以下程式碼：
[*.{js}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true

新增 .prettierrc.json 檔案：
貼上以下程式碼：
{
"$schema": "https://json.schemastore.org/prettierrc",
"printWidth": 100,
"semi": false,
"singleQuote": true
}

F1>JSON>開啟使用者設定
把程式碼貼上，會自動修改格式錯誤的地方：
{
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit"
},
"editor.tabSize": 2,
}
如果沒有作用，可以 F1 > ESlint > restart ESlint server

把 .env 檔從上次上課檔案複製貼上到此處
打上以下程式碼：
import 'dotenv/config'
import linebot from 'linebot'

const bot = linebot({
channelId: process.env.CHANNEL_ID,
channelSecret: process.env.CHANNEL_SECRET,
channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.listen('/', process.env.PORT, () => {})
(process.env.PORT 使用雲端分配給你的 port)

到政府資料開放平台：data.gov.tw 取得 JSON 資料

npm run dev 開啟機器人

上傳 github 把要 ignore 的檔案寫入 .gitignore 裡：
.env
node_modules
dump/\*
!dump/.gitkeep

忽略 dump 裡所有的檔案，除了 .gitkeep檔案
gitkeep 檔案可以是任何名字，只是為了讓 dump 資料夾不要是空的
