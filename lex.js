var AWS = require('aws-sdk');
var Q = require('q');

var config = require('./config.json');

module.exports = function(content, contentType, acceptContentType, userId){
	var lexruntime = new AWS.LexRuntime({ 
			region: config.region,
			accessKeyId: config.accessKeyId,
			secretAccessKey: config.secretAccessKey
		});

	var params = {
		botAlias: config.botAlias,
		botName: config.botName,
		contentType: contentType,
		inputStream: content,
		userId: userId,
		accept: acceptContentType,
		sessionAttributes: {"random": "random_str"}
	};

	var defer = Q.defer();
	lexruntime.postContent(params, function(err, data) {
		if (err) 
			defer.reject(err);
		else
			defer.resolve(data);
	});
	return defer.promise;
};