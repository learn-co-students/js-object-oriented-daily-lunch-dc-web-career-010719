let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let NeighborhoodID = 0

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++NeighborhoodID
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(d => d.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(c => c.neighborhoodId === this.id)
  }

  meals() {
    let mealIds = this.deliveries().map(d => d.mealId)
    let meals = mealIds.map(id => store.meals.find(meal => meal.id === id))
    return meals.filter((v,i,a) => a.indexOf(v) === i)
  }

}

let MealID = 0

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++MealID
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(d => d.mealId === this.id)
  }

  customers() {
    let customerIds = this.deliveries().map(d => d.customerId)
    let customers = customerIds.map(id => store.customers.find(customer => customer.id === id))
    return customers.filter((v,i,a) => a.indexOf(v) === i)
  }

  static byPrice() {
    return store.meals.sort((a,b) => b.price - a.price)
  }

}

let CustomerID = 0

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++CustomerID
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(d => d.customerId === this.id)
  }

  meals() {
    let mealIds = this.deliveries().map(d => d.mealId)
    return mealIds.map(id => store.meals.find(meal => meal.id === id))
  }

  totalSpent() {
    let prices = this.meals().map(m => m.price)
    return prices.reduce((a,v) => a + v)
  }

}

let DeliveryID = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++DeliveryID
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
