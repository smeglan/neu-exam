import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export class DBStarter extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            apiResponse : ""
        }
    }
    loadData = () => {
        fetch("http://localhost:9000/api/city/initialize")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    render() {
        return (
            <Row>
                <Col>
                    <p>Si la base de datos no tiene registros, presione este botón</p>
                    <Button onClick={this.loadData}>Inicializar base de datos</Button>
                    <p>{this.state.apiResponse}</p>
                </Col>
            </Row>
        )
    }
}