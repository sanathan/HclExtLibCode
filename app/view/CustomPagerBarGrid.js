Ext.define('HclExtLib.view.CustomPagerBarGrid', {
    extend: 'Ext.grid.Panel',
    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'HclExtLib.model.Company',
		'HclExtLib.data.DataSets'
    ],
    xtype: 'custom-pager-grid',
    pagesperview:5,   ////Config
    exampleTitle: 'Grid with Custom Pager',
    exampleDescription: '<p>This example demonstrates using a custom paging display.</p>',
	themeInfo: {
            width: 600,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85
        },    
    stripeRows: true,
    height: 320,
    frame: true,
    title: 'Grid with Custom Paging Bar',
    pageClickHandler: function (btn) {
			var pbar=btn.up('pagingtoolbar');
			pbar.getStore().loadPage(btn.page);				
			} ,
	changePageSet: function (btn){
			var combo=btn.up('pagingtoolbar').down('combobox');			
			var record = combo.getStore().getById(btn.page);
			combo.select(btn.page);
			combo.fireEvent('select', combo, [record]);
		},
    initComponent: function() {
	
        this.width = this.themeInfo.width;
        var store = new Ext.data.Store({
            model: 'HclExtLib.model.Company',
            remoteSort: true,
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true,
                data: HclExtLib.data.DataSets.company,
                reader: {
                    type: 'array'
                }
            }
        });
		store.load();
		
		var tCount=store.getTotalCount( );
		var tPages=Math.ceil(tCount/store.pageSize);
		var tPagerem=tPages;
		var combodata=[];
		
		var i=1,j=1;
		if (tPagerem>=this.pagesperview)
			j=this.pagesperview;
			else j=tPagerem;
			
		while (tPagerem>0){
			combodata.push( [eval (i) ,eval(i)+'-'+eval(j)]);						
			tPagerem=tPagerem-this.pagesperview;
			i+=this.pagesperview;
			if (tPagerem>=this.pagesperview)
			j+=this.pagesperview;
			else j+=tPagerem;
		}; 
		
        var combo = new Ext.form.ComboBox({
						  name : 'Pages:',
						  width: 150,
						  store: new Ext.data.ArrayStore({
							fields: ['id','text'],
							data  :combodata
						  }),
						  mode : 'local',
						  value: '15',
						  listWidth     : 150,
						  triggerAction : 'all',
						  displayField  : 'text',
						  valueField    : 'id',
						  editable      : false,
						  forceSelection: true
					});
		combo.select(1);	
		
		var bbar = new Ext.PagingToolbar({
						store:       store,
						displayInfo: true
						});
		////Initial pages links 
		
		 bbar.removeAll();
		 bbar.add(['Pages: ',combo,'-']);
         bbar.add('->');
         bbar.add({xtype: 'tbtext', itemId: 'displayItem'});
		
		var j=1;
		if (tPages>=this.pagesperview)
			j=this.pagesperview;
			else j=tPages;
		var initpos=3;	
		
		bbar.insert(initpos,new Ext.button.Button({
									text: "<<",
									page:-1,
									href: "",
									disabled: true,
									handler: this.changePageSet
								}));
		initpos++;						
		for (var i=1;i<=j;i++){
				var button=new Ext.button.Button({
									text: "Page "+i,
									page:i,
									href: "",
									handler: this.pageClickHandler
								});
				bbar.insert(initpos,button);
				initpos++;
			} ;
		if (tPages>this.pagesperview){
			bbar.insert(initpos,new Ext.button.Button({
									text: ">>",
									page:this.pagesperview+1,
									href: "",
									handler: this.changePageSet
								}));
		};
		
		combo.on('select', function(combo, record) {
		  var pageNo = parseInt(record[0].get('id'));
		  store.loadPage( pageNo );
		 
		  var pbar=combo.up('pagingtoolbar');
		  var pbarbuttons=Ext.ComponentQuery.query('button[page]',pbar);
		  Ext.each(pbarbuttons, function removeButton(button){
		  pbar.remove(button);
		  });
		  var pos=3; 
		  var disbalePrev=false, disableNext=false;
		  if (pageNo-this.pagesperview<1) disbalePrev=true;
		  if (pageNo+this.pagesperview>tPages) disableNext=true ;
		  pbar.insert(pos,new Ext.button.Button({
									text: "<<",
									page:pageNo-this.pagesperview,
									href: "",
									disabled: disbalePrev,
									handler: this.changePageSet
								}));
		  pos++;
		  
		  for (var i=pageNo;i<(pageNo+this.pagesperview);i++){
		  if(i<=tPages){
			var button=new Ext.button.Button({
								text: "Page "+i,
								page:i,
								href: "",
								handler: this.pageClickHandler
							});
			pbar.insert(pos,button);
			pos++;
			}
		  };
		  bbar.insert(pos,new Ext.button.Button({
							text: ">>",
							page:this.pagesperview+pageNo,
							href: "",
							disabled: disableNext,
							handler: this.changePageSet
					}));
			pos++;
		}, this); 
		
        Ext.apply(this, {
            store: store,
            columns: [{
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
            }],
			bbar:bbar
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
