/* demo 演示项目 */
// 当前版本 v0.5.0.20190520

const { $ } = window;

// 演示代码，默认用测试账号执行了登录
window.userId = '2509245659993474048'; // 测试账号
window.password = '9ncfhrj3w2'; // 测试密码
window.localStorage.option_userId = window.userId;
window.localStorage.option_sessionId = '6409886e08b21609f033870409317d07'; // 如果过期，请改用真实账号测试

// 初始化参数
window.FOTA_OPTION_CONFIG = {
    isDevelopment: true,
    socketHost: 'wss://api-test.fota.com/mapi/websocket',
    httpHost: 'https://api-test.fota.com/mapi/v1',
    // 申请的平台id字符串
    brokerId: '2',
    // 排行榜开关
    showRank: true,
    // SDK加载完成回调
    ready(optionManager) {
        // 调用业务代码
        window.demo.ready(optionManager);
    },
    // 特殊跳转回调
    on(event, data) {
        // 调用业务代码
        window.demo.on(event, data);
    }
};

// 以下只是演示代码
const mapUrl = {
    login: '/users/subaccount/login',
    logout: '/users/subaccount/logout'
};
window.demo = {
    userId: window.userId,
    password: window.password,
    token: '',
    ready(optionManager) {
        console.log('ready');
        this.optionManager = optionManager;
    },
    // 特殊跳转回调
    on(event, data) {
        if (event === 'login') {
            console.log('跳转登录');
        } else if (event === 'deposit') {
            console.log('跳转充值');
        } else if (event === 'allorder') {
            console.log('跳转完整交易记录');
        } else if (event === 'rich') {
            console.log('财富更新', data);
        } else if (event === 'trade') {
            console.log('下单请求', data);
        } else if (event === 'tradeSucc') {
            console.log('下单成功', data);
        } else if (event === 'settle') {
            console.log('结算结果', data);
        } else if (event === 'lang') {
            console.log('语言切换', data);
        }
    },
    // 查看配置
    getConfig() {
        console.log('getConfig', this.optionManager.getConfig());
    },
    // 切换语言
    setLanguege(name) {
        // LANGAUGE_ENGLISH - 英文
        // LANGAUGE_SIMPLE_CHINESE - 简体中文
        // LANGAUGE_KOREAN - 韩文
        this.optionManager.setLanguege(this.optionManager[name]);
    },
    // 登录，自由发挥
    login() {
        return $.ajax(this.optionManager.getConfig().httpHost + mapUrl.login, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                apikey: 'fota',
                signature: 'fota-option-open-api' // 演示用签名
            },
            data: JSON.stringify({
                userId: this.userId,
                password: this.password
            }),
        }).then((res) => {
            if (res.code === 0) {
                this.token = res.data.token;
                console.log('getToken', this.token);
                return this.token;
            }
            return null;
        });
    },
    // 设置用户信息
    setUserInfo() {
        this.optionManager.setUserInfo({
            userId: this.userId,
            token: this.token
        });
        console.log('setUserInfo', this.userId, this.token);
    },
    // 清除缓存，退出登录
    clearCache() {
        this.optionManager.clearCache();
        // $.ajax(window.FOTA_OPTION_CONFIG.httpHost + mapUrl.loginout);
        // window.location.reload();
    }
};
