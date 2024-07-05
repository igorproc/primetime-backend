"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function generateSwaggerTypes(typeName) {
    var outputPath = "dist/".concat(typeName);
    var command = "\n    npx swagger-typescript-api       -p https://kinopoiskapiunofficial.tech/documentation/api/openapi.json       -o ".concat(outputPath, " -n ").concat(typeName, ".d.ts\n  ");
    (0, child_process_1.execSync)(command, { stdio: 'inherit' });
}
module.exports = {
    generateKPTypes: function () { return generateSwaggerTypes('kp'); },
    generateKPPayTypes: function () { return generateSwaggerTypes('kp-pay'); }
};
