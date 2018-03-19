import {Persistable} from "./Persistable"


interface MenuPriceData
{
  price_id:number;
  price_type:number;
  price:number;
  opt_type:string;
}

class MenuPrice implements Persistable
{

  private priceId:number;
  private priceType:number;
  private price:number;
  private optType:string;

  constructor()
  {
    this.priceId = null;
    this.priceType = null;
    this.price = null;
    this.optType = "";

  }


  public setPriceId(id:number)
  {
    this.priceId = id;
  }

  public getPriceId():number
  {
    return this.priceId;
  }


  public setPriceType(p_type:number)
  {
    this.priceType = p_type;
  }

  public getPriceType():number
  {
    return this.priceType;
  }


  public setPrice(price:number)
  {
    this.price = price;
  }

  public getPrice():number
  {
    return this.price;
  }

  public setOptPrice(opt_price:string)
  {
    this.optType = opt_price;
  }

  public getOptPrice():string
  {
    return this.optType;
  }



  public toJSON():MenuPriceData
  {
      let me = this;
      function build():MenuPriceData
      {
        let data:MenuPriceData =
        {
          price_id:me.getPriceId(),
          price_type:me.getPriceType(),
          price:me.getPrice(),
          opt_type:me.getOptPrice()
        }

        return data;
      }

      return build();
  }

}
export {MenuPrice,MenuPriceData}
