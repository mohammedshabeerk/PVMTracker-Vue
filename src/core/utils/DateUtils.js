import moment from 'moment';

const DateUtils = {
    sortByDate: function(array,key,format,earlist=true) {
        var isAfter = 1, notAfter = -1;
        if(!earlist) {
            isAfter = -1;
            notAfter = 1;
        }
        return array.sort((a,b) => {
            var mA = moment(a[key],format);
            if(!mA.isValid()) mA = moment.unix(0);

            var mB = moment(b[key],format);
            if(!mB.isValid()) mB = moment.unix(0);
            return mA.isAfter(mB)?isAfter:notAfter;
        });
    },
    sortByDateLogic(a,b,format,earlist=true) {
        var isAfter = 1, notAfter = -1;
        if(!earlist) {
            isAfter = -1;
            notAfter = 1;
        }
        var mA = moment(a,format);
        if(!mA.isValid()) mA = moment.unix(0);

        var mB = moment(b,format);
        if(!mB.isValid()) mB = moment.unix(0);
        mA.isAfter(mB)?isAfter:notAfter;
        return mA.isAfter(mB)?isAfter:notAfter;
    },
    daysLeft(date) {
        var given = null
        var current = moment().startOf('day');
        var result = -1
        given = moment(date, "YYYY-MM-DD");
        result = moment.duration(given.diff(current)).asDays();
        return result+1
    },
    
}

export default DateUtils;