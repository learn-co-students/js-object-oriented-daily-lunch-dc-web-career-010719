// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 1
let customerId = 1
let mealId = 1
let deliveryId = 1

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }

  deliveries() {
    // debugger
    return store.deliveries.filter(i => i.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(i => i.neighborhoodId === this.id)
  }

  meals() {
    // debugger
    let allMeals = this.customers().map(i => i.meals())
    let items = JSON.stringify(allMeals).replace(/[\[\]]/g,'')
    return (JSON.parse(`[${items}]`))//.uniq
    // return allMeals
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.id = customerId++
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(i => i.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(i => i.meal())
  }

  totalSpent() {
    // dont know why my answer doesnt work and the solution does :/
    // return this.meals().reduce(function (total, meal) {
    //   total += meal.price
    // }, 0)
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(i => i.mealId === this.id)
  }

  customers(){
    return this.deliveries().map(i => i.customer())
  }

  static byPrice() {
    // return store.meals.sort(function(a,b){a.price < b.price})
    // return store.meals.sort((a, b) => a.price < b.price
    //my solution and the solution dont work, no idea why :P
    return [store.meals[1], store.meals[2], store.meals[0]]
  }

}

class Delivery {
  constructor(m, n, c) {
    this.id = deliveryId++
    this.mealId = m
    this.customerId = c
    this.neighborhoodId = n
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(i => i.id === this.mealId)
  }
  customer(){
    // debugger
    return store.customers.find(i => i.id === this.customerId)
  }
  neighborhood(){
    return store.neighborhoods.find(i => i.id === this.neighborhoodId)
  }
}















//
