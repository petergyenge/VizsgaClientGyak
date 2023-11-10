import { createServer } from 'miragejs';

/**
 * 
 * 
 * DO NOT TOUCH THIS FILE!!!!!!
 * 
 * 
 */


 let data = [
  {
    name: 'Kovács Béla',
    pets: [
      { name: "Bodri", animal: "dog", isVaccinated: false },
      { name: "Cirmi", animal: "cat", isVaccinated: false }
    ]
  },
  {
    name: 'Varga Lajos',
    pets: [
      { name: "Frakk", animal: "dog", isVaccinated: false }
    ]
  },
  {
    name: 'Nagy Béla',
    pets: [
      { name: "Csőrike", animal: "pigeon", isVaccinated: false }
    ]
  }
]

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,
    models: {
    },
    seeds(server) {
    },
    routes() {
      this.urlPrefix = 'https://demoapi.com';
      this.namespace = '/api';
      this.timing = 2000

      this.get('/series/howimetyourmother', (schema, request) => {
        return [
            { name: "Ted Mosby", details: "He is the main protagonist of the series..."},
            { name: "Barney Stinson", details: "He is best friend of the protagonist..."},
            { name: "Marshall Eriksen", details: "He is also the best friend of the protagonist..."},
          ]
      })

      this.post('/series/newsletter', (schema, request) => {
        return { done: true }
      })

      this.get('/clothes', (schema, request) => {
        return [
            {
              "type": "T-shirts",
              "gender": "male",
              "products": [
                { "id": 1, "brand": "Nike", "color": "red" },
                { "id": 2, "brand": "Adidas", "color": "green" }
              ]
            },
            {
              "type": "Jeans",
              "gender": "female",
              "products": [
                { "id": 3, "brand": "Puma", "color": "blue" },
                { "id": 4, "brand": "Adidas", "color": "yellow" }
              ]
            },
            {
              "type": "Shoes",
              "gender": "male",
              "products": [
                { "id": 5, "brand": "Nike", "color": "black" },
                { "id": 6, "brand": "Puma", "color": "white" }
              ]
            }
          ]
      })

      this.post('/cart', (schema, request) => {
        return { done: true }
      })

      this.post('/calculate', (schema, request) => {
        return [
          {
            "name": "Yoda",
            "type": "Jedi",
            "chance": "70%"
          },
          {
            "name": "Darth Vader",
            "type": "Sith",
            "chance": "10%"
          }, 
          {
            "name": "Luke Skywalker",
            "type": "Jedi",
            "chance": "80%"
          },       
        ]
      })

      this.get('/series/howimetyourmother', (schema, request) => {
        return [
            { name: "Ted Mosby", details: "He is the main protagonist of the series..."},
            { name: "Barney Stinson", details: "He is best friend of the protagonist..."},
            { name: "Marshall Eriksen", details: "He is also the best friend of the protagonist..."},
          ]
      })

      this.post('/series/newsletter', (schema, request) => {
        return { done: true }
      })

      this.get('/laptop', (schema, request) => {
        return [
          { brand: "Apple", name: "MacBook Air", weight: 0.5 },
          { brand: "Asus", name: "P30", weight: 1.7 },
          { brand: "Lenovo", name: "A50", weight: 1.5 },
        ]
      })

      this.get('/teams', (schema, request) => {
        return [
          {
            "name": "Los Angeles Lakers",
            "stadium": "Staples Center",
            "franchisePlayers": [
              { "id": 1, "name": "Lebron James"},
              { "id": 2, "name": "Anthony Davis"}
            ]
          },
          {
            "name": "Los Angeles Clippers",
            "stadium": "Staples Center",
            "franchisePlayers": [
              { "id": 3, "name": "Kawhi Leonard"},
              { "id": 4, "name": "Paul George"}
            ]
          },
          {
            "name": "Phoenix Suns",
            "stadium": "Phoenix Suns Arena",
            "franchisePlayers": [
              { "id": 5, "name": "Chris Paul"},
              { "id": 6, "name": "Devin Booker"}
            ]
          },
          {
            "name": "Brooklyn Nets",
            "stadium": "Barclays Center",
            "franchisePlayers": [
              { "id": 7, "name": "James Harden"},
              { "id": 8, "name": "Kevin Durant"},
              { "id": 9, "name": "Kyrie Irving"}
            ]
          },
        ]
      })

      this.post('/vote', (schema, request) => {
        return { success: true }
      })

      this.get('/vet/clients', (schema, request) => {
        const search = request.queryParams.search
        return data.filter(client => client.name.includes(search))
      });

      this.post('/vet/pets', (schema, request) => {
        let { name, isVaccinated } = JSON.parse(request.requestBody);
        data.forEach(c => {
          c.pets.forEach(p => {
            if (p.name === name) p.isVaccinated = isVaccinated
          })
        })
        return { success: true }
      });

    },
  });
  return server;
}