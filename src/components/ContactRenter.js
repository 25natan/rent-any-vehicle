import React from 'react';

const ContactRenter = data => {
    return (
        <div>
             <ul>
                <li>
                    <a href="tel:+972-52-7699175"><i class="fa fa-phone" aria-hidden="true"></i> <span class="sr-only">phone</span>
                                052-7699-175
                    </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://wa.me/972587111575/?text=I'm%20interested%20in%20hearing%20more%20about%20Batya%20Art"><i class="fa fa-whatsapp" aria-hidden="true"></i> <span class="sr-only">whatsapp</span><span class="sr-only">whatsapp</span>058-7111-575
                            </a>
                        </li>
                        <li>
                            <a href="mailto:bassisiegel@gmail.com"> <i class="fa fa-envelope" aria-hidden="true"></i> <span class="sr-only">envelope</span>bassisiegel@gmail.com
                            </a>
                        </li>
                    </ul>
        </div>
    );
};

export default ContactRenter;