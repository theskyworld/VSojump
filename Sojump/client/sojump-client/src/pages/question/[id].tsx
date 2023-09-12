// 动态路由文件
// 访问该文件时,输入的url中要包含id参数
// 例如"/question/1"
import PageWrapper from '@/components/PageWrapper/index'
import { getQuestionById } from '@/service/question'
import { getComponent } from '@/components/QuestionComponents/index'
import styles from '@/styles/Question.module.scss'

interface QuestionProps{
    errno: number,
    data?: {
        id: string
        title: string
        desc?: string
        js?: string
        css?: string
        isPublished: boolean
        isDeleted: boolean
        components: Array<any>
    }
    msg?: string
}

export default function Question(props: QuestionProps) {
    const { errno, data, msg = '' } = props

    // 数据错误
    if (errno !== 0) {
        return <PageWrapper title="错误">
            <h1>错误</h1>
            <p>{msg}</p>
        </PageWrapper>
    }

    const { id, title = '', desc = '', isDeleted, isPublished, components = [] } = data || {}

    // 已经被删除的，提示错误
    if (isDeleted) {
        return <PageWrapper title={title} desc={desc}>
            <h1>{title}</h1>
            <p>该问卷已经被删除</p>
        </PageWrapper>
    }

    // 尚未发布的，提示错误
    if (!isPublished) {
        return <PageWrapper title={title} desc={desc}>
            <h1>{title}</h1>
            <p>该问卷尚未发布</p>
        </PageWrapper>
    }

    // 遍历组件
    const ComponentListElem = <>
        {components.map(c => {
            const ComponentElem = getComponent(c)
            return <div key={c.fe_id} className={styles.componentWrapper}>
                {ComponentElem}
            </div>
        })}
    </>

    return <PageWrapper title={title} desc={desc}>
        <form method='post' action="/api/answer">
            <input type="hidden" name="questionId" value={id} />

            {ComponentListElem}

            <div className={styles.submitBtnContainer}>
                {/* <input type="submit" value="提交"/> */}
                <button type="submit">提交</button>
            </div>
        </form>
    </PageWrapper>
}

export async function getServerSideProps(context: any) {
    const { id = '' } = context.params

    // 根据 id 获取问卷数据
    const data = await getQuestionById(id)

    return {
        props: data
    }
}
