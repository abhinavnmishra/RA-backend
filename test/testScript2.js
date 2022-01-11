let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let XLSX = require('xlsx')
let workbook = XLSX.readFile('test/testcase2.xlsx');
let sheet_name_list = workbook.SheetNames;
let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


chai.use(chaiHttp);

describe("User Account", () => {

    before(() => {
        console.log( "Running tests for customer account creation and authentication" );
    });

    after(() => {
        console.log( "Finished running tests for food item APIs" );
    });


    xlData.forEach(function (item, index) {

        let token = ''
        describe('/POST customer', () => {
            it('it should create a customer account ' + item.name, (done) => {
                chai.request(server)
                    .post('/customer/new')
                    .send(item)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.message.should.be.eql(true);
                        done();
                    });
            });

        });

        describe('/GET login', () => {
            it('it should login into customer account created', (done) => {
                chai.request(server)
                    .get('/authentication/login')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('token');
                        res.body.message.should.be.eql(true);
                        token = res.body.token;
                        done();
                    });
            });
        });

        describe('/GET foodItem', () => {
            it('it should GET all the foodItems', (done) => {
                chai.request(server)
                    .get('/foodItem?token='+token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });

        let logoutBody = {token: token};

        describe('/POST logout', () => {
            it('it should logout ' + item.name, (done) => {
                chai.request(server)
                    .post('/authentication/logout')
                    .send(logoutBody)
                    .end((err, res) => {
                        res.should.have.status(200);
                        //res.body.message.should.be.eql(true);
                        done();
                    });
            });

        });

    });

});

