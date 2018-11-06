/**
 * Responsive Diagonally Distributed Elements
 * ------------------------------------------------------------------------------------------------
 * Responsively aligns the centers of inner elements on a diagonal line going from the center of
 * the first element to the center of the last element. A container element is used to
 * determine the left-most and right-most positions. When set to align diagonally down, the first
 * element is placed far left and the last element is placed far right. The reverse is true when
 * set to align diagonally up. Inner elements may also be blocked from going past a chosen margin.
 *
 * Requirements
 * ------------------------------------------------------------------------------------------------
 * Requires javascript-detect-element-resize.js
 * https://github.com/sdecima/javascript-detect-element-resize
 *
 * Options (set as classes on a container element)
 * ------------------------------------------------------------------------------------------------
 * **rdde** *(required):*             sets up an element as the container
 *
 * **rdde-down** *(default):*         align inner elements diagonally down
 *
 * **rdde-up:**                       align inner elements diagonally up
 *
 * **rdde-left-basis** *(default):*   calculate inner elements from left and block on left margin
 *
 * **rdde-right-basis:**              calculate inner elements from right and block on right margin
 *
 * **rdde-no-block:**                 turn off blocking so elements can cross basis margin
 *
 * Author
 * ---------------------------------
 * Samuel Newhouse
 * https://github.com/SamuelNewhouse
 *
 * Version
 * -------
 * 0.1
**/

document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.addResizeListener !== "function" || typeof window.removeResizeListener !== "function") {
        console.log("ERROR: javascript-detect-element-resize.js is required for diagonally-distributed-elements.js");
        console.log("See: https://github.com/sdecima/javascript-detect-element-resize");
        return;
    }

    var boxes = document.getElementsByClassName("rdde");
    if (boxes.length == 0) {
        console.log("Note: No elements with rdde class.");
        return;
    }

    for (let i = 0; i < boxes.length; i++)
        addRddeBox(boxes[i]);

    function addRddeBox(box) {
        box.style.display = "flex";
        box.style.flexDirection = "column";
        box.style.justifyContent = "space-between";
        // If text wraps, this keeps the diagonal alignment looking good
        box.style.textAlign = "center"; // <----------------------------

        checkClasses(box);
        window.addResizeListener(box, distributeElements);
    }

    function checkClasses(box) {
        var classes = box.classList;

        // Set defaults if not set.
        if (!classes.contains("rdde-left-basis") && !classes.contains("rdde-right-basis"))
            box.classList.add("rdde-left-basis");
        if (!classes.contains("rdde-down") && !classes.contains("rdde-up"))
            box.classList.add("rdde-down");

        if (classes.contains("rdde-left-basis"))
            box.style.alignItems = "flex-start";
        else
            box.style.alignItems = "flex-end";
    }

    function distributeElements() {
        var box = this;
        var parts = box.children;
        // Last child will be a div added from javascript-detect-element-resize.js.
        // It must be ignored for this to work properly.
        var numParts = parts.length - 1; // <-----------

        var boxCS = getComputedStyle(box);
        var distributionWidth =    // Distribution must occur inside of any padding...
            box.clientWidth - parseFloat(boxCS.paddingLeft) - parseFloat(boxCS.paddingRight);

        var firstOffset = parts[0].clientWidth / 2;
        var lastOffset = parts[numParts - 1].clientWidth / 2;

        var innerStart = firstOffset;
        var innerEnd = distributionWidth - lastOffset;

        var innerWidth = innerEnd - innerStart;
        var splitWidth = innerWidth / (numParts - 1);

        var bBlock = !box.classList.contains("rdde-no-block");

        if (box.classList.contains("rdde-down")) {
            if (box.classList.contains("rdde-left-basis")) {
                for (let i = 1; i < numParts; i++) {
                    let marginLeft = splitWidth * i + firstOffset - parts[i].clientWidth / 2;
                    if (bBlock)
                        marginLeft = Math.max(0, marginLeft);
                    parts[i].style.marginLeft = marginLeft + "px";
                }
            }
            else { // box.classList.contains("rdde-right-basis")
                for (let i = 0; i < numParts - 1; i++) {
                    let iMirror = numParts - i - 1;
                    let marginRight = splitWidth * iMirror + lastOffset - parts[i].clientWidth / 2;
                    if (bBlock)
                        marginRight = Math.max(0, marginRight);
                    parts[i].style.marginRight = marginRight + "px";
                }
            }
        }
        else { // box.classList.contains("rdde-up")
            if (box.classList.contains("rdde-left-basis")) {
                for (let i = 0; i < numParts - 1; i++) {
                    let iMirror = numParts - i - 1;
                    let marginLeft = splitWidth * iMirror + lastOffset - parts[i].clientWidth / 2;
                    if (bBlock)
                        marginLeft = Math.max(0, marginLeft);
                    parts[i].style.marginLeft = marginLeft + "px";
                }
            }
            else { // box.classList.contains("rdde-right-basis")
                for (let i = 1; i < numParts; i++) {
                    let marginRight = splitWidth * i + firstOffset - parts[i].clientWidth / 2;
                    if (bBlock)
                        marginRight = Math.max(0, marginRight);
                    parts[i].style.marginRight = marginRight + "px";
                }
            }
        }
    }
});