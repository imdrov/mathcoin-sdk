# MathCoin API

[Документация MathCoin API](https://vk.com/@mathbattle_bot-merchant-api)

### Установка

```js
$ npm install mathcoin-sdk
```

### Пример использования

```js
const MathCoin = require("mathcoin-sdk");

const api = new MathCoin ({ user_id: user_id, token "token" })

api.score().then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});

(async function example() {
    try {
        result = await api.score();
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})()

```
### Методы SDK

|       API Метод           |       Метод в коде       |
|---------------------------|--------------------------|
| tx_list                   | txList                   |
| send_score                | sendScore                |
| score                     | score                    |
| —                         | getLink                  |
| *                         | call                     |