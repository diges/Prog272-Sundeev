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
        //$("#saveTransformToFile").click(saveTransformToFile);
        
        $("#saveOptionsToMongo").click(saveOptionsToMongo);
        //$("#saveOptionsToFile").click(saveOptionsToFile);
        
        getBuildConfig();
        getOptions();
    }
	
	
	var saveTransformToMongo = function() {
		
        transformOptions[dataIndexTransform].pathToPython=$("#pathToPython").val();
        transformOptions[dataIndexTransform].copyFrom=$("#copyFrom").val();
        transformOptions[dataIndexTransform].copyTo=$("#copyTo").val();
        transformOptions[dataIndexTransform].filesToCopy=$("#filesToCopy").val();


		console.log(transformOptions);
		console.log(options);
        $.getJSON("/saveConfigMongo", {
			filter : {"meta.name":"MarkdownTransformConfig.json"},
            collname : cfgCollectionName,
            object : transformOptions
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
    
    var saveOptionsToMongo = function() {
		
        options.pathToConfig=$("#pathToConfig").val();
        $("#reallyWrite").val(options.reallyWrite ? "true" : "false");
        $("#bucketName").val(options.bucketName);
        $("#folderToWalk").val(options.folderToWalk);
        $("#s3RootFolder").val(options.s3RootFolder);
        $("#createFolderToWalkOnS3").val(options.createFolderToWalkOnS3 ? "true" : "false");
        $("#createIndex").val(options.createIndex ? "true" : "false");
        $("#filesToIgnore").val(options.filesToIgnore);


		console.log(transformOptions);
		console.log(options);
        $.getJSON("/saveConfigMongo", {
			filter : {"meta.name":"MarkdownTransformConfig.json"},
            collname : cfgCollectionName,
            object : transformOptions
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
	
	
	
	
	//uses /getBuildConfigMongo with parameters to select configs for particular file - MarkdownTransformConfig.json
    var getConfig = function() {
        $.getJSON("/getBuildConfigMongo", {
            filter : {"meta.name":"MarkdownTransformConfig.json"},
            collname : cfgCollectionName
        }, function(result) {
			
			transformOptions = result;
            displayTransformConfig(transformOptions[dataIndexTransform]);
			
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
        if (dataIndexTransform < transformOptions.length - 1) {
            dataIndexTransform++;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }
    };

    var backwardTransform = function() {
        if (dataIndexTransform > 0) {
            dataIndexTransform--;
            displayTransformConfig(transformOptions[dataIndexTransform]);
            return dataIndexTransform;
        }
        return dataIndexTransform;
    };

    var forward = function() {
        if (dataIndex < options.length - 1) {
            dataIndex++;
            displayOptions(options[dataIndex]);
        }
    };

    var backward = function() {
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
