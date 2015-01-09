'use strict';

describe('salesoverview.controller', function() {
    var scope, controller, httpBackend;

    beforeEach(module('umbraco'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, assetsService, dialogService, localizationService, notificationsService,
                                settingsResource,
                                localizationMocks, auditLogResource, auditLogResourceMock, invoiceResource, invoiceResourceMock,
                                paymentResource, paymentResourceMock, settingResourceMock, dialogDataFactory, salesHistoryDisplayBuilder,
                                invoiceDisplayBuilder, paymentDisplayBuilder) {

        httpBackend = $httpBackend;

        scope = $rootScope.$new();

        invoiceResourceMock.register();
        auditLogResourceMock.register();
        paymentResourceMock.register();
        settingResourceMock.register();
        localizationMocks.register();

        controller = $controller('Merchello.Dashboards.SalesOverviewController',
            { $scope: scope, $routeParams: { id: 'dd62d5a2-6a52-4de3-a740-193d2a25bbbb' },
                assetsService: assetsService, notificationsService: notificationsService, dialogService: dialogService, localizationService: localizationService,
                auditLogResource: auditLogResource, invoiceResource: invoiceResource, settingsResource: settingsResource,
                paymentResource: paymentResource, dialogDataFactory: dialogDataFactory, paymentDisplayBuilder: paymentDisplayBuilder,
                salesHistoryDisplayBuilder: salesHistoryDisplayBuilder, invoiceDisplayBuilder: invoiceDisplayBuilder });

        //scope.$digest resolves the promise against the httpbackend
        scope.$digest();

        //httpbackend.flush() resolves all request against the httpbackend
        //to fake a async response, (which is what happens on a real setup)
        httpBackend.flush();

    }));

    afterEach(inject(function($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it ('should load the invoice by default', function() {

        //// Assert
        expect(scope.invoice).toBeDefined();
        expect(scope.invoice.getPaymentStatus()).toBe('Paid');
        expect(scope.invoice.hasOrder()).toBeFalsy();
        expect(scope.invoice.isPaid()).toBeTruthy();
    });

    it('should set the currencySymbol', function() {

        //// Assert
        expect(scope.currencySymbol).toBe('$');
    });

    it('billing address should be defined on the scope', function() {
        //// Assert
        expect(scope.billingAddress).toBeDefined();
    });
});
