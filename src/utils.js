export function isNil(obj) {
    return obj === null || typeof obj === 'undefined';
}

export function classNames(...params) {
    let result = '';

    for (const param of params) {
        if (isNil(param)) {
            continue;
        }

        if (param instanceof Array) {
            result += ' ' + param.join(' ');
        }
        else if (typeof param === 'object') {
            // Key is the class name to add if value evaluates to true
            for (const [key, value] of Object.entries(param)) {
                if (value) {
                    result += ' ' + key;
                }
            }
        }
        else {
            result += ' ' + param;
        }
    }

    return result;
}

export function clampNumber(number, min, max) {
    return Math.max(min, Math.min(max, number));
}

export const transitionEndEventName = (() => {
    const el = document.createElement('div');

    const transEndEventNames = {
        transition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'otransitionend'
    }

    for (const name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name];
        }
    }

    return 'transitionend';
})();