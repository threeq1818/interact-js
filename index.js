for (i = 0; i < 10; i++) {
    var rect = document.createElement('div');
    rect.classList.add('rect');
    document.body.appendChild(rect);
}

// target elements with the "draggable" class
interact('.rect')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.snap({
                targets: [
                    interact.createSnapGrid({ x: 10, y: 10 })
                ],
                range: Infinity,
                relativePoints: [{ x: 0, y: 0 }]
            }),
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function(event) {}
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        modifiers: [
            interact.modifiers.snap({
                targets: [
                    interact.createSnapGrid({ x: 10, y: 10 })
                ],
                range: Infinity,
                relativePoints: [{ x: 0, y: 0 }]
            }),
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent',
                endOnly: true
            }),

            // minimum size
            interact.modifiers.restrictSize({
                min: { width: 100, height: 50 }
            })
        ],

        inertia: true
    })
    .on('resizemove', function(event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    })

function dragMoveListener(event) {
    var target = event.target
        // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener