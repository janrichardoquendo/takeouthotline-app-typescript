define(["require", "exports", "../models/Customer", "../models/Client", "../models/Category", "../models/Menus", "../models/MenuPrice", "../models/Order"], function (require, exports, Customer_1, Client_1, Category_1, Menus_1, MenuPrice_1, Order_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var customerObject = new Customer_1.Customer();
    function SearchPostalCodeController($scope, $http, $modal, ngCart, $rootScope) {
        $scope.isSagePaySelected = false;
        $scope.isLoggedIn = false;
        $scope.isClickedLoginFirstTime = false;
        $rootScope.customerNameShow = null;
        $scope.openPayment = false;
        $rootScope.profile = "";
        $scope.isProfileEdit = false;
        $scope.isLoading = true;
        console.log("ROOT SCOPE: SearchPostalCodeController");
        console.log($rootScope.profile);
        $scope.customer = new Customer_1.Customer();
        if (window.localStorage.getItem("loggedIn") == "yes" && parseInt(window.localStorage.getItem("userId")) > 0) {
            $scope.isLoggedIn = true;
            $rootScope.customerNameShow = window.localStorage.getItem("firstName");
        }
        $scope.clickFirstTimeLogin = function () {
            console.log("CLICKEEED");
            if (!$scope.isClickedLoginFirstTime) {
                $scope.isClickedLoginFirstTime = true;
            }
        };
        $scope.init = function () {
            $scope.client = null;
            $scope.selectedClient = null;
            $scope.selectedCategory = null;
            $scope.formData = {};
            ngCart.setTaxRate(0);
            ngCart.setShipping(0);
            $scope.newRegister = new Customer_1.Customer();
            $scope.postcode = "BS24 9DD";
            getClient($scope, $http);
            console.log("After get client");
            console.log($scope.selectedClient);
            $scope.setSagepaySelected = function () {
                console.log("Before select");
                console.log($scope.isSagePaySelected);
                $scope.isSagePaySelected = true;
                console.log("After select");
                console.log($scope.isSagePaySelected);
                $scope.saveOrderAndPay();
            };
            $scope.saveOrderAndPay = function () {
                if (customerObject.getId() == null) {
                    customerObject.setId(parseInt(window.localStorage.getItem("userId")));
                }
                console.log(window.localStorage.getItem("loggedIn"));
                console.log(window.localStorage.getItem("userId"));
                console.log("Params profile info..");
                console.log($scope.profile);
                customerObject.setFirstName($scope.profile.fname);
                customerObject.setLastName($scope.profile.lname);
                customerObject.setAddress($scope.profile.address);
                customerObject.setAddress2($scope.profile.address2);
                customerObject.setCity($scope.profile.city);
                customerObject.setPostalCode($scope.profile.postal);
                customerObject.setPhone($scope.profile.phone);
                $scope.orderObj = new Order_1.Order();
                $scope.orderObj.setCustomer(customerObject);
                $scope.orderObj.setClient($scope.selectedClient);
                $scope.orderObj.setTotalCost(parseFloat(ngCart.totalCost()));
                ngCart.getItems().forEach(function (item, key) {
                    console.log("Showing item..");
                    console.log(item);
                    $scope.orderObj.addOrder(item);
                });
                console.log("Params");
                console.log($scope.orderObj.toJSON());
                if (confirm("Save your order and make payment?")) {
                    $http.post($scope.api_url + "/order/create", $scope.orderObj.toJSON()).then(function (response) {
                        console.log("Response saving order..");
                        console.log(response.data);
                        if (response.data.last_id > 0) {
                            swal("Success", "Order saved.", "success");
                            console.log($scope);
                            console.log("Last insert ID: ");
                            console.log(response.data.last_id);
                            console.log("After select sagepay");
                            console.log($scope.isSagePaySelected);
                            ngCart.empty();
                            getOrderHistory($scope, $http, $rootScope);
                            if ($scope.isSagePaySelected) {
                                var url = "http://sab.joenefloresca.xyz/?order_id=" + response.data.last_id;
                                var options = "location=yes";
                                var ref = window.open(encodeURI(url), '_blank', options);
                                ref.addEventListener('loaderror', function (event) {
                                    console.log("Eveeeentttt Load Error..");
                                    console.log(event);
                                    if (event.url.match("/close")) {
                                        ref.close();
                                    }
                                });
                                ref.addEventListener('loadstart', function (event) {
                                    console.log("Eveeeentttt Load Start..");
                                    console.log(event);
                                });
                            }
                        }
                    });
                }
            };
            $scope.buyNowBtn = function () {
                if (customerObject.getId() == null) {
                    customerObject.setId(parseInt(window.localStorage.getItem("userId")));
                }
                console.log(window.localStorage.getItem("loggedIn"));
                console.log(window.localStorage.getItem("userId"));
                if (window.localStorage.getItem("loggedIn") == null && window.localStorage.getItem("userId") == null) {
                    swal("Notice", "Please register first.", "info");
                    window.location.href = "index.html#register";
                }
                else {
                    console.log("Params profile info..");
                    console.log($scope.profile);
                    ngCart.getItems().forEach(function (item, key) {
                        console.log("Showing item..");
                        console.log(item);
                        $scope.orderObj.addOrder(item);
                    });
                    console.log("Params 123");
                    console.log($scope.orderObj.toJSON());
                    if (confirm("Save your order and make payment?")) {
                        $http.post($scope.api_url + "/order/create", $scope.orderObj.toJSON()).then(function (response) {
                            console.log("Response..");
                            console.log(response.data);
                            if (response.data.last_id > 0) {
                                swal("Success", "Order saved.", "success");
                                console.log($scope);
                                console.log("Last insert ID: ");
                                console.log(response.data.last_id);
                                console.log("After select sagepay");
                                console.log($scope.isSagePaySelected);
                                ngCart.empty();
                                getOrderHistory($scope, $http, $rootScope);
                            }
                        });
                    }
                    else {
                        return false;
                    }
                }
            };
            $scope.confirmPayment = function () {
                console.log("Confirmed data scope");
                console.log($scope);
                console.log(customerObject);
                if (window.localStorage.getItem("loggedIn") == null && window.localStorage.getItem("userId") == null) {
                    swal("Notice", "Please login or register first.", "info");
                    window.location.href = "#register-log";
                }
                else {
                    $scope.openPayment = true;
                }
            };
            $scope.addItemToCart = function (id, name, price, quantity, data, subname) {
                var item = $.grep(ngCart.getItems(), function (e) {
                    return e._id == id;
                });
                if (item.length == 0) {
                    ngCart.addItem(id, name, price, quantity, data);
                }
                else if (item.length == 1) {
                    var currentQty = item[0]._quantity;
                    item[0]._quantity = parseInt(currentQty) + 1;
                }
                swal("Notice", name + " " + subname + " has been added to your cart.", "info");
            };
        };
        $scope.myFunction = function () {
            if (window.localStorage.getItem("loggedIn") == null && window.localStorage.getItem("userId") == null) {
                alert("Please register or login first.");
            }
            else {
                if (typeof $scope.formData.postCode == "undefined" || $scope.formData.postCode == "") {
                    alert("Post code is required");
                }
                else {
                    console.log($scope.formData.postCode);
                    $scope.postcode = $scope.formData.postCode;
                    getClient($scope, $http);
                }
            }
        };
        $scope.submitRegister = function () {
            var isValid = true;
            console.log($scope.newRegister);
            if (typeof $scope.newRegister.address2 == "undefined") {
                $scope.newRegister.address2 = "N/A";
            }
            if (typeof $scope.newRegister.first_name == "undefined" || $scope.newRegister.first_name.length == 0) {
                isValid = false;
                swal("Warning", "First name is required.", "warning");
            }
            if (typeof $scope.newRegister.last_name == "undefined" || $scope.newRegister.last_name.length == 0) {
                isValid = false;
                swal("Warning", "Last name is required.", "warning");
            }
            if (typeof $scope.newRegister.address == "undefined" || $scope.newRegister.address.length == 0) {
                isValid = false;
                swal("Warning", "Address is required.", "warning");
            }
            if (typeof $scope.newRegister.phone == "undefined" || $scope.newRegister.phone.length == 0) {
                isValid = false;
                swal("Warning", "Phone is required.", "warning");
            }
            if (typeof $scope.newRegister.city == "undefined" || $scope.newRegister.city.length == 0) {
                isValid = false;
                swal("Warning", "City is required.", "warning");
            }
            if (typeof $scope.newRegister.postal_code == "undefined" || $scope.newRegister.postal_code.length == 0) {
                isValid = false;
                swal("Warning", "Postcode is required.", "warning");
            }
            if (typeof $scope.newRegister.email == "undefined" || $scope.newRegister.email.length == 0) {
                isValid = false;
                swal("Warning", "Email is required.", "warning");
            }
            if (typeof $scope.newRegister.mypass == "undefined" || $scope.newRegister.mypass.length == 0) {
                isValid = false;
                swal("Warning", "Password is required.", "warning");
            }
            if (typeof $scope.newRegister.mypass_confirm == "undefined") {
                isValid = false;
                swal("Warning", "Password Confirm is required.", "warning");
            }
            if (typeof $scope.newRegister.mypass != "undefined" && typeof $scope.newRegister.mypass_confirm != "undefined") {
                console.log("Truelala");
                if ($scope.newRegister.mypass.trim() != $scope.newRegister.mypass_confirm.trim()) {
                    isValid = false;
                    swal("Warning", "Password and Confirm Password does not match.", "warning");
                }
            }
            if (isValid) {
                $http.post($scope.api_url + "/customer/create", $scope.newRegister.toJSON()).then(function (response) {
                    console.log("Registration result");
                    console.log(response.data);
                    if (!response.data.success) {
                        swal("Warning", "Email already registered.", "warning");
                    }
                    else {
                        if (typeof response.data.customer != "undefined") {
                            if (confirm("Thanks for registering, you can now login.")) {
                                window.location.href = "#login";
                            }
                            else {
                                window.location.href = "#login";
                            }
                        }
                    }
                });
            }
        };
        $scope.getSelectedCategory = function (category) {
            $scope.selectedCategory = category;
            console.log($scope.selectedCategory);
        };
        $scope.init();
        $scope.getMenus = function (menus) {
            if (typeof menus !== "undefined") {
                selectedMenus(menus, $scope);
            }
        };
        $scope.openPersonalDetailsModal = function (menus) {
            $scope.sel_menus = (typeof menus !== "undefined" ? menus : null);
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/listProducts.html',
                controller: AddCartController,
                windowClass: "animated fadeIn",
                size: "lg",
                resolve: {
                    $invoker: function () {
                        return $scope;
                    }
                }
            });
        };
        $scope.openRegisterModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/register.html',
                controller: RegisterController,
                windowClass: "animated fadeIn",
                size: "lg",
                resolve: {
                    $invoker: function () {
                        return $scope;
                    }
                }
            });
        };
        $scope.openLoginModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/login.html',
                controller: LoginController,
                windowClass: "animated fadeIn",
                size: "lg",
                resolve: {
                    $invoker: function () {
                        return $scope;
                    }
                }
            });
        };
        $scope.logout = function () {
            if (confirm("Do you want to logout?")) {
                $scope.isLoggedIn = false;
                $rootScope.customerNameShow = null;
                window.localStorage.clear();
                ngCart.empty();
                window.location.href = "index.html";
            }
        };
        $scope.login = function () {
            if (typeof $scope.customer.email != "undefined" && typeof $scope.customer.mypass != "undefined") {
                $scope.customer.setId(0);
                var customer = $scope.customer.toJSON();
                $http.post($scope.api_url + "/customer/login", customer).then(function (response) {
                    if (typeof response.data.result != "undefined") {
                        var res = response.data.result;
                        var success = res.success;
                        var msg = res.msg;
                        var data = res.data;
                        console.log("Customer response");
                        console.log(response);
                        if (success == false && msg == "Incorrect Password") {
                            swal("Warning", "Incorrect Password.", "warning");
                        }
                        else if (success == false && msg == "Incorrect Email/Password") {
                            swal("Warning", "Incorrect Password.", "warning");
                        }
                        else {
                            customerObject = initCustomer(data);
                            $scope.customerObj = customerObject;
                            console.log(customerObject);
                            window.localStorage.setItem("loggedIn", "yes");
                            window.localStorage.setItem("userId", customerObject.getId().toString());
                            window.localStorage.setItem("firstName", customerObject.getFirstName());
                            $rootScope.customerNameShow = customerObject.getFirstName();
                            $scope.isLoggedIn = true;
                            window.location.href = "index.html#cart";
                            console.log("Getting profile and history..");
                            console.log($scope);
                            getProfile($scope, $http, $rootScope);
                            getOrderHistory($scope, $http, $rootScope);
                        }
                    }
                });
            }
            else {
                swal("Error", "Both email and password is required.", "error");
            }
        };
        $scope.$on("onClientinit", function (event) {
            console.log("onClientinit");
            console.log("onClientinit");
            console.log("onClientinit");
            console.log($scope);
            getOrderHistory($scope, $http, $rootScope);
            getProfile($scope, $http, $rootScope);
            $scope.isLoading = false;
        });
        $scope.saveProfile = function () {
            save_update_profile($scope, $http, $rootScope);
        };
        $scope.showEdit = function () {
            if ($scope.isProfileEdit) {
                $scope.isProfileEdit = false;
            }
            else {
                $scope.isProfileEdit = true;
            }
        };
        $scope.fortmatDecimal = function (val) {
            if (val != null) {
                return val.toFixed(2);
            }
            else {
                return val;
            }
        };
    }
    function LoginController($scope, $http, $modalInstance, $invoker, $rootScope) {
        console.log("ROOT SCOPE: LoginController");
        console.log($rootScope.profile);
        $scope.customer = new Customer_1.Customer();
        $scope.login = function () {
            console.log("Trying to login..");
            $scope.customer.setId(0);
            console.log($scope.customer.toJSON());
            console.log("End Trying to login..");
            var customer = $scope.customer.toJSON();
            $http.post($invoker.api_url + "/customer/login", customer).then(function (response) {
                if (typeof response.data.result != "undefined") {
                    var res = response.data.result;
                    var success = res.success;
                    var msg = res.msg;
                    var data = res.data;
                    console.log("Customer response");
                    console.log(response);
                    if (success == false && msg == "Incorrect Password") {
                        swal("Error", "Incorrect Password.", "error");
                    }
                    else if (success == false && msg == "Incorrect Email/Password") {
                        swal("Error", "Incorrect Password.", "error");
                    }
                    else {
                        customerObject = initCustomer(data);
                        $scope.customerObj = customerObject;
                        console.log(customerObject);
                        window.localStorage.setItem("loggedIn", "yes");
                        window.localStorage.setItem("userId", customerObject.getId().toString());
                        window.localStorage.setItem("firstName", customerObject.getFirstName());
                        $rootScope.customerNameShow = customerObject.getFirstName();
                        window.location.href = "index.html#cart";
                        $modalInstance.dismiss('cancel');
                        $scope.api_url = $invoker.api_url;
                        console.log("Getting profile and history..");
                        console.log($scope);
                        getProfile($scope, $http, $rootScope);
                        getOrderHistory($scope, $http, $rootScope);
                    }
                }
            });
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
    function AddCartController($scope, $http, $modalInstance, $invoker, ngCart) {
        $scope.selectedMenus = null;
        if ($invoker.sel_menus) {
            $scope.selectedMenus = $invoker.sel_menus;
        }
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
    function RegisterController($scope, $http, $modalInstance, $invoker, ngCart) {
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
    function getClient($scope, $http) {
        if ($scope.postcode) {
            if (true) {
                var formData = { postcode: $scope.postcode };
                $scope.client = new Array();
                var req = {
                    method: 'POST',
                    url: $scope.api_url + "/client/getclient",
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data: formData
                };
                $http(req).then(function (response) {
                    var result = (response.data ? response.data : null);
                    if (result) {
                        if (result.success) {
                            var data = result.data;
                            if (data.length != 0) {
                                console.log("Client loaded..");
                                angular.forEach(data, function (value, key) {
                                    var client_data = initClient(value);
                                    $scope.client.push(client_data);
                                });
                                $scope.selectedClient = $scope.client[0];
                                $scope.$emit("onClientinit");
                            }
                            else {
                                swal("Error", "No result found.", "error");
                            }
                        }
                    }
                });
            }
            else {
                var retrievedObject = window.localStorage.getItem('menus');
                var parsedObj = JSON.parse(retrievedObject);
                console.log("Client Object");
                $scope.client = parsedObj[0];
                $scope.selectedClient = parsedObj[0];
                console.log($scope.client);
                console.log($scope.selectedClient);
            }
        }
    }
    function initClient(item) {
        var client = new Client_1.Client();
        client.setClientId(item.client_id);
        client.setFirstName(item.firstname);
        client.setLname(item.lastname);
        client.setMname(item.middlename);
        client.setTitle(item.title);
        client.setNameResto(item.name_resto);
        client.setPostCode(item.postcode);
        client.setPhone(item.phone);
        client.setContact(item.contact);
        client.setAddress(item.address);
        client.setAddress2(item.address2);
        client.setCity(item.city);
        client.setCountry(item.country);
        client.setTown(item.town);
        if (item.categories && item.categories.length > 0) {
            angular.forEach(item.categories, function (value, key) {
                var itemCateg = initCategory(value, key);
                client.addCategory(itemCateg);
            });
        }
        return client;
    }
    function initCategory(item, key) {
        var category = new Category_1.Category();
        category.setCategoryId(item.category_id);
        category.setCatName(item.catname);
        category.setCatDescription(item.catdescription);
        if (item.menus && item.menus.length > 0) {
            angular.forEach(item.menus, function (value, key) {
                var menus = initMenus(value, key);
                category.addMenus(menus);
            });
        }
        return category;
    }
    function initMenus(item, key) {
        var menus = new Menus_1.Menus();
        menus.setMenuId(item.menu_id);
        menus.setMenuName(item.menu_name);
        menus.setMenuDescription(item.menu_description);
        menus.setMenuImage(item.menu_image);
        if (item.menu_prices && item.menu_prices.length > 0) {
            angular.forEach(item.menu_prices, function (value, key) {
                var m_price = initMenuPrice(value, key);
                menus.addMenuPrice(m_price);
            });
        }
        return menus;
    }
    function initMenuPrice(item, key) {
        var menuPrice = new MenuPrice_1.MenuPrice();
        menuPrice.setPriceId(item.price_id);
        menuPrice.setPrice(item.price);
        menuPrice.setOptPrice(item.opt_type);
        return menuPrice;
    }
    function initCustomer(item) {
        var customer = new Customer_1.Customer();
        console.log("Creating customer object..");
        console.log(item);
        customer.setId(item.id);
        customer.setFirstName(item.first_name);
        customer.setLastName(item.last_name);
        customer.setEmail(item.email);
        customer.setPhone(item.phone);
        customer.setAddress(item.address);
        customer.setAddress2(item.address2);
        customer.setPostalCode(item.postal_code);
        customer.setCity(item.city);
        return customer;
    }
    function selectClient(client, $scope) {
        if (typeof client !== "undefined") {
            $scope.selectedClient = client;
        }
    }
    function selectedMenus(menus, $scope) {
        if (typeof menus !== "undefined") {
            $scope.selectedMenus = menus;
            console.log($scope.selectedMenus.getMenuPrice());
        }
    }
    function getOrderHistory($scope, $http, $rootScope) {
        console.log("Inside order history");
        if (typeof $scope.customerObj != "undefined" || $rootScope.customerNameShow) {
            $rootScope.orderHistory = null;
            var userid = window.localStorage.getItem('userId');
            console.log("Getting order history..");
            console.log(userid);
            $http.post($scope.api_url + "/order/history", { customer_id: parseInt(userid) }).then(function (response) {
                console.log("Response Order History..");
                $rootScope.orderHistory = response.data.data;
                console.log($rootScope.orderHistory);
            });
        }
        else {
            console.log("Can't get order history");
        }
    }
    function getProfile($scope, $http, $rootScope) {
        console.log("Inside function get profile");
        console.log($scope.customerObj);
        if (typeof $scope.customerObj != "undefined" || $rootScope.customerNameShow) {
            var userid = window.localStorage.getItem('userId');
            console.log("Getting profile..");
            console.log(userid);
            $http.post($scope.api_url + "/customer/profile", { customer_id: parseInt(userid) }).then(function (response) {
                console.log("Response Profile..");
                console.log(response);
                $rootScope.profile = response.data.data;
                console.log("Success getting profile..");
                console.log($rootScope.profile);
                customerObject.setFirstName($rootScope.profile.fname);
                customerObject.setLastName($rootScope.profile.lname);
                customerObject.setAddress($rootScope.profile.address);
                customerObject.setAddress2($rootScope.profile.address2);
                customerObject.setCity($rootScope.profile.city);
                customerObject.setPostalCode($rootScope.profile.postal);
                customerObject.setEmail($rootScope.profile.email);
                customerObject.setPhone($rootScope.profile.phone);
                console.log(customerObject);
            });
        }
        else {
            console.log("Can't get profile");
        }
    }
    function save_update_profile($scope, $http, $rootScope) {
        if ($rootScope.profile) {
            console.log($rootScope.profile);
            var userid = window.localStorage.getItem('userId');
            $rootScope.profile.customer_id = userid;
            console.log("Getting profile..");
            var req = {
                method: 'POST',
                url: $scope.api_url + "/customer/profile-update",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                data: $rootScope.profile
            };
            $http(req).then(function (response) {
                var result = (response.data ? response.data : null);
                if (result) {
                    swal("Success", "Profile update successfull", "success");
                    console.log("Response Profile Update..");
                    console.log(response);
                }
            });
        }
    }
    myApp.controller("SearchPostalCodeController", ["$scope", "$http", "$modal", "ngCart", "$rootScope", SearchPostalCodeController]);
    myApp.controller("AddCartController", ["$scope", "$http", "$modalInstance", "$invoker", "ngCart", AddCartController]);
    myApp.controller("LoginController", ["$scope", "$http", "$modalInstance", "$invoker", "$rootScope", LoginController]);
});
//# sourceMappingURL=searchPostCondeController.js.map