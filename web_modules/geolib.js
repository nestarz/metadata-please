import { c as createCommonjsModule, u as unwrapExports } from './common/_commonjsHelpers-b84bc510.js';

var constants = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.areaConversion=exports.timeConversion=exports.distanceConversion=exports.altitudeKeys=exports.latitudeKeys=exports.longitudeKeys=exports.MAXLON=exports.MINLON=exports.MAXLAT=exports.MINLAT=exports.earthRadius=exports.sexagesimalPattern=void 0;var sexagesimalPattern=/^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;exports.sexagesimalPattern=sexagesimalPattern;var earthRadius=6378137;exports.earthRadius=earthRadius;var MINLAT=-90;exports.MINLAT=MINLAT;var MAXLAT=90;exports.MAXLAT=MAXLAT;var MINLON=-180;exports.MINLON=MINLON;var MAXLON=180;exports.MAXLON=MAXLON;var longitudeKeys=["lng","lon","longitude",0];exports.longitudeKeys=longitudeKeys;var latitudeKeys=["lat","latitude",1];exports.latitudeKeys=latitudeKeys;var altitudeKeys=["alt","altitude","elevation","elev",2];exports.altitudeKeys=altitudeKeys;var distanceConversion={m:1,km:0.001,cm:100,mm:1000,mi:1/1609.344,sm:1/1852.216,ft:100/30.48,in:100/2.54,yd:1/0.9144};exports.distanceConversion=distanceConversion;var timeConversion={m:60,h:3600,d:86400};exports.timeConversion=timeConversion;var areaConversion={m2:1,km2:0.000001,ha:0.0001,a:0.01,ft2:10.763911,yd2:1.19599,in2:1550.0031};exports.areaConversion=areaConversion;areaConversion.sqm=areaConversion.m2;areaConversion.sqkm=areaConversion.km2;areaConversion.sqft=areaConversion.ft2;areaConversion.sqyd=areaConversion.yd2;areaConversion.sqin=areaConversion.in2;
});

unwrapExports(constants);
var constants_1 = constants.areaConversion;
var constants_2 = constants.timeConversion;
var constants_3 = constants.distanceConversion;
var constants_4 = constants.altitudeKeys;
var constants_5 = constants.latitudeKeys;
var constants_6 = constants.longitudeKeys;
var constants_7 = constants.MAXLON;
var constants_8 = constants.MINLON;
var constants_9 = constants.MAXLAT;
var constants_10 = constants.MINLAT;
var constants_11 = constants.earthRadius;
var constants_12 = constants.sexagesimalPattern;

var getCoordinateKey_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var getCoordinateKey=function getCoordinateKey(point,keysToLookup){return keysToLookup.reduce(function(foundKey,key){if(typeof point==="undefined"||point===null){throw new Error("'".concat(point,"' is no valid coordinate."))}if(point.hasOwnProperty(key)&&typeof key!=="undefined"&&typeof foundKey==="undefined"){foundKey=key;return key}return foundKey},undefined)};var _default=getCoordinateKey;exports.default=_default;
});

unwrapExports(getCoordinateKey_1);

var isDecimal_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var isDecimal=function isDecimal(value){var checkedValue=value.toString().trim();if(isNaN(parseFloat(checkedValue))){return false}return parseFloat(checkedValue)===Number(checkedValue)};var _default=isDecimal;exports.default=_default;
});

unwrapExports(isDecimal_1);

var isSexagesimal_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var isSexagesimal=function isSexagesimal(value){return constants.sexagesimalPattern.test(value.toString().trim())};var _default=isSexagesimal;exports.default=_default;
});

unwrapExports(isSexagesimal_1);

var sexagesimalToDecimal_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var sexagesimalToDecimal=function sexagesimalToDecimal(sexagesimal){var data=new RegExp(constants.sexagesimalPattern).exec(sexagesimal);if(typeof data==="undefined"||data===null){throw new Error("Given value is not in sexagesimal format")}var min=Number(data[2])/60||0;var sec=Number(data[4])/3600||0;var decimal=parseFloat(data[1])+min+sec;return ["S","W"].includes(data[7])?-decimal:decimal};var _default=sexagesimalToDecimal;exports.default=_default;
});

unwrapExports(sexagesimalToDecimal_1);

var getCoordinateKeys_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getCoordinateKey=_interopRequireDefault(getCoordinateKey_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}));}ownKeys.forEach(function(key){_defineProperty(target,key,source[key]);});}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj}var getCoordinateKeys=function getCoordinateKeys(point){var longitude=(0, _getCoordinateKey.default)(point,constants.longitudeKeys);var latitude=(0, _getCoordinateKey.default)(point,constants.latitudeKeys);var altitude=(0, _getCoordinateKey.default)(point,constants.altitudeKeys);return _objectSpread({latitude:latitude,longitude:longitude},altitude?{altitude:altitude}:{})};var _default=getCoordinateKeys;exports.default=_default;
});

