const assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let XLSX = require('xlsx')
let workbook = XLSX.readFile('test/testcase.xlsx');
let sheet_name_list = workbook.SheetNames;
let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


chai.use(chaiHttp);

describe("Food Items", () => {

    before(() => {
        console.log( "Running tests for food item APIs" );
    });

    after(() => {
        console.log( "Finished running tests for food item APIs" );
    });

    describe('/GET foodItem', () => {
        it('it should GET all the foodItems', (done) => {
            chai.request(server)
                .get('/foodItem?token=a2efd9ca8c7801784bab350273cf0f140f631065d7ad645cf0dfc3435ec7')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    xlData.forEach(function (item, index) {
        describe('/POST foodItem', () => {
            it('it should create a food item ' + item.name, (done) => {
                chai.request(server)
                    .post('/foodItem/new?token=a2efd9ca8c7801784bab350273cf0f140f631065d7ad645cf0dfc3435ec7')
                    .send(item)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.type.should.be.eql(item.type);
                        res.body.name.should.be.eql(item.name);
                        // res.body.errors.should.have.property('pages');
                        // res.body.errors.pages.should.have.property('kind').eql('required');
                        done();
                    });
            });

        });
    });

});

