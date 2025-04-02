sap.ui.define([ 
    "sap/ui/core/mvc/Controller", 
    "com/bootcamp/sapui5/projecto/utils/HomeHelper",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator" 
    ], (Controller, HomeHelper,Filter,FilterOperator) => { 
    "use strict"; 
    
    return Controller.extend("com.bootcamp.sapui5.projecto.controller.Home", { 
    onInit() { 
        this.oRouter = this.getOwnerComponent().getRouter();
    }, 
   
    onPress: async function() {
        let oFilter = [];
      

       let sValue = this.byId("inputID").getValue();
       let sValueName = this.byId("CompanyName").getValue();
     
       if (sValue)  {
        
            oFilter.push(new Filter("SupplierID", FilterOperator.EQ, sValue));
            
        }
        if (sValueName)  {
        
            oFilter.push(new Filter("CompanyName", FilterOperator.Contains, sValueName));
            
        }
        console.log("filter", oFilter)
        
        let oDatos = await HomeHelper.getDataSuppliers(oFilter);
        console.log("odatos",oDatos)
        await HomeHelper.setSupplierModel(this, oDatos[0].results);
        console.log("")
    },

    onItemPress: function(oEvent){
        let oSource = oEvent.getSource();

        let oDatos = oSource.getBindingContext("SupplierCollection").getObject();

        this.oRouter.navTo("detail", {
            SupplierID: oDatos.SupplierID
        });
    }

});
});