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
                var oView = this.getView();
                var i18nBundle = oView.getModel("i18n").getResourceBundle();

                var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
                oJSONModelEmpl.loadData("./localService/mockData/Employees.json", false);
                oView.setModel(oJSONModelEmpl, "jsonEmployees");

                var oJSONModelCountries = new sap.ui.model.json.JSONModel();
                oJSONModelCountries.loadData("./localService/mockData/Countries.json", false);
                oView.setModel(oJSONModelCountries, "jsonCountries");

                var oJsonModelConfig = new sap.ui.model.json.JSONModel({
                    visibleID: true,
                    visibleName: true,
                    visibleCountry: true,
                    visibleCity: false,
                    visibleBtnShowCity: true,
                    visibleBtnHideCity: false
                });
                oView.setModel(oJsonModelConfig, "jsonModelConfig");                                
            },
            onFilter: function(){
                var oJSONCountries = this.getView().getModel("jsonCountries").getData();
                var filters = [];
                if (oJSONCountries.EmployeeId !== "") {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountries.EmployeeId ));
                }
                if (oJSONCountries.CountryKey !== "") {
                    filters.push(new Filter("Country", FilterOperator.EQ, oJSONCountries.CountryKey ));
                }
                var oList = this.getView().byId("tableEmployee");

                var oBinding = oList.getBinding("items");
                oBinding.filter(filters);                
            },
            onClearFilter: function(){
                var oModel = this.getView().getModel("jsonCountries");
                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");                
            },
            showPostalCode: function(oEvent){
                var objectContext = oEvent.getSource().getBindingContext("jsonEmployees").getObject();

                MessageToast.show(objectContext.PostalCode);
            },
            showOrders: function(oEvent){
                var ordersTable = this.getView().byId("ordersTable");
                ordersTable.destroyItems();
                var itemPressed = oEvent.getSource();
                var oContext = itemPressed.getBindingContext("jsonEmployees");
                var objectContext = oContext.getObject();
                var orders = objectContext.Orders;
                var ordersItems = [];
                
                for (var i in orders) {
                    ordersItems.push(new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Label({ text: orders[i].OrderID }),
                                new sap.m.Label({ text: orders[i].Freight }),
                                new sap.m.Label({ text: orders[i].ShipAddress })
                            ]  
                    }));
                }
                var newTable = new sap.m.Table({ 
                    width: "auto",
                    columns: [
                                new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>orderID}" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>freight}" }) }),
                                new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>shipAddress}" }) })
                            ],
                    items: ordersItems
                    }).addStyleClass("sapUiSmallMargin");
                ordersTable.addItem(newTable); 
            },
            onShowCity: function() {
                var oJsonModelConfig = this.getView().getModel("jsonModelConfig");
                oJsonModelConfig.setProperty("/visibleCity", true);
                oJsonModelConfig.setProperty("/visibleBtnShowCity", false);
                oJsonModelConfig.setProperty("/visibleBtnHideCity", true);
            },            
            onHideCity: function() {
                var oJsonModelConfig = this.getView().getModel("jsonModelConfig");
                oJsonModelConfig.setProperty("/visibleCity", false);
                oJsonModelConfig.setProperty("/visibleBtnShowCity", true);
                oJsonModelConfig.setProperty("/visibleBtnHideCity", false);
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