unwrapExports(getCoordinateKeys_1);

var isValidLatitude_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _isDecimal=_interopRequireDefault(isDecimal_1);var _isSexagesimal=_interopRequireDefault(isSexagesimal_1);var _sexagesimalToDecimal=_interopRequireDefault(sexagesimalToDecimal_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var isValidLatitude=function isValidLatitude(value){if((0, _isDecimal.default)(value)){if(parseFloat(value)>constants.MAXLAT||value<constants.MINLAT){return false}return true}if((0, _isSexagesimal.default)(value)){return isValidLatitude((0, _sexagesimalToDecimal.default)(value))}return false};var _default=isValidLatitude;exports.default=_default;
});

unwrapExports(isValidLatitude_1);

var isValidLongitude_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _isDecimal=_interopRequireDefault(isDecimal_1);var _isSexagesimal=_interopRequireDefault(isSexagesimal_1);var _sexagesimalToDecimal=_interopRequireDefault(sexagesimalToDecimal_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var isValidLongitude=function isValidLongitude(value){if((0, _isDecimal.default)(value)){if(parseFloat(value)>constants.MAXLON||value<constants.MINLON){return false}return true}if((0, _isSexagesimal.default)(value)){return isValidLongitude((0, _sexagesimalToDecimal.default)(value))}return false};var _default=isValidLongitude;exports.default=_default;
});

unwrapExports(isValidLongitude_1);

var isValidCoordinate_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getCoordinateKeys2=_interopRequireDefault(getCoordinateKeys_1);var _isValidLatitude=_interopRequireDefault(isValidLatitude_1);var _isValidLongitude=_interopRequireDefault(isValidLongitude_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var isValidCoordinate=function isValidCoordinate(point){var _getCoordinateKeys=(0, _getCoordinateKeys2.default)(point),latitude=_getCoordinateKeys.latitude,longitude=_getCoordinateKeys.longitude;if(Array.isArray(point)&&point.length>=2){return (0, _isValidLongitude.default)(point[0])&&(0, _isValidLatitude.default)(point[1])}if(typeof latitude==="undefined"||typeof longitude==="undefined"){return false}var lon=point[longitude];var lat=point[latitude];if(typeof lat==="undefined"||typeof lon==="undefined"){return false}if((0, _isValidLatitude.default)(lat)===false||(0, _isValidLongitude.default)(lon)===false){return false}return true};var _default=isValidCoordinate;exports.default=_default;
});

unwrapExports(isValidCoordinate_1);

var toDecimal_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _isDecimal=_interopRequireDefault(isDecimal_1);var _isSexagesimal=_interopRequireDefault(isSexagesimal_1);var _sexagesimalToDecimal=_interopRequireDefault(sexagesimalToDecimal_1);var _isValidCoordinate=_interopRequireDefault(isValidCoordinate_1);var _getCoordinateKeys=_interopRequireDefault(getCoordinateKeys_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==="function"){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}));}ownKeys.forEach(function(key){_defineProperty(target,key,source[key]);});}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj}var toDecimal=function toDecimal(value){if((0, _isDecimal.default)(value)){return Number(value)}if((0, _isSexagesimal.default)(value)){return (0, _sexagesimalToDecimal.default)(value)}if((0, _isValidCoordinate.default)(value)){var keys=(0, _getCoordinateKeys.default)(value);if(Array.isArray(value)){return value.map(function(v,index){return [0,1].includes(index)?toDecimal(v):v})}return _objectSpread({},value,keys.latitude&&_defineProperty({},keys.latitude,toDecimal(value[keys.latitude])),keys.longitude&&_defineProperty({},keys.longitude,toDecimal(value[keys.longitude])))}if(Array.isArray(value)){return value.map(function(point){return (0, _isValidCoordinate.default)(point)?toDecimal(point):point})}return value};var _default=toDecimal;exports.default=_default;
});

unwrapExports(toDecimal_1);

var getLatitude_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getCoordinateKey=_interopRequireDefault(getCoordinateKey_1);var _toDecimal=_interopRequireDefault(toDecimal_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getLatitude=function getLatitude(point,raw){var latKey=(0, _getCoordinateKey.default)(point,constants.latitudeKeys);if(typeof latKey==="undefined"||latKey===null){return}var value=point[latKey];return raw===true?value:(0, _toDecimal.default)(value)};var _default=getLatitude;exports.default=_default;
});

unwrapExports(getLatitude_1);

var getLongitude_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getCoordinateKey=_interopRequireDefault(getCoordinateKey_1);var _toDecimal=_interopRequireDefault(toDecimal_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getLongitude=function getLongitude(point,raw){var latKey=(0, _getCoordinateKey.default)(point,constants.longitudeKeys);if(typeof latKey==="undefined"||latKey===null){return}var value=point[latKey];return raw===true?value:(0, _toDecimal.default)(value)};var _default=getLongitude;exports.default=_default;
});

