import React from 'react';

const VehicleItemModal = data => {
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
                    <button type="button" className="btn btn-primary">Contact Renter</button>
                  </div>
                </div>
              </div>
            </div>
    </>
};

export default VehicleItemModal;