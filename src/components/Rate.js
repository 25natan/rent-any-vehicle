import React from 'react';
import $ from 'jquery';

const Rate = () => {
    const setRating = (rating) => {
        $('#rating-input').val(rating);
        // fill all the stars assigning the '.selected' class
        $('.rating-star').removeClass('fa-star-o').addClass('selected');
        // empty all the stars to the right of the mouse
        $('.rating-star#rating-' + rating + ' ~ .rating-star').removeClass('selected').addClass('fa-star-o');
      }
    return (
        <div>
            
        </div>
    );
};

export default Rate;