export function setWithTTL(key, value, ttl) {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export function getWithTTL(key) {
	const itemStr = localStorage.getItem(key)

    if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date();

	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}

	return item.value
}