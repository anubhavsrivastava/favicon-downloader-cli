#!/usr/bin/env node
'use strict';
const meow = require('meow');
const { downloadIcons } = require('favicon-downloader');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(
	`
	Usage
	  $ favdownload <url> [--path] [--name] 
	Options
	  --path         Path to download the favicon
	  --name         Name for new file downloaded
	Examples
	  $ favdownload https://theanubhav.com
	  $ favdownload https://devtips.theanubhav.com --name favicon.ico "
	  $ favdownload https://about.theanubhav.com --name favicon.ico  --path /a/ico 
`,
	{
		flags: {
			path: {
				type: 'string',
				default: ''
			},
			name: {
				type: 'string',
				default: ''
			}
		}
	}
);

cli.flags.app = cli.input.slice(1);

const input = cli.input[0];

if (!input) {
	console.error('Error: Specify a URL');
	cli.showHelp(1);
	process.exit(1);
}

(async () => {
	downloadIcons(input, cli.flags)
		.then(_ => {
			console.log('Successful downloaded Favicon');
		})
		.catch(e => {
			console.log(e);
		});
})();
