## React受控组件

### `input`

```tsx
import React, { ChangeEvent, FC, useState } from "react";


const FormDemo: FC = () => {
    const [text, setText] = useState("hello");

    return (
        <>
            <p>{text}</p>
            {/* input */}
            <div>
                {/* 双向绑定 */}
                {/* 使用value，将text的值绑定到input上 */}
                {/* 监听onChange事件，随时将text的值进行修改，将input的值绑定到value上 */}
                <input type="text" value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => { setText(e.target.value) }} />
            </div>

            {/* textarea */}
            <p>hello</p>
            <div>
                {/* 双向绑定 */}
                {/* 使用value，将text的值绑定到input上 */}
                {/* 监听onChange事件，随时将text的值进行修改，将input的值绑定到value上 */}
                <textarea type="textarea" value={text} onChange={(e: ChangeEvent<HTMLTextareaElement>) => { setText(e.target.value) }}><textarea>
            </div>
        </>
    )
}

export default FormDemo;
```

### `textarea`

```tsx
import React, { ChangeEvent, FC, useState } from "react";


const FormDemo: FC = () => {
    const [text, setText] = useState("hello");

    function genHtml() {
        return { __html: text.replaceAll("\n", "<br>") }
    }
    return (
        <>
            {/* <p>{text}</p> */}
            {/* 注入JS文本域，实现text文本中的换行 */}
            {/* 将换行符换成换行标签 */}
            <p dangerouslySetInnerHTML={{ __html: text.replaceAll("\n", "<br>") }}></p>
            {/* 或者 */}
            {/* <p dangerouslySetInnerHTML={genHtml()}></p> */}

            {/* textarea */}
            <div>
                {/* 双向绑定 */}
                {/* 使用value，将text的值绑定到input上 */}
                {/* 监听onChange事件，随时将text的值进行修改，将input的值绑定到value上 */}
                <textarea value={text} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { setText(e.target.value) }} />
            </div>
        </>
    )
}

export default FormDemo;
```

### radio

```tsx
import React, { ChangeEvent, FC, useState } from "react";


const FormDemo: FC = () => {
    const [gender, setGender] = useState("female");

    function genHtml() {
        return { __html: text.replaceAll("\n", "<br>") }
    }
    return (
        <>
            {/* radio */}
            <p>gender : {gender === "male" ? "男" : "女"}</p>
            <label htmlFor="radio1">男</label>
            <input type="radio" id="radio1" name="gender" value="male" checked={gender === 'male'} onChange={(e: ChangeEvent<HTMLInputElement>) => { setGender(e.target.value) }} />

            <label htmlFor="radio2">女</label>
            <input type="radio" id="radio2" name="gender" value="female" checked={gender === 'female'} onChange={(e: ChangeEvent<HTMLInputElement>) => { setGender(e.target.value) }} />

        </>
    )
}

export default FormDemo;
```

### checkbox

```tsx
import React, { ChangeEvent, FC, useState } from "react";


const FormDemo: FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const targetValue = e.target.value;
        // 存在，则移除
        if (checkedValues.includes(targetValue)) {
            setCheckedValues(checkedValues.filter(value => {
                if (value === targetValue) {
                    return false;
                }
                return true;
            }))
            // 不存在，则添加
        } else {
            setCheckedValues(checkedValues.concat(targetValue));
        }
    }

    return (
        <>
            {/* checkbox */}
            {/* 绑定checked值 */}
            <p>isChecked : {isChecked.toString()}</p>
            <p>isChecked : {isChecked ? "抓到我了哟..." : "真遗憾，这都没抓到!"}</p>
            <label htmlFor="checkbox1">选择</label>
            <input type="checkbox" id='checkbox1' checked={isChecked} onChange={(e: ChangeEvent<HTMLInputElement>) => { setIsChecked(!isChecked) }} />

            <br></br>

            <p>checkedValues : {JSON.stringify(checkedValues)}</p>
            <label htmlFor="ck1">Alice1</label>
            <input type="checkbox" id="ck1" value="Alice1" checked={checkedValues.includes("Alice1")} onChange={(e) => { handleChange(e) }} />
            <label htmlFor="ck2">Alice2</label>
            <input type="checkbox" id="ck2" value="Alice2" checked={checkedValues.includes("Alice2")} onChange={(e) => { handleChange(e) }} />
            <label htmlFor="ck3">Alice3</label>
            <input type="checkbox" id="ck3" value="Alice3" checked={checkedValues.includes("Alice3")} onChange={(e) => { handleChange(e) }} />

            {/* 添加隐藏域，进行提交 */}
            <input type="hidden" name="checkedValues" value={JSON.stringify(checkedValues)} />
        </>
    )
}

export default FormDemo;
```

### `select`

```tsx
import React, { ChangeEvent, FC, useState } from "react";


const FormDemo: FC = () => {
    const [selectedValue, setSelectedValue] = useState("");
    return (
        <>
            {/* select */}
            <p>selectedValue : {selectedValue }</p>
            <select value={selectedValue} onChange={(e: ChangeEvent<HTMLSelectElement>) => { setSelectedValue(e.target.value) }}>
                <option value="" disabled>选择其中一项</option>
                <option value="Alice1">Alice1</option>
                <option value="Alice2">Alice2</option>
                <option value="Alice3">Alice3</option>
            </select>
        </>
    )
}

export default FormDemo;
```

### form表单提交的方式

```tsx
import React, { ChangeEvent, FC, useState } from "react";


const FormDemo: FC = () => {
    // 或者通过函数的方式进行提交
    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        // 阻止表单的默认形式，阻止点击提交按钮时提交表单
        e.preventDefault();

        // 使用例如axios的post请求进行手动的提交
    }
    return (
        <>
            {/* form表单提交的方式 */}
            <div>
                <form action="/api/post" onSubmit={handleSubmit}>
                    <input name='uname' value="Alice"></input>
                    <textarea name="text1" value="hello"></textarea>
                    {/* 隐藏域表单 */}
                    <input type="hidden" name="age" value={3} />
                    {/* 通过提交按钮进行提交 */}
                    {/* 提交时，会将表单中的内容以{name : value}的形式提交到action中提供的地址 */}
                    <button type="submit">提交</button>
                </form>
            </div>
        </>
    )
}
export default FormDemo;
```

### 表单校验

- 使用Ant Design中的[校验规则](https://ant.design/components/form-cn)
- 使用[React-Hook-Form](https://react-hook-form.com/)\
- 使用[formilk](https://formik.org/)
