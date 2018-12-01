// import { getOptions } from 'loader-utils';


// export default function(content) {
//     const options = getOptions(this);
//     content = content.replace('当前时间',new Date().toLocaleDateString());
//     return `export default ${ JSON.stringify(content) }`;
// }

let { getOptions } = require('loader-utils');

module.exports =  function(content) {
    const options = getOptions(this);
    content = content.replace('现在时间',new Date().toLocaleTimeString());
    return `export default ${ JSON.stringify(content) }`;
}