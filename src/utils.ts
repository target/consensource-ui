// Util collection

/**
 * Selects keys from an object
 */
export const pluck = (obj: any, ...keys: Array<any>): any =>
    keys.reduce((o, k) => {
        if (typeof obj[k] !== 'undefined') {
            o[k] = obj[k];
        }
        return o;
    }, {});

/**
 * Merges objects, starting from left to right
 */
