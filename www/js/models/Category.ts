import {Menus,MenuData} from "./Menus";
import {Persistable} from "./Persistable"

interface CategoryData
{
  category_id:number;
  catname:string;
  catdescription:string;
  is_deleted:number;
  updated_last:Date;
  updated_by:number;
  menus:Array<MenuData>;

}

class Category implements Persistable
{

  private categoryId:number;
  private catName:string;
  private catDescription:string;
  private isDeleted:number;
  private updatedLast:Date;
  private updatedBy:number;
  private menus:Array<Menus>;


  constructor()
  {
    this.categoryId=null;
    this.catName="";
    this.catDescription="";
    this.isDeleted=null;
    this.updatedLast=null;
    this.updatedBy=null;
    this.menus = new Array<Menus>();

  }


  public setCategoryId(id:number)
  {
    this.categoryId = id;
  }

  public getCategoryId():number
  {
    return this.categoryId;
  }

  public setCatName(name:string)
  {
    this.catName = name;
  }

  public getCatName():string
  {
    return this.catName;
  }

  public setCatDescription(desc:string)
  {
    this.catDescription = desc;
  }

  public getCatDescription():string
  {
    return this.catDescription;
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

  public setMenus(value:Array<Menus>)
  {
    this.menus = value;
  }

  public getMenus():Array<Menus>
  {
    return this.menus;
  }


  public addMenus(value: Menus): Menus {
       let found: boolean = false;
       let added: Menus = null;
       for (var i = 0; i < this.menus.length; i++) {
           let item: Menus = this.menus[i];
           if (value.getMenuId() == item.getMenuId()) {
               found = true;
           }
       }
       if (!found) {
           this.menus.push(value);
           added = value;
       }
       return added;
   }


   public removeMenus(value: Menus): Menus {
       let found: boolean = false;
       let removeMenusObj: any = null;
       let index_to_delete: any = null;
       for (var i = 0; i < this.menus.length; i++) {
           let item: Menus = this.menus[i];
           if (value.getMenuId() != item.getMenuId()) {
           } else {
               index_to_delete = i;
               removeMenusObj = value;
           }
       }

       if (index_to_delete !== null) {
           this.menus.splice(index_to_delete, 1);
       }
       return removeMenusObj;
   }


  public toJSON():CategoryData
  {
    let me = this;
    function build():CategoryData
    {
      let data:any = {

        category_id:me.getCategoryId(),
        catname:me.getCatName(),
        catdescription:me.getCatDescription(),
        is_deleted:me.getIsDeleted(),
        updated_last:me.getUpdatedLast(),
        updated_by:me.getUpdatedBy(),
        menus:me.getMenus()

      }

      return data;
    }

    return build();
  }
}

export {Category,CategoryData}
