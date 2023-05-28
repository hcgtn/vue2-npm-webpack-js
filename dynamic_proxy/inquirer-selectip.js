const inquirer = require('inquirer');
const ipList = require('./proxy.list.json');
const process = require('child_process');

const defaultV = ipList.find(i => i.active)
const promptList = [
  {
    type: 'list',
    message: '选择要连接的环境:',
    name: 'config',
    default: `${defaultV.name}(${defaultV.ip})`,
    choices: ipList.map(i => { return `${i.name}(${i.ip})`; })
  }
];
inquirer.prompt(promptList).then(p => {
  let regex = /(.+)\((.+?)\)/g,
    name = '', ip = '';
  let rs = regex.exec(p.config);
  name = rs[1];
  ip = rs[2];
  console.log(name, ip);
  process.exec(`node changeProxy.js ${name}`, (error) => {
    if (error) {
      throw new Error(error);
    } else {
      console.log(`你已经选择 [${name}] 环境,ip和端口: ${ip}`);
    }
  });
});