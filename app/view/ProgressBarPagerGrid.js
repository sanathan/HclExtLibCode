Ext.define('HclExtLib.view.ProgressBarPagerGrid', {
    extend: 'Ext.grid.Panel',
    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'HclExtLib.view.ux.SlidingPager',
        'HclExtLib.model.Company',
		'HclExtLib.data.DataSets'
    ],
    xtype: 'progress-bar-pager',
    
    //<example>
    exampleTitle: 'Progress Bar Pager Extension',
    exampleDescription: '<p>This example demonstrates using a custom paging display.</p>',
	themeInfo: {
            width: 600,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85
        },
    //</example>
    
    stripeRows: true,
    height: 320,
    frame: true,
    title: 'Progress Bar Pager',
    
    initComponent: function() {
        this.width = this.themeInfo.width;
        
        var store = new Ext.data.Store({
            model: 'HclExtLib.model.Company',
            remoteSort: true,
            pageSize: 10,
            proxy: {
                type: 'memory',
                enablePaging: true,
                data: HclExtLib.data.DataSets.company,
                reader: {
                    type: 'array'
                }
            }
        });
        
        Ext.apply(this, {
            store: store,
            columns: [{ 
                text: 'Company',
                sortable: true,
                dataIndex: 'company',
                flex: 1
            },{
                text: 'Price',
                sortable: true,
                renderer: Ext.util.Format.usMoney,
                dataIndex: 'price',
                width: 75
            },{
                text: 'Change',
                sortable: true,
                renderer: this.changeRenderer,
                dataIndex: 'change',
                width: 80
            },{
                text: '% Change',
                sortable: true,
                renderer: this.pctChangeRenderer,
                dataIndex: 'pctChange',
                width: this.themeInfo.percentChangeColumnWidth
            },{
                text: 'Last Updated',
                sortable: true,
                dataIndex: 'lastChange',
                width: this.themeInfo.lastUpdatedColumnWidth,
                renderer: Ext.util.Format.dateRenderer('m/d/Y')
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: store,
                displayInfo: true,
                plugins: new HclExtLib.view.ux.SlidingPager()
            }
        });
        this.callParent();
    },
    
    afterRender: function(){
        this.callParent(arguments);
        this.getStore().load();
    },
    
    changeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },
    
    pctChangeRenderer: function(val){
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }
});
