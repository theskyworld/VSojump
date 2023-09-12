# JSX 语法

在 React 中最先被提出，现已成为 ES 规范，可适用于其它框架，如 Vue3

## 标签

- 首字母大写的表示 React 组件
- 首字母小写的表示标准的 HTML 标签
- 标签必须要闭合
- 每个 JSX 片段中只能存在一个根节点，一个组件内可以存在多个JSX片段或多个子组件
- 对于那个唯一的根节点，如果根节点无实际含义，可以使用空标签

```tsx
<>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
  <p>hello</p>
</>
```

## 属性

在 JSX 的标签中除了能使用标准的 HTML 属性外，还能使用以下区别于标准 HTML 属性的 JSX 属性：

- `class`应当写成`className`

- `style`的值要写成对象的形式，使用小驼峰式命名，不能使用字符串的形式

```tsx
<p style={{color : 'red', fontSize : "white"}}>hello</p>
```

- `for`关键字要写成`htmlFor`

## 事件

- 要使用例如`onClick`的书写形式
- 必须传一个函数名作为值，不能传入对函数的调用(例如`fn()`)作为值

```tsx
<button onClick={addCount}>count is : {count}</button>
```

- 如果需要传递`event`参数，使用以下形式

```tsx
function addCount(event: MouseEvent<HTMLButtonElement>) {
    setCount(count + 1)
    console.log(event.target)
}

<button onClick={addCount}>count is : {count}</button>
```

- 如果需要传递其它参数，使用以下形式:

```tsx
function addCount2(num: number) {
    setCount(count + num)
}
<button onClick={() => addCount2(3)}>count is : {count}</button>
```

```tsx
function addCount1(event: MouseEvent<HTMLButtonElement>, num: number) {
    setCount(count + num)
    console.log(event.target)
  }
<button onClick={event => addCount1(event, 3)}>count is : {count}</button>
```

## 使用`{}`

可以在标签中使用`{}`来在标签中使用以下内容

- JS变量、函数、表达式

```tsx
<p className={class1}>{isTrue ? "hello" : "bye"}</p>
<button onClick={addCount}>count is : {count}</button>

```

- 普通文本、属性

```tsx
<p id={"id1"} className={class1}></p>
```

- 注释

```tsx
{/* 注释内容 */}
```

## 条件判断

可以通过以下三种方式来使用条件判断

- 使用`&&`

```tsx
{/* 如果flag的值为true，则渲染以下p元素，否则不渲染 */}
<div>{flag && <p>hello</p>}</div>
```

- 使用三元表达式

```tsx
{/* 使用三元表达式 */}
<div>{flag ? <p>hello</p> : <p>bye</p>}</div>
```

- 使用函数

```tsx
function ShowHelloOrBye() {
    // 在函数内使用例如if...else...
    if (flag) {
      return <p>hello</p>
    } else {
      return <p>bye</p>
    }
}
{/* 使用函数 */}
<div>
  <ShowHelloOrBye></ShowHelloOrBye>
</div>
```

## 循环

- 循环时使用数组的`.map`方法
- 每个item元素都需要一个`key`属性
- 每个`key`在同级别中唯一

```tsx
const users = [
    {
      id: 1,
      name: "Alice1",
    },
    {
      id: 2,
      name: "Alice2",
    },
    {
      id: 3,
      name: "Alice3",
    },
  ]
<div>
  {users.map(user => {
    const { id, name } = user
    return <p key={id}>{name}</p>
    {
      /* 不建议使用index作为key的值 */
    }
  })}
</div>
```
