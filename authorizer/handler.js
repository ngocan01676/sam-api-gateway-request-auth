exports.authorizer = async function (event) {
    console.log(JSON.stringify(event))
    //const arrAllow = ['/healthcheck','/work','/docs/file-upload-simple','/docs/file-upload','/docs/create'];
    //const token = event.authorizationToken.toLowerCase();
    const token = event.headers.token;
    const methodArn = event.methodArn;
    // const result1 = arrAllow.some(x => x.indexOf(event.methodArn?.toString()));
    // const result2 = arrAllow.some(x => methodArn?.toString().indexOf(x));
    // const isAllow = arrAllow.some(x => x == event.requestContext['resourcePath'])
    // if (isAllow) {
    //     return generateAuthResponse('user', 'Allow', methodArn);
    // }
    // if (token == 'test') {
    //     return generateAuthResponse('user', 'Allow', methodArn);
    // } else {
    //     return generateAuthResponse('user', 'Deny', methodArn);
    // }

    if (token == 'allow') {
        return generateAuthResponse('user', 'Allow', methodArn);
    } else {
        return generateAuthResponse('user', 'Deny', methodArn);
    }
}

function generateAuthResponse(principalId, effect, methodArn) {
    const policyDocument = generatePolicyDocument(effect, methodArn);

    return {
        principalId,
        policyDocument
    }
}

function generatePolicyDocument(effect, methodArn) {
    if (!effect || !methodArn) return null

    const policyDocument = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn
        }]
    };

    return policyDocument;
}