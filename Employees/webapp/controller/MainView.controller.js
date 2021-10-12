sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, MessageToast) {
        "use strict";

        return Controller.extend("logaligroup.Employees.controller.MainView", {
            onInit: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView();
                var i18nBundle = oView.getModel("i18n").getResourceBundle();
                var oJSON = {
                    employeeId: "123456",
                    countryKey: "UK",
                    listCountry: [
                        {
                            key: "US",
                            text: i18nBundle.getText("countryUS")
                        },
                        {
                            key: "UK",
                            text: i18nBundle.getText("countryUK")
                        },
                        {
                            key: "ES",
                            text: i18nBundle.getText("countryES")
                        }
                    ]
                };
                //oJSONModel.setData(oJSON);
                oJSONModel.loadData("./localService/mockData/Employees.json", false);
                oView.setModel(oJSONModel);
            },
            onFilter: function(){
                var oJSON = this.getView().getModel().getData();
                var filters = [];
                if (oJSON.EmployeeId !== "") {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId ));
                }
                if (oJSON.CountryKey !== "") {
                    filters.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey ));
                }
                var oList = this.getView().byId("tableEmployee");

                var oBinding = oList.getBinding("items");
                oBinding.filter(filters);                
            },
            onClearFilter: function(){
                var oModel = this.getView().getModel();
                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");                
            },
            showPostalCode: function(oEvent){
                var objectContext = oEvent.getSource().getBindingContext().getObject();

                MessageToast.show(objectContext.PostalCode);
            }
            /*
            onValidate: function () {
                var inputEmployee = this.byId("inputEmployee");
                var valueEmployee = inputEmployee.getValue();
                if (valueEmployee.length === 6) {
                    //inputEmployee.setDescription("OK");
                    this.getView().byId("labelCountry").setVisible(true);
                    this.getView().byId("slCountry").setVisible(true);
                } else {
                    //inputEmployee.setDescription("Not OK");
                    this.getView().byId("labelCountry").setVisible(false);
                    this.getView().byId("slCountry").setVisible(false);
                }
            }*/
        });
    });
