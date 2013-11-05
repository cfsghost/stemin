"use strict";

var ConnMan = require('jsdx-connman');
var connman = new ConnMan();
connman.init(function() {
});

var netSettings = [
	{ method: 'dhcp' }
];

var Network = function() {
	var self = this;
};

Network.prototype.getSettings = function(opts, callback) {
	var self = this;

	connman.getOnlineService(function(err, service) {
		if (err) {
			callback(err);
			return;
		}

		callback(null, [{
			method: service.IPv4.Method,
			ipaddr: service.IPv4.Address,
			netmask: service.IPv4.Netmask,
			gateway: service.IPv4.Gateway,
			dns: '123'
		}]);
	});
};

Network.prototype.save = function(opts, settings, callback) {
	var self = this;

	// TODO: support multiple network interfaces
	switch(settings.method) {
	case 'dhcp':
		netSettings = [
			{
				method: settings.method
			}
		];
		break;

	case 'static':
		netSettings = [
			{
				method: settings.method,
				ipaddr: settings.ipaddr,
				netmask: settings.netmask,
				gateway: settings.gateway,
				dns: settings.dns
			}
		];
		break;

	case 'pppoe':
		break;
	}

	callback(null, netSettings);
};

module.exports = {
	type: 'engine',
	engine_name: 'Network',
	prototype: Network
};