unwrapExports(getLongitude_1);

var toRad_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var toRad=function toRad(value){return value*Math.PI/180};var _default=toRad;exports.default=_default;
});

unwrapExports(toRad_1);

var toDeg_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var toDeg=function toDeg(value){return value*180/Math.PI};var _default=toDeg;exports.default=_default;
});

unwrapExports(toDeg_1);

var computeDestinationPoint_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);var _toRad=_interopRequireDefault(toRad_1);var _toDeg=_interopRequireDefault(toDeg_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var computeDestinationPoint=function computeDestinationPoint(start,distance,bearing){var radius=arguments.length>3&&arguments[3]!==undefined?arguments[3]:6371000;var lat=(0, _getLatitude.default)(start);var lng=(0, _getLongitude.default)(start);var delta=distance/radius;var theta=(0, _toRad.default)(bearing);var phi1=(0, _toRad.default)(lat);var lambda1=(0, _toRad.default)(lng);var phi2=Math.asin(Math.sin(phi1)*Math.cos(delta)+Math.cos(phi1)*Math.sin(delta)*Math.cos(theta));var lambda2=lambda1+Math.atan2(Math.sin(theta)*Math.sin(delta)*Math.cos(phi1),Math.cos(delta)-Math.sin(phi1)*Math.sin(phi2));var longitude=(0, _toDeg.default)(lambda2);if(longitude<constants.MINLON||longitude>constants.MAXLON){lambda2=(lambda2+3*Math.PI)%(2*Math.PI)-Math.PI;longitude=(0, _toDeg.default)(lambda2);}return {latitude:(0, _toDeg.default)(phi2),longitude:longitude}};var _default=computeDestinationPoint;exports.default=_default;
});

unwrapExports(computeDestinationPoint_1);

var convertArea_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var convertArea=function convertArea(squareMeters){var targetUnit=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"m";var factor=constants.areaConversion[targetUnit];if(factor){return squareMeters*factor}throw new Error("Invalid unit used for area conversion.")};var _default=convertArea;exports.default=_default;
});

unwrapExports(convertArea_1);

var convertDistance_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var convertDistance=function convertDistance(meters){var targetUnit=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"m";var factor=constants.distanceConversion[targetUnit];if(factor){return meters*factor}throw new Error("Invalid unit used for distance conversion.")};var _default=convertDistance;exports.default=_default;
});

unwrapExports(convertDistance_1);

var convertSpeed_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var convertSpeed=function convertSpeed(metersPerSecond){var targetUnit=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"kmh";switch(targetUnit){case"kmh":return metersPerSecond*constants.timeConversion.h*constants.distanceConversion.km;case"mph":return metersPerSecond*constants.timeConversion.h*constants.distanceConversion.mi;default:return metersPerSecond;}};var _default=convertSpeed;exports.default=_default;
});

unwrapExports(convertSpeed_1);

var decimalToSexagesimal = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}var imprecise=function imprecise(number){var factor=Math.pow(10,12);return Math.round(number*factor)/factor};var decimal2sexagesimal=function decimal2sexagesimal(decimal){var _decimal$toString$spl=decimal.toString().split("."),_decimal$toString$spl2=_slicedToArray(_decimal$toString$spl,2),pre=_decimal$toString$spl2[0],post=_decimal$toString$spl2[1];var deg=Math.abs(Number(pre));var minFull=imprecise(Number("0."+(post||0))*60);var min=Math.floor(minFull);var sec=imprecise((minFull%min||0)*60);return deg+"\xB0 "+Number(min.toFixed(6)).toString().split(".").map(function(v,i){return i===0?v.padStart(2,"0"):v}).join(".")+"' "+Number(sec.toFixed(4)).toString().split(".").map(function(v,i){return i===0?v.padStart(2,"0"):v}).join(".")+"\""};var _default=decimal2sexagesimal;exports.default=_default;
});

unwrapExports(decimalToSexagesimal);

var getDistance_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);var _toRad=_interopRequireDefault(toRad_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var normalizeACosArg=function normalizeACosArg(val){if(val>1){return 1}if(val<-1){return -1}return val};var getDistance=function getDistance(from,to){var accuracy=arguments.length>2&&arguments[2]!==undefined?arguments[2]:1;accuracy=typeof accuracy!=="undefined"&&!isNaN(accuracy)?accuracy:1;var fromLat=(0, _getLatitude.default)(from);var fromLon=(0, _getLongitude.default)(from);var toLat=(0, _getLatitude.default)(to);var toLon=(0, _getLongitude.default)(to);var distance=Math.acos(normalizeACosArg(Math.sin((0, _toRad.default)(toLat))*Math.sin((0, _toRad.default)(fromLat))+Math.cos((0, _toRad.default)(toLat))*Math.cos((0, _toRad.default)(fromLat))*Math.cos((0, _toRad.default)(fromLon)-(0, _toRad.default)(toLon))))*constants.earthRadius;return Math.round(distance/accuracy)*accuracy};var _default=getDistance;exports.default=_default;
});

