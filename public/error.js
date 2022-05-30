var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function CircleGenerator(pos) {
    var cx, cy, _a, x, y, radius, leftAngle, rightAngle, rand, nextRadius, distanceToNextCenter, rightPoint, leftPoint;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cx = pos[0], cy = pos[1];
                _a = [cx, cy], x = _a[0], y = _a[1];
                radius = 48;
                leftAngle = 180;
                rightAngle = 0;
                rand = function (min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min)) + min;
                };
                _b.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                // PICK TWO ANGLES: Left and Right
                // Left should be between 155 and 205 degrees
                leftAngle = rand(155, 205);
                // Right should be between -35 and 35 degrees
                rightAngle = rand(-25, 25);
                nextRadius = radius * 0.8;
                distanceToNextCenter = radius + nextRadius;
                rightPoint = [
                    Math.cos(rightAngle * (Math.PI / 180)) * distanceToNextCenter,
                    Math.sin(rightAngle * (Math.PI / 180)) * distanceToNextCenter
                ];
                leftPoint = [
                    Math.cos(leftAngle * (Math.PI / 180)) * distanceToNextCenter,
                    Math.sin(leftAngle * (Math.PI / 180)) * distanceToNextCenter
                ];
                return [4 /*yield*/, {
                        left: {
                            cx: leftPoint[0],
                            cy: leftPoint[1],
                            r: nextRadius
                        },
                        right: {
                            cx: rightPoint[0],
                            cy: rightPoint[1],
                            r: nextRadius
                        }
                    }];
            case 2:
                _b.sent();
                radius = nextRadius;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
window.addEventListener("load", onLoad);
function createTestCanvas(parent) {
    var canvas = document.createElement("canvas");
    canvas.width = 460;
    canvas.height = 460 / 1.62;
    parent.appendChild(canvas);
    return canvas.getContext("2d");
}
function createCloud() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 400 164");
    svg.style.top = Math.random() * 40 + "%";
    var baseCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    baseCircle.setAttribute("cx", "200");
    baseCircle.setAttribute("cy", "82");
    baseCircle.setAttribute("r", "40");
    baseCircle.setAttribute("fill", "white");
    svg.appendChild(baseCircle);
    var gen = CircleGenerator([400, 164]);
    var current = gen.next();
    for (var i = 0; i < 64; i += 1) {
        var _a = current.value, left = _a.left, right = _a.right;
        var lx = left.cx, ly = left.cy, lr = left.r;
        var rx = right.cx, ry = right.cy, rr = right.r;
        var leftCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var rightCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        leftCircle.setAttribute("cx", lx + 200);
        leftCircle.setAttribute("cy", ly + 82);
        leftCircle.setAttribute("r", lr);
        leftCircle.setAttribute("fill", "white");
        rightCircle.setAttribute("cx", rx + 200);
        rightCircle.setAttribute("cy", ry + 82);
        rightCircle.setAttribute("r", rr);
        rightCircle.setAttribute("fill", "white");
        svg.style.filter = "blur(6px)";
        svg.appendChild(leftCircle);
        svg.appendChild(rightCircle);
        current = gen.next();
    }
    return svg;
}
function onLoad() {
    var root = document.getElementById("root") || document.body;
    var ctx = createTestCanvas(root);
    var i = 0;
    root.appendChild(createCloud());
    var interval = window.setInterval(function () {
        if (i < 6)
            root.appendChild(createCloud());
        else
            window.clearInterval(interval);
        i += 1;
    }, 2100);
}
