/**
 * Author: Fatima Aurelia
 * Date: 01/22/2017
 * Version: 1.0
 */

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    
    // // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        e.preventDefault();
    }
}, false);
