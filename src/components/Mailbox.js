import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { db } from '../firebase-config';
import Inbox from './Inbox';
import Outbox from './Outbox';

const Mailbox = ({isAuth, userName}) => {
    const [inbox, setInbox] = useState([]);
    const [outbox, setOutbox] = useState([]);
    const [boxToDisplay, setBoxToDisplay] = useState('in');
    const [msgToReply, setMsgToReply] = useState('');
    let navigate = useNavigate();

    const fetchInbox = async () => {
        const qIn = query(collection(db, 'mail-box'), where("to", "==", userName), orderBy('date'));
        const resDocIn = await getDocs(qIn);
        setInbox(resDocIn.docs.map(doc => {
            let date = new Date( doc.data().date.toDate()).toISOString();
            date = date?.split('T')[0] + ' ' + date?.split('T')[1].split('.')[0]
            return {...doc.data(), date};
        }));
    };
    const fetchOutbox = async () => {
        const qOut = query(collection(db, 'mail-box'), where("from", "==", userName), orderBy('date'));
            const resDocOut = await getDocs(qOut);
            setOutbox(resDocOut.docs.map(doc => {
                let date = doc.data()?.date && new Date( doc.data().date.toDate()).toISOString();
                date = date?.split('T')[0] + '   ' + date?.split('T')[1].split('.')[0]
                return {...doc.data(), date};
            }));
    };

    const getMessages = async () => {
        try{
            fetchInbox();
            fetchOutbox();
            } catch (error) {
                console.log(error);
            }
      };

      const sendMsg = async ({to, ind}) => {
        try{
            const userDocRef = doc(db, 'mail-box', v4());
            const now = Timestamp.now()
            await setDoc(userDocRef, {message: msgToReply, from: userName, to, /*vehicle: data.id,*/ date: now});
            document.getElementById(`reply-msg-inbox-${ind}`).style.display = 'none';
            document.getElementById(`approve-${ind}`).style.display = 'flex';
            } catch (error) {
              console.log(error);
            }
      }

      useEffect(() => {
        if(!isAuth) navigate('/signin');
        getMessages();
      },[]);

    return (<div className='mail-box'>
            <h1>Mail Box</h1>
            {
               <nav className='mailbox-nav'>
               <div className={`inbox-btn${boxToDisplay === 'in' ? ' active-bar' : ''}`} onClick={async() => {await fetchInbox(); setBoxToDisplay('in')}}>Inbox</div>
               <div className={`outbox-btn${boxToDisplay === 'out' ? ' active-bar' : ''}`} onClick={async() => {await fetchOutbox(); setBoxToDisplay('out')}}>Outbox</div>
             </nav>
            }   
            {
                boxToDisplay === 'in' ?
                <Inbox inbox={inbox} setMsgToReply={setMsgToReply} sendMsg={sendMsg} /> : <Outbox outbox={outbox} />
            }
        </div>
    );
};

export default Mailbox;