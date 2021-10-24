 sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
 return Controller.extend("logaligroup.Employees.controller.Main", {
 onInit: function () {
    var oView = this.getView();
        var i18nBundle = oView.getModel("i18n").getResourceBundle();

        var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
        oJSONModelEmpl.loadData("./localService/mockData/Employees.json", false);
        oView.setModel(oJSONModelEmpl, "jsonEmployees");

        var oJSONModelCountries = new sap.ui.model.json.JSONModel();
        oJSONModelCountries.loadData("./localService/mockData/Countries.json", false);
        oView.setModel(oJSONModelCountries, "jsonCountries");

        var oJSONModelLayout = new sap.ui.model.json.JSONModel();
        oJSONModelLayout.loadData("./localService/mockData/Layout.json", false);
        oView.setModel(oJSONModelLayout, "jsonLayout");

        var oJsonModelConfig = new sap.ui.model.json.JSONModel({
            visibleID: true,
            visibleName: true,
            visibleCountry: true,
            visibleCity: false,
            visibleBtnShowCity: true,
            visibleBtnHideCity: false
        });
        oView.setModel(oJsonModelConfig, "jsonModelConfig");
        this._bus = sap.ui.getCore().getEventBus();
        this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this);                  
    },
    showEmployeeDetails: function(category, nameEvent, path) {
        var detailView = this.getView().byId("detailEmployeeView");
        detailView.bindElement("jsonEmployees>" + path);
        this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded");
    }    
 });
});                