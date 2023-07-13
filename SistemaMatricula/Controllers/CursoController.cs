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
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from curso in db.Curso
                         where curso.BHABILITADO.Equals(1)
                         select new
                         {
                             curso.IIDCURSO,
                             curso.NOMBRE,
                             curso.DESCRIPCION
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarDatos(int id)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = (from curso in db.Curso
                         where curso.BHABILITADO.Equals(1) && curso.IIDCURSO.Equals(id)
                         select new
                         {
                             curso.IIDCURSO,
                             curso.NOMBRE,
                             curso.DESCRIPCION
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerCursoPorNombre(string nombre)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var lista = db.Curso.Where(c => c.BHABILITADO.Equals(1) && c.NOMBRE.Contains(nombre))
                .Select(c => new
                {
                    c.IIDCURSO,
                    c.NOMBRE,
                    c.DESCRIPCION
                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public int Guardar(Curso curso)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();

            int numeroDeRegistrosAfectados = 0;

            try
            {
                if (curso.IIDCURSO == 0)
                {
                    db.Curso.InsertOnSubmit(curso);
                    db.SubmitChanges();
                    numeroDeRegistrosAfectados = 1;
                }
                else
                {
                    Curso seleccionado = db.Curso.Where(c => c.IIDCURSO.Equals(curso.IIDCURSO)).First();
                    seleccionado.NOMBRE = curso.NOMBRE;
                    seleccionado.DESCRIPCION = curso.DESCRIPCION;
                    db.SubmitChanges();
                    numeroDeRegistrosAfectados = 1;
                }
            }
            catch (Exception ex)
            {
                numeroDeRegistrosAfectados = 0;
            }

            return numeroDeRegistrosAfectados;
        }

        public int Eliminar(Curso curso)
        {
            ModeloDeDatosDataContext db = new ModeloDeDatosDataContext();
            var numeroDeRegistrosAfectados = 0;
            try
            {
                Curso seleccionado = db.Curso.Where(c => c.IIDCURSO.Equals(curso.IIDCURSO)).First();
                seleccionado.BHABILITADO = curso.BHABILITADO=0;
                db.SubmitChanges();
                numeroDeRegistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                numeroDeRegistrosAfectados = 0;
            }

            return numeroDeRegistrosAfectados;
        }
    }
}