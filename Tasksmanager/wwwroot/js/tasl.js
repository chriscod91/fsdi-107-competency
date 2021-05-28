class Task{

    constructor(title, desc, important, importance, dueDate, alertText, location){
       this.title = title;
       this.description = desc;
       this.important = important;
       this.importance = importance;
       this.dueDate = dueDate;
       this.alertText = alertText;
       this.location = location;
       this.status = 1; //1 = pending 2 = done

       this.user = "ChrisCod";
  }
}   