unwrapExports(getDistance_1);

var orderByDistance_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistance=_interopRequireDefault(getDistance_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var orderByDistance=function orderByDistance(point,coords){var distanceFn=arguments.length>2&&arguments[2]!==undefined?arguments[2]:_getDistance.default;distanceFn=typeof distanceFn==="function"?distanceFn:_getDistance.default;return coords.slice().sort(function(a,b){return distanceFn(point,a)-distanceFn(point,b)})};var _default=orderByDistance;exports.default=_default;
});

unwrapExports(orderByDistance_1);

var findNearest_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _orderByDistance=_interopRequireDefault(orderByDistance_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var findNearest=function findNearest(point,coords){return (0, _orderByDistance.default)(point,coords)[0]};var _default=findNearest;exports.default=_default;
});

unwrapExports(findNearest_1);

var getAreaOfPolygon_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _toRad=_interopRequireDefault(toRad_1);var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getAreaOfPolygon=function getAreaOfPolygon(points){var area=0;if(points.length>2){var lowerIndex;var middleIndex;var upperIndex;for(var i=0;i<points.length;i++){if(i===points.length-2){lowerIndex=points.length-2;middleIndex=points.length-1;upperIndex=0;}else if(i===points.length-1){lowerIndex=points.length-1;middleIndex=0;upperIndex=1;}else{lowerIndex=i;middleIndex=i+1;upperIndex=i+2;}var p1lon=(0, _getLongitude.default)(points[lowerIndex]);var p2lat=(0, _getLatitude.default)(points[middleIndex]);var p3lon=(0, _getLongitude.default)(points[upperIndex]);area+=((0, _toRad.default)(p3lon)-(0, _toRad.default)(p1lon))*Math.sin((0, _toRad.default)(p2lat));}area=area*constants.earthRadius*constants.earthRadius/2;}return Math.abs(area)};var _default=getAreaOfPolygon;exports.default=_default;
});

unwrapExports(getAreaOfPolygon_1);

var getBounds_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getBounds=function getBounds(points){if(Array.isArray(points)===false||points.length===0){throw new Error("No points were given.")}return points.reduce(function(stats,point){var latitude=(0, _getLatitude.default)(point);var longitude=(0, _getLongitude.default)(point);return {maxLat:Math.max(latitude,stats.maxLat),minLat:Math.min(latitude,stats.minLat),maxLng:Math.max(longitude,stats.maxLng),minLng:Math.min(longitude,stats.minLng)}},{maxLat:-Infinity,minLat:Infinity,maxLng:-Infinity,minLng:Infinity})};var _default=getBounds;exports.default=_default;
});

unwrapExports(getBounds_1);

var getBoundsOfDistance_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);var _toRad=_interopRequireDefault(toRad_1);var _toDeg=_interopRequireDefault(toDeg_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getBoundsOfDistance=function getBoundsOfDistance(point,distance){var latitude=(0, _getLatitude.default)(point);var longitude=(0, _getLongitude.default)(point);var radLat=(0, _toRad.default)(latitude);var radLon=(0, _toRad.default)(longitude);var radDist=distance/constants.earthRadius;var minLat=radLat-radDist;var maxLat=radLat+radDist;var MAX_LAT_RAD=(0, _toRad.default)(constants.MAXLAT);var MIN_LAT_RAD=(0, _toRad.default)(constants.MINLAT);var MAX_LON_RAD=(0, _toRad.default)(constants.MAXLON);var MIN_LON_RAD=(0, _toRad.default)(constants.MINLON);var minLon;var maxLon;if(minLat>MIN_LAT_RAD&&maxLat<MAX_LAT_RAD){var deltaLon=Math.asin(Math.sin(radDist)/Math.cos(radLat));minLon=radLon-deltaLon;if(minLon<MIN_LON_RAD){minLon+=Math.PI*2;}maxLon=radLon+deltaLon;if(maxLon>MAX_LON_RAD){maxLon-=Math.PI*2;}}else{minLat=Math.max(minLat,MIN_LAT_RAD);maxLat=Math.min(maxLat,MAX_LAT_RAD);minLon=MIN_LON_RAD;maxLon=MAX_LON_RAD;}return [{latitude:(0, _toDeg.default)(minLat),longitude:(0, _toDeg.default)(minLon)},{latitude:(0, _toDeg.default)(maxLat),longitude:(0, _toDeg.default)(maxLon)}]};var _default=getBoundsOfDistance;exports.default=_default;
});

unwrapExports(getBoundsOfDistance_1);

