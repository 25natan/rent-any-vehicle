import { doc, Firestore, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { db } from '../firebase-config';
import { loadRate } from '../rateHelper';

const USERS = 'users';

const VehicleItemModal = (data, currentUserName) => {
  const [renterDetailes, setRenterDetailes] = useState(null);
  const [message, setMessage] = useState('');
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

  const msgToMailBox = async () => {
    try{
    const userDocRef = doc(db, 'mail-box', v4());
    const now = Timestamp.now()
    await setDoc(userDocRef, {message: message, from: currentUserName, to: data.renter, vehicle: data.id, date: now});
    document.getElementById('msgToMailBox').style.display = 'none';
    document.getElementById(`approve-${data.id}`).style.display = 'flex';
    } catch (error) {
      console.log(error);
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
                    {data.imagesUrls.length ? data.imagesUrls.map(imgUrl => <img className='vehicle-img' width='300px' key={imgUrl} src={imgUrl} alt=''/>)  : <img width='300px' src='/no-img.jpg' alt=''/>}
                    <p>{data.desc}</p>
                    <div className='detiles'>
                      <div className='rentre-name'>
                      <img className='user-icon' src='/user-icon.jpg' alt=''></img>
                      <div className='renterName'>{data.renter}</div>
                      </div>
                    <div className='modai-price'>{data.price} $ For houre</div>
                    <div className='location'>{data.placeName}</div>
                      <div className='distance'>{data.distance?.toFixed(1)} km</div> 
                      </div>   
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
                          <button className='inmail-msg' onClick={() => document.getElementById('msgToMailBox').style.display = 'flex'}>send message to mail box</button>
                          <div className='msgToMailBox' id="msgToMailBox">
                            <textarea onChange={(e)=> setMessage(e.target.value)}></textarea> 
                            <button onClick={msgToMailBox}>Send</button>
                            </div>
                        <a href={`tel:+${renterDetailes.phoneNumber}`}><i className="fa fa-phone fa-2x" aria-hidden="true"></i></a>
                        {renterDetailes.hasWhatsapp && <a target="_blank" href={`https://wa.me/${renterDetailes.phoneNumber}/?text=I'm%20interested%20in%20hearing%20more%20about%20your%20vehicle`}><i className="fa fa-whatsapp green-color fa-2x" aria-hidden="true"></i></a>}
                        <a href={`mailto:${renterDetailes.email?.replaceAll('"', '')}`}> <i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                    </div>
                    }
                    <div className='approve' id={`approve-${data.id}`}>message sent</div>
                    <div className='error'>{error}</div>
                  </div>
            </div>
          </div>
};

export default VehicleItemModal;