// 使用craco来覆盖原create-react-app构建工具中对项目的配置
// https://craco.js.org/
// 实现对了例如ESlint、Babel等配置的自定义修改



// 覆盖webpack中的配置
// 实现跨域代理

module.exports = {
    // 配置webpack
    webpack: {
        configure(webpackConfig) {
            // 生成环境下才进行以下代码抽离的优化
            if (webpackConfig.mode === "production") {
                if (webpackConfig.optimization === null) {
                    webpackConfig.optimization = {};
                };
                webpackConfig.optimization.splitChunks = {
                    chunks: "all",
                    // 对以下的包进行抽离和缓存
                    cacheGroups: {
                        // 需要单独处理的,体积较大的第三方包
                        antd: {
                            name: "antd-chunk",
                            test: /antd/, // 当匹配到该路径时,进行抽离缓存
                            priority :100, // 优先级
                        },
                        reactDom: {
                            name: "reactDom-chunk",
                            test: /react-dom/, // 当匹配到该路径时,进行抽离缓存
                            priority :99, // 优先级
                        },

                        // 其它所有体积较小的第三方包
                        vendors: {
                            name: "vendors-chunk",
                            test: /node_modules/, // 该项兼容以上两项,因为所有的第三方包都在node_modules目录下
                            priority :98, // 优先级
                        }
                    }
                }
            }
            return webpackConfig;
        }
    },
    devServer: {
        proxy: {
            // 对于前端所有的/api请求都转发到http://localhost:5002
            "/api" : "http://localhost:5002"
        }
    }
}