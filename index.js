// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0

class Neighborhood {

  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function (delivery) {
      return delivery.neighborhoodId === this.id
    }.bind(this))
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals() {
    let meals = []
    this.deliveries().forEach(function(delivery) {
      if (!meals.includes(delivery.meal())) {
        meals.push(delivery.meal())
      }
    })
    return meals
  }

}

let customerId = 0

class Customer {

  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    let meals = []
    this.deliveries().forEach(delivery => {
        meals.push(delivery.meal())
    })
    return meals
  }

  totalSpent() {
    function reduceMealPrices(agg, el, i, arr) {
      return agg + el.price
    }
    return this.meals().reduce(reduceMealPrices, 0)
  }

}

let deliveryId = 0

class Delivery {

  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(function (meal) {
      return this.mealId === meal.id
    }.bind(this))
  }

  customer() {
    return store.customers.find(customer => this.customerId === customer.id)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => this.neighborhoodId === neighborhood.id)
  }

}

let mealId = 0

class Meal {

  constructor(title, price=0) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    let customers = []
    this.deliveries().forEach(function(delivery) {
      if (!customers.includes(delivery.customer())) {
        customers.push(delivery.customer())
      }
    })
    debugger
    return customers
  }

  static byPrice() {
    function callback(a, b) {return b.price - a.price}
    return store.meals.sort(callback)
  }

}
