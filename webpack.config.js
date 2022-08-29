// import 
// path 는 nodejs 환경에서 언제든 가져다 쓸 수 있는 전역모듈
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


// export 
module.exports = {
    // parcel main.js
    // 파일을 읽어들이기 시작하는 진입점 설정
    entry: './js/main.js',

    // 결과물(번들)을 반환하는 설정
    // 객체데이터로 내용추가
    output: {
        // // node.js 에서 요구하는 절대경로를 필요로함
        // path: path.resolve(__dirname, 'dist'), // __dirname도 전격모듈, resolve(a,b)함수는 a,b 
        // // 를 합쳐서 절대적인 경로를 output 의 path 제공 
        // filename: 'main.js',
        clean: true
        // clean 명령어를 추가하고 build 명령어를 입력하면 기존에
        // 필요하지 않는 내용들을 제거해주고 다시 결과물을 만들수가 있다.

    }
    ,
    module:{
        rules:[
            {
                // .css 로 확장자로 끝나는 파일을 찾는 정규표현식
                // 찾은 파일을 사용할껀데 순서가 중요하다
                // css-loader 같은 경우에는  현재 main.js 에서 import 를 통해서 main.css 파일을 가지고 오고 있는데
                // 어디까지나 자바스크립트 파일에서는 css 파일을 해석할수 없기때문에 그것을 해석하는 용도로 사용이된다.
                // 그렇게 해석된 내용을 어딘가에서 사용을 해야하는데 그랬을때 style-loder 가 실제로 html에 style 태그 부분에다가 
                // 해석된 내용을 삽입을 해주는 역할을 한다.
                // 순서를 명확하게 style-loader 부터 작성을 해주어야함!!
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader', //공급업체 접두사 적용
                    'sass-loader'
                    
                ]

            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            }

        ]

    },

    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins:[
        new HtmlPlugin({
            template: './index.html'
        }),

        new CopyPlugin({
            patterns: [
                { from: 'static' }
            ]
        })
    ],
    
    devServer:{
        host: 'localhost'
    }
}