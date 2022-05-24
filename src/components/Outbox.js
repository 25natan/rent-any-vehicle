import React from 'react';

const Outbox = ({outbox}) => {
    return outbox.map((msg, ind) => <div className='mail-card' key={ind}>
    <div className='msg-card'>
        <div className='msg-card-header'>
           <div className='from'> {msg.from}</div>
           <div className='msg-date'>  {msg.date}</div>
        </div>
        <div className='msg-card-body'>{msg.message}</div>
    </div>
</div>);
};

export default Outbox;