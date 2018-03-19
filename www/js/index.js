/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", function(){ alert("No Internet Connection") }, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        universalLinks.subscribe(null, app.didLaunchAppFromLink);
        window.open = cordova.InAppBrowser.open;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        

        console.log('Received Event: ' + id);

        //app.initPaymentUI();
    },
    initPaymentUI: function() {
        console.log("initPaymentUI Invoked");
        var clientIDs = {
            "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
            "PayPalEnvironmentSandbox": "Aa-p_1sN36La31R-zj7eph0hYGaeQmvW7UJYtpFSQKN-QffZp7itgJNtzfq33OWXzo3TIqHD7SAKZ-zR"
        };
        PayPalMobile.init(clientIDs, app.onPayPalMobileInit);

    },
    onSuccesfulPayment: function(payment) {
        console.log("payment success: " + JSON.stringify(payment, null, 4));
    },
    onAuthorizationCallback: function(authorization) {
        console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment: function() {
        // for simplicity use predefined amount
        var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
        var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale",
            paymentDetails);
        return payment;
    },
    configuration: function() {
        // for more options see `paypal-mobile-js-helper.js`
        var config = new PayPalConfiguration({
            merchantName: "My test shop",
            merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
            merchantUserAgreementURL: "https://mytestshop.com/agreement"
        });
        return config;
    },
    onPrepareRender: function() {
        console.log("onPrepareRender");
        // buttons defined in index.html
        //  <button id="buyNowBtn"> Buy Now !</button>
        //  <button id="buyInFutureBtn"> Pay in Future !</button>
        //  <button id="profileSharingBtn"> ProfileSharing !</button>
        var buyNowBtn = document.getElementById("buyNowBtn");
        var buyInFutureBtn = document.getElementById("buyInFutureBtn");
        var profileSharingBtn = document.getElementById("profileSharingBtn");

        buyNowBtn.onclick = function(e) {
            // single payment
            console.log("buyNowBtn.onclick");
            alert("buyNowBtn.onclick");
            PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment,
                app.onUserCanceled);
        };

        buyInFutureBtn.onclick = function(e) {
            // future payment
            PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app
                .onUserCanceled);
        };

        profileSharingBtn.onclick = function(e) {
            // profile sharing
            PayPalMobile.renderProfileSharingUI(["profile", "email", "phone",
                "address", "futurepayments", "paypalattributes"
            ], app.onAuthorizationCallback, app.onUserCanceled);
        };
    },
    onPayPalMobileInit: function() {
        console.log("onPayPalMobileInit");
        // must be called
        // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
        PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", app.configuration(),
            app.onPrepareRender);
    },
    onUserCanceled: function(result) {
        console.log(result);
    }
};

app.initialize();

