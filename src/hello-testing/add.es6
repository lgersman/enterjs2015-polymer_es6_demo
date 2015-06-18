function add(l, r) {
	if (isNaN(l)) {
		throw new Error(`1st param expected to be a number but is '${l}'`);
	}

	if (isNaN(r)) {
		throw new Error(`2nd param expected to be a number but is '${r}'`);
	}

	if (!r) {
		throw new Error(`2nd param expected to be <> 0`);
	}

	return l + r;
}

export default add;
