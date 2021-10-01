import { Component, OnInit} from '@angular/core';
import {readDir, readTextFile} from "@tauri-apps/api/fs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tauriTp';

  treeFilesProject: any;

  bool: any;
  lastFile: any = "../";
  currentfile: any = "../";

  historicPath: Array<any> = ["../"];
  count = 0;
  fileValue:any='';

  private TREE_DATA: any;

  constructor() {

  }

  init() {
    readDir("../").then(value => {
      this.treeFilesProject = value;
      this.TREE_DATA = value;
      return this.TREE_DATA;
    })
  }

  ngOnInit() {

    this.TREE_DATA = this.init();
    this.bool = 0;
  }

  click(file: any) {
    if (this.currentfile != this.lastFile) {
      this.lastFile = this.currentfile;
    }
    this.currentfile = file.path;

    this.historicPath.push(file.path);
    this.count++;

    readDir(file.path).then(value => {
      this.treeFilesProject = value;
      console.log(value)
      this.TREE_DATA = value;
      return this.TREE_DATA;
    });
    this.bool++;
  }

  retour() {
    readDir(this.historicPath[this.count - 1]).then(value => {
      this.treeFilesProject = value;
      this.TREE_DATA = value;
      return this.TREE_DATA;
    });
    this.bool -= 1;
    this.count--;
  }

  open(file:any){
    readTextFile(file.path).then(value => {
      this.fileValue = value;
    })
  }
}

