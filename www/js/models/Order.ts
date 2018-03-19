/**
 * Created by joenefloresca on 18/03/2017.
 */
import {Persistable} from "./Persistable"
import {Customer} from "./Customer"
import {Client} from "./Client"

interface OrderData {
    customer:Customer;
    orders:Array<any>;
    client:Client;
    total:Number;
}

class Order implements Persistable {

    private customer:Customer;
    private orders:Array<any>;
    private client:Client;
    private totalCost:Number;

    constructor()
    {
        this.orders = new Array<any>();
    }

    public setTotalCost(cost:Number){
        this.totalCost = cost;
    }

    public getTotalCost():Number{
        return this.totalCost;
    }

    public setCustomer(customer:Customer){
        this.customer = customer;
    }

    public getCustomer():Customer{
        return this.customer;
    }

    public addOrder(item:any){
        this.orders.push(item);
    }

    public getOrdersItem():Array<any>{
        return this.orders;
    }

    public setClient(client:Client){
        this.client = client;
    }

    public getClient():Client{
        return this.client;
    }

    public toJSON():OrderData{
        let me = this;
        function build():OrderData{
            let data:OrderData = {
                customer:me.getCustomer(),
                orders:me.getOrdersItem(),
                client:me.getClient(),
                total:me.getTotalCost()
            }

            return data;
        }
        return build();
    }

    // private customer_id:number;
    // private firstname:string;
    // private lastname:string;
    // private address1:string;
    // private address2:string;
    // private city:string;
    // private postcode:string;
    // private phone:string;
    // private client_id:number;
    // private order_date:any;
    // private cookie:string;
    // private taken_order:number;
    // private orders:Array<any>;

    // public setCustomerId(id:number){
    //     this.customer_id = id;
    // }
    //
    // public getCustomerId():number{
    //     return this.customer_id;
    // }
    //
    // public setFirstName(firstname:string){
    //     this.firstname = firstname;
    // }
    //
    // public getFirstName():string{
    //     return this.firstname;
    // }
    //
    // public setLastName(lastname:string){
    //     this.lastname = lastname;
    // }
    //
    // public getLastName():string{
    //     return this.lastname;
    // }
    //
    // public setAddress1(address1:string){
    //     this.address1 = address1;
    // }
    //
    // public getAddress1():string{
    //     return this.address1;
    // }
    //
    // public setAddress2(address2:string){
    //     this.address2 = address2;
    // }
    //
    // public getAddress2():string{
    //     return this.address2;
    // }
    //
    // public setCity(city:string){
    //     this.city = city;
    // }
    //
    // public getCity():string{
    //     return this.city;
    // }


}

export {Order}