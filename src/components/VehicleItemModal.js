import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase-config';

const USERS = 'users';


const VehicleItemModal = data => {

  const [renterDetailes, setRenterDetailes] = useState(null);
  const getRenterDetailes = async () => {
    const userName = data.renter;
    const userDocRef = doc(db, USERS, userName);
    getDoc(userDocRef).then((userDocSnap) => {
      if(!userDocSnap.exists()){
        //TO DO:  add error
        return;
      }
      const renterData = userDocSnap.data();
      console.log('!dataaa',renterData);
      setRenterDetailes(renterData);
      console.log('!`card-${data.id}`',`card-${data.id}`);
      console.log('!document.getElementById(`card-${data.id}`)',document.getElementById(`card-${data.id}`));
      document.getElementById(`card-${data.id}`).click();
      });
  };

  console.log('data',data);
    return <>
            <div className="modal fade" id={`exampleModalToggle${data.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">{data.type}</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    {data.imagesUrls.map(imgUrl => <img width='300px' key={imgUrl} src={imgUrl} alt=''/>)}
                    <p>{data.desc}</p>
                    {data.price} $ For houre
                  </div>
                  <div className="modal-footer">
                    {!renterDetailes ?
                    <button type="button" className="btn btn-primary" onClick={getRenterDetailes}>Contact Renter</button>
                    : <div className='contact-renter'>
                      <a href={`tel:+${renterDetailes.phoneNumber}`}><i className="fa fa-phone fa-2x" aria-hidden="true"></i></a>
                      <a target="_blank" href={`https://wa.me/${renterDetailes.phoneNumber}/?text=I'm%20interested%20in%20hearing%20more%20about%20your%20vehicle`}><i className="fa fa-whatsapp fa-2x" aria-hidden="true"></i></a>
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