var getCenter_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);var _toRad=_interopRequireDefault(toRad_1);var _toDeg=_interopRequireDefault(toDeg_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getCenter=function getCenter(points){if(Array.isArray(points)===false||points.length===0){return false}var numberOfPoints=points.length;var sum=points.reduce(function(acc,point){var pointLat=(0, _toRad.default)((0, _getLatitude.default)(point));var pointLon=(0, _toRad.default)((0, _getLongitude.default)(point));return {X:acc.X+Math.cos(pointLat)*Math.cos(pointLon),Y:acc.Y+Math.cos(pointLat)*Math.sin(pointLon),Z:acc.Z+Math.sin(pointLat)}},{X:0,Y:0,Z:0});var X=sum.X/numberOfPoints;var Y=sum.Y/numberOfPoints;var Z=sum.Z/numberOfPoints;return {longitude:(0, _toDeg.default)(Math.atan2(Y,X)),latitude:(0, _toDeg.default)(Math.atan2(Z,Math.sqrt(X*X+Y*Y)))}};var _default=getCenter;exports.default=_default;
});

unwrapExports(getCenter_1);

var getCenterOfBounds_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getBounds=_interopRequireDefault(getBounds_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getCenterOfBounds=function getCenterOfBounds(coords){var bounds=(0, _getBounds.default)(coords);var latitude=bounds.minLat+(bounds.maxLat-bounds.minLat)/2;var longitude=bounds.minLng+(bounds.maxLng-bounds.minLng)/2;return {latitude:parseFloat(latitude.toFixed(6)),longitude:parseFloat(longitude.toFixed(6))}};var _default=getCenterOfBounds;exports.default=_default;
});

unwrapExports(getCenterOfBounds_1);

var getRhumbLineBearing_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);var _toRad=_interopRequireDefault(toRad_1);var _toDeg=_interopRequireDefault(toDeg_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getRhumbLineBearing=function getRhumbLineBearing(origin,dest){var diffLon=(0, _toRad.default)((0, _getLongitude.default)(dest))-(0, _toRad.default)((0, _getLongitude.default)(origin));var diffPhi=Math.log(Math.tan((0, _toRad.default)((0, _getLatitude.default)(dest))/2+Math.PI/4)/Math.tan((0, _toRad.default)((0, _getLatitude.default)(origin))/2+Math.PI/4));if(Math.abs(diffLon)>Math.PI){if(diffLon>0){diffLon=(Math.PI*2-diffLon)*-1;}else{diffLon=Math.PI*2+diffLon;}}return ((0, _toDeg.default)(Math.atan2(diffLon,diffPhi))+360)%360};var _default=getRhumbLineBearing;exports.default=_default;
});

unwrapExports(getRhumbLineBearing_1);

var getCompassDirection_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getRhumbLineBearing=_interopRequireDefault(getRhumbLineBearing_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getCompassDirection=function getCompassDirection(origin,dest){var bearingFn=arguments.length>2&&arguments[2]!==undefined?arguments[2]:_getRhumbLineBearing.default;var bearing=typeof bearingFn==="function"?bearingFn(origin,dest):(0, _getRhumbLineBearing.default)(origin,dest);if(isNaN(bearing)){throw new Error("Could not calculate bearing for given points. Check your bearing function")}switch(Math.round(bearing/22.5)){case 1:return "NNE";case 2:return "NE";case 3:return "ENE";case 4:return "E";case 5:return "ESE";case 6:return "SE";case 7:return "SSE";case 8:return "S";case 9:return "SSW";case 10:return "SW";case 11:return "WSW";case 12:return "W";case 13:return "WNW";case 14:return "NW";case 15:return "NNW";default:return "N";}};var _default=getCompassDirection;exports.default=_default;
});

unwrapExports(getCompassDirection_1);

var getDistanceFromLine_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistance=_interopRequireDefault(getDistance_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getDistanceFromLine=function getDistanceFromLine(point,lineStart,lineEnd){var d1=(0, _getDistance.default)(lineStart,point);var d2=(0, _getDistance.default)(point,lineEnd);var d3=(0, _getDistance.default)(lineStart,lineEnd);var alpha=Math.acos((d1*d1+d3*d3-d2*d2)/(2*d1*d3));var beta=Math.acos((d2*d2+d3*d3-d1*d1)/(2*d2*d3));if(alpha>Math.PI/2){return d1}if(beta>Math.PI/2){return d2}return Math.sin(alpha)*d1};var _default=getDistanceFromLine;exports.default=_default;
});

unwrapExports(getDistanceFromLine_1);

