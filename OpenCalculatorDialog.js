define([
        'dojo/_base/declare',
        'ecm/widget/dialog/BaseDialog',
        'ecm/model/Request',
        'dojo/text!./templates/OpenCalculatorDialog.html'
        ],
		function(declare,BaseDialog,Request,template){
	return declare('samplePluginDojo.OpenCalculatorDialog',[BaseDialog],{
		
		contentString:template,
		widgetsInTemplate:true,
		
		postCreate:function(){
			this.inherited(arguments);
			this.setResizable(true);
			this.setMaximized(false);
			this.setTitle("Calculator Dialog");
			this.addButton("Result","getResult",false,true);
		},
		show:function(){
			this.inherited("show",[])
		},
		getResult:function(){
			this.errorSpan.innerHTML = "";
			var validateFlag = this.validateFields();
			if(validateFlag){
				console.log("Ready for Services");
				var firstNumber = this.firstNumber.value;
				var secondNumber = this.secondNumber.value;
				var operator = this.operator.value;
				
				console.log("Ready for Services");
				
				var serviceParams = new Object();
				
				servieParams.firstNumber = firstNumber;
				serviceParams.secondNumber = secondNumber;
				serviceParams.operator = operator;
				
				var self = this;
				
				Request.invokePluginService("SamplePlugin","CalculatorService",{
					requestParams:serviceParams,
					requestCompleteCallback: function(response){
						if(response){
							if(response.result == "success"){
								self.result.value = response.data;
							}else{
								self.errorSpan.innerHTML = response.data;
							}
						}else{
							self.errorSpan.innerHTML = "Service Failure";
						}
					}
				});
			}
		},
		validateFields: function(){
			var validation = true;
			console.log("Ready for Services");
			var firstNumber = this.firstNumber.value;
			var secondNumber = this.secondNumber.value;
			var operator = this.operator.value;
			if(firstNumber.length == 0){
				validation = this.displayError("First Number is empty, please enter numeric value");
			}else if(secondNumber.length == 0){
				validation = this.displayError("Second Number is empty, please enter numeric value");
			}else if(operator.length !=1){
				validation = this.displayError("Operator is empty, please enter numeric value");
			}
			return validation;
		},
		displayError:function(msg){
			this.errorSpan.innerHTML = msg;
			return false;
		}
	});
})