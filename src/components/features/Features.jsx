import Row from '../ui/Row';
import classes from './Features.module.css';
import Item from './Item';

const Features = () => {
    return (
        <div className={classes.features}>
            <Row>
                <Item image='/assets/guarantee.png' text='Guarantee'/>
                <Item image='/assets/return.png' text='Return'/>
                <Item image='/assets/customer-service.png' text='24 hours support'/>
                <Item image='/assets/delivery-box.png' text='Express Post'/>
            </Row>
        </div>
    )
}

export default Features
