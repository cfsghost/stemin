enyo.kind({
	name: 'Stemin.Network.Panel',
	kind: 'Scroller',
	fit: true,
	classes: 'enyo-fit',
	touch: true,
	components: [
		{
			classes: 'stemin-system-panel',
			components: [
				{
					kind: 'onyx.Groupbox',
					components: [
						{ kind: 'onyx.GroupboxHeader', content: 'Network Settings' },
						{
							classes: 'onyx-toolbar-inline',
							components: [
								{ classes: 'field-label', content: 'Method' },
								{
									kind: 'onyx.PickerDecorator',
									fit: true,
									onChange: 'methodSelected',
									style: 'margin: 0px;',
									components: [
										{},
										{
											name: 'method',
											kind: 'onyx.Picker',
											components: [
												{ name: 'method_dhcp', value: 'dhcp', content: 'DHCP', active: true },
												{ name: 'method_static', value: 'static', content: 'Static IP' }
												//{ name: 'method_pppoe', value: 'pppoe', content: 'PPPoE' }
											]
										}
									]
								}
							]
						},
						{
							name: 'field_ipaddr',
							kind: 'onyx.InputDecorator',
							layoutKind: 'FittableColumnsLayout',
							showing: false,
							fit: true,
							components: [
								{ classes: 'field-label', content: 'IP Address' },
								{ name: 'ipaddr', kind: 'onyx.Input', classes: 'field-inputbox', fit: true }
							]
						},
						{
							name: 'field_netmask',
							kind: 'onyx.InputDecorator',
							layoutKind: 'FittableColumnsLayout',
							showing: false,
							fit: true,
							components: [
								{ classes: 'field-label', content: 'Netmask' },
								{ name: 'netmask', kind: 'onyx.Input', classes: 'field-inputbox', fit: true }
							]
						},
						{
							name: 'field_gateway',
							kind: 'onyx.InputDecorator',
							layoutKind: 'FittableColumnsLayout',
							showing: false,
							fit: true,
							components: [
								{ classes: 'field-label', content: 'Gateway' },
								{ name: 'gateway', kind: 'onyx.Input', classes: 'field-inputbox', fit: true }
							]
						},
						{
							name: 'field_dns',
							kind: 'onyx.InputDecorator',
							layoutKind: 'FittableColumnsLayout',
							showing: false,
							fit: true,
							components: [
								{ classes: 'field-label', content: 'DNS Server' },
								{ name: 'dns', kind: 'onyx.Input', classes: 'field-inputbox', fit: true }
							]
						}
					]
				},
				{ tag: 'br' },
				{
					kind: 'FittableColumns',
					components: [
						{ fit: true },
						{
							kind: 'onyx.Button',
							classes: 'onyx-dark',
							content: 'Cancel'
						},
						{
							kind: 'onyx.Button',
							classes: 'onyx-blue',
							ontap: 'save',
							content: 'Save'
						}
					]
				}
			]
		}
	],
	load: function() {
		var self = this;

		var network = App.Engine('Network');
		network.getSettings(null, function(err, settings) {

			if (!settings.length)
				return;

			// TODO: support multiple network interfaces
			var iface = settings[0];
			switch(iface.method) {
			case 'dhcp':
				self.$.method.setSelected(self.$.method_dhcp);

				// Disallow modifying
				self.$.ipaddr.disabled = true;
				self.$.ipaddr.render();
				self.$.netmask.disabled = true;
				self.$.netmask.render();
				self.$.gateway.disabled = true;
				self.$.gateway.render();
				self.$.dns.disabled = true;
				self.$.dns.render();

				// Fill input boxes
				self.$.ipaddr.setValue(iface.ipaddr);
				self.$.netmask.setValue(iface.netmask);
				self.$.gateway.setValue(iface.gateway);
				self.$.dns.setValue(iface.dns);

				// Show off
				self.$.field_ipaddr.show();
				self.$.field_netmask.show();
				self.$.field_gateway.show();
				self.$.field_dns.show();
				break;

			case 'static':
				self.$.method.setSelected(self.$.method_static);

				// Disallow modifying
				self.$.ipaddr.disabled = false;
				self.$.ipaddr.render();
				self.$.netmask.disabled = false;
				self.$.netmask.render();
				self.$.gateway.disabled = false;
				self.$.gateway.render();
				self.$.dns.disabled = false;
				self.$.dns.render();

				// Fill input boxes
				self.$.ipaddr.setValue(iface.ipaddr);
				self.$.netmask.setValue(iface.netmask);
				self.$.gateway.setValue(iface.gateway);
				self.$.dns.setValue(iface.dns);

				// Show off
				self.$.field_ipaddr.show();
				self.$.field_netmask.show();
				self.$.field_gateway.show();
				self.$.field_dns.show();
				break;

			case 'pppoe':
				self.$.method.setSelected(self.$.method_pppoe);
				break;
			}

		});
	},
	methodSelected: function(inSender, inEvent) {

		// Components isn't initialized yet
		if (!this.$.ipaddr)
			return;

		setTimeout(function() {
			switch(inEvent.selected.value) {
			case 'dhcp':

				// Disallow modifying
				this.$.ipaddr.disabled = true;
				this.$.ipaddr.render();
				this.$.netmask.disabled = true;
				this.$.netmask.render();
				this.$.gateway.disabled = true;
				this.$.gateway.render();
				this.$.dns.disabled = true;
				this.$.dns.render();

				this.$.field_ipaddr.show();
				this.$.field_netmask.show();
				this.$.field_gateway.show();
				this.$.field_dns.show();
				break;

			case 'static':

				// Disallow modifying
				this.$.ipaddr.disabled = false;
				this.$.ipaddr.render();
				this.$.netmask.disabled = false;
				this.$.netmask.render();
				this.$.gateway.disabled = false;
				this.$.gateway.render();
				this.$.dns.disabled = false;
				this.$.dns.render();

				this.$.field_ipaddr.show();
				this.$.field_netmask.show();
				this.$.field_gateway.show();
				this.$.field_dns.show();
				break;

			case 'pppoe':
				this.$.field_ipaddr.hide();
				this.$.field_netmask.hide();
				this.$.field_gateway.hide();
				this.$.field_dns.hide();
				break;
			}
		}.bind(this), 200);
	},
	save: function() {

		var network = App.Engine('Network');
		switch(this.$.method.selected.value) {
		case 'dhcp':
			network.save(null, {
				method: this.$.method.selected.value
			}, function() {});
			break;

		case 'static':
			network.save(null, {
				method: this.$.method.selected.value,
				ipaddr: this.$.ipaddr.getValue(),
				netmask: this.$.netmask.getValue(),
				gateway: this.$.gateway.getValue(),
				dns: this.$.dns.getValue()
			}, function() {});
			break;

		case 'pppoe':
			break;
		}
	}
});
