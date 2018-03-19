define(["require", "exports"], function (require, exports) {
    "use strict";
    var Order = (function () {
        function Order() {
            this.orders = new Array();
        }
        Order.prototype.setTotalCost = function (cost) {
            this.totalCost = cost;
        };
        Order.prototype.getTotalCost = function () {
            return this.totalCost;
        };
        Order.prototype.setCustomer = function (customer) {
            this.customer = customer;
        };
        Order.prototype.getCustomer = function () {
            return this.customer;
        };
        Order.prototype.addOrder = function (item) {
            this.orders.push(item);
        };
        Order.prototype.getOrdersItem = function () {
            return this.orders;
        };
        Order.prototype.setClient = function (client) {
            this.client = client;
        };
        Order.prototype.getClient = function () {
            return this.client;
        };
        Order.prototype.toJSON = function () {
            var me = this;
            function build() {
                var data = {
                    customer: me.getCustomer(),
                    orders: me.getOrdersItem(),
                    client: me.getClient(),
                    total: me.getTotalCost()
                };
                return data;
            }
            return build();
        };
        return Order;
    }());
    exports.Order = Order;
});
//# sourceMappingURL=Order.js.map