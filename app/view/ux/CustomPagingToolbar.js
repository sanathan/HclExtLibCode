Ext.define('HclExtLib.view.ux.CustomPagingToolbar', {
    extend: 'Ext.toolbar.Paging',
    alias: 'widget.custompagingtoolbar',
	pagesperview:5,
	initComponent : function (){
		
		this.store.load();
		//	
		var store=this.getStore();
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
		
		////Initial pages links 
		
		 this.removeAll();
		 this.add(['Pages: ',combo,'-']);
         this.add('->');
         this.add({xtype: 'tbtext', itemId: 'displayItem'});
		
		var j=1;
		if (tPages>=this.pagesperview)
			j=this.pagesperview;
			else j=tPages;
		var initpos=3;	
		for (var i=1;i<=j;i++){
				var button=new Ext.button.Button({
									text: "Page "+i,
									page:i,
									href: "",
									handler: this.pageClickHandler
								});
				this.insert(initpos,button);
				initpos++;
			} ;

		this.callParent(arguments);
	},
	afterRender: function(){
		
		this.callParent(arguments);
	
    },
	pageClickHandler: function (btn) {
				this.getStore().loadPage(btn.page);				
			} 
			
});