enyo.kind({
	name: 'Stemin.Panel',
	kind: 'Panels',
	classes: 'panel',
	fit: true,
	arrangerKind: 'CollapsingArranger',
	realtimeFit: true,
	wrap: false,
	data: [
		{
			id: 'network',
			icon: 'settings-4',
			name: 'Network',
			tooltip: 'Network settings'
		}
	],
	components: [
		{
			name: 'menu',
			kind: 'Stemin.Menu',
			classes: 'enyo-fit',
			fit: true,
			style: 'width: 200px;',
			touch: true,
			onSelected: 'onSelected',
			onSetupItem: 'onSetupItem'
		},
		{
			name: 'panels',
			kind: 'Panels',
			classes: 'panel',
			arrangerKind: 'CardSlideInArranger',
			fit: true,
			draggable: false,
			realtimeFit: true,
			wrap: false,
			components: [
				{
					kind: 'Stemin.Network.Panel',
				}
			]
		}
	],
	rendered: function() {
		this.inherited(arguments);
		if (this.data.length) {
			this.$.menu.setCount(this.data.length);
			this.$.menu.reset();
			this.$.menu.select(0);

			if (this.$.panels.controls[0].load)
				this.$.panels.controls[0].load();
		}
	},
	onSelected: function(inSender, inEvent) {
		var i = inEvent.index;

		this.$.panels.setIndex(i);

		if (this.$.panels.controls[i].load)
			this.$.panels.controls[i].load();
	},
	onSetupItem: function(inSender, inEvent) {
		var menu = inSender;
		var i = inEvent.index;

		var item = this.data[i];
		menu.$.item.addRemoveClass("onyx-selected", menu.isSelected(i));
		menu.$.label.setContent(item.name);
		menu.$.icon.src = '/img/dark-icons/' + item.icon + '.png';
		menu.$.icon.srcChanged();
	},
});
