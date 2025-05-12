import { useEffect, useState } from 'react';
import { Row, Col, Card, Container, Modal, Button} from 'react-bootstrap';

/*------------------------------------ variables ------------------------------------*/

/*------------------------------------ functions ------------------------------------*/
const is_login = () => {
    return true;
}
const get_accountAddress = async () => {

    const accountAddress = '0x987654';
    return Promise.resolve(accountAddress);
}
const get_myDonations = async () => {

    const accountAddress = await get_accountAddress();
    console.log(`查詢帳號${accountAddress}捐款紀錄`);
    const items = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            title: `Donation ${i + 1}`,
            donationAddress: `0x1234abcd...${i + 1}`,
            image: 'https://media.istockphoto.com/id/1413100088/zh/%E5%90%91%E9%87%8F/koala-sitting-winking-cute-creative-kawaii-cartoon-mascot-logo.jpg?s=612x612&w=0&k=20&c=OTt5kJdzWSKgHiJX2cIN4UDIn0D5ai5d6QxY3doNMHU=',
            totalAmount : 10,
            dates : ['2025/05/12', '2025/05/13', '2025/05/14'],
            votePer : 0.75512
        }))
    return Promise.resolve(items);
};


/*------------------------------------ react dom ------------------------------------*/
const DonationLookup = () => {

    const [items, setItems] = useState([]);
    const [errorModalMsg, setErrorModalMsg] = useState('');

    const initialize_items = async () => {

        const data = await get_myDonations();
        setItems(data);
    };

    useEffect(() => {
        initialize_items();
    }, []);

    return (
        <Container>
            <h1 style={{fontSize: 50, color: 'white'}}>Donation Record</h1>
            <Row className="mt-4">
                {items.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={4} className="mb-4">
                        <Card>
                            <Card.Body className="text-center">
                                <Card.Title className="fw-bold fs-2">{item.title}</Card.Title>
                            </Card.Body>
                            <Card.Img variant="top" src={item.image} style={{ height: '200px', objectFit: 'contain' }} />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div style={{ textAlign: "left" }}>
                                        <Card.Text style={{ display: "flex" }}>
                                            <strong style={{ width: "6em" }}>捐款地址：</strong> {item.donationAddress}
                                        </Card.Text>

                                        <Card.Text style={{ display: "flex" }}>
                                            <strong style={{ width: "6em" }}>捐款金額：</strong> ${item.totalAmount}
                                        </Card.Text>

                                        <Card.Text style={{ display: "flex", alignItems: "start" }}>
                                            <strong style={{ width: "6em" }}>捐款時間：</strong>
                                            <div>
                                                {item.dates[0]}
                                                <ul>
                                                    {item.dates.slice(1).map((date, idx) => (
                                                        <li key={idx}>{date}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Card.Text>

                                        <Card.Text style={{ display: "flex" }}>
                                            <strong style={{ width: "6em" }}>投票份額：</strong> {item.votePer * 100}%
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Error彈出視窗 */}
            <Modal show={!!errorModalMsg} onHide={() => setErrorModalMsg('')} centered>
                <Modal.Body>{errorModalMsg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setErrorModalMsg('')}>
                        關閉
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default DonationLookup