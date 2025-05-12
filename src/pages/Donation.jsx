import { useEffect, useState } from 'react';
import { Row, Col, Card, Container, Modal, Form, Button} from 'react-bootstrap';

/*------------------------------------ variables ------------------------------------*/
const TX_SUCCESS_CODE = 200;

/*------------------------------------ functions ------------------------------------*/
const is_login = () => {
    return true;
}
const get_accountAddress = async () => {

    const accountAddress = '0x987654';
    return Promise.resolve(accountAddress);
}
const get_disasterList = async () => {
    const items = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            title: `Donation ${i + 1}`,
            donationAddress: `0x1234abcd...${i + 1}`,
            image: 'https://media.istockphoto.com/id/1413100088/zh/%E5%90%91%E9%87%8F/koala-sitting-winking-cute-creative-kawaii-cartoon-mascot-logo.jpg?s=612x612&w=0&k=20&c=OTt5kJdzWSKgHiJX2cIN4UDIn0D5ai5d6QxY3doNMHU='
        }))
    return Promise.resolve(items);
};
const donate = async (disaster_id, amount) => {

    const accountAddress = await get_accountAddress();
    console.log(`帳號${accountAddress}，已對災難${disaster_id}進行捐款$${amount}`);
    const tx_status = 200;
    const date = new Date().toLocaleDateString();
    const tx_hash = '0x123456';
    const gas_fee = 0.0001;
    const result = {
        _tx_status : tx_status,
        _date : date,
        _tx_hash : tx_hash,
        _gas_fee : gas_fee
    }
    return Promise.resolve(result);
}

/*------------------------------------ react dom ------------------------------------*/
const Donation = () => {

    const [items, setItems] = useState([]);
    const [amounts, setAmounts] = useState({});
    const [donateModalId, setDonateModalId] = useState(null);
    const [showDonate, setShowDonate] = useState(false);
    const [showDonateSuccess, setShowDonateSuccess] = useState(false);
    const [errorModalMsg, setErrorModalMsg] = useState('');
    const [accountAddress, setAccountAddress] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [txHash, setTxHash] = useState('');
    const [gasFee, setGasFee] = useState(0);

    const initialize_items = async () => {

        const data = await get_disasterList();
        setItems(data);
    };
    const initialize_accountAddress = async () => {

        const aa = await get_accountAddress();
        setAccountAddress(aa);
    }

    const handleAmountChange = (id, value) => {
        setAmounts((other) => ({
            ...other,
            [id]: value,
        }));
    };

    const currentItem = items.find((item) => item.id === donateModalId);

    const handleDonateButtonClick = (item) => {

        if (!is_login()) {
            setErrorModalMsg('請先登入才能捐款');
            return;
        }

        const inputAmount = amounts[item.id];

        if (!inputAmount || parseFloat(inputAmount) <= 0) {
            setErrorModalMsg('請輸入有效的捐款金額');
            return;
        }

        // 都檢查通過，開啟確認視窗
        setDonateModalId(item.id);
        setShowDonate(true);
    };

    const handleDonate = async ()=>{


        const disaster_id = currentItem.id;
        const amount = amounts[currentItem.id];
        const tx_result = await donate(disaster_id, amount);

        if (tx_result._tx_status === TX_SUCCESS_CODE){
            setDate(tx_result._date);
            setTxHash(tx_result._tx_hash);
            setGasFee(tx_result._gas_fee);
            setShowDonateSuccess(true);
        }else{
            setErrorModalMsg('交易失敗，系統維修中');
        }
    };


    useEffect(() => {
        initialize_items();
        initialize_accountAddress();
    }, []);

    return (
        <Container>
            <h1 style={{fontSize: 50, color: 'white'}}>Donation</h1>
            <Row className="mt-4">
                {items.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={4} className="mb-4">
                        <Card>
                            <Card.Body className="text-center">
                                <Card.Title className="fw-bold fs-2">{item.title}</Card.Title>
                            </Card.Body>
                            <Card.Img variant="top" src={item.image} style={{ height: '200px', objectFit: 'contain' }} />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div className="text-center">
                                    <Card.Text>
                                        <strong>捐款地址：</strong> {item.donationAddress}
                                    </Card.Text>

                                    <div className="d-flex justify-content-center align-items-center gap-2 mb-2 mt-2">
                                        <strong>捐款金額：</strong>
                                        <Form.Control
                                            type="number"
                                            placeholder="輸入金額"
                                            step="0.001"
                                            style={{ width: '120px' }}
                                            value={amounts[item.id] || ''}
                                            onChange={(e) => handleAmountChange(item.id, e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* 右下角捐款按鈕 */}
                                <div className="d-flex justify-content-end">
                                    <Button variant="primary" onClick={() => handleDonateButtonClick(item)}>捐款</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 捐款 彈出視窗 */}
            <div className="isolate relative z-50">
                <Modal show={showDonate} onHide={() => setShowDonate(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>確定捐款嗎？</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        {currentItem && (
                            <>
                                <h5 className="mb-3 fw-bold fs-2">{currentItem.title}</h5>
                                <img
                                    src={currentItem.image}
                                    alt={currentItem.title}
                                    className="img-fluid mb-3"
                                />
                                <div className="text-start">
                                    <p><strong>捐款地址:</strong> {currentItem.donationAddress}</p>
                                    <p><strong>錢包地址:</strong> {accountAddress}</p>
                                    <p><strong>捐款金額:</strong> ${amounts[currentItem.id]}</p>
                                    <p><strong>捐款日期:</strong> {new Date().toLocaleDateString()}</p>
                                </div>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDonate(false)}>
                            取消
                        </Button>
                        <Button variant="success" onClick={() => {setShowDonate(false);handleDonate()}}>
                            確認捐款
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* 捐款成功 彈出視窗 */}
            <Modal show={showDonateSuccess} onHide={() => setShowDonateSuccess(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>捐款成功</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {currentItem && (
                        <>
                            <h5 className="mb-3 fw-bold fs-2">{currentItem.title}</h5>
                            <img
                                src={currentItem.image}
                                alt={currentItem.title}
                                className="img-fluid mb-3"
                            />
                            <div className="text-start">
                                <p><strong>捐款地址:</strong> {currentItem.donationAddress}</p>
                                <p><strong>錢包地址:</strong> {accountAddress}</p>
                                <p><strong>捐款金額:</strong> ${amounts[currentItem.id]}</p>
                                <p><strong>捐款日期:</strong> {date}</p>
                                <p><strong>交易 hash:</strong> {txHash}</p>
                                <p><strong>gas fee:</strong> {gasFee}</p>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowDonateSuccess(false);setDonateModalId(null)}}>
                        關閉
                    </Button>
                </Modal.Footer>
            </Modal>


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

export default Donation