import React from 'react';
import { DBStarter } from './components/db-starter';
import { Row, Col, Button, Container, Table } from 'react-bootstrap';

export class Home extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            searchValue: "",
            apiResponse: []
        };
    }
    search = (field) => {

        const data = { field, value: this.state.searchValue };
        fetch(`http://localhost:9000/api/city/findByField/?field=${encodeURIComponent(data.field)}&value=${encodeURIComponent(data.value)}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({ apiResponse: res })
            });
    }

    render() {
        return (
            <Container>
                <DBStarter></DBStarter>
                <Row>
                    <Col md={12}>
                        <h3>Buscador</h3>
                        <input onChange={(e) => { this.setState({ searchValue: e.target.value }) }} />
                        <Row>
                            <Col>
                                <Button onClick={() => this.search("city")}>Ciudad</Button>
                            </Col>
                            <Col>
                                <Button onClick={() => this.search("state")}>Estado</Button>
                            </Col>
                            <Col>
                                <Button onClick={() => this.search("country")}>Pais</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12} style={{ marginTop: 20 }}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ciudad</th>
                                    <th>Estado</th>
                                    <th>Pais</th>
                                    <th>Poblacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.apiResponse.map((city) => {
                                    return (
                                        <tr>
                                            <td>{city.ID_CITY}</td>
                                            <td>{city.CITY_NAME}</td>
                                            <td>{city.STATE_NAME}</td>
                                            <td>{city.COUNTRY_NAME}</td>
                                            <td>{city.POPULATION}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>

                    </Col>
                </Row>

            </Container>
        )
    }
}