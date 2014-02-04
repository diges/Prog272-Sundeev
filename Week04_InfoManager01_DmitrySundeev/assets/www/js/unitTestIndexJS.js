/**
 * @author Dmitry
 */



describe("Prog272 JSON test", function() {'use strict';
	var myObj = null;    
    var $httpBackend = null;
    
    beforeEach(inject(function($rootScope, $controller) {        
        myObj = $rootScope.$new();
        $controller('MyObj', { $scope: myObj }); 
    }));
    
    beforeEach(inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

	it("expects firstname equal George", function() {
		$httpBackend.expectGET('index.json').respond([{
			"id" : 1,
			"info" : "George Washington was the first President of the United States, the commander-in-chief of the Continental Army during the American Revolutionary War, and one of the Founding Fathers of the United States.",
			"Born" : "February 22, 1732",
			"Died" : "December 14, 1799",
			"firstName" : "George",
			"lastName" : "Washington"
		}, {
			"id" : 2,
			"info" : "John Adams was the second president of the United States, having earlier served as the first vice president of the United States.",
			"Born" : "October 30, 1735",
			"Died" : "July 4, 1826",
			"firstName" : "John",
			"lastName" : "Adams"
		}, {
			"id" : 3,
			"info" : "Thomas Jefferson was an American Founding Father, the principal author of the Declaration of Independence and the third President of the United States. He was a spokesman for democracy and the rights of man with worldwide influence.",
			"Born" : "April 13, 1743",
			"Died" : "July 4, 1826",
			"firstName" : "Thomas",
			"lastName" : "Jefferson"
		}]);
		
		myObj.getData(0);
		$httpBackend.flush();
		expect(myObj.data[0].firstName).toEqual("George");
	});


});

