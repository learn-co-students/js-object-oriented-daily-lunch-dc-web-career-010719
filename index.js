// global datastore

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let hoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0


class Neighborhood{
  constructor(name){
    this.name = name
    this.id = hoodId++
    store.neighborhoods.push(this)
  }
  deliveries(){
    let deliverys = []
    store.deliveries.forEach((deliver)=> {
      if(deliver.neighborhoodId == this.id){
        deliverys.push(deliver)
      }
    })
    return deliverys

  }
  customers(){
    let cust = []
    store.customers.forEach((customer)=> {
      if(customer.neighborhoodId == this.id){
        cust.push(customer)
      }
    })
    return cust

  }
  meals(){
    let meals1 =[]
    this.deliveries().forEach((deliver)=>{
      meals1.push(deliver.meal())
    })
    return meals1.filter((v, i, a) => a.indexOf(v) === i)

  }


}

class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }
  deliveries(){
    let deliverys = []
    store.deliveries.forEach((deliver)=> {
      if(deliver.mealId == this.id){
        deliverys.push(deliver)
      }
    })
    return deliverys

  }
  customers(){
    let custs = []
    this.deliveries().forEach((deliver)=>{
      store.customers.forEach((cust)=>{
        if (deliver.customerId == cust.id){
          custs.push(cust)
        }
      })
    })
    return custs
  }

  static byPrice(){
    let x =  store.meals.sort((a, b) => (a.price <b.price) ? 1 : -1)
    return x
  }





}


class Customer{
  constructor(name,neighborhoodId ){
    this.id = customerId++
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }
  deliveries(){
    let deliverys = []
    store.deliveries.forEach((deliver)=> {
      if(deliver.customerId == this.id){
        deliverys.push(deliver)
      }
    })
    return deliverys

  }
  meals(){
    let meals1 = []
    this.deliveries().forEach((deliv)=> {
      store.meals.forEach((meal) =>{
        if(meal.id == deliv.mealId){
          meals1.push(meal)
        }
      })
    })
    return meals1

  }

  totalSpent(){
    let tot =0
    this.meals().forEach((meal)=>{
      tot += meal.price
    })
    return tot
  }

}

class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.id = deliveryId++
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }
  meal(){
    let themeal
    store.meals.forEach((meal)=> {
      if(meal.id == this.mealId){
        themeal = meal
      }
    })
    return themeal
  }
  customer(){
    let thecustomer
    store.customers.forEach((cust)=> {
      if(cust.id == this.customerId){
        thecustomer = cust
      }
    })
    return thecustomer
  }
  neighborhood(){
    let neighborhood
    store.neighborhoods.forEach((neigh)=> {
      if(neigh.id == this.neighborhoodId){
        neighborhood = neigh
      }
    })
    return neighborhood
  }


}
