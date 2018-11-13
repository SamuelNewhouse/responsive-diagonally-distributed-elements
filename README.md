# Responsive Diagonally Distributed Elements

Responsively aligns the centers of inner elements on a diagonal line going from the center of the first element to the center of the last element. A container element is used to determine the left-most and right-most positions. When set to align diagonally down, the first element is placed far left and the last element is placed far right. The reverse is true when set to align diagonally up. Inner elements may also be blocked from going past a chosen margin.

Requirements
------------------------------------------------------------------------------------------------
Requires javascript-detect-element-resize.js

https://github.com/sdecima/javascript-detect-element-resize

Options (set as classes on a container element)
------------------------------------------------------------------------------------------------
**rdde** *(required):*             sets up an element as the container

**rdde-down** *(default):*         align inner elements diagonally down

**rdde-up:**                       align inner elements diagonally up

**rdde-left-basis** *(default):*   calculate inner elements from left and block on left margin

**rdde-right-basis:**              calculate inner elements from right and block on right margin

**rdde-no-block:**                 turn off blocking so elements can cross basis margin

Background and Further Documentation
------------------------------------------------------------------------------------------------
This whole project started out as a combination between two things I was working on. I wanted responsive diagonally distributed elements (RDDE) for a website I was working on, but I couldn't find any existing JavaScript for doing that. I ended up creating a rudimentary version of RDDE just for that website. I've also been working my way through the freeCodeCamp.org curriculum. Just after finishing that website, I was about to start the freeCodeCamp project called "Build a Technical Documentation Page", so I decided to write a technical document about how to implement RDDE. That lead to several considerations and refinements that have resulted in the release of this project. If you want to see the thought process involved in the creation of RDDE, check out https://github.com/SamuelNewhouse/rdde-tech-doc.

Author
---------------------------------
Samuel Newhouse

https://github.com/SamuelNewhouse

Version
-------
0.1
