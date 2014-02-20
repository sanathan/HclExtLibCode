Ext.define('HclExtLib.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
		'HclExtLib.view.CustomPagerBarGrid',
        'HclExtLib.view.cgrid'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            xtype:'custom-pager-grid',
            title: 'Grid with Custom Paging Bar'
        }]
    }]
});