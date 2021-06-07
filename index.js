const request = require("request-promise");

class MathCoin {

	/**
	 * @param {Number} user_id - id пользователя
	 * @param {String} token - api ключ 
	*/
	constructor({ user_id, token }) {
		if (!user_id) throw new Error('\'user_id\' is not specified');
		if (!token) throw new Error('\'token\' is not specified');

		this.user_id = user_id;
		this.token = token;
	}

	/**
	 * @param {Object} params - параметры метода
	 */
	async call(params) {
		if (!params) throw new Error('\'params\' is not specified');

		let result = await request('https://mathbattle.12kot3k.ru/public_api.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: params,
			json: true
		});

		return result;
	}

	/**
	 * @param {Number} txId - id транзакции после которой получать переводы
	 * @returns {Promise<{ success: Boolean, tx_list: Array<{ id: Number, from: String, to: String, score: String, time: String }> }>} 
	*/
	async txList({ txId }) {
		if (!txId) throw new Error('\'txId\' is not specified');

		let result = await request('https://mathbattle.12kot3k.ru/public_api.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				method: "tx_list",
				token: this.token,
				lastTx: (txId ? txId : 0)
			},
			json: true
		});

		return result;
	}

	/**
	 * @param {Number} to - id получателя
	 * @param {Number} amount - сумма перевода
	 * @returns {Promise<{ success: Boolean, amount: Number, to: String, current: Number }>} 
	*/
	async sendScore({ to, amount }) {
		if (!to) throw new Error('\'to\' is not specified');
		if (!amount) throw new Error('\'amount\' is not specified');

		let result = await request('https://mathbattle.12kot3k.ru/public_api.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				method: "send_score",
				token: this.token,
				to: to,
				amount: amount
			},
			json: true
		});

		return result;
	}

	/**
	 * @param {Number} id - id пользователя
	 * @returns {Promise<{ success: Boolean, score: String }>} 
	*/
	async score({ id }) {
		if (!id) throw new Error('\'id\' is not specified');

		let result = await request('https://mathbattle.12kot3k.ru/public_api.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				method: "score",
				token: this.token,
				id: id ? id : this.user_id
			},
			json: true
		});

		return result;
	}

	/**
	 * @param {Number} amount - сумма перевода
	 * @returns {Promise<String>} 
	*/
	async getLink({ amount }) {
		return "https://m.vk.com/app6995668#t" + this.userId + (amount ? "_" + amount : "");
	}
}

module.exports = MathCoin;