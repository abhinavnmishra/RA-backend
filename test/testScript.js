const assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


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
                .get('/foodItem?token=de0886678687731f26616f6b18a5ccd5c55058a0dd0ea03413456a99e652')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    describe('/POST foodItem', () => {
        it('it should create a food item', (done) => {
            let foodItem = {
                "name": "Chicken Soup",
                "type": "non-veg",
                "price": 200,
                "description": "Chicken curry is a dish originating from the Indian subcontinent. It is common in the Indian subcontinent, Southeast Asia, Great Britain, and the Caribbean.",
                "rating": "5",
                "url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cookingclassy.com%2Fchicken-curry%2F&psig=AOvVaw2k0MN1rj5oVs93mOt1usIF&ust=1638187928227000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjPqd6Du_QCFQAAAAAdAAAAABAD"
            }
            chai.request(server)
                .post('/foodItem/new?token=de0886678687731f26616f6b18a5ccd5c55058a0dd0ea03413456a99e652')
                .send(foodItem)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.type.should.be.eql(foodItem.type);
                    res.body.name.should.be.eql(foodItem.name);
                    // res.body.errors.should.have.property('pages');
                    // res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });

    });

});

