import React from 'react'
import { Text, TextInput } from 'react-native'
import i18nLib from './i18n'

export const i18n = i18nLib

export const setDefaultTextStyle = (style) => {
    const oldRender = Text.render
    Text.render = function (...args) {
        const origin = oldRender.call(this, ...args)
        return React.cloneElement(origin, {
            style: [style, origin.props.style]
        })
    }
    TextInput.render = function (...args) {
        const origin = oldRender.call(this, ...args)
        return React.cloneElement(origin, {
            style: [style, origin.props.style]
        })
    }
}

export const setDefaultTextProps = (props) => {
    if (Text.defaultProps === null || Text.defaultProps === undefined) Text.defaultProps = {}
    Text.defaultProps = { ...TextInput.defaultProps, ...props }
    if (TextInput.defaultProps === null || TextInput.defaultProps === undefined) TextInput.defaultProps = {}
    TextInput.defaultProps = { ...TextInput.defaultProps, ...props }
}

export function debounce(func, wait = 250, immediate) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;

    // Calling debounce returns a new anonymous function
    return function () {
        // reference the context and args for the setTimeout function
        var context = this, args = arguments;

        // Should the function be called now? If immediate is true
        //   and not already in a timeout then the answer is: Yes
        var callNow = immediate && !timeout;

        // This is the basic debounce behaviour where you can call this 
        //   function several times, but it will only execute once 
        //   [before or after imposing a delay]. 
        //   Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);

        // Set the new timeout
        timeout = setTimeout(function () {

            // Inside the timeout function, clear the timeout variable
            // which will let the next execution run when in 'immediate' mode
            timeout = null;

            // Check if the function already ran with the immediate flag
            if (!immediate) {
                // Call the original function with apply
                // apply lets you define the 'this' object as well as the arguments 
                //    (both captured before setTimeout)
                func.apply(context, args);
            }
        }, wait);

        // Immediate mode and no wait timer? Execute the function..
        if (callNow) func.apply(context, args);
    };
}
