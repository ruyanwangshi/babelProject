import './class.js'

const obj = {
}

const test = () => {};

const res = obj?.type;

Promise.resolve(1).then(res => {
    console.log(res);
})


// async function foo() {
//     const res = await 1;
// }

class Bar{
    constructor() {

    }
    get_value() {
        return '测试内容'
    }
}