import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import $ from 'jquery';

const USERS = 'users';
function setRating(rating) {
  $('#rating-input').val(rating);
  // fill all the stars assigning the '.selected' class
  $('.rating-star').removeClass('fa-star-o').addClass('selected');
  // empty all the stars to the right of the mouse
  $('.rating-star#rating-' + rating + ' ~ .rating-star').removeClass('selected').addClass('fa-star-o');
}

const loadRate = () => {
  $('.rating-star')
.on('mouseover', function(e) {
  var rating = $(e.target).data('rating');
  // fill all the stars
  $('.rating-star').removeClass('fa-star-o').addClass('fa-star');
  // empty all the stars to the right of the mouse
  $('.rating-star#rating-' + rating + ' ~ .rating-star').removeClass('fa-star').addClass('fa-star-o');
})
.on('mouseleave', function (e) {
  // empty all the stars except those with class .selected
  $('.rating-star').removeClass('fa-star').addClass('fa-star-o');
})
.on('click', function(e) {
  var rating = $(e.target).data('rating');
  setRating(rating);
})
.on('keyup', function(e){
  // if spacebar is pressed while selecting a star
  if (e.keyCode === 32) {
    // set rating (same as clicking on the star)
    var rating = $(e.target).data('rating');
    setRating(rating);
  }
});
};

const VehicleItemModal = data => {
  const [renterDetailes, setRenterDetailes] = useState(null);
const [error, setError] = useState('');

  const sendRate = async (num) => {
    try{
      const docRef = doc(db, "vehicles", data.id);
      const rateArray = data.rate;
      await updateDoc(docRef, {
        'rate': [...rateArray, num]
    });
      } catch(e){
        console.log(e);
        setError('Unexpected error occurred\n please try again later');
      }
  };

  const getRate = ()=> {
      for (let stars = 5; stars > 0; stars--) {
        if(document.getElementById(`rating-${stars}`).classList.contains('selected')){
          sendRate(stars);
          return;
        }
      }
    };

  const getRenterDetailes = async () => {
    const userName = data.renter;
    const userDocRef = doc(db, USERS, userName);
    getDoc(userDocRef).then((userDocSnap) => {
      if(!userDocSnap.exists()){
        setError('Unexpected error occurred\n please try again later');
        return;
      }
      const renterData = userDocSnap.data();
      setRenterDetailes(renterData);
      document.getElementById(`card-${data.id}`)?.click();
      });
  };

  useEffect(() => {
    loadRate();
  },[])

  return <div id={`simpleModal_${data.id}`} className="modal">
            <div className="modal-window large">
              <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">{data.type}</h2>
                    <button className='close-modal-btn' data-dismiss="modal">X</button>                  
              </div>
              <div className="modal-body">
                    {data.imagesUrls.length ? data.imagesUrls.map(imgUrl => <img width='300px' key={imgUrl} src={imgUrl} alt=''/>)  : <img width='300px' src='/no-img.jpg' alt=''/>}
                    <p>{data.desc}</p>
                    <div>{data.price} $ For houre</div>
                    <div className='rate-title'>I know this item and want to rate:</div>
                    <div className='rate' onClick={getRate}>
                        <form>
                        <input type="number" name="rating" id="rating-input" min="1" max="5" style={{display: 'none'}} />
                        </form>
                        <div className="rating" role="optgroup">
                          <i className="fa fa-star-o fa-2x rating-star" id="rating-1" data-rating="1" tabIndex="0" aria-label="Rate as one out of 5 stars" role="radio"></i>
                          <i className="fa fa-star-o fa-2x rating-star" id="rating-2" data-rating="2" tabIndex="0" aria-label="Rate as two out of 5 stars" role="radio"></i>
                          <i className="fa fa-star-o fa-2x rating-star" id="rating-3" data-rating="3" tabIndex="0" aria-label="Rate as three out of 5 stars" role="radio"></i>
                          <i className="fa fa-star-o fa-2x rating-star" id="rating-4" data-rating="4" tabIndex="0" aria-label="Rate as four out of 5 stars" role="radio"></i>
                          <i className="fa fa-star-o fa-2x rating-star" id="rating-5" data-rating="5" tabIndex="0" aria-label="Rate as five out of 5 stars" role="radio"></i>
                        </div>      
                     </div>
                </div>
                  <div className="modal-footer">
                    {!renterDetailes ?
                    <button type="button" className="btn btn-primary" onClick={getRenterDetailes}>Contact Renter</button>
                        :<div className='contact-renter'>
                        <a href={`tel:+${renterDetailes.phoneNumber}`}><i className="fa fa-phone fa-2x" aria-hidden="true"></i></a>
                        {renterDetailes.hasWhatsapp && <a target="_blank" href={`https://wa.me/${renterDetailes.phoneNumber}/?text=I'm%20interested%20in%20hearing%20more%20about%20your%20vehicle`}><i className="fa fa-whatsapp green-color fa-2x" aria-hidden="true"></i></a>}
                        <a href={`mailto:${renterDetailes.email?.replaceAll('"', '')}`}> <i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                    </div>
                    }
                    <div className='error'>{error}</div>
                  </div>
            </div>
          </div>
};

export default VehicleItemModal;