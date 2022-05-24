import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { db } from '../firebase-config';

const Mailbox = ({isAuth, userName}) => {
    const [inbox, setInbox] = useState([]);
    const [outbox, setOutbox] = useState([]);
    const [boxToDisplay, setBoxToDisplay] = useState('in');
    const [msgToReply, setMsgToReply] = useState('');
    let navigate = useNavigate();

    const getMessages = async () => {
        try{
            const qIn = query(collection(db, 'mail-box'), where("to", "==", userName), orderBy('date'));
            const resDocIn = await getDocs(qIn);
            setInbox(resDocIn.docs.map(doc => {
                let date = new Date( doc.data().date.toDate()).toISOString();
                date = date?.split('T')[0] + ' ' + date?.split('T')[1].split('.')[0]
                return {...doc.data(), date};
            }));
            const qOut = query(collection(db, 'mail-box'), where("from", "==", userName), orderBy('date'));
            const resDocOut = await getDocs(qOut);
            setOutbox(resDocOut.docs.map(doc => {
                let date = new Date( doc.data().date.toDate()).toISOString();
                date = date?.split('T')[0] + ' ' + date?.split('T')[1].split('.')[0]
                return {...doc.data(), date};
            }));
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

      const getInbox = () => {
          return inbox.map((msg, ind) => <div className='mail-card' key={ind}>
          <div className='msg-card'>
              <div className='msg-card-header'>
                 <div className='from'> {msg.from}</div>
                 <div className='msg-date'>  {msg.date}</div>
              </div>
              <div className='msg-card-body'>{msg.message}</div>
              <div className='msg-card-footer'>
              <button onClick={() => document.getElementById(`reply-msg-inbox-${ind}`).style.display = 'flex'}>Reply</button>
              <div className='reply-msg' id={`reply-msg-inbox-${ind}`}>
              <textarea onChange={(e)=> setMsgToReply(e.target.value)}></textarea>
              <button onClick={() => sendMsg({to: msg.from, ind})}>Send</button>
              </div> 
              <div className='approve' id={`approve-${ind}`}>message sent</div>
              </div>         
            </div>
      </div>);
      };

      const getOutbox = () => {
          return outbox.map(msg => <div className='mail-card' key={msg}>
          <div className='msg-card'>
              <div className='msg-card-header'>
                 <div className='from'> {msg.from}</div>
                 <div className='msg-date'>  {msg.date}</div>
              </div>
              <div className='msg-card-body'>{msg.message}</div>
          </div>
      </div>);
      };

      useEffect(() => {
        if(!isAuth) navigate('/signin');
        getMessages();
      },[]);

    return (
        <div className='mail-box'>
            <h1>Mail Box</h1>
            {
               <nav className='mailbox-nav'>
               <div className='inbox-btn' onClick={() => setBoxToDisplay('in')}>Inbox</div>
               <div className='outbox-btn' onClick={() => setBoxToDisplay('out')}>Outbox</div>
             </nav>
            }   
            {
                boxToDisplay === 'in' ?
                getInbox() : getOutbox()
            }
        </div>
    );
};

export default Mailbox;