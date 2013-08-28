enyo.kind({
	name: 'Stemin.Menu',
	kind: 'List',
	classes: 'enyo-unselectable stemin-menu',
	reorderable: true,
	components: [
		{
			name: 'item',
			classes: 'stemin-menu-item',
			ontap: 'tapItem',
			components: [
				{ name: 'icon', kind: 'onyx.Icon' },
				{ name: 'label', classes: 'stemin-menu-item-label' }
			]
		}
	],
	events: {
		onSelected: ''
	},
	tapItem: function(inSender, inEvent) {

		// Fire event
		this.doSelected({ index: inEvent.index });
	}
});
