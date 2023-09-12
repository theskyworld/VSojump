##### 数据驱动视图

可以理解为，通过一个函数(f)将数据(state)进行封装处理，然后得到最终渲染后的视图(UI)

**UI = f(state)**

只需要关注对数据的修改，不需要手动进行对 DOM 的操作(例如`createElement`、`appendChild`等)

##### 使用脚手架创建 react 项目

- 使用[react 脚手架](https://create-react-app.dev/)
  `npx create-react-app my-app --template typescript`

- 使用[Vite](https://vitejs.dev/)
  `npm init vite`
  `npm create vite`

##### 添加使用 prettier 格式化代码规范的命令

安装

```shell
npm install prettier eslint-config-prettier eslint-plugin-prettier -D
```

配置`.eslintrc.js`文件

```js
extends: [
    // ...
    "plugin:prettier/recommended",
  ],
```

添加格式化命令

```json
  "scripts": {
    "format" : " prettier --write 'src/**/*.+(js|ts|jsx|tsx)' "
  },
```

##### 配置 vscode 在文件保存时自动进行代码格式化的处理

`.vscode\settings.json`

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

##### 配置自定义的[prettier](https://prettier.io/)代码规范，并在[eslint](https://eslint.org/)规则中运用

```js
// .prettierrc.js
module.exports = {
  // 箭头函数只有一个参数的时候可以忽略括号
  arrowParens: "avoid",
  // 括号内部不要出现空格
  bracketSpacing: true,
  // 行结束符使用 Unix 格式
  endOfLine: "lf",
  // true: Put > on the last line instead of at a new line
  jsxBracketSameLine: false,
  // 行宽
  printWidth: 100,
  // 换行方式
  proseWrap: "preserve",
  // 分号
  semi: false,
  // 使用单引号
  //   singleQuote: true,
  // 缩进
  tabWidth: 2,
  // 使用 tab 缩进
  useTabs: false,
  // 后置逗号，多行对象、数组在最后一行增加逗号
  trailingComma: "es5",
  parser: "typescript",
};
```

##### 使用 [husky](https://typicode.github.io/husky/) 在提交代码前对代码规范进行严格检查

手动提交代码

安装:`npm install husky --save-dev`

使用

- 配置`package.json`

  ```shell
  npm pkg set scripts.prepare="husky install"
  npm run prepare
  <!-- 实际上执行npx husky install命令,需要当前目录下存在.git文件(git仓库初始化目录) -->
  ```

- 添加在提交代码前自动执行的钩子命令

  ```shell
  npx husky add .husky/pre-commit "npm run lint"
  npx husky add .husky/pre-commit "npm run format"
  <!-- 经过prettier --write对代码规范进行检查以及修改后，再次将修改后的代码进行自动提交 -->
  npx husky add .husky/pre-commit "git add ."

  ```

##### 添加[commitlint](https://commitlint.js.org/#/)对提交代码时提交内容进行规范检查

安装 : `npm install --save-dev @commitlint/config-conventional @commitlint/cli`

配置 : `echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`

添加对应的钩子: `npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'`

##### 使用开发者插件
[React Developer Tools](<https://extfans.com/web-development/fmkadmapgofadopljbjfkapdkoienihi/>)
