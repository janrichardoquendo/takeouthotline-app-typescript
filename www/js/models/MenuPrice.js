define(["require", "exports"], function (require, exports) {
    "use strict";
    var MenuPrice = (function () {
        function MenuPrice() {
            this.priceId = null;
            this.priceType = null;
            this.price = null;
            this.optType = "";
        }
        MenuPrice.prototype.setPriceId = function (id) {
            this.priceId = id;
        };
        MenuPrice.prototype.getPriceId = function () {
            return this.priceId;
        };
        MenuPrice.prototype.setPriceType = function (p_type) {
            this.priceType = p_type;
        };
        MenuPrice.prototype.getPriceType = function () {
            return this.priceType;
        };
        MenuPrice.prototype.setPrice = function (price) {
            this.price = price;
        };
        MenuPrice.prototype.getPrice = function () {
            return this.price;
        };
        MenuPrice.prototype.setOptPrice = function (opt_price) {
            this.optType = opt_price;
        };
        MenuPrice.prototype.getOptPrice = function () {
            return this.optType;
        };
        MenuPrice.prototype.toJSON = function () {
            var me = this;
            function build() {
                var data = {
                    price_id: me.getPriceId(),
                    price_type: me.getPriceType(),
                    price: me.getPrice(),
                    opt_type: me.getOptPrice()
                };
                return data;
            }
            return build();
        };
        return MenuPrice;
    }());
    exports.MenuPrice = MenuPrice;
});
//# sourceMappingURL=MenuPrice.js.map