using SistemaMatricula.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaMatricula.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerCursos()
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();

            var lista = db.Curso.Where(c => c.BHABILITADO == 1)
                .Select(c => new { c.IIDCURSO, c.NOMBRE, c.DESCRIPCION }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerCursoPorNombre(string nombre)
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();

            var lista = db.Curso.Where(c => c.BHABILITADO==1 && c.NOMBRE.Contains(nombre))
                .Select(c => new
                {
                    c.IIDCURSO,
                    c.NOMBRE,
                    c.DESCRIPCION
                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}