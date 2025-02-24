import { Card, Col, Container, Row } from "react-bootstrap"
import { Pencil } from "react-bootstrap-icons"

function Profile() {
    return(
        <>
            <Container className="mt-4">
                <Row>
                    <Col>
                        <Card className="position-relative">
                            <Card.Img  variant="top" src="https://fastly.picsum.photos/id/569/180/100.jpg?hmac=6mJtfv29xTFKnoJek41sH5-F4br3ykBkqLCx-Zrov60" />
                            <div className="position-absolute" style={{marginTop:"150px",}}>
                                <img src="https://picsum.photos/200/200" alt="" style={{border:"solid 5px white", borderRadius: "50%", margin: "3rem"}} />
                            </div>
                            <div className="position-absolute end-0 bg-white p-2 m-2" style={{borderRadius:"60%"}}>
                                <Pencil className="fs-5  " ></Pencil>
                            </div>
                            <Card.Body>
                            <Card.Text>Some quick example text to build on the card title and make up the bulk of the content.</Card.Text>
                            </Card.Body>
                        </Card>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile