import React from 'react';

const Inbox = ({inbox, setMsgToReply, sendMsg}) => {
    return inbox.length ? inbox.map((msg, ind) => <div className='mail-card' key={ind}>
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
    </div>) : <img src='/empty-mailbox.jpeg' alt=''/>;
};

export default Inbox;