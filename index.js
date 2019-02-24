// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

//////Neghborhood//////
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  
  deliveries(){
    return store.deliveries.filter(del => del.neighborhoodId === this.id)
  }
  
  customers() {
    let cust = this.deliveries().map(del => del.customer())

    return cust.filter((el, i, a) => a.indexOf(el) === i) //indexOf will always return the index of the first match, unless it is explicitly told told to start searching from a different index. In this case, a.indexOf(el) always returns 0 because that is the first time it matches.
  }
  
  meals() {
    let meals = this.deliveries().map(del => del.meal())
    return meals.filter((el, i, a) => a.indexOf(el) === i)
  }

}

///////Customer///////
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(del => del.customerId === this.id)
  }
    
  meals() {
    return this.deliveries().map(del => del.meal())
  }
  
  totalSpent() {
    return this.meals().reduce((acc, curr) => {return acc + curr.price}, 0)
  }
}

//////Meal///////
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(del => del.mealId === this.id)
  }
  
  customers() {
    let cust = this.deliveries().map(del => del.customer())
    return cust.filter((el, i, a) => a.indexOf(el) === i)
  }
  
  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price)
  }
  

}

////////Delivery//////////
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  
  customer() {
    return store.customers.find(el => el.id === this.customerId)
  }
  
  meal() {
    return store.meals.find(el => el.id === this.mealId)
  }
  
  neighborhood() {
    return store.neighborhoods.find(el => el.id === this.neighborhoodId)
  }
}
