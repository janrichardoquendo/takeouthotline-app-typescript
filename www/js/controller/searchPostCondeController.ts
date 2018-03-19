
import {Customer} from "../models/Customer";
import {Client} from "../models/Client";
import {Category} from "../models/Category";
import {Menus} from "../models/Menus";
import {MenuPrice} from "../models/MenuPrice";
import {Order} from "../models/Order";

declare let myApp:any;
declare let jQuery:any;


let customerObject = new Customer();

function SearchPostalCodeController($scope:any,$http:any,$modal:any,ngCart:any,$rootScope:any) {
    $scope.isSagePaySelected = false;
    $scope.isLoggedIn = false;
    $scope.isClickedLoginFirstTime = false;
    $rootScope.customerNameShow = null
    $scope.openPayment = false;
    $rootScope.profile = "";
    $scope.isProfileEdit = false;
    $scope.isLoading = true;
    console.log("ROOT SCOPE: SearchPostalCodeController");
    console.log( $rootScope.profile);
    $scope.customer = new Customer();

    if (window.localStorage.getItem("loggedIn") == "yes" && parseInt(window.localStorage.getItem("userId")) > 0) {
        $scope.isLoggedIn = true;
        $rootScope.customerNameShow = window.localStorage.getItem("firstName");
    }

    $scope.clickFirstTimeLogin = function(){
        console.log("CLICKEEED");
        if(!$scope.isClickedLoginFirstTime){
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
        $scope.newRegister = new Customer();
        $scope.postcode = "BS24 9DD";
        getClient($scope, $http);
        console.log("After get client");
        console.log($scope.selectedClient);

        $scope.setSagepaySelected = function(){
            console.log("Before select");
            console.log($scope.isSagePaySelected);
            $scope.isSagePaySelected = true;
            console.log("After select");
            console.log($scope.isSagePaySelected);
            $scope.saveOrderAndPay();       
        };

        $scope.saveOrderAndPay = function(){

            if (customerObject.getId() == null) {
                customerObject.setId(parseInt(window.localStorage.getItem("userId")));
            }
            console.log(window.localStorage.getItem("loggedIn"));
            console.log(window.localStorage.getItem("userId"));

            console.log("Params profile info..");
            console.log($scope.profile);

            // Re-aasign profile info just in case it has been changed
            customerObject.setFirstName($scope.profile.fname);
            customerObject.setLastName($scope.profile.lname);
            customerObject.setAddress($scope.profile.address);
            customerObject.setAddress2($scope.profile.address2);
            customerObject.setCity($scope.profile.city);
            customerObject.setPostalCode($scope.profile.postal);
            customerObject.setPhone($scope.profile.phone);

            $scope.orderObj = new Order();
            $scope.orderObj.setCustomer(customerObject);
            $scope.orderObj.setClient($scope.selectedClient);
            $scope.orderObj.setTotalCost(parseFloat(ngCart.totalCost()));

            ngCart.getItems().forEach(function (item: any, key: any) {
                console.log("Showing item..");
                console.log(item);
                $scope.orderObj.addOrder(item);
            });
    

            console.log("Params");
            console.log($scope.orderObj.toJSON());

            if (confirm("Save your order and make payment?")) {
                $http.post($scope.api_url + "/order/create", $scope.orderObj.toJSON()).then(function (response: any) {
                    console.log("Response saving order..");
                    console.log(response.data);
                    if (response.data.last_id > 0) {
                        swal( "Success" ,  "Order saved." ,  "success" );
                        console.log($scope);
                        console.log("Last insert ID: ");
                        console.log(response.data.last_id);
                        console.log("After select sagepay");
                        console.log($scope.isSagePaySelected); 
                        ngCart.empty();
                        getOrderHistory($scope, $http, $rootScope);
                        if($scope.isSagePaySelected){

                            // var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
                            // var myCallback = function(event:any) { 
                            //     console.log("CALLLLBACKKK");
                            //     console.log("CALLLLBACKKK");
                            //     console.log("CALLLLBACKKK");
                            //     console.log("CALLLLBACKKK");
                            //     console.log("CALLLLBACKKK");
                            //     console.log("CALLLLBACKKK");
                            //     console.log("CALLLLBACKKK");
                            //     alert(event.url); 
                            // }
                            // ref.addEventListener('loadstart', myCallback);
                            // ref.addEventListener('loaderror', myCallback);
                            

                            var url = "http://sab.joenefloresca.xyz/?order_id="+response.data.last_id;
                            var options = "location=yes";
                            var ref = window.open(encodeURI(url), '_blank', options);

                            
                            ref.addEventListener('loaderror', function(event:any) {     
                                console.log("Eveeeentttt Load Error..");
                                console.log(event);  
                                if (event.url.match("/close")) {
                                    ref.close();
                                }  
                              
                            });
                            ref.addEventListener('loadstart', function(event:any){
                                console.log("Eveeeentttt Load Start..");
                                console.log(event);
                            });

                            //var ref = cordova.InAppBrowser.open("http://sab.joenefloresca.xyz/?order_id="+response.data.last_id, '_blank', 'location=yes');
                            //var myWindow = window.open("http://sab.joenefloresca.xyz/?order_id="+response.data.last_id);
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
                swal( "Notice" ,  "Please register first." ,  "info" );
                window.location.href = "index.html#register";
            } else {

                console.log("Params profile info..");
                console.log($scope.profile);

                //$scope.orderObj = new Order();
                //$scope.orderObj.setCustomer(customerObject);
                //$scope.orderObj.setClient($scope.selectedClient);
                //$scope.orderObj.setTotalCost(parseFloat(ngCart.totalCost()));

                ngCart.getItems().forEach(function (item: any, key: any) {
                    console.log("Showing item..");
                    console.log(item);
                    $scope.orderObj.addOrder(item);
                });

                console.log("Params 123");
                console.log($scope.orderObj.toJSON());
                

                if (confirm("Save your order and make payment?")) {
                    $http.post($scope.api_url + "/order/create", $scope.orderObj.toJSON()).then(function (response: any) {
                        console.log("Response..");
                        console.log(response.data);
                        if (response.data.last_id > 0) {
                            swal( "Success" ,  "Order saved." ,  "success" );
                            console.log($scope);
                            console.log("Last insert ID: ");
                            console.log(response.data.last_id);
                            console.log("After select sagepay");
                            console.log($scope.isSagePaySelected); 
                            ngCart.empty();
                            getOrderHistory($scope, $http, $rootScope);

                        }
                    });
                } else {
                    return false;
                }
            }
        };

        $scope.confirmPayment = function () {
            console.log("Confirmed data scope");
            console.log($scope);
            console.log(customerObject);
            if (window.localStorage.getItem("loggedIn") == null && window.localStorage.getItem("userId") == null) {
                swal( "Notice" ,  "Please login or register first." ,  "info" );
                window.location.href = "#register-log";
            } else {
                $scope.openPayment = true;
            }
        };

        $scope.addItemToCart = function (id: any, name: any, price: any, quantity: any, data: any, subname:any) {
            var item = $.grep(ngCart.getItems(), function (e: any) {
                return e._id == id;
            });
            if (item.length == 0) {
                ngCart.addItem(id, name, price, quantity, data);
            } else if (item.length == 1) {
                var currentQty = item[0]._quantity;
                item[0]._quantity = parseInt(currentQty) + 1;
            }
            swal( "Notice" ,  name + " "+subname+" has been added to your cart." ,  "info" );
        };
    }

    //Search client by postcode
    $scope.myFunction = function () {
        if (window.localStorage.getItem("loggedIn") == null && window.localStorage.getItem("userId") == null) {
            alert("Please register or login first.");
        } else {
            if (typeof $scope.formData.postCode == "undefined" || $scope.formData.postCode == "") {
                alert("Post code is required");
            } else {
                console.log($scope.formData.postCode);
                $scope.postcode = $scope.formData.postCode;
                getClient($scope, $http);
            }
        }
    }

    $scope.submitRegister = function () {
        var isValid = true;
        console.log($scope.newRegister);
        if(typeof $scope.newRegister.address2 == "undefined"){
            $scope.newRegister.address2 = "N/A";
        }

        if(typeof $scope.newRegister.first_name == "undefined" || $scope.newRegister.first_name.length == 0){
            isValid = false;
            swal( "Warning" ,  "First name is required." ,  "warning" );
            
        }
        if(typeof $scope.newRegister.last_name == "undefined" || $scope.newRegister.last_name.length == 0){
            isValid = false;
            swal( "Warning" ,  "Last name is required." ,  "warning" );
        }
        if(typeof $scope.newRegister.address == "undefined" || $scope.newRegister.address.length == 0){
            isValid = false;
            swal( "Warning" ,  "Address is required." ,  "warning" );
        }
        if(typeof $scope.newRegister.phone == "undefined" || $scope.newRegister.phone.length == 0){
            isValid = false;
            swal( "Warning" ,  "Phone is required." ,  "warning" );
        }
        if(typeof $scope.newRegister.city == "undefined" || $scope.newRegister.city.length == 0){
            isValid = false;
            swal( "Warning" ,  "City is required." ,  "warning" );
        }
        if(typeof $scope.newRegister.postal_code == "undefined" || $scope.newRegister.postal_code.length == 0){
            isValid = false;
            swal( "Warning" ,  "Postcode is required." ,  "warning" );
        }
        if(typeof $scope.newRegister.email == "undefined" || $scope.newRegister.email.length == 0){
            isValid = false;
            swal( "Warning" ,  "Email is required." ,  "warning" );
        }
        if(typeof $scope.newRegister.mypass == "undefined" || $scope.newRegister.mypass.length == 0){
            isValid = false;
            swal( "Warning" ,  "Password is required." ,  "warning" );
        }
        if(typeof $scope.newRegister.mypass_confirm == "undefined"){
            isValid = false;
            swal( "Warning" ,  "Password Confirm is required." ,  "warning" );
        }
        if(typeof $scope.newRegister.mypass != "undefined" && typeof $scope.newRegister.mypass_confirm != "undefined"){
            console.log("Truelala");
            if($scope.newRegister.mypass.trim() != $scope.newRegister.mypass_confirm.trim()){
                isValid = false;
                swal( "Warning" ,  "Password and Confirm Password does not match." ,  "warning" );
            }
        }

        if(isValid){
            $http.post($scope.api_url + "/customer/create", $scope.newRegister.toJSON()).then(function (response: any) {
                console.log("Registration result");
                console.log(response.data);
                if (!response.data.success) {
                    swal( "Warning" ,  "Email already registered." ,  "warning" );
                } else {
                    if (typeof response.data.customer != "undefined") {
                        if (confirm("Thanks for registering, you can now login.")) {
                            window.location.href = "#login";
                        } else {
                            window.location.href = "#login";
                        }
                    }
                }
            });
        }



        
    }

    $scope.getSelectedCategory = function (category: Category) {
        $scope.selectedCategory = category;
        console.log($scope.selectedCategory);
    }

    $scope.init();

    //get specific menu
    $scope.getMenus = function (menus: Menus) {
        if (typeof menus !== "undefined") {
            selectedMenus(menus, $scope);
        }
    };

    //modal personal details
    $scope.openPersonalDetailsModal = function (menus: Menus) {
        $scope.sel_menus = (typeof menus !== "undefined" ? menus : null );
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

    //modal for registration
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

    //modal for login
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

    //logout
    $scope.logout = function () {
        if (confirm("Do you want to logout?")) {
            $scope.isLoggedIn = false;
            $rootScope.customerNameShow = null;
            window.localStorage.clear();
            ngCart.empty();
            window.location.href = "index.html";
        }
    };


    $scope.login = function(){

        if(typeof $scope.customer.email != "undefined" && typeof $scope.customer.mypass != "undefined") {
            $scope.customer.setId(0);
            let customer = $scope.customer.toJSON();
            $http.post($scope.api_url+"/customer/login",customer).then(function(response:any){
    
                if(typeof response.data.result != "undefined"){
                    var res = response.data.result;
                    var success = res.success;
                    var msg = res.msg;
                    var data = res.data;
    
                    console.log("Customer response");
                    console.log(response);
    
                    if(success == false && msg == "Incorrect Password"){
                        swal( "Warning" ,  "Incorrect Password." ,  "warning" );
                    } else if(success == false && msg == "Incorrect Email/Password"){
                        swal( "Warning" ,  "Incorrect Password." ,  "warning" );
                    } else {
                        customerObject = initCustomer(data);
                        $scope.customerObj = customerObject;
                        console.log(customerObject);
                        window.localStorage.setItem("loggedIn", "yes");
                        window.localStorage.setItem("userId", customerObject.getId().toString());
                        window.localStorage.setItem("firstName", customerObject.getFirstName());
                        $rootScope.customerNameShow = customerObject.getFirstName();
                        $scope.isLoggedIn = true;
    
                        window.location.href="index.html#cart";
                        console.log("Getting profile and history..");
                        console.log($scope);
                        getProfile($scope, $http,$rootScope);
                        getOrderHistory($scope, $http,$rootScope);
                    }
                }
            });
        } else {
            swal( "Error" ,  "Both email and password is required." ,  "error" );
        }

        
    };
    

    $scope.$on("onClientinit", function (event: any) {
        console.log("onClientinit");
        console.log("onClientinit");
        console.log("onClientinit");
        console.log($scope);
        getOrderHistory($scope, $http, $rootScope);//get order history
        getProfile($scope, $http, $rootScope);//get profile
        $scope.isLoading = false;
    });


    $scope.saveProfile = function ()
    {
        save_update_profile($scope,$http,$rootScope);//save/update profile
    }

    $scope.showEdit = function(){
        if($scope.isProfileEdit){
            $scope.isProfileEdit = false;
        } else {
            $scope.isProfileEdit = true;
        }
    }


    $scope.fortmatDecimal = function(val:Number){
        if(val != null){
            return val.toFixed(2);
        } else {
            return val;
        }
    }

}

function LoginController($scope:any,$http:any,$modalInstance:any,$invoker:any,$rootScope:any)
{
    console.log("ROOT SCOPE: LoginController");
    console.log( $rootScope.profile);
    $scope.customer = new Customer();
    //login function
    $scope.login = function(){
        console.log("Trying to login..");
        $scope.customer.setId(0);
        console.log($scope.customer.toJSON());
        console.log("End Trying to login..");

        let customer = $scope.customer.toJSON();

        $http.post($invoker.api_url+"/customer/login",customer).then(function(response:any){

            if(typeof response.data.result != "undefined"){

                var res = response.data.result;
                var success = res.success;
                var msg = res.msg;
                var data = res.data;

                console.log("Customer response");
                console.log(response);

                if(success == false && msg == "Incorrect Password"){
                    swal( "Error" ,  "Incorrect Password." ,  "error" );
                } else if(success == false && msg == "Incorrect Email/Password"){
                    swal( "Error" ,  "Incorrect Password." ,  "error" );
                } else {
                    customerObject = initCustomer(data);
                    $scope.customerObj = customerObject;
                    console.log(customerObject);
                    window.localStorage.setItem("loggedIn", "yes");
                    window.localStorage.setItem("userId", customerObject.getId().toString());
                    window.localStorage.setItem("firstName", customerObject.getFirstName());
                    $rootScope.customerNameShow = customerObject.getFirstName();

                    window.location.href="index.html#cart";
                    $modalInstance.dismiss('cancel');
                    $scope.api_url = $invoker.api_url;
                    console.log("Getting profile and history..");
                    console.log($scope);
                    getProfile($scope, $http,$rootScope);
                    getOrderHistory($scope, $http,$rootScope);

                }
            }
        });

    };
    //modal close
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}


function AddCartController($scope:any,$http:any,$modalInstance:any,$invoker:any,ngCart:any)
{
    $scope.selectedMenus = null;
    if($invoker.sel_menus)
    {
        $scope.selectedMenus = $invoker.sel_menus;
    }

    //modal close
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function RegisterController($scope:any,$http:any,$modalInstance:any,$invoker:any,ngCart:any)
{
    //modal close
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function getClient($scope:any,$http:any)
{
    if($scope.postcode)
    {
        // Check for local storage first
        if(true){
            let formData = {postcode:$scope.postcode};
            $scope.client= new Array<Client>();
            var req = {
                method: 'POST',
                url: $scope.api_url+"/client/getclient",
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                data: formData
            };

            $http(req).then(function(response:any){
                let result = (response.data ? response.data : null);
                if(result)
                {
                    if(result.success)
                    {
                        let data = result.data;
                        if(data.length != 0) {
                            console.log("Client loaded..");
                            angular.forEach(data,function(value:any,key:any){
                                let client_data = initClient(value);
                                $scope.client.push(client_data);
                            });

                            $scope.selectedClient = $scope.client[0];
                            $scope.$emit("onClientinit");

                        } else {
                            swal( "Error" ,  "No result found." ,  "error" );
                        }
                    }
                }
            });
        } else {
            var retrievedObject = window.localStorage.getItem('menus');
            var parsedObj = JSON.parse(retrievedObject);
            console.log("Client Object");
            $scope.client = parsedObj[0];
            $scope.selectedClient = parsedObj[0];
            console.log($scope.client);
            console.log( $scope.selectedClient);
        }
    }
}

function initClient(item:any)
{
    let client = new Client();
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

    if(item.categories && item.categories.length > 0 )
    {
        angular.forEach(item.categories,function(value:any,key:any){
            let itemCateg:Category = initCategory(value,key);
            client.addCategory(itemCateg);
        });
    }
    return client;
}

function initCategory(item:any,key:any)
{
    let category = new Category();
    category.setCategoryId(item.category_id);
    category.setCatName(item.catname);
    category.setCatDescription(item.catdescription);
    if(item.menus && item.menus.length > 0)
    {
        angular.forEach(item.menus,function(value:any,key:any){
            let menus:Menus = initMenus(value,key);
            category.addMenus(menus);
        });
    }
    return category;
}

function initMenus(item:any,key:any)
{
    let menus = new Menus();
    menus.setMenuId(item.menu_id);
    menus.setMenuName(item.menu_name);
    menus.setMenuDescription(item.menu_description);
    menus.setMenuImage(item.menu_image);
    if(item.menu_prices && item.menu_prices.length > 0)
    {
        angular.forEach(item.menu_prices,function(value:any,key:any){
            let m_price:MenuPrice = initMenuPrice(value,key);
            menus.addMenuPrice(m_price);
        });
    }
    return menus;
}


function initMenuPrice(item:any,key:any)
{
    let menuPrice = new MenuPrice();
    menuPrice.setPriceId(item.price_id);
    menuPrice.setPrice(item.price);
    menuPrice.setOptPrice(item.opt_type);
    return menuPrice;
}


function initCustomer(item:any)
{
    let customer = new Customer();
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


function selectClient(client:Client,$scope:any)
{
    if(typeof client !== "undefined")
    {
        $scope.selectedClient = client;
    }
}

function selectedMenus(menus:Menus,$scope:any)
{
    if(typeof menus !== "undefined")
    {
        $scope.selectedMenus = menus;
        console.log($scope.selectedMenus.getMenuPrice());
    }
}

//get history
function getOrderHistory($scope:any,$http:any,$rootScope:any)
{
    console.log("Inside order history");
    if(typeof $scope.customerObj != "undefined" || $rootScope.customerNameShow)
    {
        // Get Order History
        $rootScope.orderHistory = null;
        var userid = window.localStorage.getItem('userId');
        console.log("Getting order history..");
        console.log(userid);
        $http.post($scope.api_url+"/order/history",{customer_id: parseInt(userid)}).then(function(response:any){
            console.log("Response Order History..");
            $rootScope.orderHistory = response.data.data;
            console.log($rootScope.orderHistory);
        });
    } else {
        console.log("Can't get order history");
    }
}



//get profile
function getProfile($scope:any,$http:any,$rootScope:any)
{
    console.log("Inside function get profile");
    console.log($scope.customerObj);
    if(typeof $scope.customerObj != "undefined" || $rootScope.customerNameShow)
    {
        var userid = window.localStorage.getItem('userId');
        console.log("Getting profile..");
        console.log(userid);
        $http.post($scope.api_url+"/customer/profile",{customer_id: parseInt(userid)}).then(function(response:any){
            console.log("Response Profile..");
            console.log(response);
            $rootScope.profile = response.data.data;
            console.log("Success getting profile..")
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
    else
    {
        console.log("Can't get profile");
    }
}



//saving/updating profile
function save_update_profile($scope:any,$http:any,$rootScope:any)
{
    if($rootScope.profile)
    {
        console.log($rootScope.profile);
        var userid = window.localStorage.getItem('userId');
        $rootScope.profile.customer_id = userid;
        console.log("Getting profile..");
        var req = {
            method: 'POST',
            url: $scope.api_url+"/customer/profile-update",
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            data: $rootScope.profile
        };
        $http(req).then(function(response:any){
            let result = (response.data ? response.data : null);
            if(result)
            {
                swal( "Success" ,  "Profile update successfull" ,  "success" );
                console.log("Response Profile Update..");
                console.log(response);
            }
        });

    }

}

myApp.controller("SearchPostalCodeController",["$scope","$http","$modal","ngCart","$rootScope",SearchPostalCodeController]);
myApp.controller("AddCartController",["$scope","$http","$modalInstance","$invoker","ngCart",AddCartController]);
myApp.controller("LoginController",["$scope","$http","$modalInstance","$invoker","$rootScope",LoginController]);