var getGreatCircleBearing_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);var _toRad=_interopRequireDefault(toRad_1);var _toDeg=_interopRequireDefault(toDeg_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getGreatCircleBearing=function getGreatCircleBearing(origin,dest){var destLat=(0, _getLatitude.default)(dest);var detLon=(0, _getLongitude.default)(dest);var originLat=(0, _getLatitude.default)(origin);var originLon=(0, _getLongitude.default)(origin);var bearing=((0, _toDeg.default)(Math.atan2(Math.sin((0, _toRad.default)(detLon)-(0, _toRad.default)(originLon))*Math.cos((0, _toRad.default)(destLat)),Math.cos((0, _toRad.default)(originLat))*Math.sin((0, _toRad.default)(destLat))-Math.sin((0, _toRad.default)(originLat))*Math.cos((0, _toRad.default)(destLat))*Math.cos((0, _toRad.default)(detLon)-(0, _toRad.default)(originLon))))+360)%360;return bearing};var _default=getGreatCircleBearing;exports.default=_default;
});

unwrapExports(getGreatCircleBearing_1);

var getPathLength_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistance=_interopRequireDefault(getDistance_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};}return _typeof(obj)}var getPathLength=function getPathLength(points){var distanceFn=arguments.length>1&&arguments[1]!==undefined?arguments[1]:_getDistance.default;return points.reduce(function(acc,point){if(_typeof(acc)==="object"&&acc.last!==null){acc.distance+=distanceFn(point,acc.last);}acc.last=point;return acc},{last:null,distance:0}).distance};var _default=getPathLength;exports.default=_default;
});

unwrapExports(getPathLength_1);

var getPreciseDistance = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);var _toRad=_interopRequireDefault(toRad_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getDistance=function getDistance(start,end){var accuracy=arguments.length>2&&arguments[2]!==undefined?arguments[2]:1;accuracy=typeof accuracy!=="undefined"&&!isNaN(accuracy)?accuracy:1;var startLat=(0, _getLatitude.default)(start);var startLon=(0, _getLongitude.default)(start);var endLat=(0, _getLatitude.default)(end);var endLon=(0, _getLongitude.default)(end);var b=6356752.314245;var ellipsoidParams=1/298.257223563;var L=(0, _toRad.default)(endLon-startLon);var cosSigma;var sigma;var sinAlpha;var cosSqAlpha;var cos2SigmaM;var sinSigma;var U1=Math.atan((1-ellipsoidParams)*Math.tan((0, _toRad.default)(parseFloat(startLat))));var U2=Math.atan((1-ellipsoidParams)*Math.tan((0, _toRad.default)(parseFloat(endLat))));var sinU1=Math.sin(U1);var cosU1=Math.cos(U1);var sinU2=Math.sin(U2);var cosU2=Math.cos(U2);var lambda=L;var lambdaP;var iterLimit=100;do{var sinLambda=Math.sin(lambda);var cosLambda=Math.cos(lambda);sinSigma=Math.sqrt(cosU2*sinLambda*(cosU2*sinLambda)+(cosU1*sinU2-sinU1*cosU2*cosLambda)*(cosU1*sinU2-sinU1*cosU2*cosLambda));if(sinSigma===0){return 0}cosSigma=sinU1*sinU2+cosU1*cosU2*cosLambda;sigma=Math.atan2(sinSigma,cosSigma);sinAlpha=cosU1*cosU2*sinLambda/sinSigma;cosSqAlpha=1-sinAlpha*sinAlpha;cos2SigmaM=cosSigma-2*sinU1*sinU2/cosSqAlpha;if(isNaN(cos2SigmaM)){cos2SigmaM=0;}var C=ellipsoidParams/16*cosSqAlpha*(4+ellipsoidParams*(4-3*cosSqAlpha));lambdaP=lambda;lambda=L+(1-C)*ellipsoidParams*sinAlpha*(sigma+C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));}while(Math.abs(lambda-lambdaP)>1e-12&&--iterLimit>0);if(iterLimit===0){return NaN}var uSq=cosSqAlpha*(constants.earthRadius*constants.earthRadius-b*b)/(b*b);var A=1+uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));var B=uSq/1024*(256+uSq*(-128+uSq*(74-47*uSq)));var deltaSigma=B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));var distance=b*A*(sigma-deltaSigma);return Math.round(distance/accuracy)*accuracy};var _default=getDistance;exports.default=_default;
});

unwrapExports(getPreciseDistance);

var getRoughCompassDirection_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var getRoughCompassDirection=function getRoughCompassDirection(exact){if(/^NNE|NE|NNW|N$/.test(exact)){return "N"}if(/^ENE|E|ESE|SE$/.test(exact)){return "E"}if(/^SSE|S|SSW|SW$/.test(exact)){return "S"}if(/^WSW|W|WNW|NW$/.test(exact)){return "W"}};var _default=getRoughCompassDirection;exports.default=_default;
});

unwrapExports(getRoughCompassDirection_1);

var getSpeed_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistance=_interopRequireDefault(getDistance_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getSpeed=function getSpeed(start,end){var distanceFn=arguments.length>2&&arguments[2]!==undefined?arguments[2]:_getDistance.default;var distance=distanceFn(start,end);var time=Number(end.time)-Number(start.time);var metersPerSecond=distance/time*1000;return metersPerSecond};var _default=getSpeed;exports.default=_default;
});

