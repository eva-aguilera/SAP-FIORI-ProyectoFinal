sap.ui.define([
    "com/bootcamp/sapui5/projecto/utils/HomeService",
    "sap/ui/model/json/JSONModel"
], function (HomeService,JSONModel) {
    "use strict";
    return {
        init: function (oNorthwindModel) {
            this._oNorthwindModel = oNorthwindModel;
        },

        getDataSuppliers: async function (oFilters=[]) {
            //let oFilters = [];
            return HomeService.readSuppliers(this._oNorthwindModel, oFilters);
        },
        setSupplierModel: async function (oController, oDatos) {
            let oListModel =
                oController.getOwnerComponent().getModel('SupplierCollection');
            if (!oListModel) {
                const oModel = new JSONModel([]);
                oModel.setSizeLimit(1000000);
                oController.getOwnerComponent().setModel(oModel, "SupplierCollection");
                oListModel =
                    oController.getOwnerComponent().getModel('SupplierCollection');
            }
            oListModel.setData(oDatos);
        },
        setDefaultModelStore: async function (oComponent){
            const oFilters = []
            
        const suppliers = await HomeService.readSuppliers(this._oNorthwindModel, oFilters, '/Suppliers')
            console.log("supliers",suppliers)
        oComponent.setModel(new JSONModel(
                [...suppliers[0].results]
                
             ), "SupplierCollection")

            const data = oComponent.getModel('SupplierCollection').getData()
            console.log(data, 'se setea bien la data')
            return data
            
        },

    };
});