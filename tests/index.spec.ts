import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import request from 'supertest';
import app from '../src/index';

describe('GET /', () => {
    let server: any;

    before(() => {
        server = app.listen(9090);
    });

    after(() => {
        server.close();
    });

    it('should return "Welcome To TODO BackEnd"', async () => {
        const response = await request(app).get('/');
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Welcome To TODO BackEnd');
    });
});