import { sendRate } from 'firebase/auth';
import { collection, doc, getDoc, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase-config';

const USERS = 'users';


const VehicleItemModal = data => {

  const [renterDetailes, setRenterDetailes] = useState(null);

  const sendRate = async (num) => {
    console.log('rate',num);
    try{
  
const docRef = doc(db, "vehicles", data.id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
        console.log(doc.data);
        // await updateDoc(vehicleRef, {
        //   capital: true
        // });
}
      } catch(e){
        console.log(e);
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
        //TO DO:  add error
        return;
      }
      const renterData = userDocSnap.data();
      setRenterDetailes(renterData);
      document.getElementById(`card-${data.id}`).click();
      });
  };
  return <>
            <div className="modal fade" id={`exampleModalToggle${data.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"  >
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">{data.type}</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    {data.imagesUrls.map(imgUrl => <img width='300px' key={imgUrl} src={imgUrl} alt=''/>)}
                    <p>{data.desc}</p>
                    <div>{data.price} $ For houre</div>
                    <div className='rate'>I want to rate</div>
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
                    : <div className='contact-renter'>
                      <a href={`tel:+${renterDetailes.phoneNumber}`}><i className="fa fa-phone fa-2x" aria-hidden="true"></i></a>
                      <a target="_blank" href={`https://wa.me/${renterDetailes.phoneNumber}/?text=I'm%20interested%20in%20hearing%20more%20about%20your%20vehicle`}><i className="fa fa-whatsapp green-color fa-2x" aria-hidden="true"></i></a>
                      <a href={`mailto:${renterDetailes.email?.replaceAll('"', '')}`}> <i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                   </div>
                    }
                  </div>
                </div>
              </div>
            </div>
    </>
};

export default VehicleItemModal;