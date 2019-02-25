// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let hoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++hoodId
    store.neighborhoods.push(this)
  }
  deliveries() {return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)}
  customers() {return store.customers.filter(customer => customer.neighborhoodId === this.id)}
  meals() {return Array.from(new Set(this.customers().map(customer => customer.meals()).flat()))}
}

class Customer {
  constructor(name,neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries() {return store.deliveries.filter(delivery => delivery.customerId === this.id)}
  meals() {return this.deliveries().map(delivery=>delivery.meal())}
  totalSpent() {return this.meals().reduce((x, meal) => (x += meal.price), 0);
  }
}

class Meal {
  constructor(title,price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries() {return store.deliveries.filter(delivery => delivery.mealId === this.id)}
  customers() {return Array.from(new Set(this.deliveries().map(delivery=>delivery.customer())))}
  static byPrice() {return store.meals.sort((a, b) => parseFloat(a.price) < parseFloat(b.price))}
}

class Delivery {
  constructor(mId,neighborhoodId,custId){
    this.id = ++deliveryId
    this.mealId = mId
    this.neighborhoodId = neighborhoodId
    this.customerId = custId
    store.deliveries.push(this)
  }
  neighborhood() {return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)}
  customer() {return store.customers.find(customer => customer.id === this.customerId)}
  meal() {return store.meals.find(meal => meal.id === this.mealId)}
}
