#!/usr/bin/env node

require('dotenv').config()
const http = require("http")
const cityTimezones = require('city-timezones');

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" })
	const result = main('Singapore')
	res.end(result)
})

const PORT = process.env.PORT

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

const main = (cityName) => {
 
	const israelTime = new Date().toLocaleString("en-UK", {
		timeZone: 'Israel',
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});;
	const israelTimeDisplay = `The time in Israel is ${israelTime}`;

	const cityLookup = cityTimezones.lookupViaCity(cityName)

	if (cityLookup.length === 0) {
		return `The city ${cityName} wasn't found`
	} 

	const cityTime = new Date().toLocaleString("en-UK", {
		timeZone: cityLookup[0].timezone,
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	const cityTimeDisplay = `The time in ${cityLookup[0].country}/${cityLookup[0].city} is ${cityTime}`

		return israelTimeDisplay + ' \n' + cityTimeDisplay
};
