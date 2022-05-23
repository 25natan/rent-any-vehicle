import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';

const Mailbox = ({isAuth, userName}) => {
    const [mail, setMail] = useState([]);
    let navigate = useNavigate();

    const getMessages = async () => {
        try{
            const q = query(collection(db, 'mail-box'), where("to", "==", userName), orderBy('date'));
            const resDoc = await getDocs(q);
            setMail(resDoc.docs.map(doc => {
                let date = new Date( doc.data().date.toDate()).toISOString();
                date = date?.split('T')[0] + ' ' + date?.split('T')[1].split('.')[0]
                return {...doc.data(), date};
            }));
            } catch (error) {
                console.log(error);
            }
      };

      useEffect(() => {
        if(!isAuth) navigate('/signin');
        getMessages();
      },[]);

    return (
        <div>
            <h1>Mail Box</h1>
            {
                mail.map(msg => <div className='mail-card' key={msg}>
                    <div className='msg-card'>
                        <div className='msg-card-header'>
                           <div className='from'> From {msg.from}</div>
                           <div className='msg-date'> at {msg.date}</div>
                        </div>
                        <div className='msg-card-body'>{msg.message}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mailbox;