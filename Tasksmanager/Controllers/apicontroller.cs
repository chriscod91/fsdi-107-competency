
using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;
using System.Collections.Generic;
using System.Linq;

namespace taskmaneger.Controllers
{
    public class ApiController : Controller
    {
        //array / list to temp store the data
        static List<Task> DB;

         static int count;

         //Constructor should have same name of the class and no return type

        public ApiController()
        {
            if(DB == null)
            {
                DB = new List<Task>();
                count = 1;
            }
        }

        [HttpPost]
        public IActionResult SaveTask([FromBody] Task data)
       { 
            System.Console.WriteLine("saving task: " + data.Title);
            //get the object
            //save it on db
            
            //assign a unique id
            data.Id = count;
            count += 1;

            DB.Add(data);
            //return the object back
            return Json(data);
        }

        [HttpGet]

        public IActionResult GetTasks()
        {
            return Json(DB);
        }

        [HttpDelete]

        public IActionResult DeleteTasks(int id)
        {
            //find the task with the id 
            Task t = DB.First(t => t.Id == id);
            
            DB.Remove(t);

            return Ok();
        }

        [HttpPatch]

        public IActionResult MarkDone(int id){

            Task t = DB.First(t => t.Id == id);

            t.Status = 2;

            return Ok();
        }
         
    }
}