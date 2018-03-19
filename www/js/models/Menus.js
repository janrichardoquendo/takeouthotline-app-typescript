define(["require", "exports"], function (require, exports) {
    "use strict";
    var Menus = (function () {
        function Menus() {
            this.menuiId = null;
            this.clientId = null;
            this.menuName = "";
            this.priceType = null;
            this.menuCategory = null;
            this.menuDescription = "";
            this.menuImage = "";
            this.isDeleted = null;
            this.updatedLast = null;
            this.updatedBy = null;
            this.menuPrice = new Array();
        }
        Menus.prototype.setMenuId = function (menuID) {
            this.menuiId = menuID;
        };
        Menus.prototype.getMenuId = function () {
            return this.menuiId;
        };
        Menus.prototype.setClientId = function (client) {
            this.clientId = client;
        };
        Menus.prototype.getClientId = function () {
            return this.clientId;
        };
        Menus.prototype.setMenuName = function (name) {
            this.menuName = name;
        };
        Menus.prototype.getMenuName = function () {
            return this.menuName;
        };
        Menus.prototype.setPriceType = function (type) {
            this.priceType = type;
        };
        Menus.prototype.getPriceType = function () {
            return this.priceType;
        };
        Menus.prototype.setMenuCategory = function (category) {
            this.menuCategory = category;
        };
        Menus.prototype.getMenuCategory = function () {
            return this.menuCategory;
        };
        Menus.prototype.setMenuDescription = function (desc) {
            this.menuDescription = desc;
        };
        Menus.prototype.getMenuDescription = function () {
            return this.menuDescription;
        };
        Menus.prototype.setMenuImage = function (image) {
            this.menuImage = image;
        };
        Menus.prototype.getMenuImage = function () {
            return this.menuImage;
        };
        Menus.prototype.setIsDeleted = function (is_deleted) {
            this.isDeleted = is_deleted;
        };
        Menus.prototype.getIsDeleted = function () {
            return this.isDeleted;
        };
        Menus.prototype.setUpdatedLast = function (updated_last) {
            this.updatedLast = updated_last;
        };
        Menus.prototype.getUpdatedLast = function () {
            return this.updatedLast;
        };
        Menus.prototype.setUpdatedBy = function (updated_by) {
            this.updatedBy = updated_by;
        };
        Menus.prototype.getUpdatedBy = function () {
            return this.updatedBy;
        };
        Menus.prototype.setMenuPrice = function (menu_price) {
            this.menuPrice = menu_price;
        };
        Menus.prototype.getMenuPrice = function () {
            return this.menuPrice;
        };
        Menus.prototype.addMenuPrice = function (value) {
            var found = false;
            var added = null;
            for (var i = 0; i < this.menuPrice.length; i++) {
                var item = this.menuPrice[i];
                if (value.getPriceId() == item.getPriceId()) {
                    found = true;
                }
            }
            if (!found) {
                this.menuPrice.push(value);
                added = value;
            }
            return added;
        };
        Menus.prototype.removeMenuPrice = function (value) {
            var found = false;
            var removeMenusPriceObj = null;
            var index_to_delete = null;
            for (var i = 0; i < this.menuPrice.length; i++) {
                var item = this.menuPrice[i];
                if (value.getPriceId() != item.getPriceId()) {
                }
                else {
                    index_to_delete = i;
                    removeMenusPriceObj = value;
                }
            }
            if (index_to_delete !== null) {
                this.menuPrice.splice(index_to_delete, 1);
            }
            return removeMenusPriceObj;
        };
        Menus.prototype.toJSON = function () {
            var me = this;
            function build() {
                var data = {
                    menu_id: me.getMenuId(),
                    client_id: me.getClientId(),
                    menu_name: me.getMenuName(),
                    price_type: me.getPriceType(),
                    menu_category: me.getMenuCategory(),
                    menu_description: me.getMenuDescription(),
                    menu_image: me.getMenuImage(),
                    is_deleted: me.getIsDeleted(),
                    updated_last: me.getUpdatedLast(),
                    updated_by: me.getUpdatedBy(),
                    menuprice: me.getMenuPrice()
                };
                return data;
            }
            return build();
        };
        return Menus;
    }());
    exports.Menus = Menus;
});
//# sourceMappingURL=Menus.js.map