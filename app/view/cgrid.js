Ext.define('HclExtLib.view.cgrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'cgrid',
    store: 'Companies',
    columnLines: true,
    height: 350,
    title: 'Complex Grid',
    viewConfig: {
        stripeRows: true
    },

    initComponent: function () {
        this.width = 675;
        this.columns = [{
                text     : 'Company',
                flex     : 1,
                sortable : false,
                dataIndex: 'company'
            }, {
                text: 'Stock Price',
                columns: [{
                    text     : 'Price',
                    width    : 75,
                    sortable : true,
                    renderer : 'usMoney',
                    dataIndex: 'price'
                }, {
                    text     : 'Change',
                    width    : 80,
                    sortable : true,
                    renderer :  function(val) {
                        if (val > 0) {
                            return '<span style="color:green;">' + val + '</span>';
                        } else if (val < 0) {
                            return '<span style="color:red;">' + val + '</span>';
                        }
                        return val;
                    },
                    dataIndex: 'change'
                }, {
                    text     : '% Change',
                    width    : 100,
                    sortable : true,
                    renderer : function(val) {
                        if (val > 0) {
                            return '<span style="color:green;">' + val + '</span>';
                        } else if (val < 0) {
                            return '<span style="color:red;">' + val + '</span>';
                        }
                        return val;
                    },
                    dataIndex: 'pctChange'
                }]
            }, {
                text     : 'Last Updated',
                width    : 115,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            }];

        this.callParent();
    }
});