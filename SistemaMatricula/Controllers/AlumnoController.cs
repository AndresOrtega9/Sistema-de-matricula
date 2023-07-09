using SistemaMatricula.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaMatricula.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerAlumnos()
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();

            var lista = db.Alumno.Where(o => o.BHABILITADO == 1)
                .Select(o => new { o.IIDALUMNO, o.NOMBRE, o.APPATERNO, o.APMATERNO }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult LlenarComboBoxSexo()
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();

            var lista = db.Sexo.Where(o => o.BHABILITADO == 1)
                .Select(o => new {ID=o.IIDSEXO,o.NOMBRE}).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscarAlumnoPorSexo(int IdSexo)
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();
            var lista = db.Alumno.Where(o => o.BHABILITADO == 1 && o.IIDSEXO == IdSexo)
                .Select(o => new {
                    o.IIDALUMNO,
                    o.NOMBRE,
                    o.APPATERNO,
                    o.APMATERNO
                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}