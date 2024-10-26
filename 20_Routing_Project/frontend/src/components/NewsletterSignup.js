import { useFetcher, Form } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
    const fetcher = useFetcher();
    // we use this hook to get availability to a new 'form' -> fetcher.Form. This is NOT the same as the <Form>
    // from react-router-dom. This new way of submitting allows us to still trigger an action (or loader) BUT it will not
    // initialize a route transition. So we will not navigate to the page to which the loader/action belongs.

    // we can also use other functions with fetcher WITHOUT navigating to another route.
    const { data, state } = fetcher;

    useEffect(()=>{
        if( state === 'idle' && data && data.message){
            window.alert(data.message);
        }
    }, [data,state]);

    return (
        <fetcher.Form
            method="post"
            action="/newsletter" // to trigger the action of this route.
            className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;