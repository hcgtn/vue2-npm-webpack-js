const fs = require("fs");
const configPath = "./proxy.list.json";

const name = process.argv.slice(2)[0] || '测试';
fs.readFile(configPath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const _proxyList = JSON.parse(data);
  try {
    _proxyList.forEach(i => {
      i.active = i.name === name;
    });
  } catch (error) {
    throw new Error(error);
  }

  const updated_proxyList = JSON.stringify(_proxyList, null, 2);

  fs.writeFile(configPath, updated_proxyList, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Config file updated successfully.");
  });
});

