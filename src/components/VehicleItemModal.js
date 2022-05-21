import { sendRate } from 'firebase/auth';
import { arrayUnion, collection, doc, getDoc, query, updateDoc, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { db } from '../firebase-config';
import $ from 'jquery';

const USERS = 'users';


const VehicleItemModal = data => {
  const [renterDetailes, setRenterDetailes] = useState(null);
  const [showRate, setShowRate] = useState(false);

  const sendRate = async (num) => {
    try{
      const docRef = doc(db, "vehicles", data.id);
      const rateArray = data.rate;
      await updateDoc(docRef, {
        'rate': [...rateArray, num]
    });
      } catch(e){
        console.log(e);
      }
  };

  const getRate = ()=> {
    console.log('1');
      for (let stars = 5; stars > 0; stars--) {
        if(document.getElementById(`rating-${stars}`).classList.contains('selected')){
          sendRate(stars);
          console.log('stars',stars);
          return;
        }
      }
    };

  const getRenterDetailes = async () => {
    const userName = data.renter;
    const userDocRef = doc(db, USERS, userName);
    getDoc(userDocRef).then((userDocSnap) => {
      if(!userDocSnap.exists()){
        //TO DO:  add error
        return;
      }
      const renterData = userDocSnap.data();
      setRenterDetailes(renterData);
      document.getElementById(`card-${data.id}`).click();
      });
  };

  return <div id={`simpleModal_${data.id}`} className="modal">
            <div className="modal-window large">
              <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">{data.type}</h2>
                    <button className='close-modal-btn' data-dismiss="modal">X</button>                  
              </div>
              <div className="modal-body">
                    {data.imagesUrls.map(imgUrl => <img width='300px' key={imgUrl} src={imgUrl} alt=''/>)}
                    <p>{data.desc}</p>
                    <div>{data.price} $ For houre</div>
                    <button className='rate' ovClick={()=> {document.getElementById('rate-erea').classList += ' show'}}>I want to rate</button>
                    <div className='rate' onClick={getRate}>
                      {/* {showRate && <> */}
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
                        {/* </> }*/}
                     </div>
                </div>
                  <div className="modal-footer">
                    {!renterDetailes ?
                    <button type="button" className="btn btn-primary" onClick={getRenterDetailes}>Contact Renter</button>
                        :<div className='contact-renter'>
                        <a href={`tel:+${renterDetailes.phoneNumber}`}><i className="fa fa-phone fa-2x" aria-hidden="true"></i></a>
                        <a target="_blank" href={`https://wa.me/${renterDetailes.phoneNumber}/?text=I'm%20interested%20in%20hearing%20more%20about%20your%20vehicle`}><i className="fa fa-whatsapp green-color fa-2x" aria-hidden="true"></i></a>
                        <a href={`mailto:${renterDetailes.email?.replaceAll('"', '')}`}> <i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                    </div>
                    }
                  </div>
            </div>
          </div>
};

export default VehicleItemModal;