unwrapExports(getSpeed_1);

var isPointInLine_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistance=_interopRequireDefault(getDistance_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var isPointInLine=function isPointInLine(point,lineStart,lineEnd){return (0, _getDistance.default)(lineStart,point)+(0, _getDistance.default)(point,lineEnd)===(0, _getDistance.default)(lineStart,lineEnd)};var _default=isPointInLine;exports.default=_default;
});

unwrapExports(isPointInLine_1);

var isPointInPolygon_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var isPointInPolygon=function isPointInPolygon(point,polygon){var isInside=false;var totalPolys=polygon.length;for(var i=-1,j=totalPolys-1;++i<totalPolys;j=i){if(((0, _getLongitude.default)(polygon[i])<=(0, _getLongitude.default)(point)&&(0, _getLongitude.default)(point)<(0, _getLongitude.default)(polygon[j])||(0, _getLongitude.default)(polygon[j])<=(0, _getLongitude.default)(point)&&(0, _getLongitude.default)(point)<(0, _getLongitude.default)(polygon[i]))&&(0, _getLatitude.default)(point)<((0, _getLatitude.default)(polygon[j])-(0, _getLatitude.default)(polygon[i]))*((0, _getLongitude.default)(point)-(0, _getLongitude.default)(polygon[i]))/((0, _getLongitude.default)(polygon[j])-(0, _getLongitude.default)(polygon[i]))+(0, _getLatitude.default)(polygon[i])){isInside=!isInside;}}return isInside};var _default=isPointInPolygon;exports.default=_default;
});

unwrapExports(isPointInPolygon_1);

var isPointNearLine_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistanceFromLine=_interopRequireDefault(getDistanceFromLine_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var isPointNearLine=function isPointNearLine(point,start,end,distance){return (0, _getDistanceFromLine.default)(point,start,end)<distance};var _default=isPointNearLine;exports.default=_default;
});

unwrapExports(isPointNearLine_1);

var isPointWithinRadius_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _getDistance=_interopRequireDefault(getDistance_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var isPointWithinRadius=function isPointWithinRadius(point,center,radius){return (0, _getDistance.default)(point,center)<radius};var _default=isPointWithinRadius;exports.default=_default;
});

unwrapExports(isPointWithinRadius_1);

