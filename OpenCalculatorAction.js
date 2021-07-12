define([
        "dojo/_base/declare",
        "ecm/model/Action",
        "samplePluginDojo/OpenCalculatorDialog"
        ],
		function(declare,Action,OpenCalculatorDialog){
	return declare("samplePluginDojo.OpenCalculatorAction",[Action],{
		
		isEnabled:function(repository,listType,items,teamspace,resultSet){
			return true;
		},
		isVisible:function(repository,listType){
			return true;
		},
		
		performAction:function(repository,itemList,callback,teamspace,resultSet,parameterMap){
			var dialog = new OpenCalculatorDialog();
			dialog.show("I have open calculator dialog");
		}
	});
	
})