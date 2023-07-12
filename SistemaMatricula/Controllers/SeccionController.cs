using SistemaMatricula.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaMatricula.Controllers
{
    public class SeccionController : Controller
    {
        // GET: Seccion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerListadoSeccion()
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();
            var lista = (from seccion in db.Seccion
                         where seccion.BHABILITADO == 1
                         select new
                         {
                             seccion.IIDSECCION,
                             seccion.NOMBRE
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}