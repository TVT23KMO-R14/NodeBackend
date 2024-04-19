
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let expect = chai.expect;
chai.use(chaiHttp);


describe('Search', function() {
  this.timeout(5000);

  describe('Search', function() {
    it('should return results for a correct search query', async function() {
        const res = await chai.request(app)
            .get('/search/headersearch')
            .query({
                query: 'correct_query', 
                api_key: process.env.TMDB_API_KEY, 
                page: 1
            });

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object'); 
    });


    it('should return no results for a query with no matches', async function() {
        const res = await chai.request(app)
            .get('/search/headersearch')
            .query({
                query: 'no_matching_query',
                api_key: process.env.TMDB_API_KEY,
                page: 1
            });

        expect(res).to.have.status(200);
        expect(res.body.movies).to.be.an('array').that.is.empty;
        expect(res.body.tvShows).to.be.an('array').that.is.empty;
    });
});


describe('Search', function() {
  this.timeout(5000);

  it('should handle very long string queries', async function() {
      const longString = 'a'.repeat(30);
      const res = await chai.request(app)
          .get('/search/headersearch')
          .query({
              query: longString,
              api_key: process.env.TMDB_API_KEY,
              page: 1
          });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
  });


  it('should handle queries with special characters', async function() {
      const specialCharactersQuery = '@#$%^äö';
      const res = await chai.request(app)
          .get('/search/headersearch')
          .query({
              query: specialCharactersQuery,
              api_key: process.env.TMDB_API_KEY,
              page: 1
          });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
  });
});


});
