import React, {useState} from 'react'
import "../TabMenu/tab.css";
// import Menu from "./menu";

const GalleryReact = ({allVehicles}) => {

    const [items, setItems] = useState(allVehicles);
    
    const filterItem = (vihecleType) => {
        const updatedItems = allVehicles.filter((curElem) => curElem.type === vihecleType);
        setItems(updatedItems);
    }

    return (
        <>
            <h1 className="mt-5 text-center main-heading">Order Your Favourite Dish</h1>
            <hr />
            
            <div className="menu-tabs container">
                <div className="menu-tab d-flex justify-content-around">
                    {vihecleTypes.map(vihecleType => <button className="btn btn-warning" onClick={() => filterItem(vihecleType)}>{vihecleType}</button>)}
                    {/* <button className="btn btn-warning" onClick={() => filterItem('breakfast')}>Breakfast</button>
                    <button className="btn btn-warning" onClick={() => filterItem('lunch')}>Lunch</button>
                    <button className="btn btn-warning" onClick={() => filterItem('evening')}>Evening</button>
                    <button className="btn btn-warning" onClick={() => filterItem('dinner')}>Dinner</button> */}
                    <button className="btn btn-warning" onClick={() => setItems(allVehicles)}>All</button>
                </div>
            </div>

            {/* my main items section  */}
            <div className="menu-items container-fluid mt-5">
                <div className="row">
                    <div className="col-11 mx-auto">
                        <div className="row my-5">
                            
                            {
                                items.map((elem) => {
                                    const { id, renter, imagesUrls, desc, price, type } = elem;
                                    console.log('elem',elem);
                                    return (
                                    
                                        <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4 my-5">
                                            <div className="row Item-inside">
                                                {imagesUrls &&
                                                <div className="col-12 col-md-12 col-lg-4 img-div">
                                                    <img src={imagesUrls[0]} alt={type} className="img-fluid"/>
                                                </div>
                                }

                                                {/* menu items description */}
                                                <div className="col-12 col-md-12 col-lg-8">
                                                    <div className="main-title pt-4 pb-3">
                                                        <h1>{type}</h1>
                                                        <p>{desc }</p>
                                                    </div>
                                                    <div className="menu-price-book">
                                                        <div className="price-book-divide d-flex justify-content-between ">
                                                            <h2>Price : {price}</h2>
                                                            <a href="#">
                                                                <button className="btn btn-primary">Order Now</button>
                                                            </a>
                                                        </div>
                                                        <p>*Prices may vary on selected date.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }

                             
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GalleryReact

const vihecleTypes = [
    "Private Car",
    "Van",
    "Taxi",
    "Bus",
    "Ambulance",
    "Skateboard",
    "Baby carriage",
    "Bicycle",
    "Mountain bike",
    "Scooter",
    "Motorcycle",
    "Fire engine",
    "Crane",
    "Forklift",
    "Tractor",
    "Recycling truck",
    "Cement mixer",
    "Dump truck",
    "Helicopter",
    "Airplane",
    "Carriage",
    "Rowboat",
    "Boat",
  ];
