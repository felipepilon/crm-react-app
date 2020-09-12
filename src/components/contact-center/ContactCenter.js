import React, { useState, useEffect, useContext } from 'react';
import { Paper, useTheme, Typography, Box } from '@material-ui/core';
import ContactReason from './ContactReason';
import { FormattedMessage } from 'react-intl';
import WhatsAppButton from './WhatsAppButton';
import PhoneCallButton from './PhoneCallButton';
import WhatsAppMsgPanel from './WhatsAppMsgPanel';
import PhoneCallPanel from './PhoneCallPanel';
import StoreSelect from '../fields/StoreSelect';
import SalesmanSelect from '../fields/SalesmanSelect';
import { AppStateContext } from '../../contexts/AppState';
import { 
    post_ContactUpdate,
} from '../../services/Contact';

const ContactCenter = (props) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const [ contact, setContact ] = useState({
        status: 'New',
        store_group_id: props.customer.store_group_id,
        customer_id: props.customer.customer_id,
    });
    const [ contactVia, setContactVia ] = useState(null);
    const [ errors, setErrors ] = useState({});

    const theme = useTheme();

    const handleWhatsAppButtonClick = () => handleContactViaSelected('WhatsApp');

    const handlePhoneCallButtonClick = () => handleContactViaSelected('Phone Call');

    const handleContactViaSelected = (newContactVia) => {
        let newErrors = {}

        if (!contact.store_id)
            newErrors.store_id = 'Select a store';

        if (!contact.salesman_id)
            newErrors.salesman_id = 'Select a salesman';

        if (!contact.reasons)
            newErrors.reasons = { h: 'At least one reason is required' };

        if (contact.reasons && contact.reasons.includes('Another')) {
            if (!contact.another_reason || !contact.another_reason.trim().length)
                newErrors.another_reason = 'Inform details for the contact';
            else if (contact.another_reason.trim().length < 5)
                newErrors.another_reason = 'It must have at least 5 digits';
        }

        setErrors(newErrors);
        
        if (!Object.keys(newErrors).length)
            setContactVia(newContactVia);
    }

    const handleSalesmanIdChange = (salesman_id) => setContact({ ...contact, ...{salesman_id}, });

    const handleStoreIdChange = (store_id) => setContact({ ...contact, ...{store_id}, });

    const handleReasonsChange = (reasons) => setContact({ ...contact, ...{reasons}, });

    const handleAnotherReasonChange = (another_reason) => setContact({ ...contact, ...{another_reason}, });

    const handleEndContact = () => {
        post_ContactUpdate({
            contact_id: contact.contact_id,
            status: 'Completed',
            contact_end_date: new Date(),
        })
        .then(() => {
            setContact({
                status: 'New',
                store_group_id: contact.store_group_id,
                customer_id: contact.customer_id,
                store_id: contact.store_id,
                salesman_id: contact.salesman_id,
            });
            setContactVia(null);
            props.setContactsLastUpdate(new Date());
            setSucessSnack('Contacted registered successully');
        });
    }

    useEffect(() => {
        const {salesman_id, ...other} = errors;
        if (salesman_id)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.salesman_id])

    useEffect(() => {
        const {reasons, ...other} = errors;
        if (reasons)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.reasons])

    useEffect(() => {
        const {another_reason, ...other} = errors;
        if (another_reason)
            setErrors(other);
    // eslint-disable-next-line
    }, [contact.another_reason]);

    const disabled = contact.status !== 'New';

    return (
        <Paper style={{ height: '100%', padding: theme.spacing(1), boxSizing: 'border-box' }}>
            <Box
                display='flex'
                width='100%'
                height='100%'
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    width='50%'
                    margin={1}
                >
                    <Typography variant='h6'><FormattedMessage id='Contact Customer'/></Typography>
                    <StoreSelect
                        store_id={contact.store_id}
                        error={errors.store_id}
                        handleStoreIdChange={handleStoreIdChange}
                        disabled={disabled}
                    />
                    <SalesmanSelect
                        store_id={contact.store_id}
                        salesman_id={contact.salesman_id}
                        error={errors.salesman_id}
                        handleSalesmanIdChange={handleSalesmanIdChange}
                        disabled={disabled}
                    />
                    <ContactReason 
                        reasons={contact.reasons}
                        another_reason={contact.another_reason}
                        reasonError={errors.reasons && errors.reasons.h}
                        anotherReasonError={errors.another_reason}
                        handleReasonsChange={handleReasonsChange}
                        handleAnotherReasonChange={handleAnotherReasonChange}
                        disabled={disabled}
                    />
                    <Typography 
                        variant='body2' 
                        style={{
                            marginTop: theme.spacing(2),
                            color: disabled ? theme.palette.text.disabled : null
                        }}
                    >
                        <FormattedMessage id='Contact Via'/>
                    </Typography>
                    <Box display='flex'>
                        <WhatsAppButton 
                            handleClick={handleWhatsAppButtonClick} 
                            contactVia={contactVia}
                            disabled={disabled}    
                        />
                        <PhoneCallButton 
                            handleClick={handlePhoneCallButtonClick} 
                            contactVia={contactVia}
                            disabled={disabled}    
                        />
                    </Box>
                </Box>
                <Box
                    flex='1'
                >
                    {
                        contactVia ?
                        contactVia === 'Phone Call' ?
                        <PhoneCallPanel 
                            customer={props.customer} 
                            contact={contact}
                            contactVia={contactVia}
                            setContact={setContact}
                            handleEndContact={handleEndContact}
                        /> :
                        <WhatsAppMsgPanel 
                            customer={props.customer} 
                            contact={contact}
                            contactVia={contactVia}
                            setContact={setContact}
                            handleEndContact={handleEndContact}
                        /> :
                        null
                    }
                </Box>
            </Box>
        </Paper>
    );
}
 
export default ContactCenter;