import { useContext } from "react";
import data from '../data_cartItems';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

export default function CartScreen() {
    const cartItems = data.products;
    return (
        <div>
            {/* <Helmet> */}
                <title>Shopping Cart</title>
            {/* </Helmet> */}
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <div><p>no items found</p></div>
                    ) : (
                    <div className="selected_products">
                    { cartItems.map((item)=>(
                        <ListGroup.Item key={item.id}>
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="img-fluid rounded img-thumbnail"></img>{' '}
                                </Col>
                                <Col md={3}>
                                    <span>{item.quantity}</span>{' '}
                                </Col>
                                <Col md={3}>${item.price}</Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </div>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a,c)=> a+c.quantity,0)}{' '}items 
                                        : ${cartItems.reduce((a,c)=> a+c.price * c.quantity, 0)})
                                    </h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button
                                        type="button"
                                        variant="primary"
                                        disabled={cartItems.length === 0}
                                    >
                                        Proceed to checkout
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
