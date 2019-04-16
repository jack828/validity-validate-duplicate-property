const assert = require('assert')
const createValidator = require('../validator')

describe('Duplicate Property Validator', function () {
  it('should not produce validation errors if nothing is found', function (done) {
    const mockSave = {
      findOne: (q, cb) => {
        assert.deepStrictEqual(Object.keys(q), ['emailAddress'])
        cb(null, null)
      }
    }
    createValidator(mockSave)('emailAddress', 'Email Address', { _id: '456', emailAddress: 'test@clock.co.uk' }, (err, validationError) => {
      if (err) return done(err)
      assert.strictEqual(validationError, undefined)
      done()
    })
  })

  it('should produce validation errors if something is found', function (done) {
    const mockSave = {
      findOne: (q, cb) => {
        assert.deepStrictEqual(Object.keys(q), ['emailAddress'])
        cb(null, {
          _id: '123',
          emailAddress: 'test@clock.co.uk'
        })
      }
    }
    createValidator(mockSave)('emailAddress', 'Email Address', { _id: '456', emailAddress: 'test@clock.co.uk' }, (err, validationError) => {
      if (err) return done(err)
      assert.deepStrictEqual(validationError, 'test@clock.co.uk is already in use')
      done()
    })
  })

  it('should not produce validation errors if it finds the current object under validation', function (done) {
    const mockSave = {
      findOne: (q, cb) => {
        assert.deepStrictEqual(Object.keys(q), ['emailAddress'])
        cb(null, {
          _id: '123',
          emailAddress: 'test@clock.co.uk'
        })
      }
    }
    createValidator(mockSave)('emailAddress', 'Email Address', { _id: '123', emailAddress: 'test@clock.co.uk' }, (err, validationError) => {
      if (err) return done(err)
      assert.deepStrictEqual(validationError, undefined)
      done()
    })
  })
})
