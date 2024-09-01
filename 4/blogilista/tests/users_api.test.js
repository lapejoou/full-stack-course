const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })

    test('user can be created', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'kukkuu',
          name: 'Superuser',
          password: 'salainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, usersAtStart.length + 1)
    })

    test('creation fails if username is taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, usersAtStart.length)
    })

    test('creation fails if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'kokeilu',
          name: 'Superuser',
          password: 'sa',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, usersAtStart.length)
    })

})

after(async () => {
    await mongoose.connection.close()
  })