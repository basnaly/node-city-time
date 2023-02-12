#!/usr/bin/env node

const inquirer = require("inquirer")

var cityTimezones = require('city-timezones');

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
	console.log(`The time in Israel is ${israelTime}`);


	const cityLookup = cityTimezones.lookupViaCity(cityName)

	if (cityLookup.length === 0) {
		console.log(`The city ${cityName} wasn't found`)
		return
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
	console.log(`The time in ${cityLookup[0].country}/${cityLookup[0].city} is ${cityTime}`);
};

const prompt = inquirer.createPromptModule()
prompt([{
	type: "input",
	name: "city",
	message: "Enter a city name to view its country, date and time"
}]).then(answers => {
	const city = answers.city
	main(city);
})
