(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
function fmtDef(validate, compare) {
    return { validate, compare };
}
exports.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: fmtDef(date, compareDate),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: fmtDef(time, compareTime),
    "date-time": fmtDef(date_time, compareDateTime),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte,
    // signed 32 bit integer
    int32: { type: "number", validate: validateInt32 },
    // signed 64 bit integer
    int64: { type: "number", validate: validateInt64 },
    // C-type float
    float: { type: "number", validate: validateNumber },
    // C-type double
    double: { type: "number", validate: validateNumber },
    // hint to the UI to hide input strings
    password: true,
    // unchecked string payload
    binary: true,
};
exports.fastFormats = {
    ...exports.fullFormats,
    date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
    time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareTime),
    "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
};
exports.formatNames = Object.keys(exports.fullFormats);
function isLeapYear(year) {
    // https://tools.ietf.org/html/rfc3339#appendix-C
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function date(str) {
    // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
    const matches = DATE.exec(str);
    if (!matches)
        return false;
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    return (month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]));
}
function compareDate(d1, d2) {
    if (!(d1 && d2))
        return undefined;
    if (d1 > d2)
        return 1;
    if (d1 < d2)
        return -1;
    return 0;
}
const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
function time(str, withTimeZone) {
    const matches = TIME.exec(str);
    if (!matches)
        return false;
    const hour = +matches[1];
    const minute = +matches[2];
    const second = +matches[3];
    const timeZone = matches[5];
    return (((hour <= 23 && minute <= 59 && second <= 59) ||
        (hour === 23 && minute === 59 && second === 60)) &&
        (!withTimeZone || timeZone !== ""));
}
function compareTime(t1, t2) {
    if (!(t1 && t2))
        return undefined;
    const a1 = TIME.exec(t1);
    const a2 = TIME.exec(t2);
    if (!(a1 && a2))
        return undefined;
    t1 = a1[1] + a1[2] + a1[3] + (a1[4] || "");
    t2 = a2[1] + a2[2] + a2[3] + (a2[4] || "");
    if (t1 > t2)
        return 1;
    if (t1 < t2)
        return -1;
    return 0;
}
const DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
    // http://tools.ietf.org/html/rfc3339#section-5.6
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
}
function compareDateTime(dt1, dt2) {
    if (!(dt1 && dt2))
        return undefined;
    const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
    const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
    const res = compareDate(d1, d2);
    if (res === undefined)
        return undefined;
    return res || compareTime(t1, t2);
}
const NOT_URI_FRAGMENT = /\/|:/;
const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
    // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
    BYTE.lastIndex = 0;
    return BYTE.test(str);
}
const MIN_INT32 = -(2 ** 31);
const MAX_INT32 = 2 ** 31 - 1;
function validateInt32(value) {
    return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
}
function validateInt64(value) {
    // JSON and javascript max Int is 2**53, so any int that passes isInteger is valid for Int64
    return Number.isInteger(value);
}
function validateNumber() {
    return true;
}
const Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
    if (Z_ANCHOR.test(str))
        return false;
    try {
        new RegExp(str);
        return true;
    }
    catch (e) {
        return false;
    }
}

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formats_1 = require("./formats");
const limit_1 = require("./limit");
const codegen_1 = require("ajv/dist/compile/codegen");
const fullName = new codegen_1.Name("fullFormats");
const fastName = new codegen_1.Name("fastFormats");
const formatsPlugin = (ajv, opts = { keywords: true }) => {
    if (Array.isArray(opts)) {
        addFormats(ajv, opts, formats_1.fullFormats, fullName);
        return ajv;
    }
    const [formats, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
    const list = opts.formats || formats_1.formatNames;
    addFormats(ajv, list, formats, exportName);
    if (opts.keywords)
        limit_1.default(ajv);
    return ajv;
};
formatsPlugin.get = (name, mode = "full") => {
    const formats = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
    const f = formats[name];
    if (!f)
        throw new Error(`Unknown format "${name}"`);
    return f;
};
function addFormats(ajv, list, fs, exportName) {
    var _a;
    var _b;
    (_a = (_b = ajv.opts.code).formats) !== null && _a !== void 0 ? _a : (_b.formats = codegen_1._ `require("ajv-formats/dist/formats").${exportName}`);
    for (const f of list)
        ajv.addFormat(f, fs[f]);
}
module.exports = exports = formatsPlugin;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatsPlugin;

},{"./formats":1,"./limit":3,"ajv/dist/compile/codegen":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLimitDefinition = void 0;
const ajv_1 = require("ajv");
const codegen_1 = require("ajv/dist/compile/codegen");
const ops = codegen_1.operators;
const KWDs = {
    formatMaximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    formatMinimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    formatExclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => codegen_1.str `should be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => codegen_1._ `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
exports.formatLimitDefinition = {
    keyword: Object.keys(KWDs),
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, keyword, it } = cxt;
        const { opts, self } = it;
        if (!opts.validateFormats)
            return;
        const fCxt = new ajv_1.KeywordCxt(it, self.RULES.all.format.definition, "format");
        if (fCxt.$data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fmt = gen.const("fmt", codegen_1._ `${fmts}[${fCxt.schemaCode}]`);
            cxt.fail$data(codegen_1.or(codegen_1._ `typeof ${fmt} != "object"`, codegen_1._ `${fmt} instanceof RegExp`, codegen_1._ `typeof ${fmt}.compare != "function"`, compareCode(fmt)));
        }
        function validateFormat() {
            const format = fCxt.schema;
            const fmtDef = self.formats[format];
            if (!fmtDef || fmtDef === true)
                return;
            if (typeof fmtDef != "object" ||
                fmtDef instanceof RegExp ||
                typeof fmtDef.compare != "function") {
                throw new Error(`"${keyword}": format "${format}" does not define "compare" function`);
            }
            const fmt = gen.scopeValue("formats", {
                key: format,
                ref: fmtDef,
                code: opts.code.formats ? codegen_1._ `${opts.code.formats}${codegen_1.getProperty(format)}` : undefined,
            });
            cxt.fail$data(compareCode(fmt));
        }
        function compareCode(fmt) {
            return codegen_1._ `${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
        }
    },
    dependencies: ["format"],
};
const formatLimitPlugin = (ajv) => {
    ajv.addKeyword(exports.formatLimitDefinition);
    return ajv;
};
exports.default = formatLimitPlugin;

},{"ajv":4,"ajv/dist/compile/codegen":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = require("./core");
const draft7_1 = require("./vocabularies/draft7");
const discriminator_1 = require("./vocabularies/discriminator");
const draft7MetaSchema = require("./refs/json-schema-draft-07.json");
const META_SUPPORT_DATA = ["/properties"];
const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
class Ajv extends core_1.default {
    _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
            return;
        const metaSchema = this.opts.$data
            ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA)
            : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ajv;
var validate_1 = require("./compile/validate");
Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
var codegen_1 = require("./compile/codegen");
Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });

},{"./compile/codegen":6,"./compile/validate":19,"./core":22,"./refs/json-schema-draft-07.json":24,"./vocabularies/discriminator":50,"./vocabularies/draft7":52}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
class _CodeOrName {}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
  constructor(s) {
    super();
    if (!exports.IDENTIFIER.test(s)) throw new Error("CodeGen: name must be a valid identifier");
    this.str = s;
  }
  toString() {
    return this.str;
  }
  emptyStr() {
    return false;
  }
  get names() {
    return {
      [this.str]: 1
    };
  }
}
exports.Name = Name;
class _Code extends _CodeOrName {
  constructor(code) {
    super();
    this._items = typeof code === "string" ? [code] : code;
  }
  toString() {
    return this.str;
  }
  emptyStr() {
    if (this._items.length > 1) return false;
    const item = this._items[0];
    return item === "" || item === '""';
  }
  get str() {
    var _a;
    return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
  }
  get names() {
    var _a;
    return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
      if (c instanceof Name) names[c.str] = (names[c.str] || 0) + 1;
      return names;
    }, {});
  }
}
exports._Code = _Code;
exports.nil = new _Code("");
function _(strs, ...args) {
  const code = [strs[0]];
  let i = 0;
  while (i < args.length) {
    addCodeArg(code, args[i]);
    code.push(strs[++i]);
  }
  return new _Code(code);
}
exports._ = _;
const plus = new _Code("+");
function str(strs, ...args) {
  const expr = [safeStringify(strs[0])];
  let i = 0;
  while (i < args.length) {
    expr.push(plus);
    addCodeArg(expr, args[i]);
    expr.push(plus, safeStringify(strs[++i]));
  }
  optimize(expr);
  return new _Code(expr);
}
exports.str = str;
function addCodeArg(code, arg) {
  if (arg instanceof _Code) code.push(...arg._items);else if (arg instanceof Name) code.push(arg);else code.push(interpolate(arg));
}
exports.addCodeArg = addCodeArg;
function optimize(expr) {
  let i = 1;
  while (i < expr.length - 1) {
    if (expr[i] === plus) {
      const res = mergeExprItems(expr[i - 1], expr[i + 1]);
      if (res !== undefined) {
        expr.splice(i - 1, 3, res);
        continue;
      }
      expr[i++] = "+";
    }
    i++;
  }
}
function mergeExprItems(a, b) {
  if (b === '""') return a;
  if (a === '""') return b;
  if (typeof a == "string") {
    if (b instanceof Name || a[a.length - 1] !== '"') return;
    if (typeof b != "string") return `${a.slice(0, -1)}${b}"`;
    if (b[0] === '"') return a.slice(0, -1) + b.slice(1);
    return;
  }
  if (typeof b == "string" && b[0] === '"' && !(a instanceof Name)) return `"${a}${b.slice(1)}`;
  return;
}
function strConcat(c1, c2) {
  return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
}
exports.strConcat = strConcat;
// TODO do not allow arrays here
function interpolate(x) {
  return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
}
function stringify(x) {
  return new _Code(safeStringify(x));
}
exports.stringify = stringify;
function safeStringify(x) {
  return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
exports.safeStringify = safeStringify;
function getProperty(key) {
  return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
}
exports.getProperty = getProperty;
//Does best effort to format the name properly
function getEsmExportName(key) {
  if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
    return new _Code(`${key}`);
  }
  throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
}
exports.getEsmExportName = getEsmExportName;
function regexpCode(rx) {
  return new _Code(rx.toString());
}
exports.regexpCode = regexpCode;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
const code_1 = require("./code");
const scope_1 = require("./scope");
var code_2 = require("./code");
Object.defineProperty(exports, "_", { enumerable: true, get: function () { return code_2._; } });
Object.defineProperty(exports, "str", { enumerable: true, get: function () { return code_2.str; } });
Object.defineProperty(exports, "strConcat", { enumerable: true, get: function () { return code_2.strConcat; } });
Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return code_2.nil; } });
Object.defineProperty(exports, "getProperty", { enumerable: true, get: function () { return code_2.getProperty; } });
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return code_2.stringify; } });
Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function () { return code_2.regexpCode; } });
Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return code_2.Name; } });
var scope_2 = require("./scope");
Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return scope_2.Scope; } });
Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function () { return scope_2.ValueScope; } });
Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function () { return scope_2.ValueScopeName; } });
Object.defineProperty(exports, "varKinds", { enumerable: true, get: function () { return scope_2.varKinds; } });
exports.operators = {
    GT: new code_1._Code(">"),
    GTE: new code_1._Code(">="),
    LT: new code_1._Code("<"),
    LTE: new code_1._Code("<="),
    EQ: new code_1._Code("==="),
    NEQ: new code_1._Code("!=="),
    NOT: new code_1._Code("!"),
    OR: new code_1._Code("||"),
    AND: new code_1._Code("&&"),
    ADD: new code_1._Code("+"),
};
class Node {
    optimizeNodes() {
        return this;
    }
    optimizeNames(_names, _constants) {
        return this;
    }
}
class Def extends Node {
    constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
    }
    render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (!names[this.name.str])
            return;
        if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
    }
}
class Assign extends Node {
    constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
    }
    render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
    }
}
class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
    }
    render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
}
class Label extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        return `${this.label}:` + _n;
    }
}
class Break extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
    }
}
class Throw extends Node {
    constructor(error) {
        super();
        this.error = error;
    }
    render({ _n }) {
        return `throw ${this.error};` + _n;
    }
    get names() {
        return this.error.names;
    }
}
class AnyCode extends Node {
    constructor(code) {
        super();
        this.code = code;
    }
    render({ _n }) {
        return `${this.code};` + _n;
    }
    optimizeNodes() {
        return `${this.code}` ? this : undefined;
    }
    optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
    }
    get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
    }
}
class ParentNode extends Node {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
    }
    optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
                nodes.splice(i, 1, ...n);
            else if (n)
                nodes[i] = n;
            else
                nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            // iterating backwards improves 1-pass optimization
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
                continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
    }
}
class BlockNode extends ParentNode {
    render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
}
class Root extends ParentNode {
}
class Else extends BlockNode {
}
Else.kind = "else";
class If extends BlockNode {
    constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
    }
    render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
            code += "else " + this.else.render(opts);
        return code;
    }
    optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
            return this.nodes; // else is ignored here
        let e = this.else;
        if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
            if (cond === false)
                return e instanceof If ? e : e.nodes;
            if (this.nodes.length)
                return this;
            return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
            return undefined;
        return this;
    }
    optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
            return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
            addNames(names, this.else.names);
        return names;
    }
}
If.kind = "if";
class For extends BlockNode {
}
For.kind = "for";
class ForLoop extends For {
    constructor(iteration) {
        super();
        this.iteration = iteration;
    }
    render(opts) {
        return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iteration.names);
    }
}
class ForRange extends For {
    constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
    }
    render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
    }
}
class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
    }
    render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iterable.names);
    }
}
class Func extends BlockNode {
    constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
    }
    render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
}
Func.kind = "func";
class Return extends ParentNode {
    render(opts) {
        return "return " + super.render(opts);
    }
}
Return.kind = "return";
class Try extends BlockNode {
    render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
            code += this.catch.render(opts);
        if (this.finally)
            code += this.finally.render(opts);
        return code;
    }
    optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
    }
    optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        if (this.catch)
            addNames(names, this.catch.names);
        if (this.finally)
            addNames(names, this.finally.names);
        return names;
    }
}
class Catch extends BlockNode {
    constructor(error) {
        super();
        this.error = error;
    }
    render(opts) {
        return `catch(${this.error})` + super.render(opts);
    }
}
Catch.kind = "catch";
class Finally extends BlockNode {
    render(opts) {
        return "finally" + super.render(opts);
    }
}
Finally.kind = "finally";
class CodeGen {
    constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
    }
    toString() {
        return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
        return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
        return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
        vs.add(name);
        return name;
    }
    getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
        return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== undefined && constant)
            this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
        if (typeof c == "function")
            c();
        else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
        return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
            if (code.length > 1)
                code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
                code.push(":");
                (0, code_1.addCodeArg)(code, value);
            }
        }
        code.push("}");
        return new code_1._Code(code);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
        }
        else if (thenBody) {
            this.code(thenBody).endIf();
        }
        else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
        return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
        return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
        return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
            this.code(forBody).endFor();
        return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._) `${arr}.length`, (i) => {
                this.var(name, (0, code_1._) `${arr}[${i}]`);
                forBody(name);
            });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._) `Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
        return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
        return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
        return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
        }
        if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error) {
        return this._leafNode(new Throw(error));
    }
    // start self-balancing block
    block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
            this.code(body).endBlock(nodeCount);
        return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === undefined)
            throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
            this.code(funcBody).endFunc();
        return this;
    }
    // end function definition
    endFunc() {
        return this._endBlockNode(Func);
    }
    optimize(n = 1) {
        while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
        }
    }
    _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
    }
    _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || (N2 && n instanceof N2)) {
            this._nodes.pop();
            return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
    }
    get _root() {
        return this._nodes[0];
    }
    get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
    }
    set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
    }
}
exports.CodeGen = CodeGen;
function addNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
    return names;
}
function addExprNames(names, from) {
    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
}
function optimizeExpr(expr, names, constants) {
    if (expr instanceof code_1.Name)
        return replaceName(expr);
    if (!canOptimize(expr))
        return expr;
    return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
            c = replaceName(c);
        if (c instanceof code_1._Code)
            items.push(...c._items);
        else
            items.push(c);
        return items;
    }, []));
    function replaceName(n) {
        const c = constants[n.str];
        if (c === undefined || names[n.str] !== 1)
            return n;
        delete names[n.str];
        return c;
    }
    function canOptimize(e) {
        return (e instanceof code_1._Code &&
            e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
    }
}
function subtractNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
}
function not(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._) `!${par(x)}`;
}
exports.not = not;
const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
function and(...args) {
    return args.reduce(andCode);
}
exports.and = and;
const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
function or(...args) {
    return args.reduce(orCode);
}
exports.or = or;
function mappend(op) {
    return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._) `${par(x)} ${op} ${par(y)}`);
}
function par(x) {
    return x instanceof code_1.Name ? x : (0, code_1._) `(${x})`;
}

},{"./code":5,"./scope":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
const code_1 = require("./code");
class ValueError extends Error {
    constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
    }
}
var UsedValueState;
(function (UsedValueState) {
    UsedValueState[UsedValueState["Started"] = 0] = "Started";
    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
})(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
exports.varKinds = {
    const: new code_1.Name("const"),
    let: new code_1.Name("let"),
    var: new code_1.Name("var"),
};
class Scope {
    constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
    }
    toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
        return new code_1.Name(this._newName(prefix));
    }
    _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return (this._names[prefix] = { prefix, index: 0 });
    }
}
exports.Scope = Scope;
class ValueScopeName extends code_1.Name {
    constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._) `.${new code_1.Name(property)}[${itemIndex}]`;
    }
}
exports.ValueScopeName = ValueScopeName;
const line = (0, code_1._) `\n`;
class ValueScope extends Scope {
    constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
    }
    get() {
        return this._scope;
    }
    name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
        var _a;
        if (value.ref === undefined)
            throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
                return _name;
        }
        else {
            vs = this._values[prefix] = new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
    }
    getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
            return;
        return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
            if (name.scopePath === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return (0, code_1._) `${scopeName}${name.scopePath}`;
        });
    }
    scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
            if (name.value === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
        }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
                continue;
            const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
            vs.forEach((name) => {
                if (nameSet.has(name))
                    return;
                nameSet.set(name, UsedValueState.Started);
                let c = valueCode(name);
                if (c) {
                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                    code = (0, code_1._) `${code}${def} ${name} = ${c};${this.opts._n}`;
                }
                else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                    code = (0, code_1._) `${code}${c}${this.opts._n}`;
                }
                else {
                    throw new ValueError(name);
                }
                nameSet.set(name, UsedValueState.Completed);
            });
        }
        return code;
    }
}
exports.ValueScope = ValueScope;

},{"./code":5}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
const codegen_1 = require("./codegen");
const util_1 = require("./util");
const names_1 = require("./names");
exports.keywordError = {
    message: ({ keyword }) => (0, codegen_1.str) `must pass "${keyword}" keyword validation`,
};
exports.keyword$DataError = {
    message: ({ keyword, schemaType }) => schemaType
        ? (0, codegen_1.str) `"${keyword}" keyword must be ${schemaType} ($data)`
        : (0, codegen_1.str) `"${keyword}" keyword is invalid ($data)`,
};
function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
        addError(gen, errObj);
    }
    else {
        returnErrors(it, (0, codegen_1._) `[${errObj}]`);
    }
}
exports.reportError = reportError;
function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
    }
}
exports.reportExtraError = reportExtraError;
function resetErrorsCount(gen, errsCount) {
    gen.assign(names_1.default.errors, errsCount);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._) `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
}
exports.resetErrorsCount = resetErrorsCount;
function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
    /* istanbul ignore if */
    if (errsCount === undefined)
        throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._) `${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._) `${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._) `${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._) `${err}.schemaPath`, (0, codegen_1.str) `${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
            gen.assign((0, codegen_1._) `${err}.schema`, schemaValue);
            gen.assign((0, codegen_1._) `${err}.data`, data);
        }
    });
}
exports.extendErrors = extendErrors;
function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._) `[${err}]`), (0, codegen_1._) `${names_1.default.vErrors}.push(${err})`);
    gen.code((0, codegen_1._) `${names_1.default.errors}++`);
}
function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
        gen.throw((0, codegen_1._) `new ${it.ValidationError}(${errs})`);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, errs);
        gen.return(false);
    }
}
const E = {
    keyword: new codegen_1.Name("keyword"),
    schemaPath: new codegen_1.Name("schemaPath"),
    params: new codegen_1.Name("params"),
    propertyName: new codegen_1.Name("propertyName"),
    message: new codegen_1.Name("message"),
    schema: new codegen_1.Name("schema"),
    parentSchema: new codegen_1.Name("parentSchema"),
};
function errorObjectCode(cxt, error, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
        return (0, codegen_1._) `{}`;
    return errorObject(cxt, error, errorPaths);
}
function errorObject(cxt, error, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths),
    ];
    extraErrorProps(cxt, error, keyValues);
    return gen.object(...keyValues);
}
function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath
        ? (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}`
        : errorPath;
    return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
}
function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str) `${errSchemaPath}/${keyword}`;
    if (schemaPath) {
        schPath = (0, codegen_1.str) `${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
}
function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._) `{}`]);
    if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._) `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
    }
    if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
}

},{"./codegen":6,"./names":10,"./util":14}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
const codegen_1 = require("./codegen");
const validation_error_1 = require("../runtime/validation_error");
const names_1 = require("./names");
const resolve_1 = require("./resolve");
const util_1 = require("./util");
const validate_1 = require("./validate");
class SchemaEnv {
    constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
            schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
    }
}
exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
function compileSchema(sch) {
    // TODO refactor - remove compilations
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
        return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId); // TODO if getFullPath removed 1 tests fails
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._) `require("ajv/dist/runtime/validation_error").default`,
        });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
            ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) }
            : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._) `""`,
        opts: this.opts,
        self: this,
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        // gen.optimize(1)
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
        if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
        // console.log("\n\n\n *** \n", sourceCode)
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
            validate.$async = true;
        if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
                props: props instanceof codegen_1.Name ? undefined : props,
                items: items instanceof codegen_1.Name ? undefined : items,
                dynamicProps: props instanceof codegen_1.Name,
                dynamicItems: items instanceof codegen_1.Name,
            };
            if (validate.source)
                validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
    }
    catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
        // console.log("\n\n\n *** \n", sourceCode, this.opts)
        throw e;
    }
    finally {
        this._compilations.delete(sch);
    }
}
exports.compileSchema = compileSchema;
function resolveRef(root, baseId, ref) {
    var _a;
    ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
    const schOrFunc = root.refs[ref];
    if (schOrFunc)
        return schOrFunc;
    let _sch = resolve.call(this, root, ref);
    if (_sch === undefined) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
        const { schemaId } = this.opts;
        if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === undefined)
        return;
    return (root.refs[ref] = inlineOrCompile.call(this, _sch));
}
exports.resolveRef = resolveRef;
function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
}
// Index of schema compilation in the currently compiled list
function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
            return sch;
    }
}
exports.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(root, // information about the root schema for the current schema
ref // reference to resolve
) {
    let sch;
    while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
}
// Resolve schema, its root and baseId
function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
ref // reference to resolve
) {
    const p = this.opts.uriResolver.parse(ref);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, undefined);
    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
    }
    const id = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id] || this.schemas[id];
    if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
        return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
    if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
    if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
}
exports.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions",
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
            return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === undefined)
            return;
        schema = partSchema;
        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
    }
    // even though resolution failed we need to return SchemaEnv to throw exception
    // so that compileAsync loads missing schema.
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
        return env;
    return undefined;
}

},{"../runtime/validation_error":28,"./codegen":6,"./names":10,"./resolve":12,"./util":14,"./validate":19}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("./codegen");
const names = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    errors: new codegen_1.Name("errors"),
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart"),
};
exports.default = names;

},{"./codegen":6}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_1 = require("./resolve");
class MissingRefError extends Error {
    constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
    }
}
exports.default = MissingRefError;

},{"./resolve":12}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
const util_1 = require("./util");
const equal = require("fast-deep-equal");
const traverse = require("json-schema-traverse");
// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const",
]);
function inlineRef(schema, limit = true) {
    if (typeof schema == "boolean")
        return true;
    if (limit === true)
        return !hasRef(schema);
    if (!limit)
        return false;
    return countKeys(schema) <= limit;
}
exports.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor",
]);
function hasRef(schema) {
    for (const key in schema) {
        if (REF_KEYWORDS.has(key))
            return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
            return true;
        if (typeof sch == "object" && hasRef(sch))
            return true;
    }
    return false;
}
function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
        if (key === "$ref")
            return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
            continue;
        if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch) => (count += countKeys(sch)));
        }
        if (count === Infinity)
            return Infinity;
    }
    return count;
}
function getFullPath(resolver, id = "", normalize) {
    if (normalize !== false)
        id = normalizeId(id);
    const p = resolver.parse(id);
    return _getFullPath(resolver, p);
}
exports.getFullPath = getFullPath;
function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
}
exports._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
}
exports.normalizeId = normalizeId;
function resolveUrl(resolver, baseId, id) {
    id = normalizeId(id);
    return resolver.resolve(baseId, id);
}
exports.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
        return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === undefined)
            return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
            baseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId;
        function addRef(ref) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const _resolve = this.opts.uriResolver.resolve;
            ref = normalizeId(baseId ? _resolve(baseId, ref) : ref);
            if (schemaRefs.has(ref))
                throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
                schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
                checkAmbiguosRef(sch, schOrRef.schema, ref);
            }
            else if (ref !== normalizeId(fullPath)) {
                if (ref[0] === "#") {
                    checkAmbiguosRef(sch, localRefs[ref], ref);
                    localRefs[ref] = sch;
                }
                else {
                    this.refs[ref] = fullPath;
                }
            }
            return ref;
        }
        function addAnchor(anchor) {
            if (typeof anchor == "string") {
                if (!ANCHOR.test(anchor))
                    throw new Error(`invalid anchor "${anchor}"`);
                addRef.call(this, `#${anchor}`);
            }
        }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== undefined && !equal(sch1, sch2))
            throw ambiguos(ref);
    }
    function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
    }
}
exports.getSchemaRefs = getSchemaRefs;

},{"./util":14,"fast-deep-equal":71,"json-schema-traverse":88}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
}
exports.isJSONType = isJSONType;
function getRules() {
    const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] },
    };
    return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {},
    };
}
exports.getRules = getRules;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
const codegen_1 = require("./codegen");
const code_1 = require("./codegen/code");
// TODO refactor to use Set
function toHash(arr) {
    const hash = {};
    for (const item of arr)
        hash[item] = true;
    return hash;
}
exports.toHash = toHash;
function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
        return schema;
    if (Object.keys(schema).length === 0)
        return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
}
exports.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
        return;
    if (typeof schema === "boolean")
        return;
    const rules = self.RULES.keywords;
    for (const key in schema) {
        if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
    }
}
exports.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (rules[key])
            return true;
    return false;
}
exports.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
            return true;
    return false;
}
exports.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
    if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
        if (typeof schema == "string")
            return (0, codegen_1._) `${schema}`;
    }
    return (0, codegen_1._) `${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
}
exports.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
}
exports.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
}
exports.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
    if (typeof str == "number")
        return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
exports.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
exports.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
    if (Array.isArray(xs)) {
        for (const x of xs)
            f(x);
    }
    else {
        f(xs);
    }
}
exports.eachItem = eachItem;
function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
    return (gen, from, to, toName) => {
        const res = to === undefined
            ? from
            : to instanceof codegen_1.Name
                ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                : from instanceof codegen_1.Name
                    ? (mergeToName(gen, to, from), from)
                    : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
}
exports.mergeEvaluated = {
    props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => {
            gen.if((0, codegen_1._) `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._) `${to} || {}`).code((0, codegen_1._) `Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => {
            if (from === true) {
                gen.assign(to, true);
            }
            else {
                gen.assign(to, (0, codegen_1._) `${to} || {}`);
                setEvaluated(gen, to, from);
            }
        }),
        mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
        resultToName: evaluatedPropsToName,
    }),
    items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._) `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._) `${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
        resultToName: (gen, items) => gen.var("items", items),
    }),
};
function evaluatedPropsToName(gen, ps) {
    if (ps === true)
        return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._) `{}`);
    if (ps !== undefined)
        setEvaluated(gen, props, ps);
    return props;
}
exports.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._) `${props}${(0, codegen_1.getProperty)(p)}`, true));
}
exports.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
    return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
    });
}
exports.useFunc = useFunc;
var Type;
(function (Type) {
    Type[Type["Num"] = 0] = "Num";
    Type[Type["Str"] = 1] = "Str";
})(Type = exports.Type || (exports.Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    // let path
    if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax
            ? isNumber
                ? (0, codegen_1._) `"[" + ${dataProp} + "]"`
                : (0, codegen_1._) `"['" + ${dataProp} + "']"`
            : isNumber
                ? (0, codegen_1._) `"/" + ${dataProp}`
                : (0, codegen_1._) `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
exports.getErrorPath = getErrorPath;
function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
        return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
        throw new Error(msg);
    it.self.logger.warn(msg);
}
exports.checkStrictMode = checkStrictMode;

},{"./codegen":6,"./codegen/code":5}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self }, type) {
    const group = self.RULES.types[type];
    return group && group !== true && shouldUseGroup(schema, group);
}
exports.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
}
exports.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
    var _a;
    return (schema[rule.keyword] !== undefined ||
        ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
}
exports.shouldUseRule = shouldUseRule;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
const errors_1 = require("../errors");
const codegen_1 = require("../codegen");
const names_1 = require("../names");
const boolError = {
    message: "boolean schema is false",
};
function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
        falseSchemaError(it, false);
    }
    else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, null);
        gen.return(true);
    }
}
exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
        gen.var(valid, false); // TODO var
        falseSchemaError(it);
    }
    else {
        gen.var(valid, true); // TODO var
    }
}
exports.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    // TODO maybe some other interface should be used for non-keyword validation errors...
    const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it,
    };
    (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
}

},{"../codegen":6,"../errors":8,"../names":10}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
const rules_1 = require("../rules");
const applicability_1 = require("./applicability");
const errors_1 = require("../errors");
const codegen_1 = require("../codegen");
const util_1 = require("../util");
var DataType;
(function (DataType) {
    DataType[DataType["Correct"] = 0] = "Correct";
    DataType[DataType["Wrong"] = 1] = "Wrong";
})(DataType = exports.DataType || (exports.DataType = {}));
function getSchemaTypes(schema) {
    const types = getJSONTypes(schema.type);
    const hasNull = types.includes("null");
    if (hasNull) {
        if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
    }
    else {
        if (!types.length && schema.nullable !== undefined) {
            throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
            types.push("null");
    }
    return types;
}
exports.getSchemaTypes = getSchemaTypes;
function getJSONTypes(ts) {
    const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types.every(rules_1.isJSONType))
        return types;
    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
}
exports.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types, opts.coerceTypes);
    const checkTypes = types.length > 0 &&
        !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
    if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
            if (coerceTo.length)
                coerceData(it, types, coerceTo);
            else
                reportTypeError(it);
        });
    }
    return checkTypes;
}
exports.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes(types, coerceTypes) {
    return coerceTypes
        ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
        : [];
}
function coerceData(it, types, coerceTo) {
    const { gen, data, opts } = it;
    const dataType = gen.let("dataType", (0, codegen_1._) `typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_1._) `undefined`);
    if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._) `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
            .assign(data, (0, codegen_1._) `${data}[0]`)
            .assign(dataType, (0, codegen_1._) `typeof ${data}`)
            .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._) `${coerced} !== undefined`);
    for (const t of coerceTo) {
        if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
            coerceSpecificType(t);
        }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._) `${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
        switch (t) {
            case "string":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "number" || ${dataType} == "boolean"`)
                    .assign(coerced, (0, codegen_1._) `"" + ${data}`)
                    .elseIf((0, codegen_1._) `${data} === null`)
                    .assign(coerced, (0, codegen_1._) `""`);
                return;
            case "number":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "integer":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "boolean":
                gen
                    .elseIf((0, codegen_1._) `${data} === "false" || ${data} === 0 || ${data} === null`)
                    .assign(coerced, false)
                    .elseIf((0, codegen_1._) `${data} === "true" || ${data} === 1`)
                    .assign(coerced, true);
                return;
            case "null":
                gen.elseIf((0, codegen_1._) `${data} === "" || ${data} === 0 || ${data} === false`);
                gen.assign(coerced, null);
                return;
            case "array":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                    .assign(coerced, (0, codegen_1._) `[${data}]`);
        }
    }
}
function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    // TODO use gen.property
    gen.if((0, codegen_1._) `${parentData} !== undefined`, () => gen.assign((0, codegen_1._) `${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType) {
        case "null":
            return (0, codegen_1._) `${data} ${EQ} null`;
        case "array":
            cond = (0, codegen_1._) `Array.isArray(${data})`;
            break;
        case "object":
            cond = (0, codegen_1._) `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
        case "integer":
            cond = numCond((0, codegen_1._) `!(${data} % 1) && !isNaN(${data})`);
            break;
        case "number":
            cond = numCond();
            break;
        default:
            return (0, codegen_1._) `typeof ${data} ${EQ} ${dataType}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._) `typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._) `isFinite(${data})` : codegen_1.nil);
    }
}
exports.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types = (0, util_1.toHash)(dataTypes);
    if (types.array && types.object) {
        const notObj = (0, codegen_1._) `typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._) `!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
    }
    else {
        cond = codegen_1.nil;
    }
    if (types.number)
        delete types.integer;
    for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
}
exports.checkDataTypes = checkDataTypes;
const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._) `{type: ${schema}}` : (0, codegen_1._) `{type: ${schemaValue}}`,
};
function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
}
exports.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it,
    };
}

},{"../codegen":6,"../errors":8,"../rules":13,"../util":14,"./applicability":15}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDefaults = void 0;
const codegen_1 = require("../codegen");
const util_1 = require("../util");
function assignDefaults(it, ty) {
    const { properties, items } = it.schema;
    if (ty === "object" && properties) {
        for (const key in properties) {
            assignDefault(it, key, properties[key].default);
        }
    }
    else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
}
exports.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === undefined)
        return;
    const childData = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(prop)}`;
    if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
    }
    let condition = (0, codegen_1._) `${childData} === undefined`;
    if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._) `${condition} || ${childData} === null || ${childData} === ""`;
    }
    // `${childData} === undefined` +
    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
    gen.if(condition, (0, codegen_1._) `${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
}

},{"../codegen":6,"../util":14}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
const boolSchema_1 = require("./boolSchema");
const dataType_1 = require("./dataType");
const applicability_1 = require("./applicability");
const dataType_2 = require("./dataType");
const defaults_1 = require("./defaults");
const keyword_1 = require("./keyword");
const subschema_1 = require("./subschema");
const codegen_1 = require("../codegen");
const names_1 = require("../names");
const resolve_1 = require("../resolve");
const util_1 = require("../util");
const errors_1 = require("../errors");
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
        }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
}
exports.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code((0, codegen_1._) `"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
        });
    }
    else {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
}
function destructureValCxt(opts) {
    return (0, codegen_1._) `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._) `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
}
function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `""`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `{}`);
    });
}
function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
            commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
            resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
    });
    return;
}
function resetEvaluated(it) {
    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._) `${validateName}.evaluated`);
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._) `${it.evaluated}.props`, (0, codegen_1._) `undefined`));
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._) `${it.evaluated}.items`, (0, codegen_1._) `undefined`));
}
function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._) `/*# sourceURL=${schId} */` : codegen_1.nil;
}
// schema compilation - this function is used recursively to generate code for sub-schemas
function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
        }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
}
function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (self.RULES.all[key])
            return true;
    return false;
}
function isSchemaObj(it) {
    return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
        commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    // TODO var
    gen.var(valid, (0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
}
function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
    const types = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
    schemaKeywords(it, types, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
}
function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
}
function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
}
function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
        gen.code((0, codegen_1._) `${names_1.default.self}.logger.log(${msg})`);
    }
    else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str) `${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._) `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
}
function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
        // TODO assign unevaluated
        gen.if((0, codegen_1._) `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._) `new ${ValidationError}(${names_1.default.vErrors})`));
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
            assignEvaluated(it);
        gen.return((0, codegen_1._) `${names_1.default.errors} === 0`);
    }
}
function assignEvaluated({ gen, evaluated, props, items }) {
    if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.props`, props);
    if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.items`, items);
}
function schemaKeywords(it, types, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
        return;
    }
    if (!opts.jtd)
        checkStrictTypes(it, types);
    gen.block(() => {
        for (const group of RULES.rules)
            groupKeywords(group);
        groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
            return;
        if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
                gen.else();
                (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
        }
        else {
            iterateKeywords(it, group);
        }
        // TODO make it "ok" call?
        if (!allErrors)
            gen.if((0, codegen_1._) `${names_1.default.errors} === ${errsCount || 0}`);
    }
}
function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults }, } = it;
    if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
        for (const rule of group.rules) {
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
                keywordCode(it, rule.keyword, rule.definition, group.type);
            }
        }
    });
}
function checkStrictTypes(it, types) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
    checkContextTypes(it, types);
    if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
    checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types) {
    if (!types.length)
        return;
    if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
    }
    types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
    });
    it.dataTypes = it.dataTypes.filter((t) => includesType(types, t));
}
function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
}
function checkKeywordTypes(it, ts) {
    const rules = it.self.RULES.all;
    for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
        }
    }
}
function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
}
function includesType(ts, t) {
    return ts.includes(t) || (t === "integer" && ts.includes("number"));
}
function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
    constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        }
        else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
                throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
    }
    result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
            failAction();
        else
            this.error();
        if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
                this.gen.endIf();
        }
        else {
            if (this.allErrors)
                this.gen.endIf();
            else
                this.gen.else();
        }
    }
    pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), undefined, failAction);
    }
    fail(condition) {
        if (condition === undefined) {
            this.error();
            if (!this.allErrors)
                this.gen.if(false); // this branch will be removed by gen.optimize
            return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
            this.gen.endIf();
        else
            this.gen.else();
    }
    fail$data(condition) {
        if (!this.$data)
            return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._) `${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
        if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
        }
        this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
        if (this.errsCount === undefined)
            throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
        if (!this.allErrors)
            this.gen.if(cond);
    }
    setParams(obj, assign) {
        if (assign)
            Object.assign(this.params, obj);
        else
            this.params = obj;
    }
    block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
        });
    }
    check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
            return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._) `${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
            gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
                gen.assign(valid, false);
        }
        gen.else();
    }
    invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
            if (schemaType.length) {
                /* istanbul ignore if */
                if (!(schemaCode instanceof codegen_1.Name))
                    throw new Error("ajv implementation error");
                const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                return (0, codegen_1._) `${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
        }
        function invalid$DataSchema() {
            if (def.validateSchema) {
                const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                return (0, codegen_1._) `!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
        }
    }
    subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
        subschemaCode(nextContext, valid);
        return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
            return;
        if (it.props !== true && schemaCxt.props !== undefined) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== undefined) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
    }
    mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
        }
    }
}
exports.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword);
    if ("code" in def) {
        def.code(cxt, ruleType);
    }
    else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
    else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
    }
    else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
        return names_1.default.rootData;
    if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
    }
    else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
            if (up >= dataLevel)
                throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
            throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
            return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
        if (segment) {
            data = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
            expr = (0, codegen_1._) `${expr} && ${data}`;
        }
    }
    return expr;
    function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
}
exports.getData = getData;

},{"../codegen":6,"../errors":8,"../names":10,"../resolve":12,"../util":14,"./applicability":15,"./boolSchema":16,"./dataType":17,"./defaults":18,"./keyword":20,"./subschema":21}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
const codegen_1 = require("../codegen");
const names_1 = require("../names");
const code_1 = require("../../vocabularies/code");
const errors_1 = require("../errors");
function macroKeywordCode(cxt, def) {
    const { gen, keyword, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword, macroSchema);
    if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true,
    }, valid);
    cxt.pass(valid, () => cxt.error(true));
}
exports.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword, validate);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
        if (def.errors === false) {
            assignValid();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => cxt.error());
        }
        else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
        }
    }
    function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._) `await `), (e) => gen.assign(valid, false).if((0, codegen_1._) `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._) `${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
    }
    function validateSync() {
        const validateErrs = (0, codegen_1._) `${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
    }
    function assignValid(_await = def.async ? (0, codegen_1._) `await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !(("compile" in def && !$data) || def.schema === false);
        gen.assign(valid, (0, codegen_1._) `${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors) {
        var _a;
        gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
    }
}
exports.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._) `${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._) `Array.isArray(${errs})`, () => {
        gen
            .assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
            .assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
    }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword, result) {
    if (result === undefined)
        throw new Error(`keyword "${keyword}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
    // TODO add tests
    return (!schemaType.length ||
        schemaType.some((st) => st === "array"
            ? Array.isArray(schema)
            : st === "object"
                ? schema && typeof schema == "object" && !Array.isArray(schema)
                : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
}
exports.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
    /* istanbul ignore if */
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
                self.logger.error(msg);
            else
                throw new Error(msg);
        }
    }
}
exports.validateKeywordUsage = validateKeywordUsage;

},{"../../vocabularies/code":46,"../codegen":6,"../errors":8,"../names":10}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
const codegen_1 = require("../codegen");
const util_1 = require("../util");
function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword !== undefined && schema !== undefined) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword !== undefined) {
        const sch = it.schema[keyword];
        return schemaProp === undefined
            ? {
                schema: sch,
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}`,
            }
            : {
                schema: sch[schemaProp],
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`,
            };
    }
    if (schema !== undefined) {
        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath,
        };
    }
    throw new Error('either "keyword" or "schema" must be passed');
}
exports.getSubschema = getSubschema;
function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== undefined && dataProp !== undefined) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== undefined) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._) `${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._) `${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
    }
    if (data !== undefined) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
        dataContextProps(nextData);
        if (propertyName !== undefined)
            subschema.propertyName = propertyName;
        // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
    }
    if (dataTypes)
        subschema.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
    }
}
exports.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== undefined)
        subschema.compositeRule = compositeRule;
    if (createErrors !== undefined)
        subschema.createErrors = createErrors;
    if (allErrors !== undefined)
        subschema.allErrors = allErrors;
    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
    subschema.jtdMetadata = jtdMetadata; // not inherited
}
exports.extendSubschemaMode = extendSubschemaMode;

},{"../codegen":6,"../util":14}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
var validate_1 = require("./compile/validate");
Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
var codegen_1 = require("./compile/codegen");
Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });
const validation_error_1 = require("./runtime/validation_error");
const ref_error_1 = require("./compile/ref_error");
const rules_1 = require("./compile/rules");
const compile_1 = require("./compile");
const codegen_2 = require("./compile/codegen");
const resolve_1 = require("./compile/resolve");
const dataType_1 = require("./compile/validate/dataType");
const util_1 = require("./compile/util");
const $dataRefSchema = require("./refs/data.json");
const uri_1 = require("./runtime/uri");
const defaultRegExp = (str, flags) => new RegExp(str, flags);
defaultRegExp.code = "new RegExp";
const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error",
]);
const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now.",
};
const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.',
};
const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
    return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver: uriResolver,
    };
}
class Ajv {
    constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = new Set();
        this._loading = {};
        this._cache = new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
            addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
        this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
        }
        if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
        const { meta, schemaId } = this.opts;
        return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
    }
    validate(schemaKeyRef, // key, ref or schema object
    data // to be validated
    ) {
        let v;
        if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
                throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        }
        else {
            v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
            this.errors = v.errors;
        return valid;
    }
    compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
                await runCompileAsync.call(this, { $ref }, true);
            }
        }
        async function _compileAsync(sch) {
            try {
                return this._compileSchemaEnv(sch);
            }
            catch (e) {
                if (!(e instanceof ref_error_1.default))
                    throw e;
                checkLoaded.call(this, e);
                await loadMissingSchema.call(this, e.missingSchema);
                return _compileAsync.call(this, sch);
            }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
                throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
        }
        async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
                await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
                this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
                return p;
            try {
                return await (this._loading[ref] = loadSchema(ref));
            }
            finally {
                delete this._loading[ref];
            }
        }
    }
    // Adds schema to the instance
    addSchema(schema, // If array is passed, `key` will be ignored
    key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
    ) {
        if (Array.isArray(schema)) {
            for (const sch of schema)
                this.addSchema(sch, undefined, _meta, _validateSchema);
            return this;
        }
        let id;
        if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== undefined && typeof id != "string") {
                throw new Error(`schema ${schemaId} must be string`);
            }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, // schema key
    _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
    ) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
            return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== undefined && typeof $schema != "string") {
            throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
                this.logger.error(message);
            else
                throw new Error(message);
        }
        return valid;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
        if (sch === undefined) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
                return;
            this.refs[keyRef] = sch;
        }
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
        }
        switch (typeof schemaKeyRef) {
            case "undefined":
                this._removeAllSchemas(this.schemas);
                this._removeAllSchemas(this.refs);
                this._cache.clear();
                return this;
            case "string": {
                const sch = getSchEnv.call(this, schemaKeyRef);
                if (typeof sch == "object")
                    this._cache.delete(sch.schema);
                delete this.schemas[schemaKeyRef];
                delete this.refs[schemaKeyRef];
                return this;
            }
            case "object": {
                const cacheKey = schemaKeyRef;
                this._cache.delete(cacheKey);
                let id = schemaKeyRef[this.opts.schemaId];
                if (id) {
                    id = (0, resolve_1.normalizeId)(id);
                    delete this.schemas[id];
                    delete this.refs[id];
                }
                return this;
            }
            default:
                throw new Error("ajv.removeSchema: invalid parameter");
        }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions) {
        for (const def of definitions)
            this.addKeyword(def);
        return this;
    }
    addKeyword(kwdOrDef, def // deprecated
    ) {
        let keyword;
        if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                def.keyword = keyword;
            }
        }
        else if (typeof kwdOrDef == "object" && def === undefined) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
                throw new Error("addKeywords: keyword must be string or non-empty array");
            }
        }
        else {
            throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
            return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType),
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0
            ? (k) => addRule.call(this, k, definition)
            : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
    }
    getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword) {
        // TODO return type should be Ajv
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
                group.rules.splice(i, 1);
        }
        return this;
    }
    // Add format
    addFormat(name, format) {
        if (typeof format == "string")
            format = new RegExp(format);
        this.formats[name] = format;
        return this;
    }
    errorsText(errors = this.errors, // optional array of validation errors
    { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
    ) {
        if (!errors || errors.length === 0)
            return "No errors";
        return errors
            .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
            .reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
            let keywords = metaSchema;
            for (const seg of segments)
                keywords = keywords[seg];
            for (const key in rules) {
                const rule = rules[key];
                if (typeof rule != "object")
                    continue;
                const { $data } = rule.definition;
                const schema = keywords[key];
                if ($data && schema)
                    keywords[key] = schemaOrData(schema);
            }
        }
        return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
                if (typeof sch == "string") {
                    delete schemas[keyRef];
                }
                else if (sch && !sch.meta) {
                    this._cache.delete(sch.schema);
                    delete schemas[keyRef];
                }
            }
        }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
            id = schema[schemaId];
        }
        else {
            if (this.opts.jtd)
                throw new Error("schema must be object");
            else if (typeof schema != "boolean")
                throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== undefined)
            return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
            if (baseId)
                this._checkUnique(baseId);
            this.refs[baseId] = sch;
        }
        if (validateSchema)
            this.validateSchema(schema, true);
        return sch;
    }
    _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
        }
    }
    _compileSchemaEnv(sch) {
        if (sch.meta)
            this._compileMetaSchema(sch);
        else
            compile_1.compileSchema.call(this, sch);
        /* istanbul ignore if */
        if (!sch.validate)
            throw new Error("ajv implementation error");
        return sch.validate;
    }
    _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
            compile_1.compileSchema.call(this, sch);
        }
        finally {
            this.opts = currentOpts;
        }
    }
}
exports.default = Ajv;
Ajv.ValidationError = validation_error_1.default;
Ajv.MissingRefError = ref_error_1.default;
function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
}
function getSchEnv(keyRef) {
    keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
    return this.schemas[keyRef] || this.refs[keyRef];
}
function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
        return;
    if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
    else
        for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
}
function addInitialFormats() {
    for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
            this.addFormat(name, format);
    }
}
function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
            def.keyword = keyword;
        this.addKeyword(def);
    }
}
function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
    return metaOpts;
}
const noLogs = { log() { }, warn() { }, error() { } };
function getLogger(logger) {
    if (logger === false)
        return noLogs;
    if (logger === undefined)
        return console;
    if (logger.log && logger.warn && logger.error)
        return logger;
    throw new Error("logger must implement log, warn and error methods");
}
const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
function checkKeyword(keyword, def) {
    const { RULES } = this;
    (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def)
        return;
    if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
    }
}
function addRule(keyword, definition, dataType) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
    if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword] = true;
    if (!definition)
        return;
    const rule = {
        keyword,
        definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType),
        },
    };
    if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
        ruleGroup.rules.push(rule);
    RULES.all[keyword] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
}
function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
    }
    else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
    }
}
function keywordMetaschema(def) {
    let { metaSchema } = def;
    if (metaSchema === undefined)
        return;
    if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
    def.validateSchema = this.compile(metaSchema, true);
}
const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
};
function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
}

},{"./compile":9,"./compile/codegen":6,"./compile/ref_error":11,"./compile/resolve":12,"./compile/rules":13,"./compile/util":14,"./compile/validate":19,"./compile/validate/dataType":17,"./refs/data.json":23,"./runtime/uri":27,"./runtime/validation_error":28}],23:[function(require,module,exports){
module.exports={
  "$id": "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
  "description": "Meta-schema for $data reference (JSON AnySchema extension proposal)",
  "type": "object",
  "required": ["$data"],
  "properties": {
    "$data": {
      "type": "string",
      "anyOf": [{"format": "relative-json-pointer"}, {"format": "json-pointer"}]
    }
  },
  "additionalProperties": false
}

},{}],24:[function(require,module,exports){
module.exports={
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://json-schema.org/draft-07/schema#",
  "title": "Core schema meta-schema",
  "definitions": {
    "schemaArray": {
      "type": "array",
      "minItems": 1,
      "items": {"$ref": "#"}
    },
    "nonNegativeInteger": {
      "type": "integer",
      "minimum": 0
    },
    "nonNegativeIntegerDefault0": {
      "allOf": [{"$ref": "#/definitions/nonNegativeInteger"}, {"default": 0}]
    },
    "simpleTypes": {
      "enum": ["array", "boolean", "integer", "null", "number", "object", "string"]
    },
    "stringArray": {
      "type": "array",
      "items": {"type": "string"},
      "uniqueItems": true,
      "default": []
    }
  },
  "type": ["object", "boolean"],
  "properties": {
    "$id": {
      "type": "string",
      "format": "uri-reference"
    },
    "$schema": {
      "type": "string",
      "format": "uri"
    },
    "$ref": {
      "type": "string",
      "format": "uri-reference"
    },
    "$comment": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "default": true,
    "readOnly": {
      "type": "boolean",
      "default": false
    },
    "examples": {
      "type": "array",
      "items": true
    },
    "multipleOf": {
      "type": "number",
      "exclusiveMinimum": 0
    },
    "maximum": {
      "type": "number"
    },
    "exclusiveMaximum": {
      "type": "number"
    },
    "minimum": {
      "type": "number"
    },
    "exclusiveMinimum": {
      "type": "number"
    },
    "maxLength": {"$ref": "#/definitions/nonNegativeInteger"},
    "minLength": {"$ref": "#/definitions/nonNegativeIntegerDefault0"},
    "pattern": {
      "type": "string",
      "format": "regex"
    },
    "additionalItems": {"$ref": "#"},
    "items": {
      "anyOf": [{"$ref": "#"}, {"$ref": "#/definitions/schemaArray"}],
      "default": true
    },
    "maxItems": {"$ref": "#/definitions/nonNegativeInteger"},
    "minItems": {"$ref": "#/definitions/nonNegativeIntegerDefault0"},
    "uniqueItems": {
      "type": "boolean",
      "default": false
    },
    "contains": {"$ref": "#"},
    "maxProperties": {"$ref": "#/definitions/nonNegativeInteger"},
    "minProperties": {"$ref": "#/definitions/nonNegativeIntegerDefault0"},
    "required": {"$ref": "#/definitions/stringArray"},
    "additionalProperties": {"$ref": "#"},
    "definitions": {
      "type": "object",
      "additionalProperties": {"$ref": "#"},
      "default": {}
    },
    "properties": {
      "type": "object",
      "additionalProperties": {"$ref": "#"},
      "default": {}
    },
    "patternProperties": {
      "type": "object",
      "additionalProperties": {"$ref": "#"},
      "propertyNames": {"format": "regex"},
      "default": {}
    },
    "dependencies": {
      "type": "object",
      "additionalProperties": {
        "anyOf": [{"$ref": "#"}, {"$ref": "#/definitions/stringArray"}]
      }
    },
    "propertyNames": {"$ref": "#"},
    "const": true,
    "enum": {
      "type": "array",
      "items": true,
      "minItems": 1,
      "uniqueItems": true
    },
    "type": {
      "anyOf": [
        {"$ref": "#/definitions/simpleTypes"},
        {
          "type": "array",
          "items": {"$ref": "#/definitions/simpleTypes"},
          "minItems": 1,
          "uniqueItems": true
        }
      ]
    },
    "format": {"type": "string"},
    "contentMediaType": {"type": "string"},
    "contentEncoding": {"type": "string"},
    "if": {"$ref": "#"},
    "then": {"$ref": "#"},
    "else": {"$ref": "#"},
    "allOf": {"$ref": "#/definitions/schemaArray"},
    "anyOf": {"$ref": "#/definitions/schemaArray"},
    "oneOf": {"$ref": "#/definitions/schemaArray"},
    "not": {"$ref": "#"}
  },
  "default": true
}

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/ajv-validator/ajv/issues/889
const equal = require("fast-deep-equal");
equal.code = 'require("ajv/dist/runtime/equal").default';
exports.default = equal;

},{"fast-deep-equal":71}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            // high surrogate, and there is a next character
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00)
                pos++; // low surrogate
        }
    }
    return length;
}
exports.default = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uri = require("uri-js");
uri.code = 'require("ajv/dist/runtime/uri").default';
exports.default = uri;

},{"uri-js":107}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
    }
}
exports.default = ValidationError;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdditionalItems = void 0;
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
        }
        validateAdditionalItems(cxt, items);
    },
};
function validateAdditionalItems(cxt, items) {
    const { gen, schema, data, keyword, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._) `${len} <= ${items.length}`);
    }
    else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items.length}`); // TODO var
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
    }
    function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
    }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const names_1 = require("../../compile/names");
const util_1 = require("../../compile/util");
const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1._) `{additionalProperty: ${params.additionalProperty}}`,
};
const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
            return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
                if (!props.length && !patProps.length)
                    additionalPropertyCode(key);
                else
                    gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
        }
        function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
                // TODO maybe an option instead of hard-coded 8?
                const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
                definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            }
            else if (props.length) {
                definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._) `${key} === ${p}`));
            }
            else {
                definedProp = codegen_1.nil;
            }
            if (patProps.length) {
                definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._) `${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
            }
            return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
            gen.code((0, codegen_1._) `delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                deleteAdditional(key);
                return;
            }
            if (schema === false) {
                cxt.setParams({ additionalProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                if (opts.removeAdditional === "failing") {
                    applyAdditionalSchema(key, valid, false);
                    gen.if((0, codegen_1.not)(valid), () => {
                        cxt.reset();
                        deleteAdditional(key);
                    });
                }
                else {
                    applyAdditionalSchema(key, valid);
                    if (!allErrors)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                }
            }
        }
        function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
                keyword: "additionalProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str,
            };
            if (errors === false) {
                Object.assign(subschema, {
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false,
                });
            }
            cxt.subschema(subschema, valid);
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/names":10,"../../compile/util":14,"../code":46}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../compile/util");
const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
        const { gen, schema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
            if ((0, util_1.alwaysValidSchema)(it, sch))
                return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
        });
    },
};
exports.default = def;

},{"../../compile/util":14}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" },
};
exports.default = def;

},{"../code":46}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { min, max } }) => max === undefined
        ? (0, codegen_1.str) `must contain at least ${min} valid item(s)`
        : (0, codegen_1.str) `must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === undefined ? (0, codegen_1._) `{minContains: ${min}}` : (0, codegen_1._) `{minContains: ${min}, maxContains: ${max}}`,
};
const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
            min = minContains === undefined ? 1 : minContains;
            max = maxContains;
        }
        else {
            min = 1;
        }
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        cxt.setParams({ min, max });
        if (max === undefined && min === 0) {
            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
        }
        if (max !== undefined && min > max) {
            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._) `${len} >= ${min}`;
            if (max !== undefined)
                cond = (0, codegen_1._) `${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === undefined && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
        }
        else if (min === 0) {
            gen.let(valid, true);
            if (max !== undefined)
                gen.if((0, codegen_1._) `${data}.length > 0`, validateItemsWithCount);
        }
        else {
            gen.let(valid, false);
            validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
                cxt.subschema({
                    keyword: "contains",
                    dataProp: i,
                    dataPropType: util_1.Type.Num,
                    compositeRule: true,
                }, _valid);
                block();
            });
        }
        function checkLimits(count) {
            gen.code((0, codegen_1._) `${count}++`);
            if (max === undefined) {
                gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true).break());
            }
            else {
                gen.if((0, codegen_1._) `${count} > ${max}`, () => gen.assign(valid, false).break());
                if (min === 1)
                    gen.assign(valid, true);
                else
                    gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true));
            }
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const code_1 = require("../code");
exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str) `must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._) `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
};
const def = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
    },
};
function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
        if (key === "__proto__")
            continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
}
function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
        return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
            continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", "),
        });
        if (it.allErrors) {
            gen.if(hasProperty, () => {
                for (const depProp of deps) {
                    (0, code_1.checkReportMissingProp)(cxt, depProp);
                }
            });
        }
        else {
            gen.if((0, codegen_1._) `${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
        }
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
            continue;
        gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
        }, () => gen.var(valid, true) // TODO var
        );
        cxt.ok(valid);
    }
}
exports.validateSchemaDeps = validateSchemaDeps;
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../code":46}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params }) => (0, codegen_1.str) `must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1._) `{failingKeyword: ${params.ifClause}}`,
};
const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === undefined && parentSchema.else === undefined) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
            return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        }
        else if (hasThen) {
            gen.if(schValid, validateClause("then"));
        }
        else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
            const schCxt = cxt.subschema({
                keyword: "if",
                compositeRule: true,
                createErrors: false,
                allErrors: false,
            }, schValid);
            cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
            return () => {
                const schCxt = cxt.subschema({ keyword }, schValid);
                gen.assign(valid, schValid);
                cxt.mergeValidEvaluated(schCxt, valid);
                if (ifClause)
                    gen.assign(ifClause, (0, codegen_1._) `${keyword}`);
                else
                    cxt.setParams({ ifClause: keyword });
            };
        }
    },
};
function hasSchema(it, keyword) {
    const schema = it.schema[keyword];
    return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
}
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const additionalItems_1 = require("./additionalItems");
const prefixItems_1 = require("./prefixItems");
const items_1 = require("./items");
const items2020_1 = require("./items2020");
const contains_1 = require("./contains");
const dependencies_1 = require("./dependencies");
const propertyNames_1 = require("./propertyNames");
const additionalProperties_1 = require("./additionalProperties");
const properties_1 = require("./properties");
const patternProperties_1 = require("./patternProperties");
const not_1 = require("./not");
const anyOf_1 = require("./anyOf");
const oneOf_1 = require("./oneOf");
const allOf_1 = require("./allOf");
const if_1 = require("./if");
const thenElse_1 = require("./thenElse");
function getApplicator(draft2020 = false) {
    const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default,
    ];
    // array
    if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
    else
        applicator.push(additionalItems_1.default, items_1.default);
    applicator.push(contains_1.default);
    return applicator;
}
exports.default = getApplicator;

},{"./additionalItems":29,"./additionalProperties":30,"./allOf":31,"./anyOf":32,"./contains":33,"./dependencies":34,"./if":35,"./items":37,"./items2020":38,"./not":39,"./oneOf":40,"./patternProperties":41,"./prefixItems":42,"./properties":43,"./propertyNames":44,"./thenElse":45}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTuple = void 0;
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const code_1 = require("../code");
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        cxt.ok((0, code_1.validateArray)(cxt));
    },
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
        gen.if((0, codegen_1._) `${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i,
        }, valid));
        cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
    }
}
exports.validateTuple = validateTuple;
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../code":46}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const code_1 = require("../code");
const additionalItems_1 = require("./additionalItems");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        if (prefixItems)
            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
            cxt.ok((0, code_1.validateArray)(cxt));
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../code":46,"./additionalItems":29}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../compile/util");
const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false,
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" },
};
exports.default = def;

},{"../../compile/util":14}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1._) `{passingSchemas: ${params.passing}}`,
};
const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
            return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
            schArr.forEach((sch, i) => {
                let schCxt;
                if ((0, util_1.alwaysValidSchema)(it, sch)) {
                    gen.var(schValid, true);
                }
                else {
                    schCxt = cxt.subschema({
                        keyword: "oneOf",
                        schemaProp: i,
                        compositeRule: true,
                    }, schValid);
                }
                if (i > 0) {
                    gen
                        .if((0, codegen_1._) `${schValid} && ${valid}`)
                        .assign(valid, false)
                        .assign(passing, (0, codegen_1._) `[${passing}, ${i}]`)
                        .else();
                }
                gen.if(schValid, () => {
                    gen.assign(valid, true);
                    gen.assign(passing, i);
                    if (schCxt)
                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
                });
            });
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const util_2 = require("../../compile/util");
const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 ||
            (alwaysValidPatterns.length === patterns.length &&
                (!it.opts.unevaluated || it.props === true))) {
            return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
            for (const pat of patterns) {
                if (checkProperties)
                    checkMatchingProperties(pat);
                if (it.allErrors) {
                    validateProperties(pat);
                }
                else {
                    gen.var(valid, true); // TODO var
                    validateProperties(pat);
                    gen.if(valid);
                }
            }
        }
        function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
                if (new RegExp(pat).test(prop)) {
                    (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                }
            }
        }
        function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
                gen.if((0, codegen_1._) `${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                    const alwaysValid = alwaysValidPatterns.includes(pat);
                    if (!alwaysValid) {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: util_2.Type.Str,
                        }, valid);
                    }
                    if (it.opts.unevaluated && props !== true) {
                        gen.assign((0, codegen_1._) `${props}[${key}]`, true);
                    }
                    else if (!alwaysValid && !it.allErrors) {
                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                        // or if all properties were evaluated (props === true)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                    }
                });
            });
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../code":46}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const items_1 = require("./items");
const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1.validateTuple)(cxt, "items"),
};
exports.default = def;

},{"./items":37}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../../compile/validate");
const code_1 = require("../code");
const util_1 = require("../../compile/util");
const additionalProperties_1 = require("./additionalProperties");
const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
            it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
            return;
        const valid = gen.name("valid");
        for (const prop of properties) {
            if (hasDefault(prop)) {
                applyPropertySchema(prop);
            }
            else {
                gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
                applyPropertySchema(prop);
                if (!it.allErrors)
                    gen.else().var(valid, true);
                gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
        }
        function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
        }
        function applyPropertySchema(prop) {
            cxt.subschema({
                keyword: "properties",
                schemaProp: prop,
                dataProp: prop,
            }, valid);
        }
    },
};
exports.default = def;

},{"../../compile/util":14,"../../compile/validate":19,"../code":46,"./additionalProperties":30}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1._) `{propertyName: ${params.propertyName}}`,
};
const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
                keyword: "propertyNames",
                data: key,
                dataTypes: ["string"],
                propertyName: key,
                compositeRule: true,
            }, valid);
            gen.if((0, codegen_1.not)(valid), () => {
                cxt.error(true);
                if (!it.allErrors)
                    gen.break();
            });
        });
        cxt.ok(valid);
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../compile/util");
const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword, parentSchema, it }) {
        if (parentSchema.if === undefined)
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
    },
};
exports.default = def;

},{"../../compile/util":14}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
const codegen_1 = require("../compile/codegen");
const util_1 = require("../compile/util");
const names_1 = require("../compile/names");
const util_2 = require("../compile/util");
function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._) `${prop}` }, true);
        cxt.error();
    });
}
exports.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
    return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._) `${missing} = ${prop}`)));
}
exports.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
}
exports.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
    return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._) `Object.prototype.hasOwnProperty`,
    });
}
exports.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
    return (0, codegen_1._) `${hasPropFunc(gen)}.call(${data}, ${property})`;
}
exports.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1._) `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
exports.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
}
exports.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
exports.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
}
exports.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1._) `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData],
    ];
    if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = (0, codegen_1._) `${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? (0, codegen_1._) `${func}.call(${context}, ${args})` : (0, codegen_1._) `${func}(${args})`;
}
exports.callValidateCode = callValidateCode;
const newRegExp = (0, codegen_1._) `new RegExp`;
function usePattern({ gen, it: { opts } }, pattern) {
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern, u);
    return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._) `${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`,
    });
}
exports.usePattern = usePattern;
function validateArray(cxt) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
    }
    gen.var(valid, true);
    validateItems(() => gen.break());
    return valid;
    function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num,
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
        });
    }
}
exports.validateArray = validateArray;
function validateUnion(cxt) {
    const { gen, schema, keyword, it } = cxt;
    /* istanbul ignore if */
    if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
        return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true,
        }, schValid);
        gen.assign(valid, (0, codegen_1._) `${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
        // or if all properties and items were evaluated (it.props === true && it.items === true)
        if (!merged)
            gen.if((0, codegen_1.not)(valid));
    }));
    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
}
exports.validateUnion = validateUnion;

},{"../compile/codegen":6,"../compile/names":10,"../compile/util":14}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const def = {
    keyword: "id",
    code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    },
};
exports.default = def;

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const ref_1 = require("./ref");
const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default,
];
exports.default = core;

},{"./id":47,"./ref":49}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callRef = exports.getValidate = void 0;
const ref_error_1 = require("../../compile/ref_error");
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const names_1 = require("../../compile/names");
const compile_1 = require("../../compile");
const util_1 = require("../../compile/util");
const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === undefined)
            throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
            if (env === root)
                return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, (0, codegen_1._) `${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
                schema: sch,
                dataTypes: [],
                schemaPath: codegen_1.nil,
                topSchemaRef: schName,
                errSchemaPath: $ref,
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
        }
    },
};
function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate
        ? gen.scopeValue("validate", { ref: sch.validate })
        : (0, codegen_1._) `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
exports.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
        callAsyncRef();
    else
        callSyncRef();
    function callAsyncRef() {
        if (!env.$async)
            throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
            gen.code((0, codegen_1._) `await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
            if (!allErrors)
                gen.assign(valid, true);
        }, (e) => {
            gen.if((0, codegen_1._) `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
                gen.assign(valid, false);
        });
        cxt.ok(valid);
    }
    function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
        const errs = (0, codegen_1._) `${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
        gen.assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
            return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        // TODO refactor
        if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
                if (schEvaluated.props !== undefined) {
                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                }
            }
            else {
                const props = gen.var("props", (0, codegen_1._) `${source}.evaluated.props`);
                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
        }
        if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
                if (schEvaluated.items !== undefined) {
                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                }
            }
            else {
                const items = gen.var("items", (0, codegen_1._) `${source}.evaluated.items`);
                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
        }
    }
}
exports.callRef = callRef;
exports.default = def;

},{"../../compile":9,"../../compile/codegen":6,"../../compile/names":10,"../../compile/ref_error":11,"../../compile/util":14,"../code":46}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const types_1 = require("../discriminator/types");
const compile_1 = require("../../compile");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
        ? `tag "${tagName}" must be string`
        : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._) `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
};
const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._) `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
                gen.elseIf((0, codegen_1._) `${tag} === ${tagValue}`);
                gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
        }
        function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
        }
        function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
                let sch = oneOf[i];
                if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                    sch = compile_1.resolveRef.call(it.self, it.schemaEnv, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
                    if (sch instanceof compile_1.SchemaEnv)
                        sch = sch.schema;
                }
                const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                if (typeof propSch != "object") {
                    throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
                }
                tagRequired = tagRequired && (topRequired || hasRequired(sch));
                addMappings(propSch, i);
            }
            if (!tagRequired)
                throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
                return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
                if (sch.const) {
                    addMapping(sch.const, i);
                }
                else if (sch.enum) {
                    for (const tagValue of sch.enum) {
                        addMapping(tagValue, i);
                    }
                }
                else {
                    throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                }
            }
            function addMapping(tagValue, i) {
                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                    throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                }
                oneOfMapping[tagValue] = i;
            }
        }
    },
};
exports.default = def;

},{"../../compile":9,"../../compile/codegen":6,"../../compile/util":14,"../discriminator/types":51}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscrError = void 0;
var DiscrError;
(function (DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
})(DiscrError = exports.DiscrError || (exports.DiscrError = {}));

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const validation_1 = require("./validation");
const applicator_1 = require("./applicator");
const format_1 = require("./format");
const metadata_1 = require("./metadata");
const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary,
];
exports.default = draft7Vocabularies;

},{"./applicator":36,"./core":48,"./format":54,"./metadata":55,"./validation":58}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{format: ${schemaCode}}`,
};
const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
            return;
        if ($data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fDef = gen.const("fDef", (0, codegen_1._) `${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            // TODO simplify
            gen.if((0, codegen_1._) `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._) `${fDef}.type || "string"`).assign(format, (0, codegen_1._) `${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._) `"string"`).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
                if (opts.strictSchema === false)
                    return codegen_1.nil;
                return (0, codegen_1._) `${schemaCode} && !${format}`;
            }
            function invalidFmt() {
                const callFormat = schemaEnv.$async
                    ? (0, codegen_1._) `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                    : (0, codegen_1._) `${format}(${data})`;
                const validData = (0, codegen_1._) `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                return (0, codegen_1._) `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
        }
        function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
                unknownFormat();
                return;
            }
            if (formatDef === true)
                return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
                cxt.pass(validCondition());
            function unknownFormat() {
                if (opts.strictSchema === false) {
                    self.logger.warn(unknownMsg());
                    return;
                }
                throw new Error(unknownMsg());
                function unknownMsg() {
                    return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                }
            }
            function getFormat(fmtDef) {
                const code = fmtDef instanceof RegExp
                    ? (0, codegen_1.regexpCode)(fmtDef)
                    : opts.code.formats
                        ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(schema)}`
                        : undefined;
                const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                    return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._) `${fmt}.validate`];
                }
                return ["string", fmtDef, fmt];
            }
            function validCondition() {
                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                    if (!schemaEnv.$async)
                        throw new Error("async format in sync schema");
                    return (0, codegen_1._) `await ${fmtRef}(${data})`;
                }
                return typeof format == "function" ? (0, codegen_1._) `${fmtRef}(${data})` : (0, codegen_1._) `${fmtRef}.test(${data})`;
            }
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("./format");
const format = [format_1.default];
exports.default = format;

},{"./format":53}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentVocabulary = exports.metadataVocabulary = void 0;
exports.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples",
];
exports.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema",
];

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const equal_1 = require("../../runtime/equal");
const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValue: ${schemaCode}}`,
};
const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || (schema && typeof schema == "object")) {
            cxt.fail$data((0, codegen_1._) `!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        }
        else {
            cxt.fail((0, codegen_1._) `${schema} !== ${data}`);
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../../runtime/equal":25}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const equal_1 = require("../../runtime/equal");
const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValues: ${schemaCode}}`,
};
const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        const eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
        }
        else {
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._) `${eql}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null
                ? (0, codegen_1._) `${eql}(${data}, ${vSchema}[${i}])`
                : (0, codegen_1._) `${data} === ${sch}`;
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../../runtime/equal":25}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const limitNumber_1 = require("./limitNumber");
const multipleOf_1 = require("./multipleOf");
const limitLength_1 = require("./limitLength");
const pattern_1 = require("./pattern");
const limitProperties_1 = require("./limitProperties");
const required_1 = require("./required");
const limitItems_1 = require("./limitItems");
const uniqueItems_1 = require("./uniqueItems");
const const_1 = require("./const");
const enum_1 = require("./enum");
const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default,
];
exports.default = validation;

},{"./const":56,"./enum":57,"./limitItems":59,"./limitLength":60,"./limitNumber":61,"./limitProperties":62,"./multipleOf":63,"./pattern":64,"./required":65,"./uniqueItems":66}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `${data}.length ${op} ${schemaCode}`);
    },
};
exports.default = def;

},{"../../compile/codegen":6}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const ucs2length_1 = require("../../runtime/ucs2length");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._) `${data}.length` : (0, codegen_1._) `${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._) `${len} ${op} ${schemaCode}`);
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../../runtime/ucs2length":26}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const ops = codegen_1.operators;
const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => (0, codegen_1.str) `must be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._) `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
    },
};
exports.default = def;

},{"../../compile/codegen":6}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `Object.keys(${data}).length ${op} ${schemaCode}`);
    },
};
exports.default = def;

},{"../../compile/codegen":6}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codegen_1 = require("../../compile/codegen");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1._) `{multipleOf: ${schemaCode}}`,
};
const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec
            ? (0, codegen_1._) `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
            : (0, codegen_1._) `${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._) `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    },
};
exports.default = def;

},{"../../compile/codegen":6}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{pattern: ${schemaCode}}`,
};
const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        // TODO regexp should be wrapped in try/catchs
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._) `(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._) `!${regExp}.test(${data})`);
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../code":46}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("../code");
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const error = {
    message: ({ params: { missingProperty } }) => (0, codegen_1.str) `must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1._) `{missingProperty: ${missingProperty}}`,
};
const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
            return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
            allErrorsMode();
        else
            exitOnErrorMode();
        if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                    const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                    (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
                }
            }
        }
        function allErrorsMode() {
            if (useLoop || $data) {
                cxt.block$data(codegen_1.nil, loopAllRequired);
            }
            else {
                for (const prop of schema) {
                    (0, code_1.checkReportMissingProp)(cxt, prop);
                }
            }
        }
        function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
                const valid = gen.let("valid", true);
                cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                cxt.ok(valid);
            }
            else {
                gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
                (0, code_1.reportMissingProp)(cxt, missing);
                gen.else();
            }
        }
        function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
                cxt.setParams({ missingProperty: prop });
                gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
        }
        function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
                gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
                gen.if((0, codegen_1.not)(valid), () => {
                    cxt.error();
                    gen.break();
                });
            }, codegen_1.nil);
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../code":46}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataType_1 = require("../../compile/validate/dataType");
const codegen_1 = require("../../compile/codegen");
const util_1 = require("../../compile/util");
const equal_1 = require("../../runtime/equal");
const error = {
    message: ({ params: { i, j } }) => (0, codegen_1.str) `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1._) `{i: ${i}, j: ${j}}`,
};
const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
            return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._) `${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._) `${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if((0, codegen_1._) `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._) `{}`);
            gen.for((0, codegen_1._) `;${i}--;`, () => {
                gen.let(item, (0, codegen_1._) `${data}[${i}]`);
                gen.if(wrongType, (0, codegen_1._) `continue`);
                if (itemTypes.length > 1)
                    gen.if((0, codegen_1._) `typeof ${item} == "string"`, (0, codegen_1._) `${item} += "_"`);
                gen
                    .if((0, codegen_1._) `typeof ${indices}[${item}] == "number"`, () => {
                    gen.assign(j, (0, codegen_1._) `${indices}[${item}]`);
                    cxt.error();
                    gen.assign(valid, false).break();
                })
                    .code((0, codegen_1._) `${indices}[${item}] = ${i}`);
            });
        }
        function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._) `;${i}--;`, () => gen.for((0, codegen_1._) `${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._) `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                cxt.error();
                gen.assign(valid, false).break(outer);
            })));
        }
    },
};
exports.default = def;

},{"../../compile/codegen":6,"../../compile/util":14,"../../compile/validate/dataType":17,"../../runtime/equal":25}],67:[function(require,module,exports){
(function (global){(function (){
'use strict';

var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? global : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],68:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":69,"get-intrinsic":75}],69:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');
var setFunctionLength = require('set-function-length');

var $TypeError = GetIntrinsic('%TypeError%');
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":74,"get-intrinsic":75,"set-function-length":95}],70:[function(require,module,exports){
'use strict';

var hasPropertyDescriptors = require('has-property-descriptors')();

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = hasPropertyDescriptors && GetIntrinsic('%Object.defineProperty%', true);
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var gopd = require('gopd');

/** @type {(obj: Record<PropertyKey, unknown>, property: PropertyKey, value: unknown, nonEnumerable?: boolean | null, nonWritable?: boolean | null, nonConfigurable?: boolean | null, loose?: boolean) => void} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};

},{"get-intrinsic":75,"gopd":76,"has-property-descriptors":77}],71:[function(require,module,exports){
'use strict';

// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

},{}],72:[function(require,module,exports){
'use strict';

var isCallable = require('is-callable');

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;

},{"is-callable":85}],73:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],74:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":73}],75:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();
var hasProto = require('has-proto')();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('hasown');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":74,"has-proto":78,"has-symbols":79,"hasown":82}],76:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":75}],77:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;

},{"get-intrinsic":75}],78:[function(require,module,exports){
'use strict';

var test = {
	foo: {}
};

var $Object = Object;

module.exports = function hasProto() {
	return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
};

},{}],79:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":80}],80:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],81:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":80}],82:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {(o: {}, p: PropertyKey) => p is keyof o} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":74}],83:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],84:[function(require,module,exports){
'use strict';

var hasToStringTag = require('has-tostringtag/shams')();
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{"call-bind/callBound":68,"has-tostringtag/shams":81}],85:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};

},{}],86:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = require('has-tostringtag/shams')();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};

},{"has-tostringtag/shams":81}],87:[function(require,module,exports){
'use strict';

var whichTypedArray = require('which-typed-array');

module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};

},{"which-typed-array":112}],88:[function(require,module,exports){
'use strict';

var traverse = module.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}

},{}],89:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],90:[function(require,module,exports){
module.exports=[
"ac",
"com.ac",
"edu.ac",
"gov.ac",
"net.ac",
"mil.ac",
"org.ac",
"ad",
"nom.ad",
"ae",
"co.ae",
"net.ae",
"org.ae",
"sch.ae",
"ac.ae",
"gov.ae",
"mil.ae",
"aero",
"accident-investigation.aero",
"accident-prevention.aero",
"aerobatic.aero",
"aeroclub.aero",
"aerodrome.aero",
"agents.aero",
"aircraft.aero",
"airline.aero",
"airport.aero",
"air-surveillance.aero",
"airtraffic.aero",
"air-traffic-control.aero",
"ambulance.aero",
"amusement.aero",
"association.aero",
"author.aero",
"ballooning.aero",
"broker.aero",
"caa.aero",
"cargo.aero",
"catering.aero",
"certification.aero",
"championship.aero",
"charter.aero",
"civilaviation.aero",
"club.aero",
"conference.aero",
"consultant.aero",
"consulting.aero",
"control.aero",
"council.aero",
"crew.aero",
"design.aero",
"dgca.aero",
"educator.aero",
"emergency.aero",
"engine.aero",
"engineer.aero",
"entertainment.aero",
"equipment.aero",
"exchange.aero",
"express.aero",
"federation.aero",
"flight.aero",
"fuel.aero",
"gliding.aero",
"government.aero",
"groundhandling.aero",
"group.aero",
"hanggliding.aero",
"homebuilt.aero",
"insurance.aero",
"journal.aero",
"journalist.aero",
"leasing.aero",
"logistics.aero",
"magazine.aero",
"maintenance.aero",
"media.aero",
"microlight.aero",
"modelling.aero",
"navigation.aero",
"parachuting.aero",
"paragliding.aero",
"passenger-association.aero",
"pilot.aero",
"press.aero",
"production.aero",
"recreation.aero",
"repbody.aero",
"res.aero",
"research.aero",
"rotorcraft.aero",
"safety.aero",
"scientist.aero",
"services.aero",
"show.aero",
"skydiving.aero",
"software.aero",
"student.aero",
"trader.aero",
"trading.aero",
"trainer.aero",
"union.aero",
"workinggroup.aero",
"works.aero",
"af",
"gov.af",
"com.af",
"org.af",
"net.af",
"edu.af",
"ag",
"com.ag",
"org.ag",
"net.ag",
"co.ag",
"nom.ag",
"ai",
"off.ai",
"com.ai",
"net.ai",
"org.ai",
"al",
"com.al",
"edu.al",
"gov.al",
"mil.al",
"net.al",
"org.al",
"am",
"co.am",
"com.am",
"commune.am",
"net.am",
"org.am",
"ao",
"ed.ao",
"gv.ao",
"og.ao",
"co.ao",
"pb.ao",
"it.ao",
"aq",
"ar",
"bet.ar",
"com.ar",
"coop.ar",
"edu.ar",
"gob.ar",
"gov.ar",
"int.ar",
"mil.ar",
"musica.ar",
"mutual.ar",
"net.ar",
"org.ar",
"senasa.ar",
"tur.ar",
"arpa",
"e164.arpa",
"in-addr.arpa",
"ip6.arpa",
"iris.arpa",
"uri.arpa",
"urn.arpa",
"as",
"gov.as",
"asia",
"at",
"ac.at",
"co.at",
"gv.at",
"or.at",
"sth.ac.at",
"au",
"com.au",
"net.au",
"org.au",
"edu.au",
"gov.au",
"asn.au",
"id.au",
"info.au",
"conf.au",
"oz.au",
"act.au",
"nsw.au",
"nt.au",
"qld.au",
"sa.au",
"tas.au",
"vic.au",
"wa.au",
"act.edu.au",
"catholic.edu.au",
"nsw.edu.au",
"nt.edu.au",
"qld.edu.au",
"sa.edu.au",
"tas.edu.au",
"vic.edu.au",
"wa.edu.au",
"qld.gov.au",
"sa.gov.au",
"tas.gov.au",
"vic.gov.au",
"wa.gov.au",
"schools.nsw.edu.au",
"aw",
"com.aw",
"ax",
"az",
"com.az",
"net.az",
"int.az",
"gov.az",
"org.az",
"edu.az",
"info.az",
"pp.az",
"mil.az",
"name.az",
"pro.az",
"biz.az",
"ba",
"com.ba",
"edu.ba",
"gov.ba",
"mil.ba",
"net.ba",
"org.ba",
"bb",
"biz.bb",
"co.bb",
"com.bb",
"edu.bb",
"gov.bb",
"info.bb",
"net.bb",
"org.bb",
"store.bb",
"tv.bb",
"*.bd",
"be",
"ac.be",
"bf",
"gov.bf",
"bg",
"a.bg",
"b.bg",
"c.bg",
"d.bg",
"e.bg",
"f.bg",
"g.bg",
"h.bg",
"i.bg",
"j.bg",
"k.bg",
"l.bg",
"m.bg",
"n.bg",
"o.bg",
"p.bg",
"q.bg",
"r.bg",
"s.bg",
"t.bg",
"u.bg",
"v.bg",
"w.bg",
"x.bg",
"y.bg",
"z.bg",
"0.bg",
"1.bg",
"2.bg",
"3.bg",
"4.bg",
"5.bg",
"6.bg",
"7.bg",
"8.bg",
"9.bg",
"bh",
"com.bh",
"edu.bh",
"net.bh",
"org.bh",
"gov.bh",
"bi",
"co.bi",
"com.bi",
"edu.bi",
"or.bi",
"org.bi",
"biz",
"bj",
"asso.bj",
"barreau.bj",
"gouv.bj",
"bm",
"com.bm",
"edu.bm",
"gov.bm",
"net.bm",
"org.bm",
"bn",
"com.bn",
"edu.bn",
"gov.bn",
"net.bn",
"org.bn",
"bo",
"com.bo",
"edu.bo",
"gob.bo",
"int.bo",
"org.bo",
"net.bo",
"mil.bo",
"tv.bo",
"web.bo",
"academia.bo",
"agro.bo",
"arte.bo",
"blog.bo",
"bolivia.bo",
"ciencia.bo",
"cooperativa.bo",
"democracia.bo",
"deporte.bo",
"ecologia.bo",
"economia.bo",
"empresa.bo",
"indigena.bo",
"industria.bo",
"info.bo",
"medicina.bo",
"movimiento.bo",
"musica.bo",
"natural.bo",
"nombre.bo",
"noticias.bo",
"patria.bo",
"politica.bo",
"profesional.bo",
"plurinacional.bo",
"pueblo.bo",
"revista.bo",
"salud.bo",
"tecnologia.bo",
"tksat.bo",
"transporte.bo",
"wiki.bo",
"br",
"9guacu.br",
"abc.br",
"adm.br",
"adv.br",
"agr.br",
"aju.br",
"am.br",
"anani.br",
"aparecida.br",
"app.br",
"arq.br",
"art.br",
"ato.br",
"b.br",
"barueri.br",
"belem.br",
"bhz.br",
"bib.br",
"bio.br",
"blog.br",
"bmd.br",
"boavista.br",
"bsb.br",
"campinagrande.br",
"campinas.br",
"caxias.br",
"cim.br",
"cng.br",
"cnt.br",
"com.br",
"contagem.br",
"coop.br",
"coz.br",
"cri.br",
"cuiaba.br",
"curitiba.br",
"def.br",
"des.br",
"det.br",
"dev.br",
"ecn.br",
"eco.br",
"edu.br",
"emp.br",
"enf.br",
"eng.br",
"esp.br",
"etc.br",
"eti.br",
"far.br",
"feira.br",
"flog.br",
"floripa.br",
"fm.br",
"fnd.br",
"fortal.br",
"fot.br",
"foz.br",
"fst.br",
"g12.br",
"geo.br",
"ggf.br",
"goiania.br",
"gov.br",
"ac.gov.br",
"al.gov.br",
"am.gov.br",
"ap.gov.br",
"ba.gov.br",
"ce.gov.br",
"df.gov.br",
"es.gov.br",
"go.gov.br",
"ma.gov.br",
"mg.gov.br",
"ms.gov.br",
"mt.gov.br",
"pa.gov.br",
"pb.gov.br",
"pe.gov.br",
"pi.gov.br",
"pr.gov.br",
"rj.gov.br",
"rn.gov.br",
"ro.gov.br",
"rr.gov.br",
"rs.gov.br",
"sc.gov.br",
"se.gov.br",
"sp.gov.br",
"to.gov.br",
"gru.br",
"imb.br",
"ind.br",
"inf.br",
"jab.br",
"jampa.br",
"jdf.br",
"joinville.br",
"jor.br",
"jus.br",
"leg.br",
"lel.br",
"log.br",
"londrina.br",
"macapa.br",
"maceio.br",
"manaus.br",
"maringa.br",
"mat.br",
"med.br",
"mil.br",
"morena.br",
"mp.br",
"mus.br",
"natal.br",
"net.br",
"niteroi.br",
"*.nom.br",
"not.br",
"ntr.br",
"odo.br",
"ong.br",
"org.br",
"osasco.br",
"palmas.br",
"poa.br",
"ppg.br",
"pro.br",
"psc.br",
"psi.br",
"pvh.br",
"qsl.br",
"radio.br",
"rec.br",
"recife.br",
"rep.br",
"ribeirao.br",
"rio.br",
"riobranco.br",
"riopreto.br",
"salvador.br",
"sampa.br",
"santamaria.br",
"santoandre.br",
"saobernardo.br",
"saogonca.br",
"seg.br",
"sjc.br",
"slg.br",
"slz.br",
"sorocaba.br",
"srv.br",
"taxi.br",
"tc.br",
"tec.br",
"teo.br",
"the.br",
"tmp.br",
"trd.br",
"tur.br",
"tv.br",
"udi.br",
"vet.br",
"vix.br",
"vlog.br",
"wiki.br",
"zlg.br",
"bs",
"com.bs",
"net.bs",
"org.bs",
"edu.bs",
"gov.bs",
"bt",
"com.bt",
"edu.bt",
"gov.bt",
"net.bt",
"org.bt",
"bv",
"bw",
"co.bw",
"org.bw",
"by",
"gov.by",
"mil.by",
"com.by",
"of.by",
"bz",
"com.bz",
"net.bz",
"org.bz",
"edu.bz",
"gov.bz",
"ca",
"ab.ca",
"bc.ca",
"mb.ca",
"nb.ca",
"nf.ca",
"nl.ca",
"ns.ca",
"nt.ca",
"nu.ca",
"on.ca",
"pe.ca",
"qc.ca",
"sk.ca",
"yk.ca",
"gc.ca",
"cat",
"cc",
"cd",
"gov.cd",
"cf",
"cg",
"ch",
"ci",
"org.ci",
"or.ci",
"com.ci",
"co.ci",
"edu.ci",
"ed.ci",
"ac.ci",
"net.ci",
"go.ci",
"asso.ci",
"aéroport.ci",
"int.ci",
"presse.ci",
"md.ci",
"gouv.ci",
"*.ck",
"!www.ck",
"cl",
"co.cl",
"gob.cl",
"gov.cl",
"mil.cl",
"cm",
"co.cm",
"com.cm",
"gov.cm",
"net.cm",
"cn",
"ac.cn",
"com.cn",
"edu.cn",
"gov.cn",
"net.cn",
"org.cn",
"mil.cn",
"公司.cn",
"网络.cn",
"網絡.cn",
"ah.cn",
"bj.cn",
"cq.cn",
"fj.cn",
"gd.cn",
"gs.cn",
"gz.cn",
"gx.cn",
"ha.cn",
"hb.cn",
"he.cn",
"hi.cn",
"hl.cn",
"hn.cn",
"jl.cn",
"js.cn",
"jx.cn",
"ln.cn",
"nm.cn",
"nx.cn",
"qh.cn",
"sc.cn",
"sd.cn",
"sh.cn",
"sn.cn",
"sx.cn",
"tj.cn",
"xj.cn",
"xz.cn",
"yn.cn",
"zj.cn",
"hk.cn",
"mo.cn",
"tw.cn",
"co",
"arts.co",
"com.co",
"edu.co",
"firm.co",
"gov.co",
"info.co",
"int.co",
"mil.co",
"net.co",
"nom.co",
"org.co",
"rec.co",
"web.co",
"com",
"coop",
"cr",
"ac.cr",
"co.cr",
"ed.cr",
"fi.cr",
"go.cr",
"or.cr",
"sa.cr",
"cu",
"com.cu",
"edu.cu",
"org.cu",
"net.cu",
"gov.cu",
"inf.cu",
"cv",
"com.cv",
"edu.cv",
"int.cv",
"nome.cv",
"org.cv",
"cw",
"com.cw",
"edu.cw",
"net.cw",
"org.cw",
"cx",
"gov.cx",
"cy",
"ac.cy",
"biz.cy",
"com.cy",
"ekloges.cy",
"gov.cy",
"ltd.cy",
"mil.cy",
"net.cy",
"org.cy",
"press.cy",
"pro.cy",
"tm.cy",
"cz",
"de",
"dj",
"dk",
"dm",
"com.dm",
"net.dm",
"org.dm",
"edu.dm",
"gov.dm",
"do",
"art.do",
"com.do",
"edu.do",
"gob.do",
"gov.do",
"mil.do",
"net.do",
"org.do",
"sld.do",
"web.do",
"dz",
"art.dz",
"asso.dz",
"com.dz",
"edu.dz",
"gov.dz",
"org.dz",
"net.dz",
"pol.dz",
"soc.dz",
"tm.dz",
"ec",
"com.ec",
"info.ec",
"net.ec",
"fin.ec",
"k12.ec",
"med.ec",
"pro.ec",
"org.ec",
"edu.ec",
"gov.ec",
"gob.ec",
"mil.ec",
"edu",
"ee",
"edu.ee",
"gov.ee",
"riik.ee",
"lib.ee",
"med.ee",
"com.ee",
"pri.ee",
"aip.ee",
"org.ee",
"fie.ee",
"eg",
"com.eg",
"edu.eg",
"eun.eg",
"gov.eg",
"mil.eg",
"name.eg",
"net.eg",
"org.eg",
"sci.eg",
"*.er",
"es",
"com.es",
"nom.es",
"org.es",
"gob.es",
"edu.es",
"et",
"com.et",
"gov.et",
"org.et",
"edu.et",
"biz.et",
"name.et",
"info.et",
"net.et",
"eu",
"fi",
"aland.fi",
"fj",
"ac.fj",
"biz.fj",
"com.fj",
"gov.fj",
"info.fj",
"mil.fj",
"name.fj",
"net.fj",
"org.fj",
"pro.fj",
"*.fk",
"com.fm",
"edu.fm",
"net.fm",
"org.fm",
"fm",
"fo",
"fr",
"asso.fr",
"com.fr",
"gouv.fr",
"nom.fr",
"prd.fr",
"tm.fr",
"aeroport.fr",
"avocat.fr",
"avoues.fr",
"cci.fr",
"chambagri.fr",
"chirurgiens-dentistes.fr",
"experts-comptables.fr",
"geometre-expert.fr",
"greta.fr",
"huissier-justice.fr",
"medecin.fr",
"notaires.fr",
"pharmacien.fr",
"port.fr",
"veterinaire.fr",
"ga",
"gb",
"edu.gd",
"gov.gd",
"gd",
"ge",
"com.ge",
"edu.ge",
"gov.ge",
"org.ge",
"mil.ge",
"net.ge",
"pvt.ge",
"gf",
"gg",
"co.gg",
"net.gg",
"org.gg",
"gh",
"com.gh",
"edu.gh",
"gov.gh",
"org.gh",
"mil.gh",
"gi",
"com.gi",
"ltd.gi",
"gov.gi",
"mod.gi",
"edu.gi",
"org.gi",
"gl",
"co.gl",
"com.gl",
"edu.gl",
"net.gl",
"org.gl",
"gm",
"gn",
"ac.gn",
"com.gn",
"edu.gn",
"gov.gn",
"org.gn",
"net.gn",
"gov",
"gp",
"com.gp",
"net.gp",
"mobi.gp",
"edu.gp",
"org.gp",
"asso.gp",
"gq",
"gr",
"com.gr",
"edu.gr",
"net.gr",
"org.gr",
"gov.gr",
"gs",
"gt",
"com.gt",
"edu.gt",
"gob.gt",
"ind.gt",
"mil.gt",
"net.gt",
"org.gt",
"gu",
"com.gu",
"edu.gu",
"gov.gu",
"guam.gu",
"info.gu",
"net.gu",
"org.gu",
"web.gu",
"gw",
"gy",
"co.gy",
"com.gy",
"edu.gy",
"gov.gy",
"net.gy",
"org.gy",
"hk",
"com.hk",
"edu.hk",
"gov.hk",
"idv.hk",
"net.hk",
"org.hk",
"公司.hk",
"教育.hk",
"敎育.hk",
"政府.hk",
"個人.hk",
"个��.hk",
"箇人.hk",
"網络.hk",
"网络.hk",
"组織.hk",
"網絡.hk",
"网絡.hk",
"组织.hk",
"組織.hk",
"組织.hk",
"hm",
"hn",
"com.hn",
"edu.hn",
"org.hn",
"net.hn",
"mil.hn",
"gob.hn",
"hr",
"iz.hr",
"from.hr",
"name.hr",
"com.hr",
"ht",
"com.ht",
"shop.ht",
"firm.ht",
"info.ht",
"adult.ht",
"net.ht",
"pro.ht",
"org.ht",
"med.ht",
"art.ht",
"coop.ht",
"pol.ht",
"asso.ht",
"edu.ht",
"rel.ht",
"gouv.ht",
"perso.ht",
"hu",
"co.hu",
"info.hu",
"org.hu",
"priv.hu",
"sport.hu",
"tm.hu",
"2000.hu",
"agrar.hu",
"bolt.hu",
"casino.hu",
"city.hu",
"erotica.hu",
"erotika.hu",
"film.hu",
"forum.hu",
"games.hu",
"hotel.hu",
"ingatlan.hu",
"jogasz.hu",
"konyvelo.hu",
"lakas.hu",
"media.hu",
"news.hu",
"reklam.hu",
"sex.hu",
"shop.hu",
"suli.hu",
"szex.hu",
"tozsde.hu",
"utazas.hu",
"video.hu",
"id",
"ac.id",
"biz.id",
"co.id",
"desa.id",
"go.id",
"mil.id",
"my.id",
"net.id",
"or.id",
"ponpes.id",
"sch.id",
"web.id",
"ie",
"gov.ie",
"il",
"ac.il",
"co.il",
"gov.il",
"idf.il",
"k12.il",
"muni.il",
"net.il",
"org.il",
"im",
"ac.im",
"co.im",
"com.im",
"ltd.co.im",
"net.im",
"org.im",
"plc.co.im",
"tt.im",
"tv.im",
"in",
"co.in",
"firm.in",
"net.in",
"org.in",
"gen.in",
"ind.in",
"nic.in",
"ac.in",
"edu.in",
"res.in",
"gov.in",
"mil.in",
"info",
"int",
"eu.int",
"io",
"com.io",
"iq",
"gov.iq",
"edu.iq",
"mil.iq",
"com.iq",
"org.iq",
"net.iq",
"ir",
"ac.ir",
"co.ir",
"gov.ir",
"id.ir",
"net.ir",
"org.ir",
"sch.ir",
"ایران.ir",
"ايران.ir",
"is",
"net.is",
"com.is",
"edu.is",
"gov.is",
"org.is",
"int.is",
"it",
"gov.it",
"edu.it",
"abr.it",
"abruzzo.it",
"aosta-valley.it",
"aostavalley.it",
"bas.it",
"basilicata.it",
"cal.it",
"calabria.it",
"cam.it",
"campania.it",
"emilia-romagna.it",
"emiliaromagna.it",
"emr.it",
"friuli-v-giulia.it",
"friuli-ve-giulia.it",
"friuli-vegiulia.it",
"friuli-venezia-giulia.it",
"friuli-veneziagiulia.it",
"friuli-vgiulia.it",
"friuliv-giulia.it",
"friulive-giulia.it",
"friulivegiulia.it",
"friulivenezia-giulia.it",
"friuliveneziagiulia.it",
"friulivgiulia.it",
"fvg.it",
"laz.it",
"lazio.it",
"lig.it",
"liguria.it",
"lom.it",
"lombardia.it",
"lombardy.it",
"lucania.it",
"mar.it",
"marche.it",
"mol.it",
"molise.it",
"piedmont.it",
"piemonte.it",
"pmn.it",
"pug.it",
"puglia.it",
"sar.it",
"sardegna.it",
"sardinia.it",
"sic.it",
"sicilia.it",
"sicily.it",
"taa.it",
"tos.it",
"toscana.it",
"trentin-sud-tirol.it",
"trentin-süd-tirol.it",
"trentin-sudtirol.it",
"trentin-südtirol.it",
"trentin-sued-tirol.it",
"trentin-suedtirol.it",
"trentino-a-adige.it",
"trentino-aadige.it",
"trentino-alto-adige.it",
"trentino-altoadige.it",
"trentino-s-tirol.it",
"trentino-stirol.it",
"trentino-sud-tirol.it",
"trentino-süd-tirol.it",
"trentino-sudtirol.it",
"trentino-südtirol.it",
"trentino-sued-tirol.it",
"trentino-suedtirol.it",
"trentino.it",
"trentinoa-adige.it",
"trentinoaadige.it",
"trentinoalto-adige.it",
"trentinoaltoadige.it",
"trentinos-tirol.it",
"trentinostirol.it",
"trentinosud-tirol.it",
"trentinosüd-tirol.it",
"trentinosudtirol.it",
"trentinosüdtirol.it",
"trentinosued-tirol.it",
"trentinosuedtirol.it",
"trentinsud-tirol.it",
"trentinsüd-tirol.it",
"trentinsudtirol.it",
"trentinsüdtirol.it",
"trentinsued-tirol.it",
"trentinsuedtirol.it",
"tuscany.it",
"umb.it",
"umbria.it",
"val-d-aosta.it",
"val-daosta.it",
"vald-aosta.it",
"valdaosta.it",
"valle-aosta.it",
"valle-d-aosta.it",
"valle-daosta.it",
"valleaosta.it",
"valled-aosta.it",
"valledaosta.it",
"vallee-aoste.it",
"vallée-aoste.it",
"vallee-d-aoste.it",
"vallée-d-aoste.it",
"valleeaoste.it",
"valléeaoste.it",
"valleedaoste.it",
"valléedaoste.it",
"vao.it",
"vda.it",
"ven.it",
"veneto.it",
"ag.it",
"agrigento.it",
"al.it",
"alessandria.it",
"alto-adige.it",
"altoadige.it",
"an.it",
"ancona.it",
"andria-barletta-trani.it",
"andria-trani-barletta.it",
"andriabarlettatrani.it",
"andriatranibarletta.it",
"ao.it",
"aosta.it",
"aoste.it",
"ap.it",
"aq.it",
"aquila.it",
"ar.it",
"arezzo.it",
"ascoli-piceno.it",
"ascolipiceno.it",
"asti.it",
"at.it",
"av.it",
"avellino.it",
"ba.it",
"balsan-sudtirol.it",
"balsan-südtirol.it",
"balsan-suedtirol.it",
"balsan.it",
"bari.it",
"barletta-trani-andria.it",
"barlettatraniandria.it",
"belluno.it",
"benevento.it",
"bergamo.it",
"bg.it",
"bi.it",
"biella.it",
"bl.it",
"bn.it",
"bo.it",
"bologna.it",
"bolzano-altoadige.it",
"bolzano.it",
"bozen-sudtirol.it",
"bozen-südtirol.it",
"bozen-suedtirol.it",
"bozen.it",
"br.it",
"brescia.it",
"brindisi.it",
"bs.it",
"bt.it",
"bulsan-sudtirol.it",
"bulsan-südtirol.it",
"bulsan-suedtirol.it",
"bulsan.it",
"bz.it",
"ca.it",
"cagliari.it",
"caltanissetta.it",
"campidano-medio.it",
"campidanomedio.it",
"campobasso.it",
"carbonia-iglesias.it",
"carboniaiglesias.it",
"carrara-massa.it",
"carraramassa.it",
"caserta.it",
"catania.it",
"catanzaro.it",
"cb.it",
"ce.it",
"cesena-forli.it",
"cesena-forlì.it",
"cesenaforli.it",
"cesenaforlì.it",
"ch.it",
"chieti.it",
"ci.it",
"cl.it",
"cn.it",
"co.it",
"como.it",
"cosenza.it",
"cr.it",
"cremona.it",
"crotone.it",
"cs.it",
"ct.it",
"cuneo.it",
"cz.it",
"dell-ogliastra.it",
"dellogliastra.it",
"en.it",
"enna.it",
"fc.it",
"fe.it",
"fermo.it",
"ferrara.it",
"fg.it",
"fi.it",
"firenze.it",
"florence.it",
"fm.it",
"foggia.it",
"forli-cesena.it",
"forlì-cesena.it",
"forlicesena.it",
"forlìcesena.it",
"fr.it",
"frosinone.it",
"ge.it",
"genoa.it",
"genova.it",
"go.it",
"gorizia.it",
"gr.it",
"grosseto.it",
"iglesias-carbonia.it",
"iglesiascarbonia.it",
"im.it",
"imperia.it",
"is.it",
"isernia.it",
"kr.it",
"la-spezia.it",
"laquila.it",
"laspezia.it",
"latina.it",
"lc.it",
"le.it",
"lecce.it",
"lecco.it",
"li.it",
"livorno.it",
"lo.it",
"lodi.it",
"lt.it",
"lu.it",
"lucca.it",
"macerata.it",
"mantova.it",
"massa-carrara.it",
"massacarrara.it",
"matera.it",
"mb.it",
"mc.it",
"me.it",
"medio-campidano.it",
"mediocampidano.it",
"messina.it",
"mi.it",
"milan.it",
"milano.it",
"mn.it",
"mo.it",
"modena.it",
"monza-brianza.it",
"monza-e-della-brianza.it",
"monza.it",
"monzabrianza.it",
"monzaebrianza.it",
"monzaedellabrianza.it",
"ms.it",
"mt.it",
"na.it",
"naples.it",
"napoli.it",
"no.it",
"novara.it",
"nu.it",
"nuoro.it",
"og.it",
"ogliastra.it",
"olbia-tempio.it",
"olbiatempio.it",
"or.it",
"oristano.it",
"ot.it",
"pa.it",
"padova.it",
"padua.it",
"palermo.it",
"parma.it",
"pavia.it",
"pc.it",
"pd.it",
"pe.it",
"perugia.it",
"pesaro-urbino.it",
"pesarourbino.it",
"pescara.it",
"pg.it",
"pi.it",
"piacenza.it",
"pisa.it",
"pistoia.it",
"pn.it",
"po.it",
"pordenone.it",
"potenza.it",
"pr.it",
"prato.it",
"pt.it",
"pu.it",
"pv.it",
"pz.it",
"ra.it",
"ragusa.it",
"ravenna.it",
"rc.it",
"re.it",
"reggio-calabria.it",
"reggio-emilia.it",
"reggiocalabria.it",
"reggioemilia.it",
"rg.it",
"ri.it",
"rieti.it",
"rimini.it",
"rm.it",
"rn.it",
"ro.it",
"roma.it",
"rome.it",
"rovigo.it",
"sa.it",
"salerno.it",
"sassari.it",
"savona.it",
"si.it",
"siena.it",
"siracusa.it",
"so.it",
"sondrio.it",
"sp.it",
"sr.it",
"ss.it",
"suedtirol.it",
"südtirol.it",
"sv.it",
"ta.it",
"taranto.it",
"te.it",
"tempio-olbia.it",
"tempioolbia.it",
"teramo.it",
"terni.it",
"tn.it",
"to.it",
"torino.it",
"tp.it",
"tr.it",
"trani-andria-barletta.it",
"trani-barletta-andria.it",
"traniandriabarletta.it",
"tranibarlettaandria.it",
"trapani.it",
"trento.it",
"treviso.it",
"trieste.it",
"ts.it",
"turin.it",
"tv.it",
"ud.it",
"udine.it",
"urbino-pesaro.it",
"urbinopesaro.it",
"va.it",
"varese.it",
"vb.it",
"vc.it",
"ve.it",
"venezia.it",
"venice.it",
"verbania.it",
"vercelli.it",
"verona.it",
"vi.it",
"vibo-valentia.it",
"vibovalentia.it",
"vicenza.it",
"viterbo.it",
"vr.it",
"vs.it",
"vt.it",
"vv.it",
"je",
"co.je",
"net.je",
"org.je",
"*.jm",
"jo",
"com.jo",
"org.jo",
"net.jo",
"edu.jo",
"sch.jo",
"gov.jo",
"mil.jo",
"name.jo",
"jobs",
"jp",
"ac.jp",
"ad.jp",
"co.jp",
"ed.jp",
"go.jp",
"gr.jp",
"lg.jp",
"ne.jp",
"or.jp",
"aichi.jp",
"akita.jp",
"aomori.jp",
"chiba.jp",
"ehime.jp",
"fukui.jp",
"fukuoka.jp",
"fukushima.jp",
"gifu.jp",
"gunma.jp",
"hiroshima.jp",
"hokkaido.jp",
"hyogo.jp",
"ibaraki.jp",
"ishikawa.jp",
"iwate.jp",
"kagawa.jp",
"kagoshima.jp",
"kanagawa.jp",
"kochi.jp",
"kumamoto.jp",
"kyoto.jp",
"mie.jp",
"miyagi.jp",
"miyazaki.jp",
"nagano.jp",
"nagasaki.jp",
"nara.jp",
"niigata.jp",
"oita.jp",
"okayama.jp",
"okinawa.jp",
"osaka.jp",
"saga.jp",
"saitama.jp",
"shiga.jp",
"shimane.jp",
"shizuoka.jp",
"tochigi.jp",
"tokushima.jp",
"tokyo.jp",
"tottori.jp",
"toyama.jp",
"wakayama.jp",
"yamagata.jp",
"yamaguchi.jp",
"yamanashi.jp",
"栃木.jp",
"愛知.jp",
"愛媛.jp",
"兵庫.jp",
"熊本.jp",
"茨城.jp",
"北海道.jp",
"千葉.jp",
"和歌山.jp",
"長崎.jp",
"長野.jp",
"新潟.jp",
"青森.jp",
"静岡.jp",
"東京.jp",
"石川.jp",
"埼玉.jp",
"三重.jp",
"京都.jp",
"佐賀.jp",
"大分.jp",
"大阪.jp",
"奈良.jp",
"宮城.jp",
"宮崎.jp",
"富山.jp",
"山口.jp",
"山形.jp",
"山梨.jp",
"岩手.jp",
"岐阜.jp",
"岡山.jp",
"島根.jp",
"広島.jp",
"徳島.jp",
"沖縄.jp",
"滋賀.jp",
"神奈川.jp",
"福井.jp",
"福岡.jp",
"福島.jp",
"秋田.jp",
"群馬.jp",
"香川.jp",
"高知.jp",
"鳥取.jp",
"鹿児島.jp",
"*.kawasaki.jp",
"*.kitakyushu.jp",
"*.kobe.jp",
"*.nagoya.jp",
"*.sapporo.jp",
"*.sendai.jp",
"*.yokohama.jp",
"!city.kawasaki.jp",
"!city.kitakyushu.jp",
"!city.kobe.jp",
"!city.nagoya.jp",
"!city.sapporo.jp",
"!city.sendai.jp",
"!city.yokohama.jp",
"aisai.aichi.jp",
"ama.aichi.jp",
"anjo.aichi.jp",
"asuke.aichi.jp",
"chiryu.aichi.jp",
"chita.aichi.jp",
"fuso.aichi.jp",
"gamagori.aichi.jp",
"handa.aichi.jp",
"hazu.aichi.jp",
"hekinan.aichi.jp",
"higashiura.aichi.jp",
"ichinomiya.aichi.jp",
"inazawa.aichi.jp",
"inuyama.aichi.jp",
"isshiki.aichi.jp",
"iwakura.aichi.jp",
"kanie.aichi.jp",
"kariya.aichi.jp",
"kasugai.aichi.jp",
"kira.aichi.jp",
"kiyosu.aichi.jp",
"komaki.aichi.jp",
"konan.aichi.jp",
"kota.aichi.jp",
"mihama.aichi.jp",
"miyoshi.aichi.jp",
"nishio.aichi.jp",
"nisshin.aichi.jp",
"obu.aichi.jp",
"oguchi.aichi.jp",
"oharu.aichi.jp",
"okazaki.aichi.jp",
"owariasahi.aichi.jp",
"seto.aichi.jp",
"shikatsu.aichi.jp",
"shinshiro.aichi.jp",
"shitara.aichi.jp",
"tahara.aichi.jp",
"takahama.aichi.jp",
"tobishima.aichi.jp",
"toei.aichi.jp",
"togo.aichi.jp",
"tokai.aichi.jp",
"tokoname.aichi.jp",
"toyoake.aichi.jp",
"toyohashi.aichi.jp",
"toyokawa.aichi.jp",
"toyone.aichi.jp",
"toyota.aichi.jp",
"tsushima.aichi.jp",
"yatomi.aichi.jp",
"akita.akita.jp",
"daisen.akita.jp",
"fujisato.akita.jp",
"gojome.akita.jp",
"hachirogata.akita.jp",
"happou.akita.jp",
"higashinaruse.akita.jp",
"honjo.akita.jp",
"honjyo.akita.jp",
"ikawa.akita.jp",
"kamikoani.akita.jp",
"kamioka.akita.jp",
"katagami.akita.jp",
"kazuno.akita.jp",
"kitaakita.akita.jp",
"kosaka.akita.jp",
"kyowa.akita.jp",
"misato.akita.jp",
"mitane.akita.jp",
"moriyoshi.akita.jp",
"nikaho.akita.jp",
"noshiro.akita.jp",
"odate.akita.jp",
"oga.akita.jp",
"ogata.akita.jp",
"semboku.akita.jp",
"yokote.akita.jp",
"yurihonjo.akita.jp",
"aomori.aomori.jp",
"gonohe.aomori.jp",
"hachinohe.aomori.jp",
"hashikami.aomori.jp",
"hiranai.aomori.jp",
"hirosaki.aomori.jp",
"itayanagi.aomori.jp",
"kuroishi.aomori.jp",
"misawa.aomori.jp",
"mutsu.aomori.jp",
"nakadomari.aomori.jp",
"noheji.aomori.jp",
"oirase.aomori.jp",
"owani.aomori.jp",
"rokunohe.aomori.jp",
"sannohe.aomori.jp",
"shichinohe.aomori.jp",
"shingo.aomori.jp",
"takko.aomori.jp",
"towada.aomori.jp",
"tsugaru.aomori.jp",
"tsuruta.aomori.jp",
"abiko.chiba.jp",
"asahi.chiba.jp",
"chonan.chiba.jp",
"chosei.chiba.jp",
"choshi.chiba.jp",
"chuo.chiba.jp",
"funabashi.chiba.jp",
"futtsu.chiba.jp",
"hanamigawa.chiba.jp",
"ichihara.chiba.jp",
"ichikawa.chiba.jp",
"ichinomiya.chiba.jp",
"inzai.chiba.jp",
"isumi.chiba.jp",
"kamagaya.chiba.jp",
"kamogawa.chiba.jp",
"kashiwa.chiba.jp",
"katori.chiba.jp",
"katsuura.chiba.jp",
"kimitsu.chiba.jp",
"kisarazu.chiba.jp",
"kozaki.chiba.jp",
"kujukuri.chiba.jp",
"kyonan.chiba.jp",
"matsudo.chiba.jp",
"midori.chiba.jp",
"mihama.chiba.jp",
"minamiboso.chiba.jp",
"mobara.chiba.jp",
"mutsuzawa.chiba.jp",
"nagara.chiba.jp",
"nagareyama.chiba.jp",
"narashino.chiba.jp",
"narita.chiba.jp",
"noda.chiba.jp",
"oamishirasato.chiba.jp",
"omigawa.chiba.jp",
"onjuku.chiba.jp",
"otaki.chiba.jp",
"sakae.chiba.jp",
"sakura.chiba.jp",
"shimofusa.chiba.jp",
"shirako.chiba.jp",
"shiroi.chiba.jp",
"shisui.chiba.jp",
"sodegaura.chiba.jp",
"sosa.chiba.jp",
"tako.chiba.jp",
"tateyama.chiba.jp",
"togane.chiba.jp",
"tohnosho.chiba.jp",
"tomisato.chiba.jp",
"urayasu.chiba.jp",
"yachimata.chiba.jp",
"yachiyo.chiba.jp",
"yokaichiba.chiba.jp",
"yokoshibahikari.chiba.jp",
"yotsukaido.chiba.jp",
"ainan.ehime.jp",
"honai.ehime.jp",
"ikata.ehime.jp",
"imabari.ehime.jp",
"iyo.ehime.jp",
"kamijima.ehime.jp",
"kihoku.ehime.jp",
"kumakogen.ehime.jp",
"masaki.ehime.jp",
"matsuno.ehime.jp",
"matsuyama.ehime.jp",
"namikata.ehime.jp",
"niihama.ehime.jp",
"ozu.ehime.jp",
"saijo.ehime.jp",
"seiyo.ehime.jp",
"shikokuchuo.ehime.jp",
"tobe.ehime.jp",
"toon.ehime.jp",
"uchiko.ehime.jp",
"uwajima.ehime.jp",
"yawatahama.ehime.jp",
"echizen.fukui.jp",
"eiheiji.fukui.jp",
"fukui.fukui.jp",
"ikeda.fukui.jp",
"katsuyama.fukui.jp",
"mihama.fukui.jp",
"minamiechizen.fukui.jp",
"obama.fukui.jp",
"ohi.fukui.jp",
"ono.fukui.jp",
"sabae.fukui.jp",
"sakai.fukui.jp",
"takahama.fukui.jp",
"tsuruga.fukui.jp",
"wakasa.fukui.jp",
"ashiya.fukuoka.jp",
"buzen.fukuoka.jp",
"chikugo.fukuoka.jp",
"chikuho.fukuoka.jp",
"chikujo.fukuoka.jp",
"chikushino.fukuoka.jp",
"chikuzen.fukuoka.jp",
"chuo.fukuoka.jp",
"dazaifu.fukuoka.jp",
"fukuchi.fukuoka.jp",
"hakata.fukuoka.jp",
"higashi.fukuoka.jp",
"hirokawa.fukuoka.jp",
"hisayama.fukuoka.jp",
"iizuka.fukuoka.jp",
"inatsuki.fukuoka.jp",
"kaho.fukuoka.jp",
"kasuga.fukuoka.jp",
"kasuya.fukuoka.jp",
"kawara.fukuoka.jp",
"keisen.fukuoka.jp",
"koga.fukuoka.jp",
"kurate.fukuoka.jp",
"kurogi.fukuoka.jp",
"kurume.fukuoka.jp",
"minami.fukuoka.jp",
"miyako.fukuoka.jp",
"miyama.fukuoka.jp",
"miyawaka.fukuoka.jp",
"mizumaki.fukuoka.jp",
"munakata.fukuoka.jp",
"nakagawa.fukuoka.jp",
"nakama.fukuoka.jp",
"nishi.fukuoka.jp",
"nogata.fukuoka.jp",
"ogori.fukuoka.jp",
"okagaki.fukuoka.jp",
"okawa.fukuoka.jp",
"oki.fukuoka.jp",
"omuta.fukuoka.jp",
"onga.fukuoka.jp",
"onojo.fukuoka.jp",
"oto.fukuoka.jp",
"saigawa.fukuoka.jp",
"sasaguri.fukuoka.jp",
"shingu.fukuoka.jp",
"shinyoshitomi.fukuoka.jp",
"shonai.fukuoka.jp",
"soeda.fukuoka.jp",
"sue.fukuoka.jp",
"tachiarai.fukuoka.jp",
"tagawa.fukuoka.jp",
"takata.fukuoka.jp",
"toho.fukuoka.jp",
"toyotsu.fukuoka.jp",
"tsuiki.fukuoka.jp",
"ukiha.fukuoka.jp",
"umi.fukuoka.jp",
"usui.fukuoka.jp",
"yamada.fukuoka.jp",
"yame.fukuoka.jp",
"yanagawa.fukuoka.jp",
"yukuhashi.fukuoka.jp",
"aizubange.fukushima.jp",
"aizumisato.fukushima.jp",
"aizuwakamatsu.fukushima.jp",
"asakawa.fukushima.jp",
"bandai.fukushima.jp",
"date.fukushima.jp",
"fukushima.fukushima.jp",
"furudono.fukushima.jp",
"futaba.fukushima.jp",
"hanawa.fukushima.jp",
"higashi.fukushima.jp",
"hirata.fukushima.jp",
"hirono.fukushima.jp",
"iitate.fukushima.jp",
"inawashiro.fukushima.jp",
"ishikawa.fukushima.jp",
"iwaki.fukushima.jp",
"izumizaki.fukushima.jp",
"kagamiishi.fukushima.jp",
"kaneyama.fukushima.jp",
"kawamata.fukushima.jp",
"kitakata.fukushima.jp",
"kitashiobara.fukushima.jp",
"koori.fukushima.jp",
"koriyama.fukushima.jp",
"kunimi.fukushima.jp",
"miharu.fukushima.jp",
"mishima.fukushima.jp",
"namie.fukushima.jp",
"nango.fukushima.jp",
"nishiaizu.fukushima.jp",
"nishigo.fukushima.jp",
"okuma.fukushima.jp",
"omotego.fukushima.jp",
"ono.fukushima.jp",
"otama.fukushima.jp",
"samegawa.fukushima.jp",
"shimogo.fukushima.jp",
"shirakawa.fukushima.jp",
"showa.fukushima.jp",
"soma.fukushima.jp",
"sukagawa.fukushima.jp",
"taishin.fukushima.jp",
"tamakawa.fukushima.jp",
"tanagura.fukushima.jp",
"tenei.fukushima.jp",
"yabuki.fukushima.jp",
"yamato.fukushima.jp",
"yamatsuri.fukushima.jp",
"yanaizu.fukushima.jp",
"yugawa.fukushima.jp",
"anpachi.gifu.jp",
"ena.gifu.jp",
"gifu.gifu.jp",
"ginan.gifu.jp",
"godo.gifu.jp",
"gujo.gifu.jp",
"hashima.gifu.jp",
"hichiso.gifu.jp",
"hida.gifu.jp",
"higashishirakawa.gifu.jp",
"ibigawa.gifu.jp",
"ikeda.gifu.jp",
"kakamigahara.gifu.jp",
"kani.gifu.jp",
"kasahara.gifu.jp",
"kasamatsu.gifu.jp",
"kawaue.gifu.jp",
"kitagata.gifu.jp",
"mino.gifu.jp",
"minokamo.gifu.jp",
"mitake.gifu.jp",
"mizunami.gifu.jp",
"motosu.gifu.jp",
"nakatsugawa.gifu.jp",
"ogaki.gifu.jp",
"sakahogi.gifu.jp",
"seki.gifu.jp",
"sekigahara.gifu.jp",
"shirakawa.gifu.jp",
"tajimi.gifu.jp",
"takayama.gifu.jp",
"tarui.gifu.jp",
"toki.gifu.jp",
"tomika.gifu.jp",
"wanouchi.gifu.jp",
"yamagata.gifu.jp",
"yaotsu.gifu.jp",
"yoro.gifu.jp",
"annaka.gunma.jp",
"chiyoda.gunma.jp",
"fujioka.gunma.jp",
"higashiagatsuma.gunma.jp",
"isesaki.gunma.jp",
"itakura.gunma.jp",
"kanna.gunma.jp",
"kanra.gunma.jp",
"katashina.gunma.jp",
"kawaba.gunma.jp",
"kiryu.gunma.jp",
"kusatsu.gunma.jp",
"maebashi.gunma.jp",
"meiwa.gunma.jp",
"midori.gunma.jp",
"minakami.gunma.jp",
"naganohara.gunma.jp",
"nakanojo.gunma.jp",
"nanmoku.gunma.jp",
"numata.gunma.jp",
"oizumi.gunma.jp",
"ora.gunma.jp",
"ota.gunma.jp",
"shibukawa.gunma.jp",
"shimonita.gunma.jp",
"shinto.gunma.jp",
"showa.gunma.jp",
"takasaki.gunma.jp",
"takayama.gunma.jp",
"tamamura.gunma.jp",
"tatebayashi.gunma.jp",
"tomioka.gunma.jp",
"tsukiyono.gunma.jp",
"tsumagoi.gunma.jp",
"ueno.gunma.jp",
"yoshioka.gunma.jp",
"asaminami.hiroshima.jp",
"daiwa.hiroshima.jp",
"etajima.hiroshima.jp",
"fuchu.hiroshima.jp",
"fukuyama.hiroshima.jp",
"hatsukaichi.hiroshima.jp",
"higashihiroshima.hiroshima.jp",
"hongo.hiroshima.jp",
"jinsekikogen.hiroshima.jp",
"kaita.hiroshima.jp",
"kui.hiroshima.jp",
"kumano.hiroshima.jp",
"kure.hiroshima.jp",
"mihara.hiroshima.jp",
"miyoshi.hiroshima.jp",
"naka.hiroshima.jp",
"onomichi.hiroshima.jp",
"osakikamijima.hiroshima.jp",
"otake.hiroshima.jp",
"saka.hiroshima.jp",
"sera.hiroshima.jp",
"seranishi.hiroshima.jp",
"shinichi.hiroshima.jp",
"shobara.hiroshima.jp",
"takehara.hiroshima.jp",
"abashiri.hokkaido.jp",
"abira.hokkaido.jp",
"aibetsu.hokkaido.jp",
"akabira.hokkaido.jp",
"akkeshi.hokkaido.jp",
"asahikawa.hokkaido.jp",
"ashibetsu.hokkaido.jp",
"ashoro.hokkaido.jp",
"assabu.hokkaido.jp",
"atsuma.hokkaido.jp",
"bibai.hokkaido.jp",
"biei.hokkaido.jp",
"bifuka.hokkaido.jp",
"bihoro.hokkaido.jp",
"biratori.hokkaido.jp",
"chippubetsu.hokkaido.jp",
"chitose.hokkaido.jp",
"date.hokkaido.jp",
"ebetsu.hokkaido.jp",
"embetsu.hokkaido.jp",
"eniwa.hokkaido.jp",
"erimo.hokkaido.jp",
"esan.hokkaido.jp",
"esashi.hokkaido.jp",
"fukagawa.hokkaido.jp",
"fukushima.hokkaido.jp",
"furano.hokkaido.jp",
"furubira.hokkaido.jp",
"haboro.hokkaido.jp",
"hakodate.hokkaido.jp",
"hamatonbetsu.hokkaido.jp",
"hidaka.hokkaido.jp",
"higashikagura.hokkaido.jp",
"higashikawa.hokkaido.jp",
"hiroo.hokkaido.jp",
"hokuryu.hokkaido.jp",
"hokuto.hokkaido.jp",
"honbetsu.hokkaido.jp",
"horokanai.hokkaido.jp",
"horonobe.hokkaido.jp",
"ikeda.hokkaido.jp",
"imakane.hokkaido.jp",
"ishikari.hokkaido.jp",
"iwamizawa.hokkaido.jp",
"iwanai.hokkaido.jp",
"kamifurano.hokkaido.jp",
"kamikawa.hokkaido.jp",
"kamishihoro.hokkaido.jp",
"kamisunagawa.hokkaido.jp",
"kamoenai.hokkaido.jp",
"kayabe.hokkaido.jp",
"kembuchi.hokkaido.jp",
"kikonai.hokkaido.jp",
"kimobetsu.hokkaido.jp",
"kitahiroshima.hokkaido.jp",
"kitami.hokkaido.jp",
"kiyosato.hokkaido.jp",
"koshimizu.hokkaido.jp",
"kunneppu.hokkaido.jp",
"kuriyama.hokkaido.jp",
"kuromatsunai.hokkaido.jp",
"kushiro.hokkaido.jp",
"kutchan.hokkaido.jp",
"kyowa.hokkaido.jp",
"mashike.hokkaido.jp",
"matsumae.hokkaido.jp",
"mikasa.hokkaido.jp",
"minamifurano.hokkaido.jp",
"mombetsu.hokkaido.jp",
"moseushi.hokkaido.jp",
"mukawa.hokkaido.jp",
"muroran.hokkaido.jp",
"naie.hokkaido.jp",
"nakagawa.hokkaido.jp",
"nakasatsunai.hokkaido.jp",
"nakatombetsu.hokkaido.jp",
"nanae.hokkaido.jp",
"nanporo.hokkaido.jp",
"nayoro.hokkaido.jp",
"nemuro.hokkaido.jp",
"niikappu.hokkaido.jp",
"niki.hokkaido.jp",
"nishiokoppe.hokkaido.jp",
"noboribetsu.hokkaido.jp",
"numata.hokkaido.jp",
"obihiro.hokkaido.jp",
"obira.hokkaido.jp",
"oketo.hokkaido.jp",
"okoppe.hokkaido.jp",
"otaru.hokkaido.jp",
"otobe.hokkaido.jp",
"otofuke.hokkaido.jp",
"otoineppu.hokkaido.jp",
"oumu.hokkaido.jp",
"ozora.hokkaido.jp",
"pippu.hokkaido.jp",
"rankoshi.hokkaido.jp",
"rebun.hokkaido.jp",
"rikubetsu.hokkaido.jp",
"rishiri.hokkaido.jp",
"rishirifuji.hokkaido.jp",
"saroma.hokkaido.jp",
"sarufutsu.hokkaido.jp",
"shakotan.hokkaido.jp",
"shari.hokkaido.jp",
"shibecha.hokkaido.jp",
"shibetsu.hokkaido.jp",
"shikabe.hokkaido.jp",
"shikaoi.hokkaido.jp",
"shimamaki.hokkaido.jp",
"shimizu.hokkaido.jp",
"shimokawa.hokkaido.jp",
"shinshinotsu.hokkaido.jp",
"shintoku.hokkaido.jp",
"shiranuka.hokkaido.jp",
"shiraoi.hokkaido.jp",
"shiriuchi.hokkaido.jp",
"sobetsu.hokkaido.jp",
"sunagawa.hokkaido.jp",
"taiki.hokkaido.jp",
"takasu.hokkaido.jp",
"takikawa.hokkaido.jp",
"takinoue.hokkaido.jp",
"teshikaga.hokkaido.jp",
"tobetsu.hokkaido.jp",
"tohma.hokkaido.jp",
"tomakomai.hokkaido.jp",
"tomari.hokkaido.jp",
"toya.hokkaido.jp",
"toyako.hokkaido.jp",
"toyotomi.hokkaido.jp",
"toyoura.hokkaido.jp",
"tsubetsu.hokkaido.jp",
"tsukigata.hokkaido.jp",
"urakawa.hokkaido.jp",
"urausu.hokkaido.jp",
"uryu.hokkaido.jp",
"utashinai.hokkaido.jp",
"wakkanai.hokkaido.jp",
"wassamu.hokkaido.jp",
"yakumo.hokkaido.jp",
"yoichi.hokkaido.jp",
"aioi.hyogo.jp",
"akashi.hyogo.jp",
"ako.hyogo.jp",
"amagasaki.hyogo.jp",
"aogaki.hyogo.jp",
"asago.hyogo.jp",
"ashiya.hyogo.jp",
"awaji.hyogo.jp",
"fukusaki.hyogo.jp",
"goshiki.hyogo.jp",
"harima.hyogo.jp",
"himeji.hyogo.jp",
"ichikawa.hyogo.jp",
"inagawa.hyogo.jp",
"itami.hyogo.jp",
"kakogawa.hyogo.jp",
"kamigori.hyogo.jp",
"kamikawa.hyogo.jp",
"kasai.hyogo.jp",
"kasuga.hyogo.jp",
"kawanishi.hyogo.jp",
"miki.hyogo.jp",
"minamiawaji.hyogo.jp",
"nishinomiya.hyogo.jp",
"nishiwaki.hyogo.jp",
"ono.hyogo.jp",
"sanda.hyogo.jp",
"sannan.hyogo.jp",
"sasayama.hyogo.jp",
"sayo.hyogo.jp",
"shingu.hyogo.jp",
"shinonsen.hyogo.jp",
"shiso.hyogo.jp",
"sumoto.hyogo.jp",
"taishi.hyogo.jp",
"taka.hyogo.jp",
"takarazuka.hyogo.jp",
"takasago.hyogo.jp",
"takino.hyogo.jp",
"tamba.hyogo.jp",
"tatsuno.hyogo.jp",
"toyooka.hyogo.jp",
"yabu.hyogo.jp",
"yashiro.hyogo.jp",
"yoka.hyogo.jp",
"yokawa.hyogo.jp",
"ami.ibaraki.jp",
"asahi.ibaraki.jp",
"bando.ibaraki.jp",
"chikusei.ibaraki.jp",
"daigo.ibaraki.jp",
"fujishiro.ibaraki.jp",
"hitachi.ibaraki.jp",
"hitachinaka.ibaraki.jp",
"hitachiomiya.ibaraki.jp",
"hitachiota.ibaraki.jp",
"ibaraki.ibaraki.jp",
"ina.ibaraki.jp",
"inashiki.ibaraki.jp",
"itako.ibaraki.jp",
"iwama.ibaraki.jp",
"joso.ibaraki.jp",
"kamisu.ibaraki.jp",
"kasama.ibaraki.jp",
"kashima.ibaraki.jp",
"kasumigaura.ibaraki.jp",
"koga.ibaraki.jp",
"miho.ibaraki.jp",
"mito.ibaraki.jp",
"moriya.ibaraki.jp",
"naka.ibaraki.jp",
"namegata.ibaraki.jp",
"oarai.ibaraki.jp",
"ogawa.ibaraki.jp",
"omitama.ibaraki.jp",
"ryugasaki.ibaraki.jp",
"sakai.ibaraki.jp",
"sakuragawa.ibaraki.jp",
"shimodate.ibaraki.jp",
"shimotsuma.ibaraki.jp",
"shirosato.ibaraki.jp",
"sowa.ibaraki.jp",
"suifu.ibaraki.jp",
"takahagi.ibaraki.jp",
"tamatsukuri.ibaraki.jp",
"tokai.ibaraki.jp",
"tomobe.ibaraki.jp",
"tone.ibaraki.jp",
"toride.ibaraki.jp",
"tsuchiura.ibaraki.jp",
"tsukuba.ibaraki.jp",
"uchihara.ibaraki.jp",
"ushiku.ibaraki.jp",
"yachiyo.ibaraki.jp",
"yamagata.ibaraki.jp",
"yawara.ibaraki.jp",
"yuki.ibaraki.jp",
"anamizu.ishikawa.jp",
"hakui.ishikawa.jp",
"hakusan.ishikawa.jp",
"kaga.ishikawa.jp",
"kahoku.ishikawa.jp",
"kanazawa.ishikawa.jp",
"kawakita.ishikawa.jp",
"komatsu.ishikawa.jp",
"nakanoto.ishikawa.jp",
"nanao.ishikawa.jp",
"nomi.ishikawa.jp",
"nonoichi.ishikawa.jp",
"noto.ishikawa.jp",
"shika.ishikawa.jp",
"suzu.ishikawa.jp",
"tsubata.ishikawa.jp",
"tsurugi.ishikawa.jp",
"uchinada.ishikawa.jp",
"wajima.ishikawa.jp",
"fudai.iwate.jp",
"fujisawa.iwate.jp",
"hanamaki.iwate.jp",
"hiraizumi.iwate.jp",
"hirono.iwate.jp",
"ichinohe.iwate.jp",
"ichinoseki.iwate.jp",
"iwaizumi.iwate.jp",
"iwate.iwate.jp",
"joboji.iwate.jp",
"kamaishi.iwate.jp",
"kanegasaki.iwate.jp",
"karumai.iwate.jp",
"kawai.iwate.jp",
"kitakami.iwate.jp",
"kuji.iwate.jp",
"kunohe.iwate.jp",
"kuzumaki.iwate.jp",
"miyako.iwate.jp",
"mizusawa.iwate.jp",
"morioka.iwate.jp",
"ninohe.iwate.jp",
"noda.iwate.jp",
"ofunato.iwate.jp",
"oshu.iwate.jp",
"otsuchi.iwate.jp",
"rikuzentakata.iwate.jp",
"shiwa.iwate.jp",
"shizukuishi.iwate.jp",
"sumita.iwate.jp",
"tanohata.iwate.jp",
"tono.iwate.jp",
"yahaba.iwate.jp",
"yamada.iwate.jp",
"ayagawa.kagawa.jp",
"higashikagawa.kagawa.jp",
"kanonji.kagawa.jp",
"kotohira.kagawa.jp",
"manno.kagawa.jp",
"marugame.kagawa.jp",
"mitoyo.kagawa.jp",
"naoshima.kagawa.jp",
"sanuki.kagawa.jp",
"tadotsu.kagawa.jp",
"takamatsu.kagawa.jp",
"tonosho.kagawa.jp",
"uchinomi.kagawa.jp",
"utazu.kagawa.jp",
"zentsuji.kagawa.jp",
"akune.kagoshima.jp",
"amami.kagoshima.jp",
"hioki.kagoshima.jp",
"isa.kagoshima.jp",
"isen.kagoshima.jp",
"izumi.kagoshima.jp",
"kagoshima.kagoshima.jp",
"kanoya.kagoshima.jp",
"kawanabe.kagoshima.jp",
"kinko.kagoshima.jp",
"kouyama.kagoshima.jp",
"makurazaki.kagoshima.jp",
"matsumoto.kagoshima.jp",
"minamitane.kagoshima.jp",
"nakatane.kagoshima.jp",
"nishinoomote.kagoshima.jp",
"satsumasendai.kagoshima.jp",
"soo.kagoshima.jp",
"tarumizu.kagoshima.jp",
"yusui.kagoshima.jp",
"aikawa.kanagawa.jp",
"atsugi.kanagawa.jp",
"ayase.kanagawa.jp",
"chigasaki.kanagawa.jp",
"ebina.kanagawa.jp",
"fujisawa.kanagawa.jp",
"hadano.kanagawa.jp",
"hakone.kanagawa.jp",
"hiratsuka.kanagawa.jp",
"isehara.kanagawa.jp",
"kaisei.kanagawa.jp",
"kamakura.kanagawa.jp",
"kiyokawa.kanagawa.jp",
"matsuda.kanagawa.jp",
"minamiashigara.kanagawa.jp",
"miura.kanagawa.jp",
"nakai.kanagawa.jp",
"ninomiya.kanagawa.jp",
"odawara.kanagawa.jp",
"oi.kanagawa.jp",
"oiso.kanagawa.jp",
"sagamihara.kanagawa.jp",
"samukawa.kanagawa.jp",
"tsukui.kanagawa.jp",
"yamakita.kanagawa.jp",
"yamato.kanagawa.jp",
"yokosuka.kanagawa.jp",
"yugawara.kanagawa.jp",
"zama.kanagawa.jp",
"zushi.kanagawa.jp",
"aki.kochi.jp",
"geisei.kochi.jp",
"hidaka.kochi.jp",
"higashitsuno.kochi.jp",
"ino.kochi.jp",
"kagami.kochi.jp",
"kami.kochi.jp",
"kitagawa.kochi.jp",
"kochi.kochi.jp",
"mihara.kochi.jp",
"motoyama.kochi.jp",
"muroto.kochi.jp",
"nahari.kochi.jp",
"nakamura.kochi.jp",
"nankoku.kochi.jp",
"nishitosa.kochi.jp",
"niyodogawa.kochi.jp",
"ochi.kochi.jp",
"okawa.kochi.jp",
"otoyo.kochi.jp",
"otsuki.kochi.jp",
"sakawa.kochi.jp",
"sukumo.kochi.jp",
"susaki.kochi.jp",
"tosa.kochi.jp",
"tosashimizu.kochi.jp",
"toyo.kochi.jp",
"tsuno.kochi.jp",
"umaji.kochi.jp",
"yasuda.kochi.jp",
"yusuhara.kochi.jp",
"amakusa.kumamoto.jp",
"arao.kumamoto.jp",
"aso.kumamoto.jp",
"choyo.kumamoto.jp",
"gyokuto.kumamoto.jp",
"kamiamakusa.kumamoto.jp",
"kikuchi.kumamoto.jp",
"kumamoto.kumamoto.jp",
"mashiki.kumamoto.jp",
"mifune.kumamoto.jp",
"minamata.kumamoto.jp",
"minamioguni.kumamoto.jp",
"nagasu.kumamoto.jp",
"nishihara.kumamoto.jp",
"oguni.kumamoto.jp",
"ozu.kumamoto.jp",
"sumoto.kumamoto.jp",
"takamori.kumamoto.jp",
"uki.kumamoto.jp",
"uto.kumamoto.jp",
"yamaga.kumamoto.jp",
"yamato.kumamoto.jp",
"yatsushiro.kumamoto.jp",
"ayabe.kyoto.jp",
"fukuchiyama.kyoto.jp",
"higashiyama.kyoto.jp",
"ide.kyoto.jp",
"ine.kyoto.jp",
"joyo.kyoto.jp",
"kameoka.kyoto.jp",
"kamo.kyoto.jp",
"kita.kyoto.jp",
"kizu.kyoto.jp",
"kumiyama.kyoto.jp",
"kyotamba.kyoto.jp",
"kyotanabe.kyoto.jp",
"kyotango.kyoto.jp",
"maizuru.kyoto.jp",
"minami.kyoto.jp",
"minamiyamashiro.kyoto.jp",
"miyazu.kyoto.jp",
"muko.kyoto.jp",
"nagaokakyo.kyoto.jp",
"nakagyo.kyoto.jp",
"nantan.kyoto.jp",
"oyamazaki.kyoto.jp",
"sakyo.kyoto.jp",
"seika.kyoto.jp",
"tanabe.kyoto.jp",
"uji.kyoto.jp",
"ujitawara.kyoto.jp",
"wazuka.kyoto.jp",
"yamashina.kyoto.jp",
"yawata.kyoto.jp",
"asahi.mie.jp",
"inabe.mie.jp",
"ise.mie.jp",
"kameyama.mie.jp",
"kawagoe.mie.jp",
"kiho.mie.jp",
"kisosaki.mie.jp",
"kiwa.mie.jp",
"komono.mie.jp",
"kumano.mie.jp",
"kuwana.mie.jp",
"matsusaka.mie.jp",
"meiwa.mie.jp",
"mihama.mie.jp",
"minamiise.mie.jp",
"misugi.mie.jp",
"miyama.mie.jp",
"nabari.mie.jp",
"shima.mie.jp",
"suzuka.mie.jp",
"tado.mie.jp",
"taiki.mie.jp",
"taki.mie.jp",
"tamaki.mie.jp",
"toba.mie.jp",
"tsu.mie.jp",
"udono.mie.jp",
"ureshino.mie.jp",
"watarai.mie.jp",
"yokkaichi.mie.jp",
"furukawa.miyagi.jp",
"higashimatsushima.miyagi.jp",
"ishinomaki.miyagi.jp",
"iwanuma.miyagi.jp",
"kakuda.miyagi.jp",
"kami.miyagi.jp",
"kawasaki.miyagi.jp",
"marumori.miyagi.jp",
"matsushima.miyagi.jp",
"minamisanriku.miyagi.jp",
"misato.miyagi.jp",
"murata.miyagi.jp",
"natori.miyagi.jp",
"ogawara.miyagi.jp",
"ohira.miyagi.jp",
"onagawa.miyagi.jp",
"osaki.miyagi.jp",
"rifu.miyagi.jp",
"semine.miyagi.jp",
"shibata.miyagi.jp",
"shichikashuku.miyagi.jp",
"shikama.miyagi.jp",
"shiogama.miyagi.jp",
"shiroishi.miyagi.jp",
"tagajo.miyagi.jp",
"taiwa.miyagi.jp",
"tome.miyagi.jp",
"tomiya.miyagi.jp",
"wakuya.miyagi.jp",
"watari.miyagi.jp",
"yamamoto.miyagi.jp",
"zao.miyagi.jp",
"aya.miyazaki.jp",
"ebino.miyazaki.jp",
"gokase.miyazaki.jp",
"hyuga.miyazaki.jp",
"kadogawa.miyazaki.jp",
"kawaminami.miyazaki.jp",
"kijo.miyazaki.jp",
"kitagawa.miyazaki.jp",
"kitakata.miyazaki.jp",
"kitaura.miyazaki.jp",
"kobayashi.miyazaki.jp",
"kunitomi.miyazaki.jp",
"kushima.miyazaki.jp",
"mimata.miyazaki.jp",
"miyakonojo.miyazaki.jp",
"miyazaki.miyazaki.jp",
"morotsuka.miyazaki.jp",
"nichinan.miyazaki.jp",
"nishimera.miyazaki.jp",
"nobeoka.miyazaki.jp",
"saito.miyazaki.jp",
"shiiba.miyazaki.jp",
"shintomi.miyazaki.jp",
"takaharu.miyazaki.jp",
"takanabe.miyazaki.jp",
"takazaki.miyazaki.jp",
"tsuno.miyazaki.jp",
"achi.nagano.jp",
"agematsu.nagano.jp",
"anan.nagano.jp",
"aoki.nagano.jp",
"asahi.nagano.jp",
"azumino.nagano.jp",
"chikuhoku.nagano.jp",
"chikuma.nagano.jp",
"chino.nagano.jp",
"fujimi.nagano.jp",
"hakuba.nagano.jp",
"hara.nagano.jp",
"hiraya.nagano.jp",
"iida.nagano.jp",
"iijima.nagano.jp",
"iiyama.nagano.jp",
"iizuna.nagano.jp",
"ikeda.nagano.jp",
"ikusaka.nagano.jp",
"ina.nagano.jp",
"karuizawa.nagano.jp",
"kawakami.nagano.jp",
"kiso.nagano.jp",
"kisofukushima.nagano.jp",
"kitaaiki.nagano.jp",
"komagane.nagano.jp",
"komoro.nagano.jp",
"matsukawa.nagano.jp",
"matsumoto.nagano.jp",
"miasa.nagano.jp",
"minamiaiki.nagano.jp",
"minamimaki.nagano.jp",
"minamiminowa.nagano.jp",
"minowa.nagano.jp",
"miyada.nagano.jp",
"miyota.nagano.jp",
"mochizuki.nagano.jp",
"nagano.nagano.jp",
"nagawa.nagano.jp",
"nagiso.nagano.jp",
"nakagawa.nagano.jp",
"nakano.nagano.jp",
"nozawaonsen.nagano.jp",
"obuse.nagano.jp",
"ogawa.nagano.jp",
"okaya.nagano.jp",
"omachi.nagano.jp",
"omi.nagano.jp",
"ookuwa.nagano.jp",
"ooshika.nagano.jp",
"otaki.nagano.jp",
"otari.nagano.jp",
"sakae.nagano.jp",
"sakaki.nagano.jp",
"saku.nagano.jp",
"sakuho.nagano.jp",
"shimosuwa.nagano.jp",
"shinanomachi.nagano.jp",
"shiojiri.nagano.jp",
"suwa.nagano.jp",
"suzaka.nagano.jp",
"takagi.nagano.jp",
"takamori.nagano.jp",
"takayama.nagano.jp",
"tateshina.nagano.jp",
"tatsuno.nagano.jp",
"togakushi.nagano.jp",
"togura.nagano.jp",
"tomi.nagano.jp",
"ueda.nagano.jp",
"wada.nagano.jp",
"yamagata.nagano.jp",
"yamanouchi.nagano.jp",
"yasaka.nagano.jp",
"yasuoka.nagano.jp",
"chijiwa.nagasaki.jp",
"futsu.nagasaki.jp",
"goto.nagasaki.jp",
"hasami.nagasaki.jp",
"hirado.nagasaki.jp",
"iki.nagasaki.jp",
"isahaya.nagasaki.jp",
"kawatana.nagasaki.jp",
"kuchinotsu.nagasaki.jp",
"matsuura.nagasaki.jp",
"nagasaki.nagasaki.jp",
"obama.nagasaki.jp",
"omura.nagasaki.jp",
"oseto.nagasaki.jp",
"saikai.nagasaki.jp",
"sasebo.nagasaki.jp",
"seihi.nagasaki.jp",
"shimabara.nagasaki.jp",
"shinkamigoto.nagasaki.jp",
"togitsu.nagasaki.jp",
"tsushima.nagasaki.jp",
"unzen.nagasaki.jp",
"ando.nara.jp",
"gose.nara.jp",
"heguri.nara.jp",
"higashiyoshino.nara.jp",
"ikaruga.nara.jp",
"ikoma.nara.jp",
"kamikitayama.nara.jp",
"kanmaki.nara.jp",
"kashiba.nara.jp",
"kashihara.nara.jp",
"katsuragi.nara.jp",
"kawai.nara.jp",
"kawakami.nara.jp",
"kawanishi.nara.jp",
"koryo.nara.jp",
"kurotaki.nara.jp",
"mitsue.nara.jp",
"miyake.nara.jp",
"nara.nara.jp",
"nosegawa.nara.jp",
"oji.nara.jp",
"ouda.nara.jp",
"oyodo.nara.jp",
"sakurai.nara.jp",
"sango.nara.jp",
"shimoichi.nara.jp",
"shimokitayama.nara.jp",
"shinjo.nara.jp",
"soni.nara.jp",
"takatori.nara.jp",
"tawaramoto.nara.jp",
"tenkawa.nara.jp",
"tenri.nara.jp",
"uda.nara.jp",
"yamatokoriyama.nara.jp",
"yamatotakada.nara.jp",
"yamazoe.nara.jp",
"yoshino.nara.jp",
"aga.niigata.jp",
"agano.niigata.jp",
"gosen.niigata.jp",
"itoigawa.niigata.jp",
"izumozaki.niigata.jp",
"joetsu.niigata.jp",
"kamo.niigata.jp",
"kariwa.niigata.jp",
"kashiwazaki.niigata.jp",
"minamiuonuma.niigata.jp",
"mitsuke.niigata.jp",
"muika.niigata.jp",
"murakami.niigata.jp",
"myoko.niigata.jp",
"nagaoka.niigata.jp",
"niigata.niigata.jp",
"ojiya.niigata.jp",
"omi.niigata.jp",
"sado.niigata.jp",
"sanjo.niigata.jp",
"seiro.niigata.jp",
"seirou.niigata.jp",
"sekikawa.niigata.jp",
"shibata.niigata.jp",
"tagami.niigata.jp",
"tainai.niigata.jp",
"tochio.niigata.jp",
"tokamachi.niigata.jp",
"tsubame.niigata.jp",
"tsunan.niigata.jp",
"uonuma.niigata.jp",
"yahiko.niigata.jp",
"yoita.niigata.jp",
"yuzawa.niigata.jp",
"beppu.oita.jp",
"bungoono.oita.jp",
"bungotakada.oita.jp",
"hasama.oita.jp",
"hiji.oita.jp",
"himeshima.oita.jp",
"hita.oita.jp",
"kamitsue.oita.jp",
"kokonoe.oita.jp",
"kuju.oita.jp",
"kunisaki.oita.jp",
"kusu.oita.jp",
"oita.oita.jp",
"saiki.oita.jp",
"taketa.oita.jp",
"tsukumi.oita.jp",
"usa.oita.jp",
"usuki.oita.jp",
"yufu.oita.jp",
"akaiwa.okayama.jp",
"asakuchi.okayama.jp",
"bizen.okayama.jp",
"hayashima.okayama.jp",
"ibara.okayama.jp",
"kagamino.okayama.jp",
"kasaoka.okayama.jp",
"kibichuo.okayama.jp",
"kumenan.okayama.jp",
"kurashiki.okayama.jp",
"maniwa.okayama.jp",
"misaki.okayama.jp",
"nagi.okayama.jp",
"niimi.okayama.jp",
"nishiawakura.okayama.jp",
"okayama.okayama.jp",
"satosho.okayama.jp",
"setouchi.okayama.jp",
"shinjo.okayama.jp",
"shoo.okayama.jp",
"soja.okayama.jp",
"takahashi.okayama.jp",
"tamano.okayama.jp",
"tsuyama.okayama.jp",
"wake.okayama.jp",
"yakage.okayama.jp",
"aguni.okinawa.jp",
"ginowan.okinawa.jp",
"ginoza.okinawa.jp",
"gushikami.okinawa.jp",
"haebaru.okinawa.jp",
"higashi.okinawa.jp",
"hirara.okinawa.jp",
"iheya.okinawa.jp",
"ishigaki.okinawa.jp",
"ishikawa.okinawa.jp",
"itoman.okinawa.jp",
"izena.okinawa.jp",
"kadena.okinawa.jp",
"kin.okinawa.jp",
"kitadaito.okinawa.jp",
"kitanakagusuku.okinawa.jp",
"kumejima.okinawa.jp",
"kunigami.okinawa.jp",
"minamidaito.okinawa.jp",
"motobu.okinawa.jp",
"nago.okinawa.jp",
"naha.okinawa.jp",
"nakagusuku.okinawa.jp",
"nakijin.okinawa.jp",
"nanjo.okinawa.jp",
"nishihara.okinawa.jp",
"ogimi.okinawa.jp",
"okinawa.okinawa.jp",
"onna.okinawa.jp",
"shimoji.okinawa.jp",
"taketomi.okinawa.jp",
"tarama.okinawa.jp",
"tokashiki.okinawa.jp",
"tomigusuku.okinawa.jp",
"tonaki.okinawa.jp",
"urasoe.okinawa.jp",
"uruma.okinawa.jp",
"yaese.okinawa.jp",
"yomitan.okinawa.jp",
"yonabaru.okinawa.jp",
"yonaguni.okinawa.jp",
"zamami.okinawa.jp",
"abeno.osaka.jp",
"chihayaakasaka.osaka.jp",
"chuo.osaka.jp",
"daito.osaka.jp",
"fujiidera.osaka.jp",
"habikino.osaka.jp",
"hannan.osaka.jp",
"higashiosaka.osaka.jp",
"higashisumiyoshi.osaka.jp",
"higashiyodogawa.osaka.jp",
"hirakata.osaka.jp",
"ibaraki.osaka.jp",
"ikeda.osaka.jp",
"izumi.osaka.jp",
"izumiotsu.osaka.jp",
"izumisano.osaka.jp",
"kadoma.osaka.jp",
"kaizuka.osaka.jp",
"kanan.osaka.jp",
"kashiwara.osaka.jp",
"katano.osaka.jp",
"kawachinagano.osaka.jp",
"kishiwada.osaka.jp",
"kita.osaka.jp",
"kumatori.osaka.jp",
"matsubara.osaka.jp",
"minato.osaka.jp",
"minoh.osaka.jp",
"misaki.osaka.jp",
"moriguchi.osaka.jp",
"neyagawa.osaka.jp",
"nishi.osaka.jp",
"nose.osaka.jp",
"osakasayama.osaka.jp",
"sakai.osaka.jp",
"sayama.osaka.jp",
"sennan.osaka.jp",
"settsu.osaka.jp",
"shijonawate.osaka.jp",
"shimamoto.osaka.jp",
"suita.osaka.jp",
"tadaoka.osaka.jp",
"taishi.osaka.jp",
"tajiri.osaka.jp",
"takaishi.osaka.jp",
"takatsuki.osaka.jp",
"tondabayashi.osaka.jp",
"toyonaka.osaka.jp",
"toyono.osaka.jp",
"yao.osaka.jp",
"ariake.saga.jp",
"arita.saga.jp",
"fukudomi.saga.jp",
"genkai.saga.jp",
"hamatama.saga.jp",
"hizen.saga.jp",
"imari.saga.jp",
"kamimine.saga.jp",
"kanzaki.saga.jp",
"karatsu.saga.jp",
"kashima.saga.jp",
"kitagata.saga.jp",
"kitahata.saga.jp",
"kiyama.saga.jp",
"kouhoku.saga.jp",
"kyuragi.saga.jp",
"nishiarita.saga.jp",
"ogi.saga.jp",
"omachi.saga.jp",
"ouchi.saga.jp",
"saga.saga.jp",
"shiroishi.saga.jp",
"taku.saga.jp",
"tara.saga.jp",
"tosu.saga.jp",
"yoshinogari.saga.jp",
"arakawa.saitama.jp",
"asaka.saitama.jp",
"chichibu.saitama.jp",
"fujimi.saitama.jp",
"fujimino.saitama.jp",
"fukaya.saitama.jp",
"hanno.saitama.jp",
"hanyu.saitama.jp",
"hasuda.saitama.jp",
"hatogaya.saitama.jp",
"hatoyama.saitama.jp",
"hidaka.saitama.jp",
"higashichichibu.saitama.jp",
"higashimatsuyama.saitama.jp",
"honjo.saitama.jp",
"ina.saitama.jp",
"iruma.saitama.jp",
"iwatsuki.saitama.jp",
"kamiizumi.saitama.jp",
"kamikawa.saitama.jp",
"kamisato.saitama.jp",
"kasukabe.saitama.jp",
"kawagoe.saitama.jp",
"kawaguchi.saitama.jp",
"kawajima.saitama.jp",
"kazo.saitama.jp",
"kitamoto.saitama.jp",
"koshigaya.saitama.jp",
"kounosu.saitama.jp",
"kuki.saitama.jp",
"kumagaya.saitama.jp",
"matsubushi.saitama.jp",
"minano.saitama.jp",
"misato.saitama.jp",
"miyashiro.saitama.jp",
"miyoshi.saitama.jp",
"moroyama.saitama.jp",
"nagatoro.saitama.jp",
"namegawa.saitama.jp",
"niiza.saitama.jp",
"ogano.saitama.jp",
"ogawa.saitama.jp",
"ogose.saitama.jp",
"okegawa.saitama.jp",
"omiya.saitama.jp",
"otaki.saitama.jp",
"ranzan.saitama.jp",
"ryokami.saitama.jp",
"saitama.saitama.jp",
"sakado.saitama.jp",
"satte.saitama.jp",
"sayama.saitama.jp",
"shiki.saitama.jp",
"shiraoka.saitama.jp",
"soka.saitama.jp",
"sugito.saitama.jp",
"toda.saitama.jp",
"tokigawa.saitama.jp",
"tokorozawa.saitama.jp",
"tsurugashima.saitama.jp",
"urawa.saitama.jp",
"warabi.saitama.jp",
"yashio.saitama.jp",
"yokoze.saitama.jp",
"yono.saitama.jp",
"yorii.saitama.jp",
"yoshida.saitama.jp",
"yoshikawa.saitama.jp",
"yoshimi.saitama.jp",
"aisho.shiga.jp",
"gamo.shiga.jp",
"higashiomi.shiga.jp",
"hikone.shiga.jp",
"koka.shiga.jp",
"konan.shiga.jp",
"kosei.shiga.jp",
"koto.shiga.jp",
"kusatsu.shiga.jp",
"maibara.shiga.jp",
"moriyama.shiga.jp",
"nagahama.shiga.jp",
"nishiazai.shiga.jp",
"notogawa.shiga.jp",
"omihachiman.shiga.jp",
"otsu.shiga.jp",
"ritto.shiga.jp",
"ryuoh.shiga.jp",
"takashima.shiga.jp",
"takatsuki.shiga.jp",
"torahime.shiga.jp",
"toyosato.shiga.jp",
"yasu.shiga.jp",
"akagi.shimane.jp",
"ama.shimane.jp",
"gotsu.shimane.jp",
"hamada.shimane.jp",
"higashiizumo.shimane.jp",
"hikawa.shimane.jp",
"hikimi.shimane.jp",
"izumo.shimane.jp",
"kakinoki.shimane.jp",
"masuda.shimane.jp",
"matsue.shimane.jp",
"misato.shimane.jp",
"nishinoshima.shimane.jp",
"ohda.shimane.jp",
"okinoshima.shimane.jp",
"okuizumo.shimane.jp",
"shimane.shimane.jp",
"tamayu.shimane.jp",
"tsuwano.shimane.jp",
"unnan.shimane.jp",
"yakumo.shimane.jp",
"yasugi.shimane.jp",
"yatsuka.shimane.jp",
"arai.shizuoka.jp",
"atami.shizuoka.jp",
"fuji.shizuoka.jp",
"fujieda.shizuoka.jp",
"fujikawa.shizuoka.jp",
"fujinomiya.shizuoka.jp",
"fukuroi.shizuoka.jp",
"gotemba.shizuoka.jp",
"haibara.shizuoka.jp",
"hamamatsu.shizuoka.jp",
"higashiizu.shizuoka.jp",
"ito.shizuoka.jp",
"iwata.shizuoka.jp",
"izu.shizuoka.jp",
"izunokuni.shizuoka.jp",
"kakegawa.shizuoka.jp",
"kannami.shizuoka.jp",
"kawanehon.shizuoka.jp",
"kawazu.shizuoka.jp",
"kikugawa.shizuoka.jp",
"kosai.shizuoka.jp",
"makinohara.shizuoka.jp",
"matsuzaki.shizuoka.jp",
"minamiizu.shizuoka.jp",
"mishima.shizuoka.jp",
"morimachi.shizuoka.jp",
"nishiizu.shizuoka.jp",
"numazu.shizuoka.jp",
"omaezaki.shizuoka.jp",
"shimada.shizuoka.jp",
"shimizu.shizuoka.jp",
"shimoda.shizuoka.jp",
"shizuoka.shizuoka.jp",
"susono.shizuoka.jp",
"yaizu.shizuoka.jp",
"yoshida.shizuoka.jp",
"ashikaga.tochigi.jp",
"bato.tochigi.jp",
"haga.tochigi.jp",
"ichikai.tochigi.jp",
"iwafune.tochigi.jp",
"kaminokawa.tochigi.jp",
"kanuma.tochigi.jp",
"karasuyama.tochigi.jp",
"kuroiso.tochigi.jp",
"mashiko.tochigi.jp",
"mibu.tochigi.jp",
"moka.tochigi.jp",
"motegi.tochigi.jp",
"nasu.tochigi.jp",
"nasushiobara.tochigi.jp",
"nikko.tochigi.jp",
"nishikata.tochigi.jp",
"nogi.tochigi.jp",
"ohira.tochigi.jp",
"ohtawara.tochigi.jp",
"oyama.tochigi.jp",
"sakura.tochigi.jp",
"sano.tochigi.jp",
"shimotsuke.tochigi.jp",
"shioya.tochigi.jp",
"takanezawa.tochigi.jp",
"tochigi.tochigi.jp",
"tsuga.tochigi.jp",
"ujiie.tochigi.jp",
"utsunomiya.tochigi.jp",
"yaita.tochigi.jp",
"aizumi.tokushima.jp",
"anan.tokushima.jp",
"ichiba.tokushima.jp",
"itano.tokushima.jp",
"kainan.tokushima.jp",
"komatsushima.tokushima.jp",
"matsushige.tokushima.jp",
"mima.tokushima.jp",
"minami.tokushima.jp",
"miyoshi.tokushima.jp",
"mugi.tokushima.jp",
"nakagawa.tokushima.jp",
"naruto.tokushima.jp",
"sanagochi.tokushima.jp",
"shishikui.tokushima.jp",
"tokushima.tokushima.jp",
"wajiki.tokushima.jp",
"adachi.tokyo.jp",
"akiruno.tokyo.jp",
"akishima.tokyo.jp",
"aogashima.tokyo.jp",
"arakawa.tokyo.jp",
"bunkyo.tokyo.jp",
"chiyoda.tokyo.jp",
"chofu.tokyo.jp",
"chuo.tokyo.jp",
"edogawa.tokyo.jp",
"fuchu.tokyo.jp",
"fussa.tokyo.jp",
"hachijo.tokyo.jp",
"hachioji.tokyo.jp",
"hamura.tokyo.jp",
"higashikurume.tokyo.jp",
"higashimurayama.tokyo.jp",
"higashiyamato.tokyo.jp",
"hino.tokyo.jp",
"hinode.tokyo.jp",
"hinohara.tokyo.jp",
"inagi.tokyo.jp",
"itabashi.tokyo.jp",
"katsushika.tokyo.jp",
"kita.tokyo.jp",
"kiyose.tokyo.jp",
"kodaira.tokyo.jp",
"koganei.tokyo.jp",
"kokubunji.tokyo.jp",
"komae.tokyo.jp",
"koto.tokyo.jp",
"kouzushima.tokyo.jp",
"kunitachi.tokyo.jp",
"machida.tokyo.jp",
"meguro.tokyo.jp",
"minato.tokyo.jp",
"mitaka.tokyo.jp",
"mizuho.tokyo.jp",
"musashimurayama.tokyo.jp",
"musashino.tokyo.jp",
"nakano.tokyo.jp",
"nerima.tokyo.jp",
"ogasawara.tokyo.jp",
"okutama.tokyo.jp",
"ome.tokyo.jp",
"oshima.tokyo.jp",
"ota.tokyo.jp",
"setagaya.tokyo.jp",
"shibuya.tokyo.jp",
"shinagawa.tokyo.jp",
"shinjuku.tokyo.jp",
"suginami.tokyo.jp",
"sumida.tokyo.jp",
"tachikawa.tokyo.jp",
"taito.tokyo.jp",
"tama.tokyo.jp",
"toshima.tokyo.jp",
"chizu.tottori.jp",
"hino.tottori.jp",
"kawahara.tottori.jp",
"koge.tottori.jp",
"kotoura.tottori.jp",
"misasa.tottori.jp",
"nanbu.tottori.jp",
"nichinan.tottori.jp",
"sakaiminato.tottori.jp",
"tottori.tottori.jp",
"wakasa.tottori.jp",
"yazu.tottori.jp",
"yonago.tottori.jp",
"asahi.toyama.jp",
"fuchu.toyama.jp",
"fukumitsu.toyama.jp",
"funahashi.toyama.jp",
"himi.toyama.jp",
"imizu.toyama.jp",
"inami.toyama.jp",
"johana.toyama.jp",
"kamiichi.toyama.jp",
"kurobe.toyama.jp",
"nakaniikawa.toyama.jp",
"namerikawa.toyama.jp",
"nanto.toyama.jp",
"nyuzen.toyama.jp",
"oyabe.toyama.jp",
"taira.toyama.jp",
"takaoka.toyama.jp",
"tateyama.toyama.jp",
"toga.toyama.jp",
"tonami.toyama.jp",
"toyama.toyama.jp",
"unazuki.toyama.jp",
"uozu.toyama.jp",
"yamada.toyama.jp",
"arida.wakayama.jp",
"aridagawa.wakayama.jp",
"gobo.wakayama.jp",
"hashimoto.wakayama.jp",
"hidaka.wakayama.jp",
"hirogawa.wakayama.jp",
"inami.wakayama.jp",
"iwade.wakayama.jp",
"kainan.wakayama.jp",
"kamitonda.wakayama.jp",
"katsuragi.wakayama.jp",
"kimino.wakayama.jp",
"kinokawa.wakayama.jp",
"kitayama.wakayama.jp",
"koya.wakayama.jp",
"koza.wakayama.jp",
"kozagawa.wakayama.jp",
"kudoyama.wakayama.jp",
"kushimoto.wakayama.jp",
"mihama.wakayama.jp",
"misato.wakayama.jp",
"nachikatsuura.wakayama.jp",
"shingu.wakayama.jp",
"shirahama.wakayama.jp",
"taiji.wakayama.jp",
"tanabe.wakayama.jp",
"wakayama.wakayama.jp",
"yuasa.wakayama.jp",
"yura.wakayama.jp",
"asahi.yamagata.jp",
"funagata.yamagata.jp",
"higashine.yamagata.jp",
"iide.yamagata.jp",
"kahoku.yamagata.jp",
"kaminoyama.yamagata.jp",
"kaneyama.yamagata.jp",
"kawanishi.yamagata.jp",
"mamurogawa.yamagata.jp",
"mikawa.yamagata.jp",
"murayama.yamagata.jp",
"nagai.yamagata.jp",
"nakayama.yamagata.jp",
"nanyo.yamagata.jp",
"nishikawa.yamagata.jp",
"obanazawa.yamagata.jp",
"oe.yamagata.jp",
"oguni.yamagata.jp",
"ohkura.yamagata.jp",
"oishida.yamagata.jp",
"sagae.yamagata.jp",
"sakata.yamagata.jp",
"sakegawa.yamagata.jp",
"shinjo.yamagata.jp",
"shirataka.yamagata.jp",
"shonai.yamagata.jp",
"takahata.yamagata.jp",
"tendo.yamagata.jp",
"tozawa.yamagata.jp",
"tsuruoka.yamagata.jp",
"yamagata.yamagata.jp",
"yamanobe.yamagata.jp",
"yonezawa.yamagata.jp",
"yuza.yamagata.jp",
"abu.yamaguchi.jp",
"hagi.yamaguchi.jp",
"hikari.yamaguchi.jp",
"hofu.yamaguchi.jp",
"iwakuni.yamaguchi.jp",
"kudamatsu.yamaguchi.jp",
"mitou.yamaguchi.jp",
"nagato.yamaguchi.jp",
"oshima.yamaguchi.jp",
"shimonoseki.yamaguchi.jp",
"shunan.yamaguchi.jp",
"tabuse.yamaguchi.jp",
"tokuyama.yamaguchi.jp",
"toyota.yamaguchi.jp",
"ube.yamaguchi.jp",
"yuu.yamaguchi.jp",
"chuo.yamanashi.jp",
"doshi.yamanashi.jp",
"fuefuki.yamanashi.jp",
"fujikawa.yamanashi.jp",
"fujikawaguchiko.yamanashi.jp",
"fujiyoshida.yamanashi.jp",
"hayakawa.yamanashi.jp",
"hokuto.yamanashi.jp",
"ichikawamisato.yamanashi.jp",
"kai.yamanashi.jp",
"kofu.yamanashi.jp",
"koshu.yamanashi.jp",
"kosuge.yamanashi.jp",
"minami-alps.yamanashi.jp",
"minobu.yamanashi.jp",
"nakamichi.yamanashi.jp",
"nanbu.yamanashi.jp",
"narusawa.yamanashi.jp",
"nirasaki.yamanashi.jp",
"nishikatsura.yamanashi.jp",
"oshino.yamanashi.jp",
"otsuki.yamanashi.jp",
"showa.yamanashi.jp",
"tabayama.yamanashi.jp",
"tsuru.yamanashi.jp",
"uenohara.yamanashi.jp",
"yamanakako.yamanashi.jp",
"yamanashi.yamanashi.jp",
"ke",
"ac.ke",
"co.ke",
"go.ke",
"info.ke",
"me.ke",
"mobi.ke",
"ne.ke",
"or.ke",
"sc.ke",
"kg",
"org.kg",
"net.kg",
"com.kg",
"edu.kg",
"gov.kg",
"mil.kg",
"*.kh",
"ki",
"edu.ki",
"biz.ki",
"net.ki",
"org.ki",
"gov.ki",
"info.ki",
"com.ki",
"km",
"org.km",
"nom.km",
"gov.km",
"prd.km",
"tm.km",
"edu.km",
"mil.km",
"ass.km",
"com.km",
"coop.km",
"asso.km",
"presse.km",
"medecin.km",
"notaires.km",
"pharmaciens.km",
"veterinaire.km",
"gouv.km",
"kn",
"net.kn",
"org.kn",
"edu.kn",
"gov.kn",
"kp",
"com.kp",
"edu.kp",
"gov.kp",
"org.kp",
"rep.kp",
"tra.kp",
"kr",
"ac.kr",
"co.kr",
"es.kr",
"go.kr",
"hs.kr",
"kg.kr",
"mil.kr",
"ms.kr",
"ne.kr",
"or.kr",
"pe.kr",
"re.kr",
"sc.kr",
"busan.kr",
"chungbuk.kr",
"chungnam.kr",
"daegu.kr",
"daejeon.kr",
"gangwon.kr",
"gwangju.kr",
"gyeongbuk.kr",
"gyeonggi.kr",
"gyeongnam.kr",
"incheon.kr",
"jeju.kr",
"jeonbuk.kr",
"jeonnam.kr",
"seoul.kr",
"ulsan.kr",
"kw",
"com.kw",
"edu.kw",
"emb.kw",
"gov.kw",
"ind.kw",
"net.kw",
"org.kw",
"ky",
"com.ky",
"edu.ky",
"net.ky",
"org.ky",
"kz",
"org.kz",
"edu.kz",
"net.kz",
"gov.kz",
"mil.kz",
"com.kz",
"la",
"int.la",
"net.la",
"info.la",
"edu.la",
"gov.la",
"per.la",
"com.la",
"org.la",
"lb",
"com.lb",
"edu.lb",
"gov.lb",
"net.lb",
"org.lb",
"lc",
"com.lc",
"net.lc",
"co.lc",
"org.lc",
"edu.lc",
"gov.lc",
"li",
"lk",
"gov.lk",
"sch.lk",
"net.lk",
"int.lk",
"com.lk",
"org.lk",
"edu.lk",
"ngo.lk",
"soc.lk",
"web.lk",
"ltd.lk",
"assn.lk",
"grp.lk",
"hotel.lk",
"ac.lk",
"lr",
"com.lr",
"edu.lr",
"gov.lr",
"org.lr",
"net.lr",
"ls",
"ac.ls",
"biz.ls",
"co.ls",
"edu.ls",
"gov.ls",
"info.ls",
"net.ls",
"org.ls",
"sc.ls",
"lt",
"gov.lt",
"lu",
"lv",
"com.lv",
"edu.lv",
"gov.lv",
"org.lv",
"mil.lv",
"id.lv",
"net.lv",
"asn.lv",
"conf.lv",
"ly",
"com.ly",
"net.ly",
"gov.ly",
"plc.ly",
"edu.ly",
"sch.ly",
"med.ly",
"org.ly",
"id.ly",
"ma",
"co.ma",
"net.ma",
"gov.ma",
"org.ma",
"ac.ma",
"press.ma",
"mc",
"tm.mc",
"asso.mc",
"md",
"me",
"co.me",
"net.me",
"org.me",
"edu.me",
"ac.me",
"gov.me",
"its.me",
"priv.me",
"mg",
"org.mg",
"nom.mg",
"gov.mg",
"prd.mg",
"tm.mg",
"edu.mg",
"mil.mg",
"com.mg",
"co.mg",
"mh",
"mil",
"mk",
"com.mk",
"org.mk",
"net.mk",
"edu.mk",
"gov.mk",
"inf.mk",
"name.mk",
"ml",
"com.ml",
"edu.ml",
"gouv.ml",
"gov.ml",
"net.ml",
"org.ml",
"presse.ml",
"*.mm",
"mn",
"gov.mn",
"edu.mn",
"org.mn",
"mo",
"com.mo",
"net.mo",
"org.mo",
"edu.mo",
"gov.mo",
"mobi",
"mp",
"mq",
"mr",
"gov.mr",
"ms",
"com.ms",
"edu.ms",
"gov.ms",
"net.ms",
"org.ms",
"mt",
"com.mt",
"edu.mt",
"net.mt",
"org.mt",
"mu",
"com.mu",
"net.mu",
"org.mu",
"gov.mu",
"ac.mu",
"co.mu",
"or.mu",
"museum",
"academy.museum",
"agriculture.museum",
"air.museum",
"airguard.museum",
"alabama.museum",
"alaska.museum",
"amber.museum",
"ambulance.museum",
"american.museum",
"americana.museum",
"americanantiques.museum",
"americanart.museum",
"amsterdam.museum",
"and.museum",
"annefrank.museum",
"anthro.museum",
"anthropology.museum",
"antiques.museum",
"aquarium.museum",
"arboretum.museum",
"archaeological.museum",
"archaeology.museum",
"architecture.museum",
"art.museum",
"artanddesign.museum",
"artcenter.museum",
"artdeco.museum",
"arteducation.museum",
"artgallery.museum",
"arts.museum",
"artsandcrafts.museum",
"asmatart.museum",
"assassination.museum",
"assisi.museum",
"association.museum",
"astronomy.museum",
"atlanta.museum",
"austin.museum",
"australia.museum",
"automotive.museum",
"aviation.museum",
"axis.museum",
"badajoz.museum",
"baghdad.museum",
"bahn.museum",
"bale.museum",
"baltimore.museum",
"barcelona.museum",
"baseball.museum",
"basel.museum",
"baths.museum",
"bauern.museum",
"beauxarts.museum",
"beeldengeluid.museum",
"bellevue.museum",
"bergbau.museum",
"berkeley.museum",
"berlin.museum",
"bern.museum",
"bible.museum",
"bilbao.museum",
"bill.museum",
"birdart.museum",
"birthplace.museum",
"bonn.museum",
"boston.museum",
"botanical.museum",
"botanicalgarden.museum",
"botanicgarden.museum",
"botany.museum",
"brandywinevalley.museum",
"brasil.museum",
"bristol.museum",
"british.museum",
"britishcolumbia.museum",
"broadcast.museum",
"brunel.museum",
"brussel.museum",
"brussels.museum",
"bruxelles.museum",
"building.museum",
"burghof.museum",
"bus.museum",
"bushey.museum",
"cadaques.museum",
"california.museum",
"cambridge.museum",
"can.museum",
"canada.museum",
"capebreton.museum",
"carrier.museum",
"cartoonart.museum",
"casadelamoneda.museum",
"castle.museum",
"castres.museum",
"celtic.museum",
"center.museum",
"chattanooga.museum",
"cheltenham.museum",
"chesapeakebay.museum",
"chicago.museum",
"children.museum",
"childrens.museum",
"childrensgarden.museum",
"chiropractic.museum",
"chocolate.museum",
"christiansburg.museum",
"cincinnati.museum",
"cinema.museum",
"circus.museum",
"civilisation.museum",
"civilization.museum",
"civilwar.museum",
"clinton.museum",
"clock.museum",
"coal.museum",
"coastaldefence.museum",
"cody.museum",
"coldwar.museum",
"collection.museum",
"colonialwilliamsburg.museum",
"coloradoplateau.museum",
"columbia.museum",
"columbus.museum",
"communication.museum",
"communications.museum",
"community.museum",
"computer.museum",
"computerhistory.museum",
"comunicações.museum",
"contemporary.museum",
"contemporaryart.museum",
"convent.museum",
"copenhagen.museum",
"corporation.museum",
"correios-e-telecomunicações.museum",
"corvette.museum",
"costume.museum",
"countryestate.museum",
"county.museum",
"crafts.museum",
"cranbrook.museum",
"creation.museum",
"cultural.museum",
"culturalcenter.museum",
"culture.museum",
"cyber.museum",
"cymru.museum",
"dali.museum",
"dallas.museum",
"database.museum",
"ddr.museum",
"decorativearts.museum",
"delaware.museum",
"delmenhorst.museum",
"denmark.museum",
"depot.museum",
"design.museum",
"detroit.museum",
"dinosaur.museum",
"discovery.museum",
"dolls.museum",
"donostia.museum",
"durham.museum",
"eastafrica.museum",
"eastcoast.museum",
"education.museum",
"educational.museum",
"egyptian.museum",
"eisenbahn.museum",
"elburg.museum",
"elvendrell.museum",
"embroidery.museum",
"encyclopedic.museum",
"england.museum",
"entomology.museum",
"environment.museum",
"environmentalconservation.museum",
"epilepsy.museum",
"essex.museum",
"estate.museum",
"ethnology.museum",
"exeter.museum",
"exhibition.museum",
"family.museum",
"farm.museum",
"farmequipment.museum",
"farmers.museum",
"farmstead.museum",
"field.museum",
"figueres.museum",
"filatelia.museum",
"film.museum",
"fineart.museum",
"finearts.museum",
"finland.museum",
"flanders.museum",
"florida.museum",
"force.museum",
"fortmissoula.museum",
"fortworth.museum",
"foundation.museum",
"francaise.museum",
"frankfurt.museum",
"franziskaner.museum",
"freemasonry.museum",
"freiburg.museum",
"fribourg.museum",
"frog.museum",
"fundacio.museum",
"furniture.museum",
"gallery.museum",
"garden.museum",
"gateway.museum",
"geelvinck.museum",
"gemological.museum",
"geology.museum",
"georgia.museum",
"giessen.museum",
"glas.museum",
"glass.museum",
"gorge.museum",
"grandrapids.museum",
"graz.museum",
"guernsey.museum",
"halloffame.museum",
"hamburg.museum",
"handson.museum",
"harvestcelebration.museum",
"hawaii.museum",
"health.museum",
"heimatunduhren.museum",
"hellas.museum",
"helsinki.museum",
"hembygdsforbund.museum",
"heritage.museum",
"histoire.museum",
"historical.museum",
"historicalsociety.museum",
"historichouses.museum",
"historisch.museum",
"historisches.museum",
"history.museum",
"historyofscience.museum",
"horology.museum",
"house.museum",
"humanities.museum",
"illustration.museum",
"imageandsound.museum",
"indian.museum",
"indiana.museum",
"indianapolis.museum",
"indianmarket.museum",
"intelligence.museum",
"interactive.museum",
"iraq.museum",
"iron.museum",
"isleofman.museum",
"jamison.museum",
"jefferson.museum",
"jerusalem.museum",
"jewelry.museum",
"jewish.museum",
"jewishart.museum",
"jfk.museum",
"journalism.museum",
"judaica.museum",
"judygarland.museum",
"juedisches.museum",
"juif.museum",
"karate.museum",
"karikatur.museum",
"kids.museum",
"koebenhavn.museum",
"koeln.museum",
"kunst.museum",
"kunstsammlung.museum",
"kunstunddesign.museum",
"labor.museum",
"labour.museum",
"lajolla.museum",
"lancashire.museum",
"landes.museum",
"lans.museum",
"läns.museum",
"larsson.museum",
"lewismiller.museum",
"lincoln.museum",
"linz.museum",
"living.museum",
"livinghistory.museum",
"localhistory.museum",
"london.museum",
"losangeles.museum",
"louvre.museum",
"loyalist.museum",
"lucerne.museum",
"luxembourg.museum",
"luzern.museum",
"mad.museum",
"madrid.museum",
"mallorca.museum",
"manchester.museum",
"mansion.museum",
"mansions.museum",
"manx.museum",
"marburg.museum",
"maritime.museum",
"maritimo.museum",
"maryland.museum",
"marylhurst.museum",
"media.museum",
"medical.museum",
"medizinhistorisches.museum",
"meeres.museum",
"memorial.museum",
"mesaverde.museum",
"michigan.museum",
"midatlantic.museum",
"military.museum",
"mill.museum",
"miners.museum",
"mining.museum",
"minnesota.museum",
"missile.museum",
"missoula.museum",
"modern.museum",
"moma.museum",
"money.museum",
"monmouth.museum",
"monticello.museum",
"montreal.museum",
"moscow.museum",
"motorcycle.museum",
"muenchen.museum",
"muenster.museum",
"mulhouse.museum",
"muncie.museum",
"museet.museum",
"museumcenter.museum",
"museumvereniging.museum",
"music.museum",
"national.museum",
"nationalfirearms.museum",
"nationalheritage.museum",
"nativeamerican.museum",
"naturalhistory.museum",
"naturalhistorymuseum.museum",
"naturalsciences.museum",
"nature.museum",
"naturhistorisches.museum",
"natuurwetenschappen.museum",
"naumburg.museum",
"naval.museum",
"nebraska.museum",
"neues.museum",
"newhampshire.museum",
"newjersey.museum",
"newmexico.museum",
"newport.museum",
"newspaper.museum",
"newyork.museum",
"niepce.museum",
"norfolk.museum",
"north.museum",
"nrw.museum",
"nyc.museum",
"nyny.museum",
"oceanographic.museum",
"oceanographique.museum",
"omaha.museum",
"online.museum",
"ontario.museum",
"openair.museum",
"oregon.museum",
"oregontrail.museum",
"otago.museum",
"oxford.museum",
"pacific.museum",
"paderborn.museum",
"palace.museum",
"paleo.museum",
"palmsprings.museum",
"panama.museum",
"paris.museum",
"pasadena.museum",
"pharmacy.museum",
"philadelphia.museum",
"philadelphiaarea.museum",
"philately.museum",
"phoenix.museum",
"photography.museum",
"pilots.museum",
"pittsburgh.museum",
"planetarium.museum",
"plantation.museum",
"plants.museum",
"plaza.museum",
"portal.museum",
"portland.museum",
"portlligat.museum",
"posts-and-telecommunications.museum",
"preservation.museum",
"presidio.museum",
"press.museum",
"project.museum",
"public.museum",
"pubol.museum",
"quebec.museum",
"railroad.museum",
"railway.museum",
"research.museum",
"resistance.museum",
"riodejaneiro.museum",
"rochester.museum",
"rockart.museum",
"roma.museum",
"russia.museum",
"saintlouis.museum",
"salem.museum",
"salvadordali.museum",
"salzburg.museum",
"sandiego.museum",
"sanfrancisco.museum",
"santabarbara.museum",
"santacruz.museum",
"santafe.museum",
"saskatchewan.museum",
"satx.museum",
"savannahga.museum",
"schlesisches.museum",
"schoenbrunn.museum",
"schokoladen.museum",
"school.museum",
"schweiz.museum",
"science.museum",
"scienceandhistory.museum",
"scienceandindustry.museum",
"sciencecenter.museum",
"sciencecenters.museum",
"science-fiction.museum",
"sciencehistory.museum",
"sciences.museum",
"sciencesnaturelles.museum",
"scotland.museum",
"seaport.museum",
"settlement.museum",
"settlers.museum",
"shell.museum",
"sherbrooke.museum",
"sibenik.museum",
"silk.museum",
"ski.museum",
"skole.museum",
"society.museum",
"sologne.museum",
"soundandvision.museum",
"southcarolina.museum",
"southwest.museum",
"space.museum",
"spy.museum",
"square.museum",
"stadt.museum",
"stalbans.museum",
"starnberg.museum",
"state.museum",
"stateofdelaware.museum",
"station.museum",
"steam.museum",
"steiermark.museum",
"stjohn.museum",
"stockholm.museum",
"stpetersburg.museum",
"stuttgart.museum",
"suisse.museum",
"surgeonshall.museum",
"surrey.museum",
"svizzera.museum",
"sweden.museum",
"sydney.museum",
"tank.museum",
"tcm.museum",
"technology.museum",
"telekommunikation.museum",
"television.museum",
"texas.museum",
"textile.museum",
"theater.museum",
"time.museum",
"timekeeping.museum",
"topology.museum",
"torino.museum",
"touch.museum",
"town.museum",
"transport.museum",
"tree.museum",
"trolley.museum",
"trust.museum",
"trustee.museum",
"uhren.museum",
"ulm.museum",
"undersea.museum",
"university.museum",
"usa.museum",
"usantiques.museum",
"usarts.museum",
"uscountryestate.museum",
"usculture.museum",
"usdecorativearts.museum",
"usgarden.museum",
"ushistory.museum",
"ushuaia.museum",
"uslivinghistory.museum",
"utah.museum",
"uvic.museum",
"valley.museum",
"vantaa.museum",
"versailles.museum",
"viking.museum",
"village.museum",
"virginia.museum",
"virtual.museum",
"virtuel.museum",
"vlaanderen.museum",
"volkenkunde.museum",
"wales.museum",
"wallonie.museum",
"war.museum",
"washingtondc.museum",
"watchandclock.museum",
"watch-and-clock.museum",
"western.museum",
"westfalen.museum",
"whaling.museum",
"wildlife.museum",
"williamsburg.museum",
"windmill.museum",
"workshop.museum",
"york.museum",
"yorkshire.museum",
"yosemite.museum",
"youth.museum",
"zoological.museum",
"zoology.museum",
"ירושלים.museum",
"иком.museum",
"mv",
"aero.mv",
"biz.mv",
"com.mv",
"coop.mv",
"edu.mv",
"gov.mv",
"info.mv",
"int.mv",
"mil.mv",
"museum.mv",
"name.mv",
"net.mv",
"org.mv",
"pro.mv",
"mw",
"ac.mw",
"biz.mw",
"co.mw",
"com.mw",
"coop.mw",
"edu.mw",
"gov.mw",
"int.mw",
"museum.mw",
"net.mw",
"org.mw",
"mx",
"com.mx",
"org.mx",
"gob.mx",
"edu.mx",
"net.mx",
"my",
"biz.my",
"com.my",
"edu.my",
"gov.my",
"mil.my",
"name.my",
"net.my",
"org.my",
"mz",
"ac.mz",
"adv.mz",
"co.mz",
"edu.mz",
"gov.mz",
"mil.mz",
"net.mz",
"org.mz",
"na",
"info.na",
"pro.na",
"name.na",
"school.na",
"or.na",
"dr.na",
"us.na",
"mx.na",
"ca.na",
"in.na",
"cc.na",
"tv.na",
"ws.na",
"mobi.na",
"co.na",
"com.na",
"org.na",
"name",
"nc",
"asso.nc",
"nom.nc",
"ne",
"net",
"nf",
"com.nf",
"net.nf",
"per.nf",
"rec.nf",
"web.nf",
"arts.nf",
"firm.nf",
"info.nf",
"other.nf",
"store.nf",
"ng",
"com.ng",
"edu.ng",
"gov.ng",
"i.ng",
"mil.ng",
"mobi.ng",
"name.ng",
"net.ng",
"org.ng",
"sch.ng",
"ni",
"ac.ni",
"biz.ni",
"co.ni",
"com.ni",
"edu.ni",
"gob.ni",
"in.ni",
"info.ni",
"int.ni",
"mil.ni",
"net.ni",
"nom.ni",
"org.ni",
"web.ni",
"nl",
"no",
"fhs.no",
"vgs.no",
"fylkesbibl.no",
"folkebibl.no",
"museum.no",
"idrett.no",
"priv.no",
"mil.no",
"stat.no",
"dep.no",
"kommune.no",
"herad.no",
"aa.no",
"ah.no",
"bu.no",
"fm.no",
"hl.no",
"hm.no",
"jan-mayen.no",
"mr.no",
"nl.no",
"nt.no",
"of.no",
"ol.no",
"oslo.no",
"rl.no",
"sf.no",
"st.no",
"svalbard.no",
"tm.no",
"tr.no",
"va.no",
"vf.no",
"gs.aa.no",
"gs.ah.no",
"gs.bu.no",
"gs.fm.no",
"gs.hl.no",
"gs.hm.no",
"gs.jan-mayen.no",
"gs.mr.no",
"gs.nl.no",
"gs.nt.no",
"gs.of.no",
"gs.ol.no",
"gs.oslo.no",
"gs.rl.no",
"gs.sf.no",
"gs.st.no",
"gs.svalbard.no",
"gs.tm.no",
"gs.tr.no",
"gs.va.no",
"gs.vf.no",
"akrehamn.no",
"åkrehamn.no",
"algard.no",
"ålgård.no",
"arna.no",
"brumunddal.no",
"bryne.no",
"bronnoysund.no",
"brønnøysund.no",
"drobak.no",
"drøbak.no",
"egersund.no",
"fetsund.no",
"floro.no",
"florø.no",
"fredrikstad.no",
"hokksund.no",
"honefoss.no",
"hønefoss.no",
"jessheim.no",
"jorpeland.no",
"jørpeland.no",
"kirkenes.no",
"kopervik.no",
"krokstadelva.no",
"langevag.no",
"langevåg.no",
"leirvik.no",
"mjondalen.no",
"mjøndalen.no",
"mo-i-rana.no",
"mosjoen.no",
"mosjøen.no",
"nesoddtangen.no",
"orkanger.no",
"osoyro.no",
"osøyro.no",
"raholt.no",
"råholt.no",
"sandnessjoen.no",
"sandnessjøen.no",
"skedsmokorset.no",
"slattum.no",
"spjelkavik.no",
"stathelle.no",
"stavern.no",
"stjordalshalsen.no",
"stjørdalshalsen.no",
"tananger.no",
"tranby.no",
"vossevangen.no",
"afjord.no",
"åfjord.no",
"agdenes.no",
"al.no",
"ål.no",
"alesund.no",
"ålesund.no",
"alstahaug.no",
"alta.no",
"áltá.no",
"alaheadju.no",
"álaheadju.no",
"alvdal.no",
"amli.no",
"åmli.no",
"amot.no",
"åmot.no",
"andebu.no",
"andoy.no",
"andøy.no",
"andasuolo.no",
"ardal.no",
"årdal.no",
"aremark.no",
"arendal.no",
"ås.no",
"aseral.no",
"åseral.no",
"asker.no",
"askim.no",
"askvoll.no",
"askoy.no",
"askøy.no",
"asnes.no",
"åsnes.no",
"audnedaln.no",
"aukra.no",
"aure.no",
"aurland.no",
"aurskog-holand.no",
"aurskog-høland.no",
"austevoll.no",
"austrheim.no",
"averoy.no",
"averøy.no",
"balestrand.no",
"ballangen.no",
"balat.no",
"bálát.no",
"balsfjord.no",
"bahccavuotna.no",
"báhccavuotna.no",
"bamble.no",
"bardu.no",
"beardu.no",
"beiarn.no",
"bajddar.no",
"bájddar.no",
"baidar.no",
"báidár.no",
"berg.no",
"bergen.no",
"berlevag.no",
"berlevåg.no",
"bearalvahki.no",
"bearalváhki.no",
"bindal.no",
"birkenes.no",
"bjarkoy.no",
"bjarkøy.no",
"bjerkreim.no",
"bjugn.no",
"bodo.no",
"bodø.no",
"badaddja.no",
"bådåddjå.no",
"budejju.no",
"bokn.no",
"bremanger.no",
"bronnoy.no",
"brønnøy.no",
"bygland.no",
"bykle.no",
"barum.no",
"bærum.no",
"bo.telemark.no",
"bø.telemark.no",
"bo.nordland.no",
"bø.nordland.no",
"bievat.no",
"bievát.no",
"bomlo.no",
"bømlo.no",
"batsfjord.no",
"båtsfjord.no",
"bahcavuotna.no",
"báhcavuotna.no",
"dovre.no",
"drammen.no",
"drangedal.no",
"dyroy.no",
"dyrøy.no",
"donna.no",
"dønna.no",
"eid.no",
"eidfjord.no",
"eidsberg.no",
"eidskog.no",
"eidsvoll.no",
"eigersund.no",
"elverum.no",
"enebakk.no",
"engerdal.no",
"etne.no",
"etnedal.no",
"evenes.no",
"evenassi.no",
"evenášši.no",
"evje-og-hornnes.no",
"farsund.no",
"fauske.no",
"fuossko.no",
"fuoisku.no",
"fedje.no",
"fet.no",
"finnoy.no",
"finnøy.no",
"fitjar.no",
"fjaler.no",
"fjell.no",
"flakstad.no",
"flatanger.no",
"flekkefjord.no",
"flesberg.no",
"flora.no",
"fla.no",
"flå.no",
"folldal.no",
"forsand.no",
"fosnes.no",
"frei.no",
"frogn.no",
"froland.no",
"frosta.no",
"frana.no",
"fræna.no",
"froya.no",
"frøya.no",
"fusa.no",
"fyresdal.no",
"forde.no",
"førde.no",
"gamvik.no",
"gangaviika.no",
"gáŋgaviika.no",
"gaular.no",
"gausdal.no",
"gildeskal.no",
"gildeskål.no",
"giske.no",
"gjemnes.no",
"gjerdrum.no",
"gjerstad.no",
"gjesdal.no",
"gjovik.no",
"gjøvik.no",
"gloppen.no",
"gol.no",
"gran.no",
"grane.no",
"granvin.no",
"gratangen.no",
"grimstad.no",
"grong.no",
"kraanghke.no",
"kråanghke.no",
"grue.no",
"gulen.no",
"hadsel.no",
"halden.no",
"halsa.no",
"hamar.no",
"hamaroy.no",
"habmer.no",
"hábmer.no",
"hapmir.no",
"hápmir.no",
"hammerfest.no",
"hammarfeasta.no",
"hámmárfeasta.no",
"haram.no",
"hareid.no",
"harstad.no",
"hasvik.no",
"aknoluokta.no",
"ákŋoluokta.no",
"hattfjelldal.no",
"aarborte.no",
"haugesund.no",
"hemne.no",
"hemnes.no",
"hemsedal.no",
"heroy.more-og-romsdal.no",
"herøy.møre-og-romsdal.no",
"heroy.nordland.no",
"herøy.nordland.no",
"hitra.no",
"hjartdal.no",
"hjelmeland.no",
"hobol.no",
"hobøl.no",
"hof.no",
"hol.no",
"hole.no",
"holmestrand.no",
"holtalen.no",
"holtålen.no",
"hornindal.no",
"horten.no",
"hurdal.no",
"hurum.no",
"hvaler.no",
"hyllestad.no",
"hagebostad.no",
"hægebostad.no",
"hoyanger.no",
"høyanger.no",
"hoylandet.no",
"høylandet.no",
"ha.no",
"hå.no",
"ibestad.no",
"inderoy.no",
"inderøy.no",
"iveland.no",
"jevnaker.no",
"jondal.no",
"jolster.no",
"jølster.no",
"karasjok.no",
"karasjohka.no",
"kárášjohka.no",
"karlsoy.no",
"galsa.no",
"gálsá.no",
"karmoy.no",
"karmøy.no",
"kautokeino.no",
"guovdageaidnu.no",
"klepp.no",
"klabu.no",
"klæbu.no",
"kongsberg.no",
"kongsvinger.no",
"kragero.no",
"kragerø.no",
"kristiansand.no",
"kristiansund.no",
"krodsherad.no",
"krødsherad.no",
"kvalsund.no",
"rahkkeravju.no",
"ráhkkerávju.no",
"kvam.no",
"kvinesdal.no",
"kvinnherad.no",
"kviteseid.no",
"kvitsoy.no",
"kvitsøy.no",
"kvafjord.no",
"kvæfjord.no",
"giehtavuoatna.no",
"kvanangen.no",
"kvænangen.no",
"navuotna.no",
"návuotna.no",
"kafjord.no",
"kåfjord.no",
"gaivuotna.no",
"gáivuotna.no",
"larvik.no",
"lavangen.no",
"lavagis.no",
"loabat.no",
"loabát.no",
"lebesby.no",
"davvesiida.no",
"leikanger.no",
"leirfjord.no",
"leka.no",
"leksvik.no",
"lenvik.no",
"leangaviika.no",
"leaŋgaviika.no",
"lesja.no",
"levanger.no",
"lier.no",
"lierne.no",
"lillehammer.no",
"lillesand.no",
"lindesnes.no",
"lindas.no",
"lindås.no",
"lom.no",
"loppa.no",
"lahppi.no",
"láhppi.no",
"lund.no",
"lunner.no",
"luroy.no",
"lurøy.no",
"luster.no",
"lyngdal.no",
"lyngen.no",
"ivgu.no",
"lardal.no",
"lerdal.no",
"lærdal.no",
"lodingen.no",
"lødingen.no",
"lorenskog.no",
"lørenskog.no",
"loten.no",
"løten.no",
"malvik.no",
"masoy.no",
"måsøy.no",
"muosat.no",
"muosát.no",
"mandal.no",
"marker.no",
"marnardal.no",
"masfjorden.no",
"meland.no",
"meldal.no",
"melhus.no",
"meloy.no",
"meløy.no",
"meraker.no",
"meråker.no",
"moareke.no",
"moåreke.no",
"midsund.no",
"midtre-gauldal.no",
"modalen.no",
"modum.no",
"molde.no",
"moskenes.no",
"moss.no",
"mosvik.no",
"malselv.no",
"målselv.no",
"malatvuopmi.no",
"málatvuopmi.no",
"namdalseid.no",
"aejrie.no",
"namsos.no",
"namsskogan.no",
"naamesjevuemie.no",
"nååmesjevuemie.no",
"laakesvuemie.no",
"nannestad.no",
"narvik.no",
"narviika.no",
"naustdal.no",
"nedre-eiker.no",
"nes.akershus.no",
"nes.buskerud.no",
"nesna.no",
"nesodden.no",
"nesseby.no",
"unjarga.no",
"unjárga.no",
"nesset.no",
"nissedal.no",
"nittedal.no",
"nord-aurdal.no",
"nord-fron.no",
"nord-odal.no",
"norddal.no",
"nordkapp.no",
"davvenjarga.no",
"davvenjárga.no",
"nordre-land.no",
"nordreisa.no",
"raisa.no",
"ráisa.no",
"nore-og-uvdal.no",
"notodden.no",
"naroy.no",
"nærøy.no",
"notteroy.no",
"nøtterøy.no",
"odda.no",
"oksnes.no",
"øksnes.no",
"oppdal.no",
"oppegard.no",
"oppegård.no",
"orkdal.no",
"orland.no",
"ørland.no",
"orskog.no",
"ørskog.no",
"orsta.no",
"ørsta.no",
"os.hedmark.no",
"os.hordaland.no",
"osen.no",
"osteroy.no",
"osterøy.no",
"ostre-toten.no",
"østre-toten.no",
"overhalla.no",
"ovre-eiker.no",
"øvre-eiker.no",
"oyer.no",
"øyer.no",
"oygarden.no",
"øygarden.no",
"oystre-slidre.no",
"øystre-slidre.no",
"porsanger.no",
"porsangu.no",
"porsáŋgu.no",
"porsgrunn.no",
"radoy.no",
"radøy.no",
"rakkestad.no",
"rana.no",
"ruovat.no",
"randaberg.no",
"rauma.no",
"rendalen.no",
"rennebu.no",
"rennesoy.no",
"rennesøy.no",
"rindal.no",
"ringebu.no",
"ringerike.no",
"ringsaker.no",
"rissa.no",
"risor.no",
"risør.no",
"roan.no",
"rollag.no",
"rygge.no",
"ralingen.no",
"rælingen.no",
"rodoy.no",
"rødøy.no",
"romskog.no",
"rømskog.no",
"roros.no",
"røros.no",
"rost.no",
"røst.no",
"royken.no",
"røyken.no",
"royrvik.no",
"røyrvik.no",
"rade.no",
"råde.no",
"salangen.no",
"siellak.no",
"saltdal.no",
"salat.no",
"sálát.no",
"sálat.no",
"samnanger.no",
"sande.more-og-romsdal.no",
"sande.møre-og-romsdal.no",
"sande.vestfold.no",
"sandefjord.no",
"sandnes.no",
"sandoy.no",
"sandøy.no",
"sarpsborg.no",
"sauda.no",
"sauherad.no",
"sel.no",
"selbu.no",
"selje.no",
"seljord.no",
"sigdal.no",
"siljan.no",
"sirdal.no",
"skaun.no",
"skedsmo.no",
"ski.no",
"skien.no",
"skiptvet.no",
"skjervoy.no",
"skjervøy.no",
"skierva.no",
"skiervá.no",
"skjak.no",
"skjåk.no",
"skodje.no",
"skanland.no",
"skånland.no",
"skanit.no",
"skánit.no",
"smola.no",
"smøla.no",
"snillfjord.no",
"snasa.no",
"snåsa.no",
"snoasa.no",
"snaase.no",
"snåase.no",
"sogndal.no",
"sokndal.no",
"sola.no",
"solund.no",
"songdalen.no",
"sortland.no",
"spydeberg.no",
"stange.no",
"stavanger.no",
"steigen.no",
"steinkjer.no",
"stjordal.no",
"stjørdal.no",
"stokke.no",
"stor-elvdal.no",
"stord.no",
"stordal.no",
"storfjord.no",
"omasvuotna.no",
"strand.no",
"stranda.no",
"stryn.no",
"sula.no",
"suldal.no",
"sund.no",
"sunndal.no",
"surnadal.no",
"sveio.no",
"svelvik.no",
"sykkylven.no",
"sogne.no",
"søgne.no",
"somna.no",
"sømna.no",
"sondre-land.no",
"søndre-land.no",
"sor-aurdal.no",
"sør-aurdal.no",
"sor-fron.no",
"sør-fron.no",
"sor-odal.no",
"sør-odal.no",
"sor-varanger.no",
"sør-varanger.no",
"matta-varjjat.no",
"mátta-várjjat.no",
"sorfold.no",
"sørfold.no",
"sorreisa.no",
"sørreisa.no",
"sorum.no",
"sørum.no",
"tana.no",
"deatnu.no",
"time.no",
"tingvoll.no",
"tinn.no",
"tjeldsund.no",
"dielddanuorri.no",
"tjome.no",
"tjøme.no",
"tokke.no",
"tolga.no",
"torsken.no",
"tranoy.no",
"tranøy.no",
"tromso.no",
"tromsø.no",
"tromsa.no",
"romsa.no",
"trondheim.no",
"troandin.no",
"trysil.no",
"trana.no",
"træna.no",
"trogstad.no",
"trøgstad.no",
"tvedestrand.no",
"tydal.no",
"tynset.no",
"tysfjord.no",
"divtasvuodna.no",
"divttasvuotna.no",
"tysnes.no",
"tysvar.no",
"tysvær.no",
"tonsberg.no",
"tønsberg.no",
"ullensaker.no",
"ullensvang.no",
"ulvik.no",
"utsira.no",
"vadso.no",
"vadsø.no",
"cahcesuolo.no",
"čáhcesuolo.no",
"vaksdal.no",
"valle.no",
"vang.no",
"vanylven.no",
"vardo.no",
"vardø.no",
"varggat.no",
"várggát.no",
"vefsn.no",
"vaapste.no",
"vega.no",
"vegarshei.no",
"vegårshei.no",
"vennesla.no",
"verdal.no",
"verran.no",
"vestby.no",
"vestnes.no",
"vestre-slidre.no",
"vestre-toten.no",
"vestvagoy.no",
"vestvågøy.no",
"vevelstad.no",
"vik.no",
"vikna.no",
"vindafjord.no",
"volda.no",
"voss.no",
"varoy.no",
"værøy.no",
"vagan.no",
"vågan.no",
"voagat.no",
"vagsoy.no",
"vågsøy.no",
"vaga.no",
"vågå.no",
"valer.ostfold.no",
"våler.østfold.no",
"valer.hedmark.no",
"våler.hedmark.no",
"*.np",
"nr",
"biz.nr",
"info.nr",
"gov.nr",
"edu.nr",
"org.nr",
"net.nr",
"com.nr",
"nu",
"nz",
"ac.nz",
"co.nz",
"cri.nz",
"geek.nz",
"gen.nz",
"govt.nz",
"health.nz",
"iwi.nz",
"kiwi.nz",
"maori.nz",
"mil.nz",
"māori.nz",
"net.nz",
"org.nz",
"parliament.nz",
"school.nz",
"om",
"co.om",
"com.om",
"edu.om",
"gov.om",
"med.om",
"museum.om",
"net.om",
"org.om",
"pro.om",
"onion",
"org",
"pa",
"ac.pa",
"gob.pa",
"com.pa",
"org.pa",
"sld.pa",
"edu.pa",
"net.pa",
"ing.pa",
"abo.pa",
"med.pa",
"nom.pa",
"pe",
"edu.pe",
"gob.pe",
"nom.pe",
"mil.pe",
"org.pe",
"com.pe",
"net.pe",
"pf",
"com.pf",
"org.pf",
"edu.pf",
"*.pg",
"ph",
"com.ph",
"net.ph",
"org.ph",
"gov.ph",
"edu.ph",
"ngo.ph",
"mil.ph",
"i.ph",
"pk",
"com.pk",
"net.pk",
"edu.pk",
"org.pk",
"fam.pk",
"biz.pk",
"web.pk",
"gov.pk",
"gob.pk",
"gok.pk",
"gon.pk",
"gop.pk",
"gos.pk",
"info.pk",
"pl",
"com.pl",
"net.pl",
"org.pl",
"aid.pl",
"agro.pl",
"atm.pl",
"auto.pl",
"biz.pl",
"edu.pl",
"gmina.pl",
"gsm.pl",
"info.pl",
"mail.pl",
"miasta.pl",
"media.pl",
"mil.pl",
"nieruchomosci.pl",
"nom.pl",
"pc.pl",
"powiat.pl",
"priv.pl",
"realestate.pl",
"rel.pl",
"sex.pl",
"shop.pl",
"sklep.pl",
"sos.pl",
"szkola.pl",
"targi.pl",
"tm.pl",
"tourism.pl",
"travel.pl",
"turystyka.pl",
"gov.pl",
"ap.gov.pl",
"ic.gov.pl",
"is.gov.pl",
"us.gov.pl",
"kmpsp.gov.pl",
"kppsp.gov.pl",
"kwpsp.gov.pl",
"psp.gov.pl",
"wskr.gov.pl",
"kwp.gov.pl",
"mw.gov.pl",
"ug.gov.pl",
"um.gov.pl",
"umig.gov.pl",
"ugim.gov.pl",
"upow.gov.pl",
"uw.gov.pl",
"starostwo.gov.pl",
"pa.gov.pl",
"po.gov.pl",
"psse.gov.pl",
"pup.gov.pl",
"rzgw.gov.pl",
"sa.gov.pl",
"so.gov.pl",
"sr.gov.pl",
"wsa.gov.pl",
"sko.gov.pl",
"uzs.gov.pl",
"wiih.gov.pl",
"winb.gov.pl",
"pinb.gov.pl",
"wios.gov.pl",
"witd.gov.pl",
"wzmiuw.gov.pl",
"piw.gov.pl",
"wiw.gov.pl",
"griw.gov.pl",
"wif.gov.pl",
"oum.gov.pl",
"sdn.gov.pl",
"zp.gov.pl",
"uppo.gov.pl",
"mup.gov.pl",
"wuoz.gov.pl",
"konsulat.gov.pl",
"oirm.gov.pl",
"augustow.pl",
"babia-gora.pl",
"bedzin.pl",
"beskidy.pl",
"bialowieza.pl",
"bialystok.pl",
"bielawa.pl",
"bieszczady.pl",
"boleslawiec.pl",
"bydgoszcz.pl",
"bytom.pl",
"cieszyn.pl",
"czeladz.pl",
"czest.pl",
"dlugoleka.pl",
"elblag.pl",
"elk.pl",
"glogow.pl",
"gniezno.pl",
"gorlice.pl",
"grajewo.pl",
"ilawa.pl",
"jaworzno.pl",
"jelenia-gora.pl",
"jgora.pl",
"kalisz.pl",
"kazimierz-dolny.pl",
"karpacz.pl",
"kartuzy.pl",
"kaszuby.pl",
"katowice.pl",
"kepno.pl",
"ketrzyn.pl",
"klodzko.pl",
"kobierzyce.pl",
"kolobrzeg.pl",
"konin.pl",
"konskowola.pl",
"kutno.pl",
"lapy.pl",
"lebork.pl",
"legnica.pl",
"lezajsk.pl",
"limanowa.pl",
"lomza.pl",
"lowicz.pl",
"lubin.pl",
"lukow.pl",
"malbork.pl",
"malopolska.pl",
"mazowsze.pl",
"mazury.pl",
"mielec.pl",
"mielno.pl",
"mragowo.pl",
"naklo.pl",
"nowaruda.pl",
"nysa.pl",
"olawa.pl",
"olecko.pl",
"olkusz.pl",
"olsztyn.pl",
"opoczno.pl",
"opole.pl",
"ostroda.pl",
"ostroleka.pl",
"ostrowiec.pl",
"ostrowwlkp.pl",
"pila.pl",
"pisz.pl",
"podhale.pl",
"podlasie.pl",
"polkowice.pl",
"pomorze.pl",
"pomorskie.pl",
"prochowice.pl",
"pruszkow.pl",
"przeworsk.pl",
"pulawy.pl",
"radom.pl",
"rawa-maz.pl",
"rybnik.pl",
"rzeszow.pl",
"sanok.pl",
"sejny.pl",
"slask.pl",
"slupsk.pl",
"sosnowiec.pl",
"stalowa-wola.pl",
"skoczow.pl",
"starachowice.pl",
"stargard.pl",
"suwalki.pl",
"swidnica.pl",
"swiebodzin.pl",
"swinoujscie.pl",
"szczecin.pl",
"szczytno.pl",
"tarnobrzeg.pl",
"tgory.pl",
"turek.pl",
"tychy.pl",
"ustka.pl",
"walbrzych.pl",
"warmia.pl",
"warszawa.pl",
"waw.pl",
"wegrow.pl",
"wielun.pl",
"wlocl.pl",
"wloclawek.pl",
"wodzislaw.pl",
"wolomin.pl",
"wroclaw.pl",
"zachpomor.pl",
"zagan.pl",
"zarow.pl",
"zgora.pl",
"zgorzelec.pl",
"pm",
"pn",
"gov.pn",
"co.pn",
"org.pn",
"edu.pn",
"net.pn",
"post",
"pr",
"com.pr",
"net.pr",
"org.pr",
"gov.pr",
"edu.pr",
"isla.pr",
"pro.pr",
"biz.pr",
"info.pr",
"name.pr",
"est.pr",
"prof.pr",
"ac.pr",
"pro",
"aaa.pro",
"aca.pro",
"acct.pro",
"avocat.pro",
"bar.pro",
"cpa.pro",
"eng.pro",
"jur.pro",
"law.pro",
"med.pro",
"recht.pro",
"ps",
"edu.ps",
"gov.ps",
"sec.ps",
"plo.ps",
"com.ps",
"org.ps",
"net.ps",
"pt",
"net.pt",
"gov.pt",
"org.pt",
"edu.pt",
"int.pt",
"publ.pt",
"com.pt",
"nome.pt",
"pw",
"co.pw",
"ne.pw",
"or.pw",
"ed.pw",
"go.pw",
"belau.pw",
"py",
"com.py",
"coop.py",
"edu.py",
"gov.py",
"mil.py",
"net.py",
"org.py",
"qa",
"com.qa",
"edu.qa",
"gov.qa",
"mil.qa",
"name.qa",
"net.qa",
"org.qa",
"sch.qa",
"re",
"asso.re",
"com.re",
"nom.re",
"ro",
"arts.ro",
"com.ro",
"firm.ro",
"info.ro",
"nom.ro",
"nt.ro",
"org.ro",
"rec.ro",
"store.ro",
"tm.ro",
"www.ro",
"rs",
"ac.rs",
"co.rs",
"edu.rs",
"gov.rs",
"in.rs",
"org.rs",
"ru",
"rw",
"ac.rw",
"co.rw",
"coop.rw",
"gov.rw",
"mil.rw",
"net.rw",
"org.rw",
"sa",
"com.sa",
"net.sa",
"org.sa",
"gov.sa",
"med.sa",
"pub.sa",
"edu.sa",
"sch.sa",
"sb",
"com.sb",
"edu.sb",
"gov.sb",
"net.sb",
"org.sb",
"sc",
"com.sc",
"gov.sc",
"net.sc",
"org.sc",
"edu.sc",
"sd",
"com.sd",
"net.sd",
"org.sd",
"edu.sd",
"med.sd",
"tv.sd",
"gov.sd",
"info.sd",
"se",
"a.se",
"ac.se",
"b.se",
"bd.se",
"brand.se",
"c.se",
"d.se",
"e.se",
"f.se",
"fh.se",
"fhsk.se",
"fhv.se",
"g.se",
"h.se",
"i.se",
"k.se",
"komforb.se",
"kommunalforbund.se",
"komvux.se",
"l.se",
"lanbib.se",
"m.se",
"n.se",
"naturbruksgymn.se",
"o.se",
"org.se",
"p.se",
"parti.se",
"pp.se",
"press.se",
"r.se",
"s.se",
"t.se",
"tm.se",
"u.se",
"w.se",
"x.se",
"y.se",
"z.se",
"sg",
"com.sg",
"net.sg",
"org.sg",
"gov.sg",
"edu.sg",
"per.sg",
"sh",
"com.sh",
"net.sh",
"gov.sh",
"org.sh",
"mil.sh",
"si",
"sj",
"sk",
"sl",
"com.sl",
"net.sl",
"edu.sl",
"gov.sl",
"org.sl",
"sm",
"sn",
"art.sn",
"com.sn",
"edu.sn",
"gouv.sn",
"org.sn",
"perso.sn",
"univ.sn",
"so",
"com.so",
"edu.so",
"gov.so",
"me.so",
"net.so",
"org.so",
"sr",
"ss",
"biz.ss",
"com.ss",
"edu.ss",
"gov.ss",
"me.ss",
"net.ss",
"org.ss",
"sch.ss",
"st",
"co.st",
"com.st",
"consulado.st",
"edu.st",
"embaixada.st",
"mil.st",
"net.st",
"org.st",
"principe.st",
"saotome.st",
"store.st",
"su",
"sv",
"com.sv",
"edu.sv",
"gob.sv",
"org.sv",
"red.sv",
"sx",
"gov.sx",
"sy",
"edu.sy",
"gov.sy",
"net.sy",
"mil.sy",
"com.sy",
"org.sy",
"sz",
"co.sz",
"ac.sz",
"org.sz",
"tc",
"td",
"tel",
"tf",
"tg",
"th",
"ac.th",
"co.th",
"go.th",
"in.th",
"mi.th",
"net.th",
"or.th",
"tj",
"ac.tj",
"biz.tj",
"co.tj",
"com.tj",
"edu.tj",
"go.tj",
"gov.tj",
"int.tj",
"mil.tj",
"name.tj",
"net.tj",
"nic.tj",
"org.tj",
"test.tj",
"web.tj",
"tk",
"tl",
"gov.tl",
"tm",
"com.tm",
"co.tm",
"org.tm",
"net.tm",
"nom.tm",
"gov.tm",
"mil.tm",
"edu.tm",
"tn",
"com.tn",
"ens.tn",
"fin.tn",
"gov.tn",
"ind.tn",
"info.tn",
"intl.tn",
"mincom.tn",
"nat.tn",
"net.tn",
"org.tn",
"perso.tn",
"tourism.tn",
"to",
"com.to",
"gov.to",
"net.to",
"org.to",
"edu.to",
"mil.to",
"tr",
"av.tr",
"bbs.tr",
"bel.tr",
"biz.tr",
"com.tr",
"dr.tr",
"edu.tr",
"gen.tr",
"gov.tr",
"info.tr",
"mil.tr",
"k12.tr",
"kep.tr",
"name.tr",
"net.tr",
"org.tr",
"pol.tr",
"tel.tr",
"tsk.tr",
"tv.tr",
"web.tr",
"nc.tr",
"gov.nc.tr",
"tt",
"co.tt",
"com.tt",
"org.tt",
"net.tt",
"biz.tt",
"info.tt",
"pro.tt",
"int.tt",
"coop.tt",
"jobs.tt",
"mobi.tt",
"travel.tt",
"museum.tt",
"aero.tt",
"name.tt",
"gov.tt",
"edu.tt",
"tv",
"tw",
"edu.tw",
"gov.tw",
"mil.tw",
"com.tw",
"net.tw",
"org.tw",
"idv.tw",
"game.tw",
"ebiz.tw",
"club.tw",
"網路.tw",
"組織.tw",
"商業.tw",
"tz",
"ac.tz",
"co.tz",
"go.tz",
"hotel.tz",
"info.tz",
"me.tz",
"mil.tz",
"mobi.tz",
"ne.tz",
"or.tz",
"sc.tz",
"tv.tz",
"ua",
"com.ua",
"edu.ua",
"gov.ua",
"in.ua",
"net.ua",
"org.ua",
"cherkassy.ua",
"cherkasy.ua",
"chernigov.ua",
"chernihiv.ua",
"chernivtsi.ua",
"chernovtsy.ua",
"ck.ua",
"cn.ua",
"cr.ua",
"crimea.ua",
"cv.ua",
"dn.ua",
"dnepropetrovsk.ua",
"dnipropetrovsk.ua",
"donetsk.ua",
"dp.ua",
"if.ua",
"ivano-frankivsk.ua",
"kh.ua",
"kharkiv.ua",
"kharkov.ua",
"kherson.ua",
"khmelnitskiy.ua",
"khmelnytskyi.ua",
"kiev.ua",
"kirovograd.ua",
"km.ua",
"kr.ua",
"krym.ua",
"ks.ua",
"kv.ua",
"kyiv.ua",
"lg.ua",
"lt.ua",
"lugansk.ua",
"lutsk.ua",
"lv.ua",
"lviv.ua",
"mk.ua",
"mykolaiv.ua",
"nikolaev.ua",
"od.ua",
"odesa.ua",
"odessa.ua",
"pl.ua",
"poltava.ua",
"rivne.ua",
"rovno.ua",
"rv.ua",
"sb.ua",
"sebastopol.ua",
"sevastopol.ua",
"sm.ua",
"sumy.ua",
"te.ua",
"ternopil.ua",
"uz.ua",
"uzhgorod.ua",
"vinnica.ua",
"vinnytsia.ua",
"vn.ua",
"volyn.ua",
"yalta.ua",
"zaporizhzhe.ua",
"zaporizhzhia.ua",
"zhitomir.ua",
"zhytomyr.ua",
"zp.ua",
"zt.ua",
"ug",
"co.ug",
"or.ug",
"ac.ug",
"sc.ug",
"go.ug",
"ne.ug",
"com.ug",
"org.ug",
"uk",
"ac.uk",
"co.uk",
"gov.uk",
"ltd.uk",
"me.uk",
"net.uk",
"nhs.uk",
"org.uk",
"plc.uk",
"police.uk",
"*.sch.uk",
"us",
"dni.us",
"fed.us",
"isa.us",
"kids.us",
"nsn.us",
"ak.us",
"al.us",
"ar.us",
"as.us",
"az.us",
"ca.us",
"co.us",
"ct.us",
"dc.us",
"de.us",
"fl.us",
"ga.us",
"gu.us",
"hi.us",
"ia.us",
"id.us",
"il.us",
"in.us",
"ks.us",
"ky.us",
"la.us",
"ma.us",
"md.us",
"me.us",
"mi.us",
"mn.us",
"mo.us",
"ms.us",
"mt.us",
"nc.us",
"nd.us",
"ne.us",
"nh.us",
"nj.us",
"nm.us",
"nv.us",
"ny.us",
"oh.us",
"ok.us",
"or.us",
"pa.us",
"pr.us",
"ri.us",
"sc.us",
"sd.us",
"tn.us",
"tx.us",
"ut.us",
"vi.us",
"vt.us",
"va.us",
"wa.us",
"wi.us",
"wv.us",
"wy.us",
"k12.ak.us",
"k12.al.us",
"k12.ar.us",
"k12.as.us",
"k12.az.us",
"k12.ca.us",
"k12.co.us",
"k12.ct.us",
"k12.dc.us",
"k12.de.us",
"k12.fl.us",
"k12.ga.us",
"k12.gu.us",
"k12.ia.us",
"k12.id.us",
"k12.il.us",
"k12.in.us",
"k12.ks.us",
"k12.ky.us",
"k12.la.us",
"k12.ma.us",
"k12.md.us",
"k12.me.us",
"k12.mi.us",
"k12.mn.us",
"k12.mo.us",
"k12.ms.us",
"k12.mt.us",
"k12.nc.us",
"k12.ne.us",
"k12.nh.us",
"k12.nj.us",
"k12.nm.us",
"k12.nv.us",
"k12.ny.us",
"k12.oh.us",
"k12.ok.us",
"k12.or.us",
"k12.pa.us",
"k12.pr.us",
"k12.sc.us",
"k12.tn.us",
"k12.tx.us",
"k12.ut.us",
"k12.vi.us",
"k12.vt.us",
"k12.va.us",
"k12.wa.us",
"k12.wi.us",
"k12.wy.us",
"cc.ak.us",
"cc.al.us",
"cc.ar.us",
"cc.as.us",
"cc.az.us",
"cc.ca.us",
"cc.co.us",
"cc.ct.us",
"cc.dc.us",
"cc.de.us",
"cc.fl.us",
"cc.ga.us",
"cc.gu.us",
"cc.hi.us",
"cc.ia.us",
"cc.id.us",
"cc.il.us",
"cc.in.us",
"cc.ks.us",
"cc.ky.us",
"cc.la.us",
"cc.ma.us",
"cc.md.us",
"cc.me.us",
"cc.mi.us",
"cc.mn.us",
"cc.mo.us",
"cc.ms.us",
"cc.mt.us",
"cc.nc.us",
"cc.nd.us",
"cc.ne.us",
"cc.nh.us",
"cc.nj.us",
"cc.nm.us",
"cc.nv.us",
"cc.ny.us",
"cc.oh.us",
"cc.ok.us",
"cc.or.us",
"cc.pa.us",
"cc.pr.us",
"cc.ri.us",
"cc.sc.us",
"cc.sd.us",
"cc.tn.us",
"cc.tx.us",
"cc.ut.us",
"cc.vi.us",
"cc.vt.us",
"cc.va.us",
"cc.wa.us",
"cc.wi.us",
"cc.wv.us",
"cc.wy.us",
"lib.ak.us",
"lib.al.us",
"lib.ar.us",
"lib.as.us",
"lib.az.us",
"lib.ca.us",
"lib.co.us",
"lib.ct.us",
"lib.dc.us",
"lib.fl.us",
"lib.ga.us",
"lib.gu.us",
"lib.hi.us",
"lib.ia.us",
"lib.id.us",
"lib.il.us",
"lib.in.us",
"lib.ks.us",
"lib.ky.us",
"lib.la.us",
"lib.ma.us",
"lib.md.us",
"lib.me.us",
"lib.mi.us",
"lib.mn.us",
"lib.mo.us",
"lib.ms.us",
"lib.mt.us",
"lib.nc.us",
"lib.nd.us",
"lib.ne.us",
"lib.nh.us",
"lib.nj.us",
"lib.nm.us",
"lib.nv.us",
"lib.ny.us",
"lib.oh.us",
"lib.ok.us",
"lib.or.us",
"lib.pa.us",
"lib.pr.us",
"lib.ri.us",
"lib.sc.us",
"lib.sd.us",
"lib.tn.us",
"lib.tx.us",
"lib.ut.us",
"lib.vi.us",
"lib.vt.us",
"lib.va.us",
"lib.wa.us",
"lib.wi.us",
"lib.wy.us",
"pvt.k12.ma.us",
"chtr.k12.ma.us",
"paroch.k12.ma.us",
"ann-arbor.mi.us",
"cog.mi.us",
"dst.mi.us",
"eaton.mi.us",
"gen.mi.us",
"mus.mi.us",
"tec.mi.us",
"washtenaw.mi.us",
"uy",
"com.uy",
"edu.uy",
"gub.uy",
"mil.uy",
"net.uy",
"org.uy",
"uz",
"co.uz",
"com.uz",
"net.uz",
"org.uz",
"va",
"vc",
"com.vc",
"net.vc",
"org.vc",
"gov.vc",
"mil.vc",
"edu.vc",
"ve",
"arts.ve",
"bib.ve",
"co.ve",
"com.ve",
"e12.ve",
"edu.ve",
"firm.ve",
"gob.ve",
"gov.ve",
"info.ve",
"int.ve",
"mil.ve",
"net.ve",
"nom.ve",
"org.ve",
"rar.ve",
"rec.ve",
"store.ve",
"tec.ve",
"web.ve",
"vg",
"vi",
"co.vi",
"com.vi",
"k12.vi",
"net.vi",
"org.vi",
"vn",
"com.vn",
"net.vn",
"org.vn",
"edu.vn",
"gov.vn",
"int.vn",
"ac.vn",
"biz.vn",
"info.vn",
"name.vn",
"pro.vn",
"health.vn",
"vu",
"com.vu",
"edu.vu",
"net.vu",
"org.vu",
"wf",
"ws",
"com.ws",
"net.ws",
"org.ws",
"gov.ws",
"edu.ws",
"yt",
"امارات",
"հայ",
"বাংলা",
"бг",
"البحرين",
"бел",
"中国",
"中國",
"الجزائر",
"مصر",
"ею",
"ευ",
"موريتانيا",
"გე",
"ελ",
"香港",
"公司.香港",
"教育.香港",
"政府.香港",
"個人.香港",
"網絡.香港",
"組織.香港",
"ಭಾರತ",
"ଭାରତ",
"ভাৰত",
"भारतम्",
"भारोत",
"ڀارت",
"ഭാരതം",
"भारत",
"بارت",
"بھارت",
"భారత్",
"ભારત",
"ਭਾਰਤ",
"ভারত",
"இந்தியா",
"ایران",
"ايران",
"عراق",
"الاردن",
"한국",
"қаз",
"ລາວ",
"ලංකා",
"இலங்கை",
"المغرب",
"мкд",
"мон",
"澳門",
"澳门",
"مليسيا",
"عمان",
"پاکستان",
"پاكستان",
"فلسطين",
"срб",
"пр.срб",
"орг.срб",
"обр.срб",
"од.срб",
"упр.срб",
"ак.срб",
"рф",
"قطر",
"السعودية",
"السعودیة",
"السعودیۃ",
"السعوديه",
"سودان",
"新加坡",
"சிங்கப்பூர்",
"سورية",
"سوريا",
"ไทย",
"ศึกษา.ไทย",
"ธุรกิจ.ไทย",
"รัฐบาล.ไทย",
"ทหาร.ไทย",
"เน็ต.ไทย",
"องค์กร.ไทย",
"تونس",
"台灣",
"台湾",
"臺灣",
"укр",
"اليمن",
"xxx",
"ye",
"com.ye",
"edu.ye",
"gov.ye",
"net.ye",
"mil.ye",
"org.ye",
"ac.za",
"agric.za",
"alt.za",
"co.za",
"edu.za",
"gov.za",
"grondar.za",
"law.za",
"mil.za",
"net.za",
"ngo.za",
"nic.za",
"nis.za",
"nom.za",
"org.za",
"school.za",
"tm.za",
"web.za",
"zm",
"ac.zm",
"biz.zm",
"co.zm",
"com.zm",
"edu.zm",
"gov.zm",
"info.zm",
"mil.zm",
"net.zm",
"org.zm",
"sch.zm",
"zw",
"ac.zw",
"co.zw",
"gov.zw",
"mil.zw",
"org.zw",
"aaa",
"aarp",
"abarth",
"abb",
"abbott",
"abbvie",
"abc",
"able",
"abogado",
"abudhabi",
"academy",
"accenture",
"accountant",
"accountants",
"aco",
"actor",
"adac",
"ads",
"adult",
"aeg",
"aetna",
"afl",
"africa",
"agakhan",
"agency",
"aig",
"airbus",
"airforce",
"airtel",
"akdn",
"alfaromeo",
"alibaba",
"alipay",
"allfinanz",
"allstate",
"ally",
"alsace",
"alstom",
"amazon",
"americanexpress",
"americanfamily",
"amex",
"amfam",
"amica",
"amsterdam",
"analytics",
"android",
"anquan",
"anz",
"aol",
"apartments",
"app",
"apple",
"aquarelle",
"arab",
"aramco",
"archi",
"army",
"art",
"arte",
"asda",
"associates",
"athleta",
"attorney",
"auction",
"audi",
"audible",
"audio",
"auspost",
"author",
"auto",
"autos",
"avianca",
"aws",
"axa",
"azure",
"baby",
"baidu",
"banamex",
"bananarepublic",
"band",
"bank",
"bar",
"barcelona",
"barclaycard",
"barclays",
"barefoot",
"bargains",
"baseball",
"basketball",
"bauhaus",
"bayern",
"bbc",
"bbt",
"bbva",
"bcg",
"bcn",
"beats",
"beauty",
"beer",
"bentley",
"berlin",
"best",
"bestbuy",
"bet",
"bharti",
"bible",
"bid",
"bike",
"bing",
"bingo",
"bio",
"black",
"blackfriday",
"blockbuster",
"blog",
"bloomberg",
"blue",
"bms",
"bmw",
"bnpparibas",
"boats",
"boehringer",
"bofa",
"bom",
"bond",
"boo",
"book",
"booking",
"bosch",
"bostik",
"boston",
"bot",
"boutique",
"box",
"bradesco",
"bridgestone",
"broadway",
"broker",
"brother",
"brussels",
"bugatti",
"build",
"builders",
"business",
"buy",
"buzz",
"bzh",
"cab",
"cafe",
"cal",
"call",
"calvinklein",
"cam",
"camera",
"camp",
"cancerresearch",
"canon",
"capetown",
"capital",
"capitalone",
"car",
"caravan",
"cards",
"care",
"career",
"careers",
"cars",
"casa",
"case",
"cash",
"casino",
"catering",
"catholic",
"cba",
"cbn",
"cbre",
"cbs",
"center",
"ceo",
"cern",
"cfa",
"cfd",
"chanel",
"channel",
"charity",
"chase",
"chat",
"cheap",
"chintai",
"christmas",
"chrome",
"church",
"cipriani",
"circle",
"cisco",
"citadel",
"citi",
"citic",
"city",
"cityeats",
"claims",
"cleaning",
"click",
"clinic",
"clinique",
"clothing",
"cloud",
"club",
"clubmed",
"coach",
"codes",
"coffee",
"college",
"cologne",
"comcast",
"commbank",
"community",
"company",
"compare",
"computer",
"comsec",
"condos",
"construction",
"consulting",
"contact",
"contractors",
"cooking",
"cookingchannel",
"cool",
"corsica",
"country",
"coupon",
"coupons",
"courses",
"cpa",
"credit",
"creditcard",
"creditunion",
"cricket",
"crown",
"crs",
"cruise",
"cruises",
"cuisinella",
"cymru",
"cyou",
"dabur",
"dad",
"dance",
"data",
"date",
"dating",
"datsun",
"day",
"dclk",
"dds",
"deal",
"dealer",
"deals",
"degree",
"delivery",
"dell",
"deloitte",
"delta",
"democrat",
"dental",
"dentist",
"desi",
"design",
"dev",
"dhl",
"diamonds",
"diet",
"digital",
"direct",
"directory",
"discount",
"discover",
"dish",
"diy",
"dnp",
"docs",
"doctor",
"dog",
"domains",
"dot",
"download",
"drive",
"dtv",
"dubai",
"dunlop",
"dupont",
"durban",
"dvag",
"dvr",
"earth",
"eat",
"eco",
"edeka",
"education",
"email",
"emerck",
"energy",
"engineer",
"engineering",
"enterprises",
"epson",
"equipment",
"ericsson",
"erni",
"esq",
"estate",
"etisalat",
"eurovision",
"eus",
"events",
"exchange",
"expert",
"exposed",
"express",
"extraspace",
"fage",
"fail",
"fairwinds",
"faith",
"family",
"fan",
"fans",
"farm",
"farmers",
"fashion",
"fast",
"fedex",
"feedback",
"ferrari",
"ferrero",
"fiat",
"fidelity",
"fido",
"film",
"final",
"finance",
"financial",
"fire",
"firestone",
"firmdale",
"fish",
"fishing",
"fit",
"fitness",
"flickr",
"flights",
"flir",
"florist",
"flowers",
"fly",
"foo",
"food",
"foodnetwork",
"football",
"ford",
"forex",
"forsale",
"forum",
"foundation",
"fox",
"free",
"fresenius",
"frl",
"frogans",
"frontdoor",
"frontier",
"ftr",
"fujitsu",
"fun",
"fund",
"furniture",
"futbol",
"fyi",
"gal",
"gallery",
"gallo",
"gallup",
"game",
"games",
"gap",
"garden",
"gay",
"gbiz",
"gdn",
"gea",
"gent",
"genting",
"george",
"ggee",
"gift",
"gifts",
"gives",
"giving",
"glass",
"gle",
"global",
"globo",
"gmail",
"gmbh",
"gmo",
"gmx",
"godaddy",
"gold",
"goldpoint",
"golf",
"goo",
"goodyear",
"goog",
"google",
"gop",
"got",
"grainger",
"graphics",
"gratis",
"green",
"gripe",
"grocery",
"group",
"guardian",
"gucci",
"guge",
"guide",
"guitars",
"guru",
"hair",
"hamburg",
"hangout",
"haus",
"hbo",
"hdfc",
"hdfcbank",
"health",
"healthcare",
"help",
"helsinki",
"here",
"hermes",
"hgtv",
"hiphop",
"hisamitsu",
"hitachi",
"hiv",
"hkt",
"hockey",
"holdings",
"holiday",
"homedepot",
"homegoods",
"homes",
"homesense",
"honda",
"horse",
"hospital",
"host",
"hosting",
"hot",
"hoteles",
"hotels",
"hotmail",
"house",
"how",
"hsbc",
"hughes",
"hyatt",
"hyundai",
"ibm",
"icbc",
"ice",
"icu",
"ieee",
"ifm",
"ikano",
"imamat",
"imdb",
"immo",
"immobilien",
"inc",
"industries",
"infiniti",
"ing",
"ink",
"institute",
"insurance",
"insure",
"international",
"intuit",
"investments",
"ipiranga",
"irish",
"ismaili",
"ist",
"istanbul",
"itau",
"itv",
"jaguar",
"java",
"jcb",
"jeep",
"jetzt",
"jewelry",
"jio",
"jll",
"jmp",
"jnj",
"joburg",
"jot",
"joy",
"jpmorgan",
"jprs",
"juegos",
"juniper",
"kaufen",
"kddi",
"kerryhotels",
"kerrylogistics",
"kerryproperties",
"kfh",
"kia",
"kids",
"kim",
"kinder",
"kindle",
"kitchen",
"kiwi",
"koeln",
"komatsu",
"kosher",
"kpmg",
"kpn",
"krd",
"kred",
"kuokgroup",
"kyoto",
"lacaixa",
"lamborghini",
"lamer",
"lancaster",
"lancia",
"land",
"landrover",
"lanxess",
"lasalle",
"lat",
"latino",
"latrobe",
"law",
"lawyer",
"lds",
"lease",
"leclerc",
"lefrak",
"legal",
"lego",
"lexus",
"lgbt",
"lidl",
"life",
"lifeinsurance",
"lifestyle",
"lighting",
"like",
"lilly",
"limited",
"limo",
"lincoln",
"linde",
"link",
"lipsy",
"live",
"living",
"llc",
"llp",
"loan",
"loans",
"locker",
"locus",
"loft",
"lol",
"london",
"lotte",
"lotto",
"love",
"lpl",
"lplfinancial",
"ltd",
"ltda",
"lundbeck",
"luxe",
"luxury",
"macys",
"madrid",
"maif",
"maison",
"makeup",
"man",
"management",
"mango",
"map",
"market",
"marketing",
"markets",
"marriott",
"marshalls",
"maserati",
"mattel",
"mba",
"mckinsey",
"med",
"media",
"meet",
"melbourne",
"meme",
"memorial",
"men",
"menu",
"merckmsd",
"miami",
"microsoft",
"mini",
"mint",
"mit",
"mitsubishi",
"mlb",
"mls",
"mma",
"mobile",
"moda",
"moe",
"moi",
"mom",
"monash",
"money",
"monster",
"mormon",
"mortgage",
"moscow",
"moto",
"motorcycles",
"mov",
"movie",
"msd",
"mtn",
"mtr",
"music",
"mutual",
"nab",
"nagoya",
"natura",
"navy",
"nba",
"nec",
"netbank",
"netflix",
"network",
"neustar",
"new",
"news",
"next",
"nextdirect",
"nexus",
"nfl",
"ngo",
"nhk",
"nico",
"nike",
"nikon",
"ninja",
"nissan",
"nissay",
"nokia",
"northwesternmutual",
"norton",
"now",
"nowruz",
"nowtv",
"nra",
"nrw",
"ntt",
"nyc",
"obi",
"observer",
"office",
"okinawa",
"olayan",
"olayangroup",
"oldnavy",
"ollo",
"omega",
"one",
"ong",
"onl",
"online",
"ooo",
"open",
"oracle",
"orange",
"organic",
"origins",
"osaka",
"otsuka",
"ott",
"ovh",
"page",
"panasonic",
"paris",
"pars",
"partners",
"parts",
"party",
"passagens",
"pay",
"pccw",
"pet",
"pfizer",
"pharmacy",
"phd",
"philips",
"phone",
"photo",
"photography",
"photos",
"physio",
"pics",
"pictet",
"pictures",
"pid",
"pin",
"ping",
"pink",
"pioneer",
"pizza",
"place",
"play",
"playstation",
"plumbing",
"plus",
"pnc",
"pohl",
"poker",
"politie",
"porn",
"pramerica",
"praxi",
"press",
"prime",
"prod",
"productions",
"prof",
"progressive",
"promo",
"properties",
"property",
"protection",
"pru",
"prudential",
"pub",
"pwc",
"qpon",
"quebec",
"quest",
"racing",
"radio",
"read",
"realestate",
"realtor",
"realty",
"recipes",
"red",
"redstone",
"redumbrella",
"rehab",
"reise",
"reisen",
"reit",
"reliance",
"ren",
"rent",
"rentals",
"repair",
"report",
"republican",
"rest",
"restaurant",
"review",
"reviews",
"rexroth",
"rich",
"richardli",
"ricoh",
"ril",
"rio",
"rip",
"rocher",
"rocks",
"rodeo",
"rogers",
"room",
"rsvp",
"rugby",
"ruhr",
"run",
"rwe",
"ryukyu",
"saarland",
"safe",
"safety",
"sakura",
"sale",
"salon",
"samsclub",
"samsung",
"sandvik",
"sandvikcoromant",
"sanofi",
"sap",
"sarl",
"sas",
"save",
"saxo",
"sbi",
"sbs",
"sca",
"scb",
"schaeffler",
"schmidt",
"scholarships",
"school",
"schule",
"schwarz",
"science",
"scot",
"search",
"seat",
"secure",
"security",
"seek",
"select",
"sener",
"services",
"ses",
"seven",
"sew",
"sex",
"sexy",
"sfr",
"shangrila",
"sharp",
"shaw",
"shell",
"shia",
"shiksha",
"shoes",
"shop",
"shopping",
"shouji",
"show",
"showtime",
"silk",
"sina",
"singles",
"site",
"ski",
"skin",
"sky",
"skype",
"sling",
"smart",
"smile",
"sncf",
"soccer",
"social",
"softbank",
"software",
"sohu",
"solar",
"solutions",
"song",
"sony",
"soy",
"spa",
"space",
"sport",
"spot",
"srl",
"stada",
"staples",
"star",
"statebank",
"statefarm",
"stc",
"stcgroup",
"stockholm",
"storage",
"store",
"stream",
"studio",
"study",
"style",
"sucks",
"supplies",
"supply",
"support",
"surf",
"surgery",
"suzuki",
"swatch",
"swiss",
"sydney",
"systems",
"tab",
"taipei",
"talk",
"taobao",
"target",
"tatamotors",
"tatar",
"tattoo",
"tax",
"taxi",
"tci",
"tdk",
"team",
"tech",
"technology",
"temasek",
"tennis",
"teva",
"thd",
"theater",
"theatre",
"tiaa",
"tickets",
"tienda",
"tiffany",
"tips",
"tires",
"tirol",
"tjmaxx",
"tjx",
"tkmaxx",
"tmall",
"today",
"tokyo",
"tools",
"top",
"toray",
"toshiba",
"total",
"tours",
"town",
"toyota",
"toys",
"trade",
"trading",
"training",
"travel",
"travelchannel",
"travelers",
"travelersinsurance",
"trust",
"trv",
"tube",
"tui",
"tunes",
"tushu",
"tvs",
"ubank",
"ubs",
"unicom",
"university",
"uno",
"uol",
"ups",
"vacations",
"vana",
"vanguard",
"vegas",
"ventures",
"verisign",
"versicherung",
"vet",
"viajes",
"video",
"vig",
"viking",
"villas",
"vin",
"vip",
"virgin",
"visa",
"vision",
"viva",
"vivo",
"vlaanderen",
"vodka",
"volkswagen",
"volvo",
"vote",
"voting",
"voto",
"voyage",
"vuelos",
"wales",
"walmart",
"walter",
"wang",
"wanggou",
"watch",
"watches",
"weather",
"weatherchannel",
"webcam",
"weber",
"website",
"wedding",
"weibo",
"weir",
"whoswho",
"wien",
"wiki",
"williamhill",
"win",
"windows",
"wine",
"winners",
"wme",
"wolterskluwer",
"woodside",
"work",
"works",
"world",
"wow",
"wtc",
"wtf",
"xbox",
"xerox",
"xfinity",
"xihuan",
"xin",
"कॉम",
"セール",
"佛山",
"慈善",
"集团",
"在线",
"点看",
"คอม",
"八卦",
"موقع",
"公益",
"公司",
"香格里拉",
"网站",
"移动",
"我爱你",
"москва",
"католик",
"онлайн",
"сайт",
"联通",
"קום",
"时尚",
"微博",
"淡马锡",
"ファッション",
"орг",
"नेट",
"ストア",
"アマゾン",
"삼성",
"商标",
"商店",
"商城",
"дети",
"ポイント",
"新闻",
"家電",
"كوم",
"中文网",
"中信",
"娱乐",
"谷歌",
"電訊盈科",
"购物",
"クラウド",
"通販",
"网店",
"संगठन",
"餐厅",
"网络",
"ком",
"亚马逊",
"诺基亚",
"食品",
"飞利浦",
"手机",
"ارامكو",
"العليان",
"اتصالات",
"بازار",
"ابوظبي",
"كاثوليك",
"همراه",
"닷컴",
"政府",
"شبكة",
"بيتك",
"عرب",
"机构",
"组织机构",
"健康",
"招聘",
"рус",
"大拿",
"みんな",
"グーグル",
"世界",
"書籍",
"网址",
"닷넷",
"コム",
"天主教",
"游戏",
"vermögensberater",
"vermögensberatung",
"企业",
"信息",
"嘉里大酒店",
"嘉里",
"广东",
"政务",
"xyz",
"yachts",
"yahoo",
"yamaxun",
"yandex",
"yodobashi",
"yoga",
"yokohama",
"you",
"youtube",
"yun",
"zappos",
"zara",
"zero",
"zip",
"zone",
"zuerich",
"cc.ua",
"inf.ua",
"ltd.ua",
"611.to",
"graphox.us",
"*.devcdnaccesso.com",
"adobeaemcloud.com",
"*.dev.adobeaemcloud.com",
"hlx.live",
"adobeaemcloud.net",
"hlx.page",
"hlx3.page",
"beep.pl",
"airkitapps.com",
"airkitapps-au.com",
"airkitapps.eu",
"aivencloud.com",
"barsy.ca",
"*.compute.estate",
"*.alces.network",
"kasserver.com",
"altervista.org",
"alwaysdata.net",
"cloudfront.net",
"*.compute.amazonaws.com",
"*.compute-1.amazonaws.com",
"*.compute.amazonaws.com.cn",
"us-east-1.amazonaws.com",
"cn-north-1.eb.amazonaws.com.cn",
"cn-northwest-1.eb.amazonaws.com.cn",
"elasticbeanstalk.com",
"ap-northeast-1.elasticbeanstalk.com",
"ap-northeast-2.elasticbeanstalk.com",
"ap-northeast-3.elasticbeanstalk.com",
"ap-south-1.elasticbeanstalk.com",
"ap-southeast-1.elasticbeanstalk.com",
"ap-southeast-2.elasticbeanstalk.com",
"ca-central-1.elasticbeanstalk.com",
"eu-central-1.elasticbeanstalk.com",
"eu-west-1.elasticbeanstalk.com",
"eu-west-2.elasticbeanstalk.com",
"eu-west-3.elasticbeanstalk.com",
"sa-east-1.elasticbeanstalk.com",
"us-east-1.elasticbeanstalk.com",
"us-east-2.elasticbeanstalk.com",
"us-gov-west-1.elasticbeanstalk.com",
"us-west-1.elasticbeanstalk.com",
"us-west-2.elasticbeanstalk.com",
"*.elb.amazonaws.com",
"*.elb.amazonaws.com.cn",
"awsglobalaccelerator.com",
"s3.amazonaws.com",
"s3-ap-northeast-1.amazonaws.com",
"s3-ap-northeast-2.amazonaws.com",
"s3-ap-south-1.amazonaws.com",
"s3-ap-southeast-1.amazonaws.com",
"s3-ap-southeast-2.amazonaws.com",
"s3-ca-central-1.amazonaws.com",
"s3-eu-central-1.amazonaws.com",
"s3-eu-west-1.amazonaws.com",
"s3-eu-west-2.amazonaws.com",
"s3-eu-west-3.amazonaws.com",
"s3-external-1.amazonaws.com",
"s3-fips-us-gov-west-1.amazonaws.com",
"s3-sa-east-1.amazonaws.com",
"s3-us-gov-west-1.amazonaws.com",
"s3-us-east-2.amazonaws.com",
"s3-us-west-1.amazonaws.com",
"s3-us-west-2.amazonaws.com",
"s3.ap-northeast-2.amazonaws.com",
"s3.ap-south-1.amazonaws.com",
"s3.cn-north-1.amazonaws.com.cn",
"s3.ca-central-1.amazonaws.com",
"s3.eu-central-1.amazonaws.com",
"s3.eu-west-2.amazonaws.com",
"s3.eu-west-3.amazonaws.com",
"s3.us-east-2.amazonaws.com",
"s3.dualstack.ap-northeast-1.amazonaws.com",
"s3.dualstack.ap-northeast-2.amazonaws.com",
"s3.dualstack.ap-south-1.amazonaws.com",
"s3.dualstack.ap-southeast-1.amazonaws.com",
"s3.dualstack.ap-southeast-2.amazonaws.com",
"s3.dualstack.ca-central-1.amazonaws.com",
"s3.dualstack.eu-central-1.amazonaws.com",
"s3.dualstack.eu-west-1.amazonaws.com",
"s3.dualstack.eu-west-2.amazonaws.com",
"s3.dualstack.eu-west-3.amazonaws.com",
"s3.dualstack.sa-east-1.amazonaws.com",
"s3.dualstack.us-east-1.amazonaws.com",
"s3.dualstack.us-east-2.amazonaws.com",
"s3-website-us-east-1.amazonaws.com",
"s3-website-us-west-1.amazonaws.com",
"s3-website-us-west-2.amazonaws.com",
"s3-website-ap-northeast-1.amazonaws.com",
"s3-website-ap-southeast-1.amazonaws.com",
"s3-website-ap-southeast-2.amazonaws.com",
"s3-website-eu-west-1.amazonaws.com",
"s3-website-sa-east-1.amazonaws.com",
"s3-website.ap-northeast-2.amazonaws.com",
"s3-website.ap-south-1.amazonaws.com",
"s3-website.ca-central-1.amazonaws.com",
"s3-website.eu-central-1.amazonaws.com",
"s3-website.eu-west-2.amazonaws.com",
"s3-website.eu-west-3.amazonaws.com",
"s3-website.us-east-2.amazonaws.com",
"t3l3p0rt.net",
"tele.amune.org",
"apigee.io",
"siiites.com",
"appspacehosted.com",
"appspaceusercontent.com",
"appudo.net",
"on-aptible.com",
"user.aseinet.ne.jp",
"gv.vc",
"d.gv.vc",
"user.party.eus",
"pimienta.org",
"poivron.org",
"potager.org",
"sweetpepper.org",
"myasustor.com",
"cdn.prod.atlassian-dev.net",
"translated.page",
"myfritz.net",
"onavstack.net",
"*.awdev.ca",
"*.advisor.ws",
"ecommerce-shop.pl",
"b-data.io",
"backplaneapp.io",
"balena-devices.com",
"rs.ba",
"*.banzai.cloud",
"app.banzaicloud.io",
"*.backyards.banzaicloud.io",
"base.ec",
"official.ec",
"buyshop.jp",
"fashionstore.jp",
"handcrafted.jp",
"kawaiishop.jp",
"supersale.jp",
"theshop.jp",
"shopselect.net",
"base.shop",
"*.beget.app",
"betainabox.com",
"bnr.la",
"bitbucket.io",
"blackbaudcdn.net",
"of.je",
"bluebite.io",
"boomla.net",
"boutir.com",
"boxfuse.io",
"square7.ch",
"bplaced.com",
"bplaced.de",
"square7.de",
"bplaced.net",
"square7.net",
"shop.brendly.rs",
"browsersafetymark.io",
"uk0.bigv.io",
"dh.bytemark.co.uk",
"vm.bytemark.co.uk",
"cafjs.com",
"mycd.eu",
"drr.ac",
"uwu.ai",
"carrd.co",
"crd.co",
"ju.mp",
"ae.org",
"br.com",
"cn.com",
"com.de",
"com.se",
"de.com",
"eu.com",
"gb.net",
"hu.net",
"jp.net",
"jpn.com",
"mex.com",
"ru.com",
"sa.com",
"se.net",
"uk.com",
"uk.net",
"us.com",
"za.bz",
"za.com",
"ar.com",
"hu.com",
"kr.com",
"no.com",
"qc.com",
"uy.com",
"africa.com",
"gr.com",
"in.net",
"web.in",
"us.org",
"co.com",
"aus.basketball",
"nz.basketball",
"radio.am",
"radio.fm",
"c.la",
"certmgr.org",
"cx.ua",
"discourse.group",
"discourse.team",
"cleverapps.io",
"clerk.app",
"clerkstage.app",
"*.lcl.dev",
"*.lclstage.dev",
"*.stg.dev",
"*.stgstage.dev",
"clickrising.net",
"c66.me",
"cloud66.ws",
"cloud66.zone",
"jdevcloud.com",
"wpdevcloud.com",
"cloudaccess.host",
"freesite.host",
"cloudaccess.net",
"cloudcontrolled.com",
"cloudcontrolapp.com",
"*.cloudera.site",
"pages.dev",
"trycloudflare.com",
"workers.dev",
"wnext.app",
"co.ca",
"*.otap.co",
"co.cz",
"c.cdn77.org",
"cdn77-ssl.net",
"r.cdn77.net",
"rsc.cdn77.org",
"ssl.origin.cdn77-secure.org",
"cloudns.asia",
"cloudns.biz",
"cloudns.club",
"cloudns.cc",
"cloudns.eu",
"cloudns.in",
"cloudns.info",
"cloudns.org",
"cloudns.pro",
"cloudns.pw",
"cloudns.us",
"cnpy.gdn",
"codeberg.page",
"co.nl",
"co.no",
"webhosting.be",
"hosting-cluster.nl",
"ac.ru",
"edu.ru",
"gov.ru",
"int.ru",
"mil.ru",
"test.ru",
"dyn.cosidns.de",
"dynamisches-dns.de",
"dnsupdater.de",
"internet-dns.de",
"l-o-g-i-n.de",
"dynamic-dns.info",
"feste-ip.net",
"knx-server.net",
"static-access.net",
"realm.cz",
"*.cryptonomic.net",
"cupcake.is",
"curv.dev",
"*.customer-oci.com",
"*.oci.customer-oci.com",
"*.ocp.customer-oci.com",
"*.ocs.customer-oci.com",
"cyon.link",
"cyon.site",
"fnwk.site",
"folionetwork.site",
"platform0.app",
"daplie.me",
"localhost.daplie.me",
"dattolocal.com",
"dattorelay.com",
"dattoweb.com",
"mydatto.com",
"dattolocal.net",
"mydatto.net",
"biz.dk",
"co.dk",
"firm.dk",
"reg.dk",
"store.dk",
"dyndns.dappnode.io",
"*.dapps.earth",
"*.bzz.dapps.earth",
"builtwithdark.com",
"demo.datadetect.com",
"instance.datadetect.com",
"edgestack.me",
"ddns5.com",
"debian.net",
"deno.dev",
"deno-staging.dev",
"dedyn.io",
"deta.app",
"deta.dev",
"*.rss.my.id",
"*.diher.solutions",
"discordsays.com",
"discordsez.com",
"jozi.biz",
"dnshome.de",
"online.th",
"shop.th",
"drayddns.com",
"shoparena.pl",
"dreamhosters.com",
"mydrobo.com",
"drud.io",
"drud.us",
"duckdns.org",
"bip.sh",
"bitbridge.net",
"dy.fi",
"tunk.org",
"dyndns-at-home.com",
"dyndns-at-work.com",
"dyndns-blog.com",
"dyndns-free.com",
"dyndns-home.com",
"dyndns-ip.com",
"dyndns-mail.com",
"dyndns-office.com",
"dyndns-pics.com",
"dyndns-remote.com",
"dyndns-server.com",
"dyndns-web.com",
"dyndns-wiki.com",
"dyndns-work.com",
"dyndns.biz",
"dyndns.info",
"dyndns.org",
"dyndns.tv",
"at-band-camp.net",
"ath.cx",
"barrel-of-knowledge.info",
"barrell-of-knowledge.info",
"better-than.tv",
"blogdns.com",
"blogdns.net",
"blogdns.org",
"blogsite.org",
"boldlygoingnowhere.org",
"broke-it.net",
"buyshouses.net",
"cechire.com",
"dnsalias.com",
"dnsalias.net",
"dnsalias.org",
"dnsdojo.com",
"dnsdojo.net",
"dnsdojo.org",
"does-it.net",
"doesntexist.com",
"doesntexist.org",
"dontexist.com",
"dontexist.net",
"dontexist.org",
"doomdns.com",
"doomdns.org",
"dvrdns.org",
"dyn-o-saur.com",
"dynalias.com",
"dynalias.net",
"dynalias.org",
"dynathome.net",
"dyndns.ws",
"endofinternet.net",
"endofinternet.org",
"endoftheinternet.org",
"est-a-la-maison.com",
"est-a-la-masion.com",
"est-le-patron.com",
"est-mon-blogueur.com",
"for-better.biz",
"for-more.biz",
"for-our.info",
"for-some.biz",
"for-the.biz",
"forgot.her.name",
"forgot.his.name",
"from-ak.com",
"from-al.com",
"from-ar.com",
"from-az.net",
"from-ca.com",
"from-co.net",
"from-ct.com",
"from-dc.com",
"from-de.com",
"from-fl.com",
"from-ga.com",
"from-hi.com",
"from-ia.com",
"from-id.com",
"from-il.com",
"from-in.com",
"from-ks.com",
"from-ky.com",
"from-la.net",
"from-ma.com",
"from-md.com",
"from-me.org",
"from-mi.com",
"from-mn.com",
"from-mo.com",
"from-ms.com",
"from-mt.com",
"from-nc.com",
"from-nd.com",
"from-ne.com",
"from-nh.com",
"from-nj.com",
"from-nm.com",
"from-nv.com",
"from-ny.net",
"from-oh.com",
"from-ok.com",
"from-or.com",
"from-pa.com",
"from-pr.com",
"from-ri.com",
"from-sc.com",
"from-sd.com",
"from-tn.com",
"from-tx.com",
"from-ut.com",
"from-va.com",
"from-vt.com",
"from-wa.com",
"from-wi.com",
"from-wv.com",
"from-wy.com",
"ftpaccess.cc",
"fuettertdasnetz.de",
"game-host.org",
"game-server.cc",
"getmyip.com",
"gets-it.net",
"go.dyndns.org",
"gotdns.com",
"gotdns.org",
"groks-the.info",
"groks-this.info",
"ham-radio-op.net",
"here-for-more.info",
"hobby-site.com",
"hobby-site.org",
"home.dyndns.org",
"homedns.org",
"homeftp.net",
"homeftp.org",
"homeip.net",
"homelinux.com",
"homelinux.net",
"homelinux.org",
"homeunix.com",
"homeunix.net",
"homeunix.org",
"iamallama.com",
"in-the-band.net",
"is-a-anarchist.com",
"is-a-blogger.com",
"is-a-bookkeeper.com",
"is-a-bruinsfan.org",
"is-a-bulls-fan.com",
"is-a-candidate.org",
"is-a-caterer.com",
"is-a-celticsfan.org",
"is-a-chef.com",
"is-a-chef.net",
"is-a-chef.org",
"is-a-conservative.com",
"is-a-cpa.com",
"is-a-cubicle-slave.com",
"is-a-democrat.com",
"is-a-designer.com",
"is-a-doctor.com",
"is-a-financialadvisor.com",
"is-a-geek.com",
"is-a-geek.net",
"is-a-geek.org",
"is-a-green.com",
"is-a-guru.com",
"is-a-hard-worker.com",
"is-a-hunter.com",
"is-a-knight.org",
"is-a-landscaper.com",
"is-a-lawyer.com",
"is-a-liberal.com",
"is-a-libertarian.com",
"is-a-linux-user.org",
"is-a-llama.com",
"is-a-musician.com",
"is-a-nascarfan.com",
"is-a-nurse.com",
"is-a-painter.com",
"is-a-patsfan.org",
"is-a-personaltrainer.com",
"is-a-photographer.com",
"is-a-player.com",
"is-a-republican.com",
"is-a-rockstar.com",
"is-a-socialist.com",
"is-a-soxfan.org",
"is-a-student.com",
"is-a-teacher.com",
"is-a-techie.com",
"is-a-therapist.com",
"is-an-accountant.com",
"is-an-actor.com",
"is-an-actress.com",
"is-an-anarchist.com",
"is-an-artist.com",
"is-an-engineer.com",
"is-an-entertainer.com",
"is-by.us",
"is-certified.com",
"is-found.org",
"is-gone.com",
"is-into-anime.com",
"is-into-cars.com",
"is-into-cartoons.com",
"is-into-games.com",
"is-leet.com",
"is-lost.org",
"is-not-certified.com",
"is-saved.org",
"is-slick.com",
"is-uberleet.com",
"is-very-bad.org",
"is-very-evil.org",
"is-very-good.org",
"is-very-nice.org",
"is-very-sweet.org",
"is-with-theband.com",
"isa-geek.com",
"isa-geek.net",
"isa-geek.org",
"isa-hockeynut.com",
"issmarterthanyou.com",
"isteingeek.de",
"istmein.de",
"kicks-ass.net",
"kicks-ass.org",
"knowsitall.info",
"land-4-sale.us",
"lebtimnetz.de",
"leitungsen.de",
"likes-pie.com",
"likescandy.com",
"merseine.nu",
"mine.nu",
"misconfused.org",
"mypets.ws",
"myphotos.cc",
"neat-url.com",
"office-on-the.net",
"on-the-web.tv",
"podzone.net",
"podzone.org",
"readmyblog.org",
"saves-the-whales.com",
"scrapper-site.net",
"scrapping.cc",
"selfip.biz",
"selfip.com",
"selfip.info",
"selfip.net",
"selfip.org",
"sells-for-less.com",
"sells-for-u.com",
"sells-it.net",
"sellsyourhome.org",
"servebbs.com",
"servebbs.net",
"servebbs.org",
"serveftp.net",
"serveftp.org",
"servegame.org",
"shacknet.nu",
"simple-url.com",
"space-to-rent.com",
"stuff-4-sale.org",
"stuff-4-sale.us",
"teaches-yoga.com",
"thruhere.net",
"traeumtgerade.de",
"webhop.biz",
"webhop.info",
"webhop.net",
"webhop.org",
"worse-than.tv",
"writesthisblog.com",
"ddnss.de",
"dyn.ddnss.de",
"dyndns.ddnss.de",
"dyndns1.de",
"dyn-ip24.de",
"home-webserver.de",
"dyn.home-webserver.de",
"myhome-server.de",
"ddnss.org",
"definima.net",
"definima.io",
"ondigitalocean.app",
"*.digitaloceanspaces.com",
"bci.dnstrace.pro",
"ddnsfree.com",
"ddnsgeek.com",
"giize.com",
"gleeze.com",
"kozow.com",
"loseyourip.com",
"ooguy.com",
"theworkpc.com",
"casacam.net",
"dynu.net",
"accesscam.org",
"camdvr.org",
"freeddns.org",
"mywire.org",
"webredirect.org",
"myddns.rocks",
"blogsite.xyz",
"dynv6.net",
"e4.cz",
"eero.online",
"eero-stage.online",
"elementor.cloud",
"elementor.cool",
"en-root.fr",
"mytuleap.com",
"tuleap-partners.com",
"encr.app",
"encoreapi.com",
"onred.one",
"staging.onred.one",
"eu.encoway.cloud",
"eu.org",
"al.eu.org",
"asso.eu.org",
"at.eu.org",
"au.eu.org",
"be.eu.org",
"bg.eu.org",
"ca.eu.org",
"cd.eu.org",
"ch.eu.org",
"cn.eu.org",
"cy.eu.org",
"cz.eu.org",
"de.eu.org",
"dk.eu.org",
"edu.eu.org",
"ee.eu.org",
"es.eu.org",
"fi.eu.org",
"fr.eu.org",
"gr.eu.org",
"hr.eu.org",
"hu.eu.org",
"ie.eu.org",
"il.eu.org",
"in.eu.org",
"int.eu.org",
"is.eu.org",
"it.eu.org",
"jp.eu.org",
"kr.eu.org",
"lt.eu.org",
"lu.eu.org",
"lv.eu.org",
"mc.eu.org",
"me.eu.org",
"mk.eu.org",
"mt.eu.org",
"my.eu.org",
"net.eu.org",
"ng.eu.org",
"nl.eu.org",
"no.eu.org",
"nz.eu.org",
"paris.eu.org",
"pl.eu.org",
"pt.eu.org",
"q-a.eu.org",
"ro.eu.org",
"ru.eu.org",
"se.eu.org",
"si.eu.org",
"sk.eu.org",
"tr.eu.org",
"uk.eu.org",
"us.eu.org",
"eurodir.ru",
"eu-1.evennode.com",
"eu-2.evennode.com",
"eu-3.evennode.com",
"eu-4.evennode.com",
"us-1.evennode.com",
"us-2.evennode.com",
"us-3.evennode.com",
"us-4.evennode.com",
"twmail.cc",
"twmail.net",
"twmail.org",
"mymailer.com.tw",
"url.tw",
"onfabrica.com",
"apps.fbsbx.com",
"ru.net",
"adygeya.ru",
"bashkiria.ru",
"bir.ru",
"cbg.ru",
"com.ru",
"dagestan.ru",
"grozny.ru",
"kalmykia.ru",
"kustanai.ru",
"marine.ru",
"mordovia.ru",
"msk.ru",
"mytis.ru",
"nalchik.ru",
"nov.ru",
"pyatigorsk.ru",
"spb.ru",
"vladikavkaz.ru",
"vladimir.ru",
"abkhazia.su",
"adygeya.su",
"aktyubinsk.su",
"arkhangelsk.su",
"armenia.su",
"ashgabad.su",
"azerbaijan.su",
"balashov.su",
"bashkiria.su",
"bryansk.su",
"bukhara.su",
"chimkent.su",
"dagestan.su",
"east-kazakhstan.su",
"exnet.su",
"georgia.su",
"grozny.su",
"ivanovo.su",
"jambyl.su",
"kalmykia.su",
"kaluga.su",
"karacol.su",
"karaganda.su",
"karelia.su",
"khakassia.su",
"krasnodar.su",
"kurgan.su",
"kustanai.su",
"lenug.su",
"mangyshlak.su",
"mordovia.su",
"msk.su",
"murmansk.su",
"nalchik.su",
"navoi.su",
"north-kazakhstan.su",
"nov.su",
"obninsk.su",
"penza.su",
"pokrovsk.su",
"sochi.su",
"spb.su",
"tashkent.su",
"termez.su",
"togliatti.su",
"troitsk.su",
"tselinograd.su",
"tula.su",
"tuva.su",
"vladikavkaz.su",
"vladimir.su",
"vologda.su",
"channelsdvr.net",
"u.channelsdvr.net",
"edgecompute.app",
"fastly-terrarium.com",
"fastlylb.net",
"map.fastlylb.net",
"freetls.fastly.net",
"map.fastly.net",
"a.prod.fastly.net",
"global.prod.fastly.net",
"a.ssl.fastly.net",
"b.ssl.fastly.net",
"global.ssl.fastly.net",
"fastvps-server.com",
"fastvps.host",
"myfast.host",
"fastvps.site",
"myfast.space",
"fedorainfracloud.org",
"fedorapeople.org",
"cloud.fedoraproject.org",
"app.os.fedoraproject.org",
"app.os.stg.fedoraproject.org",
"conn.uk",
"copro.uk",
"hosp.uk",
"mydobiss.com",
"fh-muenster.io",
"filegear.me",
"filegear-au.me",
"filegear-de.me",
"filegear-gb.me",
"filegear-ie.me",
"filegear-jp.me",
"filegear-sg.me",
"firebaseapp.com",
"fireweb.app",
"flap.id",
"onflashdrive.app",
"fldrv.com",
"fly.dev",
"edgeapp.net",
"shw.io",
"flynnhosting.net",
"forgeblocks.com",
"id.forgerock.io",
"framer.app",
"framercanvas.com",
"*.frusky.de",
"ravpage.co.il",
"0e.vc",
"freebox-os.com",
"freeboxos.com",
"fbx-os.fr",
"fbxos.fr",
"freebox-os.fr",
"freeboxos.fr",
"freedesktop.org",
"freemyip.com",
"wien.funkfeuer.at",
"*.futurecms.at",
"*.ex.futurecms.at",
"*.in.futurecms.at",
"futurehosting.at",
"futuremailing.at",
"*.ex.ortsinfo.at",
"*.kunden.ortsinfo.at",
"*.statics.cloud",
"independent-commission.uk",
"independent-inquest.uk",
"independent-inquiry.uk",
"independent-panel.uk",
"independent-review.uk",
"public-inquiry.uk",
"royal-commission.uk",
"campaign.gov.uk",
"service.gov.uk",
"api.gov.uk",
"gehirn.ne.jp",
"usercontent.jp",
"gentapps.com",
"gentlentapis.com",
"lab.ms",
"cdn-edges.net",
"ghost.io",
"gsj.bz",
"githubusercontent.com",
"githubpreview.dev",
"github.io",
"gitlab.io",
"gitapp.si",
"gitpage.si",
"glitch.me",
"nog.community",
"co.ro",
"shop.ro",
"lolipop.io",
"angry.jp",
"babyblue.jp",
"babymilk.jp",
"backdrop.jp",
"bambina.jp",
"bitter.jp",
"blush.jp",
"boo.jp",
"boy.jp",
"boyfriend.jp",
"but.jp",
"candypop.jp",
"capoo.jp",
"catfood.jp",
"cheap.jp",
"chicappa.jp",
"chillout.jp",
"chips.jp",
"chowder.jp",
"chu.jp",
"ciao.jp",
"cocotte.jp",
"coolblog.jp",
"cranky.jp",
"cutegirl.jp",
"daa.jp",
"deca.jp",
"deci.jp",
"digick.jp",
"egoism.jp",
"fakefur.jp",
"fem.jp",
"flier.jp",
"floppy.jp",
"fool.jp",
"frenchkiss.jp",
"girlfriend.jp",
"girly.jp",
"gloomy.jp",
"gonna.jp",
"greater.jp",
"hacca.jp",
"heavy.jp",
"her.jp",
"hiho.jp",
"hippy.jp",
"holy.jp",
"hungry.jp",
"icurus.jp",
"itigo.jp",
"jellybean.jp",
"kikirara.jp",
"kill.jp",
"kilo.jp",
"kuron.jp",
"littlestar.jp",
"lolipopmc.jp",
"lolitapunk.jp",
"lomo.jp",
"lovepop.jp",
"lovesick.jp",
"main.jp",
"mods.jp",
"mond.jp",
"mongolian.jp",
"moo.jp",
"namaste.jp",
"nikita.jp",
"nobushi.jp",
"noor.jp",
"oops.jp",
"parallel.jp",
"parasite.jp",
"pecori.jp",
"peewee.jp",
"penne.jp",
"pepper.jp",
"perma.jp",
"pigboat.jp",
"pinoko.jp",
"punyu.jp",
"pupu.jp",
"pussycat.jp",
"pya.jp",
"raindrop.jp",
"readymade.jp",
"sadist.jp",
"schoolbus.jp",
"secret.jp",
"staba.jp",
"stripper.jp",
"sub.jp",
"sunnyday.jp",
"thick.jp",
"tonkotsu.jp",
"under.jp",
"upper.jp",
"velvet.jp",
"verse.jp",
"versus.jp",
"vivian.jp",
"watson.jp",
"weblike.jp",
"whitesnow.jp",
"zombie.jp",
"heteml.net",
"cloudapps.digital",
"london.cloudapps.digital",
"pymnt.uk",
"homeoffice.gov.uk",
"ro.im",
"goip.de",
"run.app",
"a.run.app",
"web.app",
"*.0emm.com",
"appspot.com",
"*.r.appspot.com",
"codespot.com",
"googleapis.com",
"googlecode.com",
"pagespeedmobilizer.com",
"publishproxy.com",
"withgoogle.com",
"withyoutube.com",
"*.gateway.dev",
"cloud.goog",
"translate.goog",
"*.usercontent.goog",
"cloudfunctions.net",
"blogspot.ae",
"blogspot.al",
"blogspot.am",
"blogspot.ba",
"blogspot.be",
"blogspot.bg",
"blogspot.bj",
"blogspot.ca",
"blogspot.cf",
"blogspot.ch",
"blogspot.cl",
"blogspot.co.at",
"blogspot.co.id",
"blogspot.co.il",
"blogspot.co.ke",
"blogspot.co.nz",
"blogspot.co.uk",
"blogspot.co.za",
"blogspot.com",
"blogspot.com.ar",
"blogspot.com.au",
"blogspot.com.br",
"blogspot.com.by",
"blogspot.com.co",
"blogspot.com.cy",
"blogspot.com.ee",
"blogspot.com.eg",
"blogspot.com.es",
"blogspot.com.mt",
"blogspot.com.ng",
"blogspot.com.tr",
"blogspot.com.uy",
"blogspot.cv",
"blogspot.cz",
"blogspot.de",
"blogspot.dk",
"blogspot.fi",
"blogspot.fr",
"blogspot.gr",
"blogspot.hk",
"blogspot.hr",
"blogspot.hu",
"blogspot.ie",
"blogspot.in",
"blogspot.is",
"blogspot.it",
"blogspot.jp",
"blogspot.kr",
"blogspot.li",
"blogspot.lt",
"blogspot.lu",
"blogspot.md",
"blogspot.mk",
"blogspot.mr",
"blogspot.mx",
"blogspot.my",
"blogspot.nl",
"blogspot.no",
"blogspot.pe",
"blogspot.pt",
"blogspot.qa",
"blogspot.re",
"blogspot.ro",
"blogspot.rs",
"blogspot.ru",
"blogspot.se",
"blogspot.sg",
"blogspot.si",
"blogspot.sk",
"blogspot.sn",
"blogspot.td",
"blogspot.tw",
"blogspot.ug",
"blogspot.vn",
"goupile.fr",
"gov.nl",
"awsmppl.com",
"günstigbestellen.de",
"günstigliefern.de",
"fin.ci",
"free.hr",
"caa.li",
"ua.rs",
"conf.se",
"hs.zone",
"hs.run",
"hashbang.sh",
"hasura.app",
"hasura-app.io",
"pages.it.hs-heilbronn.de",
"hepforge.org",
"herokuapp.com",
"herokussl.com",
"ravendb.cloud",
"myravendb.com",
"ravendb.community",
"ravendb.me",
"development.run",
"ravendb.run",
"homesklep.pl",
"secaas.hk",
"hoplix.shop",
"orx.biz",
"biz.gl",
"col.ng",
"firm.ng",
"gen.ng",
"ltd.ng",
"ngo.ng",
"edu.scot",
"sch.so",
"hostyhosting.io",
"häkkinen.fi",
"*.moonscale.io",
"moonscale.net",
"iki.fi",
"ibxos.it",
"iliadboxos.it",
"impertrixcdn.com",
"impertrix.com",
"smushcdn.com",
"wphostedmail.com",
"wpmucdn.com",
"tempurl.host",
"wpmudev.host",
"dyn-berlin.de",
"in-berlin.de",
"in-brb.de",
"in-butter.de",
"in-dsl.de",
"in-dsl.net",
"in-dsl.org",
"in-vpn.de",
"in-vpn.net",
"in-vpn.org",
"biz.at",
"info.at",
"info.cx",
"ac.leg.br",
"al.leg.br",
"am.leg.br",
"ap.leg.br",
"ba.leg.br",
"ce.leg.br",
"df.leg.br",
"es.leg.br",
"go.leg.br",
"ma.leg.br",
"mg.leg.br",
"ms.leg.br",
"mt.leg.br",
"pa.leg.br",
"pb.leg.br",
"pe.leg.br",
"pi.leg.br",
"pr.leg.br",
"rj.leg.br",
"rn.leg.br",
"ro.leg.br",
"rr.leg.br",
"rs.leg.br",
"sc.leg.br",
"se.leg.br",
"sp.leg.br",
"to.leg.br",
"pixolino.com",
"na4u.ru",
"iopsys.se",
"ipifony.net",
"iservschule.de",
"mein-iserv.de",
"schulplattform.de",
"schulserver.de",
"test-iserv.de",
"iserv.dev",
"iobb.net",
"mel.cloudlets.com.au",
"cloud.interhostsolutions.be",
"users.scale.virtualcloud.com.br",
"mycloud.by",
"alp1.ae.flow.ch",
"appengine.flow.ch",
"es-1.axarnet.cloud",
"diadem.cloud",
"vip.jelastic.cloud",
"jele.cloud",
"it1.eur.aruba.jenv-aruba.cloud",
"it1.jenv-aruba.cloud",
"keliweb.cloud",
"cs.keliweb.cloud",
"oxa.cloud",
"tn.oxa.cloud",
"uk.oxa.cloud",
"primetel.cloud",
"uk.primetel.cloud",
"ca.reclaim.cloud",
"uk.reclaim.cloud",
"us.reclaim.cloud",
"ch.trendhosting.cloud",
"de.trendhosting.cloud",
"jele.club",
"amscompute.com",
"clicketcloud.com",
"dopaas.com",
"hidora.com",
"paas.hosted-by-previder.com",
"rag-cloud.hosteur.com",
"rag-cloud-ch.hosteur.com",
"jcloud.ik-server.com",
"jcloud-ver-jpc.ik-server.com",
"demo.jelastic.com",
"kilatiron.com",
"paas.massivegrid.com",
"jed.wafaicloud.com",
"lon.wafaicloud.com",
"ryd.wafaicloud.com",
"j.scaleforce.com.cy",
"jelastic.dogado.eu",
"fi.cloudplatform.fi",
"demo.datacenter.fi",
"paas.datacenter.fi",
"jele.host",
"mircloud.host",
"paas.beebyte.io",
"sekd1.beebyteapp.io",
"jele.io",
"cloud-fr1.unispace.io",
"jc.neen.it",
"cloud.jelastic.open.tim.it",
"jcloud.kz",
"upaas.kazteleport.kz",
"cloudjiffy.net",
"fra1-de.cloudjiffy.net",
"west1-us.cloudjiffy.net",
"jls-sto1.elastx.net",
"jls-sto2.elastx.net",
"jls-sto3.elastx.net",
"faststacks.net",
"fr-1.paas.massivegrid.net",
"lon-1.paas.massivegrid.net",
"lon-2.paas.massivegrid.net",
"ny-1.paas.massivegrid.net",
"ny-2.paas.massivegrid.net",
"sg-1.paas.massivegrid.net",
"jelastic.saveincloud.net",
"nordeste-idc.saveincloud.net",
"j.scaleforce.net",
"jelastic.tsukaeru.net",
"sdscloud.pl",
"unicloud.pl",
"mircloud.ru",
"jelastic.regruhosting.ru",
"enscaled.sg",
"jele.site",
"jelastic.team",
"orangecloud.tn",
"j.layershift.co.uk",
"phx.enscaled.us",
"mircloud.us",
"myjino.ru",
"*.hosting.myjino.ru",
"*.landing.myjino.ru",
"*.spectrum.myjino.ru",
"*.vps.myjino.ru",
"jotelulu.cloud",
"*.triton.zone",
"*.cns.joyent.com",
"js.org",
"kaas.gg",
"khplay.nl",
"ktistory.com",
"kapsi.fi",
"keymachine.de",
"kinghost.net",
"uni5.net",
"knightpoint.systems",
"koobin.events",
"oya.to",
"kuleuven.cloud",
"ezproxy.kuleuven.be",
"co.krd",
"edu.krd",
"krellian.net",
"webthings.io",
"git-repos.de",
"lcube-server.de",
"svn-repos.de",
"leadpages.co",
"lpages.co",
"lpusercontent.com",
"lelux.site",
"co.business",
"co.education",
"co.events",
"co.financial",
"co.network",
"co.place",
"co.technology",
"app.lmpm.com",
"linkyard.cloud",
"linkyard-cloud.ch",
"members.linode.com",
"*.nodebalancer.linode.com",
"*.linodeobjects.com",
"ip.linodeusercontent.com",
"we.bs",
"*.user.localcert.dev",
"localzone.xyz",
"loginline.app",
"loginline.dev",
"loginline.io",
"loginline.services",
"loginline.site",
"servers.run",
"lohmus.me",
"krasnik.pl",
"leczna.pl",
"lubartow.pl",
"lublin.pl",
"poniatowa.pl",
"swidnik.pl",
"glug.org.uk",
"lug.org.uk",
"lugs.org.uk",
"barsy.bg",
"barsy.co.uk",
"barsyonline.co.uk",
"barsycenter.com",
"barsyonline.com",
"barsy.club",
"barsy.de",
"barsy.eu",
"barsy.in",
"barsy.info",
"barsy.io",
"barsy.me",
"barsy.menu",
"barsy.mobi",
"barsy.net",
"barsy.online",
"barsy.org",
"barsy.pro",
"barsy.pub",
"barsy.ro",
"barsy.shop",
"barsy.site",
"barsy.support",
"barsy.uk",
"*.magentosite.cloud",
"mayfirst.info",
"mayfirst.org",
"hb.cldmail.ru",
"cn.vu",
"mazeplay.com",
"mcpe.me",
"mcdir.me",
"mcdir.ru",
"mcpre.ru",
"vps.mcdir.ru",
"mediatech.by",
"mediatech.dev",
"hra.health",
"miniserver.com",
"memset.net",
"messerli.app",
"*.cloud.metacentrum.cz",
"custom.metacentrum.cz",
"flt.cloud.muni.cz",
"usr.cloud.muni.cz",
"meteorapp.com",
"eu.meteorapp.com",
"co.pl",
"*.azurecontainer.io",
"azurewebsites.net",
"azure-mobile.net",
"cloudapp.net",
"azurestaticapps.net",
"1.azurestaticapps.net",
"centralus.azurestaticapps.net",
"eastasia.azurestaticapps.net",
"eastus2.azurestaticapps.net",
"westeurope.azurestaticapps.net",
"westus2.azurestaticapps.net",
"csx.cc",
"mintere.site",
"forte.id",
"mozilla-iot.org",
"bmoattachments.org",
"net.ru",
"org.ru",
"pp.ru",
"hostedpi.com",
"customer.mythic-beasts.com",
"caracal.mythic-beasts.com",
"fentiger.mythic-beasts.com",
"lynx.mythic-beasts.com",
"ocelot.mythic-beasts.com",
"oncilla.mythic-beasts.com",
"onza.mythic-beasts.com",
"sphinx.mythic-beasts.com",
"vs.mythic-beasts.com",
"x.mythic-beasts.com",
"yali.mythic-beasts.com",
"cust.retrosnub.co.uk",
"ui.nabu.casa",
"pony.club",
"of.fashion",
"in.london",
"of.london",
"from.marketing",
"with.marketing",
"for.men",
"repair.men",
"and.mom",
"for.mom",
"for.one",
"under.one",
"for.sale",
"that.win",
"from.work",
"to.work",
"cloud.nospamproxy.com",
"netlify.app",
"4u.com",
"ngrok.io",
"nh-serv.co.uk",
"nfshost.com",
"*.developer.app",
"noop.app",
"*.northflank.app",
"*.build.run",
"*.code.run",
"*.database.run",
"*.migration.run",
"noticeable.news",
"dnsking.ch",
"mypi.co",
"n4t.co",
"001www.com",
"ddnslive.com",
"myiphost.com",
"forumz.info",
"16-b.it",
"32-b.it",
"64-b.it",
"soundcast.me",
"tcp4.me",
"dnsup.net",
"hicam.net",
"now-dns.net",
"ownip.net",
"vpndns.net",
"dynserv.org",
"now-dns.org",
"x443.pw",
"now-dns.top",
"ntdll.top",
"freeddns.us",
"crafting.xyz",
"zapto.xyz",
"nsupdate.info",
"nerdpol.ovh",
"blogsyte.com",
"brasilia.me",
"cable-modem.org",
"ciscofreak.com",
"collegefan.org",
"couchpotatofries.org",
"damnserver.com",
"ddns.me",
"ditchyourip.com",
"dnsfor.me",
"dnsiskinky.com",
"dvrcam.info",
"dynns.com",
"eating-organic.net",
"fantasyleague.cc",
"geekgalaxy.com",
"golffan.us",
"health-carereform.com",
"homesecuritymac.com",
"homesecuritypc.com",
"hopto.me",
"ilovecollege.info",
"loginto.me",
"mlbfan.org",
"mmafan.biz",
"myactivedirectory.com",
"mydissent.net",
"myeffect.net",
"mymediapc.net",
"mypsx.net",
"mysecuritycamera.com",
"mysecuritycamera.net",
"mysecuritycamera.org",
"net-freaks.com",
"nflfan.org",
"nhlfan.net",
"no-ip.ca",
"no-ip.co.uk",
"no-ip.net",
"noip.us",
"onthewifi.com",
"pgafan.net",
"point2this.com",
"pointto.us",
"privatizehealthinsurance.net",
"quicksytes.com",
"read-books.org",
"securitytactics.com",
"serveexchange.com",
"servehumour.com",
"servep2p.com",
"servesarcasm.com",
"stufftoread.com",
"ufcfan.org",
"unusualperson.com",
"workisboring.com",
"3utilities.com",
"bounceme.net",
"ddns.net",
"ddnsking.com",
"gotdns.ch",
"hopto.org",
"myftp.biz",
"myftp.org",
"myvnc.com",
"no-ip.biz",
"no-ip.info",
"no-ip.org",
"noip.me",
"redirectme.net",
"servebeer.com",
"serveblog.net",
"servecounterstrike.com",
"serveftp.com",
"servegame.com",
"servehalflife.com",
"servehttp.com",
"serveirc.com",
"serveminecraft.net",
"servemp3.com",
"servepics.com",
"servequake.com",
"sytes.net",
"webhop.me",
"zapto.org",
"stage.nodeart.io",
"pcloud.host",
"nyc.mn",
"static.observableusercontent.com",
"cya.gg",
"omg.lol",
"cloudycluster.net",
"omniwe.site",
"service.one",
"nid.io",
"opensocial.site",
"opencraft.hosting",
"orsites.com",
"operaunite.com",
"tech.orange",
"authgear-staging.com",
"authgearapps.com",
"skygearapp.com",
"outsystemscloud.com",
"*.webpaas.ovh.net",
"*.hosting.ovh.net",
"ownprovider.com",
"own.pm",
"*.owo.codes",
"ox.rs",
"oy.lc",
"pgfog.com",
"pagefrontapp.com",
"pagexl.com",
"*.paywhirl.com",
"bar0.net",
"bar1.net",
"bar2.net",
"rdv.to",
"art.pl",
"gliwice.pl",
"krakow.pl",
"poznan.pl",
"wroc.pl",
"zakopane.pl",
"pantheonsite.io",
"gotpantheon.com",
"mypep.link",
"perspecta.cloud",
"lk3.ru",
"on-web.fr",
"bc.platform.sh",
"ent.platform.sh",
"eu.platform.sh",
"us.platform.sh",
"*.platformsh.site",
"*.tst.site",
"platter-app.com",
"platter-app.dev",
"platterp.us",
"pdns.page",
"plesk.page",
"pleskns.com",
"dyn53.io",
"onporter.run",
"co.bn",
"postman-echo.com",
"pstmn.io",
"mock.pstmn.io",
"httpbin.org",
"prequalifyme.today",
"xen.prgmr.com",
"priv.at",
"prvcy.page",
"*.dweb.link",
"protonet.io",
"chirurgiens-dentistes-en-france.fr",
"byen.site",
"pubtls.org",
"pythonanywhere.com",
"eu.pythonanywhere.com",
"qoto.io",
"qualifioapp.com",
"qbuser.com",
"cloudsite.builders",
"instances.spawn.cc",
"instantcloud.cn",
"ras.ru",
"qa2.com",
"qcx.io",
"*.sys.qcx.io",
"dev-myqnapcloud.com",
"alpha-myqnapcloud.com",
"myqnapcloud.com",
"*.quipelements.com",
"vapor.cloud",
"vaporcloud.io",
"rackmaze.com",
"rackmaze.net",
"g.vbrplsbx.io",
"*.on-k3s.io",
"*.on-rancher.cloud",
"*.on-rio.io",
"readthedocs.io",
"rhcloud.com",
"app.render.com",
"onrender.com",
"repl.co",
"id.repl.co",
"repl.run",
"resindevice.io",
"devices.resinstaging.io",
"hzc.io",
"wellbeingzone.eu",
"wellbeingzone.co.uk",
"adimo.co.uk",
"itcouldbewor.se",
"git-pages.rit.edu",
"rocky.page",
"биз.рус",
"ком.рус",
"крым.рус",
"мир.рус",
"мск.рус",
"орг.рус",
"самара.рус",
"сочи.рус",
"спб.рус",
"я.рус",
"*.builder.code.com",
"*.dev-builder.code.com",
"*.stg-builder.code.com",
"sandcats.io",
"logoip.de",
"logoip.com",
"fr-par-1.baremetal.scw.cloud",
"fr-par-2.baremetal.scw.cloud",
"nl-ams-1.baremetal.scw.cloud",
"fnc.fr-par.scw.cloud",
"functions.fnc.fr-par.scw.cloud",
"k8s.fr-par.scw.cloud",
"nodes.k8s.fr-par.scw.cloud",
"s3.fr-par.scw.cloud",
"s3-website.fr-par.scw.cloud",
"whm.fr-par.scw.cloud",
"priv.instances.scw.cloud",
"pub.instances.scw.cloud",
"k8s.scw.cloud",
"k8s.nl-ams.scw.cloud",
"nodes.k8s.nl-ams.scw.cloud",
"s3.nl-ams.scw.cloud",
"s3-website.nl-ams.scw.cloud",
"whm.nl-ams.scw.cloud",
"k8s.pl-waw.scw.cloud",
"nodes.k8s.pl-waw.scw.cloud",
"s3.pl-waw.scw.cloud",
"s3-website.pl-waw.scw.cloud",
"scalebook.scw.cloud",
"smartlabeling.scw.cloud",
"dedibox.fr",
"schokokeks.net",
"gov.scot",
"service.gov.scot",
"scrysec.com",
"firewall-gateway.com",
"firewall-gateway.de",
"my-gateway.de",
"my-router.de",
"spdns.de",
"spdns.eu",
"firewall-gateway.net",
"my-firewall.org",
"myfirewall.org",
"spdns.org",
"seidat.net",
"sellfy.store",
"senseering.net",
"minisite.ms",
"magnet.page",
"biz.ua",
"co.ua",
"pp.ua",
"shiftcrypto.dev",
"shiftcrypto.io",
"shiftedit.io",
"myshopblocks.com",
"myshopify.com",
"shopitsite.com",
"shopware.store",
"mo-siemens.io",
"1kapp.com",
"appchizi.com",
"applinzi.com",
"sinaapp.com",
"vipsinaapp.com",
"siteleaf.net",
"bounty-full.com",
"alpha.bounty-full.com",
"beta.bounty-full.com",
"small-web.org",
"vp4.me",
"try-snowplow.com",
"srht.site",
"stackhero-network.com",
"musician.io",
"novecore.site",
"static.land",
"dev.static.land",
"sites.static.land",
"storebase.store",
"vps-host.net",
"atl.jelastic.vps-host.net",
"njs.jelastic.vps-host.net",
"ric.jelastic.vps-host.net",
"playstation-cloud.com",
"apps.lair.io",
"*.stolos.io",
"spacekit.io",
"customer.speedpartner.de",
"myspreadshop.at",
"myspreadshop.com.au",
"myspreadshop.be",
"myspreadshop.ca",
"myspreadshop.ch",
"myspreadshop.com",
"myspreadshop.de",
"myspreadshop.dk",
"myspreadshop.es",
"myspreadshop.fi",
"myspreadshop.fr",
"myspreadshop.ie",
"myspreadshop.it",
"myspreadshop.net",
"myspreadshop.nl",
"myspreadshop.no",
"myspreadshop.pl",
"myspreadshop.se",
"myspreadshop.co.uk",
"api.stdlib.com",
"storj.farm",
"utwente.io",
"soc.srcf.net",
"user.srcf.net",
"temp-dns.com",
"supabase.co",
"supabase.in",
"supabase.net",
"su.paba.se",
"*.s5y.io",
"*.sensiosite.cloud",
"syncloud.it",
"dscloud.biz",
"direct.quickconnect.cn",
"dsmynas.com",
"familyds.com",
"diskstation.me",
"dscloud.me",
"i234.me",
"myds.me",
"synology.me",
"dscloud.mobi",
"dsmynas.net",
"familyds.net",
"dsmynas.org",
"familyds.org",
"vpnplus.to",
"direct.quickconnect.to",
"tabitorder.co.il",
"taifun-dns.de",
"beta.tailscale.net",
"ts.net",
"gda.pl",
"gdansk.pl",
"gdynia.pl",
"med.pl",
"sopot.pl",
"site.tb-hosting.com",
"edugit.io",
"s3.teckids.org",
"telebit.app",
"telebit.io",
"*.telebit.xyz",
"gwiddle.co.uk",
"*.firenet.ch",
"*.svc.firenet.ch",
"reservd.com",
"thingdustdata.com",
"cust.dev.thingdust.io",
"cust.disrec.thingdust.io",
"cust.prod.thingdust.io",
"cust.testing.thingdust.io",
"reservd.dev.thingdust.io",
"reservd.disrec.thingdust.io",
"reservd.testing.thingdust.io",
"tickets.io",
"arvo.network",
"azimuth.network",
"tlon.network",
"torproject.net",
"pages.torproject.net",
"bloxcms.com",
"townnews-staging.com",
"tbits.me",
"12hp.at",
"2ix.at",
"4lima.at",
"lima-city.at",
"12hp.ch",
"2ix.ch",
"4lima.ch",
"lima-city.ch",
"trafficplex.cloud",
"de.cool",
"12hp.de",
"2ix.de",
"4lima.de",
"lima-city.de",
"1337.pictures",
"clan.rip",
"lima-city.rocks",
"webspace.rocks",
"lima.zone",
"*.transurl.be",
"*.transurl.eu",
"*.transurl.nl",
"site.transip.me",
"tuxfamily.org",
"dd-dns.de",
"diskstation.eu",
"diskstation.org",
"dray-dns.de",
"draydns.de",
"dyn-vpn.de",
"dynvpn.de",
"mein-vigor.de",
"my-vigor.de",
"my-wan.de",
"syno-ds.de",
"synology-diskstation.de",
"synology-ds.de",
"typedream.app",
"pro.typeform.com",
"uber.space",
"*.uberspace.de",
"hk.com",
"hk.org",
"ltd.hk",
"inc.hk",
"name.pm",
"sch.tf",
"biz.wf",
"sch.wf",
"org.yt",
"virtualuser.de",
"virtual-user.de",
"upli.io",
"urown.cloud",
"dnsupdate.info",
"lib.de.us",
"2038.io",
"vercel.app",
"vercel.dev",
"now.sh",
"router.management",
"v-info.info",
"voorloper.cloud",
"neko.am",
"nyaa.am",
"be.ax",
"cat.ax",
"es.ax",
"eu.ax",
"gg.ax",
"mc.ax",
"us.ax",
"xy.ax",
"nl.ci",
"xx.gl",
"app.gp",
"blog.gt",
"de.gt",
"to.gt",
"be.gy",
"cc.hn",
"blog.kg",
"io.kg",
"jp.kg",
"tv.kg",
"uk.kg",
"us.kg",
"de.ls",
"at.md",
"de.md",
"jp.md",
"to.md",
"indie.porn",
"vxl.sh",
"ch.tc",
"me.tc",
"we.tc",
"nyan.to",
"at.vg",
"blog.vu",
"dev.vu",
"me.vu",
"v.ua",
"*.vultrobjects.com",
"wafflecell.com",
"*.webhare.dev",
"reserve-online.net",
"reserve-online.com",
"bookonline.app",
"hotelwithflight.com",
"wedeploy.io",
"wedeploy.me",
"wedeploy.sh",
"remotewd.com",
"pages.wiardweb.com",
"wmflabs.org",
"toolforge.org",
"wmcloud.org",
"panel.gg",
"daemon.panel.gg",
"messwithdns.com",
"woltlab-demo.com",
"myforum.community",
"community-pro.de",
"diskussionsbereich.de",
"community-pro.net",
"meinforum.net",
"affinitylottery.org.uk",
"raffleentry.org.uk",
"weeklylottery.org.uk",
"wpenginepowered.com",
"js.wpenginepowered.com",
"wixsite.com",
"editorx.io",
"half.host",
"xnbay.com",
"u2.xnbay.com",
"u2-local.xnbay.com",
"cistron.nl",
"demon.nl",
"xs4all.space",
"yandexcloud.net",
"storage.yandexcloud.net",
"website.yandexcloud.net",
"official.academy",
"yolasite.com",
"ybo.faith",
"yombo.me",
"homelink.one",
"ybo.party",
"ybo.review",
"ybo.science",
"ybo.trade",
"ynh.fr",
"nohost.me",
"noho.st",
"za.net",
"za.org",
"bss.design",
"basicserver.io",
"virtualserver.io",
"enterprisecloud.nu"
]
},{}],91:[function(require,module,exports){
/*eslint no-var:0, prefer-arrow-callback: 0, object-shorthand: 0 */
'use strict';


var Punycode = require('punycode');


var internals = {};


//
// Read rules from file.
//
internals.rules = require('./data/rules.json').map(function (rule) {

  return {
    rule: rule,
    suffix: rule.replace(/^(\*\.|\!)/, ''),
    punySuffix: -1,
    wildcard: rule.charAt(0) === '*',
    exception: rule.charAt(0) === '!'
  };
});


//
// Check is given string ends with `suffix`.
//
internals.endsWith = function (str, suffix) {

  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};


//
// Find rule for a given domain.
//
internals.findRule = function (domain) {

  var punyDomain = Punycode.toASCII(domain);
  return internals.rules.reduce(function (memo, rule) {

    if (rule.punySuffix === -1){
      rule.punySuffix = Punycode.toASCII(rule.suffix);
    }
    if (!internals.endsWith(punyDomain, '.' + rule.punySuffix) && punyDomain !== rule.punySuffix) {
      return memo;
    }
    // This has been commented out as it never seems to run. This is because
    // sub tlds always appear after their parents and we never find a shorter
    // match.
    //if (memo) {
    //  var memoSuffix = Punycode.toASCII(memo.suffix);
    //  if (memoSuffix.length >= punySuffix.length) {
    //    return memo;
    //  }
    //}
    return rule;
  }, null);
};


//
// Error codes and messages.
//
exports.errorCodes = {
  DOMAIN_TOO_SHORT: 'Domain name too short.',
  DOMAIN_TOO_LONG: 'Domain name too long. It should be no more than 255 chars.',
  LABEL_STARTS_WITH_DASH: 'Domain name label can not start with a dash.',
  LABEL_ENDS_WITH_DASH: 'Domain name label can not end with a dash.',
  LABEL_TOO_LONG: 'Domain name label should be at most 63 chars long.',
  LABEL_TOO_SHORT: 'Domain name label should be at least 1 character long.',
  LABEL_INVALID_CHARS: 'Domain name label can only contain alphanumeric characters or dashes.'
};


//
// Validate domain name and throw if not valid.
//
// From wikipedia:
//
// Hostnames are composed of series of labels concatenated with dots, as are all
// domain names. Each label must be between 1 and 63 characters long, and the
// entire hostname (including the delimiting dots) has a maximum of 255 chars.
//
// Allowed chars:
//
// * `a-z`
// * `0-9`
// * `-` but not as a starting or ending character
// * `.` as a separator for the textual portions of a domain name
//
// * http://en.wikipedia.org/wiki/Domain_name
// * http://en.wikipedia.org/wiki/Hostname
//
internals.validate = function (input) {

  // Before we can validate we need to take care of IDNs with unicode chars.
  var ascii = Punycode.toASCII(input);

  if (ascii.length < 1) {
    return 'DOMAIN_TOO_SHORT';
  }
  if (ascii.length > 255) {
    return 'DOMAIN_TOO_LONG';
  }

  // Check each part's length and allowed chars.
  var labels = ascii.split('.');
  var label;

  for (var i = 0; i < labels.length; ++i) {
    label = labels[i];
    if (!label.length) {
      return 'LABEL_TOO_SHORT';
    }
    if (label.length > 63) {
      return 'LABEL_TOO_LONG';
    }
    if (label.charAt(0) === '-') {
      return 'LABEL_STARTS_WITH_DASH';
    }
    if (label.charAt(label.length - 1) === '-') {
      return 'LABEL_ENDS_WITH_DASH';
    }
    if (!/^[a-z0-9\-]+$/.test(label)) {
      return 'LABEL_INVALID_CHARS';
    }
  }
};


//
// Public API
//


//
// Parse domain.
//
exports.parse = function (input) {

  if (typeof input !== 'string') {
    throw new TypeError('Domain name must be a string.');
  }

  // Force domain to lowercase.
  var domain = input.slice(0).toLowerCase();

  // Handle FQDN.
  // TODO: Simply remove trailing dot?
  if (domain.charAt(domain.length - 1) === '.') {
    domain = domain.slice(0, domain.length - 1);
  }

  // Validate and sanitise input.
  var error = internals.validate(domain);
  if (error) {
    return {
      input: input,
      error: {
        message: exports.errorCodes[error],
        code: error
      }
    };
  }

  var parsed = {
    input: input,
    tld: null,
    sld: null,
    domain: null,
    subdomain: null,
    listed: false
  };

  var domainParts = domain.split('.');

  // Non-Internet TLD
  if (domainParts[domainParts.length - 1] === 'local') {
    return parsed;
  }

  var handlePunycode = function () {

    if (!/xn--/.test(domain)) {
      return parsed;
    }
    if (parsed.domain) {
      parsed.domain = Punycode.toASCII(parsed.domain);
    }
    if (parsed.subdomain) {
      parsed.subdomain = Punycode.toASCII(parsed.subdomain);
    }
    return parsed;
  };

  var rule = internals.findRule(domain);

  // Unlisted tld.
  if (!rule) {
    if (domainParts.length < 2) {
      return parsed;
    }
    parsed.tld = domainParts.pop();
    parsed.sld = domainParts.pop();
    parsed.domain = [parsed.sld, parsed.tld].join('.');
    if (domainParts.length) {
      parsed.subdomain = domainParts.pop();
    }
    return handlePunycode();
  }

  // At this point we know the public suffix is listed.
  parsed.listed = true;

  var tldParts = rule.suffix.split('.');
  var privateParts = domainParts.slice(0, domainParts.length - tldParts.length);

  if (rule.exception) {
    privateParts.push(tldParts.shift());
  }

  parsed.tld = tldParts.join('.');

  if (!privateParts.length) {
    return handlePunycode();
  }

  if (rule.wildcard) {
    tldParts.unshift(privateParts.pop());
    parsed.tld = tldParts.join('.');
  }

  if (!privateParts.length) {
    return handlePunycode();
  }

  parsed.sld = privateParts.pop();
  parsed.domain = [parsed.sld,  parsed.tld].join('.');

  if (privateParts.length) {
    parsed.subdomain = privateParts.join('.');
  }

  return handlePunycode();
};


//
// Get domain.
//
exports.get = function (domain) {

  if (!domain) {
    return null;
  }
  return exports.parse(domain).domain || null;
};


//
// Check whether domain belongs to a known public suffix.
//
exports.isValid = function (domain) {

  var parsed = exports.parse(domain);
  return Boolean(parsed.domain && parsed.listed);
};

},{"./data/rules.json":90,"punycode":92}],92:[function(require,module,exports){
(function (global){(function (){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],93:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String|Null} The decoded string.
 * @api private
 */
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

/**
 * Attempts to encode a given input.
 *
 * @param {String} input The string that needs to be encoded.
 * @returns {String|Null} The encoded string.
 * @api private
 */
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?#&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    // In the case if failed decoding, we want to omit the key/value pairs
    // from the result.
    //
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      key = encode(key);
      value = encode(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue;
      pairs.push(key +'='+ value);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

},{}],94:[function(require,module,exports){
'use strict';

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};

},{}],95:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');
var define = require('define-data-property');
var hasDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');

var $TypeError = GetIntrinsic('%TypeError%');
var $floor = GetIntrinsic('%Math.floor%');

module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(fn, 'length', length, true, true);
		} else {
			define(fn, 'length', length);
		}
	}
	return fn;
};

},{"define-data-property":70,"get-intrinsic":75,"gopd":76,"has-property-descriptors":77}],96:[function(require,module,exports){
/*!
 * Copyright (c) 2015-2020, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

const punycode = require("punycode/");
const urlParse = require("url-parse");
const pubsuffix = require("./pubsuffix-psl");
const Store = require("./store").Store;
const MemoryCookieStore = require("./memstore").MemoryCookieStore;
const pathMatch = require("./pathMatch").pathMatch;
const validators = require("./validators.js");
const VERSION = require("./version");
const {
  fromCallback
} = require("universalify");
const {
  getCustomInspectSymbol
} = require("./utilHelper");

// From RFC6265 S4.1.1
// note that it excludes \x3B ";"
const COOKIE_OCTETS = /^[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]+$/;
const CONTROL_CHARS = /[\x00-\x1F]/;

// From Chromium // '\r', '\n' and '\0' should be treated as a terminator in
// the "relaxed" mode, see:
// https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/parsed_cookie.cc#L60
const TERMINATORS = ["\n", "\r", "\0"];

// RFC6265 S4.1.1 defines path value as 'any CHAR except CTLs or ";"'
// Note ';' is \x3B
const PATH_VALUE = /[\x20-\x3A\x3C-\x7E]+/;

// date-time parsing constants (RFC6265 S5.1.1)

const DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;
const MONTH_TO_NUM = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
};
const MAX_TIME = 2147483647000; // 31-bit max
const MIN_TIME = 0; // 31-bit min
const SAME_SITE_CONTEXT_VAL_ERR = 'Invalid sameSiteContext option for getCookies(); expected one of "strict", "lax", or "none"';
function checkSameSiteContext(value) {
  validators.validate(validators.isNonEmptyString(value), value);
  const context = String(value).toLowerCase();
  if (context === "none" || context === "lax" || context === "strict") {
    return context;
  } else {
    return null;
  }
}
const PrefixSecurityEnum = Object.freeze({
  SILENT: "silent",
  STRICT: "strict",
  DISABLED: "unsafe-disabled"
});

// Dumped from ip-regex@4.0.0, with the following changes:
// * all capturing groups converted to non-capturing -- "(?:)"
// * support for IPv6 Scoped Literal ("%eth1") removed
// * lowercase hexadecimal only
const IP_REGEX_LOWERCASE = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-f\d]{1,4}:){7}(?:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,2}|:)|(?:[a-f\d]{1,4}:){4}(?:(?::[a-f\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,3}|:)|(?:[a-f\d]{1,4}:){3}(?:(?::[a-f\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,4}|:)|(?:[a-f\d]{1,4}:){2}(?:(?::[a-f\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,5}|:)|(?:[a-f\d]{1,4}:){1}(?:(?::[a-f\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,6}|:)|(?::(?:(?::[a-f\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,7}|:)))$)/;
const IP_V6_REGEX = `
\\[?(?:
(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|
(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|
(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|
(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|
(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:))
)(?:%[0-9a-zA-Z]{1,})?\\]?
`.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
const IP_V6_REGEX_OBJECT = new RegExp(`^${IP_V6_REGEX}$`);

/*
 * Parses a Natural number (i.e., non-negative integer) with either the
 *    <min>*<max>DIGIT ( non-digit *OCTET )
 * or
 *    <min>*<max>DIGIT
 * grammar (RFC6265 S5.1.1).
 *
 * The "trailingOK" boolean controls if the grammar accepts a
 * "( non-digit *OCTET )" trailer.
 */
function parseDigits(token, minDigits, maxDigits, trailingOK) {
  let count = 0;
  while (count < token.length) {
    const c = token.charCodeAt(count);
    // "non-digit = %x00-2F / %x3A-FF"
    if (c <= 0x2f || c >= 0x3a) {
      break;
    }
    count++;
  }

  // constrain to a minimum and maximum number of digits.
  if (count < minDigits || count > maxDigits) {
    return null;
  }
  if (!trailingOK && count != token.length) {
    return null;
  }
  return parseInt(token.substr(0, count), 10);
}
function parseTime(token) {
  const parts = token.split(":");
  const result = [0, 0, 0];

  /* RF6256 S5.1.1:
   *      time            = hms-time ( non-digit *OCTET )
   *      hms-time        = time-field ":" time-field ":" time-field
   *      time-field      = 1*2DIGIT
   */

  if (parts.length !== 3) {
    return null;
  }
  for (let i = 0; i < 3; i++) {
    // "time-field" must be strictly "1*2DIGIT", HOWEVER, "hms-time" can be
    // followed by "( non-digit *OCTET )" so therefore the last time-field can
    // have a trailer
    const trailingOK = i == 2;
    const num = parseDigits(parts[i], 1, 2, trailingOK);
    if (num === null) {
      return null;
    }
    result[i] = num;
  }
  return result;
}
function parseMonth(token) {
  token = String(token).substr(0, 3).toLowerCase();
  const num = MONTH_TO_NUM[token];
  return num >= 0 ? num : null;
}

/*
 * RFC6265 S5.1.1 date parser (see RFC for full grammar)
 */
function parseDate(str) {
  if (!str) {
    return;
  }

  /* RFC6265 S5.1.1:
   * 2. Process each date-token sequentially in the order the date-tokens
   * appear in the cookie-date
   */
  const tokens = str.split(DATE_DELIM);
  if (!tokens) {
    return;
  }
  let hour = null;
  let minute = null;
  let second = null;
  let dayOfMonth = null;
  let month = null;
  let year = null;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    if (!token.length) {
      continue;
    }
    let result;

    /* 2.1. If the found-time flag is not set and the token matches the time
     * production, set the found-time flag and set the hour- value,
     * minute-value, and second-value to the numbers denoted by the digits in
     * the date-token, respectively.  Skip the remaining sub-steps and continue
     * to the next date-token.
     */
    if (second === null) {
      result = parseTime(token);
      if (result) {
        hour = result[0];
        minute = result[1];
        second = result[2];
        continue;
      }
    }

    /* 2.2. If the found-day-of-month flag is not set and the date-token matches
     * the day-of-month production, set the found-day-of- month flag and set
     * the day-of-month-value to the number denoted by the date-token.  Skip
     * the remaining sub-steps and continue to the next date-token.
     */
    if (dayOfMonth === null) {
      // "day-of-month = 1*2DIGIT ( non-digit *OCTET )"
      result = parseDigits(token, 1, 2, true);
      if (result !== null) {
        dayOfMonth = result;
        continue;
      }
    }

    /* 2.3. If the found-month flag is not set and the date-token matches the
     * month production, set the found-month flag and set the month-value to
     * the month denoted by the date-token.  Skip the remaining sub-steps and
     * continue to the next date-token.
     */
    if (month === null) {
      result = parseMonth(token);
      if (result !== null) {
        month = result;
        continue;
      }
    }

    /* 2.4. If the found-year flag is not set and the date-token matches the
     * year production, set the found-year flag and set the year-value to the
     * number denoted by the date-token.  Skip the remaining sub-steps and
     * continue to the next date-token.
     */
    if (year === null) {
      // "year = 2*4DIGIT ( non-digit *OCTET )"
      result = parseDigits(token, 2, 4, true);
      if (result !== null) {
        year = result;
        /* From S5.1.1:
         * 3.  If the year-value is greater than or equal to 70 and less
         * than or equal to 99, increment the year-value by 1900.
         * 4.  If the year-value is greater than or equal to 0 and less
         * than or equal to 69, increment the year-value by 2000.
         */
        if (year >= 70 && year <= 99) {
          year += 1900;
        } else if (year >= 0 && year <= 69) {
          year += 2000;
        }
      }
    }
  }

  /* RFC 6265 S5.1.1
   * "5. Abort these steps and fail to parse the cookie-date if:
   *     *  at least one of the found-day-of-month, found-month, found-
   *        year, or found-time flags is not set,
   *     *  the day-of-month-value is less than 1 or greater than 31,
   *     *  the year-value is less than 1601,
   *     *  the hour-value is greater than 23,
   *     *  the minute-value is greater than 59, or
   *     *  the second-value is greater than 59.
   *     (Note that leap seconds cannot be represented in this syntax.)"
   *
   * So, in order as above:
   */
  if (dayOfMonth === null || month === null || year === null || second === null || dayOfMonth < 1 || dayOfMonth > 31 || year < 1601 || hour > 23 || minute > 59 || second > 59) {
    return;
  }
  return new Date(Date.UTC(year, month, dayOfMonth, hour, minute, second));
}
function formatDate(date) {
  validators.validate(validators.isDate(date), date);
  return date.toUTCString();
}

// S5.1.2 Canonicalized Host Names
function canonicalDomain(str) {
  if (str == null) {
    return null;
  }
  str = str.trim().replace(/^\./, ""); // S4.1.2.3 & S5.2.3: ignore leading .

  if (IP_V6_REGEX_OBJECT.test(str)) {
    str = str.replace("[", "").replace("]", "");
  }

  // convert to IDN if any non-ASCII characters
  if (punycode && /[^\u0001-\u007f]/.test(str)) {
    str = punycode.toASCII(str);
  }
  return str.toLowerCase();
}

// S5.1.3 Domain Matching
function domainMatch(str, domStr, canonicalize) {
  if (str == null || domStr == null) {
    return null;
  }
  if (canonicalize !== false) {
    str = canonicalDomain(str);
    domStr = canonicalDomain(domStr);
  }

  /*
   * S5.1.3:
   * "A string domain-matches a given domain string if at least one of the
   * following conditions hold:"
   *
   * " o The domain string and the string are identical. (Note that both the
   * domain string and the string will have been canonicalized to lower case at
   * this point)"
   */
  if (str == domStr) {
    return true;
  }

  /* " o All of the following [three] conditions hold:" */

  /* "* The domain string is a suffix of the string" */
  const idx = str.lastIndexOf(domStr);
  if (idx <= 0) {
    return false; // it's a non-match (-1) or prefix (0)
  }

  // next, check it's a proper suffix
  // e.g., "a.b.c".indexOf("b.c") === 2
  // 5 === 3+2
  if (str.length !== domStr.length + idx) {
    return false; // it's not a suffix
  }

  /* "  * The last character of the string that is not included in the
   * domain string is a %x2E (".") character." */
  if (str.substr(idx - 1, 1) !== ".") {
    return false; // doesn't align on "."
  }

  /* "  * The string is a host name (i.e., not an IP address)." */
  if (IP_REGEX_LOWERCASE.test(str)) {
    return false; // it's an IP address
  }
  return true;
}

// RFC6265 S5.1.4 Paths and Path-Match

/*
 * "The user agent MUST use an algorithm equivalent to the following algorithm
 * to compute the default-path of a cookie:"
 *
 * Assumption: the path (and not query part or absolute uri) is passed in.
 */
function defaultPath(path) {
  // "2. If the uri-path is empty or if the first character of the uri-path is not
  // a %x2F ("/") character, output %x2F ("/") and skip the remaining steps.
  if (!path || path.substr(0, 1) !== "/") {
    return "/";
  }

  // "3. If the uri-path contains no more than one %x2F ("/") character, output
  // %x2F ("/") and skip the remaining step."
  if (path === "/") {
    return path;
  }
  const rightSlash = path.lastIndexOf("/");
  if (rightSlash === 0) {
    return "/";
  }

  // "4. Output the characters of the uri-path from the first character up to,
  // but not including, the right-most %x2F ("/")."
  return path.slice(0, rightSlash);
}
function trimTerminator(str) {
  if (validators.isEmptyString(str)) return str;
  for (let t = 0; t < TERMINATORS.length; t++) {
    const terminatorIdx = str.indexOf(TERMINATORS[t]);
    if (terminatorIdx !== -1) {
      str = str.substr(0, terminatorIdx);
    }
  }
  return str;
}
function parseCookiePair(cookiePair, looseMode) {
  cookiePair = trimTerminator(cookiePair);
  validators.validate(validators.isString(cookiePair), cookiePair);
  let firstEq = cookiePair.indexOf("=");
  if (looseMode) {
    if (firstEq === 0) {
      // '=' is immediately at start
      cookiePair = cookiePair.substr(1);
      firstEq = cookiePair.indexOf("="); // might still need to split on '='
    }
  } else {
    // non-loose mode
    if (firstEq <= 0) {
      // no '=' or is at start
      return; // needs to have non-empty "cookie-name"
    }
  }
  let cookieName, cookieValue;
  if (firstEq <= 0) {
    cookieName = "";
    cookieValue = cookiePair.trim();
  } else {
    cookieName = cookiePair.substr(0, firstEq).trim();
    cookieValue = cookiePair.substr(firstEq + 1).trim();
  }
  if (CONTROL_CHARS.test(cookieName) || CONTROL_CHARS.test(cookieValue)) {
    return;
  }
  const c = new Cookie();
  c.key = cookieName;
  c.value = cookieValue;
  return c;
}
function parse(str, options) {
  if (!options || typeof options !== "object") {
    options = {};
  }
  if (validators.isEmptyString(str) || !validators.isString(str)) {
    return null;
  }
  str = str.trim();

  // We use a regex to parse the "name-value-pair" part of S5.2
  const firstSemi = str.indexOf(";"); // S5.2 step 1
  const cookiePair = firstSemi === -1 ? str : str.substr(0, firstSemi);
  const c = parseCookiePair(cookiePair, !!options.loose);
  if (!c) {
    return;
  }
  if (firstSemi === -1) {
    return c;
  }

  // S5.2.3 "unparsed-attributes consist of the remainder of the set-cookie-string
  // (including the %x3B (";") in question)." plus later on in the same section
  // "discard the first ";" and trim".
  const unparsed = str.slice(firstSemi + 1).trim();

  // "If the unparsed-attributes string is empty, skip the rest of these
  // steps."
  if (unparsed.length === 0) {
    return c;
  }

  /*
   * S5.2 says that when looping over the items "[p]rocess the attribute-name
   * and attribute-value according to the requirements in the following
   * subsections" for every item.  Plus, for many of the individual attributes
   * in S5.3 it says to use the "attribute-value of the last attribute in the
   * cookie-attribute-list".  Therefore, in this implementation, we overwrite
   * the previous value.
   */
  const cookie_avs = unparsed.split(";");
  while (cookie_avs.length) {
    const av = cookie_avs.shift().trim();
    if (av.length === 0) {
      // happens if ";;" appears
      continue;
    }
    const av_sep = av.indexOf("=");
    let av_key, av_value;
    if (av_sep === -1) {
      av_key = av;
      av_value = null;
    } else {
      av_key = av.substr(0, av_sep);
      av_value = av.substr(av_sep + 1);
    }
    av_key = av_key.trim().toLowerCase();
    if (av_value) {
      av_value = av_value.trim();
    }
    switch (av_key) {
      case "expires":
        // S5.2.1
        if (av_value) {
          const exp = parseDate(av_value);
          // "If the attribute-value failed to parse as a cookie date, ignore the
          // cookie-av."
          if (exp) {
            // over and underflow not realistically a concern: V8's getTime() seems to
            // store something larger than a 32-bit time_t (even with 32-bit node)
            c.expires = exp;
          }
        }
        break;
      case "max-age":
        // S5.2.2
        if (av_value) {
          // "If the first character of the attribute-value is not a DIGIT or a "-"
          // character ...[or]... If the remainder of attribute-value contains a
          // non-DIGIT character, ignore the cookie-av."
          if (/^-?[0-9]+$/.test(av_value)) {
            const delta = parseInt(av_value, 10);
            // "If delta-seconds is less than or equal to zero (0), let expiry-time
            // be the earliest representable date and time."
            c.setMaxAge(delta);
          }
        }
        break;
      case "domain":
        // S5.2.3
        // "If the attribute-value is empty, the behavior is undefined.  However,
        // the user agent SHOULD ignore the cookie-av entirely."
        if (av_value) {
          // S5.2.3 "Let cookie-domain be the attribute-value without the leading %x2E
          // (".") character."
          const domain = av_value.trim().replace(/^\./, "");
          if (domain) {
            // "Convert the cookie-domain to lower case."
            c.domain = domain.toLowerCase();
          }
        }
        break;
      case "path":
        // S5.2.4
        /*
         * "If the attribute-value is empty or if the first character of the
         * attribute-value is not %x2F ("/"):
         *   Let cookie-path be the default-path.
         * Otherwise:
         *   Let cookie-path be the attribute-value."
         *
         * We'll represent the default-path as null since it depends on the
         * context of the parsing.
         */
        c.path = av_value && av_value[0] === "/" ? av_value : null;
        break;
      case "secure":
        // S5.2.5
        /*
         * "If the attribute-name case-insensitively matches the string "Secure",
         * the user agent MUST append an attribute to the cookie-attribute-list
         * with an attribute-name of Secure and an empty attribute-value."
         */
        c.secure = true;
        break;
      case "httponly":
        // S5.2.6 -- effectively the same as 'secure'
        c.httpOnly = true;
        break;
      case "samesite":
        // RFC6265bis-02 S5.3.7
        const enforcement = av_value ? av_value.toLowerCase() : "";
        switch (enforcement) {
          case "strict":
            c.sameSite = "strict";
            break;
          case "lax":
            c.sameSite = "lax";
            break;
          case "none":
            c.sameSite = "none";
            break;
          default:
            c.sameSite = undefined;
            break;
        }
        break;
      default:
        c.extensions = c.extensions || [];
        c.extensions.push(av);
        break;
    }
  }
  return c;
}

/**
 *  If the cookie-name begins with a case-sensitive match for the
 *  string "__Secure-", abort these steps and ignore the cookie
 *  entirely unless the cookie's secure-only-flag is true.
 * @param cookie
 * @returns boolean
 */
function isSecurePrefixConditionMet(cookie) {
  validators.validate(validators.isObject(cookie), cookie);
  return !cookie.key.startsWith("__Secure-") || cookie.secure;
}

/**
 *  If the cookie-name begins with a case-sensitive match for the
 *  string "__Host-", abort these steps and ignore the cookie
 *  entirely unless the cookie meets all the following criteria:
 *    1.  The cookie's secure-only-flag is true.
 *    2.  The cookie's host-only-flag is true.
 *    3.  The cookie-attribute-list contains an attribute with an
 *        attribute-name of "Path", and the cookie's path is "/".
 * @param cookie
 * @returns boolean
 */
function isHostPrefixConditionMet(cookie) {
  validators.validate(validators.isObject(cookie));
  return !cookie.key.startsWith("__Host-") || cookie.secure && cookie.hostOnly && cookie.path != null && cookie.path === "/";
}

// avoid the V8 deoptimization monster!
function jsonParse(str) {
  let obj;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    return e;
  }
  return obj;
}
function fromJSON(str) {
  if (!str || validators.isEmptyString(str)) {
    return null;
  }
  let obj;
  if (typeof str === "string") {
    obj = jsonParse(str);
    if (obj instanceof Error) {
      return null;
    }
  } else {
    // assume it's an Object
    obj = str;
  }
  const c = new Cookie();
  for (let i = 0; i < Cookie.serializableProperties.length; i++) {
    const prop = Cookie.serializableProperties[i];
    if (obj[prop] === undefined || obj[prop] === cookieDefaults[prop]) {
      continue; // leave as prototype default
    }
    if (prop === "expires" || prop === "creation" || prop === "lastAccessed") {
      if (obj[prop] === null) {
        c[prop] = null;
      } else {
        c[prop] = obj[prop] == "Infinity" ? "Infinity" : new Date(obj[prop]);
      }
    } else {
      c[prop] = obj[prop];
    }
  }
  return c;
}

/* Section 5.4 part 2:
 * "*  Cookies with longer paths are listed before cookies with
 *     shorter paths.
 *
 *  *  Among cookies that have equal-length path fields, cookies with
 *     earlier creation-times are listed before cookies with later
 *     creation-times."
 */

function cookieCompare(a, b) {
  validators.validate(validators.isObject(a), a);
  validators.validate(validators.isObject(b), b);
  let cmp = 0;

  // descending for length: b CMP a
  const aPathLen = a.path ? a.path.length : 0;
  const bPathLen = b.path ? b.path.length : 0;
  cmp = bPathLen - aPathLen;
  if (cmp !== 0) {
    return cmp;
  }

  // ascending for time: a CMP b
  const aTime = a.creation ? a.creation.getTime() : MAX_TIME;
  const bTime = b.creation ? b.creation.getTime() : MAX_TIME;
  cmp = aTime - bTime;
  if (cmp !== 0) {
    return cmp;
  }

  // break ties for the same millisecond (precision of JavaScript's clock)
  cmp = a.creationIndex - b.creationIndex;
  return cmp;
}

// Gives the permutation of all possible pathMatch()es of a given path. The
// array is in longest-to-shortest order.  Handy for indexing.
function permutePath(path) {
  validators.validate(validators.isString(path));
  if (path === "/") {
    return ["/"];
  }
  const permutations = [path];
  while (path.length > 1) {
    const lindex = path.lastIndexOf("/");
    if (lindex === 0) {
      break;
    }
    path = path.substr(0, lindex);
    permutations.push(path);
  }
  permutations.push("/");
  return permutations;
}
function getCookieContext(url) {
  if (url instanceof Object) {
    return url;
  }
  // NOTE: decodeURI will throw on malformed URIs (see GH-32).
  // Therefore, we will just skip decoding for such URIs.
  try {
    url = decodeURI(url);
  } catch (err) {
    // Silently swallow error
  }
  return urlParse(url);
}
const cookieDefaults = {
  // the order in which the RFC has them:
  key: "",
  value: "",
  expires: "Infinity",
  maxAge: null,
  domain: null,
  path: null,
  secure: false,
  httpOnly: false,
  extensions: null,
  // set by the CookieJar:
  hostOnly: null,
  pathIsDefault: null,
  creation: null,
  lastAccessed: null,
  sameSite: undefined
};
class Cookie {
  constructor(options = {}) {
    const customInspectSymbol = getCustomInspectSymbol();
    if (customInspectSymbol) {
      this[customInspectSymbol] = this.inspect;
    }
    Object.assign(this, cookieDefaults, options);
    this.creation = this.creation || new Date();

    // used to break creation ties in cookieCompare():
    Object.defineProperty(this, "creationIndex", {
      configurable: false,
      enumerable: false,
      // important for assert.deepEqual checks
      writable: true,
      value: ++Cookie.cookiesCreated
    });
  }
  inspect() {
    const now = Date.now();
    const hostOnly = this.hostOnly != null ? this.hostOnly : "?";
    const createAge = this.creation ? `${now - this.creation.getTime()}ms` : "?";
    const accessAge = this.lastAccessed ? `${now - this.lastAccessed.getTime()}ms` : "?";
    return `Cookie="${this.toString()}; hostOnly=${hostOnly}; aAge=${accessAge}; cAge=${createAge}"`;
  }
  toJSON() {
    const obj = {};
    for (const prop of Cookie.serializableProperties) {
      if (this[prop] === cookieDefaults[prop]) {
        continue; // leave as prototype default
      }
      if (prop === "expires" || prop === "creation" || prop === "lastAccessed") {
        if (this[prop] === null) {
          obj[prop] = null;
        } else {
          obj[prop] = this[prop] == "Infinity" // intentionally not ===
          ? "Infinity" : this[prop].toISOString();
        }
      } else if (prop === "maxAge") {
        if (this[prop] !== null) {
          // again, intentionally not ===
          obj[prop] = this[prop] == Infinity || this[prop] == -Infinity ? this[prop].toString() : this[prop];
        }
      } else {
        if (this[prop] !== cookieDefaults[prop]) {
          obj[prop] = this[prop];
        }
      }
    }
    return obj;
  }
  clone() {
    return fromJSON(this.toJSON());
  }
  validate() {
    if (!COOKIE_OCTETS.test(this.value)) {
      return false;
    }
    if (this.expires != Infinity && !(this.expires instanceof Date) && !parseDate(this.expires)) {
      return false;
    }
    if (this.maxAge != null && this.maxAge <= 0) {
      return false; // "Max-Age=" non-zero-digit *DIGIT
    }
    if (this.path != null && !PATH_VALUE.test(this.path)) {
      return false;
    }
    const cdomain = this.cdomain();
    if (cdomain) {
      if (cdomain.match(/\.$/)) {
        return false; // S4.1.2.3 suggests that this is bad. domainMatch() tests confirm this
      }
      const suffix = pubsuffix.getPublicSuffix(cdomain);
      if (suffix == null) {
        // it's a public suffix
        return false;
      }
    }
    return true;
  }
  setExpires(exp) {
    if (exp instanceof Date) {
      this.expires = exp;
    } else {
      this.expires = parseDate(exp) || "Infinity";
    }
  }
  setMaxAge(age) {
    if (age === Infinity || age === -Infinity) {
      this.maxAge = age.toString(); // so JSON.stringify() works
    } else {
      this.maxAge = age;
    }
  }
  cookieString() {
    let val = this.value;
    if (val == null) {
      val = "";
    }
    if (this.key === "") {
      return val;
    }
    return `${this.key}=${val}`;
  }

  // gives Set-Cookie header format
  toString() {
    let str = this.cookieString();
    if (this.expires != Infinity) {
      if (this.expires instanceof Date) {
        str += `; Expires=${formatDate(this.expires)}`;
      } else {
        str += `; Expires=${this.expires}`;
      }
    }
    if (this.maxAge != null && this.maxAge != Infinity) {
      str += `; Max-Age=${this.maxAge}`;
    }
    if (this.domain && !this.hostOnly) {
      str += `; Domain=${this.domain}`;
    }
    if (this.path) {
      str += `; Path=${this.path}`;
    }
    if (this.secure) {
      str += "; Secure";
    }
    if (this.httpOnly) {
      str += "; HttpOnly";
    }
    if (this.sameSite && this.sameSite !== "none") {
      const ssCanon = Cookie.sameSiteCanonical[this.sameSite.toLowerCase()];
      str += `; SameSite=${ssCanon ? ssCanon : this.sameSite}`;
    }
    if (this.extensions) {
      this.extensions.forEach(ext => {
        str += `; ${ext}`;
      });
    }
    return str;
  }

  // TTL() partially replaces the "expiry-time" parts of S5.3 step 3 (setCookie()
  // elsewhere)
  // S5.3 says to give the "latest representable date" for which we use Infinity
  // For "expired" we use 0
  TTL(now) {
    /* RFC6265 S4.1.2.2 If a cookie has both the Max-Age and the Expires
     * attribute, the Max-Age attribute has precedence and controls the
     * expiration date of the cookie.
     * (Concurs with S5.3 step 3)
     */
    if (this.maxAge != null) {
      return this.maxAge <= 0 ? 0 : this.maxAge * 1000;
    }
    let expires = this.expires;
    if (expires != Infinity) {
      if (!(expires instanceof Date)) {
        expires = parseDate(expires) || Infinity;
      }
      if (expires == Infinity) {
        return Infinity;
      }
      return expires.getTime() - (now || Date.now());
    }
    return Infinity;
  }

  // expiryTime() replaces the "expiry-time" parts of S5.3 step 3 (setCookie()
  // elsewhere)
  expiryTime(now) {
    if (this.maxAge != null) {
      const relativeTo = now || this.creation || new Date();
      const age = this.maxAge <= 0 ? -Infinity : this.maxAge * 1000;
      return relativeTo.getTime() + age;
    }
    if (this.expires == Infinity) {
      return Infinity;
    }
    return this.expires.getTime();
  }

  // expiryDate() replaces the "expiry-time" parts of S5.3 step 3 (setCookie()
  // elsewhere), except it returns a Date
  expiryDate(now) {
    const millisec = this.expiryTime(now);
    if (millisec == Infinity) {
      return new Date(MAX_TIME);
    } else if (millisec == -Infinity) {
      return new Date(MIN_TIME);
    } else {
      return new Date(millisec);
    }
  }

  // This replaces the "persistent-flag" parts of S5.3 step 3
  isPersistent() {
    return this.maxAge != null || this.expires != Infinity;
  }

  // Mostly S5.1.2 and S5.2.3:
  canonicalizedDomain() {
    if (this.domain == null) {
      return null;
    }
    return canonicalDomain(this.domain);
  }
  cdomain() {
    return this.canonicalizedDomain();
  }
}
Cookie.cookiesCreated = 0;
Cookie.parse = parse;
Cookie.fromJSON = fromJSON;
Cookie.serializableProperties = Object.keys(cookieDefaults);
Cookie.sameSiteLevel = {
  strict: 3,
  lax: 2,
  none: 1
};
Cookie.sameSiteCanonical = {
  strict: "Strict",
  lax: "Lax"
};
function getNormalizedPrefixSecurity(prefixSecurity) {
  if (prefixSecurity != null) {
    const normalizedPrefixSecurity = prefixSecurity.toLowerCase();
    /* The three supported options */
    switch (normalizedPrefixSecurity) {
      case PrefixSecurityEnum.STRICT:
      case PrefixSecurityEnum.SILENT:
      case PrefixSecurityEnum.DISABLED:
        return normalizedPrefixSecurity;
    }
  }
  /* Default is SILENT */
  return PrefixSecurityEnum.SILENT;
}
class CookieJar {
  constructor(store, options = {
    rejectPublicSuffixes: true
  }) {
    if (typeof options === "boolean") {
      options = {
        rejectPublicSuffixes: options
      };
    }
    validators.validate(validators.isObject(options), options);
    this.rejectPublicSuffixes = options.rejectPublicSuffixes;
    this.enableLooseMode = !!options.looseMode;
    this.allowSpecialUseDomain = typeof options.allowSpecialUseDomain === "boolean" ? options.allowSpecialUseDomain : true;
    this.store = store || new MemoryCookieStore();
    this.prefixSecurity = getNormalizedPrefixSecurity(options.prefixSecurity);
    this._cloneSync = syncWrap("clone");
    this._importCookiesSync = syncWrap("_importCookies");
    this.getCookiesSync = syncWrap("getCookies");
    this.getCookieStringSync = syncWrap("getCookieString");
    this.getSetCookieStringsSync = syncWrap("getSetCookieStrings");
    this.removeAllCookiesSync = syncWrap("removeAllCookies");
    this.setCookieSync = syncWrap("setCookie");
    this.serializeSync = syncWrap("serialize");
  }
  setCookie(cookie, url, options, cb) {
    validators.validate(validators.isNonEmptyString(url), cb, options);
    let err;
    if (validators.isFunction(url)) {
      cb = url;
      return cb(new Error("No URL was specified"));
    }
    const context = getCookieContext(url);
    if (validators.isFunction(options)) {
      cb = options;
      options = {};
    }
    validators.validate(validators.isFunction(cb), cb);
    if (!validators.isNonEmptyString(cookie) && !validators.isObject(cookie) && cookie instanceof String && cookie.length == 0) {
      return cb(null);
    }
    const host = canonicalDomain(context.hostname);
    const loose = options.loose || this.enableLooseMode;
    let sameSiteContext = null;
    if (options.sameSiteContext) {
      sameSiteContext = checkSameSiteContext(options.sameSiteContext);
      if (!sameSiteContext) {
        return cb(new Error(SAME_SITE_CONTEXT_VAL_ERR));
      }
    }

    // S5.3 step 1
    if (typeof cookie === "string" || cookie instanceof String) {
      cookie = Cookie.parse(cookie, {
        loose: loose
      });
      if (!cookie) {
        err = new Error("Cookie failed to parse");
        return cb(options.ignoreError ? null : err);
      }
    } else if (!(cookie instanceof Cookie)) {
      // If you're seeing this error, and are passing in a Cookie object,
      // it *might* be a Cookie object from another loaded version of tough-cookie.
      err = new Error("First argument to setCookie must be a Cookie object or string");
      return cb(options.ignoreError ? null : err);
    }

    // S5.3 step 2
    const now = options.now || new Date(); // will assign later to save effort in the face of errors

    // S5.3 step 3: NOOP; persistent-flag and expiry-time is handled by getCookie()

    // S5.3 step 4: NOOP; domain is null by default

    // S5.3 step 5: public suffixes
    if (this.rejectPublicSuffixes && cookie.domain) {
      const suffix = pubsuffix.getPublicSuffix(cookie.cdomain(), {
        allowSpecialUseDomain: this.allowSpecialUseDomain,
        ignoreError: options.ignoreError
      });
      if (suffix == null && !IP_V6_REGEX_OBJECT.test(cookie.domain)) {
        // e.g. "com"
        err = new Error("Cookie has domain set to a public suffix");
        return cb(options.ignoreError ? null : err);
      }
    }

    // S5.3 step 6:
    if (cookie.domain) {
      if (!domainMatch(host, cookie.cdomain(), false)) {
        err = new Error(`Cookie not in this host's domain. Cookie:${cookie.cdomain()} Request:${host}`);
        return cb(options.ignoreError ? null : err);
      }
      if (cookie.hostOnly == null) {
        // don't reset if already set
        cookie.hostOnly = false;
      }
    } else {
      cookie.hostOnly = true;
      cookie.domain = host;
    }

    //S5.2.4 If the attribute-value is empty or if the first character of the
    //attribute-value is not %x2F ("/"):
    //Let cookie-path be the default-path.
    if (!cookie.path || cookie.path[0] !== "/") {
      cookie.path = defaultPath(context.pathname);
      cookie.pathIsDefault = true;
    }

    // S5.3 step 8: NOOP; secure attribute
    // S5.3 step 9: NOOP; httpOnly attribute

    // S5.3 step 10
    if (options.http === false && cookie.httpOnly) {
      err = new Error("Cookie is HttpOnly and this isn't an HTTP API");
      return cb(options.ignoreError ? null : err);
    }

    // 6252bis-02 S5.4 Step 13 & 14:
    if (cookie.sameSite !== "none" && cookie.sameSite !== undefined && sameSiteContext) {
      // "If the cookie's "same-site-flag" is not "None", and the cookie
      //  is being set from a context whose "site for cookies" is not an
      //  exact match for request-uri's host's registered domain, then
      //  abort these steps and ignore the newly created cookie entirely."
      if (sameSiteContext === "none") {
        err = new Error("Cookie is SameSite but this is a cross-origin request");
        return cb(options.ignoreError ? null : err);
      }
    }

    /* 6265bis-02 S5.4 Steps 15 & 16 */
    const ignoreErrorForPrefixSecurity = this.prefixSecurity === PrefixSecurityEnum.SILENT;
    const prefixSecurityDisabled = this.prefixSecurity === PrefixSecurityEnum.DISABLED;
    /* If prefix checking is not disabled ...*/
    if (!prefixSecurityDisabled) {
      let errorFound = false;
      let errorMsg;
      /* Check secure prefix condition */
      if (!isSecurePrefixConditionMet(cookie)) {
        errorFound = true;
        errorMsg = "Cookie has __Secure prefix but Secure attribute is not set";
      } else if (!isHostPrefixConditionMet(cookie)) {
        /* Check host prefix condition */
        errorFound = true;
        errorMsg = "Cookie has __Host prefix but either Secure or HostOnly attribute is not set or Path is not '/'";
      }
      if (errorFound) {
        return cb(options.ignoreError || ignoreErrorForPrefixSecurity ? null : new Error(errorMsg));
      }
    }
    const store = this.store;
    if (!store.updateCookie) {
      store.updateCookie = function (oldCookie, newCookie, cb) {
        this.putCookie(newCookie, cb);
      };
    }
    function withCookie(err, oldCookie) {
      if (err) {
        return cb(err);
      }
      const next = function (err) {
        if (err) {
          return cb(err);
        } else {
          cb(null, cookie);
        }
      };
      if (oldCookie) {
        // S5.3 step 11 - "If the cookie store contains a cookie with the same name,
        // domain, and path as the newly created cookie:"
        if (options.http === false && oldCookie.httpOnly) {
          // step 11.2
          err = new Error("old Cookie is HttpOnly and this isn't an HTTP API");
          return cb(options.ignoreError ? null : err);
        }
        cookie.creation = oldCookie.creation; // step 11.3
        cookie.creationIndex = oldCookie.creationIndex; // preserve tie-breaker
        cookie.lastAccessed = now;
        // Step 11.4 (delete cookie) is implied by just setting the new one:
        store.updateCookie(oldCookie, cookie, next); // step 12
      } else {
        cookie.creation = cookie.lastAccessed = now;
        store.putCookie(cookie, next); // step 12
      }
    }
    store.findCookie(cookie.domain, cookie.path, cookie.key, withCookie);
  }

  // RFC6365 S5.4
  getCookies(url, options, cb) {
    validators.validate(validators.isNonEmptyString(url), cb, url);
    const context = getCookieContext(url);
    if (validators.isFunction(options)) {
      cb = options;
      options = {};
    }
    validators.validate(validators.isObject(options), cb, options);
    validators.validate(validators.isFunction(cb), cb);
    const host = canonicalDomain(context.hostname);
    const path = context.pathname || "/";
    let secure = options.secure;
    if (secure == null && context.protocol && (context.protocol == "https:" || context.protocol == "wss:")) {
      secure = true;
    }
    let sameSiteLevel = 0;
    if (options.sameSiteContext) {
      const sameSiteContext = checkSameSiteContext(options.sameSiteContext);
      sameSiteLevel = Cookie.sameSiteLevel[sameSiteContext];
      if (!sameSiteLevel) {
        return cb(new Error(SAME_SITE_CONTEXT_VAL_ERR));
      }
    }
    let http = options.http;
    if (http == null) {
      http = true;
    }
    const now = options.now || Date.now();
    const expireCheck = options.expire !== false;
    const allPaths = !!options.allPaths;
    const store = this.store;
    function matchingCookie(c) {
      // "Either:
      //   The cookie's host-only-flag is true and the canonicalized
      //   request-host is identical to the cookie's domain.
      // Or:
      //   The cookie's host-only-flag is false and the canonicalized
      //   request-host domain-matches the cookie's domain."
      if (c.hostOnly) {
        if (c.domain != host) {
          return false;
        }
      } else {
        if (!domainMatch(host, c.domain, false)) {
          return false;
        }
      }

      // "The request-uri's path path-matches the cookie's path."
      if (!allPaths && !pathMatch(path, c.path)) {
        return false;
      }

      // "If the cookie's secure-only-flag is true, then the request-uri's
      // scheme must denote a "secure" protocol"
      if (c.secure && !secure) {
        return false;
      }

      // "If the cookie's http-only-flag is true, then exclude the cookie if the
      // cookie-string is being generated for a "non-HTTP" API"
      if (c.httpOnly && !http) {
        return false;
      }

      // RFC6265bis-02 S5.3.7
      if (sameSiteLevel) {
        const cookieLevel = Cookie.sameSiteLevel[c.sameSite || "none"];
        if (cookieLevel > sameSiteLevel) {
          // only allow cookies at or below the request level
          return false;
        }
      }

      // deferred from S5.3
      // non-RFC: allow retention of expired cookies by choice
      if (expireCheck && c.expiryTime() <= now) {
        store.removeCookie(c.domain, c.path, c.key, () => {}); // result ignored
        return false;
      }
      return true;
    }
    store.findCookies(host, allPaths ? null : path, this.allowSpecialUseDomain, (err, cookies) => {
      if (err) {
        return cb(err);
      }
      cookies = cookies.filter(matchingCookie);

      // sorting of S5.4 part 2
      if (options.sort !== false) {
        cookies = cookies.sort(cookieCompare);
      }

      // S5.4 part 3
      const now = new Date();
      for (const cookie of cookies) {
        cookie.lastAccessed = now;
      }
      // TODO persist lastAccessed

      cb(null, cookies);
    });
  }
  getCookieString(...args) {
    const cb = args.pop();
    validators.validate(validators.isFunction(cb), cb);
    const next = function (err, cookies) {
      if (err) {
        cb(err);
      } else {
        cb(null, cookies.sort(cookieCompare).map(c => c.cookieString()).join("; "));
      }
    };
    args.push(next);
    this.getCookies.apply(this, args);
  }
  getSetCookieStrings(...args) {
    const cb = args.pop();
    validators.validate(validators.isFunction(cb), cb);
    const next = function (err, cookies) {
      if (err) {
        cb(err);
      } else {
        cb(null, cookies.map(c => {
          return c.toString();
        }));
      }
    };
    args.push(next);
    this.getCookies.apply(this, args);
  }
  serialize(cb) {
    validators.validate(validators.isFunction(cb), cb);
    let type = this.store.constructor.name;
    if (validators.isObject(type)) {
      type = null;
    }

    // update README.md "Serialization Format" if you change this, please!
    const serialized = {
      // The version of tough-cookie that serialized this jar. Generally a good
      // practice since future versions can make data import decisions based on
      // known past behavior. When/if this matters, use `semver`.
      version: `tough-cookie@${VERSION}`,
      // add the store type, to make humans happy:
      storeType: type,
      // CookieJar configuration:
      rejectPublicSuffixes: !!this.rejectPublicSuffixes,
      enableLooseMode: !!this.enableLooseMode,
      allowSpecialUseDomain: !!this.allowSpecialUseDomain,
      prefixSecurity: getNormalizedPrefixSecurity(this.prefixSecurity),
      // this gets filled from getAllCookies:
      cookies: []
    };
    if (!(this.store.getAllCookies && typeof this.store.getAllCookies === "function")) {
      return cb(new Error("store does not support getAllCookies and cannot be serialized"));
    }
    this.store.getAllCookies((err, cookies) => {
      if (err) {
        return cb(err);
      }
      serialized.cookies = cookies.map(cookie => {
        // convert to serialized 'raw' cookies
        cookie = cookie instanceof Cookie ? cookie.toJSON() : cookie;

        // Remove the index so new ones get assigned during deserialization
        delete cookie.creationIndex;
        return cookie;
      });
      return cb(null, serialized);
    });
  }
  toJSON() {
    return this.serializeSync();
  }

  // use the class method CookieJar.deserialize instead of calling this directly
  _importCookies(serialized, cb) {
    let cookies = serialized.cookies;
    if (!cookies || !Array.isArray(cookies)) {
      return cb(new Error("serialized jar has no cookies array"));
    }
    cookies = cookies.slice(); // do not modify the original

    const putNext = err => {
      if (err) {
        return cb(err);
      }
      if (!cookies.length) {
        return cb(err, this);
      }
      let cookie;
      try {
        cookie = fromJSON(cookies.shift());
      } catch (e) {
        return cb(e);
      }
      if (cookie === null) {
        return putNext(null); // skip this cookie
      }
      this.store.putCookie(cookie, putNext);
    };
    putNext();
  }
  clone(newStore, cb) {
    if (arguments.length === 1) {
      cb = newStore;
      newStore = null;
    }
    this.serialize((err, serialized) => {
      if (err) {
        return cb(err);
      }
      CookieJar.deserialize(serialized, newStore, cb);
    });
  }
  cloneSync(newStore) {
    if (arguments.length === 0) {
      return this._cloneSync();
    }
    if (!newStore.synchronous) {
      throw new Error("CookieJar clone destination store is not synchronous; use async API instead.");
    }
    return this._cloneSync(newStore);
  }
  removeAllCookies(cb) {
    validators.validate(validators.isFunction(cb), cb);
    const store = this.store;

    // Check that the store implements its own removeAllCookies(). The default
    // implementation in Store will immediately call the callback with a "not
    // implemented" Error.
    if (typeof store.removeAllCookies === "function" && store.removeAllCookies !== Store.prototype.removeAllCookies) {
      return store.removeAllCookies(cb);
    }
    store.getAllCookies((err, cookies) => {
      if (err) {
        return cb(err);
      }
      if (cookies.length === 0) {
        return cb(null);
      }
      let completedCount = 0;
      const removeErrors = [];
      function removeCookieCb(removeErr) {
        if (removeErr) {
          removeErrors.push(removeErr);
        }
        completedCount++;
        if (completedCount === cookies.length) {
          return cb(removeErrors.length ? removeErrors[0] : null);
        }
      }
      cookies.forEach(cookie => {
        store.removeCookie(cookie.domain, cookie.path, cookie.key, removeCookieCb);
      });
    });
  }
  static deserialize(strOrObj, store, cb) {
    if (arguments.length !== 3) {
      // store is optional
      cb = store;
      store = null;
    }
    validators.validate(validators.isFunction(cb), cb);
    let serialized;
    if (typeof strOrObj === "string") {
      serialized = jsonParse(strOrObj);
      if (serialized instanceof Error) {
        return cb(serialized);
      }
    } else {
      serialized = strOrObj;
    }
    const jar = new CookieJar(store, {
      rejectPublicSuffixes: serialized.rejectPublicSuffixes,
      looseMode: serialized.enableLooseMode,
      allowSpecialUseDomain: serialized.allowSpecialUseDomain,
      prefixSecurity: serialized.prefixSecurity
    });
    jar._importCookies(serialized, err => {
      if (err) {
        return cb(err);
      }
      cb(null, jar);
    });
  }
  static deserializeSync(strOrObj, store) {
    const serialized = typeof strOrObj === "string" ? JSON.parse(strOrObj) : strOrObj;
    const jar = new CookieJar(store, {
      rejectPublicSuffixes: serialized.rejectPublicSuffixes,
      looseMode: serialized.enableLooseMode
    });

    // catch this mistake early:
    if (!jar.store.synchronous) {
      throw new Error("CookieJar store is not synchronous; use async API instead.");
    }
    jar._importCookiesSync(serialized);
    return jar;
  }
}
CookieJar.fromJSON = CookieJar.deserializeSync;
["_importCookies", "clone", "getCookies", "getCookieString", "getSetCookieStrings", "removeAllCookies", "serialize", "setCookie"].forEach(name => {
  CookieJar.prototype[name] = fromCallback(CookieJar.prototype[name]);
});
CookieJar.deserialize = fromCallback(CookieJar.deserialize);

// Use a closure to provide a true imperative API for synchronous stores.
function syncWrap(method) {
  return function (...args) {
    if (!this.store.synchronous) {
      throw new Error("CookieJar store is not synchronous; use async API instead.");
    }
    let syncErr, syncResult;
    this[method](...args, (err, result) => {
      syncErr = err;
      syncResult = result;
    });
    if (syncErr) {
      throw syncErr;
    }
    return syncResult;
  };
}
exports.version = VERSION;
exports.CookieJar = CookieJar;
exports.Cookie = Cookie;
exports.Store = Store;
exports.MemoryCookieStore = MemoryCookieStore;
exports.parseDate = parseDate;
exports.formatDate = formatDate;
exports.parse = parse;
exports.fromJSON = fromJSON;
exports.domainMatch = domainMatch;
exports.defaultPath = defaultPath;
exports.pathMatch = pathMatch;
exports.getPublicSuffix = pubsuffix.getPublicSuffix;
exports.cookieCompare = cookieCompare;
exports.permuteDomain = require("./permuteDomain").permuteDomain;
exports.permutePath = permutePath;
exports.canonicalDomain = canonicalDomain;
exports.PrefixSecurityEnum = PrefixSecurityEnum;
exports.ParameterError = validators.ParameterError;

},{"./memstore":97,"./pathMatch":98,"./permuteDomain":99,"./pubsuffix-psl":100,"./store":101,"./utilHelper":102,"./validators.js":103,"./version":104,"punycode/":105,"universalify":106,"url-parse":108}],97:[function(require,module,exports){
/*!
 * Copyright (c) 2015, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";
const { fromCallback } = require("universalify");
const Store = require("./store").Store;
const permuteDomain = require("./permuteDomain").permuteDomain;
const pathMatch = require("./pathMatch").pathMatch;
const { getCustomInspectSymbol, getUtilInspect } = require("./utilHelper");

class MemoryCookieStore extends Store {
  constructor() {
    super();
    this.synchronous = true;
    this.idx = Object.create(null);
    const customInspectSymbol = getCustomInspectSymbol();
    if (customInspectSymbol) {
      this[customInspectSymbol] = this.inspect;
    }
  }

  inspect() {
    const util = { inspect: getUtilInspect(inspectFallback) };
    return `{ idx: ${util.inspect(this.idx, false, 2)} }`;
  }

  findCookie(domain, path, key, cb) {
    if (!this.idx[domain]) {
      return cb(null, undefined);
    }
    if (!this.idx[domain][path]) {
      return cb(null, undefined);
    }
    return cb(null, this.idx[domain][path][key] || null);
  }
  findCookies(domain, path, allowSpecialUseDomain, cb) {
    const results = [];
    if (typeof allowSpecialUseDomain === "function") {
      cb = allowSpecialUseDomain;
      allowSpecialUseDomain = true;
    }
    if (!domain) {
      return cb(null, []);
    }

    let pathMatcher;
    if (!path) {
      // null means "all paths"
      pathMatcher = function matchAll(domainIndex) {
        for (const curPath in domainIndex) {
          const pathIndex = domainIndex[curPath];
          for (const key in pathIndex) {
            results.push(pathIndex[key]);
          }
        }
      };
    } else {
      pathMatcher = function matchRFC(domainIndex) {
        //NOTE: we should use path-match algorithm from S5.1.4 here
        //(see : https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/canonical_cookie.cc#L299)
        Object.keys(domainIndex).forEach(cookiePath => {
          if (pathMatch(path, cookiePath)) {
            const pathIndex = domainIndex[cookiePath];
            for (const key in pathIndex) {
              results.push(pathIndex[key]);
            }
          }
        });
      };
    }

    const domains = permuteDomain(domain, allowSpecialUseDomain) || [domain];
    const idx = this.idx;
    domains.forEach(curDomain => {
      const domainIndex = idx[curDomain];
      if (!domainIndex) {
        return;
      }
      pathMatcher(domainIndex);
    });

    cb(null, results);
  }

  putCookie(cookie, cb) {
    if (!this.idx[cookie.domain]) {
      this.idx[cookie.domain] = Object.create(null);
    }
    if (!this.idx[cookie.domain][cookie.path]) {
      this.idx[cookie.domain][cookie.path] = Object.create(null);
    }
    this.idx[cookie.domain][cookie.path][cookie.key] = cookie;
    cb(null);
  }
  updateCookie(oldCookie, newCookie, cb) {
    // updateCookie() may avoid updating cookies that are identical.  For example,
    // lastAccessed may not be important to some stores and an equality
    // comparison could exclude that field.
    this.putCookie(newCookie, cb);
  }
  removeCookie(domain, path, key, cb) {
    if (
      this.idx[domain] &&
      this.idx[domain][path] &&
      this.idx[domain][path][key]
    ) {
      delete this.idx[domain][path][key];
    }
    cb(null);
  }
  removeCookies(domain, path, cb) {
    if (this.idx[domain]) {
      if (path) {
        delete this.idx[domain][path];
      } else {
        delete this.idx[domain];
      }
    }
    return cb(null);
  }
  removeAllCookies(cb) {
    this.idx = Object.create(null);
    return cb(null);
  }
  getAllCookies(cb) {
    const cookies = [];
    const idx = this.idx;

    const domains = Object.keys(idx);
    domains.forEach(domain => {
      const paths = Object.keys(idx[domain]);
      paths.forEach(path => {
        const keys = Object.keys(idx[domain][path]);
        keys.forEach(key => {
          if (key !== null) {
            cookies.push(idx[domain][path][key]);
          }
        });
      });
    });

    // Sort by creationIndex so deserializing retains the creation order.
    // When implementing your own store, this SHOULD retain the order too
    cookies.sort((a, b) => {
      return (a.creationIndex || 0) - (b.creationIndex || 0);
    });

    cb(null, cookies);
  }
}

[
  "findCookie",
  "findCookies",
  "putCookie",
  "updateCookie",
  "removeCookie",
  "removeCookies",
  "removeAllCookies",
  "getAllCookies"
].forEach(name => {
  MemoryCookieStore.prototype[name] = fromCallback(
    MemoryCookieStore.prototype[name]
  );
});

exports.MemoryCookieStore = MemoryCookieStore;

function inspectFallback(val) {
  const domains = Object.keys(val);
  if (domains.length === 0) {
    return "[Object: null prototype] {}";
  }
  let result = "[Object: null prototype] {\n";
  Object.keys(val).forEach((domain, i) => {
    result += formatDomain(domain, val[domain]);
    if (i < domains.length - 1) {
      result += ",";
    }
    result += "\n";
  });
  result += "}";
  return result;
}

function formatDomain(domainName, domainValue) {
  const indent = "  ";
  let result = `${indent}'${domainName}': [Object: null prototype] {\n`;
  Object.keys(domainValue).forEach((path, i, paths) => {
    result += formatPath(path, domainValue[path]);
    if (i < paths.length - 1) {
      result += ",";
    }
    result += "\n";
  });
  result += `${indent}}`;
  return result;
}

function formatPath(pathName, pathValue) {
  const indent = "    ";
  let result = `${indent}'${pathName}': [Object: null prototype] {\n`;
  Object.keys(pathValue).forEach((cookieName, i, cookieNames) => {
    const cookie = pathValue[cookieName];
    result += `      ${cookieName}: ${cookie.inspect()}`;
    if (i < cookieNames.length - 1) {
      result += ",";
    }
    result += "\n";
  });
  result += `${indent}}`;
  return result;
}

exports.inspectFallback = inspectFallback;

},{"./pathMatch":98,"./permuteDomain":99,"./store":101,"./utilHelper":102,"universalify":106}],98:[function(require,module,exports){
/*!
 * Copyright (c) 2015, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";
/*
 * "A request-path path-matches a given cookie-path if at least one of the
 * following conditions holds:"
 */
function pathMatch(reqPath, cookiePath) {
  // "o  The cookie-path and the request-path are identical."
  if (cookiePath === reqPath) {
    return true;
  }

  const idx = reqPath.indexOf(cookiePath);
  if (idx === 0) {
    // "o  The cookie-path is a prefix of the request-path, and the last
    // character of the cookie-path is %x2F ("/")."
    if (cookiePath.substr(-1) === "/") {
      return true;
    }

    // " o  The cookie-path is a prefix of the request-path, and the first
    // character of the request-path that is not included in the cookie- path
    // is a %x2F ("/") character."
    if (reqPath.substr(cookiePath.length, 1) === "/") {
      return true;
    }
  }

  return false;
}

exports.pathMatch = pathMatch;

},{}],99:[function(require,module,exports){
/*!
 * Copyright (c) 2015, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";
const pubsuffix = require("./pubsuffix-psl");

// Gives the permutation of all possible domainMatch()es of a given domain. The
// array is in shortest-to-longest order.  Handy for indexing.

function permuteDomain(domain, allowSpecialUseDomain) {
  const pubSuf = pubsuffix.getPublicSuffix(domain, {
    allowSpecialUseDomain: allowSpecialUseDomain
  });

  if (!pubSuf) {
    return null;
  }
  if (pubSuf == domain) {
    return [domain];
  }

  // Nuke trailing dot
  if (domain.slice(-1) == ".") {
    domain = domain.slice(0, -1);
  }

  const prefix = domain.slice(0, -(pubSuf.length + 1)); // ".example.com"
  const parts = prefix.split(".").reverse();
  let cur = pubSuf;
  const permutations = [cur];
  while (parts.length) {
    cur = `${parts.shift()}.${cur}`;
    permutations.push(cur);
  }
  return permutations;
}

exports.permuteDomain = permuteDomain;

},{"./pubsuffix-psl":100}],100:[function(require,module,exports){
/*!
 * Copyright (c) 2018, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";
const psl = require("psl");

// RFC 6761
const SPECIAL_USE_DOMAINS = [
  "local",
  "example",
  "invalid",
  "localhost",
  "test"
];

const SPECIAL_TREATMENT_DOMAINS = ["localhost", "invalid"];

function getPublicSuffix(domain, options = {}) {
  const domainParts = domain.split(".");
  const topLevelDomain = domainParts[domainParts.length - 1];
  const allowSpecialUseDomain = !!options.allowSpecialUseDomain;
  const ignoreError = !!options.ignoreError;

  if (allowSpecialUseDomain && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
    if (domainParts.length > 1) {
      const secondLevelDomain = domainParts[domainParts.length - 2];
      // In aforementioned example, the eTLD/pubSuf will be apple.localhost
      return `${secondLevelDomain}.${topLevelDomain}`;
    } else if (SPECIAL_TREATMENT_DOMAINS.includes(topLevelDomain)) {
      // For a single word special use domain, e.g. 'localhost' or 'invalid', per RFC 6761,
      // "Application software MAY recognize {localhost/invalid} names as special, or
      // MAY pass them to name resolution APIs as they would for other domain names."
      return `${topLevelDomain}`;
    }
  }

  if (!ignoreError && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
    throw new Error(
      `Cookie has domain set to the public suffix "${topLevelDomain}" which is a special use domain. To allow this, configure your CookieJar with {allowSpecialUseDomain:true, rejectPublicSuffixes: false}.`
    );
  }

  return psl.get(domain);
}

exports.getPublicSuffix = getPublicSuffix;

},{"psl":91}],101:[function(require,module,exports){
/*!
 * Copyright (c) 2015, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";
/*jshint unused:false */

class Store {
  constructor() {
    this.synchronous = false;
  }

  findCookie(domain, path, key, cb) {
    throw new Error("findCookie is not implemented");
  }

  findCookies(domain, path, allowSpecialUseDomain, cb) {
    throw new Error("findCookies is not implemented");
  }

  putCookie(cookie, cb) {
    throw new Error("putCookie is not implemented");
  }

  updateCookie(oldCookie, newCookie, cb) {
    // recommended default implementation:
    // return this.putCookie(newCookie, cb);
    throw new Error("updateCookie is not implemented");
  }

  removeCookie(domain, path, key, cb) {
    throw new Error("removeCookie is not implemented");
  }

  removeCookies(domain, path, cb) {
    throw new Error("removeCookies is not implemented");
  }

  removeAllCookies(cb) {
    throw new Error("removeAllCookies is not implemented");
  }

  getAllCookies(cb) {
    throw new Error(
      "getAllCookies is not implemented (therefore jar cannot be serialized)"
    );
  }
}

exports.Store = Store;

},{}],102:[function(require,module,exports){
function requireUtil() {
  try {
    // eslint-disable-next-line no-restricted-modules
    return require("util");
  } catch (e) {
    return null;
  }
}

// for v10.12.0+
function lookupCustomInspectSymbol() {
  return Symbol.for("nodejs.util.inspect.custom");
}

// for older node environments
function tryReadingCustomSymbolFromUtilInspect(options) {
  const _requireUtil = options.requireUtil || requireUtil;
  const util = _requireUtil();
  return util ? util.inspect.custom : null;
}

exports.getUtilInspect = function getUtilInspect(fallback, options = {}) {
  const _requireUtil = options.requireUtil || requireUtil;
  const util = _requireUtil();
  return function inspect(value, showHidden, depth) {
    return util ? util.inspect(value, showHidden, depth) : fallback(value);
  };
};

exports.getCustomInspectSymbol = function getCustomInspectSymbol(options = {}) {
  const _lookupCustomInspectSymbol =
    options.lookupCustomInspectSymbol || lookupCustomInspectSymbol;

  // get custom inspect symbol for node environments
  return (
    _lookupCustomInspectSymbol() ||
    tryReadingCustomSymbolFromUtilInspect(options)
  );
};

},{"util":111}],103:[function(require,module,exports){
/* ************************************************************************************
Extracted from check-types.js
https://gitlab.com/philbooth/check-types.js

MIT License

Copyright (c) 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019 Phil Booth

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

************************************************************************************ */
"use strict";

/* Validation functions copied from check-types package - https://www.npmjs.com/package/check-types */
function isFunction(data) {
  return typeof data === "function";
}

function isNonEmptyString(data) {
  return isString(data) && data !== "";
}

function isDate(data) {
  return isInstanceStrict(data, Date) && isInteger(data.getTime());
}

function isEmptyString(data) {
  return data === "" || (data instanceof String && data.toString() === "");
}

function isString(data) {
  return typeof data === "string" || data instanceof String;
}

function isObject(data) {
  return toString.call(data) === "[object Object]";
}
function isInstanceStrict(data, prototype) {
  try {
    return data instanceof prototype;
  } catch (error) {
    return false;
  }
}

function isInteger(data) {
  return typeof data === "number" && data % 1 === 0;
}
/* End validation functions */

function validate(bool, cb, options) {
  if (!isFunction(cb)) {
    options = cb;
    cb = null;
  }
  if (!isObject(options)) options = { Error: "Failed Check" };
  if (!bool) {
    if (cb) {
      cb(new ParameterError(options));
    } else {
      throw new ParameterError(options);
    }
  }
}

class ParameterError extends Error {
  constructor(...params) {
    super(...params);
  }
}

exports.ParameterError = ParameterError;
exports.isFunction = isFunction;
exports.isNonEmptyString = isNonEmptyString;
exports.isDate = isDate;
exports.isEmptyString = isEmptyString;
exports.isString = isString;
exports.isObject = isObject;
exports.validate = validate;

},{}],104:[function(require,module,exports){
// generated by genversion
module.exports = '4.1.3'

},{}],105:[function(require,module,exports){
'use strict';

/** Highest positive signed 32-bit float value */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUnicode = exports.toASCII = exports.encode = exports.default = exports.decode = void 0;
exports.ucs2decode = ucs2decode;
exports.ucs2encode = void 0;
const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'

/** Regular expressions */
const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
const errors = {
  'overflow': 'Overflow: input needs wider integers to process',
  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
  throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, callback) {
  const result = [];
  let length = array.length;
  while (length--) {
    result[length] = callback(array[length]);
  }
  return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {String} A new string of characters returned by the callback
 * function.
 */
function mapDomain(domain, callback) {
  const parts = domain.split('@');
  let result = '';
  if (parts.length > 1) {
    // In email addresses, only the domain name should be punycoded. Leave
    // the local part (i.e. everything up to `@`) intact.
    result = parts[0] + '@';
    domain = parts[1];
  }
  // Avoid `split(regex)` for IE8 compatibility. See #17.
  domain = domain.replace(regexSeparators, '\x2E');
  const labels = domain.split('.');
  const encoded = map(labels, callback).join('.');
  return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      const extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) {
        // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
const ucs2encode = codePoints => String.fromCodePoint(...codePoints);

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
exports.ucs2encode = ucs2encode;
const basicToDigit = function (codePoint) {
  if (codePoint >= 0x30 && codePoint < 0x3A) {
    return 26 + (codePoint - 0x30);
  }
  if (codePoint >= 0x41 && codePoint < 0x5B) {
    return codePoint - 0x41;
  }
  if (codePoint >= 0x61 && codePoint < 0x7B) {
    return codePoint - 0x61;
  }
  return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
const digitToBasic = function (digit, flag) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
const adapt = function (delta, numPoints, firstTime) {
  let k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for /* no initialization */
  (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
const decode = function (input) {
  // Don't use UCS-2.
  const output = [];
  const inputLength = input.length;
  let i = 0;
  let n = initialN;
  let bias = initialBias;

  // Handle the basic code points: let `basic` be the number of input code
  // points before the last delimiter, or `0` if there is none, then copy
  // the first basic code points to the output.

  let basic = input.lastIndexOf(delimiter);
  if (basic < 0) {
    basic = 0;
  }
  for (let j = 0; j < basic; ++j) {
    // if it's not a basic code point
    if (input.charCodeAt(j) >= 0x80) {
      error('not-basic');
    }
    output.push(input.charCodeAt(j));
  }

  // Main decoding loop: start just after the last delimiter if any basic code
  // points were copied; start at the beginning otherwise.

  for /* no final expression */
  (let index = basic > 0 ? basic + 1 : 0; index < inputLength;) {
    // `index` is the index of the next character to be consumed.
    // Decode a generalized variable-length integer into `delta`,
    // which gets added to `i`. The overflow checking is easier
    // if we increase `i` as we go, then subtract off its starting
    // value at the end to obtain `delta`.
    const oldi = i;
    for /* no condition */
    (let w = 1, k = base;; k += base) {
      if (index >= inputLength) {
        error('invalid-input');
      }
      const digit = basicToDigit(input.charCodeAt(index++));
      if (digit >= base) {
        error('invalid-input');
      }
      if (digit > floor((maxInt - i) / w)) {
        error('overflow');
      }
      i += digit * w;
      const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
      if (digit < t) {
        break;
      }
      const baseMinusT = base - t;
      if (w > floor(maxInt / baseMinusT)) {
        error('overflow');
      }
      w *= baseMinusT;
    }
    const out = output.length + 1;
    bias = adapt(i - oldi, out, oldi == 0);

    // `i` was supposed to wrap around from `out` to `0`,
    // incrementing `n` each time, so we'll fix that now:
    if (floor(i / out) > maxInt - n) {
      error('overflow');
    }
    n += floor(i / out);
    i %= out;

    // Insert `n` at position `i` of the output.
    output.splice(i++, 0, n);
  }
  return String.fromCodePoint(...output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
exports.decode = decode;
const encode = function (input) {
  const output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  const inputLength = input.length;

  // Initialize the state.
  let n = initialN;
  let delta = 0;
  let bias = initialBias;

  // Handle the basic code points.
  for (const currentValue of input) {
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }
  const basicLength = output.length;
  let handledCPCount = basicLength;

  // `handledCPCount` is the number of code points that have been handled;
  // `basicLength` is the number of basic code points.

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next
    // larger one:
    let m = maxInt;
    for (const currentValue of input) {
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
    // but guard against overflow.
    const handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error('overflow');
    }
    delta += (m - n) * handledCPCountPlusOne;
    n = m;
    for (const currentValue of input) {
      if (currentValue < n && ++delta > maxInt) {
        error('overflow');
      }
      if (currentValue === n) {
        // Represent delta as a generalized variable-length integer.
        let q = delta;
        for /* no condition */
        (let k = base;; k += base) {
          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) {
            break;
          }
          const qMinusT = q - t;
          const baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
          q = floor(qMinusT / baseMinusT);
        }
        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }
    ++delta;
    ++n;
  }
  return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
exports.encode = encode;
const toUnicode = function (input) {
  return mapDomain(input, function (string) {
    return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
  });
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
exports.toUnicode = toUnicode;
const toASCII = function (input) {
  return mapDomain(input, function (string) {
    return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
  });
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
exports.toASCII = toASCII;
const punycode = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  'version': '2.3.1',
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  'ucs2': {
    'decode': ucs2decode,
    'encode': ucs2encode
  },
  'decode': decode,
  'encode': encode,
  'toASCII': toASCII,
  'toUnicode': toUnicode
};
var _default = exports.default = punycode;

},{}],106:[function(require,module,exports){
'use strict'

exports.fromCallback = function (fn) {
  return Object.defineProperty(function () {
    if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments)
    else {
      return new Promise((resolve, reject) => {
        arguments[arguments.length] = (err, res) => {
          if (err) return reject(err)
          resolve(res)
        }
        arguments.length++
        fn.apply(this, arguments)
      })
    }
  }, 'name', { value: fn.name })
}

exports.fromPromise = function (fn) {
  return Object.defineProperty(function () {
    const cb = arguments[arguments.length - 1]
    if (typeof cb !== 'function') return fn.apply(this, arguments)
    else {
      delete arguments[arguments.length - 1]
      arguments.length--
      fn.apply(this, arguments).then(r => cb(null, r), cb)
    }
  }, 'name', { value: fn.name })
}

},{}],107:[function(require,module,exports){
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.URI = global.URI || {})));
}(this, (function (exports) { 'use strict';

function merge() {
    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
    }

    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    } else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
}
function assign(target, source) {
    var obj = target;
    if (source) {
        for (var key in source) {
            obj[key] = source[key];
        }
    }
    return obj;
}

function buildExps(isIRI) {
    var ALPHA$$ = "[A-Za-z]",
        CR$ = "[\\x0D]",
        DIGIT$$ = "[0-9]",
        DQUOTE$$ = "[\\x22]",
        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
        //case-insensitive
    LF$$ = "[\\x0A]",
        SP$$ = "[\\x20]",
        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
        //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
        //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
        //subset
    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
        SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
        USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
        DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
        DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
        //relaxed parsing rules
    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
        H16$ = subexp(HEXDIG$$ + "{1,4}"),
        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
        //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
        //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
        //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
        //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
        //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
        //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
        //RFC 6874
    IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
        //RFC 6874
    IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
        //RFC 6874, with relaxed parsing rules
    IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
        IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
        //RFC 6874
    REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
        HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
        PORT$ = subexp(DIGIT$$ + "*"),
        AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
        PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
        SEGMENT$ = subexp(PCHAR$ + "*"),
        SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
        SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
        PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
        PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
        //simplified
    PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
        //simplified
    PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
        //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
        PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
        FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
        HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
        RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
        ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
        GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
        SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
    };
}
var URI_PROTOCOL = buildExps(false);

var IRI_PROTOCOL = buildExps(true);

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Highest positive signed 32-bit float value */

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error$1(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	var result = [];
	var length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	var parts = string.split('@');
	var result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	var labels = string.split('.');
	var encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			var extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
	return String.fromCodePoint.apply(String, toConsumableArray(array));
};

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
var basicToDigit = function basicToDigit(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
var digitToBasic = function digitToBasic(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
var adapt = function adapt(delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
var decode = function decode(input) {
	// Don't use UCS-2.
	var output = [];
	var inputLength = input.length;
	var i = 0;
	var n = initialN;
	var bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	var basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (var j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error$1('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		var oldi = i;
		for (var w = 1, k = base;; /* no condition */k += base) {

			if (index >= inputLength) {
				error$1('invalid-input');
			}

			var digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error$1('overflow');
			}

			i += digit * w;
			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

			if (digit < t) {
				break;
			}

			var baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error$1('overflow');
			}

			w *= baseMinusT;
		}

		var out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error$1('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint.apply(String, output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
var encode = function encode(input) {
	var output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	var inputLength = input.length;

	// Initialize the state.
	var n = initialN;
	var delta = 0;
	var bias = initialBias;

	// Handle the basic code points.
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _currentValue2 = _step.value;

			if (_currentValue2 < 0x80) {
				output.push(stringFromCharCode(_currentValue2));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var basicLength = output.length;
	var handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		var m = maxInt;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var currentValue = _step2.value;

				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error$1('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _currentValue = _step3.value;

				if (_currentValue < n && ++delta > maxInt) {
					error$1('overflow');
				}
				if (_currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					var q = delta;
					for (var k = base;; /* no condition */k += base) {
						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						var qMinusT = q - t;
						var baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		++delta;
		++n;
	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
var toUnicode = function toUnicode(input) {
	return mapDomain(input, function (string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
var toASCII = function toASCII(input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
var punycode = {
	/**
  * A string representing the current Punycode.js version number.
  * @memberOf punycode
  * @type String
  */
	'version': '2.1.0',
	/**
  * An object of methods to convert from JavaScript's internal character
  * representation (UCS-2) to Unicode code points, and back.
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode
  * @type Object
  */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */
var SCHEMES = {};
function pctEncChar(chr) {
    var c = chr.charCodeAt(0);
    var e = void 0;
    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    var newStr = "";
    var i = 0;
    var il = str.length;
    while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
                var c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        } else if (c >= 224) {
            if (il - i >= 9) {
                var _c = parseInt(str.substr(i + 4, 2), 16);
                var c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        } else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
    }
    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    return components;
}

function _stripLeadingZeros(str) {
    return str.replace(/^0*(.*)/, "$1") || "0";
}
function _normalizeIPv4(host, protocol) {
    var matches = host.match(protocol.IPV4ADDRESS) || [];

    var _matches = slicedToArray(matches, 2),
        address = _matches[1];

    if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
    } else {
        return host;
    }
}
function _normalizeIPv6(host, protocol) {
    var matches = host.match(protocol.IPV6ADDRESS) || [];

    var _matches2 = slicedToArray(matches, 3),
        address = _matches2[1],
        zone = _matches2[2];

    if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
            last = _address$toLowerCase$2[0],
            first = _address$toLowerCase$2[1];

        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
        }
        if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function (acc, field, index) {
            if (!field || field === "0") {
                var lastLongest = acc[acc.length - 1];
                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                    lastLongest.length++;
                } else {
                    acc.push({ index: index, length: 1 });
                }
            }
            return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function (a, b) {
            return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
            newHost = fields.join(":");
        }
        if (zone) {
            newHost += "%" + zone;
        }
        return newHost;
    } else {
        return host;
    }
}
var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
function parse(uriString) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var components = {};
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    var matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        } else {
            //IE FIX for improper RegExp matching
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
            //fix port number
            if (isNaN(components.port)) {
                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
            }
        }
        if (components.host) {
            //normalize IP hosts
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        } else if (components.scheme === undefined) {
            components.reference = "relative";
        } else if (components.fragment === undefined) {
            components.reference = "absolute";
        } else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    } else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}

function _recomposeAuthority(components, options) {
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //normalize IP hosts, add brackets and escape zone separator for IPv6
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
    }
    if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}

var RDS1 = /^\.\.?\//;
var RDS2 = /^\/\.(\/|$)/;
var RDS3 = /^\/\.\.(\/|$)/;
var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    var output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            var im = input.match(RDS5);
            if (im) {
                var s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}

function serialize(components) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    //find scheme handler
    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {}
        //TODO: normalize IPv6 address as per RFC 5952

        //if host component is a domain name
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                //convert IDN via punycode
                try {
                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
            }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    var authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}

function resolveComponents(base, relative) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var skipNormalization = arguments[3];

    var target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}

function resolve(baseURI, relativeURI, options) {
    var schemelessOptions = assign({ scheme: 'null' }, options);
    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
}

function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    } else if (typeOf(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}

function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}

function escapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
}

function unescapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
}

var handler = {
    scheme: "http",
    domainHost: true,
    parse: function parse(components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function serialize(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        //normalize the default port
        if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
};

var handler$1 = {
    scheme: "https",
    domainHost: handler.domainHost,
    parse: handler.parse,
    serialize: handler.serialize
};

function isSecure(wsComponents) {
    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
}
//RFC 6455
var handler$2 = {
    scheme: "ws",
    domainHost: true,
    parse: function parse(components, options) {
        var wsComponents = components;
        //indicate if the secure flag is set
        wsComponents.secure = isSecure(wsComponents);
        //construct resouce name
        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
        wsComponents.path = undefined;
        wsComponents.query = undefined;
        return wsComponents;
    },
    serialize: function serialize(wsComponents, options) {
        //normalize the default port
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = undefined;
        }
        //ensure scheme matches secure flag
        if (typeof wsComponents.secure === 'boolean') {
            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
            wsComponents.secure = undefined;
        }
        //reconstruct path from resource name
        if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                path = _wsComponents$resourc2[0],
                query = _wsComponents$resourc2[1];

            wsComponents.path = path && path !== '/' ? path : undefined;
            wsComponents.query = query;
            wsComponents.resourceName = undefined;
        }
        //forbid fragment component
        wsComponents.fragment = undefined;
        return wsComponents;
    }
};

var handler$3 = {
    scheme: "wss",
    domainHost: handler$2.domainHost,
    parse: handler$2.parse,
    serialize: handler$2.serialize
};

var O = {};
var isIRI = true;
//RFC 3986
var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
var UNRESERVED = new RegExp(UNRESERVED$$, "g");
var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
var NOT_HFVALUE = NOT_HFNAME;
function decodeUnreserved(str) {
    var decStr = pctDecChars(str);
    return !decStr.match(UNRESERVED) ? str : decStr;
}
var handler$4 = {
    scheme: "mailto",
    parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = undefined;
        if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                var hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        var toAddrs = hfield[1].split(",");
                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                            to.push(toAddrs[_x]);
                        }
                        break;
                    case "subject":
                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                        break;
                    case "body":
                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
        }
        mailtoComponents.query = undefined;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                } catch (e) {
                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            } else {
                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
        }
        return mailtoComponents;
    },
    serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
                var toAddr = String(to[x]);
                var atIdx = toAddr.lastIndexOf("@");
                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                var domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                } catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
};

var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
var handler$5 = {
    scheme: "urn",
    parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = undefined;
            if (schemeHandler) {
                urnComponents = schemeHandler.parse(urnComponents, options);
            }
        } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
    },
    serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
    }
};

var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
var handler$6 = {
    scheme: "urn:uuid",
    parse: function parse(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = undefined;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
    },
    serialize: function serialize(uuidComponents, options) {
        var urnComponents = uuidComponents;
        //normalize UUID
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
    }
};

SCHEMES[handler.scheme] = handler;
SCHEMES[handler$1.scheme] = handler$1;
SCHEMES[handler$2.scheme] = handler$2;
SCHEMES[handler$3.scheme] = handler$3;
SCHEMES[handler$4.scheme] = handler$4;
SCHEMES[handler$5.scheme] = handler$5;
SCHEMES[handler$6.scheme] = handler$6;

exports.SCHEMES = SCHEMES;
exports.pctEncChar = pctEncChar;
exports.pctDecChars = pctDecChars;
exports.parse = parse;
exports.removeDotSegments = removeDotSegments;
exports.serialize = serialize;
exports.resolveComponents = resolveComponents;
exports.resolve = resolve;
exports.normalize = normalize;
exports.equal = equal;
exports.escapeComponent = escapeComponent;
exports.unescapeComponent = unescapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));


},{}],108:[function(require,module,exports){
(function (global){(function (){
'use strict';

var required = require('requires-port')
  , qs = require('querystringify')
  , controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/
  , CRHTLF = /[\n\r\t]/g
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
  , port = /:\d+$/
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i
  , windowsDriveLetter = /^[a-zA-Z]:/;

/**
 * Remove control characters and whitespace from the beginning of a string.
 *
 * @param {Object|String} str String to trim.
 * @returns {String} A new string representing `str` stripped of control
 *     characters and whitespace from its beginning.
 * @public
 */
function trimLeft(str) {
  return (str ? str : '').toString().replace(controlOrWhitespace, '');
}

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address, url) {     // Sanitize what is left of the address
    return isSpecial(url.protocol) ? address.replace(/\\/g, '/') : address;
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d*)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof global !== 'undefined') globalVar = global;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * Check whether a protocol scheme is special.
 *
 * @param {String} The protocol scheme of the URL
 * @return {Boolean} `true` if the protocol scheme is special, else `false`
 * @private
 */
function isSpecial(scheme) {
  return (
    scheme === 'file:' ||
    scheme === 'ftp:' ||
    scheme === 'http:' ||
    scheme === 'https:' ||
    scheme === 'ws:' ||
    scheme === 'wss:'
  );
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @param {Object} location
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address, location) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, '');
  location = location || {};

  var match = protocolre.exec(address);
  var protocol = match[1] ? match[1].toLowerCase() : '';
  var forwardSlashes = !!match[2];
  var otherSlashes = !!match[3];
  var slashesCount = 0;
  var rest;

  if (forwardSlashes) {
    if (otherSlashes) {
      rest = match[2] + match[3] + match[4];
      slashesCount = match[2].length + match[3].length;
    } else {
      rest = match[2] + match[4];
      slashesCount = match[2].length;
    }
  } else {
    if (otherSlashes) {
      rest = match[3] + match[4];
      slashesCount = match[3].length;
    } else {
      rest = match[4]
    }
  }

  if (protocol === 'file:') {
    if (slashesCount >= 2) {
      rest = rest.slice(2);
    }
  } else if (isSpecial(protocol)) {
    rest = match[4];
  } else if (protocol) {
    if (forwardSlashes) {
      rest = rest.slice(2);
    }
  } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
    rest = match[4];
  }

  return {
    protocol: protocol,
    slashes: forwardSlashes || isSpecial(protocol),
    slashesCount: slashesCount,
    rest: rest
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  if (relative === '') return base;

  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, '');

  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '', location);
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (
    extracted.protocol === 'file:' && (
      extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) ||
    (!extracted.slashes &&
      (extracted.protocol ||
        extracted.slashesCount < 2 ||
        !isSpecial(url.protocol)))
  ) {
    instructions[3] = [/(.*)/, 'pathname'];
  }

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address, url);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      index = parse === '@'
        ? address.lastIndexOf(parse)
        : address.indexOf(parse);

      if (~index) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // Default to a / for pathname if none exists. This normalizes the URL
  // to always have a /
  //
  if (url.pathname.charAt(0) !== '/' && isSpecial(url.protocol)) {
    url.pathname = '/' + url.pathname;
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';

  if (url.auth) {
    index = url.auth.indexOf(':');

    if (~index) {
      url.username = url.auth.slice(0, index);
      url.username = encodeURIComponent(decodeURIComponent(url.username));

      url.password = url.auth.slice(index + 1);
      url.password = encodeURIComponent(decodeURIComponent(url.password))
    } else {
      url.username = encodeURIComponent(decodeURIComponent(url.auth));
    }

    url.auth = url.password ? url.username +':'+ url.password : url.username;
  }

  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (port.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    case 'username':
    case 'password':
      url[part] = encodeURIComponent(value);
      break;

    case 'auth':
      var index = value.indexOf(':');

      if (~index) {
        url.username = value.slice(0, index);
        url.username = encodeURIComponent(decodeURIComponent(url.username));

        url.password = value.slice(index + 1);
        url.password = encodeURIComponent(decodeURIComponent(url.password));
      } else {
        url.username = encodeURIComponent(decodeURIComponent(value));
      }
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.auth = url.password ? url.username +':'+ url.password : url.username;

  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , host = url.host
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result =
    protocol +
    ((url.protocol && url.slashes) || isSpecial(url.protocol) ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  } else if (url.password) {
    result += ':'+ url.password;
    result += '@';
  } else if (
    url.protocol !== 'file:' &&
    isSpecial(url.protocol) &&
    !host &&
    url.pathname !== '/'
  ) {
    //
    // Add back the empty userinfo, otherwise the original invalid URL
    // might be transformed into a valid one with `url.pathname` as host.
    //
    result += '@';
  }

  //
  // Trailing colon is removed from `url.host` when it is parsed. If it still
  // ends with a colon, then add back the trailing colon that was removed. This
  // prevents an invalid URL from being transformed into a valid one.
  //
  if (host[host.length - 1] === ':' || (port.test(url.hostname) && !url.port)) {
    host += ':';
  }

  result += host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;

module.exports = Url;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"querystringify":93,"requires-port":94}],109:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],110:[function(require,module,exports){
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

'use strict';

var isArgumentsObject = require('is-arguments');
var isGeneratorFunction = require('is-generator-function');
var whichTypedArray = require('which-typed-array');
var isTypedArray = require('is-typed-array');

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});

},{"is-arguments":84,"is-generator-function":86,"is-typed-array":87,"which-typed-array":112}],111:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = require('./support/types');

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

}).call(this)}).call(this,require('_process'))
},{"./support/isBuffer":109,"./support/types":110,"_process":89,"inherits":83}],112:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('for-each');
var availableTypedArrays = require('available-typed-arrays');
var callBind = require('call-bind');
var callBound = require('call-bind/callBound');
var gOPD = require('gopd');

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = require('has-tostringtag/shams')();

var g = typeof globalThis === 'undefined' ? global : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			cache['$' + typedArray] = callBind(descriptor.get);
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			cache['$' + typedArray] = callBind(fn);
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var found = false;
	forEach(cache, function (getter, typedArray) {
		if (!found) {
			try {
				if ('$' + getter(value) === typedArray) {
					found = $slice(typedArray, 1);
				}
			} catch (e) { /**/ }
		}
	});
	return found;
};

var trySlices = function tryAllSlices(value) {
	var found = false;
	forEach(cache, function (getter, name) {
		if (!found) {
			try {
				getter(value);
				found = $slice(name, 1);
			} catch (e) { /**/ }
		}
	});
	return found;
};

module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":67,"call-bind":69,"call-bind/callBound":68,"for-each":72,"gopd":76,"has-tostringtag/shams":81}],113:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  "name": "yahoo-finance2",
  "version": "2.8.1",
  "description": "JS API for Yahoo Finance",
  "type": "module",
  "module": "./dist/esm/src/index-node.js",
  "main": "./dist/cjs/src/index-node.js",
  "exports": {
    "import": "./dist/esm/src/index-node.js",
    "default": "./dist/cjs/src/index-node.js"
  },
  "types": "./dist/esm/src/index-node.d.ts",
  "browser": "./dist/esm/src/index-browser.js",
  "repository": "https://github.com/gadicc/node-yahoo-finance2",
  "author": "Gadi Cohen <dragon@wastelands.net>",
  "license": "MIT",
  "keywords": ["yahoo", "finance", "financial", "data", "stock", "price", "quote", "historical", "eod", "end-of-day", "client", "library"],
  "engines": {
    "node": ">=16.0.0"
  },
  "bin": {
    "yahoo-finance": "bin/yahoo-finance.js"
  },
  "scripts": {
    "coverage": "yarn test --coverage",
    "lint": "eslint . --ext .js,.ts",
    "//schema": "ts-json-schema-generator -f tsconfig.json -p 'src/{modules/**/*.ts,lib/options.ts}' -t '*' | node bin/schema-tweak.js > schema.json",
    "schema": "node --loader ts-node/esm scripts/schema.js > schema.json",
    "build": "yarn run build:esm && yarn run build:cjs && yarn run build:post",
    "build:esm": "tsc --module es2020 --target es2019 --outDir dist/esm",
    "build:cjs": "tsc --module commonjs --target es2015 --outDir dist/cjs && sed 's/\"type\": \"module\",/\"type:\": \"commonjs\",/' dist/cjs/package.json > dist/cjs/package-changed.json && mv dist/cjs/package-changed.json dist/cjs/package.json",
    "build:post": "scripts/json-transform.sh",
    "generateSchema": "yarn schema",
    "prepublishOnly": "yarn build && yarn generateSchema && yarn build:post",
    "test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js",
    "test:ts": "tsc --noEmit",
    "test:esm": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js -c tests-modules/esm/jest.config.js tests-modules/esm/tests/*",
    "test:cjs": "node ./node_modules/jest/bin/jest.js -c tests-modules/cjs/jest.config.js tests-modules/cjs/tests/*",
    "test:modules": "yarn test:esm && yarn test:cjs",
    "test:build": "yarn test:modules"
  },
  "files": ["dist", "schema.json"],
  "dependencies": {
    "@types/tough-cookie": "^4.0.2",
    "ajv": "8.10.0",
    "ajv-formats": "2.1.1",
    "node-fetch": "^2.6.1",
    "tough-cookie": "^4.1.2",
    "tough-cookie-file-store": "^2.0.3"
  },
  "devDependencies": {
    "@semantic-release/changelog": "6.0.3",
    "@semantic-release/commit-analyzer": "9.0.2",
    "@semantic-release/git": "10.0.1",
    "@semantic-release/github": "8.1.0",
    "@semantic-release/npm": "9.0.2",
    "@semantic-release/release-notes-generator": "10.0.3",
    "@tsconfig/node12": "12.1.0",
    "@types/jest": "29.5.6",
    "@types/node-fetch": "2.6.7",
    "@typescript-eslint/eslint-plugin": "5.62.0",
    "@typescript-eslint/parser": "5.62.0",
    "eslint": "8.52.0",
    "eslint-config-prettier": "8.10.0",
    "globby": "13.2.2",
    "jest": "29.7.0",
    "jest-tobetype": "1.2.3",
    "oas-schema-walker": "1.1.5",
    "prettier": "2.8.8",
    "semantic-release": "19.0.5",
    "ts-jest": "29.1.1",
    "ts-json-schema-generator": "1.4.0",
    "ts-node": "10.9.1",
    "typescript": "5.2.2"
  }
};

},{}],114:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$comment": "DO NOT EDIT THIS FILE.  It is generated automatically from typescript interfaces in the project.  To update, run `yarn schema`.",
  "definitions": {
    "Logger": {
      "type": "object",
      "properties": {
        "info": {},
        "warn": {},
        "error": {},
        "debug": {}
      },
      "required": ["info", "warn", "error", "debug"],
      "additionalProperties": false
    },
    "YahooFinanceOptions": {
      "type": "object",
      "properties": {
        "YF_QUERY_HOST": {
          "type": "string"
        },
        "cookieJar": {
          "$ref": "#/definitions/ExtendedCookieJar"
        },
        "queue": {
          "$ref": "#/definitions/QueueOptions"
        },
        "validation": {
          "$ref": "#/definitions/ValidationOptions"
        },
        "logger": {
          "$ref": "#/definitions/Logger"
        }
      },
      "additionalProperties": false
    },
    "ExtendedCookieJar": {
      "type": "object",
      "additionalProperties": false,
      "properties": {}
    },
    "CookieJar": {
      "type": "object",
      "additionalProperties": false
    },
    "QueueOptions": {
      "type": "object",
      "properties": {
        "concurrency": {
          "yahooFinanceType": "number"
        },
        "timeout": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": false
    },
    "ValidationOptions": {
      "type": "object",
      "properties": {
        "logErrors": {
          "type": "boolean"
        },
        "logOptionsErrors": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof autoc>": {
      "type": "object",
      "additionalProperties": false
    },
    "ChartResultObject": {
      "type": "object",
      "properties": {
        "meta": {
          "$ref": "#/definitions/ChartMeta"
        },
        "timestamp": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "events": {
          "$ref": "#/definitions/ChartEventsObject"
        },
        "indicators": {
          "$ref": "#/definitions/ChartIndicatorsObject"
        }
      },
      "required": ["meta", "indicators"]
    },
    "ChartMeta": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "exchangeName": {
          "type": "string"
        },
        "instrumentType": {
          "type": "string"
        },
        "firstTradeDate": {
          "yahooFinanceType": "date|null"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "gmtoffset": {
          "yahooFinanceType": "number"
        },
        "timezone": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "chartPreviousClose": {
          "yahooFinanceType": "number"
        },
        "previousClose": {
          "yahooFinanceType": "number"
        },
        "scale": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "currentTradingPeriod": {
          "type": "object",
          "properties": {
            "pre": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            },
            "regular": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            },
            "post": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            }
          },
          "required": ["pre", "regular", "post"]
        },
        "tradingPeriods": {
          "$ref": "#/definitions/ChartMetaTradingPeriods"
        },
        "dataGranularity": {
          "type": "string"
        },
        "range": {
          "type": "string"
        },
        "validRanges": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["currency", "symbol", "exchangeName", "instrumentType", "firstTradeDate", "regularMarketTime", "gmtoffset", "timezone", "exchangeTimezoneName", "regularMarketPrice", "priceHint", "currentTradingPeriod", "dataGranularity", "range", "validRanges"]
    },
    "ChartMetaTradingPeriod": {
      "type": "object",
      "properties": {
        "timezone": {
          "type": "string"
        },
        "start": {
          "yahooFinanceType": "date"
        },
        "end": {
          "yahooFinanceType": "date"
        },
        "gmtoffset": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["timezone", "start", "end", "gmtoffset"]
    },
    "ChartMetaTradingPeriods": {
      "type": "object",
      "properties": {
        "pre": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            }
          }
        },
        "post": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            }
          }
        },
        "regular": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            }
          }
        }
      }
    },
    "ChartEventsObject": {
      "type": "object",
      "properties": {
        "dividends": {
          "$ref": "#/definitions/ChartEventDividends"
        },
        "splits": {
          "$ref": "#/definitions/ChartEventSplits"
        }
      }
    },
    "ChartEventDividends": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/ChartEventDividend"
      }
    },
    "ChartEventDividend": {
      "type": "object",
      "properties": {
        "amount": {
          "yahooFinanceType": "number"
        },
        "date": {
          "yahooFinanceType": "date"
        }
      },
      "required": ["amount", "date"]
    },
    "ChartEventSplits": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/ChartEventSplit"
      }
    },
    "ChartEventSplit": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "numerator": {
          "yahooFinanceType": "number"
        },
        "denominator": {
          "yahooFinanceType": "number"
        },
        "splitRatio": {
          "type": "string"
        }
      },
      "required": ["date", "numerator", "denominator", "splitRatio"]
    },
    "ChartIndicatorsObject": {
      "type": "object",
      "properties": {
        "quote": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartIndicatorQuote"
          }
        },
        "adjclose": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartIndicatorAdjclose"
          }
        }
      },
      "required": ["quote"]
    },
    "ChartIndicatorQuote": {
      "type": "object",
      "properties": {
        "high": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        },
        "low": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        },
        "open": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        },
        "close": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        },
        "volume": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        }
      },
      "required": ["high", "low", "open", "close", "volume"]
    },
    "ChartIndicatorAdjclose": {
      "type": "object",
      "properties": {
        "adjclose": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        }
      }
    },
    "ChartResultArray": {
      "type": "object",
      "properties": {
        "meta": {
          "$ref": "#/definitions/ChartMeta"
        },
        "events": {
          "$ref": "#/definitions/ChartEventsArray"
        },
        "quotes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartResultArrayQuote"
          }
        }
      },
      "required": ["meta", "quotes"],
      "additionalProperties": false
    },
    "ChartEventsArray": {
      "type": "object",
      "properties": {
        "dividends": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartEventDividend"
          }
        },
        "splits": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartEventSplit"
          }
        }
      }
    },
    "ChartResultArrayQuote": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "high": {
          "yahooFinanceType": "number|null"
        },
        "low": {
          "yahooFinanceType": "number|null"
        },
        "open": {
          "yahooFinanceType": "number|null"
        },
        "close": {
          "yahooFinanceType": "number|null"
        },
        "volume": {
          "yahooFinanceType": "number|null"
        },
        "adjclose": {
          "yahooFinanceType": "number|null"
        }
      },
      "required": ["date", "high", "low", "open", "close", "volume"]
    },
    "ChartOptions": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "period2": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "useYfid": {
          "type": "boolean"
        },
        "interval": {
          "type": "string",
          "enum": ["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"]
        },
        "includePrePost": {
          "type": "boolean"
        },
        "events": {
          "type": "string"
        },
        "lang": {
          "type": "string"
        },
        "return": {
          "type": "string",
          "enum": ["array", "object"]
        }
      },
      "required": ["period1"],
      "additionalProperties": false
    },
    "ChartOptionsWithReturnArray": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "period2": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "useYfid": {
          "type": "boolean"
        },
        "interval": {
          "type": "string",
          "enum": ["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"]
        },
        "includePrePost": {
          "type": "boolean"
        },
        "events": {
          "type": "string"
        },
        "lang": {
          "type": "string"
        },
        "return": {
          "type": "string",
          "const": "array"
        }
      },
      "additionalProperties": false,
      "required": ["period1"]
    },
    "ChartOptionsWithReturnObject": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "period2": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "useYfid": {
          "type": "boolean"
        },
        "interval": {
          "type": "string",
          "enum": ["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"]
        },
        "includePrePost": {
          "type": "boolean"
        },
        "events": {
          "type": "string"
        },
        "lang": {
          "type": "string"
        },
        "return": {
          "type": "string",
          "const": "object"
        }
      },
      "required": ["period1", "return"],
      "additionalProperties": false
    },
    "NamedParameters<typeof chart>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/ChartOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this", "symbol", "queryOptionsOverrides"],
      "additionalProperties": false
    },
    "ModuleThis": {
      "type": "object",
      "properties": {
        "_moduleExec": {}
      },
      "required": ["_moduleExec"]
    },
    "ModuleOptions": {
      "type": "object",
      "properties": {
        "validateResult": {
          "type": "boolean"
        },
        "devel": {
          "type": ["boolean", "string"]
        },
        "fetchOptions": {
          "type": "object"
        }
      },
      "additionalProperties": false
    },
    "DailyGainersResult": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "canonicalName": {
          "type": "string"
        },
        "criteriaMeta": {
          "$ref": "#/definitions/DailyGainersCriteriaMeta"
        },
        "rawCriteria": {
          "type": "string"
        },
        "start": {
          "yahooFinanceType": "number"
        },
        "count": {
          "yahooFinanceType": "number"
        },
        "total": {
          "yahooFinanceType": "number"
        },
        "quotes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/DailyGainersQuote"
          }
        },
        "useRecords": {
          "type": "boolean"
        },
        "predefinedScr": {
          "type": "boolean"
        },
        "versionId": {
          "yahooFinanceType": "number"
        },
        "creationDate": {
          "yahooFinanceType": "number"
        },
        "lastUpdated": {
          "yahooFinanceType": "number"
        },
        "isPremium": {
          "type": "boolean"
        },
        "iconUrl": {
          "type": "string"
        }
      },
      "required": ["id", "title", "description", "canonicalName", "criteriaMeta", "rawCriteria", "start", "count", "total", "quotes", "useRecords", "predefinedScr", "versionId", "creationDate", "lastUpdated", "isPremium", "iconUrl"],
      "additionalProperties": false
    },
    "DailyGainersCriteriaMeta": {
      "type": "object",
      "properties": {
        "size": {
          "yahooFinanceType": "number"
        },
        "offset": {
          "yahooFinanceType": "number"
        },
        "sortField": {
          "type": "string"
        },
        "sortType": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "criteria": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/DailyGainersCriterum"
          }
        },
        "topOperator": {
          "type": "string"
        }
      },
      "required": ["size", "offset", "sortField", "sortType", "quoteType", "criteria", "topOperator"],
      "additionalProperties": false
    },
    "DailyGainersCriterum": {
      "type": "object",
      "properties": {
        "field": {
          "type": "string"
        },
        "operators": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "values": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "labelsSelected": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "dependentValues": {
          "type": "array",
          "items": {}
        }
      },
      "required": ["field", "operators", "values", "labelsSelected", "dependentValues"],
      "additionalProperties": false
    },
    "DailyGainersQuote": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "lastCloseTevEbitLtm": {
          "yahooFinanceType": "number"
        },
        "lastClosePriceToNNWCPerShare": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "number"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "number"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "type": "string"
        },
        "currency": {
          "type": "string"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "type": "string"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "number"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "number"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "marketState": {
          "type": "string"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "shortName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "symbol": {
          "type": "string"
        },
        "dividendDate": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "number"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        },
        "dividendRate": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["language", "region", "quoteType", "typeDisp", "quoteSourceName", "triggerable", "customPriceAlertConfidence", "firstTradeDateMilliseconds", "priceHint", "regularMarketChange", "regularMarketTime", "regularMarketPrice", "regularMarketDayHigh", "regularMarketDayRange", "currency", "regularMarketDayLow", "regularMarketVolume", "regularMarketPreviousClose", "market", "messageBoardId", "fullExchangeName", "longName", "regularMarketOpen", "averageDailyVolume3Month", "averageDailyVolume10Day", "fiftyTwoWeekLowChange", "fiftyTwoWeekLowChangePercent", "fiftyTwoWeekRange", "fiftyTwoWeekHighChange", "fiftyTwoWeekHighChangePercent", "fiftyTwoWeekChangePercent", "trailingAnnualDividendRate", "trailingAnnualDividendYield", "marketState", "sharesOutstanding", "fiftyDayAverage", "fiftyDayAverageChange", "fiftyDayAverageChangePercent", "twoHundredDayAverage", "twoHundredDayAverageChange", "twoHundredDayAverageChangePercent", "marketCap", "sourceInterval", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "gmtOffSetMilliseconds", "esgPopulated", "tradeable", "cryptoTradeable", "exchange", "fiftyTwoWeekLow", "fiftyTwoWeekHigh", "shortName", "regularMarketChangePercent", "symbol"],
      "additionalProperties": false
    },
    "DailyGainersOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "count": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof dailyGainers>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/DailyGainersOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this"],
      "additionalProperties": false
    },
    "HistoricalHistoryResult": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/HistoricalRowHistory"
      }
    },
    "HistoricalRowHistory": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "open": {
          "yahooFinanceType": "number"
        },
        "high": {
          "yahooFinanceType": "number"
        },
        "low": {
          "yahooFinanceType": "number"
        },
        "close": {
          "yahooFinanceType": "number"
        },
        "adjClose": {
          "yahooFinanceType": "number"
        },
        "volume": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["date", "open", "high", "low", "close", "volume"]
    },
    "HistoricalDividendsResult": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/HistoricalRowDividend"
      }
    },
    "HistoricalRowDividend": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "dividends": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["date", "dividends"],
      "additionalProperties": false
    },
    "HistoricalStockSplitsResult": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/HistoricalRowStockSplit"
      }
    },
    "HistoricalRowStockSplit": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "stockSplits": {
          "type": "string"
        }
      },
      "required": ["date", "stockSplits"],
      "additionalProperties": false
    },
    "HistoricalResult": {
      "anyOf": [{
        "$ref": "#/definitions/HistoricalHistoryResult"
      }, {
        "$ref": "#/definitions/HistoricalDividendsResult"
      }, {
        "$ref": "#/definitions/HistoricalStockSplitsResult"
      }]
    },
    "HistoricalOptions": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "period2": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "interval": {
          "type": "string",
          "enum": ["1d", "1wk", "1mo"]
        },
        "events": {
          "type": "string"
        },
        "includeAdjustedClose": {
          "type": "boolean"
        }
      },
      "required": ["period1"],
      "additionalProperties": false
    },
    "HistoricalOptionsEventsHistory": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "period2": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "interval": {
          "type": "string",
          "enum": ["1d", "1wk", "1mo"]
        },
        "events": {
          "type": "string",
          "const": "history"
        },
        "includeAdjustedClose": {
          "type": "boolean"
        }
      },
      "additionalProperties": false,
      "required": ["period1"]
    },
    "HistoricalOptionsEventsDividends": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "period2": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "interval": {
          "type": "string",
          "enum": ["1d", "1wk", "1mo"]
        },
        "events": {
          "type": "string",
          "const": "dividends"
        },
        "includeAdjustedClose": {
          "type": "boolean"
        }
      },
      "required": ["events", "period1"],
      "additionalProperties": false
    },
    "HistoricalOptionsEventsSplit": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "period2": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "type": "string"
          }, {
            "yahooFinanceType": "number"
          }]
        },
        "interval": {
          "type": "string",
          "enum": ["1d", "1wk", "1mo"]
        },
        "events": {
          "type": "string",
          "const": "split"
        },
        "includeAdjustedClose": {
          "type": "boolean"
        }
      },
      "required": ["events", "period1"],
      "additionalProperties": false
    },
    "NamedParameters<typeof historical>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/HistoricalOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this", "symbol", "queryOptionsOverrides"],
      "additionalProperties": false
    },
    "InsightsResult": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "instrumentInfo": {
          "$ref": "#/definitions/InsightsInstrumentInfo"
        },
        "companySnapshot": {
          "$ref": "#/definitions/InsightsCompanySnapshot"
        },
        "recommendation": {
          "type": "object",
          "properties": {
            "targetPrice": {
              "yahooFinanceType": "number"
            },
            "provider": {
              "type": "string"
            },
            "rating": {
              "type": "string",
              "enum": ["BUY", "SELL", "HOLD"]
            }
          },
          "required": ["provider", "rating"],
          "additionalProperties": false
        },
        "events": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InsightsEvent"
          }
        },
        "reports": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InsightsReport"
          }
        },
        "sigDevs": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InsightsSigDev"
          }
        },
        "upsell": {
          "$ref": "#/definitions/InsightsUpsell"
        },
        "upsellSearchDD": {
          "type": "object",
          "properties": {
            "researchReports": {
              "$ref": "#/definitions/InsightsResearchReport"
            }
          },
          "required": ["researchReports"],
          "additionalProperties": false
        },
        "secReports": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InsightsSecReport"
          }
        }
      },
      "required": ["symbol", "sigDevs"]
    },
    "InsightsInstrumentInfo": {
      "type": "object",
      "properties": {
        "keyTechnicals": {
          "type": "object",
          "properties": {
            "provider": {
              "type": "string"
            },
            "support": {
              "yahooFinanceType": "number"
            },
            "resistance": {
              "yahooFinanceType": "number"
            },
            "stopLoss": {
              "yahooFinanceType": "number"
            }
          },
          "required": ["provider"]
        },
        "technicalEvents": {
          "type": "object",
          "properties": {
            "provider": {
              "type": "string"
            },
            "sector": {
              "type": "string"
            },
            "shortTermOutlook": {
              "$ref": "#/definitions/InsightsOutlook"
            },
            "intermediateTermOutlook": {
              "$ref": "#/definitions/InsightsOutlook"
            },
            "longTermOutlook": {
              "$ref": "#/definitions/InsightsOutlook"
            }
          },
          "required": ["provider", "shortTermOutlook", "intermediateTermOutlook", "longTermOutlook"]
        },
        "valuation": {
          "type": "object",
          "properties": {
            "color": {
              "yahooFinanceType": "number"
            },
            "description": {
              "type": "string"
            },
            "discount": {
              "type": "string"
            },
            "provider": {
              "type": "string"
            },
            "relativeValue": {
              "type": "string"
            }
          },
          "required": ["provider"]
        }
      },
      "required": ["keyTechnicals", "technicalEvents", "valuation"]
    },
    "InsightsOutlook": {
      "type": "object",
      "properties": {
        "stateDescription": {
          "type": "string"
        },
        "direction": {
          "$ref": "#/definitions/InsightsDirection"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "scoreDescription": {
          "type": "string"
        },
        "sectorDirection": {
          "$ref": "#/definitions/InsightsDirection"
        },
        "sectorScore": {
          "yahooFinanceType": "number"
        },
        "sectorScoreDescription": {
          "type": "string"
        },
        "indexDirection": {
          "$ref": "#/definitions/InsightsDirection"
        },
        "indexScore": {
          "yahooFinanceType": "number"
        },
        "indexScoreDescription": {
          "type": "string"
        }
      },
      "required": ["stateDescription", "direction", "score", "scoreDescription", "indexDirection", "indexScore", "indexScoreDescription"]
    },
    "InsightsDirection": {
      "type": "string",
      "enum": ["Bearish", "Bullish", "Neutral"]
    },
    "InsightsCompanySnapshot": {
      "type": "object",
      "properties": {
        "sectorInfo": {
          "type": "string"
        },
        "company": {
          "type": "object",
          "properties": {
            "innovativeness": {
              "yahooFinanceType": "number"
            },
            "hiring": {
              "yahooFinanceType": "number"
            },
            "sustainability": {
              "yahooFinanceType": "number"
            },
            "insiderSentiments": {
              "yahooFinanceType": "number"
            },
            "earningsReports": {
              "yahooFinanceType": "number"
            },
            "dividends": {
              "yahooFinanceType": "number"
            }
          }
        },
        "sector": {
          "type": "object",
          "properties": {
            "innovativeness": {
              "yahooFinanceType": "number"
            },
            "hiring": {
              "yahooFinanceType": "number"
            },
            "sustainability": {
              "yahooFinanceType": "number"
            },
            "insiderSentiments": {
              "yahooFinanceType": "number"
            },
            "earningsReports": {
              "yahooFinanceType": "number"
            },
            "dividends": {
              "yahooFinanceType": "number"
            }
          },
          "required": ["innovativeness", "hiring", "insiderSentiments", "dividends"]
        }
      },
      "required": ["company", "sector"]
    },
    "InsightsEvent": {
      "type": "object",
      "properties": {
        "eventType": {
          "type": "string"
        },
        "pricePeriod": {
          "type": "string"
        },
        "tradingHorizon": {
          "type": "string"
        },
        "tradeType": {
          "type": "string"
        },
        "imageUrl": {
          "type": "string"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "endDate": {
          "yahooFinanceType": "date"
        }
      },
      "required": ["eventType", "pricePeriod", "tradingHorizon", "tradeType", "imageUrl", "startDate", "endDate"]
    },
    "InsightsReport": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "headHtml": {
          "type": "string"
        },
        "provider": {
          "type": "string"
        },
        "reportDate": {
          "yahooFinanceType": "date"
        },
        "reportTitle": {
          "type": "string"
        },
        "reportType": {
          "type": "string"
        },
        "targetPrice": {
          "yahooFinanceType": "number"
        },
        "targetPriceStatus": {
          "type": "string",
          "enum": ["Increased", "Maintained", "Decreased", "-"]
        },
        "investmentRating": {
          "type": "string",
          "enum": ["Bullish", "Neutral", "Bearish"]
        },
        "tickers": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["id", "headHtml", "provider", "reportDate", "reportTitle", "reportType"]
    },
    "InsightsSigDev": {
      "type": "object",
      "properties": {
        "headline": {
          "type": "string"
        },
        "date": {
          "yahooFinanceType": "date"
        }
      },
      "required": ["headline", "date"]
    },
    "InsightsUpsell": {
      "type": "object",
      "properties": {
        "msBullishSummary": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "msBearishSummary": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "msBullishBearishSummariesPublishDate": {
          "yahooFinanceType": "DateInMs"
        },
        "companyName": {
          "type": "string"
        },
        "upsellReportType": {
          "type": "string"
        }
      }
    },
    "DateInMs": {
      "yahooFinanceType": "date"
    },
    "InsightsResearchReport": {
      "type": "object",
      "properties": {
        "reportId": {
          "type": "string"
        },
        "provider": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "reportDate": {
          "yahooFinanceType": "date"
        },
        "summary": {
          "type": "string"
        },
        "investmentRating": {
          "type": "string",
          "enum": ["Bullish", "Neutral", "Bearish"]
        }
      },
      "required": ["reportId", "provider", "title", "reportDate", "summary"],
      "additionalProperties": false
    },
    "InsightsSecReport": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "filingDate": {
          "yahooFinanceType": "DateInMs"
        },
        "snapshotUrl": {
          "type": "string"
        },
        "formType": {
          "type": "string"
        }
      },
      "required": ["id", "type", "title", "description", "filingDate", "snapshotUrl", "formType"],
      "additionalProperties": false
    },
    "InsightsOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "reportsCount": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof trendingSymbols>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "query": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/TrendingSymbolsOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this", "query"],
      "additionalProperties": false
    },
    "TrendingSymbolsOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "count": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": false
    },
    "QuoteBase": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["language", "region", "quoteType", "triggerable", "marketState", "tradeable", "exchange", "exchangeTimezoneName", "exchangeTimezoneShortName", "gmtOffSetMilliseconds", "market", "esgPopulated", "sourceInterval", "exchangeDataDelayedBy", "priceHint", "fullExchangeName", "symbol"]
    },
    "TwoNumberRange": {
      "type": "object",
      "properties": {
        "low": {
          "yahooFinanceType": "number"
        },
        "high": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["low", "high"],
      "additionalProperties": false
    },
    "QuoteCryptoCurrency": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "CRYPTOCURRENCY"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "circulatingSupply": {
          "yahooFinanceType": "number"
        },
        "fromCurrency": {
          "type": "string"
        },
        "toCurrency": {
          "type": "string"
        },
        "lastMarket": {
          "type": "string"
        },
        "coinImageUrl": {
          "type": "string"
        },
        "volume24Hr": {
          "yahooFinanceType": "number"
        },
        "volumeAllCurrencies": {
          "yahooFinanceType": "number"
        },
        "startDate": {
          "yahooFinanceType": "date"
        }
      },
      "required": ["circulatingSupply", "esgPopulated", "exchange", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "fromCurrency", "fullExchangeName", "gmtOffSetMilliseconds", "language", "lastMarket", "market", "marketState", "priceHint", "quoteType", "region", "sourceInterval", "symbol", "toCurrency", "tradeable", "triggerable"]
    },
    "QuoteCurrency": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "CURRENCY"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["esgPopulated", "exchange", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "fullExchangeName", "gmtOffSetMilliseconds", "language", "market", "marketState", "priceHint", "quoteType", "region", "sourceInterval", "symbol", "tradeable", "triggerable"]
    },
    "QuoteEtf": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "ETF"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["esgPopulated", "exchange", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "fullExchangeName", "gmtOffSetMilliseconds", "language", "market", "marketState", "priceHint", "quoteType", "region", "sourceInterval", "symbol", "tradeable", "triggerable"]
    },
    "QuoteEquity": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "EQUITY"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "dividendRate": {
          "yahooFinanceType": "number"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["esgPopulated", "exchange", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "fullExchangeName", "gmtOffSetMilliseconds", "language", "market", "marketState", "priceHint", "quoteType", "region", "sourceInterval", "symbol", "tradeable", "triggerable"]
    },
    "QuoteFuture": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "FUTURE"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "headSymbolAsString": {
          "type": "string"
        },
        "contractSymbol": {
          "type": "boolean"
        },
        "underlyingExchangeSymbol": {
          "type": "string"
        },
        "expireDate": {
          "yahooFinanceType": "date"
        },
        "expireIsoDate": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["contractSymbol", "esgPopulated", "exchange", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "expireDate", "expireIsoDate", "fullExchangeName", "gmtOffSetMilliseconds", "headSymbolAsString", "language", "market", "marketState", "priceHint", "quoteType", "region", "sourceInterval", "symbol", "tradeable", "triggerable", "underlyingExchangeSymbol"]
    },
    "QuoteIndex": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "INDEX"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["esgPopulated", "exchange", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "fullExchangeName", "gmtOffSetMilliseconds", "language", "market", "marketState", "priceHint", "quoteType", "region", "sourceInterval", "symbol", "tradeable", "triggerable"]
    },
    "QuoteOption": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "OPTION"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "strike": {
          "yahooFinanceType": "number"
        },
        "expireDate": {
          "yahooFinanceType": "number"
        },
        "expireIsoDate": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["esgPopulated", "exchange", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "expireDate", "expireIsoDate", "fullExchangeName", "gmtOffSetMilliseconds", "language", "market", "marketState", "openInterest", "priceHint", "quoteType", "region", "sourceInterval", "strike", "symbol", "tradeable", "triggerable", "underlyingSymbol"]
    },
    "QuoteMutualfund": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "MUTUALFUND"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": ["REGULAR", "CLOSED", "PRE", "PREPRE", "POST", "POSTPOST"]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["esgPopulated", "exchange", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "fullExchangeName", "gmtOffSetMilliseconds", "language", "market", "marketState", "priceHint", "quoteType", "region", "sourceInterval", "symbol", "tradeable", "triggerable"]
    },
    "Quote": {
      "anyOf": [{
        "$ref": "#/definitions/QuoteCryptoCurrency"
      }, {
        "$ref": "#/definitions/QuoteCurrency"
      }, {
        "$ref": "#/definitions/QuoteEtf"
      }, {
        "$ref": "#/definitions/QuoteEquity"
      }, {
        "$ref": "#/definitions/QuoteFuture"
      }, {
        "$ref": "#/definitions/QuoteIndex"
      }, {
        "$ref": "#/definitions/QuoteMutualfund"
      }, {
        "$ref": "#/definitions/QuoteOption"
      }]
    },
    "QuoteField": {
      "type": "string",
      "enum": ["quoteType", "circulatingSupply", "fromCurrency", "toCurrency", "lastMarket", "coinImageUrl", "volume24Hr", "volumeAllCurrencies", "startDate", "language", "region", "typeDisp", "quoteSourceName", "triggerable", "currency", "customPriceAlertConfidence", "marketState", "tradeable", "cryptoTradeable", "exchange", "shortName", "longName", "messageBoardId", "exchangeTimezoneName", "exchangeTimezoneShortName", "gmtOffSetMilliseconds", "market", "esgPopulated", "fiftyTwoWeekLowChange", "fiftyTwoWeekLowChangePercent", "fiftyTwoWeekRange", "fiftyTwoWeekHighChange", "fiftyTwoWeekHighChangePercent", "fiftyTwoWeekLow", "fiftyTwoWeekHigh", "fiftyTwoWeekChangePercent", "dividendDate", "earningsTimestamp", "earningsTimestampStart", "earningsTimestampEnd", "trailingAnnualDividendRate", "trailingPE", "trailingAnnualDividendYield", "epsTrailingTwelveMonths", "epsForward", "epsCurrentYear", "priceEpsCurrentYear", "sharesOutstanding", "bookValue", "fiftyDayAverage", "fiftyDayAverageChange", "fiftyDayAverageChangePercent", "twoHundredDayAverage", "twoHundredDayAverageChange", "twoHundredDayAverageChangePercent", "marketCap", "forwardPE", "priceToBook", "sourceInterval", "exchangeDataDelayedBy", "firstTradeDateMilliseconds", "priceHint", "postMarketChangePercent", "postMarketTime", "postMarketPrice", "postMarketChange", "regularMarketChange", "regularMarketChangePercent", "regularMarketTime", "regularMarketPrice", "regularMarketDayHigh", "regularMarketDayRange", "regularMarketDayLow", "regularMarketVolume", "regularMarketPreviousClose", "preMarketChange", "preMarketChangePercent", "preMarketTime", "preMarketPrice", "bid", "ask", "bidSize", "askSize", "fullExchangeName", "financialCurrency", "regularMarketOpen", "averageDailyVolume3Month", "averageDailyVolume10Day", "displayName", "symbol", "underlyingSymbol", "ytdReturn", "trailingThreeMonthReturns", "trailingThreeMonthNavReturns", "ipoExpectedDate", "newListingDate", "nameChangeDate", "prevName", "averageAnalystRating", "pageViewGrowthWeekly", "openInterest", "dividendRate", "dividendYield", "headSymbolAsString", "contractSymbol", "underlyingExchangeSymbol", "expireDate", "expireIsoDate", "strike"]
    },
    "ResultType": {
      "type": "string",
      "enum": ["array", "object", "map"]
    },
    "QuoteResponseArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Quote"
      }
    },
    "QuoteResponseMap": {
      "type": "object",
      "properties": {
        "size": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["size"],
      "additionalProperties": false
    },
    "QuoteResponseObject": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/Quote"
      }
    },
    "QuoteOptions": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/QuoteField"
          }
        },
        "return": {
          "$ref": "#/definitions/ResultType"
        }
      },
      "additionalProperties": false
    },
    "QuoteOptionsWithReturnArray": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/QuoteField"
          }
        },
        "return": {
          "type": "string",
          "const": "array"
        }
      },
      "additionalProperties": false
    },
    "QuoteOptionsWithReturnMap": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/QuoteField"
          }
        },
        "return": {
          "type": "string",
          "const": "map"
        }
      },
      "required": ["return"],
      "additionalProperties": false
    },
    "QuoteOptionsWithReturnObject": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/QuoteField"
          }
        },
        "return": {
          "type": "string",
          "const": "object"
        }
      },
      "required": ["return"],
      "additionalProperties": false
    },
    "NamedParameters<typeof quote>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "query": {
          "anyOf": [{
            "type": "string"
          }, {
            "type": "array",
            "items": {
              "type": "string"
            }
          }]
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/QuoteOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this", "query"],
      "additionalProperties": false
    },
    "OptionsResult": {
      "type": "object",
      "properties": {
        "underlyingSymbol": {
          "type": "string"
        },
        "expirationDates": {
          "type": "array",
          "items": {
            "yahooFinanceType": "date"
          }
        },
        "strikes": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "hasMiniOptions": {
          "type": "boolean"
        },
        "quote": {
          "$ref": "#/definitions/Quote"
        },
        "options": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Option"
          }
        }
      },
      "required": ["underlyingSymbol", "expirationDates", "strikes", "hasMiniOptions", "quote", "options"]
    },
    "Option": {
      "type": "object",
      "properties": {
        "expirationDate": {
          "yahooFinanceType": "date"
        },
        "hasMiniOptions": {
          "type": "boolean"
        },
        "calls": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/CallOrPut"
          }
        },
        "puts": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/CallOrPut"
          }
        }
      },
      "required": ["expirationDate", "hasMiniOptions", "calls", "puts"]
    },
    "CallOrPut": {
      "type": "object",
      "properties": {
        "contractSymbol": {
          "type": "string"
        },
        "strike": {
          "yahooFinanceType": "number"
        },
        "currency": {
          "type": "string"
        },
        "lastPrice": {
          "yahooFinanceType": "number"
        },
        "change": {
          "yahooFinanceType": "number"
        },
        "percentChange": {
          "yahooFinanceType": "number"
        },
        "volume": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "contractSize": {
          "type": "string",
          "const": "REGULAR"
        },
        "expiration": {
          "yahooFinanceType": "date"
        },
        "lastTradeDate": {
          "yahooFinanceType": "date"
        },
        "impliedVolatility": {
          "yahooFinanceType": "number"
        },
        "inTheMoney": {
          "type": "boolean"
        }
      },
      "required": ["contractSymbol", "strike", "lastPrice", "change", "contractSize", "expiration", "lastTradeDate", "impliedVolatility", "inTheMoney"]
    },
    "OptionsOptions": {
      "type": "object",
      "properties": {
        "formatted": {
          "type": "boolean"
        },
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "date": {
          "anyOf": [{
            "yahooFinanceType": "date"
          }, {
            "yahooFinanceType": "number"
          }, {
            "type": "string"
          }]
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof options>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/OptionsOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this", "symbol", "queryOptionsOverrides"],
      "additionalProperties": false
    },
    "QuoteSummaryResult": {
      "type": "object",
      "properties": {
        "assetProfile": {
          "$ref": "#/definitions/AssetProfile"
        },
        "balanceSheetHistory": {
          "$ref": "#/definitions/BalanceSheetHistory"
        },
        "balanceSheetHistoryQuarterly": {
          "$ref": "#/definitions/BalanceSheetHistory"
        },
        "calendarEvents": {
          "$ref": "#/definitions/CalendarEvents"
        },
        "cashflowStatementHistory": {
          "$ref": "#/definitions/CashflowStatementHistory"
        },
        "cashflowStatementHistoryQuarterly": {
          "$ref": "#/definitions/CashflowStatementHistory"
        },
        "defaultKeyStatistics": {
          "$ref": "#/definitions/DefaultKeyStatistics"
        },
        "earnings": {
          "$ref": "#/definitions/QuoteSummaryEarnings"
        },
        "earningsHistory": {
          "$ref": "#/definitions/EarningsHistory"
        },
        "earningsTrend": {
          "$ref": "#/definitions/EarningsTrend"
        },
        "financialData": {
          "$ref": "#/definitions/FinancialData"
        },
        "fundOwnership": {
          "$ref": "#/definitions/Ownership"
        },
        "fundPerformance": {
          "$ref": "#/definitions/FundPerformance"
        },
        "fundProfile": {
          "$ref": "#/definitions/FundProfile"
        },
        "incomeStatementHistory": {
          "$ref": "#/definitions/IncomeStatementHistory"
        },
        "incomeStatementHistoryQuarterly": {
          "$ref": "#/definitions/IncomeStatementHistory"
        },
        "indexTrend": {
          "$ref": "#/definitions/IndexTrend"
        },
        "industryTrend": {
          "$ref": "#/definitions/Trend"
        },
        "insiderHolders": {
          "$ref": "#/definitions/Holders"
        },
        "insiderTransactions": {
          "$ref": "#/definitions/InsiderTransactions"
        },
        "institutionOwnership": {
          "$ref": "#/definitions/Ownership"
        },
        "majorDirectHolders": {
          "$ref": "#/definitions/Holders"
        },
        "majorHoldersBreakdown": {
          "$ref": "#/definitions/MajorHoldersBreakdown"
        },
        "netSharePurchaseActivity": {
          "$ref": "#/definitions/NetSharePurchaseActivity"
        },
        "price": {
          "$ref": "#/definitions/Price"
        },
        "quoteType": {
          "$ref": "#/definitions/QuoteType"
        },
        "recommendationTrend": {
          "$ref": "#/definitions/RecommendationTrend"
        },
        "secFilings": {
          "$ref": "#/definitions/SECFilings"
        },
        "sectorTrend": {
          "$ref": "#/definitions/Trend"
        },
        "summaryDetail": {
          "$ref": "#/definitions/SummaryDetail"
        },
        "summaryProfile": {
          "$ref": "#/definitions/SummaryProfile"
        },
        "topHoldings": {
          "$ref": "#/definitions/TopHoldings"
        },
        "upgradeDowngradeHistory": {
          "$ref": "#/definitions/UpgradeDowngradeHistory"
        }
      }
    },
    "AssetProfile": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "address3": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "fax": {
          "type": "string"
        },
        "website": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "industryDisp": {
          "type": "string"
        },
        "industryKey": {
          "type": "string"
        },
        "industrySymbol": {
          "type": "string"
        },
        "sector": {
          "type": "string"
        },
        "sectorDisp": {
          "type": "string"
        },
        "sectorKey": {
          "type": "string"
        },
        "longBusinessSummary": {
          "type": "string"
        },
        "fullTimeEmployees": {
          "yahooFinanceType": "number"
        },
        "companyOfficers": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/CompanyOfficer"
          }
        },
        "auditRisk": {
          "yahooFinanceType": "number"
        },
        "boardRisk": {
          "yahooFinanceType": "number"
        },
        "compensationRisk": {
          "yahooFinanceType": "number"
        },
        "shareHolderRightsRisk": {
          "yahooFinanceType": "number"
        },
        "overallRisk": {
          "yahooFinanceType": "number"
        },
        "governanceEpochDate": {
          "yahooFinanceType": "date"
        },
        "compensationAsOfEpochDate": {
          "yahooFinanceType": "date"
        },
        "name": {
          "type": "string"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "description": {
          "type": "string"
        },
        "twitter": {
          "type": "string"
        }
      },
      "required": ["maxAge", "companyOfficers"]
    },
    "CompanyOfficer": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "name": {
          "type": "string"
        },
        "age": {
          "yahooFinanceType": "number"
        },
        "title": {
          "type": "string"
        },
        "yearBorn": {
          "yahooFinanceType": "number"
        },
        "fiscalYear": {
          "yahooFinanceType": "number"
        },
        "totalPay": {
          "yahooFinanceType": "number"
        },
        "exercisedValue": {
          "yahooFinanceType": "number"
        },
        "unexercisedValue": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "name", "title"]
    },
    "BalanceSheetHistory": {
      "type": "object",
      "properties": {
        "balanceSheetStatements": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/BalanceSheetStatement"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["balanceSheetStatements", "maxAge"]
    },
    "BalanceSheetStatement": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "endDate": {
          "yahooFinanceType": "date"
        },
        "cash": {
          "yahooFinanceType": "number"
        },
        "shortTermInvestments": {
          "yahooFinanceType": "number"
        },
        "netReceivables": {
          "yahooFinanceType": "number"
        },
        "inventory": {
          "yahooFinanceType": "number"
        },
        "otherCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "totalCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "longTermInvestments": {
          "yahooFinanceType": "number"
        },
        "propertyPlantEquipment": {
          "yahooFinanceType": "number"
        },
        "otherAssets": {
          "yahooFinanceType": "number"
        },
        "totalAssets": {
          "yahooFinanceType": "number"
        },
        "accountsPayable": {
          "yahooFinanceType": "number"
        },
        "shortLongTermDebt": {
          "yahooFinanceType": "number"
        },
        "otherCurrentLiab": {
          "yahooFinanceType": "number"
        },
        "longTermDebt": {
          "yahooFinanceType": "number"
        },
        "otherLiab": {
          "yahooFinanceType": "number"
        },
        "totalCurrentLiabilities": {
          "yahooFinanceType": "number"
        },
        "totalLiab": {
          "yahooFinanceType": "number"
        },
        "commonStock": {
          "yahooFinanceType": "number"
        },
        "retainedEarnings": {
          "yahooFinanceType": "number"
        },
        "treasuryStock": {
          "yahooFinanceType": "number"
        },
        "otherStockholderEquity": {
          "yahooFinanceType": "number"
        },
        "totalStockholderEquity": {
          "yahooFinanceType": "number"
        },
        "netTangibleAssets": {
          "yahooFinanceType": "number"
        },
        "goodWill": {
          "yahooFinanceType": "number"
        },
        "intangibleAssets": {
          "yahooFinanceType": "number"
        },
        "deferredLongTermAssetCharges": {
          "yahooFinanceType": "number"
        },
        "deferredLongTermLiab": {
          "yahooFinanceType": "number"
        },
        "minorityInterest": {
          "yahooFinanceType": "number|null"
        },
        "capitalSurplus": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "endDate"]
    },
    "CalendarEvents": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "earnings": {
          "$ref": "#/definitions/CalendarEventsEarnings"
        },
        "exDividendDate": {
          "yahooFinanceType": "date"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        }
      },
      "required": ["maxAge", "earnings"]
    },
    "CalendarEventsEarnings": {
      "type": "object",
      "properties": {
        "earningsDate": {
          "type": "array",
          "items": {
            "yahooFinanceType": "date"
          }
        },
        "earningsAverage": {
          "yahooFinanceType": "number"
        },
        "earningsLow": {
          "yahooFinanceType": "number"
        },
        "earningsHigh": {
          "yahooFinanceType": "number"
        },
        "revenueAverage": {
          "yahooFinanceType": "number"
        },
        "revenueLow": {
          "yahooFinanceType": "number"
        },
        "revenueHigh": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["earningsDate"]
    },
    "CashflowStatementHistory": {
      "type": "object",
      "properties": {
        "cashflowStatements": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/CashflowStatement"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["cashflowStatements", "maxAge"]
    },
    "CashflowStatement": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "endDate": {
          "yahooFinanceType": "date"
        },
        "netIncome": {
          "yahooFinanceType": "number"
        },
        "depreciation": {
          "yahooFinanceType": "number"
        },
        "changeToNetincome": {
          "yahooFinanceType": "number"
        },
        "changeToAccountReceivables": {
          "yahooFinanceType": "number"
        },
        "changeToLiabilities": {
          "yahooFinanceType": "number"
        },
        "changeToInventory": {
          "yahooFinanceType": "number"
        },
        "changeToOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "totalCashFromOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "capitalExpenditures": {
          "yahooFinanceType": "number"
        },
        "investments": {
          "yahooFinanceType": "number"
        },
        "otherCashflowsFromInvestingActivities": {
          "yahooFinanceType": "number"
        },
        "totalCashflowsFromInvestingActivities": {
          "yahooFinanceType": "number"
        },
        "dividendsPaid": {
          "yahooFinanceType": "number"
        },
        "netBorrowings": {
          "yahooFinanceType": "number"
        },
        "otherCashflowsFromFinancingActivities": {
          "yahooFinanceType": "number"
        },
        "totalCashFromFinancingActivities": {
          "yahooFinanceType": "number"
        },
        "changeInCash": {
          "yahooFinanceType": "number"
        },
        "repurchaseOfStock": {
          "yahooFinanceType": "number"
        },
        "issuanceOfStock": {
          "yahooFinanceType": "number"
        },
        "effectOfExchangeRate": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "endDate", "netIncome"]
    },
    "DefaultKeyStatistics": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "enterpriseValue": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "profitMargins": {
          "yahooFinanceType": "number"
        },
        "floatShares": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "sharesShort": {
          "yahooFinanceType": "number"
        },
        "sharesShortPriorMonth": {
          "yahooFinanceType": "date"
        },
        "sharesShortPreviousMonthDate": {
          "yahooFinanceType": "date"
        },
        "dateShortInterest": {
          "yahooFinanceType": "date"
        },
        "sharesPercentSharesOut": {
          "yahooFinanceType": "number"
        },
        "heldPercentInsiders": {
          "yahooFinanceType": "number"
        },
        "heldPercentInstitutions": {
          "yahooFinanceType": "number"
        },
        "shortRatio": {
          "yahooFinanceType": "number"
        },
        "shortPercentOfFloat": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "impliedSharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "category": {
          "type": ["null", "string"]
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "fundFamily": {
          "type": ["null", "string"]
        },
        "legalType": {
          "type": ["null", "string"]
        },
        "lastFiscalYearEnd": {
          "yahooFinanceType": "date"
        },
        "nextFiscalYearEnd": {
          "yahooFinanceType": "date"
        },
        "mostRecentQuarter": {
          "yahooFinanceType": "date"
        },
        "earningsQuarterlyGrowth": {
          "yahooFinanceType": "number"
        },
        "netIncomeToCommon": {
          "yahooFinanceType": "number"
        },
        "trailingEps": {
          "yahooFinanceType": "number"
        },
        "forwardEps": {
          "yahooFinanceType": "number"
        },
        "pegRatio": {
          "yahooFinanceType": "number"
        },
        "lastSplitFactor": {
          "type": ["null", "string"]
        },
        "lastSplitDate": {
          "yahooFinanceType": "number"
        },
        "enterpriseToRevenue": {
          "yahooFinanceType": "number"
        },
        "enterpriseToEbitda": {
          "yahooFinanceType": "number"
        },
        "52WeekChange": {
          "yahooFinanceType": "number"
        },
        "SandP52WeekChange": {
          "yahooFinanceType": "number"
        },
        "lastDividendValue": {
          "yahooFinanceType": "number"
        },
        "lastDividendDate": {
          "yahooFinanceType": "date"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "beta3Year": {
          "yahooFinanceType": "number"
        },
        "totalAssets": {
          "yahooFinanceType": "number"
        },
        "yield": {
          "yahooFinanceType": "number"
        },
        "fundInceptionDate": {
          "yahooFinanceType": "date"
        },
        "threeYearAverageReturn": {
          "yahooFinanceType": "number"
        },
        "fiveYearAverageReturn": {
          "yahooFinanceType": "number"
        },
        "morningStarOverallRating": {
          "yahooFinanceType": "number"
        },
        "morningStarRiskRating": {
          "yahooFinanceType": "number"
        },
        "annualReportExpenseRatio": {
          "yahooFinanceType": "number"
        },
        "lastCapGain": {
          "yahooFinanceType": "number"
        },
        "annualHoldingsTurnover": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "priceHint", "category", "fundFamily", "legalType", "lastSplitFactor"]
    },
    "QuoteSummaryEarnings": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "earningsChart": {
          "$ref": "#/definitions/EarningsChart"
        },
        "financialsChart": {
          "$ref": "#/definitions/FinancialsChart"
        },
        "financialCurrency": {
          "type": "string"
        }
      },
      "required": ["maxAge", "earningsChart", "financialsChart"]
    },
    "EarningsChart": {
      "type": "object",
      "properties": {
        "quarterly": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EarningsChartQuarterly"
          }
        },
        "currentQuarterEstimate": {
          "yahooFinanceType": "number"
        },
        "currentQuarterEstimateDate": {
          "type": "string"
        },
        "currentQuarterEstimateYear": {
          "yahooFinanceType": "number"
        },
        "earningsDate": {
          "type": "array",
          "items": {
            "yahooFinanceType": "date"
          }
        }
      },
      "required": ["quarterly", "earningsDate"]
    },
    "EarningsChartQuarterly": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "actual": {
          "yahooFinanceType": "number"
        },
        "estimate": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["date", "actual", "estimate"]
    },
    "FinancialsChart": {
      "type": "object",
      "properties": {
        "yearly": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Yearly"
          }
        },
        "quarterly": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FinancialsChartQuarterly"
          }
        }
      },
      "required": ["yearly", "quarterly"]
    },
    "Yearly": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "number"
        },
        "revenue": {
          "yahooFinanceType": "number"
        },
        "earnings": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["date", "revenue", "earnings"]
    },
    "FinancialsChartQuarterly": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "revenue": {
          "yahooFinanceType": "number"
        },
        "earnings": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["date", "revenue", "earnings"]
    },
    "EarningsHistory": {
      "type": "object",
      "properties": {
        "history": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EarningsHistoryHistory"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["history", "maxAge"]
    },
    "EarningsHistoryHistory": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "epsActual": {
          "yahooFinanceType": "number|null"
        },
        "epsEstimate": {
          "yahooFinanceType": "number|null"
        },
        "epsDifference": {
          "yahooFinanceType": "number|null"
        },
        "surprisePercent": {
          "yahooFinanceType": "number|null"
        },
        "quarter": {
          "yahooFinanceType": "date|null"
        },
        "period": {
          "type": "string"
        }
      },
      "required": ["maxAge", "epsActual", "epsEstimate", "epsDifference", "surprisePercent", "quarter", "period"]
    },
    "EarningsTrend": {
      "type": "object",
      "properties": {
        "trend": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EarningsTrendTrend"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["trend", "maxAge"]
    },
    "EarningsTrendTrend": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "period": {
          "type": "string"
        },
        "endDate": {
          "yahooFinanceType": "date|null"
        },
        "growth": {
          "yahooFinanceType": "number|null"
        },
        "earningsEstimate": {
          "$ref": "#/definitions/EarningsEstimate"
        },
        "revenueEstimate": {
          "$ref": "#/definitions/RevenueEstimate"
        },
        "epsTrend": {
          "$ref": "#/definitions/EpsTrend"
        },
        "epsRevisions": {
          "$ref": "#/definitions/EpsRevisions"
        }
      },
      "required": ["maxAge", "period", "endDate", "growth", "earningsEstimate", "revenueEstimate", "epsTrend", "epsRevisions"]
    },
    "EarningsEstimate": {
      "type": "object",
      "properties": {
        "avg": {
          "yahooFinanceType": "number|null"
        },
        "low": {
          "yahooFinanceType": "number|null"
        },
        "high": {
          "yahooFinanceType": "number|null"
        },
        "yearAgoEps": {
          "yahooFinanceType": "number|null"
        },
        "numberOfAnalysts": {
          "yahooFinanceType": "number|null"
        },
        "growth": {
          "yahooFinanceType": "number|null"
        }
      },
      "required": ["avg", "low", "high", "yearAgoEps", "numberOfAnalysts", "growth"]
    },
    "RevenueEstimate": {
      "type": "object",
      "properties": {
        "avg": {
          "yahooFinanceType": "number|null"
        },
        "low": {
          "yahooFinanceType": "number|null"
        },
        "high": {
          "yahooFinanceType": "number|null"
        },
        "numberOfAnalysts": {
          "yahooFinanceType": "number|null"
        },
        "yearAgoRevenue": {
          "yahooFinanceType": "number|null"
        },
        "growth": {
          "yahooFinanceType": "number|null"
        }
      },
      "required": ["avg", "low", "high", "numberOfAnalysts", "yearAgoRevenue", "growth"]
    },
    "EpsTrend": {
      "type": "object",
      "properties": {
        "current": {
          "yahooFinanceType": "number|null"
        },
        "7daysAgo": {
          "yahooFinanceType": "number|null"
        },
        "30daysAgo": {
          "yahooFinanceType": "number|null"
        },
        "60daysAgo": {
          "yahooFinanceType": "number|null"
        },
        "90daysAgo": {
          "yahooFinanceType": "number|null"
        }
      },
      "required": ["current", "7daysAgo", "30daysAgo", "60daysAgo", "90daysAgo"]
    },
    "EpsRevisions": {
      "type": "object",
      "properties": {
        "upLast7days": {
          "yahooFinanceType": "number|null"
        },
        "upLast30days": {
          "yahooFinanceType": "number|null"
        },
        "downLast30days": {
          "yahooFinanceType": "number|null"
        },
        "downLast90days": {
          "yahooFinanceType": "number|null"
        }
      },
      "required": ["upLast7days", "upLast30days", "downLast30days", "downLast90days"]
    },
    "FinancialData": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "currentPrice": {
          "yahooFinanceType": "number"
        },
        "targetHighPrice": {
          "yahooFinanceType": "number"
        },
        "targetLowPrice": {
          "yahooFinanceType": "number"
        },
        "targetMeanPrice": {
          "yahooFinanceType": "number"
        },
        "targetMedianPrice": {
          "yahooFinanceType": "number"
        },
        "recommendationMean": {
          "yahooFinanceType": "number"
        },
        "recommendationKey": {
          "type": "string"
        },
        "numberOfAnalystOpinions": {
          "yahooFinanceType": "number"
        },
        "totalCash": {
          "yahooFinanceType": "number"
        },
        "totalCashPerShare": {
          "yahooFinanceType": "number"
        },
        "ebitda": {
          "yahooFinanceType": "number"
        },
        "totalDebt": {
          "yahooFinanceType": "number"
        },
        "quickRatio": {
          "yahooFinanceType": "number"
        },
        "currentRatio": {
          "yahooFinanceType": "number"
        },
        "totalRevenue": {
          "yahooFinanceType": "number"
        },
        "debtToEquity": {
          "yahooFinanceType": "number"
        },
        "revenuePerShare": {
          "yahooFinanceType": "number"
        },
        "returnOnAssets": {
          "yahooFinanceType": "number"
        },
        "returnOnEquity": {
          "yahooFinanceType": "number"
        },
        "grossProfits": {
          "yahooFinanceType": "number"
        },
        "freeCashflow": {
          "yahooFinanceType": "number"
        },
        "operatingCashflow": {
          "yahooFinanceType": "number"
        },
        "earningsGrowth": {
          "yahooFinanceType": "number"
        },
        "revenueGrowth": {
          "yahooFinanceType": "number"
        },
        "grossMargins": {
          "yahooFinanceType": "number"
        },
        "ebitdaMargins": {
          "yahooFinanceType": "number"
        },
        "operatingMargins": {
          "yahooFinanceType": "number"
        },
        "profitMargins": {
          "yahooFinanceType": "number"
        },
        "financialCurrency": {
          "type": ["string", "null"]
        }
      },
      "required": ["maxAge", "recommendationKey", "financialCurrency"]
    },
    "Ownership": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "ownershipList": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/OwnershipList"
          }
        }
      },
      "required": ["maxAge", "ownershipList"]
    },
    "OwnershipList": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "reportDate": {
          "yahooFinanceType": "date"
        },
        "organization": {
          "type": "string"
        },
        "pctHeld": {
          "yahooFinanceType": "number"
        },
        "position": {
          "yahooFinanceType": "number"
        },
        "value": {
          "yahooFinanceType": "number"
        },
        "pctChange": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "reportDate", "organization", "pctHeld", "position", "value"]
    },
    "FundPerformance": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "loadAdjustedReturns": {
          "$ref": "#/definitions/PeriodRange"
        },
        "rankInCategory": {
          "$ref": "#/definitions/PeriodRange"
        },
        "performanceOverview": {
          "$ref": "#/definitions/FundPerformancePerformanceOverview"
        },
        "performanceOverviewCat": {
          "$ref": "#/definitions/FundPerformancePerformanceOverviewCat"
        },
        "trailingReturns": {
          "$ref": "#/definitions/FundPerformanceTrailingReturns"
        },
        "trailingReturnsNav": {
          "$ref": "#/definitions/FundPerformanceTrailingReturns"
        },
        "trailingReturnsCat": {
          "$ref": "#/definitions/FundPerformanceTrailingReturns"
        },
        "annualTotalReturns": {
          "$ref": "#/definitions/FundPerformanceReturns"
        },
        "pastQuarterlyReturns": {
          "$ref": "#/definitions/FundPerformanceReturns"
        },
        "riskOverviewStatistics": {
          "$ref": "#/definitions/FundPerformanceRiskOverviewStats"
        },
        "riskOverviewStatisticsCat": {
          "$ref": "#/definitions/FundPerformanceRiskOverviewStatsCat"
        }
      },
      "required": ["maxAge", "performanceOverview", "performanceOverviewCat", "trailingReturns", "trailingReturnsNav", "trailingReturnsCat", "annualTotalReturns", "pastQuarterlyReturns", "riskOverviewStatistics", "riskOverviewStatisticsCat"]
    },
    "PeriodRange": {
      "type": "object",
      "properties": {
        "asOfDate": {
          "yahooFinanceType": "date"
        },
        "ytd": {
          "yahooFinanceType": "number"
        },
        "oneMonth": {
          "yahooFinanceType": "number"
        },
        "threeMonth": {
          "yahooFinanceType": "number"
        },
        "oneYear": {
          "yahooFinanceType": "number"
        },
        "threeYear": {
          "yahooFinanceType": "number"
        },
        "fiveYear": {
          "yahooFinanceType": "number"
        },
        "tenYear": {
          "yahooFinanceType": "number"
        }
      }
    },
    "FundPerformancePerformanceOverview": {
      "type": "object",
      "properties": {
        "asOfDate": {
          "yahooFinanceType": "date"
        },
        "ytdReturnPct": {
          "yahooFinanceType": "number"
        },
        "oneYearTotalReturn": {
          "yahooFinanceType": "number"
        },
        "threeYearTotalReturn": {
          "yahooFinanceType": "number"
        },
        "fiveYrAvgReturnPct": {
          "yahooFinanceType": "number"
        },
        "morningStarReturnRating": {
          "yahooFinanceType": "number"
        },
        "numYearsUp": {
          "yahooFinanceType": "number"
        },
        "numYearsDown": {
          "yahooFinanceType": "number"
        },
        "bestOneYrTotalReturn": {
          "yahooFinanceType": "number"
        },
        "worstOneYrTotalReturn": {
          "yahooFinanceType": "number"
        },
        "bestThreeYrTotalReturn": {
          "yahooFinanceType": "number"
        },
        "worstThreeYrTotalReturn": {
          "yahooFinanceType": "number"
        }
      }
    },
    "FundPerformancePerformanceOverviewCat": {
      "type": "object",
      "properties": {
        "ytdReturnPct": {
          "yahooFinanceType": "number"
        },
        "fiveYrAvgReturnPct": {
          "yahooFinanceType": "number"
        }
      }
    },
    "FundPerformanceTrailingReturns": {
      "type": "object",
      "properties": {
        "asOfDate": {
          "yahooFinanceType": "date"
        },
        "ytd": {
          "yahooFinanceType": "number"
        },
        "oneMonth": {
          "yahooFinanceType": "number"
        },
        "threeMonth": {
          "yahooFinanceType": "number"
        },
        "oneYear": {
          "yahooFinanceType": "number"
        },
        "threeYear": {
          "yahooFinanceType": "number"
        },
        "fiveYear": {
          "yahooFinanceType": "number"
        },
        "tenYear": {
          "yahooFinanceType": "number"
        },
        "lastBullMkt": {
          "yahooFinanceType": "number"
        },
        "lastBearMkt": {
          "yahooFinanceType": "number"
        }
      }
    },
    "FundPerformanceReturns": {
      "type": "object",
      "properties": {
        "returns": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundPerformanceReturnsRow"
          }
        },
        "returnsCat": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundPerformanceReturnsRow"
          }
        }
      },
      "required": ["returns"]
    },
    "FundPerformanceReturnsRow": {
      "type": "object",
      "properties": {
        "year": {
          "yahooFinanceType": "number"
        },
        "annualValue": {
          "yahooFinanceType": "number"
        },
        "q1": {
          "yahooFinanceType": "number"
        },
        "q2": {
          "yahooFinanceType": "number"
        },
        "q3": {
          "yahooFinanceType": "number"
        },
        "q4": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["year"]
    },
    "FundPerformanceRiskOverviewStats": {
      "type": "object",
      "properties": {
        "riskStatistics": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundPerformanceRiskOverviewStatsRow"
          }
        },
        "riskRating": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["riskStatistics"]
    },
    "FundPerformanceRiskOverviewStatsRow": {
      "type": "object",
      "properties": {
        "year": {
          "type": "string"
        },
        "alpha": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "meanAnnualReturn": {
          "yahooFinanceType": "number"
        },
        "rSquared": {
          "yahooFinanceType": "number"
        },
        "stdDev": {
          "yahooFinanceType": "number"
        },
        "sharpeRatio": {
          "yahooFinanceType": "number"
        },
        "treynorRatio": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["year", "alpha", "beta", "meanAnnualReturn", "rSquared", "stdDev", "sharpeRatio", "treynorRatio"]
    },
    "FundPerformanceRiskOverviewStatsCat": {
      "type": "object",
      "properties": {
        "riskStatisticsCat": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundPerformanceRiskOverviewStatsRow"
          }
        }
      },
      "required": ["riskStatisticsCat"]
    },
    "FundProfile": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "styleBoxUrl": {
          "type": ["null", "string"]
        },
        "family": {
          "type": ["null", "string"]
        },
        "categoryName": {
          "type": ["null", "string"]
        },
        "legalType": {
          "type": ["null", "string"]
        },
        "managementInfo": {
          "$ref": "#/definitions/FundProfileManagementInfo"
        },
        "feesExpensesInvestment": {
          "$ref": "#/definitions/FundProfileFeesExpensesInvestment"
        },
        "feesExpensesInvestmentCat": {
          "$ref": "#/definitions/FundProfileFeesExpensesInvestmentCat"
        },
        "brokerages": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundProfileBrokerage"
          }
        },
        "initInvestment": {
          "yahooFinanceType": "number"
        },
        "initIraInvestment": {
          "yahooFinanceType": "number"
        },
        "initAipInvestment": {
          "yahooFinanceType": "number"
        },
        "subseqInvestment": {
          "yahooFinanceType": "number"
        },
        "subseqIraInvestment": {
          "yahooFinanceType": "number"
        },
        "subseqAipInvestment": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "family", "categoryName", "legalType"]
    },
    "FundProfileManagementInfo": {
      "type": "object",
      "properties": {
        "managerName": {
          "type": ["null", "string"]
        },
        "managerBio": {
          "type": ["null", "string"]
        },
        "startdate": {
          "yahooFinanceType": "date"
        }
      },
      "required": ["managerName", "managerBio"]
    },
    "FundProfileFeesExpensesInvestment": {
      "type": "object",
      "properties": {
        "annualHoldingsTurnover": {
          "yahooFinanceType": "number"
        },
        "annualReportExpenseRatio": {
          "yahooFinanceType": "number"
        },
        "grossExpRatio": {
          "yahooFinanceType": "number"
        },
        "netExpRatio": {
          "yahooFinanceType": "number"
        },
        "projectionValues": {
          "type": "object"
        },
        "totalNetAssets": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["projectionValues"]
    },
    "FundProfileFeesExpensesInvestmentCat": {
      "type": "object",
      "properties": {
        "annualHoldingsTurnover": {
          "yahooFinanceType": "number"
        },
        "annualReportExpenseRatio": {
          "yahooFinanceType": "number"
        },
        "grossExpRatio": {
          "yahooFinanceType": "number"
        },
        "netExpRatio": {
          "yahooFinanceType": "number"
        },
        "totalNetAssets": {
          "yahooFinanceType": "number"
        },
        "projectionValuesCat": {
          "type": "object"
        }
      },
      "required": ["projectionValuesCat"]
    },
    "FundProfileBrokerage": {
      "type": "object",
      "additionalProperties": false
    },
    "IncomeStatementHistory": {
      "type": "object",
      "properties": {
        "incomeStatementHistory": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/IncomeStatementHistoryElement"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["incomeStatementHistory", "maxAge"]
    },
    "IncomeStatementHistoryElement": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "endDate": {
          "yahooFinanceType": "date"
        },
        "totalRevenue": {
          "yahooFinanceType": "number"
        },
        "costOfRevenue": {
          "yahooFinanceType": "number"
        },
        "grossProfit": {
          "yahooFinanceType": "number"
        },
        "researchDevelopment": {
          "yahooFinanceType": "number|null"
        },
        "sellingGeneralAdministrative": {
          "yahooFinanceType": "number|null"
        },
        "nonRecurring": {
          "yahooFinanceType": "number|null"
        },
        "otherOperatingExpenses": {
          "yahooFinanceType": "number|null"
        },
        "totalOperatingExpenses": {
          "yahooFinanceType": "number"
        },
        "operatingIncome": {
          "yahooFinanceType": "number|null"
        },
        "totalOtherIncomeExpenseNet": {
          "yahooFinanceType": "number"
        },
        "ebit": {
          "yahooFinanceType": "number"
        },
        "interestExpense": {
          "yahooFinanceType": "number|null"
        },
        "incomeBeforeTax": {
          "yahooFinanceType": "number|null"
        },
        "incomeTaxExpense": {
          "yahooFinanceType": "number"
        },
        "minorityInterest": {
          "yahooFinanceType": "number|null"
        },
        "netIncomeFromContinuingOps": {
          "yahooFinanceType": "number|null"
        },
        "discontinuedOperations": {
          "yahooFinanceType": "number|null"
        },
        "extraordinaryItems": {
          "yahooFinanceType": "number|null"
        },
        "effectOfAccountingCharges": {
          "yahooFinanceType": "number|null"
        },
        "otherItems": {
          "yahooFinanceType": "number|null"
        },
        "netIncome": {
          "yahooFinanceType": "number"
        },
        "netIncomeApplicableToCommonShares": {
          "yahooFinanceType": "number|null"
        }
      },
      "required": ["maxAge", "endDate", "totalRevenue", "costOfRevenue", "grossProfit", "researchDevelopment", "sellingGeneralAdministrative", "nonRecurring", "otherOperatingExpenses", "totalOperatingExpenses", "operatingIncome", "totalOtherIncomeExpenseNet", "ebit", "interestExpense", "incomeBeforeTax", "incomeTaxExpense", "minorityInterest", "netIncomeFromContinuingOps", "discontinuedOperations", "extraordinaryItems", "effectOfAccountingCharges", "otherItems", "netIncome", "netIncomeApplicableToCommonShares"]
    },
    "IndexTrend": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "symbol": {
          "type": "string"
        },
        "peRatio": {
          "yahooFinanceType": "number"
        },
        "pegRatio": {
          "yahooFinanceType": "number"
        },
        "estimates": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Estimate"
          }
        }
      },
      "required": ["maxAge", "symbol", "peRatio", "pegRatio", "estimates"]
    },
    "Estimate": {
      "type": "object",
      "properties": {
        "period": {
          "type": "string"
        },
        "growth": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["period"]
    },
    "Trend": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "symbol": {
          "type": "null"
        },
        "estimates": {
          "type": "array",
          "items": {}
        }
      },
      "required": ["maxAge", "symbol", "estimates"]
    },
    "Holders": {
      "type": "object",
      "properties": {
        "holders": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Holder"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["holders", "maxAge"]
    },
    "Holder": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "name": {
          "type": "string"
        },
        "relation": {
          "anyOf": [{
            "$ref": "#/definitions/Relation"
          }, {
            "type": "string"
          }]
        },
        "url": {
          "type": "string"
        },
        "transactionDescription": {
          "type": "string"
        },
        "latestTransDate": {
          "yahooFinanceType": "date"
        },
        "positionDirect": {
          "yahooFinanceType": "number"
        },
        "positionDirectDate": {
          "yahooFinanceType": "date"
        },
        "positionIndirect": {
          "yahooFinanceType": "number"
        },
        "positionIndirectDate": {
          "yahooFinanceType": "date"
        },
        "positionSummaryDate": {
          "yahooFinanceType": "date"
        }
      },
      "required": ["maxAge", "name", "relation", "url", "transactionDescription", "latestTransDate"]
    },
    "Relation": {
      "type": "string",
      "enum": ["Chairman of the Board", "Chief Executive Officer", "Chief Financial Officer", "Chief Operating Officer", "Chief Technology Officer", "Director", "Director (Independent)", "", "General Counsel", "Independent Non-Executive Director", "Officer", "President"]
    },
    "InsiderTransactions": {
      "type": "object",
      "properties": {
        "transactions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Transaction"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["transactions", "maxAge"]
    },
    "Transaction": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "shares": {
          "yahooFinanceType": "number"
        },
        "filerUrl": {
          "type": "string"
        },
        "transactionText": {
          "type": "string"
        },
        "filerName": {
          "type": "string"
        },
        "filerRelation": {
          "anyOf": [{
            "$ref": "#/definitions/Relation"
          }, {
            "type": "string"
          }]
        },
        "moneyText": {
          "type": "string"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "ownership": {
          "anyOf": [{
            "$ref": "#/definitions/OwnershipEnum"
          }, {
            "type": "string"
          }]
        },
        "value": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "shares", "filerUrl", "transactionText", "filerName", "filerRelation", "moneyText", "startDate", "ownership"]
    },
    "OwnershipEnum": {
      "type": "string",
      "enum": ["D", "I"]
    },
    "MajorHoldersBreakdown": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "insidersPercentHeld": {
          "yahooFinanceType": "number"
        },
        "institutionsPercentHeld": {
          "yahooFinanceType": "number"
        },
        "institutionsFloatPercentHeld": {
          "yahooFinanceType": "number"
        },
        "institutionsCount": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge"]
    },
    "NetSharePurchaseActivity": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "period": {
          "type": "string"
        },
        "buyInfoCount": {
          "yahooFinanceType": "number"
        },
        "buyInfoShares": {
          "yahooFinanceType": "number"
        },
        "buyPercentInsiderShares": {
          "yahooFinanceType": "number"
        },
        "sellInfoCount": {
          "yahooFinanceType": "number"
        },
        "sellInfoShares": {
          "yahooFinanceType": "number"
        },
        "sellPercentInsiderShares": {
          "yahooFinanceType": "number"
        },
        "netInfoCount": {
          "yahooFinanceType": "number"
        },
        "netInfoShares": {
          "yahooFinanceType": "number"
        },
        "netPercentInsiderShares": {
          "yahooFinanceType": "number"
        },
        "totalInsiderShares": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "period", "buyInfoCount", "buyInfoShares", "sellInfoCount", "netInfoCount", "netInfoShares", "totalInsiderShares"]
    },
    "Price": {
      "type": "object",
      "properties": {
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "exchange": {
          "type": "string"
        },
        "exchangeName": {
          "type": "string"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketSource": {
          "type": "string"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "preMarketSource": {
          "type": "string"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "regularMarketSource": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": ["null", "string"]
        },
        "shortName": {
          "type": ["null", "string"]
        },
        "longName": {
          "type": ["null", "string"]
        },
        "lastMarket": {
          "type": ["null", "string"]
        },
        "marketState": {
          "type": "string"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "currency": {
          "type": "string"
        },
        "currencySymbol": {
          "type": "string"
        },
        "fromCurrency": {
          "type": ["string", "null"]
        },
        "toCurrency": {
          "type": ["string", "null"]
        },
        "volume24Hr": {
          "yahooFinanceType": "number"
        },
        "volumeAllCurrencies": {
          "yahooFinanceType": "number"
        },
        "circulatingSupply": {
          "yahooFinanceType": "number"
        },
        "expireDate": {
          "yahooFinanceType": "date"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "priceHint", "quoteType", "symbol", "underlyingSymbol", "shortName", "longName", "lastMarket", "fromCurrency"]
    },
    "QuoteType": {
      "type": "object",
      "properties": {
        "exchange": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "shortName": {
          "type": ["null", "string"]
        },
        "longName": {
          "type": ["null", "string"]
        },
        "firstTradeDateEpochUtc": {
          "yahooFinanceType": "date|null"
        },
        "timeZoneFullName": {
          "type": "string"
        },
        "timeZoneShortName": {
          "type": "string"
        },
        "uuid": {
          "type": "string"
        },
        "messageBoardId": {
          "type": ["null", "string"]
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["exchange", "quoteType", "symbol", "underlyingSymbol", "shortName", "longName", "firstTradeDateEpochUtc", "timeZoneFullName", "timeZoneShortName", "uuid", "gmtOffSetMilliseconds", "maxAge"]
    },
    "RecommendationTrend": {
      "type": "object",
      "properties": {
        "trend": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/RecommendationTrendTrend"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["trend", "maxAge"]
    },
    "RecommendationTrendTrend": {
      "type": "object",
      "properties": {
        "period": {
          "type": "string"
        },
        "strongBuy": {
          "yahooFinanceType": "number"
        },
        "buy": {
          "yahooFinanceType": "number"
        },
        "hold": {
          "yahooFinanceType": "number"
        },
        "sell": {
          "yahooFinanceType": "number"
        },
        "strongSell": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["period", "strongBuy", "buy", "hold", "sell", "strongSell"]
    },
    "SECFilings": {
      "type": "object",
      "properties": {
        "filings": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Filing"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["filings", "maxAge"]
    },
    "Filing": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "epochDate": {
          "yahooFinanceType": "date"
        },
        "type": {
          "type": "string",
          "enum": ["10-K", "10-Q", "8-K", "8-K/A", "10-K/A", "10-Q/A", "SD", "PX14A6G", "SC 13G/A", "DEFA14A", "25-NSE", "S-8 POS", "6-K", "F-3ASR", "SC 13D/A", "20-F", "425", "SC14D9C", "SC 13G", "S-8", "DEF 14A", "F-10"]
        },
        "title": {
          "type": "string"
        },
        "edgarUrl": {
          "type": "string"
        },
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "url": {
          "type": "string"
        },
        "exhibits": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string"
              },
              "url": {
                "type": "string"
              },
              "downloadUrl": {
                "type": "string"
              }
            },
            "required": ["type", "url"],
            "additionalProperties": false
          }
        }
      },
      "required": ["date", "epochDate", "type", "title", "edgarUrl", "maxAge"]
    },
    "SummaryDetail": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "previousClose": {
          "yahooFinanceType": "number"
        },
        "open": {
          "yahooFinanceType": "number"
        },
        "dayLow": {
          "yahooFinanceType": "number"
        },
        "dayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "dividendRate": {
          "yahooFinanceType": "number"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        },
        "exDividendDate": {
          "yahooFinanceType": "date"
        },
        "payoutRatio": {
          "yahooFinanceType": "number"
        },
        "fiveYearAvgDividendYield": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "volume": {
          "yahooFinanceType": "number"
        },
        "averageVolume": {
          "yahooFinanceType": "number"
        },
        "averageVolume10days": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "priceToSalesTrailing12Months": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "currency": {
          "type": "string"
        },
        "algorithm": {
          "type": "null"
        },
        "tradeable": {
          "type": "boolean"
        },
        "yield": {
          "yahooFinanceType": "number"
        },
        "totalAssets": {
          "yahooFinanceType": "number"
        },
        "navPrice": {
          "yahooFinanceType": "number"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "fromCurrency": {
          "type": ["string", "null"]
        },
        "toCurrency": {
          "type": ["string", "null"]
        },
        "lastMarket": {
          "type": ["string", "null"]
        },
        "volume24Hr": {
          "yahooFinanceType": "number"
        },
        "volumeAllCurrencies": {
          "yahooFinanceType": "number"
        },
        "circulatingSupply": {
          "yahooFinanceType": "number"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "coinMarketCapLink": {
          "type": ["string", "null"]
        },
        "expireDate": {
          "yahooFinanceType": "date"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "priceHint", "currency", "algorithm", "tradeable", "fromCurrency", "lastMarket"]
    },
    "SummaryProfile": {
      "type": "object",
      "properties": {
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "address3": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "fax": {
          "type": "string"
        },
        "website": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "industryDisp": {
          "type": "string"
        },
        "sector": {
          "type": "string"
        },
        "sectorDisp": {
          "type": "string"
        },
        "longBusinessSummary": {
          "type": "string"
        },
        "fullTimeEmployees": {
          "yahooFinanceType": "number"
        },
        "companyOfficers": {
          "type": "array",
          "items": {}
        },
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "twitter": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "description": {
          "type": "string"
        }
      },
      "required": ["companyOfficers", "maxAge"]
    },
    "TopHoldings": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "stockPosition": {
          "yahooFinanceType": "number"
        },
        "bondPosition": {
          "yahooFinanceType": "number"
        },
        "holdings": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TopHoldingsHolding"
          }
        },
        "equityHoldings": {
          "$ref": "#/definitions/TopHoldingsEquityHoldings"
        },
        "bondHoldings": {
          "type": "object"
        },
        "bondRatings": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TopHoldingsBondRating"
          }
        },
        "sectorWeightings": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TopHoldingsSectorWeighting"
          }
        },
        "cashPosition": {
          "yahooFinanceType": "number"
        },
        "otherPosition": {
          "yahooFinanceType": "number"
        },
        "preferredPosition": {
          "yahooFinanceType": "number"
        },
        "convertiblePosition": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["maxAge", "holdings", "equityHoldings", "bondHoldings", "bondRatings", "sectorWeightings"]
    },
    "TopHoldingsHolding": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "holdingName": {
          "type": "string"
        },
        "holdingPercent": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["symbol", "holdingName", "holdingPercent"]
    },
    "TopHoldingsEquityHoldings": {
      "type": "object",
      "properties": {
        "medianMarketCap": {
          "yahooFinanceType": "number"
        },
        "medianMarketCapCat": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "priceToBookCat": {
          "yahooFinanceType": "number"
        },
        "priceToCashflow": {
          "yahooFinanceType": "number"
        },
        "priceToCashflowCat": {
          "yahooFinanceType": "number"
        },
        "priceToEarnings": {
          "yahooFinanceType": "number"
        },
        "priceToEarningsCat": {
          "yahooFinanceType": "number"
        },
        "priceToSales": {
          "yahooFinanceType": "number"
        },
        "priceToSalesCat": {
          "yahooFinanceType": "number"
        },
        "threeYearEarningsGrowth": {
          "yahooFinanceType": "number"
        },
        "threeYearEarningsGrowthCat": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["priceToBook", "priceToCashflow", "priceToEarnings", "priceToSales"]
    },
    "TopHoldingsBondRating": {
      "type": "object",
      "properties": {
        "a": {
          "yahooFinanceType": "number"
        },
        "aa": {
          "yahooFinanceType": "number"
        },
        "aaa": {
          "yahooFinanceType": "number"
        },
        "other": {
          "yahooFinanceType": "number"
        },
        "b": {
          "yahooFinanceType": "number"
        },
        "bb": {
          "yahooFinanceType": "number"
        },
        "bbb": {
          "yahooFinanceType": "number"
        },
        "below_b": {
          "yahooFinanceType": "number"
        },
        "us_government": {
          "yahooFinanceType": "number"
        }
      }
    },
    "TopHoldingsSectorWeighting": {
      "type": "object",
      "properties": {
        "realestate": {
          "yahooFinanceType": "number"
        },
        "consumer_cyclical": {
          "yahooFinanceType": "number"
        },
        "basic_materials": {
          "yahooFinanceType": "number"
        },
        "consumer_defensive": {
          "yahooFinanceType": "number"
        },
        "technology": {
          "yahooFinanceType": "number"
        },
        "communication_services": {
          "yahooFinanceType": "number"
        },
        "financial_services": {
          "yahooFinanceType": "number"
        },
        "utilities": {
          "yahooFinanceType": "number"
        },
        "industrials": {
          "yahooFinanceType": "number"
        },
        "energy": {
          "yahooFinanceType": "number"
        },
        "healthcare": {
          "yahooFinanceType": "number"
        }
      }
    },
    "UpgradeDowngradeHistory": {
      "type": "object",
      "properties": {
        "history": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/UpgradeDowngradeHistoryHistory"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["history", "maxAge"]
    },
    "UpgradeDowngradeHistoryHistory": {
      "type": "object",
      "properties": {
        "epochGradeDate": {
          "yahooFinanceType": "date"
        },
        "firm": {
          "type": "string"
        },
        "toGrade": {
          "$ref": "#/definitions/Grade"
        },
        "fromGrade": {
          "$ref": "#/definitions/Grade"
        },
        "action": {
          "$ref": "#/definitions/Action"
        }
      },
      "required": ["epochGradeDate", "firm", "toGrade", "action"]
    },
    "Grade": {
      "type": "string",
      "enum": ["Accumulate", "Add", "Average", "Below Average", "Buy", "Conviction Buy", "", "Equal-Weight", "Fair Value", "Equal-weight", "Long-term Buy", "Hold", "Long-Term Buy", "Market Outperform", "Market Perform", "Mixed", "Negative", "Neutral", "In-Line", "Outperform", "Overweight", "Peer Perform", "Perform", "Positive", "Reduce", "Sector Outperform", "Sector Perform", "Sector Weight", "Sell", "Strong Buy", "Top Pick", "Underperform", "Underperformer", "Underweight", "Trim", "Above Average", "In-line", "Outperformer", "OVerweight", "Cautious", "Market Weight", "Sector Underperform", "Market Underperform", "Peer perform", "Gradually Accumulate", "Action List Buy", "Performer", "Sector Performer", "Speculative Buy", "Strong Sell", "Speculative Hold", "Not Rated", "Hold Neutral", "Developing", "buy", "HOld", "Trading Sell", "Tender", "market perform", "BUy"]
    },
    "Action": {
      "type": "string",
      "enum": ["down", "init", "main", "reit", "up"]
    },
    "QuoteSummaryModules": {
      "type": "string",
      "enum": ["assetProfile", "balanceSheetHistory", "balanceSheetHistoryQuarterly", "calendarEvents", "cashflowStatementHistory", "cashflowStatementHistoryQuarterly", "defaultKeyStatistics", "earnings", "earningsHistory", "earningsTrend", "financialData", "fundOwnership", "fundPerformance", "fundProfile", "incomeStatementHistory", "incomeStatementHistoryQuarterly", "indexTrend", "industryTrend", "insiderHolders", "insiderTransactions", "institutionOwnership", "majorDirectHolders", "majorHoldersBreakdown", "netSharePurchaseActivity", "price", "quoteType", "recommendationTrend", "secFilings", "sectorTrend", "summaryDetail", "summaryProfile", "topHoldings", "upgradeDowngradeHistory"]
    },
    "QuoteSummaryOptions": {
      "type": "object",
      "properties": {
        "formatted": {
          "type": "boolean"
        },
        "modules": {
          "anyOf": [{
            "type": "array",
            "items": {
              "$ref": "#/definitions/QuoteSummaryModules"
            }
          }, {
            "type": "string",
            "const": "all"
          }]
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof quoteSummary>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/QuoteSummaryOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this", "symbol"],
      "additionalProperties": false
    },
    "RecommendationsBySymbolResponse": {
      "type": "object",
      "properties": {
        "recommendedSymbols": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "score": {
                "yahooFinanceType": "number"
              },
              "symbol": {
                "type": "string"
              }
            },
            "required": ["score", "symbol"]
          }
        },
        "symbol": {
          "type": "string"
        }
      },
      "required": ["recommendedSymbols", "symbol"]
    },
    "RecommendationsBySymbolResponseArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/RecommendationsBySymbolResponse"
      }
    },
    "RecommendationsBySymbolOptions": {
      "type": "object",
      "additionalProperties": false
    },
    "NamedParameters<typeof recommendationsBySymbol>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "query": {
          "anyOf": [{
            "type": "string"
          }, {
            "type": "array",
            "items": {
              "type": "string"
            }
          }]
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/RecommendationsBySymbolOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this", "query"],
      "additionalProperties": false
    },
    "ScreenerResult": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "canonicalName": {
          "type": "string"
        },
        "criteriaMeta": {
          "$ref": "#/definitions/ScreenerCriteriaMeta"
        },
        "rawCriteria": {
          "type": "string"
        },
        "start": {
          "yahooFinanceType": "number"
        },
        "count": {
          "yahooFinanceType": "number"
        },
        "total": {
          "yahooFinanceType": "number"
        },
        "quotes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ScreenerQuote"
          }
        },
        "useRecords": {
          "type": "boolean"
        },
        "predefinedScr": {
          "type": "boolean"
        },
        "versionId": {
          "yahooFinanceType": "number"
        },
        "creationDate": {
          "yahooFinanceType": "number"
        },
        "lastUpdated": {
          "yahooFinanceType": "number"
        },
        "isPremium": {
          "type": "boolean"
        },
        "iconUrl": {
          "type": "string"
        }
      },
      "required": ["id", "title", "description", "canonicalName", "criteriaMeta", "rawCriteria", "start", "count", "total", "quotes", "useRecords", "predefinedScr", "versionId", "creationDate", "lastUpdated", "isPremium", "iconUrl"],
      "additionalProperties": false
    },
    "ScreenerCriteriaMeta": {
      "type": "object",
      "properties": {
        "size": {
          "yahooFinanceType": "number"
        },
        "offset": {
          "yahooFinanceType": "number"
        },
        "sortField": {
          "type": "string"
        },
        "sortType": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "criteria": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ScreenerCriterum"
          }
        },
        "topOperator": {
          "type": "string"
        }
      },
      "required": ["size", "offset", "sortField", "sortType", "quoteType", "criteria", "topOperator"],
      "additionalProperties": false
    },
    "ScreenerCriterum": {
      "type": "object",
      "properties": {
        "field": {
          "type": "string"
        },
        "operators": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "values": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "labelsSelected": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "dependentValues": {
          "type": "array",
          "items": {}
        }
      },
      "required": ["field", "operators", "values", "labelsSelected", "dependentValues"],
      "additionalProperties": false
    },
    "ScreenerQuote": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "lastCloseTevEbitLtm": {
          "yahooFinanceType": "number"
        },
        "lastClosePriceToNNWCPerShare": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "number"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "number"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "type": "string"
        },
        "currency": {
          "type": "string"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "type": "string"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "number"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "number"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "marketState": {
          "type": "string"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "shortName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "symbol": {
          "type": "string"
        },
        "dividendDate": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "number"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        },
        "dividendRate": {
          "yahooFinanceType": "number"
        },
        "yieldTTM": {
          "yahooFinanceType": "number"
        },
        "peTTM": {
          "yahooFinanceType": "number"
        },
        "annualReturnNavY3": {
          "yahooFinanceType": "number"
        },
        "annualReturnNavY5": {
          "yahooFinanceType": "number"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "netAssets": {
          "yahooFinanceType": "number"
        },
        "netExpenseRatio": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["language", "region", "quoteType", "typeDisp", "quoteSourceName", "triggerable", "customPriceAlertConfidence", "firstTradeDateMilliseconds", "priceHint", "regularMarketChange", "regularMarketTime", "regularMarketPrice", "currency", "regularMarketPreviousClose", "market", "messageBoardId", "fullExchangeName", "longName", "averageDailyVolume3Month", "averageDailyVolume10Day", "fiftyTwoWeekLowChange", "fiftyTwoWeekLowChangePercent", "fiftyTwoWeekRange", "fiftyTwoWeekHighChange", "fiftyTwoWeekHighChangePercent", "fiftyTwoWeekChangePercent", "marketState", "fiftyDayAverage", "fiftyDayAverageChange", "fiftyDayAverageChangePercent", "twoHundredDayAverage", "twoHundredDayAverageChange", "twoHundredDayAverageChangePercent", "sourceInterval", "exchangeDataDelayedBy", "exchangeTimezoneName", "exchangeTimezoneShortName", "gmtOffSetMilliseconds", "esgPopulated", "tradeable", "cryptoTradeable", "exchange", "fiftyTwoWeekLow", "fiftyTwoWeekHigh", "shortName", "regularMarketChangePercent", "symbol"],
      "additionalProperties": false
    },
    "PredefinedScreenerModules": {
      "type": "string",
      "enum": ["aggressive_small_caps", "conservative_foreign_funds", "day_gainers", "day_losers", "growth_technology_stocks", "high_yield_bond", "most_actives", "most_shorted_stocks", "portfolio_anchors", "small_cap_gainers", "solid_large_growth_funds", "solid_midcap_growth_funds", "top_mutual_funds", "undervalued_growth_stocks", "undervalued_large_caps"]
    },
    "ScreenerOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "scrIds": {
          "$ref": "#/definitions/PredefinedScreenerModules"
        },
        "count": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["scrIds"],
      "additionalProperties": false
    },
    "NamedParameters<typeof screener>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/ScreenerOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this"],
      "additionalProperties": false
    },
    "SearchQuoteYahoo": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        }
      },
      "required": ["symbol", "isYahooFinance", "exchange", "index", "score"]
    },
    "SearchQuoteYahooEquity": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "EQUITY"
        },
        "typeDisp": {
          "type": "string",
          "const": "Equity"
        }
      },
      "required": ["exchange", "index", "isYahooFinance", "quoteType", "score", "symbol", "typeDisp"]
    },
    "SearchQuoteYahooOption": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "OPTION"
        },
        "typeDisp": {
          "type": "string",
          "const": "Option"
        }
      },
      "required": ["exchange", "index", "isYahooFinance", "quoteType", "score", "symbol", "typeDisp"]
    },
    "SearchQuoteYahooETF": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "ETF"
        },
        "typeDisp": {
          "type": "string",
          "const": "ETF"
        }
      },
      "required": ["exchange", "index", "isYahooFinance", "quoteType", "score", "symbol", "typeDisp"]
    },
    "SearchQuoteYahooFund": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "MUTUALFUND"
        },
        "typeDisp": {
          "type": "string",
          "const": "Fund"
        }
      },
      "required": ["exchange", "index", "isYahooFinance", "quoteType", "score", "symbol", "typeDisp"]
    },
    "SearchQuoteYahooIndex": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "INDEX"
        },
        "typeDisp": {
          "type": "string",
          "const": "Index"
        }
      },
      "required": ["exchange", "index", "isYahooFinance", "quoteType", "score", "symbol", "typeDisp"]
    },
    "SearchQuoteYahooCurrency": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "CURRENCY"
        },
        "typeDisp": {
          "type": "string",
          "const": "Currency"
        }
      },
      "required": ["exchange", "index", "isYahooFinance", "quoteType", "score", "symbol", "typeDisp"]
    },
    "SearchQuoteYahooCryptocurrency": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "CRYPTOCURRENCY"
        },
        "typeDisp": {
          "type": "string",
          "const": "Cryptocurrency"
        }
      },
      "required": ["exchange", "index", "isYahooFinance", "quoteType", "score", "symbol", "typeDisp"]
    },
    "SearchQuoteYahooFuture": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "FUTURE"
        },
        "typeDisp": {
          "type": "string",
          "enum": ["Future", "Futures"]
        }
      },
      "required": ["exchange", "index", "isYahooFinance", "quoteType", "score", "symbol", "typeDisp"]
    },
    "SearchQuoteNonYahoo": {
      "type": "object",
      "properties": {
        "index": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "permalink": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": false
        }
      },
      "required": ["index", "name", "permalink", "isYahooFinance"]
    },
    "SearchNews": {
      "type": "object",
      "properties": {
        "uuid": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "publisher": {
          "type": "string"
        },
        "link": {
          "type": "string"
        },
        "providerPublishTime": {
          "yahooFinanceType": "date"
        },
        "type": {
          "type": "string"
        },
        "thumbnail": {
          "type": "object",
          "properties": {
            "resolutions": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/SearchNewsThumbnailResolution"
              }
            }
          },
          "required": ["resolutions"],
          "additionalProperties": false
        },
        "relatedTickers": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["uuid", "title", "publisher", "link", "providerPublishTime", "type"]
    },
    "SearchNewsThumbnailResolution": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "width": {
          "yahooFinanceType": "number"
        },
        "height": {
          "yahooFinanceType": "number"
        },
        "tag": {
          "type": "string"
        }
      },
      "required": ["url", "width", "height", "tag"],
      "additionalProperties": false
    },
    "SearchResult": {
      "type": "object",
      "properties": {
        "explains": {
          "type": "array",
          "items": {}
        },
        "count": {
          "yahooFinanceType": "number"
        },
        "quotes": {
          "type": "array",
          "items": {
            "anyOf": [{
              "$ref": "#/definitions/SearchQuoteYahooEquity"
            }, {
              "$ref": "#/definitions/SearchQuoteYahooOption"
            }, {
              "$ref": "#/definitions/SearchQuoteYahooETF"
            }, {
              "$ref": "#/definitions/SearchQuoteYahooFund"
            }, {
              "$ref": "#/definitions/SearchQuoteYahooIndex"
            }, {
              "$ref": "#/definitions/SearchQuoteYahooCurrency"
            }, {
              "$ref": "#/definitions/SearchQuoteYahooCryptocurrency"
            }, {
              "$ref": "#/definitions/SearchQuoteNonYahoo"
            }, {
              "$ref": "#/definitions/SearchQuoteYahooFuture"
            }]
          }
        },
        "news": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/SearchNews"
          }
        },
        "nav": {
          "type": "array",
          "items": {}
        },
        "lists": {
          "type": "array",
          "items": {}
        },
        "researchReports": {
          "type": "array",
          "items": {}
        },
        "totalTime": {
          "yahooFinanceType": "number"
        },
        "screenerFieldResults": {
          "type": "array",
          "items": {}
        },
        "culturalAssets": {
          "type": "array",
          "items": {}
        },
        "timeTakenForQuotes": {
          "yahooFinanceType": "number"
        },
        "timeTakenForNews": {
          "yahooFinanceType": "number"
        },
        "timeTakenForAlgowatchlist": {
          "yahooFinanceType": "number"
        },
        "timeTakenForPredefinedScreener": {
          "yahooFinanceType": "number"
        },
        "timeTakenForCrunchbase": {
          "yahooFinanceType": "number"
        },
        "timeTakenForNav": {
          "yahooFinanceType": "number"
        },
        "timeTakenForResearchReports": {
          "yahooFinanceType": "number"
        },
        "timeTakenForScreenerField": {
          "yahooFinanceType": "number"
        },
        "timeTakenForCulturalAssets": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["explains", "count", "quotes", "news", "nav", "lists", "researchReports", "totalTime", "timeTakenForQuotes", "timeTakenForNews", "timeTakenForAlgowatchlist", "timeTakenForPredefinedScreener", "timeTakenForCrunchbase", "timeTakenForNav", "timeTakenForResearchReports"]
    },
    "SearchOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quotesCount": {
          "yahooFinanceType": "number"
        },
        "newsCount": {
          "yahooFinanceType": "number"
        },
        "enableFuzzyQuery": {
          "type": "boolean"
        },
        "quotesQueryId": {
          "type": "string"
        },
        "multiQuoteQueryId": {
          "type": "string"
        },
        "newsQueryId": {
          "type": "string"
        },
        "enableCb": {
          "type": "boolean"
        },
        "enableNavLinks": {
          "type": "boolean"
        },
        "enableEnhancedTrivialQuery": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof search>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "query": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/SearchOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": ["this", "query"],
      "additionalProperties": false
    },
    "TrendingSymbol": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        }
      },
      "required": ["symbol"]
    },
    "TrendingSymbolsResult": {
      "type": "object",
      "properties": {
        "count": {
          "yahooFinanceType": "number"
        },
        "quotes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TrendingSymbol"
          }
        },
        "jobTimestamp": {
          "yahooFinanceType": "number"
        },
        "startInterval": {
          "yahooFinanceType": "number"
        }
      },
      "required": ["count", "quotes", "jobTimestamp", "startInterval"]
    }
  }
};

},{}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/// <reference lib="DOM" />
function fetchDevel() {
  throw new Error("{ devel: true } not suported in the browser");
}
var _default = exports.default = {
  fetch,
  fetchDevel,
  URLSearchParams
};

},{}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _indexCommon = _interopRequireDefault(require("./index-common.js"));
var _envBrowser = _interopRequireDefault(require("./env-browser.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_indexCommon.default._env = _envBrowser.default;
// NOTE: The repo name is hardcoded, see #167
console.warn("⚠️ WARNING! This package (i.e. `yahoo-finance2`) is being used in the browser.", "Trying to use this may not work because of CORS. Be aware of that (and don't file issues for help with that).", "You can use a proxy to make CORS errors disappear, but we will not help you with that.", "Please read the README (https://github.com/gadicc/node-yahoo-finance2) for more details.");
var _default = exports.default = _indexCommon.default;

},{"./env-browser.js":115,"./index-common.js":117}],117:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _yahooFinanceFetch = _interopRequireDefault(require("./lib/yahooFinanceFetch.js"));
var _moduleExec = _interopRequireDefault(require("./lib/moduleExec.js"));
var _options = _interopRequireDefault(require("./lib/options.js"));
var _errors = _interopRequireDefault(require("./lib/errors.js"));
var _setGlobalConfig = _interopRequireDefault(require("./lib/setGlobalConfig.js"));
var _validateAndCoerceTypes = require("./lib/validateAndCoerceTypes.js");
var _autoc = _interopRequireDefault(require("./modules/autoc.js"));
var _chart2 = _interopRequireWildcard(require("./modules/chart.js"));
var _historical = _interopRequireDefault(require("./modules/historical.js"));
var _insights = _interopRequireDefault(require("./modules/insights.js"));
var _options2 = _interopRequireDefault(require("./modules/options.js"));
var _quote = _interopRequireDefault(require("./modules/quote.js"));
var _quoteSummary = _interopRequireDefault(require("./modules/quoteSummary.js"));
var _recommendationsBySymbol = _interopRequireDefault(require("./modules/recommendationsBySymbol.js"));
var _search = _interopRequireDefault(require("./modules/search.js"));
var _trendingSymbols = _interopRequireDefault(require("./modules/trendingSymbols.js"));
var _dailyGainers = _interopRequireDefault(require("./modules/dailyGainers.js"));
var _screener = _interopRequireDefault(require("./modules/screener.js"));
var _quoteCombine = _interopRequireDefault(require("./other/quoteCombine.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// libs
// modules
// other
var _default = exports.default = {
  // internal
  _env: {},
  _fetch: _yahooFinanceFetch.default,
  _moduleExec: _moduleExec.default,
  _opts: _options.default,
  _disallowAdditionalProps: _validateAndCoerceTypes.disallowAdditionalProps,
  // common
  errors: _errors.default,
  setGlobalConfig: _setGlobalConfig.default,
  // modules,
  autoc: _autoc.default,
  chart: _chart2.default,
  _chart: _chart2._chart,
  historical: _historical.default,
  insights: _insights.default,
  options: _options2.default,
  quote: _quote.default,
  quoteSummary: _quoteSummary.default,
  recommendationsBySymbol: _recommendationsBySymbol.default,
  search: _search.default,
  trendingSymbols: _trendingSymbols.default,
  dailyGainers: _dailyGainers.default,
  screener: _screener.default,
  // other
  quoteCombine: _quoteCombine.default
};

},{"./lib/errors.js":120,"./lib/moduleExec.js":122,"./lib/options.js":123,"./lib/setGlobalConfig.js":125,"./lib/validateAndCoerceTypes.js":126,"./lib/yahooFinanceFetch.js":127,"./modules/autoc.js":128,"./modules/chart.js":129,"./modules/dailyGainers.js":130,"./modules/historical.js":131,"./modules/insights.js":132,"./modules/options.js":133,"./modules/quote.js":134,"./modules/quoteSummary.js":135,"./modules/recommendationsBySymbol.js":136,"./modules/screener.js":137,"./modules/search.js":138,"./modules/trendingSymbols.js":139,"./other/quoteCombine.js":140}],118:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtendedCookieJar = void 0;
var _toughCookie = require("tough-cookie");
class ExtendedCookieJar extends _toughCookie.CookieJar {
  async setFromSetCookieHeaders(setCookieHeader, url) {
    let cookies;
    // console.log("setFromSetCookieHeaders", setCookieHeader);
    if (typeof setCookieHeader === "undefined") {
      // no-op
    } else if (setCookieHeader instanceof Array) {
      cookies = setCookieHeader.map(header => _toughCookie.Cookie.parse(header));
    } else if (typeof setCookieHeader === "string") {
      cookies = [_toughCookie.Cookie.parse(setCookieHeader)];
    }
    if (cookies) for (const cookie of cookies) if (cookie instanceof _toughCookie.Cookie) {
      // console.log("setCookieSync", cookie, url);
      await this.setCookie(cookie, url);
    }
  }
}
exports.ExtendedCookieJar = ExtendedCookieJar;

},{"tough-cookie":96}],119:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = csv2json;
// Partial implementation that covers everything we need
const DELIMITER = ",";
function camelize(str) {
  return str.split(" ").map((str, i) => i === 0 ? str.toLowerCase() : str[0].toUpperCase() + str.substr(1).toLowerCase()).join("");
}
function convert(input) {
  if (input.match(/\d{4,4}-\d{2,2}-\d{2,2}/)) return new Date(input);
  if (input.match(/^[0-9\.]+$/)) return parseFloat(input);
  if (input === "null") return null;
  return input;
}
function csv2json(csv) {
  const lines = csv.split("\n");
  // Actually we should handle this case, i.e. headers but no data.
  // if (lines.length === 1)
  //  throw new Error("No newlines in: " + csv);
  const headers = lines.shift().split(DELIMITER).map(camelize);
  const out = new Array(lines.length);
  for (let i = 0; i < lines.length; i++) {
    const inRow = lines[i].split(DELIMITER);
    const outRow = out[i] = {};
    for (let j = 0; j < inRow.length; j++) {
      outRow[headers[j]] = convert(inRow[j]);
    }
  }
  return out;
}

},{}],120:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoEnvironmentError = exports.InvalidOptionsError = exports.HTTPError = exports.FailedYahooValidationError = exports.BadRequestError = void 0;
// Yahoo's servers returned an HTTP 400 for this request.
class BadRequestError extends Error {
  constructor() {
    super(...arguments);
    this.name = "BadRequestError";
  }
}
// Yahoo's servers returned a 'not-ok' status for this request.
// https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
exports.BadRequestError = BadRequestError;
class HTTPError extends Error {
  constructor() {
    super(...arguments);
    this.name = "HTTPError";
  }
}
// A YahooFinance method was called with invalid options.
exports.HTTPError = HTTPError;
class InvalidOptionsError extends Error {
  constructor() {
    super(...arguments);
    this.name = "InvalidOptionsError";
  }
}
// An internal method yahooFinanceFetch() was called without this._env set.
exports.InvalidOptionsError = InvalidOptionsError;
class NoEnvironmentError extends Error {
  constructor() {
    super(...arguments);
    this.name = "NoEnvironmentError";
  }
}
exports.NoEnvironmentError = NoEnvironmentError;
class FailedYahooValidationError extends Error {
  constructor(message, {
    result,
    errors
  }) {
    super(message);
    this.name = "FailedYahooValidationError";
    this.result = result;
    this.errors = errors;
  }
}
exports.FailedYahooValidationError = FailedYahooValidationError;
const errors = {
  BadRequestError,
  HTTPError,
  InvalidOptionsError,
  NoEnvironmentError,
  FailedYahooValidationError
};
var _default = exports.default = errors;

},{}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getCrumb = _getCrumb;
exports.default = getCrumb;
exports.getCrumbClear = getCrumbClear;
var _toughCookie = require("tough-cookie");
const CONFIG_FAKE_URL = "http://config.yf2/";
let crumb = null;
const parseHtmlEntities = str => str.replace(/&#x([0-9A-Fa-f]{1,3});/gi, (_, numStr) => String.fromCharCode(parseInt(numStr, 16)));
async function _getCrumb(cookieJar, fetch, fetchOptionsBase, logger, url = "https://finance.yahoo.com/quote/AAPL", develOverride = "getCrumb-quote-AAPL.json", noCache = false) {
  if (!crumb) {
    const cookies = await cookieJar.getCookies(CONFIG_FAKE_URL);
    for (const cookie of cookies) {
      if (cookie.key === "crumb") {
        crumb = cookie.value;
        logger.debug("Retrieved crumb from cookie store: " + crumb);
        break;
      }
    }
  }
  if (crumb && !noCache) {
    // If we still have a valid (non-expired) cookie, return the existing crumb.
    const existingCookies = await cookieJar.getCookies(url, {
      expire: true
    });
    if (existingCookies.length) return crumb;
  }
  async function processSetCookieHeader(header, url) {
    if (header) {
      await cookieJar.setFromSetCookieHeaders(header, url);
      return true;
    }
    return false;
  }
  logger.debug("Fetching crumb and cookies from " + url + "...");
  const fetchOptions = {
    ...fetchOptionsBase,
    headers: {
      ...fetchOptionsBase.headers,
      // NB, we won't get a set-cookie header back without this:
      accept: "text/html,application/xhtml+xml,application/xml"
      // This request will get our first cookies, so nothing to send.
      // cookie: await cookieJar.getCookieString(url),
    },
    redirect: "manual",
    devel: fetchOptionsBase.devel && develOverride
  };
  const response = await fetch(url, fetchOptions);
  await processSetCookieHeader(response.headers.raw()["set-cookie"], url);
  // logger.debug(response.headers.raw());
  // logger.debug(cookieJar);
  const location = response.headers.get("location");
  if (location) {
    if (location.match(/guce.yahoo/)) {
      const consentFetchOptions = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          // GUCS=XXXXXXXX; Max-Age=1800; Domain=.yahoo.com; Path=/; Secure
          cookie: await cookieJar.getCookieString(location)
        },
        devel: "getCrumb-quote-AAPL-consent.html"
      };
      // Returns 302 to collectConsent?sessionId=XXX
      logger.debug("fetch", location /*, consentFetchOptions */);
      const consentResponse = await fetch(location, consentFetchOptions);
      const consentLocation = consentResponse.headers.get("location");
      if (consentLocation) {
        if (!consentLocation.match(/collectConsent/)) throw new Error("Unexpected redirect to " + consentLocation);
        const collectConsentFetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(consentLocation)
          },
          devel: "getCrumb-quote-AAPL-collectConsent.html"
        };
        logger.debug("fetch", consentLocation /*, collectConsentFetchOptions */);
        const collectConsentResponse = await fetch(consentLocation, collectConsentFetchOptions);
        const collectConsentBody = await collectConsentResponse.text();
        const collectConsentResponseParams = [...collectConsentBody.matchAll(/<input type="hidden" name="([^"]+)" value="([^"]+)">/g)].map(([, name, value]) => `${name}=${encodeURIComponent(parseHtmlEntities(value))}&`).join("") + "agree=agree&agree=agree";
        const collectConsentSubmitFetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(consentLocation),
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          // body: "csrfToken=XjJfOYU&sessionId=3_cc-session_bd9a3b0c-c1b4-4aa8-8c18-7a82ec68a5d5&originalDoneUrl=https%3A%2F%2Ffinance.yahoo.com%2Fquote%2FAAPL%3Fguccounter%3D1&namespace=yahoo&agree=agree&agree=agree",
          body: collectConsentResponseParams,
          devel: "getCrumb-quote-AAPL-collectConsentSubmit"
        };
        logger.debug("fetch", consentLocation /*, collectConsentSubmitFetchOptions */);
        const collectConsentSubmitResponse = await fetch(consentLocation, collectConsentSubmitFetchOptions);
        // Set-Cookie: CFC=AQABCAFkWkdkjEMdLwQ9&s=AQAAAClxdtC-&g=ZFj24w; Expires=Wed, 8 May 2024 01:18:54 GMT; Domain=consent.yahoo.com; Path=/; Secure
        if (!(await processSetCookieHeader(collectConsentSubmitResponse.headers.raw()["set-cookie"], consentLocation))) throw new Error("No set-cookie header on collectConsentSubmitResponse, please report.");
        // https://guce.yahoo.com/copyConsent?sessionId=3_cc-session_04da10ea-1025-4676-8175-60d2508bfc6c&lang=en-GB
        const collectConsentSubmitResponseLocation = collectConsentSubmitResponse.headers.get("location");
        if (!collectConsentSubmitResponseLocation) throw new Error("collectConsentSubmitResponse unexpectedly did not return a Location header, please report.");
        const copyConsentFetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(collectConsentSubmitResponseLocation)
          },
          devel: "getCrumb-quote-AAPL-copyConsent"
        };
        logger.debug("fetch", collectConsentSubmitResponseLocation /*, copyConsentFetchOptions */);
        const copyConsentResponse = await fetch(collectConsentSubmitResponseLocation, copyConsentFetchOptions);
        if (!(await processSetCookieHeader(copyConsentResponse.headers.raw()["set-cookie"], collectConsentSubmitResponseLocation))) throw new Error("No set-cookie header on copyConsentResponse, please report.");
        const copyConsentResponseLocation = copyConsentResponse.headers.get("location");
        if (!copyConsentResponseLocation) throw new Error("collectConsentSubmitResponse unexpectedly did not return a Location header, please report.");
        const finalResponseFetchOptions = {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(collectConsentSubmitResponseLocation)
          },
          devel: "getCrumb-quote-AAPL-consent-final-redirect.html"
        };
        return await _getCrumb(cookieJar, fetch, finalResponseFetchOptions, logger, copyConsentResponseLocation, "getCrumb-quote-AAPL-consent-final-redirect.html", noCache);
      }
    } else {
      throw new Error("Unsupported redirect to " + location + ", please report.");
    }
  }
  const cookie = (await cookieJar.getCookies(url, {
    expire: true
  }))[0];
  if (cookie) {
    logger.debug("Success. Cookie expires on " + cookie.expires);
  } else {
    /*
    logger.error(
      "No cookie was retreieved.  Probably the next request " +
        "will fail.  Please report."
    );
    */
    throw new Error("No set-cookie header present in Yahoo's response.  Something must have changed, please report.");
  }
  const source = await response.text();
  // Could also match on window.YAHOO.context = { /* multi-line JSON */ }
  const match = source.match(/\nwindow.YAHOO.context = ({[\s\S]+\n});\n/);
  if (!match) {
    throw new Error("Could not find window.YAHOO.context. Yahoo's API may have changed; please report.");
  }
  let context;
  try {
    context = JSON.parse(match[1]);
  } catch (error) {
    logger.debug(match[1]);
    logger.error(error);
    throw new Error("Could not parse window.YAHOO.context.  Yahoo's API may have changed; please report.");
  }
  crumb = context.crumb;
  if (!crumb) throw new Error("Could not find crumb.  Yahoo's API may have changed; please report.");
  logger.debug("New crumb: " + crumb);
  await cookieJar.setCookie(new _toughCookie.Cookie({
    key: "crumb",
    value: crumb
  }), CONFIG_FAKE_URL);
  promise = null;
  return crumb;
}
let promise = null;
async function getCrumbClear(cookieJar) {
  crumb = null;
  promise = null;
  await cookieJar.removeAllCookies();
}
function getCrumb(cookieJar, fetch, fetchOptionsBase, logger, url = "https://finance.yahoo.com/quote/AAPL", __getCrumb = _getCrumb) {
  if (!promise) promise = __getCrumb(cookieJar, fetch, fetchOptionsBase, logger, url);
  return promise;
}

},{"tough-cookie":96}],122:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _validateAndCoerceTypes = _interopRequireDefault(require("./validateAndCoerceTypes.js"));
var _csv2json = _interopRequireDefault(require("./csv2json.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * moduleExec(options: ModuleExecOptions)
 *
 * 1. Query Stage
 *   1. Validate user-supplied module params, e.g. { period: '1d' }
 *   2. Merge query params: (module defaults, user-supplied overrides, etc)
 *   3. Optionally transform query params
 *
 * 2. Call lib/yahooFinanceFetch
 *
 * 3. Result Stage
 *   1. Optional transform the result
 *   2. Validate the result and coerce types
 *
 * Further info below, inline.
 */

async function moduleExec(opts) {
  var _a;
  const queryOpts = opts.query;
  const moduleOpts = opts.moduleOptions;
  const moduleName = opts.moduleName;
  const resultOpts = opts.result;
  if (queryOpts.assertSymbol) {
    const symbol = queryOpts.assertSymbol;
    if (typeof symbol !== "string") throw new Error(`yahooFinance.${moduleName}() expects a single string symbol as its ` + `query, not a(n) ${typeof symbol}: ${JSON.stringify(symbol)}`);
  }
  // Check that query options passed by the user are valid for this module
  (0, _validateAndCoerceTypes.default)({
    source: moduleName,
    type: "options",
    object: (_a = queryOpts.overrides) !== null && _a !== void 0 ? _a : {},
    schemaKey: queryOpts.schemaKey,
    options: this._opts.validation
  });
  let queryOptions = {
    ...queryOpts.defaults,
    ...queryOpts.runtime,
    ...queryOpts.overrides // User supplied options that override above
  };
  /*
   * Called with the merged (defaults,runtime,overrides) before running
   * the query.  Useful to transform options we allow but not Yahoo, e.g.
   * allow a "2020-01-01" date but transform this to a UNIX epoch.
   */
  if (queryOpts.transformWith) queryOptions = queryOpts.transformWith(queryOptions);
  // this._fetch is lib/yahooFinanceFetch
  let result = await this._fetch(queryOpts.url, queryOptions, moduleOpts, queryOpts.fetchType, queryOpts.needsCrumb);
  if (queryOpts.fetchType === "csv") result = (0, _csv2json.default)(result);
  /*
   * Mutate the Yahoo result *before* validating and coercion.  Mostly used
   * to e.g. throw if no (resault.returnField) and return result.returnField.
   */
  if (opts.result.transformWith) result = opts.result.transformWith(result);
  const validateResult = !moduleOpts || moduleOpts.validateResult === undefined || moduleOpts.validateResult === true;
  const validationOpts = {
    ...this._opts.validation,
    // Set logErrors=false if validateResult=false
    logErrors: validateResult ? this._opts.validation.logErrors : false
  };
  /*
   * Validate the returned result (after transforming, above) and coerce types.
   *
   * The coersion works as follows: if we're expecting a "Date" type, but Yahoo
   * gives us { raw: 1231421524, fmt: "2020-01-01" }, we'll return that as
   * `new Date(1231421524 * 1000)`.
   *
   * Beyond that, ensures that user won't process unexpected data, in two
   * cases:
   *
   * a) Missing required properties or unexpected additional properties
   * b) A total new change in format that we really have no idea what to do
   *    with, e.g. a new kind of Date that we've never seen before and
   *
   * The idea is that if you receive a result, it's safe to use / store in
   * database, etc.  Otherwise you'll receive an error.
   */
  try {
    (0, _validateAndCoerceTypes.default)({
      source: moduleName,
      type: "result",
      object: result,
      schemaKey: resultOpts.schemaKey,
      options: validationOpts
    });
  } catch (error) {
    if (validateResult) throw error;
  }
  return result;
}
var _default = exports.default = moduleExec;

},{"./csv2json.js":119,"./validateAndCoerceTypes.js":126}],123:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cookieJar = require("./cookieJar.js");
const options = {
  YF_QUERY_HOST: process.env.YF_QUERY_HOST || "query2.finance.yahoo.com",
  cookieJar: new _cookieJar.ExtendedCookieJar(),
  queue: {
    concurrency: 4,
    timeout: 60
  },
  validation: {
    logErrors: true,
    logOptionsErrors: true
  },
  logger: {
    info: (...args) => console.log(...args),
    warn: (...args) => console.error(...args),
    error: (...args) => console.error(...args),
    debug: (...args) => console.log(...args)
  }
};
var _default = exports.default = options;

}).call(this)}).call(this,require('_process'))
},{"./cookieJar.js":118,"_process":89}],124:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Queue {
  constructor(opts = {}) {
    this.concurrency = 1;
    this._running = 0;
    this._queue = [];
    if (opts.concurrency) this.concurrency = opts.concurrency;
  }
  runNext() {
    const job = this._queue.shift();
    if (!job) return;
    this._running++;
    job.func().then(result => job.resolve(result)).catch(error => job.reject(error)).finally(() => {
      this._running--;
      this.checkQueue();
    });
  }
  checkQueue() {
    if (this._running < this.concurrency) this.runNext();
  }
  add(func) {
    return new Promise((resolve, reject) => {
      this._queue.push({
        func,
        resolve,
        reject
      });
      this.checkQueue();
    });
  }
}
exports.default = Queue;

},{}],125:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setGlobalConfig;
var _validateAndCoerceTypes = _interopRequireDefault(require("./validateAndCoerceTypes.js"));
var _cookieJar = require("./cookieJar.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function setGlobalConfig(_config) {
  // Instances (e.g. cookieJar) don't validate well :)
  const {
    cookieJar,
    logger,
    ...config
  } = _config;
  (0, _validateAndCoerceTypes.default)({
    object: config,
    source: "setGlobalConfig",
    type: "options",
    options: this._opts.validation,
    schemaKey: "#/definitions/YahooFinanceOptions"
  });
  mergeObjects(this._opts, config);
  if (cookieJar) {
    if (!(cookieJar instanceof _cookieJar.ExtendedCookieJar)) throw new Error("cookieJar must be an instance of ExtendedCookieJar");
    this._opts.cookieJar = cookieJar;
  }
  if (logger) {
    if (typeof logger.info !== "function") throw new Error("logger.info must be a function");
    if (typeof logger.warn !== "function") throw new Error("logger.warn must be a function");
    if (typeof logger.error !== "function") throw new Error("logger.error must be a function");
    if (typeof logger.debug !== "function") throw new Error("logger.debug must be a function");
    this._opts.logger = logger;
  }
}
function mergeObjects(original, objToMerge) {
  const ownKeys = Reflect.ownKeys(objToMerge);
  for (const key of ownKeys) {
    if (typeof objToMerge[key] === "object") {
      mergeObjects(original[key], objToMerge[key]);
    } else {
      original[key] = objToMerge[key];
    }
  }
}

},{"./cookieJar.js":118,"./validateAndCoerceTypes.js":126}],126:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ajv = void 0;
exports.disallowAdditionalProps = disallowAdditionalProps;
exports.resolvePath = resolvePath;
var _ajv = _interopRequireDefault(require("ajv"));
var _ajvFormats = _interopRequireDefault(require("ajv-formats"));
var _schemaJson = _interopRequireDefault(require("../../schema.json.js"));
var _packageJson = _interopRequireDefault(require("../../package.json.js"));
var _errors = require("./errors.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _a;

//import schema from '../../schema.json';

// https://ajv.js.org/docs/api.html#options
const ajv = exports.ajv = new _ajv.default({
  // All rules, all errors.  Don't end early after first error.
  allErrors: true,
  // Allow multiple non-null types, like in TypeSript.
  allowUnionTypes: true
});
(0, _ajvFormats.default)(ajv);
ajv.addKeyword({
  keyword: "yahooFinanceType",
  modifying: true,
  errors: true,
  schema: true,
  compile(schema /*, parentSchema, it */) {
    const validate = (data, dataCtx) => {
      const {
        parentData,
        parentDataProperty
      } = dataCtx;
      function set(value) {
        parentData[parentDataProperty] = value;
        return true;
      }
      if (schema === "number" || schema === "number|null") {
        if (typeof data === "number") return true;
        if (typeof data === "string") {
          let float = Number.parseFloat(data);
          if (Number.isNaN(float)) {
            validate.errors = validate.errors || [];
            validate.errors.push({
              keyword: "yahooFinanceType",
              message: "Number.parseFloat returned NaN",
              params: {
                schema,
                data
              }
            });
            return false;
          }
          return set(float);
        }
        if (data === null) {
          if (schema === "number|null") {
            return true;
          } else {
            validate.errors = validate.errors || [];
            validate.errors.push({
              keyword: "yahooFinanceType",
              message: "Expecting number'ish but got null",
              params: {
                schema,
                data
              }
            });
            return false;
          }
        }
        if (typeof data === "object") {
          if (Object.keys(data).length === 0) {
            // Value of {} becomes null
            // Note, TypeScript types should be "number | null"
            if (schema === "number|null") {
              return set(null);
            } else {
              validate.errors = validate.errors || [];
              validate.errors.push({
                keyword: "yahooFinanceType",
                message: "Got {}->null for 'number', did you want 'number | null' ?",
                params: {
                  schema,
                  data
                }
              });
              return false;
            }
          }
          if (typeof data.raw === "number") return set(data.raw);
        }
      } else if (schema === "date" || schema === "date|null") {
        if (data instanceof Date) {
          // Validate existing date objects.
          // Generally we receive JSON but in the case of "historical", the
          // csv parser does the date conversion, and we want to validate
          // afterwards.
          return true;
        }
        if (typeof data === "number") return set(new Date(data * 1000));
        if (data === null) {
          if (schema === "date|null") {
            return true;
          } else {
            validate.errors = validate.errors || [];
            validate.errors.push({
              keyword: "yahooFinanceType",
              message: "Expecting date'ish but got null",
              params: {
                schema,
                data
              }
            });
            return false;
          }
        }
        if (typeof data === "object") {
          if (Object.keys(data).length === 0) {
            // Value of {} becomes null
            // Note, TypeScript types should be "data | null"
            if (schema === "date|null") {
              return set(null);
            } else {
              validate.errors = validate.errors || [];
              validate.errors.push({
                keyword: "yahooFinanceType",
                message: "Got {}->null for 'date', did you want 'date | null' ?",
                params: {
                  schema,
                  data
                }
              });
              return false;
            }
          }
          if (typeof data.raw === "number") return set(new Date(data.raw * 1000));
        }
        if (typeof data === "string") {
          if (data.match(/^\d{4,4}-\d{2,2}-\d{2,2}$/) || data.match(/^\d{4,4}-\d{2,2}-\d{2,2}T\d{2,2}:\d{2,2}:\d{2,2}(\.\d{3,3})?Z$/)) return set(new Date(data));
        }
      } else if (schema === "DateInMs") {
        return set(new Date(data));
      } else if (schema === "TwoNumberRange") {
        if (typeof data === "object" && typeof data.low === "number" && typeof data.high === "number") return true;
        if (typeof data === "string") {
          const parts = data.split("-").map(parseFloat);
          if (Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
            validate.errors = validate.errors || [];
            validate.errors.push({
              keyword: "yahooFinanceType",
              message: "Number.parseFloat returned NaN: [" + parts.join(",") + "]",
              params: {
                schema,
                data
              }
            });
            return false;
          }
          return set({
            low: parts[0],
            high: parts[1]
          });
        }
      } else {
        throw new Error("No such yahooFinanceType: " + schema);
      }
      validate.errors = validate.errors || [];
      validate.errors.push({
        keyword: "yahooFinanceType",
        message: "No matching type",
        params: {
          schema,
          data
        }
      });
      return false;
    };
    return validate;
  }
});
ajv.addSchema(_schemaJson.default);
/* istanbul ignore next */
const logObj = typeof process !== "undefined" && ((_a = process === null || process === void 0 ? void 0 : process.stdout) === null || _a === void 0 ? void 0 : _a.isTTY) ? obj => console.dir(obj, {
  depth: 4,
  colors: true
}) : obj => console.log(JSON.stringify(obj, null, 2));
function resolvePath(obj, instancePath) {
  const path = instancePath.split("/");
  let ref = obj;
  for (let i = 1; i < path.length; i++) ref = ref[path[i]];
  return ref;
}
function disallowAdditionalProps(show = false) {
  const disallowed = new Set();
  // @ts-ignore: this can cause a breaking catch-22 on schema generation
  for (let key of Object.keys(_schemaJson.default.definitions)) {
    if (key.match(/Options$/)) {
      continue;
    }
    // @ts-ignore
    const def = _schemaJson.default.definitions[key];
    if (def.type === "object" && def.additionalProperties === undefined) {
      def.additionalProperties = false;
      disallowed.add(key);
    }
  }
  /* istanbul ignore next */
  if (show) console.log("Disallowed additional props in " + Array.from(disallowed).join(", "));
}
if (process.env.NODE_ENV === "test") disallowAdditionalProps();
function validate({
  source,
  type,
  object,
  schemaKey,
  options
}) {
  const validator = ajv.getSchema(schemaKey);
  if (!validator) throw new Error("No such schema with key: " + schemaKey);
  const valid = validator(object);
  if (valid) return;
  if (type === "result") {
    /* istanbul ignore else */
    if (validator.errors) {
      let origData = false;
      validator.errors.forEach(error => {
        // For now let's ignore the base object which could be huge.
        /* istanbul ignore else */
        if (error.instancePath !== "")
          // Note, not the regular ajv data value from verbose:true
          error.data = resolvePath(object, error.instancePath);
        if (error.schemaPath === "#/anyOf") {
          if (origData === false) {
            origData = error.data;
          } else if (origData === error.data) {
            error.data = "[shortened by validateAndCoerceTypes]";
          }
        }
      });
      // Becaue of the "anyOf" in quote, errors are huuuuge and mostly
      // irrelevant... so let's filter out (some of) the latter
      validator.errors = validator.errors.filter(error => {
        var _a, _b;
        if (error.schemaPath.startsWith("#/definitions/Quote")) {
          const schemaQuoteType = error.schemaPath.substring(19).split("/")[0].toUpperCase();
          /*
           * Filter out entries for non-matching schema type, i.e.
           * {
           *   schemaPath: '#/definitions/QuoteCryptoCurrency/properties...'
           *   data: {
           *     quoteType: "EQUITY"
           *   }
           * }
           */
          if (typeof error.data === "object" &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: Properrty "quoteType" does not exist on type "object"
          ((_a = error.data) === null || _a === void 0 ? void 0 : _a.quoteType) !== schemaQuoteType) return false;
          /*
           * Filter out the non-matching "const" for the above.
           * {
           *   schemaPath: '#/definitions/QuoteCryptoCurrency/properties/quoteType/const'
           *   keyword: "const",
           *   params: { allowedValue: "CRYPTOCURRENCY"}},
           *   data: "EQUITY"
           * }
           */
          if (typeof error.data === "string" && ((_b = error.params) === null || _b === void 0 ? void 0 : _b.allowedValue) === schemaQuoteType) return false;
        }
        return true;
      });
      // In the case of there being NO match in #anyOf, bring back the data
      if (validator.errors.length === 1 && validator.errors[0].schemaPath === "#/anyOf") validator.errors[0].data = origData;
    }
    if (options.logErrors === true) {
      const title = encodeURIComponent("Failed validation: " + schemaKey);
      console.log("The following result did not validate with schema: " + schemaKey);
      logObj(validator.errors);
      // logObj(object);
      console.log(`
This may happen intermittently and you should catch errors appropriately.
However:  1) if this recently started happening on every request for a symbol
that used to work, Yahoo may have changed their API.  2) If this happens on
every request for a symbol you've never used before, but not for other
symbols, you've found an edge-case (OR, we may just be protecting you from
"bad" data sometimes stored for e.g. misspelt symbols on Yahoo's side).
Please see if anyone has reported this previously:

  ${_packageJson.default.repository}/issues?q=is%3Aissue+${title}

or open a new issue (and mention the symbol):  ${_packageJson.default.name} v${_packageJson.default.version}

  ${_packageJson.default.repository}/issues/new?labels=bug%2C+validation&template=validation.md&title=${title}

For information on how to turn off the above logging or skip these errors,
see https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs/validation.md.

At the end of the doc, there's also a section on how to
[Help Fix Validation Errors](https://github.com/gadicc/node-yahoo-finance2/blob/devel/docs/validation.md#help-fix)
in case you'd like to contribute to the project.  Most of the time, these
fixes are very quick and easy; it's just hard for our small core team to keep up,
so help is always appreciated!
`);
    } /* if (logErrors) */
    throw new _errors.FailedYahooValidationError("Failed Yahoo Schema validation", {
      result: object,
      errors: validator.errors
    });
  } /* if (type === 'options') */else {
    if (options.logOptionsErrors === true) {
      console.error(`[yahooFinance.${source}] Invalid options ("${schemaKey}")`);
      logObj({
        errors: validator.errors,
        input: object
      });
    }
    throw new _errors.InvalidOptionsError(`yahooFinance.${source} called with invalid options.`);
  }
}
var _default = exports.default = validate;

}).call(this)}).call(this,require('_process'))
},{"../../package.json.js":113,"../../schema.json.js":114,"./errors.js":120,"_process":89,"ajv":4,"ajv-formats":2}],127:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.substituteVariables = substituteVariables;
var _queue2 = _interopRequireDefault(require("./queue.js"));
var _errors = _interopRequireDefault(require("./errors.js"));
var _packageJson = _interopRequireDefault(require("../../package.json.js"));
var _getCrumb = _interopRequireDefault(require("./getCrumb.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userAgent = `${_packageJson.default.name}/${_packageJson.default.version} (+${_packageJson.default.repository})`;
const _queue = new _queue2.default();
function assertQueueOptions(queue, opts) {
  opts; //?
  if (typeof opts.concurrency === "number" && queue.concurrency !== opts.concurrency) queue.concurrency = opts.concurrency;
  if (typeof opts.timeout === "number" && queue.timeout !== opts.timeout) queue.timeout = opts.timeout;
}
function substituteVariables(urlBase) {
  return urlBase.replace(/\$\{([^}]+)\}/g, (match, varName) => {
    if (varName === "YF_QUERY_HOST") {
      // const hosts = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"];
      // return hosts[Math.floor(Math.random() * hosts.length)];
      return this._opts.YF_QUERY_HOST || "query2.finance.yahoo.com";
    } else {
      // i.e. return unsubstituted original variable expression ${VAR}
      return match;
    }
  });
}
async function yahooFinanceFetch(urlBase, params = {}, moduleOpts = {}, func = "json", needsCrumb = false) {
  var _a;
  if (!(this && this._env)) throw new _errors.default.NoEnvironmentError("yahooFinanceFetch called without this._env set");
  // TODO: adds func type to json schema which is not supported
  //const queue = moduleOpts.queue?._queue || _queue;
  const queue = _queue;
  assertQueueOptions(queue, {
    ...this._opts.queue,
    ...moduleOpts.queue
  });
  const {
    URLSearchParams,
    fetch,
    fetchDevel
  } = this._env;
  /* istanbul ignore next */
  // no need to force coverage on real network request.
  const fetchFunc = moduleOpts.devel ? await fetchDevel() : fetch;
  const fetchOptionsBase = {
    ...moduleOpts.fetchOptions,
    devel: moduleOpts.devel,
    headers: {
      "User-Agent": userAgent,
      ...((_a = moduleOpts.fetchOptions) === null || _a === void 0 ? void 0 : _a.headers)
    }
  };
  if (needsCrumb) {
    if (!this._opts.cookieJar) throw new Error("No cookieJar set");
    if (!this._opts.logger) throw new Error("Logger was unset.");
    const crumb = await (0, _getCrumb.default)(this._opts.cookieJar, fetchFunc, fetchOptionsBase, this._opts.logger);
    if (crumb) params.crumb = crumb;
  }
  // @ts-expect-error: TODO copy interface? @types lib?
  const urlSearchParams = new URLSearchParams(params);
  const url = substituteVariables.call(this, urlBase) + "?" + urlSearchParams.toString();
  // console.log(url);
  // console.log(cookieJar.serializeSync());
  if (!this._opts.cookieJar) throw new Error("No cookieJar set");
  const fetchOptions = {
    ...fetchOptionsBase,
    headers: {
      ...fetchOptionsBase.headers,
      cookie: await this._opts.cookieJar.getCookieString(url, {
        allPaths: true
      })
    }
  };
  // console.log("fetch", url, fetchOptions);
  // used in moduleExec.ts
  if (func === "csv") func = "text";
  const response = await queue.add(() => fetchFunc(url, fetchOptions));
  const setCookieHeaders = response.headers.raw()["set-cookie"];
  if (setCookieHeaders) {
    if (!this._opts.cookieJar) throw new Error("No cookieJar set");
    this._opts.cookieJar.setFromSetCookieHeaders(setCookieHeaders, url);
  }
  const result = await response[func]();
  /*
    {
      finance: {  // or quoteSummary, or any other single key
        result: null,
        error: {
          code: 'Bad Request',
          description: 'Missing required query parameter=q'
        }
      }
    }
   */
  if (func === "json") {
    const keys = Object.keys(result);
    if (keys.length === 1) {
      const errorObj = result[keys[0]].error;
      if (errorObj) {
        const errorName = errorObj.code.replace(/ /g, "") + "Error";
        const ErrorClass = _errors.default[errorName] || Error;
        throw new ErrorClass(errorObj.description);
      }
    }
  }
  // We do this last as it generally contains less information (e.g. no desc).
  if (!response.ok) {
    console.error(url);
    const error = new _errors.default.HTTPError(response.statusText);
    error.code = response.status;
    throw error;
  }
  return result;
}
var _default = exports.default = yahooFinanceFetch;

},{"../../package.json.js":113,"./errors.js":120,"./getCrumb.js":121,"./queue.js":124}],128:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoc;
async function autoc() {
  throw new Error("Yahoo decomissioned their autoc server sometime before 20 Nov 2021 " + "(see https://github.com/gadicc/node-yahoo-finance2/issues/337])). " + "Use `search` instead (just like they do).");
}

},{}],129:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._chart = void 0;
exports.default = chart;
// Co-authored by @gadicc, @PythonCreator27 and @huned.
const queryOptionsDefaults = {
  useYfid: true,
  interval: "1d",
  includePrePost: true,
  events: "div|split|earn",
  lang: "en-US",
  return: "array"
};
/* --- array input, typed output, honor "return" param --- */
// TODO: make this a deprecration passthrough
const _chart = exports._chart = chart;
async function chart(symbol, queryOptionsOverrides, moduleOptions) {
  var _a, _b, _c;
  const returnAs = (queryOptionsOverrides === null || queryOptionsOverrides === void 0 ? void 0 : queryOptionsOverrides.return) || "array";
  const result = await this._moduleExec({
    moduleName: "chart",
    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v8/finance/chart/" + symbol,
      schemaKey: "#/definitions/ChartOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions) {
        if (!queryOptions.period2) queryOptions.period2 = new Date();
        const dates = ["period1", "period2"];
        for (const fieldName of dates) {
          const value = queryOptions[fieldName];
          if (value instanceof Date) queryOptions[fieldName] = Math.floor(value.getTime() / 1000);else typeof value === "string";
          queryOptions[fieldName] = Math.floor(new Date(value).getTime() / 1000);
        }
        if (queryOptions.period1 === queryOptions.period2) {
          throw new Error("yahooFinance.chart() options `period1` and `period2` " + "cannot share the same value.");
        }
        // Don't pass this on to Yahoo
        delete queryOptions.return;
        return queryOptions;
      }
    },
    result: {
      schemaKey: "#/definitions/ChartResultObject",
      transformWith(result) {
        if (!result.chart) throw new Error("Unexpected result: " + JSON.stringify(result));
        const chart = result.chart.result[0];
        // If there are no quotes, chart.timestamp will be empty, but Yahoo also
        // gives us chart.indicators.quotes = [{}].  Let's clean that up and
        // deliver an empty array rather than an invalid ChartIndicatorQuote/
        if (!chart.timestamp) {
          if (chart.indicators.quote.length !== 1) throw new Error("No timestamp with quotes.length !== 1, please report with your query");
          if (Object.keys(chart.indicators.quote[0]).length !== 0)
            // i.e. {}
            throw new Error("No timestamp with unexpected quote, please report with your query" + JSON.stringify(chart.indicators.quote[0]));
          chart.indicators.quote.pop();
        }
        return chart;
      }
    },
    moduleOptions
  });
  if (returnAs === "object") {
    return result;
  } else if (returnAs === "array") {
    const timestamp = result.timestamp;
    /*
    seems as though yahoo inserts extra quotes at the event times, so no need.
    if (result.events) {
      for (let event of ["dividends", "splits"]) {
        // @ts-ignore
        if (result.events[event])
          // @ts-ignore
          timestamp = timestamp.filter((ts) => !result.events[event][ts]);
      }
    }
    */
    // istanbul ignore next
    if (timestamp && ((_a = result === null || result === void 0 ? void 0 : result.indicators) === null || _a === void 0 ? void 0 : _a.quote) && result.indicators.quote[0].high.length !== timestamp.length) {
      console.log({
        origTimestampSize: result.timestamp && result.timestamp.length,
        filteredSize: timestamp.length,
        quoteSize: result.indicators.quote[0].high.length
      });
      throw new Error("Timestamp count mismatch, please report this with the query you used");
    }
    const result2 = {
      meta: result.meta,
      quotes: timestamp ? new Array(timestamp.length) : []
    };
    const adjclose = (_c = (_b = result === null || result === void 0 ? void 0 : result.indicators) === null || _b === void 0 ? void 0 : _b.adjclose) === null || _c === void 0 ? void 0 : _c[0].adjclose;
    if (timestamp) for (let i = 0; i < timestamp.length; i++) {
      result2.quotes[i] = {
        date: new Date(timestamp[i] * 1000),
        high: result.indicators.quote[0].high[i],
        volume: result.indicators.quote[0].volume[i],
        open: result.indicators.quote[0].open[i],
        low: result.indicators.quote[0].low[i],
        close: result.indicators.quote[0].close[i]
      };
      if (adjclose) result2.quotes[i].adjclose = adjclose[i];
    }
    if (result.events) {
      result2.events = {};
      for (const event of ["dividends", "splits"]) {
        if (result.events[event]) result2.events[event] = Object.values(result.events[event]);
      }
    }
    return result2;
  }
  // TypeScript runtime validation ensures no other values for
  // "returnAs" are possible.
}

},{}],130:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dailyGainers;
const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  scrIds: "day_gainers",
  count: 5
};
function dailyGainers(queryOptionsOverrides, moduleOptions) {
  return this._moduleExec({
    moduleName: "dailyGainers",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/screener/predefined/saved",
      schemaKey: "#/definitions/DailyGainersOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      needsCrumb: true
    },
    result: {
      schemaKey: "#/definitions/DailyGainersResult",
      transformWith(result) {
        // console.log(result);
        if (!result.finance) throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result[0];
      }
    },
    moduleOptions
  });
}

},{}],131:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = historical;
const queryOptionsDefaults = {
  interval: "1d",
  events: "history",
  includeAdjustedClose: true
};
function historical(symbol, queryOptionsOverrides, moduleOptions) {
  let schemaKey;
  if (!queryOptionsOverrides.events || queryOptionsOverrides.events === "history") schemaKey = "#/definitions/HistoricalHistoryResult";else if (queryOptionsOverrides.events === "dividends") schemaKey = "#/definitions/HistoricalDividendsResult";else if (queryOptionsOverrides.events === "split") schemaKey = "#/definitions/HistoricalStockSplitsResult";else throw new Error("No such event type:" + queryOptionsOverrides.events);
  return this._moduleExec({
    moduleName: "historical",
    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v7/finance/download/" + symbol,
      schemaKey: "#/definitions/HistoricalOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      fetchType: "csv",
      transformWith(queryOptions) {
        if (!queryOptions.period2) queryOptions.period2 = new Date();
        const dates = ["period1", "period2"];
        for (const fieldName of dates) {
          const value = queryOptions[fieldName];
          if (value instanceof Date) queryOptions[fieldName] = Math.floor(value.getTime() / 1000);else if (typeof value === "string") {
            const timestamp = new Date(value).getTime();
            if (isNaN(timestamp)) throw new Error("yahooFinance.historical() option '" + fieldName + "' invalid date provided: '" + value + "'");
            queryOptions[fieldName] = Math.floor(timestamp / 1000);
          }
        }
        if (queryOptions.period1 === queryOptions.period2) {
          throw new Error("yahooFinance.historical() options `period1` and `period2` " + "cannot share the same value.");
        }
        return queryOptions;
      }
    },
    result: {
      schemaKey,
      transformWith(result) {
        if (result.length === 0) return result;
        const filteredResults = [];
        const fieldCount = Object.keys(result[0]).length;
        // Count number of null values in object (1-level deep)
        function nullFieldCount(object) {
          let nullCount = 0;
          for (const val of Object.values(object)) if (val === null) nullCount++;
          return nullCount;
        }
        for (const row of result) {
          const nullCount = nullFieldCount(row);
          if (nullCount === 0) {
            // No nulls is a legit (regular) result
            filteredResults.push(row);
          } else if (nullCount !== fieldCount - 1 /* skip "date" */) {
            // Unhandled case: some but not all values are null.
            // Note: no need to check for null "date", validation does it for us
            console.error(nullCount, row);
            throw new Error("Historical returned a result with SOME (but not " + "all) null values.  Please report this, and provide the " + "query that caused it.");
          } else {
            // All fields (except "date") are null: silently skip (no-op)
          }
        }
        /*
         * We may consider, for future optimization, to count rows and create
         * new array in advance, and skip consecutive blocks of null results.
         * Of doubtful utility.
         */
        return filteredResults;
      }
    },
    moduleOptions
  });
}

},{}],132:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trendingSymbols;
const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  getAllResearchReports: true,
  reportsCount: 2
};
function trendingSymbols(symbol, queryOptionsOverrides, moduleOptions) {
  return this._moduleExec({
    moduleName: "insights",
    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/ws/insights/v2/finance/insights",
      schemaKey: "#/definitions/InsightsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      runtime: {
        symbol
      }
    },
    result: {
      schemaKey: "#/definitions/InsightsResult",
      transformWith(result) {
        if (!result.finance) throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result;
      }
    },
    moduleOptions
  });
}

},{}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = options;
const queryOptionsDefaults = {
  formatted: false,
  lang: "en-US",
  region: "US"
};
function options(symbol, queryOptionsOverrides, moduleOptions) {
  return this._moduleExec({
    moduleName: "options",
    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v7/finance/options/" + symbol,
      schemaKey: "#/definitions/OptionsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(queryOptions) {
        const date = queryOptions.date;
        if (date) {
          // yfDate will convert valid number/string to Date.
          if (date instanceof Date) {
            // now we convert back to unix epoch in seconds for query
            queryOptions.date = Math.floor(date.getTime() / 1000);
          } else {
            // yfDate didn't recognize it as a date.
            throw new Error("Unsupported date type: " + date);
          }
        }
        return queryOptions;
      }
    },
    result: {
      schemaKey: "#/definitions/OptionsResult",
      transformWith(result) {
        if (!result.optionChain) throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.optionChain.result[0];
      }
    },
    moduleOptions
  });
}

},{}],134:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quote;
const queryOptionsDefaults = {};
async function quote(query, queryOptionsOverrides, moduleOptions) {
  const symbols = typeof query === "string" ? query : query.join(",");
  const returnAs = queryOptionsOverrides && queryOptionsOverrides.return;
  const results = await this._moduleExec({
    moduleName: "quote",
    query: {
      url: "https://${YF_QUERY_HOST}/v7/finance/quote",
      needsCrumb: true,
      schemaKey: "#/definitions/QuoteOptions",
      defaults: queryOptionsDefaults,
      runtime: {
        symbols
      },
      overrides: queryOptionsOverrides,
      transformWith(queryOptions) {
        // Options validation ensures this is a string[]
        if (queryOptions.fields) queryOptions.fields.join(",");
        // Don't pass this on to Yahoo
        delete queryOptions.return;
        return queryOptions;
      }
    },
    result: {
      schemaKey: "#/definitions/QuoteResponseArray",
      transformWith(rawResult) {
        var _a;
        let results = (_a = rawResult === null || rawResult === void 0 ? void 0 : rawResult.quoteResponse) === null || _a === void 0 ? void 0 : _a.result;
        if (!results || !Array.isArray(results)) throw new Error("Unexpected result: " + JSON.stringify(rawResult));
        // Filter out quoteType==='NONE'
        // So that delisted stocks will be undefined just like symbol-not-found
        results = results.filter(quote => (quote === null || quote === void 0 ? void 0 : quote.quoteType) !== "NONE");
        return results;
      }
    },
    moduleOptions
  });
  if (returnAs) {
    switch (returnAs) {
      case "array":
        return results;
      case "object":
        const object = {};
        for (let result of results) object[result.symbol] = result;
        return object;
      // TODO: type
      case "map":
        const map = new Map();
        for (let result of results) map.set(result.symbol, result);
        return map;
      // TODO: type
    }
  } else {
    // By default, match the query input shape (string or string[]).
    return typeof query === "string" ? results[0] : results;
  }
}

},{}],135:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quoteSummary;
exports.quoteSummary_modules = void 0;
const quoteSummary_modules = exports.quoteSummary_modules = ["assetProfile", "balanceSheetHistory", "balanceSheetHistoryQuarterly", "calendarEvents", "cashflowStatementHistory", "cashflowStatementHistoryQuarterly", "defaultKeyStatistics", "earnings", "earningsHistory", "earningsTrend", "financialData", "fundOwnership", "fundPerformance", "fundProfile", "incomeStatementHistory", "incomeStatementHistoryQuarterly", "indexTrend", "industryTrend", "insiderHolders", "insiderTransactions", "institutionOwnership", "majorDirectHolders", "majorHoldersBreakdown", "netSharePurchaseActivity", "price", "quoteType", "recommendationTrend", "secFilings", "sectorTrend", "summaryDetail", "summaryProfile", "topHoldings", "upgradeDowngradeHistory"];
const queryOptionsDefaults = {
  formatted: false,
  modules: ["price", "summaryDetail"]
};
function quoteSummary(symbol, queryOptionsOverrides, moduleOptions) {
  return this._moduleExec({
    moduleName: "search",
    query: {
      assertSymbol: symbol,
      url: "https://${YF_QUERY_HOST}/v10/finance/quoteSummary/" + symbol,
      needsCrumb: true,
      schemaKey: "#/definitions/QuoteSummaryOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      transformWith(options) {
        if (options.modules === "all") options.modules = quoteSummary_modules;
        return options;
      }
    },
    result: {
      schemaKey: "#/definitions/QuoteSummaryResult",
      transformWith(result) {
        if (!result.quoteSummary) throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.quoteSummary.result[0];
      }
    },
    moduleOptions
  });
}

},{}],136:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = recommendationsBySymbol;
const queryOptionsDefaults = {};
function recommendationsBySymbol(query, queryOptionsOverrides, moduleOptions) {
  const symbols = typeof query === "string" ? query : query.join(",");
  return this._moduleExec({
    moduleName: "recommendationsBySymbol",
    query: {
      url: "https://${YF_QUERY_HOST}/v6/finance/recommendationsbysymbol/" + symbols,
      schemaKey: "#/definitions/RecommendationsBySymbolOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides
    },
    result: {
      schemaKey: "#/definitions/RecommendationsBySymbolResponseArray",
      transformWith(result) {
        if (!result.finance) throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result;
      }
    },
    moduleOptions
  }).then(results => {
    return typeof query === "string" ? results[0] : results;
  });
}

},{}],137:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = screener;
const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  scrIds: "day_gainers",
  count: 5
};
function screener(queryOptionsOverrides, moduleOptions) {
  return this._moduleExec({
    moduleName: "screener",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/screener/predefined/saved",
      schemaKey: "#/definitions/ScreenerOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides,
      needsCrumb: true
    },
    result: {
      schemaKey: "#/definitions/ScreenerResult",
      transformWith(result) {
        // console.log(result);
        if (!result.finance) throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result[0];
      }
    },
    moduleOptions
  });
}
// aggressive_small_caps
// conservative_foreign_funds
// day_gainers
// day_losers
// growth_technology_stocks
// high_yield_bond
// most_actives
// most_shorted_stocks
// portfolio_anchors
// small_cap_gainers
// solid_large_growth_funds
// solid_midcap_growth_funds
// top_mutual_funds
// undervalued_growth_stocks
// undervalued_large_caps

},{}],138:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = search;
const queryOptionsDefaults = {
  lang: "en-US",
  region: "US",
  quotesCount: 6,
  newsCount: 4,
  enableFuzzyQuery: false,
  quotesQueryId: "tss_match_phrase_query",
  multiQuoteQueryId: "multi_quote_single_token_query",
  newsQueryId: "news_cie_vespa",
  enableCb: true,
  enableNavLinks: true,
  enableEnhancedTrivialQuery: true
};
function search(query, queryOptionsOverrides, moduleOptions) {
  return this._moduleExec({
    moduleName: "search",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/search",
      schemaKey: "#/definitions/SearchOptions",
      defaults: queryOptionsDefaults,
      runtime: {
        q: query
      },
      overrides: queryOptionsOverrides
    },
    result: {
      schemaKey: "#/definitions/SearchResult"
    },
    moduleOptions
  });
}

},{}],139:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trendingSymbols;
const queryOptionsDefaults = {
  lang: "en-US",
  count: 5
};
function trendingSymbols(query, queryOptionsOverrides, moduleOptions) {
  return this._moduleExec({
    moduleName: "trendingSymbols",
    query: {
      url: "https://${YF_QUERY_HOST}/v1/finance/trending/" + query,
      schemaKey: "#/definitions/TrendingSymbolsOptions",
      defaults: queryOptionsDefaults,
      overrides: queryOptionsOverrides
    },
    result: {
      schemaKey: "#/definitions/TrendingSymbolsResult",
      transformWith(result) {
        if (!result.finance) throw new Error("Unexpected result: " + JSON.stringify(result));
        return result.finance.result[0];
      }
    },
    moduleOptions
  });
}

},{}],140:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quoteCombine;
var _quote = _interopRequireDefault(require("../modules/quote.js"));
var _validateAndCoerceTypes = _interopRequireDefault(require("../lib/validateAndCoerceTypes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEBOUNCE_TIME = 50;
const slugMap = new Map();
function quoteCombine(query, queryOptionsOverrides = {}, moduleOptions) {
  const symbol = query;
  if (typeof symbol !== "string") throw new Error("quoteCombine expects a string query parameter, received: " + JSON.stringify(symbol, null, 2));
  (0, _validateAndCoerceTypes.default)({
    source: "quoteCombine",
    type: "options",
    object: queryOptionsOverrides,
    schemaKey: "#/definitions/QuoteOptions",
    options: this._opts.validation
  });
  // Make sure we only combine requests with same options
  const slug = JSON.stringify(queryOptionsOverrides);
  let entry = slugMap.get(slug);
  if (!entry) {
    entry = {
      timeout: null,
      queryOptionsOverrides,
      symbols: new Map()
    };
    slugMap.set(slug, entry);
  }
  if (entry.timeout) clearTimeout(entry.timeout);
  const thisQuote = _quote.default.bind(this);
  return new Promise((resolve, reject) => {
    let symbolPromiseCallbacks = entry.symbols.get(symbol);
    /* istanbul ignore else */
    if (!symbolPromiseCallbacks) {
      symbolPromiseCallbacks = [];
      entry.symbols.set(symbol, symbolPromiseCallbacks);
    }
    symbolPromiseCallbacks.push({
      resolve,
      reject
    });
    entry.timeout = setTimeout(() => {
      slugMap.delete(slug);
      const symbols = Array.from(entry.symbols.keys());
      // @ts-ignore
      thisQuote(symbols, queryOptionsOverrides, moduleOptions).then(results => {
        for (let result of results) {
          for (let promise of entry.symbols.get(result.symbol)) {
            promise.resolve(result);
            promise.resolved = true;
          }
        }
        // Check for symbols we asked for and didn't get back,
        // e.g. non-existant symbols (#150)
        for (let [symbol, promises] of entry.symbols) {
          for (let promise of promises) {
            if (!promise.resolved) {
              promise.resolve(undefined);
            }
          }
        }
      }).catch(error => {
        for (let symbolPromiseCallbacks of entry.symbols.values()) for (let promise of symbolPromiseCallbacks) promise.reject(error);
      });
    }, DEBOUNCE_TIME);
  });
}

},{"../lib/validateAndCoerceTypes.js":126,"../modules/quote.js":134}],141:[function(require,module,exports){
const yahooFinance = require("yahoo-finance2"); 

let yf2 = async (stockTicker)=> {
    let response = await yahooFinance.quote(stockTicker).then((data) => {
        return data
    }).catch((e) => { console.log(e) });

    return response
}

module.exports = yf2
},{"yahoo-finance2":116}]},{},[141]);
