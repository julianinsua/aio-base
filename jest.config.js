const { resolve } = require("path")

module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleDirectories: ["node_modules", "src"],
	moduleNameMapper: {
		"^src/(.*)$": resolve(__dirname, "./src/$1"),
	},
}
