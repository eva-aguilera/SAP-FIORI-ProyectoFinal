sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/projecto/utils/HomeHelper",
    "sap/ui/core/Fragment"
], (Controller, HomeHelper, MessageToast, Fragment) => {
    "use strict";
    return Controller.extend("com.bootcamp.sapui5.projecto.controller.Detail", {
        onInit() {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            // Obtener el ProductID de la URL y enlazar el contexto
            let sSupplierID = oEvent.getParameter("arguments").SupplierID;


            this.getView().bindElement({
                path: "/Suppliers(" + sSupplierID + ")",
                parameters: {
                    expand: "Products"
                }
            });
        },
        //los dialogos funcionan pero se necesita recargar los datos,
        //ya que no se logro cerrar el dialogo por completo
        //buscar alguna forma de como validar que el dialogo se cerro completamente
        AbrirDialogo: function (oEvent) {
            let oView = this.getView();
            let oSelectedItem = oEvent.getSource();
            let oSelectedProduct = oSelectedItem.getBindingContext()?.getObject();

            let sPath = "/Products(" + oSelectedProduct.ProductID + ")";
            console.log("Binding Path generado:", sPath);

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.bootcamp.sapui5.projecto.view.fragments.ProductsTable",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.bindElement({ path: sPath });
                    oDialog.open();
                    return oDialog;
                });
            }

            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        CerrarDialogo: function () {
            if (this._pDialog) {
                this._pDialog.then(function (oDialog) {
                    oDialog.close();
                });
            }
        },


        Dialog: function () {
            var oView = this.getView();
            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.bootcamp.sapui5.projecto.view.fragments.Form",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        closeDialog: function () {
            if (this._pDialog) {
                this._pDialog.then(function (oDialog) {
                    oDialog.close();
                });
            }
        },
//esta funcion guarda el nuevo producto dentro de un array
//intentar agregar el array al modelo para luego mostrarlo?
        Guardarinput: async function () {
            var nombreInput = this.byId("nombre").getValue();
            var descripcionTextArea = this.byId("descripcion").getValue();
            var categoriaSelect = this.byId("comboboxID").getSelectedKey();
            var precioInput = this.byId("precio").getValue();
            var idInput = this.byId("id").getValue();
          
            if (!nombreInput || !descripcionTextArea || !categoriaSelect || !precioInput || !idInput) {
              sap.m.MessageBox.error("Por favor, complete todos los campos.");
              return;
            } else {
             
              let producto = []; 
              
              let nuevoProducto = {
                nombre: nombreInput,
                descripcion: descripcionTextArea,
                categoria: categoriaSelect,
                precio: precioInput,
                id: idInput
              };
          
             
              producto.push(nuevoProducto);
          
             
              console.log(producto);
          
             
              this.byId("nombre").setValue("");
              this.byId("descripcion").setValue("");
              this.byId("comboboxID").setSelectedKey("");
              this.byId("precio").setValue("");
              this.byId("id").setValue("");
          
            
              sap.m.MessageBox.success("Datos guardados correctamente.");
            }
          }
            













    });
});
