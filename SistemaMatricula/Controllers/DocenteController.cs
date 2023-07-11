using SistemaMatricula.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaMatricula.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {

            return View();
        }

        public JsonResult ObtenerDocentes()
        {

            SistemaMatriculaEntities db = new SistemaMatriculaEntities();
            var lista = (from docente in db.Docente
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APPATERNO,
                             docente.APMATERNO,
                             docente.EMAIL,
                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LlenarComboModalidadContrato()
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();
            var lista = db.ModalidadContrato.Where(o =>o.BHABILITADO==1)
                .Select(o => new { o.IIDMODALIDADCONTRATO, o.NOMBRE }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FiltrarDocentePorTipoModalidad(int idModalidad)
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();
            var lista = (from docente in db.Docente
                         where docente.IIDMODALIDADCONTRATO == idModalidad
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APPATERNO,
                             docente.APMATERNO,
                             docente.EMAIL
                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}