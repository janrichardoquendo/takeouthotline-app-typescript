define(["require", "exports"], function (require, exports) {
    "use strict";
    var Client = (function () {
        function Client() {
            this.client_id = null;
            this.title = "";
            this.firstName = "";
            this.lastName = "";
            this.middleName = "";
            this.nameResto = "";
            this.description = "";
            this.postcode = "";
            this.address = "";
            this.website = "";
            this.contact = "";
            this.phone = "";
            this.logo = "";
            this.town = "";
            this.category = new Array();
        }
        Client.prototype.setClientId = function (id) {
            this.client_id = id;
        };
        Client.prototype.getClientId = function () {
            return this.client_id;
        };
        Client.prototype.setTitle = function (title) {
            this.title = title;
        };
        Client.prototype.getTitle = function () {
            return this.title;
        };
        Client.prototype.setTown = function (town) {
            this.town = town;
        };
        Client.prototype.getTown = function () {
            return this.town;
        };
        Client.prototype.setFirstName = function (fname) {
            this.firstName = fname;
        };
        Client.prototype.getFirstName = function () {
            return this.firstName;
        };
        Client.prototype.setLname = function (lname) {
            this.lastName = lname;
        };
        Client.prototype.getLname = function () {
            return this.lastName;
        };
        Client.prototype.setMname = function (mname) {
            this.middleName = mname;
        };
        Client.prototype.getMname = function () {
            return this.middleName;
        };
        Client.prototype.setNameResto = function (resto) {
            this.nameResto = resto;
        };
        Client.prototype.getNameResto = function () {
            return this.nameResto;
        };
        Client.prototype.setDesc = function (desc) {
            this.description = desc;
        };
        Client.prototype.getDes = function () {
            return this.description;
        };
        Client.prototype.setPostCode = function (post_code) {
            this.postcode = post_code;
        };
        Client.prototype.getPostCode = function () {
            return this.postcode;
        };
        Client.prototype.setAddress = function (address) {
            this.address = address;
        };
        Client.prototype.getAddress = function () {
            return this.address;
        };
        Client.prototype.setAddress2 = function (address2) {
            this.address2 = address2;
        };
        Client.prototype.getAddress2 = function () {
            return this.address2;
        };
        Client.prototype.setCountry = function (country) {
            this.country = country;
        };
        Client.prototype.getCountry = function () {
            return this.country;
        };
        Client.prototype.setCity = function (city) {
            this.city = city;
        };
        Client.prototype.getCity = function () {
            return this.city;
        };
        Client.prototype.setWebsite = function (web) {
            this.website = web;
        };
        Client.prototype.getWebsite = function () {
            return this.website;
        };
        Client.prototype.setLogo = function (logo) {
            this.logo = logo;
        };
        Client.prototype.getLogo = function () {
            return this.logo;
        };
        Client.prototype.setContact = function (contact) {
            this.contact = contact;
        };
        Client.prototype.getContact = function () {
            return this.contact;
        };
        Client.prototype.setPhone = function (phone) {
            this.phone = phone;
        };
        Client.prototype.getPhone = function () {
            return this.phone;
        };
        Client.prototype.setCategory = function (value) {
            this.category = value;
        };
        Client.prototype.getCategory = function () {
            return this.category;
        };
        Client.prototype.addCategory = function (value) {
            var found = false;
            var added = null;
            for (var i = 0; i < this.category.length; i++) {
                var item = this.category[i];
                if (value.getCategoryId() == item.getCategoryId()) {
                    found = true;
                }
            }
            if (!found) {
                this.category.push(value);
                added = value;
            }
            return added;
        };
        Client.prototype.removeCategory = function (value) {
            var found = false;
            var categoryObj = null;
            var index_to_delete = null;
            for (var i = 0; i < this.category.length; i++) {
                var item = this.category[i];
                if (value.getCategoryId() != item.getCategoryId()) {
                }
                else {
                    index_to_delete = i;
                    categoryObj = value;
                }
            }
            if (index_to_delete !== null) {
                this.category.splice(index_to_delete, 1);
            }
            return categoryObj;
        };
        Client.prototype.toJSON = function () {
            var me = this;
            function build() {
                var data = {
                    client_id: me.getClientId(),
                    title: me.getTitle(),
                    firstname: me.getFirstName(),
                    lastname: me.getLname(),
                    middlename: me.getMname(),
                    name_resto: me.getNameResto(),
                    description: me.getDes(),
                    postcode: me.getPostCode(),
                    address: me.getAddress(),
                    address2: me.getAddress2(),
                    city: me.getCity(),
                    country: me.getCountry(),
                    website: me.getWebsite(),
                    contact: me.getContact(),
                    phone: me.getPhone(),
                    logo: me.getLogo(),
                    category: me.getCategory()
                };
                return data;
            }
            return build();
        };
        return Client;
    }());
    exports.Client = Client;
});
//# sourceMappingURL=Client.js.map