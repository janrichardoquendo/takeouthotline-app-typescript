
import {Client} from "./Client";
import {Persistable} from "./Persistable";
import {MenuPrice,MenuPriceData} from "./MenuPrice";


interface MenuData
{
  menu_id:number;
  client_id:number;
  menu_name:string;
  price_type:number;
  menu_category:number;
  menu_description:string;
  menu_image:string;
  is_deleted:number;
  updated_last:Date;
  updated_by:number;
  menuprice:Array<MenuPriceData>;
}

class Menus implements Persistable
{

  private menuiId:number;
  private clientId:number;
  private menuName:string;
  private priceType:number;
  private menuCategory:number;
  private menuDescription:string;
  private menuImage:string;
  private isDeleted:number;
  private updatedLast:Date;
  private updatedBy:number;
  private menuPrice:Array<MenuPrice>;


  constructor()
  {

    this.menuiId=null;
    this.clientId=null;
    this.menuName="";
    this.priceType=null;
    this.menuCategory=null;
    this.menuDescription="";
    this.menuImage="";
    this.isDeleted=null;
    this.updatedLast=null;
    this.updatedBy=null;
    this.menuPrice = new Array<MenuPrice>();

  }

    public setMenuId(menuID:number)
    {
      this.menuiId = menuID;
    }

    public getMenuId():number{
      return this.menuiId;
    }


    public setClientId(client:number)
    {
      this.clientId = client;
    }

    public getClientId():number
    {
      return this.clientId;
    }


    public setMenuName(name:string)
    {
      this.menuName = name;
    }

    public getMenuName():string
    {
      return this.menuName;
    }

    public setPriceType(type:number)
    {
      this.priceType = type;
    }

    public getPriceType():number
    {
      return this.priceType;
    }

    public setMenuCategory(category:number)
    {
      this.menuCategory = category;
    }

    public getMenuCategory():number
    {
      return this.menuCategory;
    }


    public setMenuDescription(desc:string)
    {
      this.menuDescription = desc;
    }

    public getMenuDescription():string
    {
      return this.menuDescription;
    }

    public setMenuImage(image:string)
    {
      this.menuImage = image;
    }

    public getMenuImage():string
    {
      return this.menuImage;
    }

    public setIsDeleted(is_deleted:number)
    {
      this.isDeleted = is_deleted;
    }

    public getIsDeleted():number
    {
      return this.isDeleted;
    }

    public setUpdatedLast(updated_last:Date)
    {
      this.updatedLast = updated_last;
    }

    public getUpdatedLast():Date
    {
      return this.updatedLast;
    }

    public setUpdatedBy(updated_by:number)
    {
      this.updatedBy = updated_by
    }

    public getUpdatedBy():number
    {
      return this.updatedBy;
    }


    public setMenuPrice(menu_price:Array<MenuPrice>)
    {
      this.menuPrice = menu_price;
    }


    public getMenuPrice():Array<MenuPrice>
    {
      return this.menuPrice;
    }



    public addMenuPrice(value: MenuPrice): MenuPrice {
         let found: boolean = false;
         let added: MenuPrice = null;
         for (var i = 0; i < this.menuPrice.length; i++) {
             let item: MenuPrice = this.menuPrice[i];
             if (value.getPriceId() == item.getPriceId()) {
                 found = true;
             }
         }
         if (!found) {
             this.menuPrice.push(value);
             added = value;
         }
         return added;
     }


     public removeMenuPrice(value: MenuPrice): MenuPrice {
         let found: boolean = false;
         let removeMenusPriceObj: any = null;
         let index_to_delete: any = null;
         for (var i = 0; i < this.menuPrice.length; i++) {
             let item: MenuPrice = this.menuPrice[i];
             if (value.getPriceId() != item.getPriceId()) {
             } else {
                 index_to_delete = i;
                 removeMenusPriceObj = value;
             }
         }

         if (index_to_delete !== null) {
             this.menuPrice.splice(index_to_delete, 1);
         }
         return removeMenusPriceObj;
     }


  public toJSON():MenuData
  {
    let me = this;
    function build():MenuData
    {
      let data:any = {
        menu_id:me.getMenuId(),
        client_id:me.getClientId(),
        menu_name:me.getMenuName(),
        price_type:me.getPriceType(),
        menu_category:me.getMenuCategory(),
        menu_description:me.getMenuDescription(),
        menu_image:me.getMenuImage(),
        is_deleted:me.getIsDeleted(),
        updated_last:me.getUpdatedLast(),
        updated_by:me.getUpdatedBy(),
        menuprice : me.getMenuPrice()

      }

      return data;
    }

    return build();
  }

}

export {Menus,MenuData}
