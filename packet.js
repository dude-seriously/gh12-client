function Packet() {
	for (var n in arguments[0]) {
		this[n] = arguments[0][n];
	}
}