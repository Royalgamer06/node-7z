/*global describe, it */
'use strict';
var expect = require('chai').expect;
var exec = require('child_process').execSync;
var add    = require('../../lib/add');

describe('Method: `Zip.add`', function () {

  it('should return an error on 7z error', function (done) {
    add('.tmp/test/addnot.7z', '.tmp/test/nothere', { '???': true })
    .catch(function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });

  it('should return entries on progress', function (done) {
    add('.tmp/test/add.zip', '*.md')
    .progress(function (entries) {
      expect(entries.length).to.be.at.least(1);
      done();
    })
    .catch(function (err) {
      done();
    });
  });

  it('should return an error if file list is empty', function(done) {
    add('.tmp/test/add.zip', '')
    .catch(function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });

  it('should return an error if file list is empty or having hust space characters', function(done) {
    add('.tmp/test/add.zip', ' ')
    .catch(function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });

  it('should accept array as source', function (done) {
    var store = [];
    add('.tmp/test/add.zip', ['*.md', '*.js'])
    .progress(function (entries) {
      entries.forEach(function (e) {
        store.push(e);
      });
    })
    .done(function () {
      expect(store.length).to.be.at.least(4);
      done();
    });
  });

  it('should accept a path', function (done) {
    add('.tmp/test/add.zip', '*.md', {
      path: '/usr/local/bin/7z'
    })
    .progress(function (entries) {
      expect(entries.length).to.be.at.least(1);
      done();
    });
  });

});
