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
        return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
    } 

    customers() {
        return store.customers.filter(customer => customer.neighborhoodId === this.id)
    }

    meals() {

        let allMeals = this.deliveries().map(delivery => delivery.meal())
        let mergeMeals = this.flatten(allMeals)
        let uniqMeals = this.uniq(mergeMeals)
        return [...uniqMeals]
    }

    flatten(a) {
        var queue = a.slice();
        var result = [];
        while(queue.length) {
            let curr = queue.pop();
            if(Array.isArray(curr)) {
                queue.push(...curr);
            }
            else result.push(curr);
        }
        return result;
    }
    
    uniq(arr) {
      let ret = []
    
      arr.forEach(index => {
        if(ret.includes(index)) {
          console.log('skip index')
        } else {
          ret.push(index)
        }
      })
    
      return ret
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.name = name
        this.neighborhoodId = neighborhoodId
        this.id = customerId++

        store.customers.push(this)
    }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.customerId === this.id)
    }

    meals() {
        return this.deliveries().map(delivery => delivery.meal())
    }

    totalSpent() {
        return this.meals().reduce((total, meal) => (total += meal.price), 0)
    }
}

class Meal {
    constructor(title, price) {
        this.title = title
        this.price = price
        this.id = mealId++

        store.meals.push(this)
    }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.mealId === this.id)
    }

    customers() {
        return this.deliveries().map(delivery => delivery.customer())
    }

    static byPrice() {
        return store.meals.sort((a, b) => a.price < b.price) 
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        this.id = deliveryId++

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
