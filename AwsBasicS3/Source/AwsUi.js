define(['jquery'], function() {'use strict';

    var buttons = null;
    var options = null;
    var transformOptions = null;
    var dataIndex = 0;
    var dataIndexTransform = 0;
    var cfgCollectionName = 'FilesConfig'; //Name of collection where I keep my configs
    var MDsCollectionName = 'filesCollection';

    function AwsUi() {
        $("#listBuckets").click(listBuckets);
        $("#copyToS3").click(copyToS3);
        $("#transformForwardButton").click(forwardTransform);
        $("#tranformBackButton").click(backwardTransform);
        $("#forwardButton").click(forward);
        $("#backButton").click(backward);

        $("#buildAll").click(buildAll);
        
        $("#uploadMD").click(uploadMD);
        $("#downloadMD").click(downloadMD);        
        $("#getConfig").click(getConfig);
        $("#uploadConfig").click(uploadConfig);
        
        $("#getOptions").click(getConfigOptions);
        
        $("#saveTransformToMongo").click(saveTransformToMongo);
        $("#saveTransformToFile").click(saveTransformToFile);
        
        $("#saveOptionsToMongo").click(saveOptionsToMongo);
        $("#saveOptionsToFile").click(saveOptionsToFile);
        
         $("#finalProg272").click(finalProg272);
        
        
        
        getBuildConfig();
        getOptions();
    }
	
   var finalProg272= function(){
	   $.getJSON("/finalProg272", {
			path : '/home/bcuser/Dropbox/www/md',  
			tpath: '/var/www/bc',
            folders : ['Sonnets01','Sonnets02','Sonnets03','Sonnets04','Sonnets05','Sonnets06','Sonnets07'],
            collname : 'shakespeare'
            
        }, function(result) {
			console.log("Done");
		});
   }

	
	//Save updates Transform Config section to file
	var saveTransformToFile=function(){
		
		UpdateTransformObject();
		
		$.getJSON("/saveConfigToFile", {
			fname : './MarkdownTransformConfig.json', //Name of the file could be read from text box in future           
            object : transformOptions
        }, function(result) {
			
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
	}
	
	//Save updates Transform Config section to Mongo
	var saveTransformToMongo = function() {

        UpdateTransformObject();

        $.getJSON("/saveConfigMongo", {
			filter : {"meta.name":"MarkdownTransformConfig.json"},
            collname : cfgCollectionName,
            object : transformOptions
        }, function(result) {
			
            $("#buildData").empty();
            $("#buildData").append("<li>" + 'Config MarkdownTrans was updated in Mongo' + "</li>");

        });
        
    };
    

    
    var saveOptionsToMongo = function() {
		
        UpdateOptions();
		
        $.getJSON("/saveConfigMongo", {
			filter : {"meta.name":"Options.json"},
            collname : cfgCollectionName,
            object : options
        }, function(result) {
			
            //$("#buildData").empty();
            //var fileArray = result.data.split("\n");
            //for (var i = 0; i < fileArray.length; i++) {
                //if (fileArray[i].length > 0) {
                    //$("#buildData").append("<li>" + fileArray[i] + "</li>");
                //}
            //}
        });
        
    };
    
    //Save updates Options Config section to file
	var saveOptionsToFile=function(){
		
		UpdateTransformObject();
		
		$.getJSON("/saveConfigToFile", {
			fname : './Options.json', //Name of the file could be read from text box in future
            object : options
        }, function(result) {
			
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
	}
	
	
	
	
	//uses /getBuildConfigMongo with parameters to select configs for particular file - MarkdownTransformConfig.json
    var getConfig = function() {
        $.getJSON("/getBuildConfigMongo", {
            filter : {"meta.name":"MarkdownTransformConfig.json"},
            collname : cfgCollectionName
        }, function(result) {
			
			transformOptions = result;
            displayTransformConfig(transformOptions[dataIndexTransform]);
            
            console.log(transformOptions);
			
            //$("#buildData").empty();
            //var fileArray = result.data.split("\n");
            //for (var i = 0; i < fileArray.length; i++) {
                //if (fileArray[i].length > 0) {
                    //$("#buildData").append("<li>" + fileArray[i] + "</li>");
                //}
            //}
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };
    
    
    //uses /getBuildConfigMongo with parameters to select configs for particular file - Options.json
    var getConfigOptions = function() {
        $.getJSON("/getBuildConfigMongo", {
            filter : {"meta.name":"Options.json"},
            collname : cfgCollectionName
        }, function(result) {
			
			options = result;
            $('#documentCount').html(options.length);
            displayOptions(options[0]);
            
            console.log(options);
            
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };
    
    
    
    var uploadConfig = function() {
        $.getJSON("/insertFile", {
            filename : 'MarkdownTransformConfig.json, Options.json',
			path : '',
			collname : cfgCollectionName,
			type : 'a',
			comments : 'AwsBasicS3-local'
        }, function(result) {
			
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
    };
    
    
    var uploadMD = function() {
        $.getJSON("/insertMDsToMongo", {
            path : '/home/bcuser/Dropbox/www/md'+'/',
            collname : MDsCollectionName,
            markdownarr : ['sonnet1.md','sonnet2.md','sonnet3.md','sonnet4.md','sonnet5.md']
        }, function(result) {
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
    };
    
    
    var downloadMD = function() {
        $.getJSON("/getMDFileOut", {
            path : '/home/bcuser/Dropbox/www/md'+'/',
            collname : MDsCollectionName,
            filter : ''
        }, function(result) {
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
    };
    
    
    

    var buildAll = function() {
        $.getJSON("/buildAll", {
            options : JSON.stringify(transformOptions),
            index : dataIndexTransform
        }, function(result) {
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
    };

    var copyToS3 = function() {
        $.getJSON("/copyToS3", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            $("#copyResult").html("Result: " + data.result);
        });
    };

    var displayTransformConfig = function(options) {
        $("#pathToPython").val(options.pathToPython);
        $("#copyFrom").val(options.copyFrom);
        $("#copyTo").val(options.copyTo);
        $("#filesToCopy").val(options.filesToCopy);
    };

    var displayOptions = function(options) {
        $("#currentDocument").html(dataIndex + 1);
        $("#pathToConfig").val(options.pathToConfig);
        $("#reallyWrite").val(options.reallyWrite ? "true" : "false");
        $("#bucketName").val(options.bucketName);
        $("#folderToWalk").val(options.folderToWalk);
        $("#s3RootFolder").val(options.s3RootFolder);
        $("#createFolderToWalkOnS3").val(options.createFolderToWalkOnS3 ? "true" : "false");
        $("#createIndex").val(options.createIndex ? "true" : "false");
        $("#filesToIgnore").val(options.filesToIgnore);
    };
    
    
	var UpdateTransformObject=function(){
		transformOptions[dataIndexTransform].pathToPython=$("#pathToPython").val();
        transformOptions[dataIndexTransform].copyFrom=$("#copyFrom").val();
        transformOptions[dataIndexTransform].copyTo=$("#copyTo").val();
        transformOptions[dataIndexTransform].filesToCopy=$("#filesToCopy").val();
		console.log(transformOptions);
	}
	
	var UpdateOptions = function (){
		options[dataIndex].pathToConfig=$("#pathToConfig").val();
        options[dataIndex].reallyWrite=$("#reallyWrite").val();
        options[dataIndex].bucketName=$("#bucketName").val();
        options[dataIndex].folderToWalk=$("#folderToWalk").val();
        options[dataIndex].s3RootFolder=$("#s3RootFolder").val();
        options[dataIndex].createFolderToWalkOnS3=$("#createFolderToWalkOnS3").val();
        options[dataIndex].createIndex=$("#createIndex").val();
        options[dataIndex].filesToIgnore=$("#filesToIgnore").val();
		console.log(options);
	}

    var getBuildConfig = function() {
        $.getJSON("/getBuildConfig", function(optionsInit) {
            transformOptions = optionsInit;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };
    
    var getOptions = function() {
        $.getJSON("/getOptions", function(optionsInit) {
            options = optionsInit;
            $('#documentCount').html(options.length);
            displayOptions(options[0]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };

    var forwardTransform = function() {
		UpdateTransformObject();
		
        if (dataIndexTransform < transformOptions.length - 1) {
            dataIndexTransform++;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }
    };

    var backwardTransform = function() {
		UpdateTransformObject();
		
        if (dataIndexTransform > 0) {
            dataIndexTransform--;
            displayTransformConfig(transformOptions[dataIndexTransform]);
            return dataIndexTransform;
        }
        return dataIndexTransform;
    };

    var forward = function() {
		UpdateOptions();
		
        if (dataIndex < options.length - 1) {
            dataIndex++;
            displayOptions(options[dataIndex]);
        }
    };

    var backward = function() {
		UpdateOptions();
		
        if (dataIndex > 0) {
            dataIndex--;
            displayOptions(options[dataIndex]);
            return true;
        }
        return false;
    };

    var listBuckets = function() {
        $.getJSON("/listBuckets", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#buckets").append("<li>" + data[i] + "</li>");
            }
        });
    };

    return AwsUi;
});
/*
 $(document).ready(function() { 'use strict';
 new AwsUi();
 }); */
