import {Persistable} from "./Persistable";


interface CustomerData {

  id:number;
  first_name:string;
  last_name:string;
  address:string;
  address2:string;
  phone:string;
  city:string;
  postal_code:string;
  remarks:string;
  status:string;
  email:string;
  mypass:string;
  name_title:string;
  //email_verified:string;

}

class Customer implements Persistable
{
  private id:number;
  private first_name:string;
  private last_name:string;
  private address:string;
  private address2:string;
  private phone:string;
  private postal_code:string;
  private remarks:string;
  private status:string;
  private email:string;
  private name_title:string;
  private mypass:string;
  private city:string;

    constructor()
    {
      this.id = null;
    }
    public setId(id:number)
    {
      this.id = id;
    }

    public getId():number
    {
      return this.id;
    }

    public setFirstName(first_name:string){
      this.first_name = first_name;
    }

    public getFirstName():string{
      return this.first_name;
    }

    public setLastName(last_name:string){
      this.last_name = last_name;
    }

  public getLastName():string{
    return this.last_name;
  }

  public setAddress(address:string){
      this.address = address;
  }

  public getAddress():string{
      return this.address;
  }

  public setAddress2(address2:string){
      this.address2 = address2;
  }

  public getAddress2():string{
      return this.address2;
  }

  public setPhone(phone:string){
      this.phone = phone;
  }

  public getPhone():string{
      return this.phone;
  }

  public setPostalCode(postal:string){
      this.postal_code = postal;
  }

  public getPostalCode():string{
      return this.postal_code;
  }

  public setRemarks(remarks:string){
      this.remarks = remarks;
  }

  public getRemarks():string{
      return this.remarks;
  }

  public setStatus(status:string){
      this.status = status;
  }

  public getStatus():string{
      return this.status;
  }

  public setEmail(email:string){
      this.email = email;
  }

  public getEmail():string{
      return this.email;
  }

  public setNameTitle(name_title:string){
      this.name_title = name_title;
  }

  public getNameTitle():string{
      return this.name_title;
  }

  public setMyPass(mypass:string){
      this.mypass = mypass;
  }

  public getMyPass():string{
      return this.mypass;
  }

  public setCity(city:string){
    this.city = city;
  }

  public getCity():string{
    return this.city;
  }


  public toJSON():CustomerData{

    let me = this;
    function build():CustomerData{
      let data:CustomerData = {
        id:me.getId(),
        first_name:me.getFirstName(),
        last_name:me.getLastName(),
        address:me.getAddress(),
        address2:me.getAddress2(),
        phone:me.getPhone(),
        postal_code:me.getPostalCode(),
        remarks:me.getRemarks(),
        status:me.getStatus(),
        email:me.getEmail(),
        mypass:me.getMyPass(),
        name_title:me.getNameTitle(),
        city:me.getCity()
      }

      return data;
    }

    return build();
  }

}

export {Customer}
