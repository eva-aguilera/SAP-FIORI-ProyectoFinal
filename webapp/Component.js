sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/bootcamp/sapui5/projecto/model/models",
    "com/bootcamp/sapui5/projecto/utils/HomeHelper" 
], (UIComponent, models,HomeHelper) => {
    "use strict";

    return UIComponent.extend("com.bootcamp.sapui5.projecto.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
            this.setInitModel();
        },
        setInitModel:async function () { 
            HomeHelper.init(this.getModel()); 
            await HomeHelper.setDefaultModelStore(this) 
            }
            
    });
});