const { readFileSync } = require('fs');
const { resolve } = require('path');


class proxyList {

    _getProxyList() {
        try {
            return this._proxyList = JSON.parse(readFileSync(resolve(__dirname, './proxy.list.json'), 'utf-8'));
        } catch (error) {
            throw new Error(error);
        }
    };
    getActiveProxy() {
        try {
            const proxyList = this._getProxyList();
            if (proxyList.some(i => i.active)) {
                return proxyList.find(i => i.active);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    static getInstance() {
        if (!proxyList.instance) {
            proxyList.instance = new proxyList();
        }
        return proxyList.instance;
    }
}

module.exports = () => {
    return new proxyList();
};
