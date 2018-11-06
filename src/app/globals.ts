import { Injectable } from '@angular/core';
import { User } from './user'
import { INode } from './node'
@Injectable()
export class Globals {
  projects: Array<string> = ["Project1","Project2","Project3"];
  users:{ [id: string] : User } = {
    "ignacio.pasamontes@gmail.com":{
    name: "Ignacio Pasamontes Fúnez",
    password: "nacho",
    projects: ["Read_Across","Prediction","Analytic"]
    },
    "pepe@gmail.com":{
      name: "Pepe",
      password: "pepe",
      projects: ["Project","ProjectPepe2","ProjectPepe3"]
    }
  }
  actual_user:User;
  active_projects : Array<string>=["New_Project"]
  node_visible:boolean=true;
  operatorId:string="";
  actual_node: INode;
}