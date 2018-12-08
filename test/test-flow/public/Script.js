
function isEmpty(param) {
    if (param == '$' || param == '' || param == null)
        return true;
    return false;
}
function convertFloat(param) {
    if (param == '$' || param == '' || param == null)
        return null;
    return parseFloat(param)
}
function InArray(item, items) {
    for (var i = 0; i < items.length; i++) {
        if (item == items[i])
            return true;
    }
    return false;
}

function daterangeoverlaps(a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
    if (b_start < a_start && a_end < b_end) return true; // a in b
    return false;
}
function multipledaterangeoverlaps(arguments_) {
    var i, j;
    if (arguments_.length % 2 !== 0)
        throw new TypeError('arguments_ length must be a multiple of 2');
    for (i = 0; i < arguments_.length - 2; i += 2) {
        for (j = i + 2; j < arguments_.length; j += 2) {
            if (
                dateRangeOverlaps(
                    arguments_[i], arguments_[i + 1],
                    arguments_[j], arguments_[j + 1]
                )
            ) return true;
        }
    }
    return false;
}

function rangevalue(start, end, inc) {

    var res = [];

    stringValue = inc.toString();
    var length;
    if (stringValue.indexOf('.') > 0)
        length = stringValue.split('.')[1].length;
    else
        length = 0;

    for (var i = start; i <= end; i += inc) {

        res.push(i.toFixed(length));

    }

    return res;
}


function range(str, minus) {
    if (minus == undefined)
    { minus = ""; }
    var r = [];
    var rex = [];
    var arr = str.split(";");

    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split(",");

        var out = rangevalue(parseFloat(temp[0]), parseFloat(temp[1]), parseFloat(temp[2]));

        for (var j = 0; j < out.length; j++) {
            var obj = { ID: out[j], Name: out[j] };



            if (minus.split(";").indexOf(String(out[j])) < 0 && rex.indexOf(out[j]) < 0) {
                r.push(obj);
                rex.push(out[j]);
            }

        }
    }
    return r;

}

function rangehour(start, end, interval) {
    var x = interval;
    var times = [];
    var f = start;
    var t = end;
    for (var i = f; i < t; i++) {
        var tt = 0;
        while (tt < 60) {
            var mm = (tt % 60);
            times[times.length] = ({ "ID": ("0" + (i)).slice(-2) + ":" + ("0" + mm).slice(-2), "Name": ("0" + (i)).slice(-2) + ":" + ("0" + mm).slice(-2) });
            tt = tt + x;
        }
    }
    return times;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function rangevalidity(start, end, point, number) {
    if (!isNumeric(number)) {
        return false;
    }
    if (number > end || number < start)
        return false;

    if (point < 0)
        return true;

    stringValue = number.toString();
    var length;
    if (stringValue.indexOf('.') > 0)
        length = stringValue.split('.')[1].length;
    else
        length = 0;

    if (length != point)
        return false;

    return true;

}

function idname() {
    var r = [];

    for (i = 0; i < arguments_.length; i += 2) {

        r.push({ ID: arguments_[i], Name: arguments_[i + 1] });

    }

    return r;
}
function cmd(_commandname_, _value_, _propertyid_, _groupid_) {
    return { Command: _commandname_, AttributeID: _propertyid_, Value: _value_, GroupID: _groupid_ };
}


function date_diff_indays(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}

// parse a date in yyyy-mm-dd format
function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
}

function getDateString(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}
function strCorrect(str) {
    return str.replace(/'/gi,"").replace(/\$/gi,"");;
}