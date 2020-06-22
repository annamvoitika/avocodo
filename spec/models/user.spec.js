var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.user.drop(function() {
          done();
      });
  });

  it('has a name', function() {
    var user = new User({ name: 'Kate' });
    expect(user.name).toEqual('Kate');
  });

  // it('can list all posts', function(done) {
  //   Post.find(function(err, posts) {
  //     expect(err).toBeNull();
  //     expect(posts).toEqual([]);
  //     done();
  //   });
  // });
  //
  // it('can save a post', function(done) {
  //   var post = new Post({ message: 'some message' });
  //
  //   post.save(function(err) {
  //     expect(err).toBeNull();
  //
  //     Post.find(function(err, posts) {
  //       expect(err).toBeNull();
  //
  //       expect(posts[0]).toMatchObject({ message: 'some message' });
  //       done();
  //     });
  //   });
  // });
});
