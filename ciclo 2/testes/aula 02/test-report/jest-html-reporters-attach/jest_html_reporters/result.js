window.jest_html_reporters_callback__({"numFailedTestSuites":0,"numFailedTests":0,"numPassedTestSuites":1,"numPassedTests":29,"numPendingTestSuites":0,"numPendingTests":0,"numRuntimeErrorTestSuites":0,"numTodoTests":0,"numTotalTestSuites":1,"numTotalTests":29,"startTime":1684268527514,"success":false,"testResults":[{"numFailingTests":0,"numPassingTests":29,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1684268540262,"runtime":12712,"slow":true,"start":1684268527550},"testFilePath":"/home/arthur/desktop/alpha/hard/aulas/ciclo 2/testes/aula 02/__tests__/integration/orders.test.js","failureMessage":null,"testResults":[{"ancestorTitles":["GET /orders/:order_id/items"],"duration":503,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 401 if user token is missing","status":"passed","title":"should return status 401 if user token is missing"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":335,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 401 if user token is invalid","status":"passed","title":"should return status 401 if user token is invalid"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":380,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 400 if order_id is invalid","status":"passed","title":"should return status 400 if order_id is invalid"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":338,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 404 if order does not exist","status":"passed","title":"should return status 404 if order does not exist"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":435,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 403 if user is not owner of the order","status":"passed","title":"should return status 403 if user is not owner of the order"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":492,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return the order items and status 200 if user is the owner of the order","status":"passed","title":"should return the order items and status 200 if user is the owner of the order"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":384,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 401 if user token is missing","status":"passed","title":"should return status 401 if user token is missing"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":331,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 401 if user token is invalid","status":"passed","title":"should return status 401 if user token is invalid"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":436,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 400 if order_id is invalid","status":"passed","title":"should return status 400 if order_id is invalid"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":369,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 400 if product_id is invalid","status":"passed","title":"should return status 400 if product_id is invalid"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":301,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 400 if quantity is invalid","status":"passed","title":"should return status 400 if quantity is invalid"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":344,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 404 if order does not exist","status":"passed","title":"should return status 404 if order does not exist"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":307,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 404 if product does not exist","status":"passed","title":"should return status 404 if product does not exist"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":719,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 403 if user is not owner of the order","status":"passed","title":"should return status 403 if user is not owner of the order"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":380,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 404 if product is not on the order","status":"passed","title":"should return status 404 if product is not on the order"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":396,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return body as {data: null, err: null} and status 200 if user is the owner of the order","status":"passed","title":"should return body as {data: null, err: null} and status 200 if user is the owner of the order"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":322,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 401 if user token is missing","status":"passed","title":"should return status 401 if user token is missing"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":365,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 401 if user token is invalid","status":"passed","title":"should return status 401 if user token is invalid"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":469,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 400 if order_id is invalid","status":"passed","title":"should return status 400 if order_id is invalid"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":318,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 400 if the code is not a string","status":"passed","title":"should return status 400 if the code is not a string"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":375,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 404 if order does not exist","status":"passed","title":"should return status 404 if order does not exist"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":433,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 403 if user is not owner of the order","status":"passed","title":"should return status 403 if user is not owner of the order"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":384,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 403 if order is already closed","status":"passed","title":"should return status 403 if order is already closed"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":445,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 404 if code does not exists","status":"passed","title":"should return status 404 if code does not exists"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":536,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 403 if code is expired","status":"passed","title":"should return status 403 if code is expired"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":446,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 403 if order's total price is lesser than code's minimun order price","status":"passed","title":"should return status 403 if order's total price is lesser than code's minimun order price"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":477,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 403 if code is not eligible for current order","status":"passed","title":"should return status 403 if code is not eligible for current order"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":480,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 403 if code was already used","status":"passed","title":"should return status 403 if code was already used"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":451,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return body as {data: null, err: null} and status 200 if a valid code is applyed","status":"passed","title":"should return body as {data: null, err: null} and status 200 if a valid code is applyed"}]}],"config":{"bail":0,"changedFilesWithAncestor":false,"ci":false,"collectCoverage":true,"collectCoverageFrom":[],"coverageDirectory":"/home/arthur/desktop/alpha/hard/aulas/ciclo 2/testes/aula 02/test-report/coverage","coverageProvider":"babel","coverageReporters":["json","text","lcov","clover"],"detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"expand":false,"findRelatedTests":false,"forceExit":false,"json":false,"lastCommit":false,"listTests":false,"logHeapUsage":false,"maxConcurrency":5,"maxWorkers":3,"noStackTrace":false,"nonFlagArgs":["./__tests__/integration/orders.test.js"],"notify":false,"notifyMode":"failure-change","onlyChanged":false,"onlyFailures":false,"openHandlesTimeout":1000,"passWithNoTests":false,"projects":[],"reporters":[["default",{}],["/home/arthur/desktop/alpha/hard/aulas/ciclo 2/testes/aula 02/node_modules/jest-html-reporters/index.js",{"publicPath":"./test-report"}]],"rootDir":"/home/arthur/desktop/alpha/hard/aulas/ciclo 2/testes/aula 02","runTestsByPath":false,"seed":-1310767545,"skipFilter":false,"snapshotFormat":{"escapeString":false,"printBasicPrototype":false},"testFailureExitCode":1,"testPathPattern":"./__tests__/integration/orders.test.js","testSequencer":"/home/arthur/desktop/alpha/hard/aulas/ciclo 2/testes/aula 02/node_modules/@jest/test-sequencer/build/index.js","updateSnapshot":"new","useStderr":false,"verbose":true,"watch":false,"watchAll":false,"watchman":true,"workerThreads":false,"coverageLinkPath":"coverage/lcov-report/index.html"},"endTime":1684268540285,"_reporterOptions":{"publicPath":"./test-report","filename":"jest_html_reporters.html","expand":false,"pageTitle":"","hideIcon":false,"testCommand":"","openReport":false,"failureMessageOnly":0,"enableMergeData":false,"dataMergeLevel":1,"inlineSource":false,"urlForTestFiles":"","darkTheme":false,"includeConsoleLog":false},"logInfoMapping":{},"attachInfos":{}})