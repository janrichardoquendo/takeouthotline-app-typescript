import {Category,CategoryData} from "./Category";
import {Persistable} from "./Persistable"

interface ClientData
{
  client_id:number;
  title:string;
  firstname:string;
  lastname:string;
  middlename:string;
  name_resto:string;
  description:string;
  postcode:string;
  address:string;
  address2:string;
  city:string;
  country:string;
  website:string;
  contact:string;
  phone:string;
  logo:string;
  town:string;
  category:Array<CategoryData>;
}


class Client implements Persistable
{
  private client_id:number;
  private title:string;
  private firstName:string;
  private lastName:string;
  private middleName:string;
  private nameResto:string;
  private description:string;
  private postcode:string;
  private address:string;
  private address2:string;
  private country:string;
  private city:string;
  private website:string;
  private contact:string;
  private phone:string;
  private logo:string;
  private town:string;
  private category:Array<Category>;


  constructor()
  {
    this.client_id = null;
    this.title = "";
    this.firstName = "";
    this.lastName = "";
    this.middleName = "";
    this.nameResto = "";
    this.description="";
    this.postcode="";
    this.address="";
    this.website="";
    this.contact="";
    this.phone="";
    this.logo="";
    this.town="";
    this.category = new Array<Category>();
  }



  public setClientId(id:number)
  {
    this.client_id = id;
  }

  public getClientId():number
  {
    return this.client_id;
  }


  public setTitle(title:string)
  {
    this.title = title;
  }

  public getTitle():string
  {
    return this.title;
  }

  public setTown(town:string){
    this.town = town;
  }

  public getTown():string{
    return this.town;
  }

  public setFirstName(fname:string)
  {
    this.firstName = fname;
  }

  public getFirstName():string
  {
    return this.firstName;
  }

  public setLname(lname:string)
  {
    this.lastName = lname;
  }

  public getLname():string
  {
    return this.lastName;
  }


  public setMname(mname:string)
  {
    this.middleName = mname;
  }

  public getMname():string
  {
    return this.middleName;
  }

  public setNameResto(resto:string)
  {
    this.nameResto = resto;
  }

  public getNameResto():string
  {
    return this.nameResto;
  }



  public setDesc(desc:string)
  {
    this.description = desc;
  }

  public getDes():string
  {
    return this.description;
  }

  public setPostCode(post_code:string)
  {
    this.postcode = post_code;
  }

  public getPostCode():string{
    return this.postcode;
  }

  public setAddress(address:string)
  {
    this.address = address;

  }

  public getAddress():string
  {
    return this.address;
  }

  public setAddress2(address2:string)
  {
    this.address2 = address2;

  }

  public getAddress2():string
  {
    return this.address2;
  }

  public setCountry(country:string)
  {
    this.country = country;

  }

  public getCountry():string
  {
    return this.country;
  }


  public setCity(city:string)
  {
    this.city = city;

  }

  public getCity():string
  {
    return this.city;
  }


  public setWebsite(web:string)
  {
    this.website = web;
  }

  public getWebsite():string{
    return this.website;
  }

  public setLogo(logo:string)
  {
    this.logo = logo;
  }

  public getLogo():string{
    return this.logo;
  }

  public setContact(contact:string)
  {
    this.contact = contact;
  }

  public getContact():string
  {
    return this.contact;
  }


  public setPhone(phone:string)
  {
    this.phone = phone;
  }

  public getPhone():string
  {
    return this.phone;
  }


  public setCategory(value:Array<Category>)
  {
    this.category = value;
  }


  public getCategory():Array<Category>
  {
    return this.category;
  }


  public addCategory(value: Category): Category {
       let found: boolean = false;
       let added: Category = null;
       for (var i = 0; i < this.category.length; i++) {
           let item: Category = this.category[i];
           if (value.getCategoryId() == item.getCategoryId()) {
               found = true;
           }
       }
       if (!found) {
           this.category.push(value);
           added = value;
       }
       return added;
   }


   public removeCategory(value: Category): Category {
       let found: boolean = false;
       let categoryObj: any = null;
       let index_to_delete: any = null;
       for (var i = 0; i < this.category.length; i++) {
           let item: Category = this.category[i];
           if (value.getCategoryId() != item.getCategoryId()) {
           } else {
               index_to_delete = i;
               categoryObj = value;
           }
       }

       //this.categorizationEntries = newCategoriesEntry;
       if (index_to_delete !== null) {
           this.category.splice(index_to_delete, 1);
       }
       return categoryObj;
   }




  public toJSON():ClientData
  {
    let me = this;
    function build():ClientData
    {
      let data:any = {
        client_id:me.getClientId(),
        title:me.getTitle(),
        firstname:me.getFirstName(),
        lastname:me.getLname(),
        middlename:me.getMname(),
        name_resto:me.getNameResto(),
        description:me.getDes(),
        postcode:me.getPostCode(),
        address:me.getAddress(),
        address2:me.getAddress2(),
        city:me.getCity(),
        country:me.getCountry(),
        website:me.getWebsite(),
        contact:me.getContact(),
        phone:me.getPhone(),
        logo:me.getLogo(),
        category:me.getCategory()

      }

      return data;
    }
    return build();
  }

}

export {Client,ClientData}