var es = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"computeDestinationPoint",{enumerable:true,get:function get(){return _computeDestinationPoint.default}});Object.defineProperty(exports,"convertArea",{enumerable:true,get:function get(){return _convertArea.default}});Object.defineProperty(exports,"convertDistance",{enumerable:true,get:function get(){return _convertDistance.default}});Object.defineProperty(exports,"convertSpeed",{enumerable:true,get:function get(){return _convertSpeed.default}});Object.defineProperty(exports,"decimalToSexagesimal",{enumerable:true,get:function get(){return _decimalToSexagesimal.default}});Object.defineProperty(exports,"findNearest",{enumerable:true,get:function get(){return _findNearest.default}});Object.defineProperty(exports,"getAreaOfPolygon",{enumerable:true,get:function get(){return _getAreaOfPolygon.default}});Object.defineProperty(exports,"getBounds",{enumerable:true,get:function get(){return _getBounds.default}});Object.defineProperty(exports,"getBoundsOfDistance",{enumerable:true,get:function get(){return _getBoundsOfDistance.default}});Object.defineProperty(exports,"getCenter",{enumerable:true,get:function get(){return _getCenter.default}});Object.defineProperty(exports,"getCenterOfBounds",{enumerable:true,get:function get(){return _getCenterOfBounds.default}});Object.defineProperty(exports,"getCompassDirection",{enumerable:true,get:function get(){return _getCompassDirection.default}});Object.defineProperty(exports,"getCoordinateKey",{enumerable:true,get:function get(){return _getCoordinateKey.default}});Object.defineProperty(exports,"getCoordinateKeys",{enumerable:true,get:function get(){return _getCoordinateKeys.default}});Object.defineProperty(exports,"getDistance",{enumerable:true,get:function get(){return _getDistance.default}});Object.defineProperty(exports,"getDistanceFromLine",{enumerable:true,get:function get(){return _getDistanceFromLine.default}});Object.defineProperty(exports,"getGreatCircleBearing",{enumerable:true,get:function get(){return _getGreatCircleBearing.default}});Object.defineProperty(exports,"getLatitude",{enumerable:true,get:function get(){return _getLatitude.default}});Object.defineProperty(exports,"getLongitude",{enumerable:true,get:function get(){return _getLongitude.default}});Object.defineProperty(exports,"getPathLength",{enumerable:true,get:function get(){return _getPathLength.default}});Object.defineProperty(exports,"getPreciseDistance",{enumerable:true,get:function get(){return _getPreciseDistance.default}});Object.defineProperty(exports,"getRhumbLineBearing",{enumerable:true,get:function get(){return _getRhumbLineBearing.default}});Object.defineProperty(exports,"getRoughCompassDirection",{enumerable:true,get:function get(){return _getRoughCompassDirection.default}});Object.defineProperty(exports,"getSpeed",{enumerable:true,get:function get(){return _getSpeed.default}});Object.defineProperty(exports,"isDecimal",{enumerable:true,get:function get(){return _isDecimal.default}});Object.defineProperty(exports,"isPointInLine",{enumerable:true,get:function get(){return _isPointInLine.default}});Object.defineProperty(exports,"isPointInPolygon",{enumerable:true,get:function get(){return _isPointInPolygon.default}});Object.defineProperty(exports,"isPointNearLine",{enumerable:true,get:function get(){return _isPointNearLine.default}});Object.defineProperty(exports,"isPointWithinRadius",{enumerable:true,get:function get(){return _isPointWithinRadius.default}});Object.defineProperty(exports,"isSexagesimal",{enumerable:true,get:function get(){return _isSexagesimal.default}});Object.defineProperty(exports,"isValidCoordinate",{enumerable:true,get:function get(){return _isValidCoordinate.default}});Object.defineProperty(exports,"isValidLatitude",{enumerable:true,get:function get(){return _isValidLatitude.default}});Object.defineProperty(exports,"isValidLongitude",{enumerable:true,get:function get(){return _isValidLongitude.default}});Object.defineProperty(exports,"orderByDistance",{enumerable:true,get:function get(){return _orderByDistance.default}});Object.defineProperty(exports,"sexagesimalToDecimal",{enumerable:true,get:function get(){return _sexagesimalToDecimal.default}});Object.defineProperty(exports,"toDecimal",{enumerable:true,get:function get(){return _toDecimal.default}});Object.defineProperty(exports,"toRad",{enumerable:true,get:function get(){return _toRad.default}});Object.defineProperty(exports,"toDeg",{enumerable:true,get:function get(){return _toDeg.default}});var _computeDestinationPoint=_interopRequireDefault(computeDestinationPoint_1);var _convertArea=_interopRequireDefault(convertArea_1);var _convertDistance=_interopRequireDefault(convertDistance_1);var _convertSpeed=_interopRequireDefault(convertSpeed_1);var _decimalToSexagesimal=_interopRequireDefault(decimalToSexagesimal);var _findNearest=_interopRequireDefault(findNearest_1);var _getAreaOfPolygon=_interopRequireDefault(getAreaOfPolygon_1);var _getBounds=_interopRequireDefault(getBounds_1);var _getBoundsOfDistance=_interopRequireDefault(getBoundsOfDistance_1);var _getCenter=_interopRequireDefault(getCenter_1);var _getCenterOfBounds=_interopRequireDefault(getCenterOfBounds_1);var _getCompassDirection=_interopRequireDefault(getCompassDirection_1);var _getCoordinateKey=_interopRequireDefault(getCoordinateKey_1);var _getCoordinateKeys=_interopRequireDefault(getCoordinateKeys_1);var _getDistance=_interopRequireDefault(getDistance_1);var _getDistanceFromLine=_interopRequireDefault(getDistanceFromLine_1);var _getGreatCircleBearing=_interopRequireDefault(getGreatCircleBearing_1);var _getLatitude=_interopRequireDefault(getLatitude_1);var _getLongitude=_interopRequireDefault(getLongitude_1);var _getPathLength=_interopRequireDefault(getPathLength_1);var _getPreciseDistance=_interopRequireDefault(getPreciseDistance);var _getRhumbLineBearing=_interopRequireDefault(getRhumbLineBearing_1);var _getRoughCompassDirection=_interopRequireDefault(getRoughCompassDirection_1);var _getSpeed=_interopRequireDefault(getSpeed_1);var _isDecimal=_interopRequireDefault(isDecimal_1);var _isPointInLine=_interopRequireDefault(isPointInLine_1);var _isPointInPolygon=_interopRequireDefault(isPointInPolygon_1);var _isPointNearLine=_interopRequireDefault(isPointNearLine_1);var _isPointWithinRadius=_interopRequireDefault(isPointWithinRadius_1);var _isSexagesimal=_interopRequireDefault(isSexagesimal_1);var _isValidCoordinate=_interopRequireDefault(isValidCoordinate_1);var _isValidLatitude=_interopRequireDefault(isValidLatitude_1);var _isValidLongitude=_interopRequireDefault(isValidLongitude_1);var _orderByDistance=_interopRequireDefault(orderByDistance_1);var _sexagesimalToDecimal=_interopRequireDefault(sexagesimalToDecimal_1);var _toDecimal=_interopRequireDefault(toDecimal_1);var _toRad=_interopRequireDefault(toRad_1);var _toDeg=_interopRequireDefault(toDeg_1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}
});

var index = unwrapExports(es);

export default index;
