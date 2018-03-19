define(["require", "exports"], function (require, exports) {
    "use strict";
    var Customer = (function () {
        function Customer() {
            this.id = null;
        }
        Customer.prototype.setId = function (id) {
            this.id = id;
        };
        Customer.prototype.getId = function () {
            return this.id;
        };
        Customer.prototype.setFirstName = function (first_name) {
            this.first_name = first_name;
        };
        Customer.prototype.getFirstName = function () {
            return this.first_name;
        };
        Customer.prototype.setLastName = function (last_name) {
            this.last_name = last_name;
        };
        Customer.prototype.getLastName = function () {
            return this.last_name;
        };
        Customer.prototype.setAddress = function (address) {
            this.address = address;
        };
        Customer.prototype.getAddress = function () {
            return this.address;
        };
        Customer.prototype.setAddress2 = function (address2) {
            this.address2 = address2;
        };
        Customer.prototype.getAddress2 = function () {
            return this.address2;
        };
        Customer.prototype.setPhone = function (phone) {
            this.phone = phone;
        };
        Customer.prototype.getPhone = function () {
            return this.phone;
        };
        Customer.prototype.setPostalCode = function (postal) {
            this.postal_code = postal;
        };
        Customer.prototype.getPostalCode = function () {
            return this.postal_code;
        };
        Customer.prototype.setRemarks = function (remarks) {
            this.remarks = remarks;
        };
        Customer.prototype.getRemarks = function () {
            return this.remarks;
        };
        Customer.prototype.setStatus = function (status) {
            this.status = status;
        };
        Customer.prototype.getStatus = function () {
            return this.status;
        };
        Customer.prototype.setEmail = function (email) {
            this.email = email;
        };
        Customer.prototype.getEmail = function () {
            return this.email;
        };
        Customer.prototype.setNameTitle = function (name_title) {
            this.name_title = name_title;
        };
        Customer.prototype.getNameTitle = function () {
            return this.name_title;
        };
        Customer.prototype.setMyPass = function (mypass) {
            this.mypass = mypass;
        };
        Customer.prototype.getMyPass = function () {
            return this.mypass;
        };
        Customer.prototype.setCity = function (city) {
            this.city = city;
        };
        Customer.prototype.getCity = function () {
            return this.city;
        };
        Customer.prototype.toJSON = function () {
            var me = this;
            function build() {
                var data = {
                    id: me.getId(),
                    first_name: me.getFirstName(),
                    last_name: me.getLastName(),
                    address: me.getAddress(),
                    address2: me.getAddress2(),
                    phone: me.getPhone(),
                    postal_code: me.getPostalCode(),
                    remarks: me.getRemarks(),
                    status: me.getStatus(),
                    email: me.getEmail(),
                    mypass: me.getMyPass(),
                    name_title: me.getNameTitle(),
                    city: me.getCity()
                };
                return data;
            }
            return build();
        };
        return Customer;
    }());
    exports.Customer = Customer;
});
//# sourceMappingURL=Customer.js.map